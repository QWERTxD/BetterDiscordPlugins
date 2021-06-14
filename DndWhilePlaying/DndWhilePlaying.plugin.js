/**
 * @name DndWhilePlaying
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/DndWhilePlaying/DndWhilePlaying.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/DndWhilePlaying/DndWhilePlaying.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/DndWhilePlaying
 * @invite zMnHFAKsu3
 * @version 0.0.2
 */

 const request = require("request");
 const fs = require("fs");
 const path = require("path");
 
 const config = {
     info: {
         name: "DndWhilePlaying",
         authors: [
             {
                 name: "QWERT",
                 discord_id: "678556376640913408",
             }
         ],
         version: "0.0.1",
         description: "Automatically updates your status to Do Not Disturb when playing games and resets it back when stopped playing.",
         github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/DndWhilePlaying",
         github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/DndWhilePlaying/DndWhilePlaying.plugin.js",
     },
     changelog: [
         {
             title: "Added",
             type: "added",
             items: ["Created Plugin"]
         }
     ]
 };
 
 module.exports = !global.ZeresPluginLibrary ? class {
     constructor() {
         this._config = config;
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
     const Dispatcher = BdApi.findModuleByProps("dispatch", "subscribe");
     class DndWhilePlaying extends Plugin {
         constructor() {
             super();
         }
 
         async runningGamesChange(event) {
             const { games } = event;
             if(games.length > 0) {
                 const StatusStore = BdApi.findModuleByProps('getStatus');
                 const currentUser = BdApi.findModuleByProps('getCurrentUser').getCurrentUser();
                 const status = StatusStore.getStatus(currentUser.id);
                 if(status === 'dnd') return;
                 await BdApi.saveData("DndWhilePlaying", "status", status)
                 BdApi.findModuleByProps('updateRemoteSettings').updateRemoteSettings({status: "dnd"})
             }else if(games.length == 0){
                 const savedStatus = BdApi.getData("DndWhilePlaying", "status");
                 BdApi.findModuleByProps('updateRemoteSettings').updateRemoteSettings({status: savedStatus})
             }
         }
 
         onStart() {
             Dispatcher.subscribe("RUNNING_GAMES_CHANGE", this.runningGamesChange);
         }
 
         onStop() {
             Dispatcher.unsubscribe("RUNNING_GAMES_CHANGE", this.runningGamesChange);
         }
 
     }
 
     return DndWhilePlaying;
 })(global.ZeresPluginLibrary.buildPlugin(config)); 
