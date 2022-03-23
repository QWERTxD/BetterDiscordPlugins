import { FormItem } from '@discord/forms';
import { WebpackModules } from '@zlibrary';
const KeybindRecorder = WebpackModules.getByDisplayName('KeybindRecorder');

export default function Settings({settings, saveSettings}) {
    return (
        <FormItem title='Quick Toggler Keybind'>
            <KeybindRecorder
            defaultValue={settings.keybind || [[0, 162], [0, 68]]}
            onChange={e => saveSettings({keybind: e})}
            />
        </FormItem>
    )
}