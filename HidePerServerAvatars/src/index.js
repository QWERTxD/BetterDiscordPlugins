import BasePlugin from "@zlibrary/plugin";
import { Patcher, WebpackModules } from "@zlibrary";
import { GuildMemberStore, UserStore } from "@zlibrary/discord";

const UserPopoutHeader = WebpackModules.find(m => m?.default?.displayName === "UserPopoutHeader");
const Avatar = WebpackModules.getByProps("AnimatedAvatar");
export default class HidePerServerAvatars extends BasePlugin {
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
		});
		
		Patcher.after(UserPopoutHeader, "default", (_this, [props], ret) => {
			if(props?.user) {
				props.user.guildMemberAvatars = {};
			}
		});

		Patcher.after(Avatar, "default", (_this, [props], ret) => {
			const match = props.src.match(/.*\/\/.*\/guilds\/\d{16,20}\/users\/\d{16,20}\/avatars\/.*/);
			if(match) {
				props.src = UserStore.getUser(match[0].split("/")[6]).getAvatarURL();
			}
		});
	}
}