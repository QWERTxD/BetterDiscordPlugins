/**
 * @name CallOnGroupContextMenu
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/CallOnGroupContextMenu/CallOnGroupContextMenu.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/CallOnGroupContextMenu/CallOnGroupContextMenu.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/CallOnGroupContextMenu
 */

/// <reference types="bandagedbd/bdapi" />

const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "CallOnGroupContextMenu",
        authors: [
            {
                name: "QWERT",
                discord_id: "678556376640913408",
            }
        ],
        version: "0.0.1",
        description: "Adds option to call in the group context menu.",
        github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/CallOnGroupContextMenu",
        github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/CallOnGroupContextMenu/CallOnGroupContextMenu.plugin.js",
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(a => a.name).join();
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
    const { WebpackModules, Patcher, DiscordContextMenu, DiscordModules } = Library;
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


    class CallOnGroupContextMenu extends Plugin {
        constructor() {
            super();
        }


        onStart() {
            this.patchGroupContextMenu();
        }

        onStop() {
            Patcher.unpatchAll();
        }


        patchGroupContextMenu() {
            const GroupContextMenu = WebpackModules.findAll(m => m.default && m.default.displayName === "GroupDMContextMenu")[0];
            Patcher.after(GroupContextMenu, "default", (_, [props], returnValue) => { 
                const { channel } = props;

                returnValue.props.children[1].props.children.splice(0,0,
                DiscordContextMenu.buildMenuItem({
                    label: BdApi.findModuleByProps("CALL").CALL,
                    action: _ => {
                        BdApi.findModuleByProps('ring').call(channel.id, 0, []);
                    }
                }),
                DiscordContextMenu.buildMenuItem({
                    type: "separator"
                })
                );
            })
            }
    }

    return CallOnGroupContextMenu;
})(global.ZeresPluginLibrary.buildPlugin(config));
