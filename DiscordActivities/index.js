import { Patcher, WebpackModules, DiscordAPI, Toasts } from '@zlibrary';
import { GuildStore } from '@zlibrary/discord';
import BasePlugin from '@zlibrary/plugin';

const activitiesExperiment = WebpackModules.getByProps("getEmbeddedActivitiesForUser");
const activities = WebpackModules.getByProps("YOUTUBE_APPLICATION_ID");

export default class DiscordActivities extends BasePlugin {
    onStart() {
        this.patchGuildRegion();
        this.enableExperiment();
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

    enableExperiment() {
        const applicationIds = [
            "755827207812677713",
            "832012774040141894",
            "832013003968348200",
            "878067389634314250",
            "879863976006127627",
            "879863686565621790",
            "852509694341283871",
            "880218394199220334",
            activities.END_GAME_APPLICATION_ID,
            activities.FISHINGTON_APPLICATION_ID,
            activities.WATCH_YOUTUBE_DEV_APP_ID
        ];
        const gameGuildId = "831646372519346186";
        var isInGameGuild = DiscordAPI.Guild.fromId(gameGuildId);
        if (isInGameGuild == undefined) {
            Patcher.instead(activitiesExperiment, "getEnabledAppIds", (function() {
                return applicationIds;
            }));
        } else {
            WebpackModules.getByProps("fetchEmbeddedActivities").fetchEmbeddedActivities("831646372519346186");
            Patcher.before(activitiesExperiment, "getEnabledAppIds", (function(_, args) {
                args[0] = gameGuildId;
            }));
            Patcher.after(activitiesExperiment, "getEnabledAppIds", (function(_, __, ret) {
                if (ret[ret.length - 1] != activities.WATCH_YOUTUBE_DEV_APP_ID) {
                    ret.push(activities.END_GAME_APPLICATION_ID);
                    ret.push(activities.FISHINGTON_APPLICATION_ID);
                    ret.push(activities.WATCH_YOUTUBE_DEV_APP_ID);
                    if (ret.length !== applicationIds.length || !ret.every(function(value, index) { return value === applicationIds[index]})) {
                        Toasts.show("DiscordActivities: redownloaded activities list", "warning");
                    }
                }
            }));
        }
    }
}