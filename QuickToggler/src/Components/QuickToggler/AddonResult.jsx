import fs from 'fs';
import { DiscordContextMenu, Modals, Toasts, WebpackModules } from '@zlibrary';
import PluginIcon from './PluginIcon';
import ThemeIcon from './ThemeIcon';
import Result from './Result';
import path from 'path';

const OverflowTooltip = WebpackModules.getByDisplayName('OverflowTooltip');
const { Colors } = WebpackModules.getByProps('Colors');
const { TooltipContainer: Tooltip } = WebpackModules.getByProps('TooltipContainer');

export default function AddonResult({addon}) {
    const type = addon.filename.toLowerCase().endsWith('js') ? 'Plugin' : 'Theme';
    const AddonActions = type === 'Plugin' ? BdApi.Plugins : BdApi.Themes;
    const isEnabled = AddonActions.isEnabled(addon.id);
    const color = isEnabled ? Colors.STATUS_GREEN : Colors.STATUS_RED;
    const ContextMenu = DiscordContextMenu.buildMenu([
        {
            label: 'Reload',
            action: () => {
                AddonActions.reload(addon.id);
            },
            color: 'colorBrand'
        },
        {
            label: 'Delete',
            action: () => {
                Modals.showConfirmationModal('Are you sure?', `Are you sure you want to remove **${addon.name}**?`, {
                    onConfirm: () => {
                        try {
                            fs.unlinkSync(path.resolve(AddonActions.folder, addon.filename));
                        } catch(err) {
                            Toasts.error(`Could not remove <strong>${addon.name}</strong>! Check console for more info.`)
                        }
                    }
                })
            },
            color: 'colorDanger'
        }
    ]);

    return (
        <Result
        onClick={() => AddonActions.toggle(addon.id)}
        onContextMenu={e => DiscordContextMenu.openContextMenu(e, ContextMenu)}
        name={addon.name}
        info={`v${addon.version} by ${addon.author}`}
        desc={<OverflowTooltip children={addon.description}/>}
        icon={<Tooltip text={`${type}, ${isEnabled ? 'Enabled' : 'Disabled'}`}>{type === 'Plugin' ? <PluginIcon fill={color} marginTop={10}/> : <ThemeIcon fill={color} marginTop={10}/>}</Tooltip>}
        />
    )
}