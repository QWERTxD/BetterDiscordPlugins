/**
 * @name UserVolumeBooster
 * @description Allows you to set a user's volume above the normal 200%
 * @version 1.0.0
 * @author QWERT
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
		"name": "UserVolumeBooster",
		"description": "Allows you to set a user's volume above the normal 200%",
		"version": "1.0.0",
		"author": "QWERT"
	},
	"build": {
		"zlibrary": true,
		"copy": true,
		"production": false,
		"scssHash": false,
		"alias": {
			"icons": "components/icons"
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
			default: () => Plugin
		});
		const {
			React,
			ReactDOM,
			Patcher,
			findModule: get,
			findModuleByProps: getByProps,
			findModuleByDisplayName: getByName,
			getData,
			setData
		} = BdApi;
		const Slider = getByName("Slider");
		const FormItem = getByName("FormItem");
		class Plugin {
			start() {
				console.log("%cUser Volume Booster", "background: #61DBFB; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Successfully started.");
				this.patch();
			}
			stop() {
				Patcher.unpatchAll("slider");
				console.log("%cUser Volume Booster", "background: #61DBFB; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Stopped.");
			}
			patch() {
				Patcher.after("slider", Slider.prototype, "render", ((_this, [props]) => {
					var _this$props;
					if ("slider-2zxowp" !== (null === _this || void 0 === _this ? void 0 : null === (_this$props = _this.props) || void 0 === _this$props ? void 0 : _this$props.className)) return;
					_this.props.maxValue = 200 * this.getMultiplier();
					_this.state.range = 200 * this.getMultiplier();
					_this.state.max = 200 * this.getMultiplier();
					_this.state.value = _this.state.initialValueProp;
				}));
			}
			getMultiplier() {
				return getData("UserVolumeBooster", "multiplier") ?? 2;
			}
			getSettingsPanel() {
				return React.createElement(FormItem, {
					title: "Volume Multiplier"
				}, React.createElement(Slider, {
					initialValue: this.getMultiplier(),
					max: 5,
					min: 1,
					markers: [1, 2, 3, 4, 5],
					stickToMarkers: true,
					onValueChange: value => {
						setData("UserVolumeBooster", "multiplier", value);
					}
				}));
			}
		}
		module.exports.LibraryPluginHack = __webpack_exports__;
	})();
	const PluginExports = module.exports.LibraryPluginHack;
	return PluginExports.__esModule ? PluginExports.default : PluginExports;
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
							if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
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