import AddonResult from './AddonResult';
import fuzzysort from '../../Util/fuzzysort';

//lower is better/more relevant
const biases = {
    name: "0",
    author: "5",
    description: "10",
    version: "10",
};

function sortByBestResults(addons, query) {
    if (!query) return addons;
    query = query.toLowerCase().trim();

    //not all data is interesting, only look at the Addon name, Author, Description and Version
    let results = fuzzysort.go(query, addons, {
        keys: Object.keys(biases),
        allowTypo: true,
        //apply biases
        scoreFn: a => Math.max(...Object.values(biases).map((bias, i) => a[i]?a[i].score-bias:-1000)),
    });

    //this handles multiple authors, so "author1, author2, author3" will have the same score as "author1"
    results.forEach((result) => {
        if (result[1]?.target.includes(", ")) {
            const fuzzy = fuzzysort.go(query, result[1].target.split(", "));
            result.score = Math.max(result.score, fuzzy[0]?.score-biases.author);
        }
    });

    //if the score is the same, sort alphabetically
    return results
        .sort((a, b) => a.score !== b.score ? b.score - a.score : a.obj.name.localeCompare(b.obj.name))
        .map((r) => r.obj);
}

export default function Results({query}) {
    const plugins = BdApi.Plugins.getAll();
    const themes = BdApi.Themes.getAll();
    let addonsByQuery;

    const addons = [
        ...plugins,
        ...themes
    ]; 

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

    addonsByQuery = sortByBestResults(addons, query);
    return (
        addonsByQuery.map(addon => {
            return (
                <AddonResult
                addon={addon}
                key={addon.id}
                />
            )
        })
    )
}