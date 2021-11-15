/**
    * @name ClickToCopyUsername
    * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/ClickToCopyUsername/ClickToCopyUsername.plugin.js
    * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/ClickToCopyUsername/ClickToCopyUsername.plugin.js
    * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/ClickToCopyUsername
    * @version 0.0.2    
*/
    
    const request = require("request");
    const fs = require("fs");
    const path = require("path");
    
    const config = {
        info: {
            name: "ClickToCopyUsername",
            authors: [
                {
                    name: "QWERT"
                }
            ],
            version: "0.0.2",
            description: "Allows you to copy someone's username by pressing their nametag, like on mobile.",
        },
        changelog: [
            {
                title: "hello world",
                type: "added",
                items: [
                    "plugin"
                    ]
            }
        ],
        defaultConfig: []
    };
    
    module.exports = !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }
    
        load() {
            BdApi.showConfirmationModal("Library plugin is needed",
                `The library plugin needed for AQWERT'sPluginBuilder is missing. Please click Download Now to install it.`, {
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
        const { DiscordModules, WebpackModules, Patcher, PluginUtilities, Toasts } = Library;
        const { ElectronModule, React } = DiscordModules;
        class plugin extends Plugin {
            constructor() {
                super();
            }
            

            onStart() {
                this.patchNameTag();
            }
    
            onStop() {
                Patcher.unpatchAll();
            }   

            patchNameTag() {
                const NameTag = WebpackModules.find(m => m?.default?.displayName === "NameTag");
                Patcher.after(NameTag, "default",  (_, [props], ret) => {
                    ret.props.style = {
                        cursor: "pointer"
                    }
                    ret.props.onClick = _ => {
                        ElectronModule.copy(`${props.name}#${props.discriminator}`);
                        Toasts.success(`Successfully copied username for <strong>${props.name}</strong>!`);
                    };
                })
            }

        }
    
        return plugin;
    })(global.ZeresPluginLibrary.buildPlugin(config));
