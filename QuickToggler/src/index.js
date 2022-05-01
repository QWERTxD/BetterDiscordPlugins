import { PluginUtilities } from '@zlibrary';
import { ModalStack } from '@zlibrary/discord';
import BasePlugin from '@zlibrary/plugin';
import QuickTogglerComponent from './Components/QuickToggler/QuickToggler';
import Settings from './Components/Settings';

let keys = {};
let settings = {};

export default class QuickToggler extends BasePlugin {
	onStart() {
		settings = this.getSettings();
		document.addEventListener('keydown', this.keydown, true);
		document.addEventListener('keyup', this.openModal, true);
	}

	keydown(ev) {
		keys[ev.keyCode] = true;
	}

	openModal(e) {
		const keybinds = (settings?.keybind || [[0, 162], [0, 68]]).map(e => e[1] === 162 ? 17 : (e[1] === 160 ? 16 : (e[1] === 164 ? 18 : e[1])));
		if (keybinds.every(key => keys[key] === true)) {
			keys = {};
			ModalActions.openModal(props => <QuickTogglerComponent {...props}/>)
		} else {
		  setTimeout(() => keys = {}, 300)
		}
		keys[e.key] = false;
	}

	onStop() {
		document.removeEventListener('keydown', this.keydown, true);
		document.removeEventListener('keyup', this.openModal, true);
	}

	getSettings() {
		return PluginUtilities.loadSettings('QuickToggler', {keybind: [[0, 162], [0, 68]]});
	}

	saveSettings(newSettings) {
		PluginUtilities.saveSettings('QuickToggler', newSettings);
		settings = newSettings;
	}

	getSettingsPanel() {
		return <Settings settings={this.getSettings()} saveSettings={this.saveSettings}/>
	}
}