/**
 * @name QuickMessages
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/QuickMessages/QuickMessages.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickMessages/QuickMessages.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages
 */

/// <reference types="bandagedbd/bdapi" />

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
        version: "1.0.31",
        description: "Save messages to quickly send them later, when you need.",
        github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages",
        github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickMessages/QuickMessages.plugin.js",
        changelog: [
            {
                type: 'added',
                title: 'Added',
                items: ['Changelog']
            }
        ]
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors[0].name;
    }

    getVersion() {
        return config.info.version;
    }

    getDescription() {
        return config.info.description;
    }



    load() {
        
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                        if (error)
                            return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");

                        fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                    });
                }
            });
    }

    start() {  }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu, Settings } = Library;
    const { SettingPanel, SettingGroup, Dropdown } = Settings;

    const { React } = DiscordModules;
    function configArrayPush(name, key, data) {
        const config = BdApi.getData(name, key) || [];
        if(config.includes(data)) return;
        config.push(data);
        BdApi.setData(name, key, config);
    }

    const configArrayRemove = function(name, key, value) { 
        const data = BdApi.getData(name, key) || [];
        const config = data.filter(function(x){ 
            return x != value; 
        });
        BdApi.setData(name, key, config)
    }

    var messages = BdApi.getData('QuickMessages', 'messages') || [];

    function updateMessages() {
        messages = BdApi.getData('QuickMessages', 'messages') || [];
    }
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
            div.innerHTML = '<button class="button-38aScr lookFilled-1Gx00P colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN">Delete All Quick Messages</button>'
            div.onclick = _ => {
                BdApi.showConfirmationModal('Are you sure?', 'This action is undonable. You will not be able to restore the deleted data.' , {
                    confirmText: 'Delete',
                    danger: true,
                    onConfirm: function() {
                        BdApi.setData(that.getName(), 'messages', []);
                        that.forceUpdate();
                        BdApi.alert('QuickMessages', 'Successfully Removed All Quick Messages!');
                    }
                })
            }
            settingGroup.append(div)
            return new SettingPanel(this.saveSettings.bind(this), settingGroup);
            

        }

        getSettingsPanel() {
            return this.buildSettingsPanel().getElement();
        }

        onStart() {
            this.patchTextAreaContextMenus();
        }

        onStop() {
            Patcher.unpatchAll();
        }

        forceUpdate() {
            updateMessages();
            Patcher.unpatchAll();
            this.patchTextAreaContextMenus();
        }

        patchTextAreaContextMenus() {
            var en = true;
            const TextAreaContextMenus = WebpackModules.findAll(m => m.default && m.default.displayName.includes("SlateTextAreaContextMenu"))[0];
                const children = [];                                 
                messages.forEach(message => {
                    children.push(DiscordContextMenu.buildMenuItem({
                        label: message,
                        action: _ => {
                            en === true ? BdApi.findModuleByProps("ComponentDispatch").ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {content: message}) : ''
                        },
                        hint: React.createElement('button', {
                            class: 'clearStatusButton-1Mxs1q da-clearStatusButton button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow',
                            onClick: _ => {
                                en = false;
                                configArrayRemove("QuickMessages", 'messages', message);
                                updateMessages();
                                Patcher.unpatchAll();
                                this.patchTextAreaContextMenus();
                                BdApi.showToast(`Successfully removed Quick Message!`, {type: 'success'})
                            },
                            },
                            React.createElement('svg', {
                            class: 'clearStatusIcon-3-MDNF da-clearStatusIcon',
                        }, React.createElement('path', {
                            fill: 'currentColor',
                            d: 'M7.02799 0.333252C3.346 0.333252 0.361328 3.31792 0.361328 6.99992C0.361328 10.6819 3.346 13.6666 7.02799 13.6666C10.71 13.6666 13.6947 10.6819 13.6947 6.99992C13.6947 3.31792 10.7093 0.333252 7.02799 0.333252ZM10.166 9.19525L9.22333 10.1379L7.02799 7.94325L4.83266 10.1379L3.89 9.19525L6.08466 6.99992L3.88933 4.80459L4.832 3.86259L7.02733 6.05792L9.22266 3.86259L10.1653 4.80459L7.97066 6.99992L10.166 9.19525Z',
                        })))
                    }));
                })
                
                const patch = (thisObject, [props], returnValue) => {
                returnValue.props.children.push(
                    DiscordContextMenu.buildMenuItem({
                        type: "separator"
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "Save as Quick Message",
                        disabled: props.editor.containerRef.current.textContent.slice(0, -1) == props.editor.props.placeholder,
                        action:_ => {
                            const save = props.editor.containerRef.current.innerText.replace(/\n\n/g, '\n').replace(/^\s+|\s+$/g, '');
                            configArrayPush("QuickMessages", "messages", save);
                            this.forceUpdate()
                            BdApi.showToast(`Successfully created new Quick Message!`, {type: 'success'})

                        }
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "Quick Messages",
                        children: children.length > 0 ? children : DiscordContextMenu.buildMenuItem({label: 'None'}),
                    })
                );
            };
 
                    Patcher.after(TextAreaContextMenus, "default", patch);
            }
            
            

    }

    return QuickMessages;
})(global.ZeresPluginLibrary.buildPlugin(config));
