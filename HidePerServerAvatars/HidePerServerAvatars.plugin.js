/**
 * @name HidePerServerAvatars
 * @version 1.0.0
 * @description Shows the actual users avatars in chat instead of their per-server avatar
 * @author QWERT
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/HideUserAvatarsPerServer
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/master/HideUserAvatarsPerServer/HideUserAvatarsPerServer.plugin.js
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/
/* Generated Code */
const config = {
	"info": {
		"name": "HidePerServerAvatars",
		"version": "1.0.0",
		"description": "Shows the actual users avatars in chat instead of their per-server avatar",
		"authors": [{
			"name": "QWERT",
			"discord_id": "678556376640913408",
			"github_username": "QWERTxD"
		}],
		"github": "https://github.com/QWERTxD/BetterDiscordPlugins/HideUserAvatarsPerServer",
		"github_raw": "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/master/HideUserAvatarsPerServer/HideUserAvatarsPerServer.plugin.js"
	},
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": false,
		"scssHash": false,
		"alias": {
			"components": "components/index.js"
		},
		"release": {
			"source": true,
			"readme": true
		}
	}
};
function buildPlugin([BasePlugin, PluginApi]) {
	const module = {
		exports: {}
	};
	(() => {
		"use strict";
		let __plugin_styles__ = "";
		let __style_element__ = null;
		var __webpack_require__ = {};
		(() => {
			__webpack_require__.n = module => {
				var getter = module && module.__esModule ? () => module["default"] : () => module;
				__webpack_require__.d(getter, {
					a: getter
				});
				return getter;
			};
		})();
		(() => {
			__webpack_require__.d = (exports, definition) => {
				for (var key in definition)
					if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
						enumerable: true,
						get: definition[key]
					});
			};
		})();
		(() => {
			__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
		})();
		(() => {
			__webpack_require__.r = exports => {
				if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
					value: "Module"
				});
				Object.defineProperty(exports, "__esModule", {
					value: true
				});
			};
		})();
		var __webpack_exports__ = {};
		__webpack_require__.r(__webpack_exports__);
		__webpack_require__.d(__webpack_exports__, {
			default: () => HideUserAvatarsPerServer
		});
		const external_BasePlugin_namespaceObject = BasePlugin;
		var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
		const external_PluginApi_namespaceObject = PluginApi;
		const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
		const UserPopoutHeader = external_PluginApi_namespaceObject.WebpackModules.find((m => {
			var _m$default;
			return "UserPopoutHeader" === (null === m || void 0 === m ? void 0 : null === (_m$default = m.default) || void 0 === _m$default ? void 0 : _m$default.displayName);
		}));
		class HideUserAvatarsPerServer extends(external_BasePlugin_default()) {
			onStart() {
				this.patch();
			}
			onStop() {
				external_PluginApi_namespaceObject.Patcher.unpatchAll();
			}
			patch() {
				external_PluginApi_namespaceObject.Patcher.after(external_PluginApi_DiscordModules_namespaceObject.GuildMemberStore, "getMember", ((_this, [props], ret) => {
					if (null !== ret && void 0 !== ret && ret.guildMemberAvatar) ret.guildMemberAvatar = null;
				}));
				external_PluginApi_namespaceObject.Patcher.after(UserPopoutHeader, "default", ((_this, [props]) => {
					if (null !== props && void 0 !== props && props.user) props.user.guildMemberAvatars = {};
				}));
			}
		}
		module.exports.LibraryPluginHack = __webpack_exports__;
	})();
	const PluginExports = module.exports.LibraryPluginHack;
	return PluginExports?.__esModule ? PluginExports.default : PluginExports;
}
module.exports = window.hasOwnProperty("ZeresPluginLibrary") ?
	buildPlugin(window.ZeresPluginLibrary.buildPlugin(config)) :
	class {
		getName() {
			return config.info.name;
		}
		getAuthor() {
			return config.info.authors.map(a => a.name).join(", ");
		}
		getDescription() {
			return `${config.info.description}. __**ZeresPluginLibrary was not found! This plugin will not work!**__`;
		}
		getVersion() {
			return config.info.version;
		}
		load() {
			BdApi.showConfirmationModal(
				"Library plugin is needed",
				[`The library plugin needed for ${config.info.name} is missing. Please click Download to install it.`], {
					confirmText: "Download",
					cancelText: "Cancel",
					onConfirm: () => {
						require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
							if (error) return require("electron").shell.openExternal("https://betterdiscord.app/plugin/ZeresPluginLibrary");
							await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
						});
					}
				}
			);
		}
		start() {}
		stop() {}
	};
/*@end@*/
