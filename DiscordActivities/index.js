import { Patcher, WebpackModules } from '@zlibrary';
import { GuildStore } from '@zlibrary/discord';
import BasePlugin from '@zlibrary/plugin';

const ExperimentUtils = WebpackModules.getByProps("overrideBucket");
const activitiesExperiment = WebpackModules.getModule(m => m.definition.id === "2020-11_poker_night");
const activities = WebpackModules.getByProps("GENERIC_EVENT_EMBEDDED_APPS");

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
        ExperimentUtils.overrideBucket("2020-11_poker_night", 2);
        Patcher.after(activitiesExperiment, 'useExperiment', (_this, [props], ret) => {
            ret[0].enabledApplicationIds = [
                activities.POKER_NIGHT_APPLICATION_ID,
                activities.CHESS_IN_THE_PARK_APPLICATION_ID,
                activities.END_GAME_APPLICATION_ID,
                activities.FISHINGTON_APPLICATION_ID,
                activities.YOUTUBE_APPLICATION_ID
            ];
        })
    }
}