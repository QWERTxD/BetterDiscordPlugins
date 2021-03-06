/**
 * @name QuickMessages
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/QuickMessages/QuickMessages.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickMessages/QuickMessages.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages
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
        version: "1.1.0",
        description: "Save messages to quickly send them later, when you need.",
        github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages",
        github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickMessages/QuickMessages.plugin.js",
    },
            changelog: [
            {
                title: "Fixed",
                type: "fixed",
                items: [
                    "Emojis will now be saved. (Thanks to dav1312 for the report https://github.com/QWERTxD/BetterDiscordPlugins/issues/4)"
                ],
            },
            {
                title: "Improvements",
                type: "improved",
                items: [
                    "Rewritten the Patch of the context menu."
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
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu, Settings } = Library;
    const { SettingPanel, SettingGroup } = Settings;

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
            var shouldPaste = true;
            const SlateTextAreaContextMenu = WebpackModules.find(m => m.default?.displayName === "SlateTextAreaContextMenu");
            const CloseCircle = BdApi.findModuleByDisplayName('CloseCircle');
            const ComponentDispatch = BdApi.findModuleByProps("ComponentDispatch").ComponentDispatch;
            const ChannelTextAreaContainer = WebpackModules.find(m => m.type && m.type.render && m.type.render.displayName === "ChannelTextAreaContainer").type;
                const children = [];                                 
                messages.forEach(message => {
                    children.push(DiscordContextMenu.buildMenuItem({
                        label: message,
                        action: _ => {
                           if(!shouldPaste) return;
                           ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {content: message})
                        },
                        hint: React.createElement(CloseCircle, {
                            onClick: _ => {
                                shouldPaste = false;
                                configArrayRemove("QuickMessages", 'messages', message);
                                this.forceUpdate();
                                BdApi.showToast(`Successfully removed Quick Message!`, {type: 'success'});
                            },
                            width: '15px',
                            height: '15px'
                        })
                    }));
                })
                
                const patch = (_, [props], ret) => {
                    ret.props.children.push(
                    DiscordContextMenu.buildMenuItem({
                        type: "separator"
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "Save as Quick Message",
                        disabled: props.editor.containerRef.current.textContent.slice(0, -1) == props.editor.props.placeholder,
                        action:_ => {       
                            Patcher.after(ChannelTextAreaContainer, "render", (_, [{ textValue }], ret) => {
                            configArrayPush("QuickMessages", "messages", textValue);
                            this.forceUpdate();
                            BdApi.showToast(`Successfully created new Quick Message!`, {type: 'success'});
                        });
                        }
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "Quick Messages",
                        children: children.length > 0 ? children : DiscordContextMenu.buildMenuItem({label: 'None'}),
                      }));
                    };
                    Patcher.after(SlateTextAreaContextMenu, "default", patch);

            }
            
            

    }

    return QuickMessages;
})(global.ZeresPluginLibrary.buildPlugin(config));
