/**
 * @name GrammarCorrect
 * @version 1.0.0
 * @description Corrects your grammar mistakes just like Grammarly
 * @author QWERT
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/GrammarCorrect
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/master/GrammarCorrect/GrammarCorrect.plugin.js
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
		"name": "GrammarCorrect",
		"version": "1.0.0",
		"description": "Corrects your grammar mistakes just like Grammarly",
		"authors": [{
			"name": "QWERT",
			"discord_id": "678556376640913408",
			"github_username": "QWERTxD"
		}],
		"github": "https://github.com/QWERTxD/BetterDiscordPlugins/GrammarCorrect",
		"github_raw": "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/master/GrammarCorrect/GrammarCorrect.plugin.js"
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
			default: () => GrammarCorrect
		});
		const external_BasePlugin_namespaceObject = BasePlugin;
		var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
		const external_PluginApi_namespaceObject = PluginApi;
		const {
			React,
			ReactDOM,
			Patcher,
			findModule: get,
			findModuleByProps: getByProps,
			findModuleByDisplayName: getByName,
			getData,
			setData,
			getInternalInstance
		} = BdApi;
		const {
			ComponentDispatch
		} = getByProps("ComponentDispatch");
		const Menu = getByProps("MenuItem");
		const SlateTextAreaContextMenu = get((m => {
			var _m$default;
			return "SlateTextAreaContextMenu" === (null === m || void 0 === m ? void 0 : null === (_m$default = m.default) || void 0 === _m$default ? void 0 : _m$default.displayName);
		}));
		const ChannelTextAreaContainer = get((m => {
			var _m$type, _m$type$render;
			return "ChannelTextAreaContainer" === (null === m || void 0 === m ? void 0 : null === (_m$type = m.type) || void 0 === _m$type ? void 0 : null === (_m$type$render = _m$type.render) || void 0 === _m$type$render ? void 0 : _m$type$render.displayName);
		}));
		const SwitchItem = getByName("SwitchItem");
		class GrammarCorrect extends(external_BasePlugin_default()) {
			onStart() {
				this.patch();
				this.patchSendMessage();
				console.log("%cGrammarCorrect", "background: #03C197; color: white; padding: 2px; border-radius: 4px; font-weight: 600;", "Successfully started.");
			}
			onStop() {
				Patcher.unpatchAll("grammar");
				console.log("%cGrammarCorrect", "background: #03C197; color: white; padding: 2px; border-radius: 4px; font-weight: 600;", "Stopped.");
			}
			isAuto() {
				return getData(this.constructor.name, "autoCorrect") ?? false;
			}
			patchSendMessage() {
				if (!this.isAuto()) return;
				Patcher.instead("grammar", external_PluginApi_namespaceObject.DiscordModules.MessageActions, "sendMessage", ((_this, [channelId, message, , reply], ret) => {
					this.correct(message.content).then((e => {
						message.content = e;
						ret(channelId, message, null, reply);
					}));
				}));
			}
			patch() {
				Patcher.after("grammar", SlateTextAreaContextMenu, "default", ((_this, [props], ret) => {
					const children = ret.props.children;
					let text = "";
					Patcher.after("grammar", ChannelTextAreaContainer.type, "render", ((_, [{
						textValue
					}]) => {
						text = textValue;
					}));
					children.splice(children.length - 1, 0, React.createElement(Menu.MenuGroup, null, React.createElement(Menu.MenuItem, {
						id: "correct",
						key: "correct",
						label: "Correct",
						action: async () => {
							const correction = await this.correct(text);
							if (!correction) return ComponentDispatch.dispatch("SHAKE_APP", {
								duration: 200,
								intensity: 3
							});
							const textArea = document.querySelector(".textArea-2CLwUE");
							const editor = getInternalInstance(textArea).return.stateNode.editorRef;
							editor.moveToRangeOfDocument();
							editor.delete();
							editor.insertText(correction);
						}
					})));
				}));
			}
			async correct(text) {
				if ("" === text.trim()) return null;
				const resp = await fetch("https://orthographe.reverso.net/api/v1/Spelling", {
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify({
						autoReplace: true,
						generateRecommendations: false,
						generateSynonyms: false,
						getCorrectionDetails: true,
						interfaceLanguage: "en",
						language: "eng",
						locale: "Indifferent",
						origin: "interactive",
						text
					}),
					method: "POST"
				}).then((r => r.json()));
				return resp.text || null;
			}
			getSettingsPanel() {
				const that = this;
				return function() {
					const [state, setState] = React.useState(that.isAuto());
					return React.createElement(SwitchItem, {
						value: state,
						onChange: e => {
							setState(e);
							setData(that.constructor.name, "autoCorrect", e);
						}
					}, "Always correct messages before sending");
				};
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
