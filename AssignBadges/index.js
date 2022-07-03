import { Patcher, PluginUtilities, Utilities, WebpackModules, Toasts, DCM} from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import { MenuGroup, MenuItem } from "@discord/contextmenu";
import { UserStore } from "@zlibrary/discord";
import UserFlags from './modules/UserFlags';
import { joinClassNames } from '@discord/utils';

const months = function(n) { return n * 2629800000 };
const day = 86400000;
const { MenuCheckboxItem, MenuRadioItem } = WebpackModules.getByProps("MenuRadioItem");
const classes = {
	...WebpackModules.getByProps("executedCommand", "buttonContainer", "applicationName"),
	...WebpackModules.getByProps("container", "profileBadge18", "profileBadge22", "profileBadge22")
}

const memberlistClasses = WebpackModules.getByProps("placeholder", "activity", "icon");

const getFlags = WebpackModules.find(m => {
	let d = m.default.toString();
	return ~d.indexOf("closeUserProfileModal") && ~d.indexOf("openPremiumSettings")
});

const User = WebpackModules.getByPrototypes("getAvatarURL");
const BadgeList = WebpackModules.getByProps("BadgeSizes").default;

const boosts = [
	{ id: "boost1", value: 0 << 0, name: "Booster - 1 Month", time: 1.04 },
	{ id: "boost2", value: 0 << 0, name: "Booster - 2 Months", time: 2.04 },
	{ id: "boost3", value: 0 << 0, name: "Booster - 3 Months", time: 3.04 },
	{ id: "boost4", value: 0 << 0, name: "Booster - 6 Months", time: 6.04 },
	{ id: "boost5", value: 0 << 0, name: "Booster - 9 Months", time: 9.04 },
	{ id: "boost6", value: 0 << 0, name: "Booster - 1 Year", time: 12.04 },
	{ id: "boost7", value: 0 << 0, name: "Booster - 1 Year and 3 Months", time: 15.04 },
	{ id: "boost8", value: 0 << 0, name: "Booster - 1 Year and 6 Months", time: 18.04 },
	{ id: "boost9", value: 0 << 0, name: "Booster - 2 Years", time: 24.04 }
]

const BotTag = WebpackModules.getByProps("BotTagTypes").default;
const MessageAuthor = WebpackModules.find(m => m.default.toString().indexOf("userOverride") > -1)
const NameTag = WebpackModules.find(m => m.default.displayName === "DiscordTag");
const MemberListItem = WebpackModules.find(m => m.default.displayName === "MemberListItem");

const flush = new Set;

export default class AssignBadges extends BasePlugin {
	promises = {
		cancelled: false,
		cancel() {
			this.cancelled = true;
		},
	};
	patches = [];
	onStart() {
		this.patchUserContextMenus();
		this.patchUserFlagGetter();
		this.patchUserStore();
		this.patchMessageAuthor();
		this.patchNameTag();
		this.patchMemberlistItem();
	}

	onStop() {
		Patcher.unpatchAll();
		flush.forEach(f => f());
	}

	isUserVerifiedBot(user) {
		const settings = this.getSettings();
		const userSettings = settings?.[user.id];
		if(userSettings && userSettings?.EARLY_VERIFIED_BOT) return true;
		return false;
	}

	patchUserFlagGetter() {
		Patcher.before(getFlags, "default", (_this, [props], ret) => {
			const settings = this.getSettings()?.[props.user.id];
			if(settings) {
				if(settings?.PREMIUM === true) {
					props.premiumSince = new Date(0);
				}
			}

			if(settings?.boost) {
				const boost = boosts[boosts.findIndex(e => e.id === settings.boost)];
				props.premiumGuildSince = new Date(Date.now() - months(boost.time) - day);
			}
		})
	}

	patchUserStore() {
		Patcher.after(UserStore, "getUser", (_this, [id], ret) => {
			const settings = this.getSettings();
			const userSettings = settings?.[id];
			if(userSettings) {
				const newFlags = Object.keys(userSettings).filter(e => userSettings[e]).map(e => UserFlags.find(f => f.id === e)).filter(e => e).map(e => e.value).reduce((a, b) => a + b, 0);
				ret.publicFlags = newFlags;
			}
		})
	}

	patchMessageAuthor() {
		Patcher.after(MessageAuthor, 'default', (_this, [props], ret) => {
			const user = props.message.author;
			if(!user) return;

			if(this.isUserVerifiedBot(user)) {
				const badgeIndex = props.compact ? 0 : 2;
				const displayClass = props.compact ? classes.botTagCompact : classes.botTagCozy;
				ret.props.children[badgeIndex] = (
					<BotTag
					verified={true}
					className={joinClassNames(displayClass, classes.botTag)}
					/>
				)
			}
		})
	}

	patchNameTag() {
		Patcher.after(NameTag, 'default', (_this, [props], ret) => {
			const user = props.user;
			if(!user) return;

			if(this.isUserVerifiedBot(user)) {
				ret.props.botType = 0;
				ret.props.botVerified = true;
			}		
		})
	}

	patchMemberlistItem() {
		Patcher.after(MemberListItem.default.prototype, 'renderBot', (_this, [props], ret) => {
			const user = _this.props.user;
			if(this.isUserVerifiedBot(user)) {
				return (
					<BotTag
					verified={true}
					className={memberlistClasses.botTag}
					/>
				)
			}
		})
	}

	async patchUserContextMenus() {
		const getMenu = (props) => {
			const settings = this.getSettings();
			const propsUser = UserStore.getUser(props);
			props = {user: propsUser};
			const userBadges = getFlags
				.default({ user: propsUser })
				.map((badge) => badge?.key);
			
			const [selectedBoost, setSelectedBoost] = React.useState(settings[props.user.id]?.boost);

			return (<MenuItem
			id="assign-badge"
			key="assign-badge"
			label="Manage Badges"
			children={
				[UserFlags.map(flag => {
					const [state, setState] = React.useState((settings?.[props.user.id]?.hasOwnProperty(flag.id) ? settings?.[props.user.id]?.[flag.id] : ~userBadges.indexOf(flag.key)));
					return <MenuCheckboxItem
					id={flag.id}
					label={
						flag.id !== "EARLY_VERIFIED_BOT" ? 
						<div className={classes?.container}>
						<BadgeList user={this.fakeUser(flag.value)} premiumSince={flag.id === "PREMIUM" ? new Date(0) : null} size={2}/>
							{flag.name}
						</div>
						:
						<div className={classes?.container}>
							{<BotTag verified={true}/>}
						</div> 
					}
					checked={state}
					action={() => {
						const user = settings[props.user.id] || {};
						user[flag.id] = !state;
						settings[props.user.id] = user;
						this.saveSettings(settings);
						setState(!state);
					}}
				/>
				}),
				<MenuItem
				id="boosts"
				label={
					<div className={classes?.container}>
					<BadgeList user={this.fakeUser(0)} premiumGuildSince={new Date(Date.now() - months(3) - day)} size={2}/>
						Boosts
					</div>
				}>
				{
					[
						boosts.map(boost => {
							return <MenuRadioItem
							id={boost.id}
							checked={selectedBoost === boost.id}
							label={
							<div className={classes?.container}>
							<BadgeList user={this.fakeUser(0)} premiumGuildSince={new Date(Date.now() - months(boost.time) - day)} size={2}/>
								{boost.name}
							</div>
							}
							action={() => {
								const user = settings[props.user.id] || {};
								user.boost = boost.id;
								setSelectedBoost(boost.id);
								settings[props.user.id] = user;
								this.saveSettings(settings);
						}}
					/>
					}),
					<MenuGroup>
						<MenuItem
							label="Reset Boost Preferences"
							id="reset-boosts"
							color="colorDanger"
							action={() => {
								delete settings[props.user.id]?.boost;
								this.saveSettings(settings);
								Toasts.success(`Successfully cleared boost preferences for <strong>${props.user}</strong>!`)
							}}
						/>					
					</MenuGroup>
				]
				}
				</MenuItem>,
				<MenuGroup>
				<MenuItem
					color="colorDanger"
					label="Reset Preferences"
					id="reset"
					action={() => {
						delete settings[props.user.id];
						this.saveSettings(settings);
						settings[props.user.id] = {};
						Toasts.success(`Successfully cleared preferences for <strong>${props.user}</strong>!`)
					}}
				/>
				</MenuGroup>
				]}
			/>)
		}

		//Credits to Strencher for this (https://github.com/Strencher/BetterDiscordStuff/blob/ad2e5c2d1fbbe2155fd9c6440e23e8da0b878bdf/Copier/Copier.plugin.js#L1173-L1249)
		class Utils {
			static combine(...filters) {
				return (...args) => filters.every(filter => filter(...args));
			}
		}

		function findContextMenu(displayName, filter = _ => true) {
            const regex = new RegExp(displayName, "i");
            const normalFilter = (exports) => exports && exports.default && regex.test(exports.default.displayName) && filter(exports.default);
            const nestedFilter = (module) => regex.test(module.toString());

            {
                const normalCache = WebpackModules.getModule(Utils.combine(normalFilter, (e) => filter(e.default)));
                if (normalCache) return {type: "normal", module: normalCache};
            }

            {
                const webpackId = Object.keys(WebpackModules.require.m).find(id => nestedFilter(WebpackModules.require.m[id]));
                const nestedCache = webpackId !== undefined && WebpackModules.getByIndex(webpackId);
                if (nestedCache && filter(nestedCache?.default)) return {type: "nested", module: nestedCache};
            }

            return new Promise((resolve) => {
                const cancel = () => WebpackModules.removeListener(listener);
                const listener = (exports, module) => {
                    const normal = normalFilter(exports);
                    const nested = nestedFilter(module);

                    if ((!nested && !normal) || !filter(exports?.default)) return;

                    resolve({type: normal ? "normal" : "nested", module: exports});
                    WebpackModules.removeListener(listener);
                    flush.delete(cancel);
                };

                WebpackModules.addListener(listener);
                flush.add(cancel);
            });
        }

		const patched = new Set();
		const REGEX = /displayName="\S+?usercontextmenu./i;
		const originalSymbol = Symbol("AssignBadges Original");
		const search = async () => {
			const Menu = await findContextMenu(REGEX, m => !patched.has(m));
			
			if (this.promises.cancelled) return;

			const patch = (rendered, props) => {
				const children = Utilities.findInReactTree(rendered, Array.isArray);
				const user = props.user || UserStore.getUser(props.channel?.getRecipientId?.());
				if (!children || !user || children.some(c => c && c.key === "assign-badge")) return rendered;
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

			const cancel = Patcher.after(Menu.module, "default", (_, [props], ret) => {
				const contextMenu = Utilities.getNestedProp(ret, "props.children");
				if (!contextMenu || typeof contextMenu.type !== "function") return;

				original ??= contextMenu.type;
				ContextMenuWrapper.displayName ??= original.displayName;
				contextMenu.type = ContextMenuWrapper;
			});

			
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
		})
	}

	getSettings() {
		return PluginUtilities.loadSettings(this.constructor.name, {});
	}

	saveSettings(settings) {
		PluginUtilities.saveSettings(this.constructor.name, settings);
	}
}
