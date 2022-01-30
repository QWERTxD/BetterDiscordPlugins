/**
 * @name QuickMessages
 * @version 1.2.2
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/QuickMessages/QuickMessages.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickMessages/QuickMessages.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages
 * @invite zMnHFAKsu3
 */

const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "QuickMessages",
        authors: [
            {
                name: "QWERT",
                discord_id: "678556376640913408",
            }
        ],
        version: "1.2.2",
        description: "Save messages to quickly send them later, when you need.",
        github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages",
        github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickMessages/QuickMessages.plugin.js",
    },
    changelog: [
        {
            title: "Fixed",
            type: "Fixed",
            items: [
                "Fixed plugin not working on start.",
				"I still need ideas and suggestions, so if you have some, feel free to send them to me in the support server https://discord.gg/zMnHFAKsu3"
            ],
        }
    ]
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(", ");
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
                request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                    if (error) {
                        return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                    }

                    fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                });
            }
        });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, ContextMenu, Settings } = Library;
    const { SettingPanel, SettingGroup } = Settings;
	const { findModule: get } = BdApi;

    const { React } = DiscordModules;
    function configArrayPush(name, key, data) {
        const config = BdApi.getData(name, key) || [];
        if (config.includes(data)) return;
        config.push(data);
        BdApi.setData(name, key, config);
    }

    const configArrayRemove = function (name, key, value) {
        const data = BdApi.getData(name, key) || [];
        const config = data.filter(function (x) {
            return x != value;
        });
        BdApi.setData(name, key, config)
    }

    var messages = BdApi.getData('QuickMessages', 'messages') || [];

    function updateMessages() {
        messages = BdApi.getData('QuickMessages', 'messages') || [];
    }

    var categories = BdApi.getData('QuickMessages', 'categories') || [];

    function saveCategories() {
        BdApi.setData('QuickMessages', 'categories', categories);
    }
	
	async function getSlateTextAreaContextMenu() {
		let ret = undefined;
		while(ret == undefined) {
			ret = WebpackModules.find(m => m.default?.displayName === "SlateTextAreaContextMenu");

			if (ret == undefined) await new Promise(resolve => setTimeout(resolve, 1));
		}
		return ret;
	};
	
    class QuickMessages extends Plugin {
        constructor() {
            super();
        }

        buildSettingsPanel() {
            const that = this;
            const settingGroup = new SettingGroup("Clear Quick Messages", {
                shown: true,
                collapsible: false
            });
            const div = document.createElement("div");
            div.innerHTML = '<button class="button-f2h6uQ lookFilled-yCfaCM colorRed-rQXKgM sizeMedium-2bFIHr grow-2sR_-F">Delete All Quick Messages</button>'
            div.onclick = _ => {
                BdApi.showConfirmationModal('Are you sure?', 'This action is undonable. You will not be able to restore the deleted data.', {
                    confirmText: 'Delete',
                    danger: true,
                    onConfirm: function () {
                        BdApi.setData(that.getName(), 'messages', []);
                        that.forceUpdate();
                        BdApi.alert('QuickMessages', 'Successfully Removed All Quick Messages!');
                    }
                })
            }
            settingGroup.append(div);
            return new SettingPanel(this.saveSettings.bind(this), settingGroup);
        }

        getSettingsPanel() {
            return this.buildSettingsPanel().getElement();
        }

        async onStart() {
            this.patchTextAreaContextMenus();
        }

        onStop() {
            Patcher.unpatchAll();
        }

        forceUpdate() {
            saveCategories();
            updateMessages();
            Patcher.unpatchAll();
            this.patchTextAreaContextMenus();
        }
		

        async patchTextAreaContextMenus() {
            var shouldPaste = true;
			const SlateTextAreaContextMenu = await getSlateTextAreaContextMenu();
			const CloseCircle = BdApi.findModuleByDisplayName('CloseCircle');
            const ComponentDispatch = BdApi.findModuleByProps("ComponentDispatch").ComponentDispatch;
            const ChannelTextAreaContainer = WebpackModules.find(m => m.type && m.type.render && m.type.render.displayName === "ChannelTextAreaContainer").type;
            const children = [];
            const saveToCategory = [];
            var text = "";

            categories.forEach(cat => {
                saveToCategory.push(
                    ContextMenu.buildMenuItem({
                        label: cat.name,
                        action: _ => {
                            const category = categories.filter(e => e.name === cat.name)[0];
                            categories[categories.indexOf(category)].items.push(text);
                            this.forceUpdate();
                            BdApi.showToast(`Successfully created new Quick Message!`, { type: 'success' });
                        }
                    })
                )
                const catChildren = [];
                cat.items.forEach(e => {
                    catChildren.push(ContextMenu.buildMenuItem({
                        label: e,
                        action: _ => {
                            if (!shouldPaste) return;
                            ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", { content: e })
                        },
                        hint: React.createElement(CloseCircle, {
                            onClick: _ => {
                                shouldPaste = false;
                                const category = categories.filter(e => e.name === cat.name)[0];
                                categories[categories.indexOf(category)].items = Library.Utilities.removeFromArray(categories[categories.indexOf(category)].items, e);
                                this.forceUpdate();
                                BdApi.showToast(`Successfully removed Quick Message!`, { type: 'success' });
                            },
                            width: '15px',
                            height: '15px'
                        })
                    }))
                });
                catChildren.push(ContextMenu.buildMenuItem({
                    label: "Delete Category", danger: true, action: _ => {
                        BdApi.showConfirmationModal(`Delete '${cat.name}'`, [
                            React.createElement(BdApi.findModuleByDisplayName("Card"), {
                                children: [
                                    React.createElement(BdApi.findModuleByDisplayName("Text"), {
                                        children: ["Are you sure you want to delete ", React.createElement("strong", {}, cat.name), "? This action cannot be undone."],
                                        size: "size16-rrJ6ag"
                                    })
                                ],
                                "type": "cardWarning",
                                "className": "card-1LSSlz spacing-1JirW3 marginBottom20-315RVT",
                            })
                        ], {
                            danger: true,
                            confirmText: "Delete",
                            onConfirm: _ => {
                                Library.Utilities.removeFromArray(categories, categories[categories.indexOf(cat)]);
                                this.forceUpdate();
                            }
                        })
                    }
                }))
                children.push(ContextMenu.buildMenuItem({
                    label: cat.name,
                    children: catChildren
                }));
            })

            messages.forEach(message => {
                if (messages.indexOf(message) === 0) children.push(ContextMenu.buildMenuItem({ type: 'separator' }))
                children.push(ContextMenu.buildMenuItem({
                    label: message,
                    action: _ => {
                        if (!shouldPaste) return;
                        ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", { content: message })
                    },
                    hint: React.createElement(CloseCircle, {
                        onClick: _ => {
                            shouldPaste = false;
                            configArrayRemove("QuickMessages", 'messages', message);
                            this.forceUpdate();
                            BdApi.showToast(`Successfully removed Quick Message!`, { type: 'success' });
                        },
                        width: '15px',
                        height: '15px'
                    })
                }));
            })


            const patch = (_, [props], ret) => {
                Patcher.after(ChannelTextAreaContainer, "render", (_, [{ textValue }], ret) => {
                    text = textValue;
                });

                ret.props.children.push(
                    ContextMenu.buildMenuItem({
                        type: "separator"
                    }),
                    ContextMenu.buildMenuItem({
                        label: "Save as Quick Message",
                        disabled: props.editor.containerRef.current.textContent.slice(0, -1) == props.editor.props.placeholder,
                        action: _ => {
                            configArrayPush("QuickMessages", "messages", text);
                            this.forceUpdate();
                            BdApi.showToast(`Successfully created new Quick Message!`, { type: 'success' });
                        },
                        children: [
                            saveToCategory,
                            ContextMenu.buildMenuItem({ type: 'separator' }),
                            ContextMenu.buildMenuItem({
                                label: 'Create a category...',
                                action: _ => {
                                    const FormItem = BdApi.findModuleByDisplayName("FormItem");
                                    const TextInput = BdApi.findModuleByDisplayName("TextInput");
                                    const Text = BdApi.findModuleByDisplayName("Text");
                                    let categoryName = "";

                                    Library.Modals.showModal("Create Category", [
                                        React.createElement(FormItem, {
                                            title: "Category Name",
                                            children: [
                                                React.createElement(TextInput, {
                                                    type: "text",
                                                    placeholder: "New Category",
                                                    onChange: e => {
                                                        categoryName = e;
                                                    }
                                                }),
                                                React.createElement(Text, {
                                                    children: ["This field is required"],
                                                    size: "size12-oc4dx4",
                                                    color: "colorStatusRed-3FRrPF",
                                                    className: "error-fZAH7V marginTop8-24uXGp",
                                                })
                                            ]
                                        })
                                    ], {
                                        danger: false,
                                        confirmText: "Create",
                                        onConfirm: _ => {
                                            const category = categories.filter(e => e.name === categoryName)[0];
                                            if (category) {
                                                categories[categories.indexOf(category)].items.push(text);
                                                this.forceUpdate();
                                            } else {
                                                categories.push({
                                                    name: categoryName,
                                                    items: [text]
                                                });
                                                this.forceUpdate();
                                            }
                                        }

                                    })
                                }
                            })
                        ]
                    }),
                    ContextMenu.buildMenuItem({
                        label: "Quick Messages",
                        children: children.length > 0 ? children : ContextMenu.buildMenuItem({ label: 'None' }),
                    }));
            };
            Patcher.after(SlateTextAreaContextMenu, "default", patch)

        }
    }

    return QuickMessages;
})(global.ZeresPluginLibrary.buildPlugin(config));
