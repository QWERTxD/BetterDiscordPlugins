/**
 * @name DndWhilePlaying
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/DndWhilePlaying/DndWhilePlaying.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/DndWhilePlaying/DndWhilePlaying.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/DndWhilePlaying
 * @invite zMnHFAKsu3
 * @version 0.0.4
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
         version: "0.0.4",
         description: "Automatically updates your status to Do Not Disturb when playing games and resets it back when stopped playing.",
         github: "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/DndWhilePlaying",
         github_raw: "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/DndWhilePlaying/DndWhilePlaying.plugin.js",
     },
     changelog: [
         {
             "title": "Bug Fix",
             "type": "fixed",
             "items": ["fixed: plugin can now change status to dnd and back"]
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
    const UserSettingsProtoStore = BdApi.Webpack.getModule(
      (m) =>
        m &&
        typeof m.getName == "function" &&
        m.getName() == "UserSettingsProtoStore" &&
        m,
      { first: true, searchExports: true }
    );

    const UserSettingsProtoUtils = BdApi.Webpack.getModule(
      (m) =>
        m.ProtoClass &&
        m.ProtoClass.typeName.endsWith(".PreloadedUserSettings"),
      { first: true, searchExports: true }
    );
     class DndWhilePlaying extends Plugin {
         constructor() {
             super();
         }
 
         async runningGamesChange(event) {
             const { games } = event;

             const status = UserSettingsProtoStore.settings.status.status.value;

             if(status === 'invisible') return;

             if(games.length > 0) {
                 if(BdApi.getData("DndWhilePlaying", "inGame") !== true) {
                     await BdApi.saveData("DndWhilePlaying", "status", status);
                     await BdApi.saveData("DndWhilePlaying", "inGame", true);
                 }
                 if (status !== "dnd") {
                     UserSettingsProtoUtils.updateAsync(
                         "status",
                         (statusSetting) => {
                             statusSetting.status.value = "dnd";
                         },
                         0
                     );
                 }
                 
             } else if (games.length == 0) {
                 const savedStatus = BdApi.getData("DndWhilePlaying", "status");
                 if (savedStatus) {
                     UserSettingsProtoUtils.updateAsync(
                         "status",
                         (statusSetting) => {
                             statusSetting.status.value = savedStatus;
                         },
                         0
                     );
                 }

                 await BdApi.saveData("DndWhilePlaying", "status", false);
                 await BdApi.saveData("DndWhilePlaying", "inGame", false);
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
