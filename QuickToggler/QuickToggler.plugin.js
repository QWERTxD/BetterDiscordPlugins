/**
 * @name QuickToggler
 * @version 1.0.0
 * @description Allows you to open a toggle-able addon search with a keybind (default keybind: CTRL+D)
 * @author QWERT
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickToggler
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickToggler/QuickToggler.plugin.js
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%BetterDiscordplugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. 
(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.
Are you sure it's even installed?", 0, "Can't install myself", 0x10);
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
		"name": "QuickToggler",
		"version": "1.0.0",
		"description": "Allows you to open a toggle-able addon search with a keybind (default keybind: CTRL+D)",
		"authors": [{
			"name": "QWERT",
			"discord_id": "678556376640913408",
			"github_username": "QWERTxD"
		}],
		"github": "https://github.com/QWERTxD/BetterDiscordPlugins/tree/undefined/QuickToggler",
		"github_raw": "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/master/QuickToggler/QuickToggler.plugin.js"
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
		class StyleLoader {
			static styles = "";
			static element = null;
			static append(module, css) {
				this.styles += `/* ${module} */\n${css}`;
			}
			static inject(name = config.info.name) {
				if (this.element) this.element.remove();
				this.element = document.head.appendChild(Object.assign(document.createElement("style"), {
					id: name,
					textContent: this.styles
				}));
			}
			static remove() {
				if (this.element) {
					this.element.remove();
					this.element = null;
				}
			}
		}
		function ___createMemoize___(instance, name, value) {
			value = value();
			Object.defineProperty(instance, name, {
				value,
				configurable: true
			});
			return value;
		};
		const Modules = {
			get 'react-spring'() {
				return ___createMemoize___(this, 'react-spring', () => BdApi.findModuleByProps('useSpring'))
			},
			'@discord/utils': {
				get 'joinClassNames'() {
					return ___createMemoize___(this, 'joinClassNames', () => BdApi.findModule(m => typeof m?.default?.default === 'function')?.default)
				},
				get 'useForceUpdate'() {
					return ___createMemoize___(this, 'useForceUpdate', () => BdApi.findModuleByProps('useForceUpdate')?.useForceUpdate)
				},
				get 'Logger'() {
					return ___createMemoize___(this, 'Logger', () => BdApi.findModuleByProps('setLogFn')?.default)
				},
				get 'Navigation'() {
					return ___createMemoize___(this, 'Navigation', () => BdApi.findModuleByProps('replaceWith'))
				}
			},
			'@discord/components': {
				get 'Tooltip'() {
					return ___createMemoize___(this, 'Tooltip', () => BdApi.findModuleByDisplayName('Tooltip'))
				},
				get 'TooltipContainer'() {
					return ___createMemoize___(this, 'TooltipContainer', () => BdApi.findModuleByProps('TooltipContainer')?.TooltipContainer)
				},
				get 'TextInput'() {
					return ___createMemoize___(this, 'TextInput', () => BdApi.findModuleByDisplayName('TextInput'))
				},
				get 'SlideIn'() {
					return ___createMemoize___(this, 'SlideIn', () => BdApi.findModuleByDisplayName('SlideIn'))
				},
				get 'SettingsNotice'() {
					return ___createMemoize___(this, 'SettingsNotice', () => BdApi.findModuleByDisplayName('SettingsNotice'))
				},
				get 'TransitionGroup'() {
					return ___createMemoize___(this, 'TransitionGroup', () => BdApi.findModuleByDisplayName('TransitionGroup'))
				},
				get 'Button'() {
					return ___createMemoize___(this, 'Button', () => BdApi.findModuleByProps('DropdownSizes'))
				},
				get 'Flex'() {
					return ___createMemoize___(this, 'Flex', () => BdApi.findModuleByDisplayName('Flex'))
				},
				get 'Text'() {
					return ___createMemoize___(this, 'Text', () => BdApi.findModuleByDisplayName('Text'))
				},
				get 'Card'() {
					return ___createMemoize___(this, 'Card', () => BdApi.findModuleByDisplayName('Card'))
				}
			},
			'@discord/modules': {
				get 'Dispatcher'() {
					return ___createMemoize___(this, 'Dispatcher', () => BdApi.findModuleByProps('dirtyDispatch', 'subscribe'))
				},
				get 'EmojiUtils'() {
					return ___createMemoize___(this, 'EmojiUtils', () => BdApi.findModuleByProps('uploadEmoji'))
				},
				get 'PermissionUtils'() {
					return ___createMemoize___(this, 'PermissionUtils', () => BdApi.findModuleByProps('computePermissions'))
				},
				get 'DMUtils'() {
					return ___createMemoize___(this, 'DMUtils', () => BdApi.findModuleByProps('openPrivateChannel'))
				}
			},
			'@discord/stores': {
				get 'Messages'() {
					return ___createMemoize___(this, 'Messages', () => BdApi.findModuleByProps('getMessage', 'getMessages'))
				},
				get 'Channels'() {
					return ___createMemoize___(this, 'Channels', () => BdApi.findModuleByProps('getChannel'))
				},
				get 'Guilds'() {
					return ___createMemoize___(this, 'Guilds', () => BdApi.findModuleByProps('getGuild'))
				},
				get 'SelectedGuilds'() {
					return ___createMemoize___(this, 'SelectedGuilds', () => BdApi.findModuleByProps('getGuildId', 'getLastSelectedGuildId'))
				},
				get 'SelectedChannels'() {
					return ___createMemoize___(this, 'SelectedChannels', () => BdApi.findModuleByProps('getChannelId', 'getLastSelectedChannelId'))
				},
				get 'Info'() {
					return ___createMemoize___(this, 'Info', () => BdApi.findModuleByProps('getSessionId'))
				},
				get 'Status'() {
					return ___createMemoize___(this, 'Status', () => BdApi.findModuleByProps('getStatus'))
				},
				get 'Users'() {
					return ___createMemoize___(this, 'Users', () => BdApi.findModuleByProps('getUser'))
				},
				get 'SettingsStore'() {
					return ___createMemoize___(this, 'SettingsStore', () => BdApi.findModuleByProps('afkTimeout', 'status'))
				},
				get 'UserProfile'() {
					return ___createMemoize___(this, 'UserProfile', () => BdApi.findModuleByProps('getUserProfile'))
				},
				get 'Members'() {
					return ___createMemoize___(this, 'Members', () => BdApi.findModuleByProps('getMember'))
				},
				get 'Activities'() {
					return ___createMemoize___(this, 'Activities', () => BdApi.findModuleByProps('getActivities'))
				},
				get 'Games'() {
					return ___createMemoize___(this, 'Games', () => BdApi.findModuleByProps('getGame'))
				},
				get 'Auth'() {
					return ___createMemoize___(this, 'Auth', () => BdApi.findModuleByProps('getId', 'isGuest'))
				},
				get 'TypingUsers'() {
					return ___createMemoize___(this, 'TypingUsers', () => BdApi.findModuleByProps('isTyping'))
				}
			},
			'@discord/actions': {
				get 'ProfileActions'() {
					return ___createMemoize___(this, 'ProfileActions', () => BdApi.findModuleByProps('fetchProfile'))
				}
			},
			get '@discord/i18n'() {
				return ___createMemoize___(this, '@discord/i18n', () => BdApi.findModuleByProps('getLocale'))
			},
			get '@discord/constants'() {
				return ___createMemoize___(this, '@discord/constants', () => BdApi.findModuleByProps('API_HOST'))
			},
			get '@discord/contextmenu'() {
				return ___createMemoize___(this, '@discord/contextmenu', () => {
					const ctx = Object.assign({}, BdApi.findModuleByProps('openContextMenu'), BdApi.findModuleByProps('MenuItem'));
					ctx.Menu = ctx.default;
					return ctx;
				})
			},
			get '@discord/forms'() {
				return ___createMemoize___(this, '@discord/forms', () => BdApi.findModuleByProps('FormItem'))
			},
			get '@discord/scrollbars'() {
				return ___createMemoize___(this, '@discord/scrollbars', () => BdApi.findModuleByProps('ScrollerAuto'))
			},
			get '@discord/native'() {
				return ___createMemoize___(this, '@discord/native', () => BdApi.findModuleByProps('requireModule'))
			},
			get '@discord/flux'() {
				return ___createMemoize___(this, '@discord/flux', () => Object.assign({}, BdApi.findModuleByProps('useStateFromStores').default, BdApi.findModuleByProps('useStateFromStores')))
			},
			get '@discord/modal'() {
				return ___createMemoize___(this, '@discord/modal', () => Object.assign({}, BdApi.findModuleByProps('ModalRoot'), BdApi.findModuleByProps('openModal')))
			},
			get '@discord/connections'() {
				return ___createMemoize___(this, '@discord/connections', () => BdApi.findModuleByProps('get', 'isSupported', 'map'))
			},
			get '@discord/sanitize'() {
				return ___createMemoize___(this, '@discord/sanitize', () => BdApi.findModuleByProps('stringify', 'parse', 'encode'))
			},
			get '@discord/icons'() {
				return ___createMemoize___(this, '@discord/icons', () => BdApi.findAllModules(m => m.displayName && ~m.toString().indexOf('currentColor')).reduce((icons, icon) => (icons[icon.displayName] = icon, icons), {}))
			},
			'@discord/classes': {
				get 'Timestamp'() {
					return ___createMemoize___(this, 'Timestamp', () => BdApi.findModuleByPrototypes('toDate', 'month'))
				},
				get 'Message'() {
					return ___createMemoize___(this, 'Message', () => BdApi.findModuleByPrototypes('getReaction', 'isSystemDM'))
				},
				get 'User'() {
					return ___createMemoize___(this, 'User', () => BdApi.findModuleByPrototypes('tag'))
				},
				get 'Channel'() {
					return ___createMemoize___(this, 'Channel', () => BdApi.findModuleByPrototypes('isOwner', 'isCategory'))
				}
			}
		};
		var __webpack_modules__ = {
			832: module => {
				module.exports = BdApi.React;
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
				default: () => QuickToggler
			});
			const external_PluginApi_namespaceObject = PluginApi;
			const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
			const scrollbars_namespaceObject = Modules["@discord/scrollbars"];
			var scrollbars_default = __webpack_require__.n(scrollbars_namespaceObject);
			var external_BdApi_React_ = __webpack_require__(832);
			const external_fs_namespaceObject = require("fs");
			var external_fs_default = __webpack_require__.n(external_fs_namespaceObject);
			var React = __webpack_require__(832);
			function PluginIcon({
				fill,
				marginTop = 0
			}) {
				return React.createElement("svg", {
					viewBox: "0 0 24 24",
					fill,
					style: {
						width: 18,
						height: 18,
						opacity: .7,
						marginTop
					}
				}, React.createElement("path", {
					d: "M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"
				}));
			}
			var ThemeIcon_React = __webpack_require__(832);
			function ThemeIcon_PluginIcon({
				fill,
				marginTop = 0
			}) {
				return ThemeIcon_React.createElement("svg", {
					viewBox: "0 0 24 24",
					fill,
					style: {
						width: 18,
						height: 18,
						opacity: .7,
						marginTop
					}
				}, ThemeIcon_React.createElement("path", {
					d: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
				}));
			}
			const utils_namespaceObject = Modules["@discord/utils"];
			var Result_React = __webpack_require__(832);
			function _extends() {
				_extends = Object.assign || function(target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source)
							if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
					}
					return target;
				};
				return _extends.apply(this, arguments);
			}
			const classes = {
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("quickswitcher", "miscContainer", "scroller"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("input", "container", "emptyStateCTA", "protip"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("contentDefault", "guildIconContainer", "iconContainer", "name"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("icon", "header", "iconContainer"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("iconContainer", "match", "gameIconSize", "icon"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("resultFocused", "content", "note", "badge")
			};
			function Result(props) {
				const [state, setState] = (0, external_BdApi_React_.useState)(classes.result);
				return Result_React.createElement("div", _extends({
					className: (0, utils_namespaceObject.joinClassNames)(state),
					onMouseOver: () => setState([classes.result, classes.resultFocused]),
					onMouseLeave: () => setState(classes.result)
				}, props), Result_React.createElement("div", {
					className: (0, utils_namespaceObject.joinClassNames)(classes.contentDefault, classes.content)
				}, Result_React.createElement("div", {
					className: classes.iconContainer
				}, props.icon), Result_React.createElement("div", {
					className: classes.name
				}, Result_React.createElement("span", {
					className: classes.match
				}, props.name), Result_React.createElement("span", {
					className: classes.note
				}, props.info)), Result_React.createElement("div", {
					className: classes.misc
				}, Result_React.createElement("div", {
					className: classes.miscContainer
				}, props.desc))));
			}
			const external_path_namespaceObject = require("path");
			var external_path_default = __webpack_require__.n(external_path_namespaceObject);
			var AddonResult_React = __webpack_require__(832);
			const OverflowTooltip = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("OverflowTooltip");
			const {
				Colors
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("Colors");
			const {
				TooltipContainer: Tooltip
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("TooltipContainer");
			function AddonResult({
				addon
			}) {
				const type = addon.filename.toLowerCase().endsWith("js") ? "Plugin" : "Theme";
				const AddonActions = "Plugin" === type ? BdApi.Plugins : BdApi.Themes;
				const isEnabled = AddonActions.isEnabled(addon.id);
				const color = isEnabled ? Colors.STATUS_GREEN : Colors.STATUS_RED;
				const ContextMenu = external_PluginApi_namespaceObject.DiscordContextMenu.buildMenu([{
					label: "Reload",
					action: () => {
						AddonActions.reload(addon.id);
					},
					color: "colorBrand"
				}, {
					label: "Delete",
					action: () => {
						external_PluginApi_namespaceObject.Modals.showConfirmationModal("Are you sure?", `Are you sure you want to remove **${addon.name}**?`, {
							onConfirm: () => {
								try {
									external_fs_default().unlinkSync(external_path_default().resolve(AddonActions.folder, addon.filename));
								} catch (err) {
									external_PluginApi_namespaceObject.Toasts.error(`Could not remove <strong>${addon.name}</strong>! Check console for more info.`);
								}
							}
						});
					},
					color: "colorDanger"
				}]);
				return AddonResult_React.createElement(Result, {
					onClick: () => AddonActions.toggle(addon.id),
					onContextMenu: e => external_PluginApi_namespaceObject.DiscordContextMenu.openContextMenu(e, ContextMenu),
					name: addon.name,
					info: `v${addon.version} by ${addon.author}`,
					desc: AddonResult_React.createElement(OverflowTooltip, {
						children: addon.description
					}),
					icon: AddonResult_React.createElement(Tooltip, {
						text: `${type}, ${isEnabled ? "Enabled" : "Disabled"}`
					}, "Plugin" === type ? AddonResult_React.createElement(PluginIcon, {
						fill: color,
						marginTop: 10
					}) : AddonResult_React.createElement(ThemeIcon_PluginIcon, {
						fill: color,
						marginTop: 10
					}))
				});
			}
			var Results_React = __webpack_require__(832);
			function Results({
				query
			}) {
				const plugins = BdApi.Plugins.getAll();
				const themes = BdApi.Themes.getAll();
				let addonsByQuery;
				const addons = [...plugins, ...themes];
				addonsByQuery = addons.filter((addon => Object.values(addon).toString().toLowerCase().includes(query.toLowerCase().replace(/\$(plugin|theme|enabled|disabled)/g, "").trim())));
				if (query.includes("$plugin")) addonsByQuery = addonsByQuery.filter((addon => addon.filename.endsWith("js")));
				if (query.includes("$theme")) addonsByQuery = addonsByQuery.filter((addon => addon.filename.endsWith("css")));
				if (query.includes("$enabled")) addonsByQuery = addonsByQuery.filter((addon => {
					const addonStore = addon.filename.endsWith("js") ? BdApi.Plugins : BdApi.Themes;
					return addonStore.isEnabled(addon.id);
				}));
				if (query.includes("$disabled")) addonsByQuery = addonsByQuery.filter((addon => {
					const addonStore = addon.filename.endsWith("js") ? BdApi.Plugins : BdApi.Themes;
					return !addonStore.isEnabled(addon.id);
				}));
				return addonsByQuery.map((addon => Results_React.createElement(AddonResult, {
					addon
				})));
			}
			var QuickToggler_React = __webpack_require__(832);
			const QuickToggler_classes = {
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("quickswitcher", "miscContainer", "scroller"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("input", "container", "emptyStateCTA", "protip"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("contentDefault", "guildIconContainer", "iconContainer", "name"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("icon", "header", "iconContainer"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("iconContainer", "match", "gameIconSize", "icon"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("inline", "tip", "tip"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("protip"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("autocompleteQuerySymbol", "emptyStateCTA", "emptyStateNote")
			};
			const Modal = external_PluginApi_namespaceObject.WebpackModules.getByProps("ModalFooter");
			const Protip = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("Protip");
			const {
				open: QuickToggler_open
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("open", "close", "setSection");
			class QuickToggler_QuickToggler extends external_BdApi_React_.Component {
				constructor() {
					super();
					this.state = {
						query: ""
					};
				}
				render() {
					return QuickToggler_React.createElement("div", {
						className: QuickToggler_classes.quickswitcher
					}, QuickToggler_React.createElement("input", {
						className: QuickToggler_classes.input,
						placeholder: "What addon are you looking for?",
						onChange: e => this.setState({
							query: e.target.value
						})
					}), QuickToggler_React.createElement("div", {
						style: {
							height: 15
						}
					}), QuickToggler_React.createElement(Result, {
						name: "Plugins",
						icon: QuickToggler_React.createElement(PluginIcon, {
							fill: "var(--interactive-normal)"
						}),
						onClick: () => {
							QuickToggler_open("plugins");
							external_PluginApi_DiscordModules_namespaceObject.ModalStack.pop();
						}
					}), QuickToggler_React.createElement(Result, {
						name: "Themes",
						icon: QuickToggler_React.createElement(ThemeIcon_PluginIcon, {
							fill: "var(--interactive-normal)"
						}),
						onClick: () => {
							QuickToggler_open("themes");
							external_PluginApi_DiscordModules_namespaceObject.ModalStack.pop();
						}
					}), QuickToggler_React.createElement("div", {
						style: {
							height: 10
						}
					}), QuickToggler_React.createElement(scrollbars_default(), {
						className: QuickToggler_classes.scroller
					}, QuickToggler_React.createElement(Results, {
						query: this.state.query
					})), QuickToggler_React.createElement(Modal.ModalContent, null, QuickToggler_React.createElement(Protip, {
						className: QuickToggler_classes.protip,
						type: QuickToggler_classes.inline
					}, "Use ", QuickToggler_React.createElement("span", {
						className: QuickToggler_classes.autocompleteQuerySymbol
					}, "$enabled"), ", ", QuickToggler_React.createElement("span", {
						className: QuickToggler_classes.autocompleteQuerySymbol
					}, "$disabled"), ", ", QuickToggler_React.createElement("span", {
						className: QuickToggler_classes.autocompleteQuerySymbol
					}, "$plugin"), ", and ", QuickToggler_React.createElement("span", {
						className: QuickToggler_classes.autocompleteQuerySymbol
					}, "$theme"), " to filter results.")));
				}
			}
			const forms_namespaceObject = Modules["@discord/forms"];
			var Settings_React = __webpack_require__(832);
			const KeybindRecorder = external_PluginApi_namespaceObject.WebpackModules.getByDisplayName("KeybindRecorder");
			function Settings({
				settings,
				saveSettings
			}) {
				return Settings_React.createElement(forms_namespaceObject.FormItem, {
					title: "Quick Toggler Keybind"
				}, Settings_React.createElement(KeybindRecorder, {
					defaultValue: settings.keybind || [
						[0, 162],
						[0, 68]
					],
					onChange: e => saveSettings({
						keybind: e
					})
				}));
			}
			var plugins_QuickToggler_React = __webpack_require__(832);
			let keys = {};
			let settings = {};
			class QuickToggler extends(external_BasePlugin_default()) {
				onStart() {
					settings = this.getSettings();
					document.addEventListener("keydown", this.keydown, true);
					document.addEventListener("keyup", this.openModal, true);
				}
				keydown(ev) {
					keys[ev.keyCode] = true;
				}
				openModal(e) {
					const keybinds = (settings?.keybind || [
						[0, 162],
						[0, 68]
					]).map((e => 162 === e[1] ? 17 : 160 === e[1] ? 16 : 164 === e[1] ? 18 : e[1]));
					if (keybinds.every((key => true === keys[key]))) {
						keys = {};
						external_PluginApi_DiscordModules_namespaceObject.ModalStack.push((() => plugins_QuickToggler_React.createElement(QuickToggler_QuickToggler, null)));
					} else setTimeout((() => keys = {}), 300);
					keys[e.key] = false;
				}
				onStop() {
					document.removeEventListener("keydown", this.keydown, true);
					document.removeEventListener("keyup", this.openModal, true);
				}
				getSettings() {
					return external_PluginApi_namespaceObject.PluginUtilities.loadSettings("QuickToggler", {
						keybind: [
							[0, 162],
							[0, 68]
						]
					});
				}
				saveSettings(newSettings) {
					external_PluginApi_namespaceObject.PluginUtilities.saveSettings("QuickToggler", newSettings);
					settings = newSettings;
				}
				getSettingsPanel() {
					return plugins_QuickToggler_React.createElement(Settings, {
						settings: this.getSettings(),
						saveSettings: this.saveSettings
					});
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