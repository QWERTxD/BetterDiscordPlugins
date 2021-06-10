import zlib from '@zlibrary';
import decoder from 'react-error-decoder';
const {
	React,
	Patcher,
	findModule,
	findModuleByProps,
	findModuleByDisplayName
} = BdApi;

const proxy = window.console.error;

export default class Plugin {
	start() {
		console.log("%cReact Full Errors", "background: #87e3a1; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Successfully started.")
		window.console.error = async function(...args) {
			if(args.join(" ").includes('Minified React error')) {
				const error = decoder(args.join(" ").replace("Error: ", ""));
				console.error("%cReact%cError", "background: #61DBFB; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "margin-left: 5px; background: darkred; padding: 2px; border-radius: 4px;", error);
			}else{
				proxy(...args)
			}
		}
	}
	stop() {
		console.log("%cReact Full Errors", "background: #87e3a1; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Successfully stopped.")
		window.console.error = proxy;
	}
}
