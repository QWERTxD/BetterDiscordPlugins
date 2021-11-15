import { Patcher, WebpackModules } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";

const AttachMenu = WebpackModules.find(m => m.default?.displayName === "ChannelAttachMenu");

export default class OldUpload extends BasePlugin {
	onStart() {
		this.patch();
	}

	onStop() {
		Patcher.unpatchAll();
	}

	patch() {
		Patcher.after(AttachMenu, "default", (_this, [props], ret) => {
			const options = props.options;
			const uploadOption = ret.props.children.find(e => e.key === "upload-file");
			delete uploadOption.props.subtext;

			if(!options || options.length > 1 || options[0]?.type !== "UPLOAD_A_FILE") return;
			props.onClose();
			props.onFileUpload();
		})	
	}
}