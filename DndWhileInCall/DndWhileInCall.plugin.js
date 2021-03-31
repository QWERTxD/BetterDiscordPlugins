/**
 * @name DndWhileInCall
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/DndWhileInCall/DndWhileInCall.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/DndWhileInCall/DndWhileInCall.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/DndWhileInCall
 * @invite zMnHFAKsu3
 */

 const request = require("request");
 const fs = require("fs");
 const path = require("path");

 const config = {
     info: {
         name: "DndWhileInCall",
         authors: [
             {
                 name: "Martin640",
                 discord_id: "195157650831310848",
             },
             {
                 name: "QWERT",
                 discord_id: "678556376640913408",
             }
         ],
         version: "0.0.1",
         description: "Automatically updates your status to Do Not Disturb when you're in a call.",
         github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/DndWhileInCall",
         github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/DndWhileInCall/DndWhileInCall.plugin.js",
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
     class DndInCall extends Plugin {
         constructor() {
             super();
         }

         async connectionStateChange(event) {
			 console.log(event);
             const { state } = event;
             if (state === 'RTC_CONNECTED') {
                 const StatusStore = BdApi.findModuleByProps('getStatus');
                 const currentUser = BdApi.findModuleByProps('getCurrentUser').getCurrentUser();
                 const status = StatusStore.getStatus(currentUser.id);
				 console.log(currentUser);
                 if(status === 'dnd') return;
                 await BdApi.saveData("DndWhileInCall", "status", status)
                 BdApi.findModuleByProps('updateRemoteSettings').updateRemoteSettings({status: "dnd"})
             } else if (state === 'RTC_DISCONNECTED') {
                 const savedStatus = BdApi.getData("DndWhileInCall", "status");
                 BdApi.findModuleByProps('updateRemoteSettings').updateRemoteSettings({status: savedStatus})
             }
         }

         onStart() {
             Dispatcher.subscribe("RTC_CONNECTION_STATE", this.connectionStateChange);
         }

         onStop() {
             Dispatcher.unsubscribe("RTC_CONNECTION_STATE", this.connectionStateChange);
         }

     }

     return DndInCall;
 })(global.ZeresPluginLibrary.buildPlugin(config));
