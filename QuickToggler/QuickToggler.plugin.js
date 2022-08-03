/**
 * @name QuickToggler
 * @version 1.0.6
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
		"name": "QuickToggler",
		"version": "1.0.6",
		"description": "Allows you to open a toggle-able addon search with a keybind (default keybind: CTRL+D)",
		"authors": [{
			"name": "QWERT",
			"discord_id": "678556376640913408",
			"github_username": "QWERTxD"
		}],
		"github": "https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/QuickToggler",
		"github_raw": "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/QuickToggler/QuickToggler.plugin.js"
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
		"type": "improvement",
		"title": "Colors are back",
		"items": [
			"Status colors working again"
		]
	}]
};
function buildPlugin([BasePlugin, PluginApi]) {
	const module = {
		exports: {}
	};
	/*! For license information please see index.js.LICENSE.txt */
	(() => {
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
					return ___createMemoize___(this, 'Text', () => BdApi.findModuleByDisplayName('LegacyText'))
				},
				get 'Card'() {
					return ___createMemoize___(this, 'Card', () => BdApi.findModuleByDisplayName('Card'))
				}
			},
			'@discord/modules': {
				get 'Dispatcher'() {
					return ___createMemoize___(this, 'Dispatcher', () => BdApi.findModuleByProps('dispatch', 'isDispatching'))
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
			"./QuickToggler/Components/QuickToggler/AddonResult.jsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AddonResult)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zlibrary */ \"@zlibrary\");\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_zlibrary__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _PluginIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PluginIcon */ \"./QuickToggler/Components/QuickToggler/PluginIcon.jsx\");\n/* harmony import */ var _ThemeIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeIcon */ \"./QuickToggler/Components/QuickToggler/ThemeIcon.jsx\");\n/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Result */ \"./QuickToggler/Components/QuickToggler/Result.jsx\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);\n/* provided dependency */ var React = __webpack_require__(/*! react */ \"react\");\n\n\n\n\n\n\n\n\nconst OverflowTooltip = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByDisplayName('OverflowTooltip');\nconst Colors = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('STATUS_GREEN', 'STATUS_RED');\nconst { TooltipContainer: Tooltip } = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('TooltipContainer');\n\nfunction AddonResult({addon}) {\n    const type = addon.filename.toLowerCase().endsWith('js') ? 'Plugin' : 'Theme';\n    const AddonActions = type === 'Plugin' ? BdApi.Plugins : BdApi.Themes;\n    const [isEnabled, setIsEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(AddonActions.isEnabled(addon.id));\n    const color = isEnabled ? Colors.STATUS_GREEN : Colors.STATUS_RED;\n    const ContextMenu = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.DCM.buildMenu([\n        {\n            label: 'Reload',\n            action: () => {\n                AddonActions.reload(addon.id);\n            },\n            color: 'colorBrand'\n        },\n        {\n            label: 'Delete',\n            action: () => {\n                _zlibrary__WEBPACK_IMPORTED_MODULE_1__.Modals.showConfirmationModal('Are you sure?', `Are you sure you want to remove **${addon.name}**?`, {\n                    onConfirm: () => {\n                        try {\n                            fs__WEBPACK_IMPORTED_MODULE_0___default().unlinkSync(path__WEBPACK_IMPORTED_MODULE_6___default().resolve(AddonActions.folder, addon.filename));\n                        } catch(err) {\n                            _zlibrary__WEBPACK_IMPORTED_MODULE_1__.Toasts.error(`Could not remove <strong>${addon.name}</strong>! Check console for more info.`)\n                        }\n                    }\n                })\n            },\n            color: 'colorDanger'\n        }\n    ]);\n\n    return (\n        React.createElement(_Result__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onClick: () => {\n            setIsEnabled(!isEnabled);\n            AddonActions.toggle(addon.id);\n        },\n        onContextMenu: e => _zlibrary__WEBPACK_IMPORTED_MODULE_1__.DCM.openContextMenu(e, ContextMenu),\n        name: addon.name,\n        info: `v${addon.version} by ${addon.author}`,\n        desc: React.createElement(OverflowTooltip, { children: addon.description,}),\n        icon: React.createElement(Tooltip, { text: `${type}, ${isEnabled ? 'Enabled' : 'Disabled'}`,}, type === 'Plugin' ? React.createElement(_PluginIcon__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { fill: color, marginTop: 10,}) : React.createElement(_ThemeIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { fill: color, marginTop: 10,})),}\n        )\n    )\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Components/QuickToggler/AddonResult.jsx?");
			},
			"./QuickToggler/Components/QuickToggler/PluginIcon.jsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ PluginIcon)\n/* harmony export */ });\n/* provided dependency */ var React = __webpack_require__(/*! react */ "react");\nfunction PluginIcon({fill, marginTop = 0}) {\n    return (\n        React.createElement(\'svg\', { viewBox: "0 0 24 24"   , fill: fill, style: {width: 18, height: 18, opacity: 0.7, marginTop},}\n            , React.createElement(\'path\', { d: "M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"                                       ,})\n        )\n    )\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Components/QuickToggler/PluginIcon.jsx?');
			},
			"./QuickToggler/Components/QuickToggler/QuickToggler.jsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ QuickToggler)\n/* harmony export */ });\n/* harmony import */ var _discord_scrollbars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @discord/scrollbars */ \"@discord/scrollbars\");\n/* harmony import */ var _discord_scrollbars__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_discord_scrollbars__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zlibrary */ \"@zlibrary\");\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_zlibrary__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _zlibrary_discord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zlibrary/discord */ \"@zlibrary/discord\");\n/* harmony import */ var _zlibrary_discord__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_zlibrary_discord__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Results__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Results */ \"./QuickToggler/Components/QuickToggler/Results.jsx\");\n/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Result */ \"./QuickToggler/Components/QuickToggler/Result.jsx\");\n/* harmony import */ var _PluginIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PluginIcon */ \"./QuickToggler/Components/QuickToggler/PluginIcon.jsx\");\n/* harmony import */ var _ThemeIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeIcon */ \"./QuickToggler/Components/QuickToggler/ThemeIcon.jsx\");\n/* provided dependency */ var React = __webpack_require__(/*! react */ \"react\");\n\n\n\n\n\n\n\n\n\nconst classes = {\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('quickswitcher', 'miscContainer', 'scroller'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('input', 'container', 'emptyStateCTA', 'protip'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('contentDefault', 'guildIconContainer', 'iconContainer', 'name'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('icon', 'header', 'iconContainer'),    \n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('iconContainer', 'match', 'gameIconSize', 'icon'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('inline', 'tip', 'tip'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('protip'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('autocompleteQuerySymbol', 'emptyStateCTA', 'emptyStateNote')\n};\nconst Modal = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('ModalFooter');\nconst Protip = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByDisplayName('Protip');\nconst { open } = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('open', 'close', 'setSection');\n\nclass QuickToggler extends react__WEBPACK_IMPORTED_MODULE_3__.Component {\n    constructor() {\n        super();\n        this.state = {\n            query: ''\n        }\n    }\n\n    render() {\n        return (\n            React.createElement(Modal.ModalRoot, { transitionState: this.props.transitionState,}\n                , React.createElement('div', { className: classes.quickswitcher,}\n                    , React.createElement('input', { className: classes.input, placeholder: \"What addon are you looking for?\"     , onChange: e => this.setState({query: e.target.value}),})\n                    , React.createElement('div', { style: {height: 15},})\n                    , React.createElement(_Result__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        name: \"Plugins\",\n                        icon: React.createElement(_PluginIcon__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { fill: \"var(--interactive-normal)\",}),\n                        onClick: () => {\n                            open('plugins');\n                            _zlibrary_discord__WEBPACK_IMPORTED_MODULE_2__.ModalActions.closeAllModals();\n                        },}\n                    )\n                    , React.createElement(_Result__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        name: \"Themes\",\n                        icon: React.createElement(_ThemeIcon__WEBPACK_IMPORTED_MODULE_7__[\"default\"], { fill: \"var(--interactive-normal)\",}),\n                        onClick: () => {\n                            open('themes');\n                            _zlibrary_discord__WEBPACK_IMPORTED_MODULE_2__.ModalActions.closeAllModals();\n                        },}\n                    )\n                    , React.createElement('div', { style: {height: 10},})\n                    , React.createElement((_discord_scrollbars__WEBPACK_IMPORTED_MODULE_0___default()), { className: classes.scroller,}\n                        , React.createElement(_Results__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        query: this.state.query,}\n                        )\n                    )\n                    , React.createElement(Modal.ModalContent, null\n                        , React.createElement(Protip, { className: classes.protip, type: classes.inline,}, \"Use \"\n                             , React.createElement('span', { className: classes.autocompleteQuerySymbol,}, \"$enabled\"), \", \" , React.createElement('span', { className: classes.autocompleteQuerySymbol,}, \"$disabled\"), \", \" , React.createElement('span', { className: classes.autocompleteQuerySymbol,}, \"$plugin\"), \", and \"  , React.createElement('span', { className: classes.autocompleteQuerySymbol,}, \"$theme\"), \" to filter results.\"\n                        )\n                    )\n                )\n            )\n        )\n    }\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Components/QuickToggler/QuickToggler.jsx?");
			},
			"./QuickToggler/Components/QuickToggler/Result.jsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Result)\n/* harmony export */ });\n/* harmony import */ var _discord_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @discord/utils */ \"@discord/utils\");\n/* harmony import */ var _discord_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_discord_utils__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zlibrary */ \"@zlibrary\");\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_zlibrary__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* provided dependency */ var React = __webpack_require__(/*! react */ \"react\");\n\n\n\n\nconst classes = {\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('quickswitcher', 'miscContainer', 'scroller'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('input', 'container', 'emptyStateCTA', 'protip'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('contentDefault', 'guildIconContainer', 'iconContainer', 'name'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('icon', 'header', 'iconContainer'),    \n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('iconContainer', 'match', 'gameIconSize', 'icon'),\n    ..._zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByProps('resultFocused', 'content', 'note', 'badge')\n}\n\nfunction Result(props) {\n    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(classes.result);\n\n    return (\n        React.createElement('div', {\n        className: (0,_discord_utils__WEBPACK_IMPORTED_MODULE_0__.joinClassNames)(state),\n        onMouseOver: () => setState([classes.result, classes.resultFocused]),\n        onMouseLeave: () => setState(classes.result),\n        ...props,}\n        \n            , React.createElement('div', { className: (0,_discord_utils__WEBPACK_IMPORTED_MODULE_0__.joinClassNames)(classes.contentDefault, classes.content),}\n                , React.createElement('div', { className: classes.iconContainer,}\n                    , props.icon\n                )\n\n                , React.createElement('div', { className: classes.name,}\n                    , React.createElement('span', { className: classes.match,}, props.name)\n                    , React.createElement('span', { className: classes.note,}, props.info)\n                )\n\n                , React.createElement('div', { className: classes.misc,}\n                    , React.createElement('div', { className: classes.miscContainer,}, props.desc)\n                )\n              )\n        )\n    )\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Components/QuickToggler/Result.jsx?");
			},
			"./QuickToggler/Components/QuickToggler/Results.jsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Results)\n/* harmony export */ });\n/* harmony import */ var _AddonResult__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddonResult */ \"./QuickToggler/Components/QuickToggler/AddonResult.jsx\");\n/* harmony import */ var _Util_fuzzysort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Util/fuzzysort */ \"./QuickToggler/Util/fuzzysort.js\");\n/* harmony import */ var _Util_fuzzysort__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Util_fuzzysort__WEBPACK_IMPORTED_MODULE_1__);\n/* provided dependency */ var React = __webpack_require__(/*! react */ \"react\");\n function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }\n\n\n//lower is better/more relevant\nconst biases = {\n    name: \"0\",\n    author: \"5\",\n    description: \"10\",\n    version: \"10\",\n};\n\nfunction sortByBestResults(addons, query) {\n    if (!query) return addons;\n    query = query.toLowerCase().trim();\n\n    //not all data is interesting, only look at the Addon name, Author, Description and Version\n    let results = _Util_fuzzysort__WEBPACK_IMPORTED_MODULE_1___default().go(query, addons, {\n        keys: Object.keys(biases),\n        allowTypo: true,\n        //apply biases\n        scoreFn: a => Math.max(...Object.values(biases).map((bias, i) => a[i]?a[i].score-bias:-1000)),\n    });\n\n    //this handles multiple authors, so \"author1, author2, author3\" will have the same score as \"author1\"\n    results.forEach((result) => {\n        if (_optionalChain([result, 'access', _ => _[1], 'optionalAccess', _2 => _2.target, 'access', _3 => _3.includes, 'call', _4 => _4(\", \")])) {\n            const fuzzy = _Util_fuzzysort__WEBPACK_IMPORTED_MODULE_1___default().go(query, result[1].target.split(\", \"));\n            result.score = Math.max(result.score, _optionalChain([fuzzy, 'access', _5 => _5[0], 'optionalAccess', _6 => _6.score])-biases.author);\n        }\n    });\n\n    //if the score is the same, sort alphabetically\n    return results\n        .sort((a, b) => a.score !== b.score ? b.score - a.score : a.obj.name.localeCompare(b.obj.name))\n        .map((r) => r.obj);\n}\n\nfunction Results({query}) {\n    const plugins = BdApi.Plugins.getAll();\n    const themes = BdApi.Themes.getAll();\n    let addonsByQuery;\n\n    const addons = [\n        ...plugins,\n        ...themes\n    ]; \n\n    if(query.includes('$plugin')) {\n        addonsByQuery = addonsByQuery.filter(addon => addon.filename.endsWith('js'));\n    }\n\n    if(query.includes('$theme')) {\n        addonsByQuery = addonsByQuery.filter(addon => addon.filename.endsWith('css'));\n    }\n\n    if(query.includes('$enabled')) {\n        addonsByQuery = addonsByQuery.filter(addon => {\n            const addonStore = addon.filename.endsWith('js') ? BdApi.Plugins : BdApi.Themes;\n            return addonStore.isEnabled(addon.id);\n        })\n    }\n\n    if(query.includes('$disabled')) {\n        addonsByQuery = addonsByQuery.filter(addon => {\n            const addonStore = addon.filename.endsWith('js') ? BdApi.Plugins : BdApi.Themes;\n            return !addonStore.isEnabled(addon.id);\n        })\n    }\n\n    addonsByQuery = sortByBestResults(addons, query);\n    return (\n        addonsByQuery.map(addon => {\n            return (\n                React.createElement(_AddonResult__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n                addon: addon,\n                key: addon.id,}\n                )\n            )\n        })\n    )\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Components/QuickToggler/Results.jsx?");
			},
			"./QuickToggler/Components/QuickToggler/ThemeIcon.jsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ PluginIcon)\n/* harmony export */ });\n/* provided dependency */ var React = __webpack_require__(/*! react */ "react");\nfunction PluginIcon({fill, marginTop = 0}) {\n    return (\n        React.createElement(\'svg\', { viewBox: "0 0 24 24"   , fill: fill, style: {width: 18, height: 18, opacity: 0.7, marginTop},}\n            , React.createElement(\'path\', { d: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"                                                              ,})\n        )\n    )\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Components/QuickToggler/ThemeIcon.jsx?');
			},
			"./QuickToggler/Components/Settings.jsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Settings)\n/* harmony export */ });\n/* harmony import */ var _discord_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @discord/forms */ "@discord/forms");\n/* harmony import */ var _discord_forms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_discord_forms__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zlibrary */ "@zlibrary");\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_zlibrary__WEBPACK_IMPORTED_MODULE_1__);\n/* provided dependency */ var React = __webpack_require__(/*! react */ "react");\n\n\nconst KeybindRecorder = _zlibrary__WEBPACK_IMPORTED_MODULE_1__.WebpackModules.getByDisplayName(\'KeybindRecorder\');\n\nfunction Settings({settings, saveSettings}) {\n    return (\n        React.createElement(_discord_forms__WEBPACK_IMPORTED_MODULE_0__.FormItem, { title: "Quick Toggler Keybind"  ,}\n            , React.createElement(KeybindRecorder, {\n            defaultValue: settings.keybind || [[0, 162], [0, 68]],\n            onChange: e => saveSettings({keybind: e}),}\n            )\n        )\n    )\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Components/Settings.jsx?');
			},
			"./QuickToggler/Util/fuzzysort.js": function(module, exports) {
				eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\n  fuzzysort.js https://github.com/farzher/fuzzysort\n  SublimeText-like Fuzzy Search\n\n  fuzzysort.single('fs', 'Fuzzy Search') // {score: -16}\n  fuzzysort.single('test', 'test') // {score: 0}\n  fuzzysort.single('doesnt exist', 'target') // null\n\n  fuzzysort.go('mr', [{file:'Monitor.cpp'}, {file:'MeshRenderer.cpp'}], {key:'file'})\n  // [{score:-18, obj:{file:'MeshRenderer.cpp'}}, {score:-6009, obj:{file:'Monitor.cpp'}}]\n\n  fuzzysort.go('mr', ['Monitor.cpp', 'MeshRenderer.cpp'])\n  // [{score: -18, target: \"MeshRenderer.cpp\"}, {score: -6009, target: \"Monitor.cpp\"}]\n\n  fuzzysort.highlight(fuzzysort.single('fs', 'Fuzzy Search'), '<b>', '</b>')\n  // <b>F</b>uzzy <b>S</b>earch\n*/\n\n// UMD (Universal Module Definition) for fuzzysort\n;(function(root, UMD) {\n  if(true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (UMD),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n  else {}\n})(this, function UMD() { function fuzzysortNew(instanceOptions) {\n\n  var fuzzysort = {\n\n    single: function(search, target, options) {                                                                                                                                                                                                               ;if(search=='farzher')return{target:\"farzher was here (^-^*)/\",score:0,indexes:[0,1,2,3,4,5,6]}\n      if(!search) return null\n      if(!isObj(search)) search = fuzzysort.getPreparedSearch(search)\n\n      if(!target) return null\n      if(!isObj(target)) target = fuzzysort.getPrepared(target)\n\n      var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo\n        : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo\n        : true\n      var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo\n      return algorithm(search, target, search[0])\n    },\n\n    go: function(search, targets, options) {                                                                                                                                                                                                                  ;if(search=='farzher')return[{target:\"farzher was here (^-^*)/\",score:0,indexes:[0,1,2,3,4,5,6],obj:targets?targets[0]:null}]\n      if(!search) return noResults\n      search = fuzzysort.prepareSearch(search)\n      var searchLowerCode = search[0]\n\n      var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991\n      var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991\n      var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo\n        : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo\n        : true\n      var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo\n      var resultsLen = 0; var limitedCount = 0\n      var targetsLen = targets.length\n\n      // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]\n\n      // options.keys\n      if(options && options.keys) {\n        var scoreFn = options.scoreFn || defaultScoreFn\n        var keys = options.keys\n        var keysLen = keys.length\n        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]\n          var objResults = new Array(keysLen)\n          for (var keyI = keysLen - 1; keyI >= 0; --keyI) {\n            var key = keys[keyI]\n            var target = getValue(obj, key)\n            if(!target) { objResults[keyI] = null; continue }\n            if(!isObj(target)) target = fuzzysort.getPrepared(target)\n\n            objResults[keyI] = algorithm(search, target, searchLowerCode)\n          }\n          objResults.obj = obj // before scoreFn so scoreFn can use it\n          var score = scoreFn(objResults)\n          if(score === null) continue\n          if(score < threshold) continue\n          objResults.score = score\n          if(resultsLen < limit) { q.add(objResults); ++resultsLen }\n          else {\n            ++limitedCount\n            if(score > q.peek().score) q.replaceTop(objResults)\n          }\n        }\n\n      // options.key\n      } else if(options && options.key) {\n        var key = options.key\n        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]\n          var target = getValue(obj, key)\n          if(!target) continue\n          if(!isObj(target)) target = fuzzysort.getPrepared(target)\n\n          var result = algorithm(search, target, searchLowerCode)\n          if(result === null) continue\n          if(result.score < threshold) continue\n\n          // have to clone result so duplicate targets from different obj can each reference the correct obj\n          result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj} // hidden\n\n          if(resultsLen < limit) { q.add(result); ++resultsLen }\n          else {\n            ++limitedCount\n            if(result.score > q.peek().score) q.replaceTop(result)\n          }\n        }\n\n      // no keys\n      } else {\n        for(var i = targetsLen - 1; i >= 0; --i) { var target = targets[i]\n          if(!target) continue\n          if(!isObj(target)) target = fuzzysort.getPrepared(target)\n\n          var result = algorithm(search, target, searchLowerCode)\n          if(result === null) continue\n          if(result.score < threshold) continue\n          if(resultsLen < limit) { q.add(result); ++resultsLen }\n          else {\n            ++limitedCount\n            if(result.score > q.peek().score) q.replaceTop(result)\n          }\n        }\n      }\n\n      if(resultsLen === 0) return noResults\n      var results = new Array(resultsLen)\n      for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll()\n      results.total = resultsLen + limitedCount\n      return results\n    },\n\n    goAsync: function(search, targets, options) {\n      var canceled = false\n      var p = new Promise(function(resolve, reject) {                                                                                                                                                                                                         ;if(search=='farzher')return resolve([{target:\"farzher was here (^-^*)/\",score:0,indexes:[0,1,2,3,4,5,6],obj:targets?targets[0]:null}])\n        if(!search) return resolve(noResults)\n        search = fuzzysort.prepareSearch(search)\n        var searchLowerCode = search[0]\n\n        var q = fastpriorityqueue()\n        var iCurrent = targets.length - 1\n        var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991\n        var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991\n        var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo\n          : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo\n          : true\n        var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo\n        var resultsLen = 0; var limitedCount = 0\n        function step() {\n          if(canceled) return reject('canceled')\n\n          var startMs = Date.now()\n\n          // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]\n\n          // options.keys\n          if(options && options.keys) {\n            var scoreFn = options.scoreFn || defaultScoreFn\n            var keys = options.keys\n            var keysLen = keys.length\n            for(; iCurrent >= 0; --iCurrent) {\n              if(iCurrent%1000/*itemsPerCheck*/ === 0) {\n                if(Date.now() - startMs >= 10/*asyncInterval*/) {\n                  isNode?setImmediate(step):setTimeout(step)\n                  return\n                }\n              }\n\n              var obj = targets[iCurrent]\n              var objResults = new Array(keysLen)\n              for (var keyI = keysLen - 1; keyI >= 0; --keyI) {\n                var key = keys[keyI]\n                var target = getValue(obj, key)\n                if(!target) { objResults[keyI] = null; continue }\n                if(!isObj(target)) target = fuzzysort.getPrepared(target)\n\n                objResults[keyI] = algorithm(search, target, searchLowerCode)\n              }\n              objResults.obj = obj // before scoreFn so scoreFn can use it\n              var score = scoreFn(objResults)\n              if(score === null) continue\n              if(score < threshold) continue\n              objResults.score = score\n              if(resultsLen < limit) { q.add(objResults); ++resultsLen }\n              else {\n                ++limitedCount\n                if(score > q.peek().score) q.replaceTop(objResults)\n              }\n            }\n\n          // options.key\n          } else if(options && options.key) {\n            var key = options.key\n            for(; iCurrent >= 0; --iCurrent) {\n              if(iCurrent%1000/*itemsPerCheck*/ === 0) {\n                if(Date.now() - startMs >= 10/*asyncInterval*/) {\n                  isNode?setImmediate(step):setTimeout(step)\n                  return\n                }\n              }\n\n              var obj = targets[iCurrent]\n              var target = getValue(obj, key)\n              if(!target) continue\n              if(!isObj(target)) target = fuzzysort.getPrepared(target)\n\n              var result = algorithm(search, target, searchLowerCode)\n              if(result === null) continue\n              if(result.score < threshold) continue\n\n              // have to clone result so duplicate targets from different obj can each reference the correct obj\n              result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj} // hidden\n\n              if(resultsLen < limit) { q.add(result); ++resultsLen }\n              else {\n                ++limitedCount\n                if(result.score > q.peek().score) q.replaceTop(result)\n              }\n            }\n\n          // no keys\n          } else {\n            for(; iCurrent >= 0; --iCurrent) {\n              if(iCurrent%1000/*itemsPerCheck*/ === 0) {\n                if(Date.now() - startMs >= 10/*asyncInterval*/) {\n                  isNode?setImmediate(step):setTimeout(step)\n                  return\n                }\n              }\n\n              var target = targets[iCurrent]\n              if(!target) continue\n              if(!isObj(target)) target = fuzzysort.getPrepared(target)\n\n              var result = algorithm(search, target, searchLowerCode)\n              if(result === null) continue\n              if(result.score < threshold) continue\n              if(resultsLen < limit) { q.add(result); ++resultsLen }\n              else {\n                ++limitedCount\n                if(result.score > q.peek().score) q.replaceTop(result)\n              }\n            }\n          }\n\n          if(resultsLen === 0) return resolve(noResults)\n          var results = new Array(resultsLen)\n          for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll()\n          results.total = resultsLen + limitedCount\n          resolve(results)\n        }\n\n        isNode?setImmediate(step):step() //setTimeout here is too slow\n      })\n      p.cancel = function() { canceled = true }\n      return p\n    },\n\n    highlight: function(result, hOpen, hClose) {\n      if(typeof hOpen == 'function') return fuzzysort.highlightCallback(result, hOpen)\n      if(result === null) return null\n      if(hOpen === undefined) hOpen = '<b>'\n      if(hClose === undefined) hClose = '</b>'\n      var highlighted = ''\n      var matchesIndex = 0\n      var opened = false\n      var target = result.target\n      var targetLen = target.length\n      var matchesBest = result.indexes\n      for(var i = 0; i < targetLen; ++i) { var char = target[i]\n        if(matchesBest[matchesIndex] === i) {\n          ++matchesIndex\n          if(!opened) { opened = true\n            highlighted += hOpen\n          }\n\n          if(matchesIndex === matchesBest.length) {\n            highlighted += char + hClose + target.substr(i+1)\n            break\n          }\n        } else {\n          if(opened) { opened = false\n            highlighted += hClose\n          }\n        }\n        highlighted += char\n      }\n\n      return highlighted\n    },\n    highlightCallback: function(result, cb) {\n      if(result === null) return null\n      var target = result.target\n      var targetLen = target.length\n      var indexes = result.indexes\n      var highlighted = ''\n      var matchI = 0\n      var indexesI = 0\n      var opened = false\n      var result = []\n      for(var i = 0; i < targetLen; ++i) { var char = target[i]\n        if(indexes[indexesI] === i) {\n          ++indexesI\n          if(!opened) { opened = true\n            result.push(highlighted); highlighted = ''\n          }\n\n          if(indexesI === indexes.length) {\n            highlighted += char\n            result.push(cb(highlighted, matchI++)); highlighted = ''\n            result.push(target.substr(i+1))\n            break\n          }\n        } else {\n          if(opened) { opened = false\n            result.push(cb(highlighted, matchI++)); highlighted = ''\n          }\n        }\n        highlighted += char\n      }\n      return result\n    },\n\n    prepare: function(target) {\n      if(!target) return {target: '', _targetLowerCodes: [0/*this 0 doesn't make sense. here because an empty array causes the algorithm to deoptimize and run 50% slower!*/], _nextBeginningIndexes: null, score: null, indexes: null, obj: null} // hidden\n      return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:null, score:null, indexes:null, obj:null} // hidden\n    },\n    prepareSlow: function(target) {\n      if(!target) return {target: '', _targetLowerCodes: [0/*this 0 doesn't make sense. here because an empty array causes the algorithm to deoptimize and run 50% slower!*/], _nextBeginningIndexes: null, score: null, indexes: null, obj: null} // hidden\n      return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:fuzzysort.prepareNextBeginningIndexes(target), score:null, indexes:null, obj:null} // hidden\n    },\n    prepareSearch: function(search) {\n      if(!search) search = ''\n      return fuzzysort.prepareLowerCodes(search)\n    },\n\n\n\n    // Below this point is only internal code\n    // Below this point is only internal code\n    // Below this point is only internal code\n    // Below this point is only internal code\n\n\n\n    getPrepared: function(target) {\n      if(target.length > 999) return fuzzysort.prepare(target) // don't cache huge targets\n      var targetPrepared = preparedCache.get(target)\n      if(targetPrepared !== undefined) return targetPrepared\n      targetPrepared = fuzzysort.prepare(target)\n      preparedCache.set(target, targetPrepared)\n      return targetPrepared\n    },\n    getPreparedSearch: function(search) {\n      if(search.length > 999) return fuzzysort.prepareSearch(search) // don't cache huge searches\n      var searchPrepared = preparedSearchCache.get(search)\n      if(searchPrepared !== undefined) return searchPrepared\n      searchPrepared = fuzzysort.prepareSearch(search)\n      preparedSearchCache.set(search, searchPrepared)\n      return searchPrepared\n    },\n\n    algorithm: function(searchLowerCodes, prepared, searchLowerCode) {\n      var targetLowerCodes = prepared._targetLowerCodes\n      var searchLen = searchLowerCodes.length\n      var targetLen = targetLowerCodes.length\n      var searchI = 0 // where we at\n      var targetI = 0 // where you at\n      var typoSimpleI = 0\n      var matchesSimpleLen = 0\n\n      // very basic fuzzy match; to remove non-matching targets ASAP!\n      // walk through target. find sequential matches.\n      // if all chars aren't found then exit\n      for(;;) {\n        var isMatch = searchLowerCode === targetLowerCodes[targetI]\n        if(isMatch) {\n          matchesSimple[matchesSimpleLen++] = targetI\n          ++searchI; if(searchI === searchLen) break\n          searchLowerCode = searchLowerCodes[typoSimpleI===0?searchI : (typoSimpleI===searchI?searchI+1 : (typoSimpleI===searchI-1?searchI-1 : searchI))]\n        }\n\n        ++targetI; if(targetI >= targetLen) { // Failed to find searchI\n          // Check for typo or exit\n          // we go as far as possible before trying to transpose\n          // then we transpose backwards until we reach the beginning\n          for(;;) {\n            if(searchI <= 1) return null // not allowed to transpose first char\n            if(typoSimpleI === 0) { // we haven't tried to transpose yet\n              --searchI\n              var searchLowerCodeNew = searchLowerCodes[searchI]\n              if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char\n              typoSimpleI = searchI\n            } else {\n              if(typoSimpleI === 1) return null // reached the end of the line for transposing\n              --typoSimpleI\n              searchI = typoSimpleI\n              searchLowerCode = searchLowerCodes[searchI + 1]\n              var searchLowerCodeNew = searchLowerCodes[searchI]\n              if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char\n            }\n            matchesSimpleLen = searchI\n            targetI = matchesSimple[matchesSimpleLen - 1] + 1\n            break\n          }\n        }\n      }\n\n      var searchI = 0\n      var typoStrictI = 0\n      var successStrict = false\n      var matchesStrictLen = 0\n\n      var nextBeginningIndexes = prepared._nextBeginningIndexes\n      if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target)\n      var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1]\n\n      // Our target string successfully matched all characters in sequence!\n      // Let's try a more advanced and strict test to improve the score\n      // only count it as a match if it's consecutive or a beginning character!\n      if(targetI !== targetLen) for(;;) {\n        if(targetI >= targetLen) {\n          // We failed to find a good spot for this search char, go back to the previous search char and force it forward\n          if(searchI <= 0) { // We failed to push chars forward for a better match\n            // transpose, starting from the beginning\n            ++typoStrictI; if(typoStrictI > searchLen-2) break\n            if(searchLowerCodes[typoStrictI] === searchLowerCodes[typoStrictI+1]) continue // doesn't make sense to transpose a repeat char\n            targetI = firstPossibleI\n            continue\n          }\n\n          --searchI\n          var lastMatch = matchesStrict[--matchesStrictLen]\n          targetI = nextBeginningIndexes[lastMatch]\n\n        } else {\n          var isMatch = searchLowerCodes[typoStrictI===0?searchI : (typoStrictI===searchI?searchI+1 : (typoStrictI===searchI-1?searchI-1 : searchI))] === targetLowerCodes[targetI]\n          if(isMatch) {\n            matchesStrict[matchesStrictLen++] = targetI\n            ++searchI; if(searchI === searchLen) { successStrict = true; break }\n            ++targetI\n          } else {\n            targetI = nextBeginningIndexes[targetI]\n          }\n        }\n      }\n\n      { // tally up the score & keep track of matches for highlighting later\n        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }\n        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }\n        var score = 0\n        var lastTargetI = -1\n        for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i]\n          // score only goes down if they're not consecutive\n          if(lastTargetI !== targetI - 1) score -= targetI\n          lastTargetI = targetI\n        }\n        if(!successStrict) {\n          score *= 1000\n          if(typoSimpleI !== 0) score += -20/*typoPenalty*/\n        } else {\n          if(typoStrictI !== 0) score += -20/*typoPenalty*/\n        }\n        score -= targetLen - searchLen\n        prepared.score = score\n        prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i]\n\n        return prepared\n      }\n    },\n\n    algorithmNoTypo: function(searchLowerCodes, prepared, searchLowerCode) {\n      var targetLowerCodes = prepared._targetLowerCodes\n      var searchLen = searchLowerCodes.length\n      var targetLen = targetLowerCodes.length\n      var searchI = 0 // where we at\n      var targetI = 0 // where you at\n      var matchesSimpleLen = 0\n\n      // very basic fuzzy match; to remove non-matching targets ASAP!\n      // walk through target. find sequential matches.\n      // if all chars aren't found then exit\n      for(;;) {\n        var isMatch = searchLowerCode === targetLowerCodes[targetI]\n        if(isMatch) {\n          matchesSimple[matchesSimpleLen++] = targetI\n          ++searchI; if(searchI === searchLen) break\n          searchLowerCode = searchLowerCodes[searchI]\n        }\n        ++targetI; if(targetI >= targetLen) return null // Failed to find searchI\n      }\n\n      var searchI = 0\n      var successStrict = false\n      var matchesStrictLen = 0\n\n      var nextBeginningIndexes = prepared._nextBeginningIndexes\n      if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target)\n      var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1]\n\n      // Our target string successfully matched all characters in sequence!\n      // Let's try a more advanced and strict test to improve the score\n      // only count it as a match if it's consecutive or a beginning character!\n      if(targetI !== targetLen) for(;;) {\n        if(targetI >= targetLen) {\n          // We failed to find a good spot for this search char, go back to the previous search char and force it forward\n          if(searchI <= 0) break // We failed to push chars forward for a better match\n\n          --searchI\n          var lastMatch = matchesStrict[--matchesStrictLen]\n          targetI = nextBeginningIndexes[lastMatch]\n\n        } else {\n          var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI]\n          if(isMatch) {\n            matchesStrict[matchesStrictLen++] = targetI\n            ++searchI; if(searchI === searchLen) { successStrict = true; break }\n            ++targetI\n          } else {\n            targetI = nextBeginningIndexes[targetI]\n          }\n        }\n      }\n\n      { // tally up the score & keep track of matches for highlighting later\n        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }\n        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }\n        var score = 0\n        var lastTargetI = -1\n        for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i]\n          // score only goes down if they're not consecutive\n          if(lastTargetI !== targetI - 1) score -= targetI\n          lastTargetI = targetI\n        }\n        if(!successStrict) score *= 1000\n        score -= targetLen - searchLen\n        prepared.score = score\n        prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i]\n\n        return prepared\n      }\n    },\n\n    prepareLowerCodes: function(str) {\n      var strLen = str.length\n      var lowerCodes = [] // new Array(strLen)    sparse array is too slow\n      var lower = str.toLowerCase()\n      for(var i = 0; i < strLen; ++i) lowerCodes[i] = lower.charCodeAt(i)\n      return lowerCodes\n    },\n    prepareBeginningIndexes: function(target) {\n      var targetLen = target.length\n      var beginningIndexes = []; var beginningIndexesLen = 0\n      var wasUpper = false\n      var wasAlphanum = false\n      for(var i = 0; i < targetLen; ++i) {\n        var targetCode = target.charCodeAt(i)\n        var isUpper = targetCode>=65&&targetCode<=90\n        var isAlphanum = isUpper || targetCode>=97&&targetCode<=122 || targetCode>=48&&targetCode<=57\n        var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum\n        wasUpper = isUpper\n        wasAlphanum = isAlphanum\n        if(isBeginning) beginningIndexes[beginningIndexesLen++] = i\n      }\n      return beginningIndexes\n    },\n    prepareNextBeginningIndexes: function(target) {\n      var targetLen = target.length\n      var beginningIndexes = fuzzysort.prepareBeginningIndexes(target)\n      var nextBeginningIndexes = [] // new Array(targetLen)     sparse array is too slow\n      var lastIsBeginning = beginningIndexes[0]\n      var lastIsBeginningI = 0\n      for(var i = 0; i < targetLen; ++i) {\n        if(lastIsBeginning > i) {\n          nextBeginningIndexes[i] = lastIsBeginning\n        } else {\n          lastIsBeginning = beginningIndexes[++lastIsBeginningI]\n          nextBeginningIndexes[i] = lastIsBeginning===undefined ? targetLen : lastIsBeginning\n        }\n      }\n      return nextBeginningIndexes\n    },\n\n    cleanup: cleanup,\n    new: fuzzysortNew,\n  }\n  return fuzzysort\n} // fuzzysortNew\n\n// This stuff is outside fuzzysortNew, because it's shared with instances of fuzzysort.new()\nvar isNode =  true && typeof window === 'undefined'\nvar MyMap = typeof Map === 'function' ? Map : function(){var s=Object.create(null);this.get=function(k){return s[k]};this.set=function(k,val){s[k]=val;return this};this.clear=function(){s=Object.create(null)}}\nvar preparedCache = new MyMap()\nvar preparedSearchCache = new MyMap()\nvar noResults = []; noResults.total = 0\nvar matchesSimple = []; var matchesStrict = []\nfunction cleanup() { preparedCache.clear(); preparedSearchCache.clear(); matchesSimple = []; matchesStrict = [] }\nfunction defaultScoreFn(a) {\n  var max = -9007199254740991\n  for (var i = a.length - 1; i >= 0; --i) {\n    var result = a[i]; if(result === null) continue\n    var score = result.score\n    if(score > max) max = score\n  }\n  if(max === -9007199254740991) return null\n  return max\n}\n\n// prop = 'key'              2.5ms optimized for this case, seems to be about as fast as direct obj[prop]\n// prop = 'key1.key2'        10ms\n// prop = ['key1', 'key2']   27ms\nfunction getValue(obj, prop) {\n  var tmp = obj[prop]; if(tmp !== undefined) return tmp\n  var segs = prop\n  if(!Array.isArray(prop)) segs = prop.split('.')\n  var len = segs.length\n  var i = -1\n  while (obj && (++i < len)) obj = obj[segs[i]]\n  return obj\n}\n\nfunction isObj(x) { return typeof x === 'object' } // faster as a function\n\n// Hacked version of https://github.com/lemire/FastPriorityQueue.js\nvar fastpriorityqueue=function(){var r=[],o=0,e={};function n(){for(var e=0,n=r[e],c=1;c<o;){var f=c+1;e=c,f<o&&r[f].score<r[c].score&&(e=f),r[e-1>>1]=r[e],c=1+(e<<1)}for(var a=e-1>>1;e>0&&n.score<r[a].score;a=(e=a)-1>>1)r[e]=r[a];r[e]=n}return e.add=function(e){var n=o;r[o++]=e;for(var c=n-1>>1;n>0&&e.score<r[c].score;c=(n=c)-1>>1)r[n]=r[c];r[n]=e},e.poll=function(){if(0!==o){var e=r[0];return r[0]=r[--o],n(),e}},e.peek=function(e){if(0!==o)return r[0]},e.replaceTop=function(o){r[0]=o,n()},e};\nvar q = fastpriorityqueue() // reuse this, except for async, it needs to make its own\n\nreturn fuzzysortNew()\n}) // UMD\n\n// TODO: (performance) wasm version!?\n// TODO: (performance) threads?\n// TODO: (performance) avoid cache misses\n// TODO: (performance) preparedCache is a memory leak\n// TODO: (like sublime) backslash === forwardslash\n// TODO: (like sublime) spaces: \"a b\" should do 2 searches 1 for a and 1 for b\n// TODO: (scoring) garbage in targets that allows most searches to strict match need a penality\n// TODO: (performance) idk if allowTypo is optimized\n\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/Util/fuzzysort.js?");
			},
			"./QuickToggler/index.js": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				"use strict";
				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ QuickToggler)\n/* harmony export */ });\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @zlibrary */ \"@zlibrary\");\n/* harmony import */ var _zlibrary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_zlibrary__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _zlibrary_discord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zlibrary/discord */ \"@zlibrary/discord\");\n/* harmony import */ var _zlibrary_discord__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_zlibrary_discord__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _zlibrary_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @zlibrary/plugin */ \"@zlibrary/plugin\");\n/* harmony import */ var _zlibrary_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_zlibrary_plugin__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Components_QuickToggler_QuickToggler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/QuickToggler/QuickToggler */ \"./QuickToggler/Components/QuickToggler/QuickToggler.jsx\");\n/* harmony import */ var _Components_Settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/Settings */ \"./QuickToggler/Components/Settings.jsx\");\n/* provided dependency */ var React = __webpack_require__(/*! react */ \"react\");\n function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }\n\n\n\n\n\nlet keys = {};\nlet settings = {};\n\nclass QuickToggler extends (_zlibrary_plugin__WEBPACK_IMPORTED_MODULE_2___default()) {\n\tonStart() {\n\t\tsettings = this.getSettings();\n\t\tdocument.addEventListener('keydown', this.keydown, true);\n\t\tdocument.addEventListener('keyup', this.openModal, true);\n\t}\n\n\tkeydown(ev) {\n\t\tkeys[ev.keyCode] = true;\n\t}\n\n\topenModal(e) {\n\t\tconst keybinds = (_optionalChain([settings, 'optionalAccess', _ => _.keybind]) || [[0, 162], [0, 68]]).map(e => e[1] === 162 ? 17 : (e[1] === 160 ? 16 : (e[1] === 164 ? 18 : e[1])));\n\t\tif (keybinds.every(key => keys[key] === true)) {\n\t\t\tkeys = {};\n\t\t\t_zlibrary_discord__WEBPACK_IMPORTED_MODULE_1__.ModalActions.openModal(props => React.createElement(_Components_QuickToggler_QuickToggler__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { ...props,}))\n\t\t} else {\n\t\t  setTimeout(() => keys = {}, 300)\n\t\t}\n\t\tkeys[e.key] = false;\n\t}\n\n\tonStop() {\n\t\tdocument.removeEventListener('keydown', this.keydown, true);\n\t\tdocument.removeEventListener('keyup', this.openModal, true);\n\t}\n\n\tgetSettings() {\n\t\treturn _zlibrary__WEBPACK_IMPORTED_MODULE_0__.PluginUtilities.loadSettings('QuickToggler', {keybind: [[0, 162], [0, 68]]});\n\t}\n\n\tsaveSettings(newSettings) {\n\t\t_zlibrary__WEBPACK_IMPORTED_MODULE_0__.PluginUtilities.saveSettings('QuickToggler', newSettings);\n\t\tsettings = newSettings;\n\t}\n\n\tgetSettingsPanel() {\n\t\treturn React.createElement(_Components_Settings__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { settings: this.getSettings(), saveSettings: this.saveSettings,})\n\t}\n}\n\n//# sourceURL=webpack://LibraryPluginHack/./QuickToggler/index.js?");
			},
			fs: module => {
				"use strict";
				module.exports = require("fs");
			},
			path: module => {
				"use strict";
				module.exports = require("path");
			},
			"@zlibrary/plugin": module => {
				"use strict";
				module.exports = BasePlugin;
			},
			react: module => {
				"use strict";
				module.exports = BdApi.React;
			},
			"@zlibrary": module => {
				"use strict";
				module.exports = PluginApi;
			},
			"@zlibrary/discord": module => {
				"use strict";
				module.exports = PluginApi.DiscordModules;
			},
			"@discord/forms": module => {
				"use strict";
				module.exports = Modules["@discord/forms"];
			},
			"@discord/scrollbars": module => {
				"use strict";
				module.exports = Modules["@discord/scrollbars"];
			},
			"@discord/utils": module => {
				"use strict";
				module.exports = Modules["@discord/utils"];
			}
		};
		var __webpack_module_cache__ = {};
		function __webpack_require__(moduleId) {
			var cachedModule = __webpack_module_cache__[moduleId];
			if (void 0 !== cachedModule) return cachedModule.exports;
			var module = __webpack_module_cache__[moduleId] = {
				exports: {}
			};
			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
		var __webpack_exports__ = __webpack_require__("./QuickToggler/index.js");
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