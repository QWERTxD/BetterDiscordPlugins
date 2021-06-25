import { Patcher, PluginUtilities, Utilities, WebpackModules, Toasts } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import { MenuGroup, MenuItem } from "@discord/contextmenu";
import { UserStore } from "@zlibrary/discord";

const months = function(n) { return n * 2629800000 };
const day = 86400000;
const { MenuCheckboxItem } = WebpackModules.getByProps("MenuRadioItem");
const classes = WebpackModules.getByProps("container", "profileBadge18", "profileBadge22", "profileBadge22")

const getFlags = WebpackModules.find(m => {
	let d = m.default.toString();
	return ~d.indexOf("closeUserProfileModal") && ~d.indexOf("openPremiumSettings")
});

const User = WebpackModules.getByPrototypes("getAvatarURL");
const BadgeList = WebpackModules.getByProps("BadgeSizes").default;

const flags = [
	{ id: "staff", value: 1 << 0, name: "Discord Staff", key: 0 },
	{ id: "partner", value: 1 << 1, name: "Partnered Server Owner", key: 1 },
	{ id: "hypeSquad", value: 1 << 2, name: "HypeSquad Events", key: 2 },
	{ id: "bravery", value: 1 << 6, name: "House Bravery", key: 3 },
	{ id: "brilliance", value: 1 << 7, name: "House Brilliance", key: 5 },
	{ id: "balance", value: 1 << 8, name: "House Balance", key: 7 },
	{ id: "verifiedBot", value: 1 << 16, name: "Verified Bot", key: -1 },
	{ id: "bugHunter1", value: 1 << 3, name: "Bug Hunter Level 1", key: 9 },
	{ id: "bugHunter2", value: 1 << 14, name: "Bug Hunter Level 2", key: 10 },
	{ id: "earlySupporter", value: 1 << 9, name: "Early Supporter", key: 12 },
	{ id: "dev", value: 1 << 17, name: "Early Verified Bot Developer", key: 11 },
	{ id: "mod", value: 1 << 18, name: "Discord Certified Moderator", key: 13 },
	{ id: "nitro", value: 0 << 0, name: "Nitro", key: 1337 }
]

const boosts = [
	{ id: "boost1", value: 0 << 0, name: "Booster - 1 Month", time: 1 },
	{ id: "boost2", value: 0 << 0, name: "Booster - 2 Months", time: 2 },
	{ id: "boost3", value: 0 << 0, name: "Booster - 3 Months", time: 3 },
	{ id: "boost4", value: 0 << 0, name: "Booster - 6 Months", time: 4 },
	{ id: "boost5", value: 0 << 0, name: "Booster - 9 Months", time: 9 },
	{ id: "boost6", value: 0 << 0, name: "Booster - 1 Year", time: 12 },
	{ id: "boost7", value: 0 << 0, name: "Booster - 1 Year and 3 Months", time: 15 },
	{ id: "boost8", value: 0 << 0, name: "Booster - 1 Year and 6 Months", time: 18 },
	{ id: "boost9", value: 0 << 0, name: "Booster - 2 Years", time: 24 }
]

const UserContextMenus = WebpackModules.findAll(m => m.default?.displayName.endsWith("UserContextMenu"));
const BotTag = WebpackModules.getByDisplayName("BotTag")

export default class AssignBadges extends BasePlugin {
	onStart() {
		this.patchUserContextMenus();
		this.patchFlagGetter();
		this.patchUserStore();
	}

	onStop() {
		Patcher.unpatchAll();
	}

	patchFlagGetter() {
		Patcher.before(getFlags, "default", (_this, [props], ret) => {
			const settings = this.getSettings()?.[props.user.id];
			if(settings) {
				if(settings?.nitro === true) {
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
			if(settings[id]) {
				const userSettings = settings[id];
				const newFlags = Object.keys(userSettings).filter(e => userSettings[e]).map(e => flags[flags.findIndex(f => f.id === e)]).filter(e => e).map(e => e.value).reduce((a, b) => a + b, 0);
				ret.publicFlags = newFlags;
			}
		})
	}

	patchUserContextMenus() {
		for(var n = 0; n < UserContextMenus.length; n++) {
			const ContextMenu = UserContextMenus[n];

			Patcher.after(ContextMenu, "default", (_this, [props], ret) => {
				const settings = this.getSettings();
				const tree = Utilities.getNestedProp(ret, "props.children.props.children");
				const userBadges = getFlags.default({user: UserStore.getUser(props.user.id)}).map(badge => badge?.key);
				tree.splice(7, 0, 
				<MenuGroup>
					<MenuItem
					id="assign-badge"
					label="Manage Badges"
					children={
						[flags.map(flag => {
							const [state, setState] = React.useState((settings?.[props.user.id]?.hasOwnProperty(flag.id) ? settings?.[props.user.id]?.[flag.id] : userBadges.includes(flag.key)));
							return <MenuCheckboxItem
							id={flag.id}
							label={
								!["verifiedBot", "system"].includes(flag.id) ? 
								<div className={classes?.container}>
								<BadgeList user={this.fakeUser(flag.value)} premiumSince={flag.id === "nitro" ? new Date(0) : null} size={2}/>
									{flag.name}
								</div>
								:
								<div className={classes?.container}>
									{<BotTag verified={true} type={flag.id === "system" ? 2 : 0}/>, flag.name}
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
								return <MenuItem
								id={boost.id}
								label={
								<div className={classes?.container}>
								<BadgeList user={this.fakeUser(0)} premiumGuildSince={new Date(Date.now() - months(boost.time) - day)} size={2}/>
									{boost.name}
								</div>
								}
								action={() => {
									const user = settings[props.user.id] || {};
									user.boost = boost.id;
									settings[props.user.id] = user;
									this.saveSettings(settings);
								}}
							/>
							}),
							<MenuItem
							label="Reset Boosts"
							id="reset-boosts"
							color="colorDanger"
							action={() => {
								delete settings[props.user.id]?.boost;
								this.saveSettings(settings);
								Toasts.success(`Successfully cleared boost preferences for <strong>${props.user}</strong>!`)
							}}
							/>
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
					/>
				</MenuGroup>
				)
			})
		}
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