import { Patcher, WebpackModules } from '@zlibrary';
import { GuildStore } from '@zlibrary/discord';
import BasePlugin from '@zlibrary/plugin';

const activities = WebpackModules.getByProps("getEmbeddedActivitiesForUser");

export default class DiscordActivities extends BasePlugin {
    onStart() {
        this.patchGuildRegion();
        this.patchEnabledAppIds();
    }

    onStop() {
        Patcher.unpatchAll();
    }

    patchGuildRegion() {
        Patcher.after(GuildStore, 'getGuild', (_this, [props], ret) => {
            if(!ret?.region) return;
            ret.region = 'us-west';            
        })
    }

    patchEnabledAppIds() {
        const applicationIds = [
            // Prod
            "755827207812677713",
            "832012774040141894",
            "832013003968348200",
            "878067389634314250",
            "879863976006127627",
            "879863686565621790",
            "852509694341283871",
            "880218394199220334",
            "773336526917861400",
            "814288819477020702",
            "879864070101172255",
            "879863881349087252",
            "832012854282158180",
            // Dev
            "763133495793942528",
            "880218832743055411",
            "878067427668275241",
            "879864010126786570",
            "879864104980979792",
            "891001866073296967",
            "832012586023256104",
            "832012682520428625",
            "832013108234289153",
        ];
        Patcher.instead(activities, "getEnabledAppIds", (function() {
            return applicationIds;
        }));
    }
}