import BasePlugin from "@zlibrary/plugin";
import { Patcher, WebpackModules } from "@zlibrary";
import { UserStatusStore } from "@zlibrary/discord";

const Timestamp = WebpackModules.find(m => m.default.toString().includes("showTimestampOnHover"))
const ActivityStatus = WebpackModules.getByDisplayName("ActivityStatus");

export default class UserActivityEverywhere extends BasePlugin {
	onStart() {
		this.patch();
	}

	onStop() {
		Patcher.unpatchAll();
	}

	patch() {
		Patcher.after(Timestamp, "default", (_this, [props], ret) => {
			const message = props.message;
			if(!message.author?.id) return;
			ret.props.children[1].props.children.push(
			<ActivityStatus
				className="activity-525YDR subtext-1RtU34"
				activities={UserStatusStore.getActivities(message.author.id)}
				animate={true}
			/>
			)
		})
	}
}