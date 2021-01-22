/**
 * @name QuickMessages
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickMessages/QuickMessages.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages
 */

/// <reference types="bandagedbd/bdapi" />
const request = require("request");
const fs = require("fs")
const config = {
    info: {
        name: "QuickMessages",
        authors: [
            {
                name: "QWERT",
                discord_id: "678556376640913408",
            }
        ],
        version: "0.0.1",
        description: "Send messages .",
        github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickMessages",
        changelog: [
            {
                title: "First Commit!",
                items: [
                    "Uploaded plugin."
                ]
            }
        ]
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors[0]
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

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu } = Library;
    const { React } = DiscordModules;
    window.Patcher = Patcher;
    window.DiscordContextMenu = DiscordContextMenu
    function configArrayPush(name, key, data) {
        const config = BdApi.getData(name, key);
        if(config.includes(data)) return;
        config.push(data);
        BdApi.setData(name, key, config);
    }

    const configArrayRemove = function(name, key, value) { 
    
        const config = BdApi.getData(name, key).filter(function(x){ 
            return x != value; 
        });
        BdApi.setData(name, key, config)
    }

    var messages = BdApi.getData('QuickMessages', 'messages');

    function updateMessages() {
        messages = BdApi.getData('QuickMessages', 'messages');
    }
    class QuickMessages extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            this.patchTextAreaContextMenus();
        }

        onStop() {
            Patcher.unpatchAll();
        }

        patchTextAreaContextMenus() {
            var en = true;
            const TextAreaContextMenus = WebpackModules.findAll(m => m.default && m.default.displayName.includes("TextAreaContextMenu"));
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
                        action:_ => {
                            configArrayPush("QuickMessages", "messages", document.getElementsByClassName('textArea-12jD-V')[0].textContent);
                            updateMessages();
                            Patcher.unpatchAll();
                            this.patchTextAreaContextMenus();
                            BdApi.showToast(`Successfully created new Quick Message!`, {type: 'success'})

                        }
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "Quick Messages",
                        children: children.length > 0 ? children : DiscordContextMenu.buildMenuItem({label: 'None'}),
                    })
                );
            };
 
                for (const TextAreaContextMenu of TextAreaContextMenus) {
                    Patcher.after(TextAreaContextMenu, "default", patch);
                }
            }
            
            

    }

    return QuickMessages;
})(global.ZeresPluginLibrary.buildPlugin(config));
