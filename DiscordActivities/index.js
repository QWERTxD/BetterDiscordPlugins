import { Patcher, WebpackModules } from '@zlibrary';
import { GuildStore } from '@zlibrary/discord';
import BasePlugin from '@zlibrary/plugin';

const activitiesExperiment = WebpackModules.getByProps("isActivitiesEnabled");
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
                activities.POKER_NIGHT_APPLICATION_ID,
                activities.CHESS_IN_THE_PARK_APPLICATION_ID,
                activities.END_GAME_APPLICATION_ID,
                activities.FISHINGTON_APPLICATION_ID,
                activities.YOUTUBE_APPLICATION_ID
        ];
        activitiesExperiment.getEnabledAppIds = function (e) {
            return applicationIds;
        };
        activitiesExperiment.isActivitiesEnabled = function (e) {
            return true;
        };
    }
}