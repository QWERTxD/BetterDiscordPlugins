import BasePlugin from "@zlibrary/plugin";
import { ChannelStore, GuildStore, NavigationUtils } from "@zlibrary/discord";
import { Utilities, DCM } from "@zlibrary";
import Settings from "./Settings";


const {
	Patcher,
	findModule: get,
	findModuleByProps: getByProps,
	findModuleByDisplayName: getByName,
	getData,
	setData,
} = BdApi;

const { ComponentDispatch } = getByProps("ComponentDispatch");

const MessageContextMenu = DCM.getDiscordMenu("MessageContextMenu")
const Menu = getByProps("MenuItem");
const ChannelText = getByName("ChannelText");
const { getChannels } = getByProps("getChannels");

const GuildPermissions = getByProps("getChannelPermissions");
const { Permissions } = getByProps("API_HOST");

export default class GlobalReplies extends BasePlugin {
	onStart() {
		this.patch();
		console.log("%cGlobalReplies", "background: #1c90b5; color: white; padding: 2px; border-radius: 4px; font-weight: bold;", "Successfully started.")
	}
	onStop() {
		console.log("%cGlobalReplies", "background: #1c90b5; color: white; padding: 2px; border-radius: 4px; font-weight: bold;", "stopped.")
		Patcher.unpatchAll(this.constructor.name);
	}
	
	patch() {
		MessageContextMenu.then(module => {
			Patcher.after(this.constructor.name, module, "default", (_this, [props], ret) => {
				const channel = ChannelStore.getChannel(props?.message?.channel_id);
				const server = GuildStore.getGuild(channel?.guild_id);
				const channels = getChannels(server?.id);
				if(!server || !server?.id) return;
				const tree = ret.props.children[2].props.children;
	
				tree.splice(6, 0, 
				<Menu.MenuItem
				id="gloabl-reply"
				label="Global Reply"
				children={
					channels.SELECTABLE.filter(e => GuildPermissions.can(Permissions.SEND_MESSAGES, e.channel)).map(e => <Menu.MenuItem
						id={`${e.channel.name}-${e.comparator}`}
						action={() => {
							NavigationUtils.replaceWith(`/channels/${server.id}/${e.channel.id}`);
							ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {plainText: Utilities.formatString(this.getTemplate(), {messageLink: `https://discord.com/channels/${server.id}/${channel.id}/${props.message.id}`, author: `<@${props.message.author.id}>`, authorTag: props.message.author.tag, message: props.message.content, channel: `<#${channel.id}>`, newLine: "\n"})})
						}}
						label={[
						<ChannelText width="10" height="10"/>,
						`    ${e.channel.name}`
					]}/>
					)
				}
				/>
				);
			})
		})
	}

	getTemplate() {
		return getData(this.constructor.name, "template") ?? `Replying to {{author}} {{messageLink}} `
	}

	getSettingsPanel() {
		return <Settings/>
	}
}
