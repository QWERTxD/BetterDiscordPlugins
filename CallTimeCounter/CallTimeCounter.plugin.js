/**
* @name CallTimeCounter
* @description Shows how much time you are in a voice chat.
* @version 1.0.0
* @author QWERT
* @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/CallTimeCounter/CallTimeCounter.plugin.js
* @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/CallTimeCounter/CallTimeCounter.plugin.js
* @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/CallTimeCounter
*/

const config = {
    changelog: [],
    settings: [
        { type: "switch", id: "logSessionToFile", name: "Log session to file", note: "Logs the session time to a file in the plugin folder.", value: false },
    ]
};

const { Webpack, Patcher, React, Data, UI, DOM } = BdApi;
const DiscordModules = Webpack.getModule(m => m.dispatch && m.subscribe);
const ChannelStore = Webpack.getStore("ChannelStore");
const GuildStore = Webpack.getStore("GuildStore");
const SelectedChannelStore = Webpack.getStore("SelectedChannelStore");

const rtcClasses = Webpack.getByKeys('rtcConnectionStatus', 'ping');
const panelContainerClasses = Webpack.getByKeys('connection', 'inner');
const textXsNormal = Webpack.getModule(m => m["text-xs/normal"] && !m["avatar"] && !m["defaultColor"])["text-xs/normal"];
const subtext = Webpack.getModules(m => m.subtext && Object.keys(m).length === 1)[0]["subtext"];

const PanelSubtext = Webpack.getModule(m => m?.$$typeof?.toString() === "Symbol(react.forward_ref)"
    && m.render?.toString().includes("createHref"), { searchExports: true });

let lastVoice, lastState;

module.exports = class CallTimeCounter {
    constructor(meta) {
        this.meta = meta;
    }

    initSettings() {
        config.settings[0].value = Data.load(this.meta.name, "logSessionToFile") ?? false;
    }

    getSettingsPanel() {
        return UI.buildSettingsPanel({
            settings: config.settings,
            onChange: (category, id, value) => {
                if(id === "logSessionToFile") {
                    config.settings[0].value = value;
                }
                Data.save(this.meta.name, id, value);
            }
        });
    }

    start() {
        this.initSettings();
        this.patch();
        DOM.addStyle(this.meta.name, `
            .${rtcClasses.rtcConnectionStatus}, .${panelContainerClasses.inner}, .${panelContainerClasses.connection} {
                height: fit-content;
            }
            .${panelContainerClasses.channel}:hover > div {
                text-decoration: underline !important;
            }
            .voiceTimer {
                font-size: 12px;
            }
        `);
    }

    stop() {
        Patcher.unpatchAll(this.meta.name);
        DOM.removeStyle(this.meta.name);
    }

    patch() {
        Patcher.before(this.meta.name, PanelSubtext, "render", (_, [props], ret) => {
            if (!props?.children?.props?.className?.includes("channel")) return;
            if(!props?.children?.props?.children) return;
            props.children.props.children = [
                props.children.props.children,
                React.createElement(Timer)
            ];
        });
    }
};

const fs = require("fs");
const path = require("path");
var lastSavedTime = 0;

function timeToString(time) {
    let date = new Date(time);
    let ss = date.getUTCSeconds();
    let mm = date.getUTCMinutes();
    let hh = date.getUTCHours();
    let DD = date.getUTCDate() - 1;
    let MM = date.getUTCMonth();
    let YY = date.getUTCFullYear() - 1970;
  
    let timeString = "";
    if (YY > 0) timeString += `${YY}y `;
    if (MM > 0) timeString += `${MM}m `;
    if (DD > 0) timeString += `${DD}d `;
    if (hh > 0) timeString += `${hh}h `;
    if (mm > 0) timeString += `${mm}m `;
    timeString += `${ss}s`;

    return timeString;
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: 0,
            delta: 0
        };
        this.handleConnected = this.connected.bind(this);
    }

    connected(e) {
        if (e.state && e.state === 'RTC_DISCONNECTED' && !e.hasOwnProperty('streamKey')) {
            this.logToFile();
            this.setState((prev) => (prev.startTime = Date.now()));
        }
    }

    componentDidMount() {
        if (lastVoice === SelectedChannelStore.getVoiceChannelId()) {
            DiscordModules.subscribe('RTC_CONNECTION_STATE', this.handleConnected);
            this.setState(lastState);
            this.interval = setInterval(() => {
                this.setState((prev) => (prev.delta = Math.round((Date.now() - prev.startTime) / 1000) * 1000));
                this.setState((prev) => prev.lastVoice = SelectedChannelStore.getVoiceChannelId());
            }, 1000);
        } else {
            this.setState((prev) => (   
                prev.startTime = Date.now()));
            DiscordModules.subscribe('RTC_CONNECTION_STATE', this.handleConnected);
            this.interval = setInterval(() => {
                this.setState((prev) => (prev.delta = Math.round((Date.now() - prev.startTime) / 1000) * 1000));
                this.setState((prev) => prev.lastVoice = SelectedChannelStore.getVoiceChannelId());
            }, 1000);
        }
    }

    componentWillUnmount() {
        DiscordModules.unsubscribe('RTC_CONNECTION_STATE', this.handleConnected);
        lastVoice = this.state.lastVoice;
        lastState = this.state;
        setTimeout(() => {
            lastVoice = null;
            lastState = {};
        }, 1000);
        clearInterval(this.interval);
    }

    render() {
        return React.createElement("div", { className: `${textXsNormal} ${subtext}` }, `Time elapsed: ${timeToString(this.state.delta)}`);
    }

    logToFile() {
        if(!config.settings[0].value) return;   
        let now = Date.now();
        if(now - lastSavedTime < 1000) return;
        lastSavedTime = now;
        let channelId = this.state.lastVoice;
        if(channelId) {
            let channel = ChannelStore.getChannel(channelId);
            let guild = GuildStore.getGuild(channel.guild_id);
            let filePath = path.join(__dirname, "CallTimeCounter.log");
            let start = new Date(this.state.startTime).toISOString();
            let delta = timeToString(this.state.delta);
            fs.writeFileSync(filePath, `${start}, ${guild?.name}, ${channel?.name}, ${delta}\n`, { flag: "a" });
        }
    }    
};
