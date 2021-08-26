/**
 * @name GlobalReplies
 * @version 1.0.2
 * @description Allows you to reply to messages outside of the channel they were sent in.
 * @author QWERT
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/GlobalReplies
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/master/GlobalReplies/GlobalReplies.plugin.js
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
		"name": "GlobalReplies",
		"version": "1.0.0",
		"description": "Allows you to reply to messages outside of the channel they were sent in.",
		"authors": [{
			"name": "QWERT",
			"discord_id": "678556376640913408",
			"github_username": "QWERTxD"
		}],
		"github": "https://github.com/QWERTxD/BetterDiscordPlugins/GlobalReplies",
		"github_raw": "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/master/GlobalReplies/GlobalReplies.plugin.js"
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
		var __webpack_modules__ = {
			698: module => {
				module.exports = global["BdApi"]["React"];
			}
		};
		var __webpack_module_cache__ = {};
		function __webpack_require__(moduleId) {
			var cachedModule = __webpack_module_cache__[moduleId];
			if (void 0 !== cachedModule) return cachedModule.exports;
			var module = __webpack_module_cache__[moduleId] = {
				exports: {}
			};
			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
			return module.exports;
		}
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
		(() => {
			__webpack_require__.r(__webpack_exports__);
			__webpack_require__.d(__webpack_exports__, {
				default: () => GlobalReplies
			});
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
			const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
			const external_PluginApi_namespaceObject = PluginApi;
			const external_BdApi_findModuleByProps_FormItem_namespaceObject = BdApi.findModuleByProps("FormItem");
			const external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject = {
				get Tooltip() {
					const value = BdApi.findModuleByDisplayName("Tooltip");
					Object.defineProperty(this, "Tooltip", {
						value,
						configurable: true
					});
					return value;
				},
				get TooltipContainer() {
					const value = BdApi.findModuleByProps("TooltipContainer")?.TooltipContainer;
					Object.defineProperty(this, "TooltipContainer", {
						value,
						configurable: true
					});
					return value;
				},
				get TextInput() {
					const value = BdApi.findModuleByDisplayName("TextInput");
					Object.defineProperty(this, "TextInput", {
						value,
						configurable: true
					});
					return value;
				},
				get SlideIn() {
					const value = BdApi.findModuleByDisplayName("SlideIn");
					Object.defineProperty(this, "SlideIn", {
						value,
						configurable: true
					});
					return value;
				},
				get SettingsNotice() {
					const value = BdApi.findModuleByDisplayName("SettingsNotice");
					Object.defineProperty(this, "SettingsNotice", {
						value,
						configurable: true
					});
					return value;
				},
				get TransitionGroup() {
					const value = BdApi.findModuleByDisplayName("TransitionGroup");
					Object.defineProperty(this, "TransitionGroup", {
						value,
						configurable: true
					});
					return value;
				},
				get Button() {
					const value = BdApi.findModuleByProps("DropdownSizes");
					Object.defineProperty(this, "Button", {
						value,
						configurable: true
					});
					return value;
				},
				get Flex() {
					const value = BdApi.findModuleByDisplayName("Flex");
					Object.defineProperty(this, "Flex", {
						value,
						configurable: true
					});
					return value;
				},
				get Text() {
					const value = BdApi.findModuleByDisplayName("Text");
					Object.defineProperty(this, "Text", {
						value,
						configurable: true
					});
					return value;
				}
			};
			var external_BdApi_React_ = __webpack_require__(698);
			var React = __webpack_require__(698);
			const {
				getData,
				setData
			} = BdApi;
			function getTemplate() {
				return getData("GlobalReplies", "template") ?? `Replying to {{author}} {{messageLink}} `;
			}
			function Variable(props) {
				return React.createElement("p", null, React.createElement("strong", null, props.title), " ", React.createElement("span", null, " — "), " ", React.createElement("span", null, props.desc));
			}
			function Settings() {
				const [state, setState] = (0, external_BdApi_React_.useState)(getTemplate());
				return [React.createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormItem, {
					title: "Global reply template"
				}, React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.TextInput, {
					value: state,
					onChange: e => {
						setState(e);
						setData("GlobalReplies", "template", e);
					}
				}), React.createElement(external_get_Tooltip_n_const_value_BdApi_findModuleByDisplayName_Tooltip_n_Object_defineProperty_this_Tooltip_n_value_n_configurable_true_n_n_return_value_n_nget_TooltipContainer_n_const_value_BdApi_findModuleByProps_TooltipContainer_TooltipContainer_n_Object_defineProperty_this_TooltipContainer_n_value_n_configurable_true_n_n_return_value_n_nget_TextInput_n_const_value_BdApi_findModuleByDisplayName_TextInput_n_Object_defineProperty_this_TextInput_n_value_n_configurable_true_n_n_return_value_n_nget_SlideIn_n_const_value_BdApi_findModuleByDisplayName_SlideIn_n_Object_defineProperty_this_SlideIn_n_value_n_configurable_true_n_n_return_value_n_nget_SettingsNotice_n_const_value_BdApi_findModuleByDisplayName_SettingsNotice_n_Object_defineProperty_this_SettingsNotice_n_value_n_configurable_true_n_n_return_value_n_nget_TransitionGroup_n_const_value_BdApi_findModuleByDisplayName_TransitionGroup_n_Object_defineProperty_this_TransitionGroup_n_value_n_configurable_true_n_n_return_value_n_nget_Button_n_const_value_BdApi_findModuleByProps_DropdownSizes_n_Object_defineProperty_this_Button_n_value_n_configurable_true_n_n_return_value_n_nget_Flex_n_const_value_BdApi_findModuleByDisplayName_Flex_n_Object_defineProperty_this_Flex_n_value_n_configurable_true_n_n_return_value_n_nget_Text_n_const_value_BdApi_findModuleByDisplayName_Text_n_Object_defineProperty_this_Text_n_value_n_configurable_true_n_n_return_value_n_namespaceObject.Button, {
					look: "lookLink-9FtZy-",
					onClick: () => {
						setState(`Replying to {{author}} {{messageLink}} `);
						setData("GlobalReplies", "template", `Replying to {{author}} {{messageLink}} `);
					}
				}, "Reset")), React.createElement(external_BdApi_findModuleByProps_FormItem_namespaceObject.FormNotice, {
					title: "Variables",
					type: "cardWarningOutline",
					body: [React.createElement("p", null), React.createElement(Variable, {
						title: "{{author}}",
						desc: "Being replaced with the author mention"
					}), React.createElement(Variable, {
						title: "{{authorTag}}",
						desc: "Being replaced with the author tag (User#0000)"
					}), React.createElement(Variable, {
						title: "{{messageLink}}",
						desc: "Being replaced with the replied message link"
					}), React.createElement(Variable, {
						title: "{{channel}}",
						desc: "Being replaced with the channel of the replied message"
					}), React.createElement(Variable, {
						title: "{{message}}",
						desc: "Will be replaced with the user message"
					})]
				})];
			}
			var GlobalReplies_React = __webpack_require__(698);
			const {
				Patcher,
				findModule: get,
				findModuleByProps: getByProps,
				findModuleByDisplayName: getByName,
				getData: GlobalReplies_getData,
				setData: GlobalReplies_setData
			} = BdApi;
			const {
				ComponentDispatch
			} = getByProps("ComponentDispatch");
			const MessageContextMenu = get((m => {
				var _m$default;
				return "MessageContextMenu" === (null === m || void 0 === m ? void 0 : null === (_m$default = m.default) || void 0 === _m$default ? void 0 : _m$default.displayName);
			}));
			const Menu = getByProps("MenuItem");
			const ChannelText = getByName("ChannelText");
			const {
				getChannels
			} = getByProps("getChannels");
			const GuildPermissions = getByProps("can");
			const {
				Permissions
			} = getByProps("Permissions");
			class GlobalReplies extends(external_BasePlugin_default()) {
				onStart() {
					this.patch();
					console.log("%cGlobalReplies", "background: #1c90b5; color: white; padding: 2px; border-radius: 4px; font-weight: bold;", "Successfully started.");
				}
				onStop() {
					console.log("%cGlobalReplies", "background: #1c90b5; color: white; padding: 2px; border-radius: 4px; font-weight: bold;", "stopped.");
					Patcher.unpatchAll(this.constructor.name);
				}
				patch() {
					Patcher.after(this.constructor.name, MessageContextMenu, "default", ((_this, [props], ret) => {
						var _props$message;
						const channel = external_PluginApi_DiscordModules_namespaceObject.ChannelStore.getChannel(null === props || void 0 === props ? void 0 : null === (_props$message = props.message) || void 0 === _props$message ? void 0 : _props$message.channel_id);
						const server = external_PluginApi_DiscordModules_namespaceObject.GuildStore.getGuild(null === channel || void 0 === channel ? void 0 : channel.guild_id);
						const channels = getChannels(null === server || void 0 === server ? void 0 : server.id);
						if (!server || !(null !== server && void 0 !== server && server.id)) return;
						const tree = ret.props.children[2].props.children;
						tree.splice(6, 0, GlobalReplies_React.createElement(Menu.MenuItem, {
							id: "gloabl-reply",
							label: "Global Reply",
							children: channels.SELECTABLE.filter((e => GuildPermissions.can(Permissions.SEND_MESSAGES, e.channel))).map((e => GlobalReplies_React.createElement(Menu.MenuItem, {
								id: `${e.channel.name}-${e.comparator}`,
								action: () => {
									external_PluginApi_DiscordModules_namespaceObject.NavigationUtils.replaceWith(`/channels/${server.id}/${e.channel.id}`);
									ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {
										content: external_PluginApi_namespaceObject.Utilities.formatString(this.getTemplate(), {
											messageLink: `https://discord.com/channels/${server.id}/${channel.id}/${props.message.id}`,
											author: `<@${props.message.author.id}>`,
											authorTag: props.message.author.tag,
											message: props.message.content,
											channel: `<#${channel.id}>`
										})
									});
								},
								label: [GlobalReplies_React.createElement(ChannelText, {
									width: "10",
									height: "10"
								}), `    ${e.channel.name}`]
							})))
						}));
					}));
				}
				getTemplate() {
					return GlobalReplies_getData(this.constructor.name, "template") ?? `Replying to {{author}} {{messageLink}} `;
				}
				getSettingsPanel() {
					return GlobalReplies_React.createElement(Settings, null);
				}
			}
		})();
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
