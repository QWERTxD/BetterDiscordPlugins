/**
    * @name CopyRoleColors
    * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/CopyRoleColors/CopyRoleColors.plugin.js
    * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/CopyRoleColors/CopyRoleColors.plugin.js
    * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/CopyRoleColors
    */
    
    const request = require("request");
    const fs = require("fs");
    const path = require("path");
    
    const config = {
        info: {
            name: "CopyRoleColors",
            authors: [
                {
                    name: "QWERT"
                }
            ],
            version: "0.0.1",
            description: "Adds option to copy role color in the role context menu.",
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
        defaultConfig: [  ]
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
        const { DiscordModules, WebpackModules, Toasts, Patcher, DiscordContextMenu } = Library;
        const { Strings, ElectronModule } = DiscordModules;
        const MemberRole = WebpackModules.getByProps('MemberRole').MemberRole;
        class plugin extends Plugin {
            constructor() {
                super();
            }
            
            onStart() { 
                this.patch();    
            }
    
            onStop() { 
                Patcher.unpatchAll();
            }

            patch() {
                Patcher.after(MemberRole, "render", (_, [props], ret) => {
                    const newContextMenu = DiscordContextMenu.buildMenu([
                        {
                            label: "Copy Role Color",
                            action: _ => {
                                ElectronModule.copy(props.role.colorString || "#e1e1e1");
                                Toasts.success(`Successfully copied role color for <strong>${props.role.name}</strong>!`)
                            }
                        },
                        {
                            type: "separator"
                        },
                        {
                            label: Strings.COPY_ID,
                            action: _ => {
                                ElectronModule.copy(props.role.id);
                            }
                        }
                    ]);

                    ret.props.children.props.onContextMenu = e => {
                        DiscordContextMenu.openContextMenu(e, newContextMenu)
                    }
                });
                }    
        }
    
        return plugin;
    })(global.ZeresPluginLibrary.buildPlugin(config));