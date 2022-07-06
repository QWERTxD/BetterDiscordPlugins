/**
 * @name AssignBadges
 * @version 1.0.29
 * @description Allows you to locally assign badges to users through the user context menu.
 * @author QWERT
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/AssignBadges
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/AssignBadges/AssignBadges.plugin.js
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
		"name": "AssignBadges",
		"version": "1.0.29",
		"description": "Allows you to locally assign badges to users through the user context menu.",
		"authors": [{
			"name": "QWERT",
			"discord_id": "678556376640913408",
			"github_username": "QWERTxD"
		}],
		"github": "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/AssignBadges",
		"github_raw": "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/AssignBadges/AssignBadges.plugin.js"
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
	},
	"changelog": [{
		"type": "fixed",
		"title": "Fixes",
		"items": [
			"Fixed the ContextMenus",
			"Fixed some issues with the Bot Tag"
		]
	}]
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
					return ___createMemoize___(this, 'joinClassNames', () => BdApi.findModule(e => e.toString().indexOf('return e.join(" ")') > 200))
				},
				get 'useForceUpdate'() {
					return ___createMemoize___(this, 'useForceUpdate', () => BdApi.findModuleByProps('useForceUpdate')?.useForceUpdate)
				},
				get 'Logger'() {
					return ___createMemoize___(this, 'Logger', () => BdApi.findModuleByProps('setLogFn')?.default)
				},
				get 'Navigation'() {
					return ___createMemoize___(this, 'Navigation', () => BdApi.findModuleByProps('replaceWith', 'currentRouteIsPeekView'))
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
					return ___createMemoize___(this, 'Button', () => BdApi.findModule(m => 'DropdownSizes' in m && typeof(m) === 'function'))
				},
				get 'Popout'() {
					return ___createMemoize___(this, 'Popout', () => BdApi.findModuleByDisplayName('Popout'))
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
				get 'ComponentDispatcher'() {
					return ___createMemoize___(this, 'ComponentDispatcher', () => BdApi.findModuleByProps('ComponentDispatch')?.ComponentDispatch)
				},
				get 'EmojiUtils'() {
					return ___createMemoize___(this, 'EmojiUtils', () => BdApi.findModuleByProps('uploadEmoji'))
				},
				get 'PermissionUtils'() {
					return ___createMemoize___(this, 'PermissionUtils', () => BdApi.findModuleByProps('computePermissions', 'canManageUser'))
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
					return ___createMemoize___(this, 'Channels', () => BdApi.findModuleByProps('getChannel', 'getDMFromUserId'))
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
					return ___createMemoize___(this, 'Status', () => BdApi.findModuleByProps('getStatus', 'getActivities', 'getState'))
				},
				get 'Users'() {
					return ___createMemoize___(this, 'Users', () => BdApi.findModuleByProps('getUser', 'getCurrentUser'))
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
					return ___createMemoize___(this, 'Games', () => BdApi.findModuleByProps('getGame', 'games'))
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
				},
				get 'GuildActions'() {
					return ___createMemoize___(this, 'GuildActions', () => BdApi.findModuleByProps('requestMembersById'))
				}
			},
			get '@discord/i18n'() {
				return ___createMemoize___(this, '@discord/i18n', () => BdApi.findModule(m => m.Messages?.CLOSE && typeof(m.getLocale) === 'function'))
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
				return ___createMemoize___(this, '@discord/modal', () => Object.assign({}, BdApi.findModuleByProps('ModalRoot'), BdApi.findModuleByProps('openModal', 'closeAllModals')))
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
			113: module => {
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
				default: () => AssignBadges
			});
			const external_PluginApi_namespaceObject = PluginApi;
			const external_BasePlugin_namespaceObject = BasePlugin;
			var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
			const contextmenu_namespaceObject = Modules["@discord/contextmenu"];
			const external_PluginApi_DiscordModules_namespaceObject = PluginApi.DiscordModules;
			const {
				BadgeKeys
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("BadgeKeys");
			const {
				UserFlags
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("UserFlags");
			const UserFlagsFormatted = [{
				id: "STAFF",
				value: UserFlags["STAFF"],
				name: "Discord Staff",
				key: BadgeKeys["STAFF"]
			}, {
				id: "PARTNER",
				value: UserFlags["PARTNER"],
				name: "Partnered Server Owner",
				key: BadgeKeys["PARTNER"]
			}, {
				id: "HYPESQUAD",
				value: UserFlags["HYPESQUAD"],
				name: "HypeSquad Events",
				key: BadgeKeys["HYPESQUAD"]
			}, {
				id: "HYPESQUAD_ONLINE_HOUSE_1",
				value: UserFlags["HYPESQUAD_ONLINE_HOUSE_1"],
				name: "House Bravery",
				key: BadgeKeys["HYPESQUAD_ONLINE_HOUSE_1"]
			}, {
				id: "HYPESQUAD_ONLINE_HOUSE_2",
				value: UserFlags["HYPESQUAD_ONLINE_HOUSE_2"],
				name: "House Brilliance",
				key: BadgeKeys["HYPESQUAD_ONLINE_HOUSE_2"]
			}, {
				id: "HYPESQUAD_ONLINE_HOUSE_3",
				value: UserFlags["HYPESQUAD_ONLINE_HOUSE_3"],
				name: "House Balance",
				key: BadgeKeys["HYPESQUAD_ONLINE_HOUSE_3"]
			}, {
				id: "EARLY_VERIFIED_BOT",
				value: 0,
				name: "Verified Bot",
				key: BadgeKeys["VERIFIED_BOT"]
			}, {
				id: "BUG_HUNTER_LEVEL_1",
				value: UserFlags["BUG_HUNTER_LEVEL_1"],
				name: "Bug Hunter Level 1",
				key: BadgeKeys["BUG_HUNTER_LEVEL_1"]
			}, {
				id: "BUG_HUNTER_LEVEL_2",
				value: UserFlags["BUG_HUNTER_LEVEL_2"],
				name: "Bug Hunter Level 2",
				key: BadgeKeys["BUG_HUNTER_LEVEL_2"]
			}, {
				id: "EARLY_SUPPORTER",
				value: UserFlags["PREMIUM_EARLY_SUPPORTER"],
				name: "Early Supporter",
				key: BadgeKeys["EARLY_SUPPORTER"]
			}, {
				id: "EARLY_VERIFIED_DEVELOPER",
				value: UserFlags["VERIFIED_DEVELOPER"],
				name: "Early Verified Bot Developer",
				key: BadgeKeys["EARLY_VERIFIED_DEVELOPER"]
			}, {
				id: "CERTIFIED_MODERATOR",
				value: UserFlags["CERTIFIED_MODERATOR"],
				name: "Discord Certified Moderator",
				key: BadgeKeys["CERTIFIED_MODERATOR"]
			}, {
				id: "PREMIUM",
				value: 0,
				name: "Nitro",
				key: BadgeKeys["PREMIUM"]
			}];
			const modules_UserFlags = UserFlagsFormatted;
			const utils_namespaceObject = Modules["@discord/utils"];
			var React = __webpack_require__(113);
			function _defineProperty(obj, key, value) {
				if (key in obj) Object.defineProperty(obj, key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
				else obj[key] = value;
				return obj;
			}
			const months = function(n) {
				return 26298e5 * n;
			};
			const day = 864e5;
			const {
				MenuCheckboxItem,
				MenuRadioItem
			} = external_PluginApi_namespaceObject.WebpackModules.getByProps("MenuRadioItem");
			const classes = {
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("executedCommand", "buttonContainer", "applicationName"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("container", "profileBadge18", "profileBadge22", "profileBadge22"),
				...external_PluginApi_namespaceObject.WebpackModules.getByProps("member", "lostPermission")
			};
			const memberlistClasses = external_PluginApi_namespaceObject.WebpackModules.getByProps("placeholder", "activity", "icon");
			const getFlags = external_PluginApi_namespaceObject.WebpackModules.find((m => {
				let d = m.default.toString();
				return ~d.indexOf("closeUserProfileModal") && ~d.indexOf("openPremiumSettings");
			}));
			const User = external_PluginApi_namespaceObject.WebpackModules.getByPrototypes("getAvatarURL");
			const BadgeList = external_PluginApi_namespaceObject.WebpackModules.getByProps("BadgeSizes").default;
			const boosts = [{
				id: "boost1",
				value: 0 << 0,
				name: "Booster - 1 Month",
				time: 1.04
			}, {
				id: "boost2",
				value: 0 << 0,
				name: "Booster - 2 Months",
				time: 2.04
			}, {
				id: "boost3",
				value: 0 << 0,
				name: "Booster - 3 Months",
				time: 3.04
			}, {
				id: "boost4",
				value: 0 << 0,
				name: "Booster - 6 Months",
				time: 6.04
			}, {
				id: "boost5",
				value: 0 << 0,
				name: "Booster - 9 Months",
				time: 9.04
			}, {
				id: "boost6",
				value: 0 << 0,
				name: "Booster - 1 Year",
				time: 12.04
			}, {
				id: "boost7",
				value: 0 << 0,
				name: "Booster - 1 Year and 3 Months",
				time: 15.04
			}, {
				id: "boost8",
				value: 0 << 0,
				name: "Booster - 1 Year and 6 Months",
				time: 18.04
			}, {
				id: "boost9",
				value: 0 << 0,
				name: "Booster - 2 Years",
				time: 24.04
			}];
			const BotTag = external_PluginApi_namespaceObject.WebpackModules.getByProps("BotTagTypes").default;
			const MessageAuthor = external_PluginApi_namespaceObject.WebpackModules.find((m => m.default.toString().indexOf("userOverride") > -1));
			const NameTag = external_PluginApi_namespaceObject.WebpackModules.find((m => "DiscordTag" === m.default.displayName));
			const flush = new Set;
			class AssignBadges extends(external_BasePlugin_default()) {
				constructor(...args) {
					super(...args);
					_defineProperty(this, "promises", {
						cancelled: false,
						cancel() {
							this.cancelled = true;
						}
					});
					_defineProperty(this, "patches", []);
				}
				onStart() {
					this.patchUserContextMenus();
					this.patchUserFlagGetter();
					this.patchUserStore();
					this.patchMessageAuthor();
					this.patchNameTag();
					this.patchMemberlistItem();
				}
				onStop() {
					external_PluginApi_namespaceObject.Patcher.unpatchAll();
					flush.forEach((f => f()));
				}
				isUserVerifiedBot(user) {
					const settings = this.getSettings();
					const userSettings = settings?.[user.id];
					if (userSettings && userSettings?.EARLY_VERIFIED_BOT) return true;
					return false;
				}
				patchUserFlagGetter() {
					external_PluginApi_namespaceObject.Patcher.before(getFlags, "default", ((_this, [props]) => {
						const settings = this.getSettings()?.[props.user.id];
						if (settings)
							if (true === settings?.PREMIUM) props.premiumSince = new Date(0);
						if (settings?.boost) {
							const boost = boosts[boosts.findIndex((e => e.id === settings.boost))];
							props.premiumGuildSince = new Date(Date.now() - months(boost.time) - day);
						}
					}));
				}
				patchUserStore() {
					external_PluginApi_namespaceObject.Patcher.after(external_PluginApi_DiscordModules_namespaceObject.UserStore, "getUser", ((_this, [id], ret) => {
						const settings = this.getSettings();
						const userSettings = settings?.[id];
						if (userSettings) {
							const newFlags = Object.keys(userSettings).filter((e => userSettings[e])).map((e => modules_UserFlags.find((f => f.id === e)))).filter((e => e)).map((e => e.value)).reduce(((a, b) => a + b), 0);
							ret.publicFlags = newFlags;
						}
					}));
				}
				patchMessageAuthor() {
					external_PluginApi_namespaceObject.Patcher.after(MessageAuthor, "default", ((_this, [props], ret) => {
						const user = props.message.author;
						if (!user) return;
						if (this.isUserVerifiedBot(user)) {
							const badgeIndex = props.compact ? 0 : 4;
							const displayClass = props.compact ? classes.botTagCompact : classes.botTagCozy;
							ret.props.children[badgeIndex] = React.createElement(BotTag, {
								verified: true,
								className: (0, utils_namespaceObject.joinClassNames)(displayClass, classes.botTag)
							});
						}
					}));
				}
				patchNameTag() {
					external_PluginApi_namespaceObject.Patcher.after(NameTag, "default", ((_this, [props], ret) => {
						const user = props.user;
						if (!user) return;
						if (this.isUserVerifiedBot(user)) {
							ret.props.botType = 0;
							ret.props.botVerified = true;
						}
					}));
				}
				async patchMemberlistItem() {
					const MemberListItem = await external_PluginApi_namespaceObject.ReactComponents.getComponentByName("MemberListItem", `.${classes.member}`);
					external_PluginApi_namespaceObject.Patcher.after(MemberListItem.component.prototype, "renderDecorators", (({
						props
					}, _, returnValue) => {
						try {
							const tree = returnValue?.props?.children;
							if (!Array.isArray(tree)) return;
							if (this.isUserVerifiedBot(props.user)) tree[0] = React.createElement(BotTag, {
								verified: true,
								className: memberlistClasses.botTag
							});
						} catch (error) {
							console.error("Error while patching MemberListItem:", error);
						}
					}));
					MemberListItem.forceUpdateAll();
				}
				async patchUserContextMenus() {
					const getMenu = props => {
						const settings = this.getSettings();
						const propsUser = external_PluginApi_DiscordModules_namespaceObject.UserStore.getUser(props);
						props = {
							user: propsUser
						};
						const userBadges = getFlags.default({
							user: propsUser
						}).map((badge => badge?.key));
						const [selectedBoost, setSelectedBoost] = React.useState(settings[props.user.id]?.boost);
						return React.createElement(contextmenu_namespaceObject.MenuItem, {
							id: "assign-badge",
							key: "assign-badge",
							label: "Manage Badges",
							children: [modules_UserFlags.map((flag => {
								const [state, setState] = React.useState(settings?.[props.user.id]?.hasOwnProperty(flag.id) ? settings?.[props.user.id]?.[flag.id] : ~userBadges.indexOf(flag.key));
								return React.createElement(MenuCheckboxItem, {
									id: flag.id,
									label: "EARLY_VERIFIED_BOT" !== flag.id ? React.createElement("div", {
										className: classes?.container
									}, React.createElement(BadgeList, {
										user: this.fakeUser(flag.value),
										premiumSince: "PREMIUM" === flag.id ? new Date(0) : null,
										size: 2
									}), flag.name) : React.createElement("div", {
										className: classes?.container
									}, React.createElement(BotTag, {
										verified: true
									})),
									checked: state,
									action: () => {
										const user = settings[props.user.id] || {};
										user[flag.id] = !state;
										settings[props.user.id] = user;
										this.saveSettings(settings);
										setState(!state);
									}
								});
							})), React.createElement(contextmenu_namespaceObject.MenuItem, {
								id: "boosts",
								label: React.createElement("div", {
									className: classes?.container
								}, React.createElement(BadgeList, {
									user: this.fakeUser(0),
									premiumGuildSince: new Date(Date.now() - months(3) - day),
									size: 2
								}), "Boosts")
							}, [boosts.map((boost => React.createElement(MenuRadioItem, {
								id: boost.id,
								checked: selectedBoost === boost.id,
								label: React.createElement("div", {
									className: classes?.container
								}, React.createElement(BadgeList, {
									user: this.fakeUser(0),
									premiumGuildSince: new Date(Date.now() - months(boost.time) - day),
									size: 2
								}), boost.name),
								action: () => {
									const user = settings[props.user.id] || {};
									user.boost = boost.id;
									setSelectedBoost(boost.id);
									settings[props.user.id] = user;
									this.saveSettings(settings);
								}
							}))), React.createElement(contextmenu_namespaceObject.MenuGroup, null, React.createElement(contextmenu_namespaceObject.MenuItem, {
								label: "Reset Boost Preferences",
								id: "reset-boosts",
								color: "colorDanger",
								action: () => {
									delete settings[props.user.id]?.boost;
									this.saveSettings(settings);
									external_PluginApi_namespaceObject.Toasts.success(`Successfully cleared boost preferences for <strong>${props.user}</strong>!`);
								}
							}))]), React.createElement(contextmenu_namespaceObject.MenuGroup, null, React.createElement(contextmenu_namespaceObject.MenuItem, {
								color: "colorDanger",
								label: "Reset Preferences",
								id: "reset",
								action: () => {
									delete settings[props.user.id];
									this.saveSettings(settings);
									settings[props.user.id] = {};
									external_PluginApi_namespaceObject.Toasts.success(`Successfully cleared preferences for <strong>${props.user}</strong>!`);
								}
							}))]
						});
					};
					class Utils {
						static combine(...filters) {
							return (...args) => filters.every((filter => filter(...args)));
						}
					}
					function findContextMenu(displayName, filter = (() => true)) {
						const regex = new RegExp(displayName, "i");
						const normalFilter = exports => exports && exports.default && regex.test(exports.default.displayName) && filter(exports.default);
						const nestedFilter = module => regex.test(module.toString()); {
							const normalCache = external_PluginApi_namespaceObject.WebpackModules.getModule(Utils.combine(normalFilter, (e => filter(e.default))));
							if (normalCache) return {
								type: "normal",
								module: normalCache
							};
						} {
							const webpackId = Object.keys(external_PluginApi_namespaceObject.WebpackModules.require.m).find((id => nestedFilter(external_PluginApi_namespaceObject.WebpackModules.require.m[id])));
							const nestedCache = void 0 !== webpackId && external_PluginApi_namespaceObject.WebpackModules.getByIndex(webpackId);
							if (nestedCache && filter(nestedCache?.default)) return {
								type: "nested",
								module: nestedCache
							};
						}
						return new Promise((resolve => {
							const cancel = () => external_PluginApi_namespaceObject.WebpackModules.removeListener(listener);
							const listener = (exports, module) => {
								const normal = normalFilter(exports);
								const nested = nestedFilter(module);
								if (!nested && !normal || !filter(exports?.default)) return;
								resolve({
									type: normal ? "normal" : "nested",
									module: exports
								});
								external_PluginApi_namespaceObject.WebpackModules.removeListener(listener);
								flush.delete(cancel);
							};
							external_PluginApi_namespaceObject.WebpackModules.addListener(listener);
							flush.add(cancel);
						}));
					}
					const patched = new Set;
					const REGEX = /displayName="\S+?usercontextmenu./i;
					const originalSymbol = Symbol("AssignBadges Original");
					const search = async () => {
						const Menu = await findContextMenu(REGEX, (m => !patched.has(m)));
						if (this.promises.cancelled) return;
						const patch = (rendered, props) => {
							const children = external_PluginApi_namespaceObject.Utilities.findInReactTree(rendered, Array.isArray);
							const user = props.user || external_PluginApi_DiscordModules_namespaceObject.UserStore.getUser(props.channel?.getRecipientId?.());
							if (!children || !user || children.some((c => c && "assign-badge" === c.key))) return rendered;
							children.splice(7, 0, getMenu(user.id));
						};
						function AnalyticsWrapper(props) {
							const rendered = props[originalSymbol].call(this, props);
							try {
								patch(rendered, props);
							} catch (error) {
								cancel();
								console.error("Error in AnalyticsWrapper:", error);
							}
							return rendered;
						}
						let original = null;
						function ContextMenuWrapper(props, _, rendered) {
							rendered ??= original.call(this, props);
							try {
								if (rendered?.props?.children?.type?.displayName.indexOf("ContextMenu") > 0) {
									const child = rendered.props.children;
									child.props[originalSymbol] = child.type;
									AnalyticsWrapper.displayName = child.type.displayName;
									child.type = AnalyticsWrapper;
									return rendered;
								}
								patch(rendered, props);
							} catch (error) {
								cancel();
								console.error("Error in ContextMenuWrapper:", error);
							}
							return rendered;
						}
						const cancel = external_PluginApi_namespaceObject.Patcher.after(Menu.module, "default", ((_, [props], ret) => {
							const contextMenu = external_PluginApi_namespaceObject.Utilities.getNestedProp(ret, "props.children");
							if (!contextMenu || "function" !== typeof contextMenu.type) return;
							original ??= contextMenu.type;
							ContextMenuWrapper.displayName ??= original.displayName;
							contextMenu.type = ContextMenuWrapper;
						}));
						patched.add(Menu.module.default);
						search();
					};
					search();
				}
				fakeUser(flags) {
					return new User({
						id: 1337,
						username: "Lana",
						publicFlags: flags
					});
				}
				getSettings() {
					return external_PluginApi_namespaceObject.PluginUtilities.loadSettings(this.constructor.name, {});
				}
				saveSettings(settings) {
					external_PluginApi_namespaceObject.PluginUtilities.saveSettings(this.constructor.name, settings);
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