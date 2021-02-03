/**
 * @name RingEveryone
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/RingEveryone/RingEveryone.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/RingEveryone/RingEveryone.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/RingEveryone
 */


/// <reference types="bandagedbd/bdapi" />

const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "RingEveryone",
        authors: [
            {
                name: "QWERT",
                discord_id: "678556376640913408",
            },
            {
                name: "PSYX",
                discord_id: "663801812910080027",
            }
        ],
        version: "1.0.0",
        description: "Ring all group members at once.",
        github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/RingEveryone",
        github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/RingEveryone/RingEveryone.plugin.js",
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
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu } = Library;
    const { React } = DiscordModules;
    window.WebpackModules = WebpackModules;
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

    class RingEveryone extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            this.patchGroupContextMenu();
        }

        onStop() {
            Patcher.unpatchAll();
        }

        //full credit to PSYX#2021 for the idea!

        patchGroupContextMenu() {
            const GroupContextMenu = WebpackModules.findAll(m => m.default && m.default.displayName.includes("GroupDMContextMenu"))[0];

            Patcher.after(GroupContextMenu, "default", (_, [props], returnValue) => {
                returnValue.props.children.push(
                    DiscordContextMenu.buildMenuItem({
                        type: "separator"
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "RingEveryone",
                        action: _ => {
                            const { getChannel } = BdApi.findModuleByProps("getChannel");
                            const { ring } = BdApi.findModuleByProps('ring');
                            const channel = getChannel(window.location.pathname.split('/')[3]);
                            ring(channel.id, channel.recipients)
                        }
                    })
                );
            });
            }
            
            

    }

    return RingEveryone;
})(global.ZeresPluginLibrary.buildPlugin(config));
