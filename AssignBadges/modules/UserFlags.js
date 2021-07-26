import { WebpackModules } from '@zlibrary';
const { BadgeKeys } = WebpackModules.getByProps("BadgeKeys");
const { UserFlags } = WebpackModules.getByProps("UserFlags");

const UserFlagsFormatted = [
	{ id: "STAFF", value: UserFlags["STAFF"], name: "Discord Staff", key: BadgeKeys["STAFF"] },
	{ id: "PARTNER", value: UserFlags["PARTNER"], name: "Partnered Server Owner", key: BadgeKeys["PARTNER"] },
	{ id: "HYPESQUAD", value: UserFlags["HYPESQUAD"], name: "HypeSquad Events", key: BadgeKeys["HYPESQUAD"] },
	{ id: "HYPESQUAD_ONLINE_HOUSE_1", value: UserFlags["HYPESQUAD_ONLINE_HOUSE_1"], name: "House Bravery", key: BadgeKeys["HYPESQUAD_ONLINE_HOUSE_1"] },
	{ id: "HYPESQUAD_ONLINE_HOUSE_2", value: UserFlags["HYPESQUAD_ONLINE_HOUSE_2"], name: "House Brilliance", key: BadgeKeys["HYPESQUAD_ONLINE_HOUSE_2"] },
	{ id: "HYPESQUAD_ONLINE_HOUSE_3", value: UserFlags["HYPESQUAD_ONLINE_HOUSE_3"], name: "House Balance", key: BadgeKeys["HYPESQUAD_ONLINE_HOUSE_3"] },
	{ id: "EARLY_VERIFIED_BOT", value: /*UserFlags["VERIFIED_BOT"]*/ 0, name: "Verified Bot", key: BadgeKeys["VERIFIED_BOT"] },
	{ id: "BUG_HUNTER_LEVEL_1", value: UserFlags["BUG_HUNTER_LEVEL_1"], name: "Bug Hunter Level 1", key: BadgeKeys["BUG_HUNTER_LEVEL_1"] },
	{ id: "BUG_HUNTER_LEVEL_2", value: UserFlags["BUG_HUNTER_LEVEL_2"], name: "Bug Hunter Level 2", key: BadgeKeys["BUG_HUNTER_LEVEL_2"] },
	{ id: "EARLY_SUPPORTER", value: UserFlags["PREMIUM_EARLY_SUPPORTER"], name: "Early Supporter", key: BadgeKeys["EARLY_SUPPORTER"] },
	{ id: "EARLY_VERIFIED_DEVELOPER", value: UserFlags["VERIFIED_DEVELOPER"], name: "Early Verified Bot Developer", key: BadgeKeys["EARLY_VERIFIED_DEVELOPER"] },
	{ id: "CERTIFIED_MODERATOR", value: UserFlags["CERTIFIED_MODERATOR"], name: "Discord Certified Moderator", key: BadgeKeys["CERTIFIED_MODERATOR"] },
	{ id: "PREMIUM", value: 0, name: "Nitro", key: BadgeKeys["PREMIUM"] }
]

export default UserFlagsFormatted;