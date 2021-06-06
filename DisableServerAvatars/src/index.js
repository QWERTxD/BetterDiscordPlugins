import BasePlugin from "@zlibrary/plugin";
import { Patcher, WebpackModules } from "@zlibrary";
import { GuildMemberStore } from "@zlibrary/discord";

const UserPopoutHeader = WebpackModules.find(m => m?.default?.displayName === "UserPopoutHeader");

export default class DisableServerAvatars extends BasePlugin {
	onStart() {
		this.patch();
	}

	onStop() {
		Patcher.unpatchAll();
	}

	patch() {
		Patcher.after(GuildMemberStore, "getMember", (_this, [props], ret) => {
			if(ret?.guildMemberAvatar) {
				ret.guildMemberAvatar = null;
			}
		})
		
		Patcher.after(UserPopoutHeader, "default", (_this, [props], ret) => {
			if(props?.user) {
				props.user.guildMemberAvatars = {};
			}
		})
	}
}