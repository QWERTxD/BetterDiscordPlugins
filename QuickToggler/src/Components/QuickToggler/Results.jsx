import AddonResult from './AddonResult';

export default function Results({query}) {
    const plugins = BdApi.Plugins.getAll();
    const themes = BdApi.Themes.getAll();
    let addonsByQuery;

    const addons = [
        ...plugins,
        ...themes
    ]; 
    addonsByQuery = addons.filter(addon => Object.values(addon).toString().toLowerCase().includes(query.toLowerCase().replace(/\$(plugin|theme|enabled|disabled)/g, '').trim()));

    if(query.includes('$plugin')) {
        addonsByQuery = addonsByQuery.filter(addon => addon.filename.endsWith('js'));
    }

    if(query.includes('$theme')) {
        addonsByQuery = addonsByQuery.filter(addon => addon.filename.endsWith('css'));
    }

    if(query.includes('$enabled')) {
        addonsByQuery = addonsByQuery.filter(addon => {
            const addonStore = addon.filename.endsWith('js') ? BdApi.Plugins : BdApi.Themes;
            return addonStore.isEnabled(addon.id);
        })
    }

    if(query.includes('$disabled')) {
        addonsByQuery = addonsByQuery.filter(addon => {
            const addonStore = addon.filename.endsWith('js') ? BdApi.Plugins : BdApi.Themes;
            return !addonStore.isEnabled(addon.id);
        })
    }

    return (
        addonsByQuery.map(addon => {
            return (
                <AddonResult
                addon={addon}
                />
            )
        })
    )
}