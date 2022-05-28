import fs from 'fs';
import { DCM, Modals, Toasts, WebpackModules } from '@zlibrary';
import { useState } from 'react'
import PluginIcon from './PluginIcon';
import ThemeIcon from './ThemeIcon';
import Result from './Result';
import path from 'path';

const OverflowTooltip = WebpackModules.getByDisplayName('OverflowTooltip');
const Colors = WebpackModules.getByProps('STATUS_GREEN', 'STATUS_RED');
const { TooltipContainer: Tooltip } = WebpackModules.getByProps('TooltipContainer');

export default function AddonResult({addon}) {
    const type = addon.filename.toLowerCase().endsWith('js') ? 'Plugin' : 'Theme';
    const AddonActions = type === 'Plugin' ? BdApi.Plugins : BdApi.Themes;
    const [isEnabled, setIsEnabled] = useState(AddonActions.isEnabled(addon.id));
    const color = isEnabled ? Colors.STATUS_GREEN : Colors.STATUS_RED;
    const ContextMenu = DCM.buildMenu([
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
        onClick={() => {
            setIsEnabled(!isEnabled);
            AddonActions.toggle(addon.id);
        }}
        onContextMenu={e => DCM.openContextMenu(e, ContextMenu)}
        name={addon.name}
        info={`v${addon.version} by ${addon.author}`}
        desc={<OverflowTooltip children={addon.description}/>}
        icon={<Tooltip text={`${type}, ${isEnabled ? 'Enabled' : 'Disabled'}`}>{type === 'Plugin' ? <PluginIcon fill={color} marginTop={10}/> : <ThemeIcon fill={color} marginTop={10}/>}</Tooltip>}
        />
    )
}