import BasePlugin from "@zlibrary/plugin";
import { DiscordModules, Utilities } from "@zlibrary";
const {
	React,
	ReactDOM,
	Patcher,
	findModule: get,
	findModuleByProps: getByProps,
	findModuleByDisplayName: getByName,
	getData,
	setData,
	getInternalInstance
} = BdApi;

const { ComponentDispatch } = getByProps("ComponentDispatch")
const Menu = getByProps('MenuItem');
const SlateTextAreaContextMenu = get(m => m?.default?.displayName === "SlateTextAreaContextMenu");
const ChannelTextAreaContainer = get(m => m?.type?.render?.displayName === "ChannelTextAreaContainer");
const SwitchItem = getByName("SwitchItem");


export default class GrammarCorrect extends BasePlugin {
	onStart() {
		this.patch();
		this.patchSendMessage();
		console.log("%cGrammarCorrect", "background: #03C197; color: white; padding: 2px; border-radius: 4px; font-weight: 600;", "Successfully started.")
	}
	onStop() {
		Patcher.unpatchAll("grammar");
		console.log("%cGrammarCorrect", "background: #03C197; color: white; padding: 2px; border-radius: 4px; font-weight: 600;", "Stopped.")
	}

	isAuto() {
		return getData(this.constructor.name, "autoCorrect") ?? false;
	}


	patchSendMessage() {
		if(!this.isAuto()) return;
		/* https://github.com/Strencher/BetterDiscordStuff/blob/master/AutoCorrectV2/AutoCorrectV2.plugin.js#L101 */
		Patcher.instead("grammar", DiscordModules.MessageActions, "sendMessage", (_this, [channelId,message,,reply], ret) => {
			const correct = this.correct(message.content).then(e => {
				message.content = e;
				ret(channelId, message,null,reply)
			});
		})

	}

	patch() {
		/* Patching the message box context menu */
		Patcher.after("grammar", SlateTextAreaContextMenu, "default", (_this, [props], ret) => {
			const children = ret.props.children;
			let text = "";

			/* Patching the message box to get its content*/
			Patcher.after("grammar", ChannelTextAreaContainer.type, "render", (_, [{ textValue }], ret) => {
				text = textValue;
			})

			children.splice(children.length - 1, 0,
				<Menu.MenuGroup>
					<Menu.MenuItem
					id="correct"
                    key="correct" 
                    label="Correct"
                    action={async() => {
						const correction = await this.correct(text);
						if(!correction) return ComponentDispatch.dispatch("SHAKE_APP", {duration: 200, intensity: 3});

						const textArea = document.querySelector(".textArea-12jD-V");
						const editor = getInternalInstance(textArea).return.stateNode.editorRef;
						
						editor.moveToRangeOfDocument();
						editor.delete();
						editor.insertText(correction);
					}}/>
				</Menu.MenuGroup>
			)
		})  
	}

	async correct(text) {
		if(text.trim() === "") return null;
  		const body = {
			autoReplace: true,
			generateRecommendations: false,
			generateSynonyms: false,
			getCorrectionDetails: true,
			interfaceLanguage: "en",
			language: "eng",
			locale: "Indifferent",
			origin: "interactive",
			text,
		}
		const resp = await fetch("https://orthographe.reverso.net/api/v1/Spelling", {
		  headers: {
		    "content-type": "application/json",
		  },
		  body: JSON.stringify(body),
		  method: "POST",
		}).then(r => r.json());

		return resp.text || null;
	}

	getSettingsPanel() {
		const that = this;
		return function() {
			const [state, setState] = React.useState(that.isAuto());
			return (
				<SwitchItem value={state} onChange={e => {
					setState(e);
					setData(that.constructor.name, "autoCorrect", e)
				}}>
					Always correct messages before sending
				</SwitchItem>
			)
		}
	}

}