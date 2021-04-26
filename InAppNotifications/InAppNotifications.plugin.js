/**
* @name InAppNotifications
* @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/InAppNotifications/InAppNotifications.plugin.js
* @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/InAppNotifications/InAppNotifications.plugin.js
* @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/InAppNotifications
*/

const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "InAppNotifications",
        authors: [
            {
                name: "QWERT"
            }
        ],
        version: "0.0.2",
        description: "Displays notifications such as new messages, friends added in Discord.",
    },
    changelog: [
        {
            title: "Added",
            type: "added",
            items: [
                "A setting to control notifications position",
                "A setting to control whether to mark message as read when pressing the close button in a notification."
            ]
        },
        {
            title: "Fixed",
            type: "fixed",
            items: [
                "\"Friend requests notifications\" settings description.",
                "Jump to Message causing HUD issues."
            ]
        }
    ],
    defaultConfig: [
        {
            type: "textbox",
            name: "Notification display time (seconds)",
            note: "Sets the amount of time for a notification to stay on-screen.",
            id: "notiTime",
            value: "3"
        },
        {
            type: "dropdown",
            name: "Notifications Position", 
            note: "Note: a client reload is required for changes to take effect.", 
            value: 0, 
            id: "position",
            options: [
                { label: 'Top Right', value: 0 },
                { label: 'Top Left', value: 1 },
                { label: 'Bottom Right', value: 2 },
                { label: 'Bottom Left', value: 3 },
            ]
        },
        {
            type: "switch",
            name: "Mark message as read when closing",
            note: "Marks the message as read if you press the close button on a notification.",
            id: "markAsRead",
            value: true
        },
        {
            type: "switch",
            name: "Display author's highest role color if available",
            note: "Sets the author's color in the notification to its highest role color.",
            id: "roleColor",
            value: false
        },
        {
            type: "switch",
            name: "Disable when window is not focused",
            note: "Do not push notifications if Discord is not focused.",
            id: "disableIfNoFocus",
            value: false
        },
        {
            type: "switch",
            name: "Disable on Do Not Disturb",
            note: "Do not push notifications if the current user status is Do Not Disturb.",
            id: "disableOnDnd",
            value: false
        },
        {
            type: "switch",
            name: "Disable DMs notifications",
            note: "Do not push notifications from DM chats.",
            id: "ignoreDMs",
            value: false
        },
        {
            type: "switch",
            name: "Friend requests notifications",
            note: "Do not push notifications for accepted friend requests.",
            id: "relationshipsNotis",
            value: true
        },
        {
            type: "switch",
            name: "Disable Group DMs notifications",
            note: "Do not push notifications from DM groups.",
            id: "ignoreDMGroups",
            value: false
        },
        {
            type: "textbox",
            name: "Ignored Users IDs (Split with `, `)",
            note: "Do not push notifications if the author's id is specified.",
            id: "ignoredUsers",
            value: ""
        },
        {
            type: "textbox",
            name: "Ignored Servers IDs (Split with `, `)",
            note: "Do not push notifications if the message was sent from a specific server.",
            id: "ignoredServers",
            value: ""
        },
        {
            type: "textbox",
            name: "Ignored Channels IDs (Split with `, `)",
            note: "Do not push notifications if the message was sent from a specific channel.",
            id: "ignoredChannels",
            value: ""
        }    

    ]
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for AQWERT'sPluginBuilder is missing. Please click Download Now to install it.`, {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
                request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                    if (error)
                        return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");

                    fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                });
            }
        });
    }

    start() {}

    stop() {}
} : (([Plugin, Library]) => {
    const {DiscordModules, WebpackModules, PluginUtilities, Structs} = Library;
    const {React, ReactDOM, Dispatcher, UserStore, ChannelStore, NavigationUtils, UserStatusStore, SelectedChannelStore, GuildMemberStore, UserProfileModals} = DiscordModules;
    const MuteStore = WebpackModules.getByProps("isSuppressEveryoneEnabled");
    const isMentioned = WebpackModules.getByProps('isRawMessageMentioned');
    const ParseUtils = WebpackModules.getByProps("parseTopic");
    const AckUtils = WebpackModules.getByProps("bulkAck", "ack");
    const CallJoin = WebpackModules.findByDisplayName("CallJoin");
    const ImagePlaceholder = WebpackModules.findByDisplayName("ImagePlaceholder");
    const PersonAdd = WebpackModules.findByDisplayName("PersonAdd");

    const classes = {
        ...WebpackModules.getByProps("horizontal", "flex", "justifyStart"),
        ...WebpackModules.getByProps("avatar", "alt")
    }

    const Spring = WebpackModules.getByProps("useSpring");
    const {useSpring, animated} = Spring;

    const createStore = state => {
        const listeners = new Set();

        const api = {
            getState(collector) {
                return collector ? collector(state) : state;
            },
            setState(partial) {
                const partialState = typeof partial === "function" ? partial(state) : partial;
                state = Object.assign({}, state, partialState);
                listeners.forEach(listener => {
                    listener(state);
                });
            },
            get listeners() {return listeners;},
            on(listener) {
                if (listeners.has(listener)) return;
                listeners.add(listener);

                return () => listeners.delete(listener);
            },
            off(listener) {
                return listeners.delete(listener);
            }
        };

        function useState(collector) {
            collector = typeof collector === "function" ? collector : e => e;
            const forceUpdate = React.useReducer(e => e + 1, 0)[1];
            
            React.useEffect(() => {
                const handler = () => forceUpdate();

                listeners.add(handler);

                return () => listeners.delete(handler);
            }, []);

            return collector(api.getState());
        }

        return [useState, api];
    }

    const {useEffect, useState} = React;

    const [useStore, api] = createStore({toasts: []});

    const QWERTLib = new class {
        Toasts = {
            _api: api,
            get RunningToasts() {return api.getState(e => e.toasts)},

            Toast: function Toast(props) {
                const {children = [], avatar, id, author, onClick = _ => {}, color, time = 3000, onManualClose} = props;
                const [readyToClose, setReadyToClose] = useState(false);

                useEffect(_ => {
                    if (readyToClose) {
                        api.setState(state => {
                            const index = state.toasts.findIndex(e => e.id === id);
                            if (index < 0) return state;
                            state.toasts.splice(index, 1);
                            return state;
                        });
                        if (props.onClose) props.onClose();
                    }
                }, [readyToClose]);

                const spring = useSpring({
                    from: {
                        progress: 0,
                    },
                    to: {
                        progress: 100, 
                    },
                    onRest: _ => {
                        setReadyToClose(true);
                    },
                    config: {duration: time},
                });

                return React.createElement(animated.div, {
                    className: "qwert-toast",
                    id: id,
                    onMouseOver: _ => {
                        spring.progress.pause();
                    },
                    onMouseOut: _ => {
                        spring.progress.resume();
                    },
                    children: [
                        avatar && React.createElement("div", {
                            className: "qwert-toast-icon-container",
                            children: React.createElement("img", {src: avatar, className: "qwert-toast-icon"})
                        }),
                        React.createElement("div", {onClick: function() {
                            onClick(),
                            setReadyToClose(true)
                        }}, 
                        author && React.createElement("strong", {
                            className: "qwert-toast-author",
                           }, author),
                           React.createElement("div", {
                               className: `qwert-toast-text ${classes.flex} ${classes.horizontal} ${classes.noWrap} ${classes.justifyStart}`
                           }, children)),
                        React.createElement(animated.div, {
                            className: "qwert-toast-bar",
                            style: {
                                width: spring.progress.to(e => `${e}%`),
                                background: color ?? "rgb(67, 181, 129)"
                            }
                        }),
                        React.createElement("svg", {
                            className: "qwert-toast-close", 
                            width: "16", height: "16", 
                            viewBox: "0 0 24 24", 
                            onClick: function() {
                                onManualClose();
                                setReadyToClose(true);
                            }, 
                        }, React.createElement("path", {d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z", fill: "currentColor"}))
                    ]
                })
            },

            detroy(id) {
                const state = api.getState().toasts;
                const toast = state.find(e => e.id === id);
                if (!toast) return false;

                if (!toast.ref.current) return false;
                toast.ref.current.close();
                state.toasts.splice(state.toasts.indexOf(toast), 1);
                api.setState({toasts});
            },

            create(children, props) {
                const id = QWERTLib.createUUID();

                api.setState(state => ({toasts: state.toasts.concat({children, ...props, id})}));

                return id;
            },

            initialize() {
                const DOMElement = document.createElement("div");
                DOMElement.className = "qwert-toasts";

                function QWERTToasts() {
                    const toasts = useStore(s => s.toasts);
                    return toasts.map(toast => React.createElement(QWERTLib.Toasts.Toast, {
                        ...toast,
                        key: toast.id
                    }));
                }

                ReactDOM.render(React.createElement(QWERTToasts, {}), DOMElement);
                if(document.querySelector(".qwert-toasts")) return;
                document.getElementById("app-mount").appendChild(DOMElement);
            },
            shutdown() {
                const DOMElement = document.getElementsByClassName("qwert-toasts")[0];
                ReactDOM.unmountComponentAtNode(DOMElement);
                DOMElement.remove();
            }
        }

        createUUID() {
            return 'xxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        initialize() {
            this.Toasts.initialize();
        }

        shutdown() {
            this.Toasts.shutdown();
        }
    }
    class plugin extends Plugin {
        constructor() {
            super();
            this.getSettingsPanel = () => {
                return this.buildSettingsPanel().getElement();
            };
            const om = this.onMessage.bind(this);
            this.onMessage = e => {
                try{
                    om(e);
                }catch(e){
                    console.log(`%c[InAppNotifications]%c Error!%c`, "color: #3a71c1;", "font-weight: 700; color: #b3001b;", "\n", e);
                    BdApi.alert("InAppNotifications", "There was an error while trying to start the plugin and Discord.\nFor any further support, join my support server (https://discord.gg/zMnHFAKsu3)")
                }
            }
            const friendRequestFunc = this.friendRequest.bind(this);
            this.friendRequest = e => {
                try{
                    friendRequestFunc(e);
                }catch(e){
                    console.log(`%c[InAppNotifications]%c Error!%c`, "color: #3a71c1;", "font-weight: 700; color: #b3001b;", "\n", e);
                    BdApi.alert("InAppNotifications", "There was an error while trying to start the plugin and Discord.\nFor any further support, join my support server (https://discord.gg/zMnHFAKsu3)")
                }
            }
        }

        onStart() {
            Dispatcher.subscribe("MESSAGE_CREATE", this.onMessage);
            Dispatcher.subscribe("FRIEND_REQUEST_ACCEPTED", this.friendRequest);
            QWERTLib.initialize();
            PluginUtilities.addStyle("QWERTLib", `
            .qwert-toasts {
              position: absolute;
              right: 10px;
              left: 10px;
              right: 10px;
              ${[0,1].includes(this.settings.position) ? "top: 10px;" : "bottom: 30px;"}
              justify-content: flex-start;
              align-items: ${[0,2].includes(this.settings.position) ? "flex-end" : "flex-start"};
              display: flex;
              flex-direction: column;
              pointer-events: none;
              z-index: 9999;
            }

            .qwert-toast {
             position: relative;
             display: flex;
             pointer-events: all;
             align-items: center;
             min-height: 24px;
             backdrop-filter: blur(5px);
             border-radius: 3px;
             box-shadow: var(--elevation-medium);
             padding: 10px 12px 10px 10px;
             max-width: 50vw;
             opacity: 1;
             margin-top: 10px;
             color: white;
             background: rgba(10,10,10,0.5);
             overflow: hidden;
             cursor: pointer;
            }
            
            .qwert-toast-text {
             position: relative;
             display: flex;
             max-width: 400px;
             max-height: 24px;
             flex: 1 0 auto;
             font-size: 14px;
             font-weight: 500;
             white-space: nowrap;
             word-wrap: break-word;
             text-overflow: ellipsis;
            }

            .qwert-toast-author {
             font-size: 14px;
             max-width: 400px;
             max-height: 24px;
             white-space: nowrap;
             word-wrap: break-word;
             text-overflow: ellipsis;
             margin-bottom: 2px;
            }

            .qwert-toast-bar {
             height: 3px;
             position: absolute;
             bottom: 0;
             left: 0;
            }

            .qwert-toast-icon {
             height: 22px;
             height: 22px;
             border-radius: 50%;
            }

            .qwert-toast-icon-container {
             padding-right: 5px;
             margin-top: 1px;
            }

            .qwert-toast-close {
             margin-left: 5px;
             cursor: pointer;
            }
          }`);
        }

        onMessage({message}) {
            const author = UserStore.getUser(message.author.id);
            const channel = Structs.Channel.fromId(message.channel_id);
            const xChannel = ChannelStore.getChannel(message.channel_id);
            const notiTime = this.settings.notiTime;

            if(channel.id === SelectedChannelStore.getChannelId()) return false;
            
            let content;
            if(!this.supposedToNotify(message, xChannel)) return;
            let authorString = "";
            if(channel.guild) {
                const colorString = GuildMemberStore.getMember(channel.guild.id, author.id).colorString;
                if(this.settings.roleColor) {
                    authorString = [
                        React.createElement("div", {
                            style: {
                                color: colorString ?? "white",
                                display: "inline"
                            }
                        }, author.tag),
                        ` (${channel.guild.name}, #${channel.name})`
                    ];
                }else{
                    authorString = `${author.tag} (${channel.guild.name}, #${channel.name})`;
                }
            }
            if(channel.type === "GROUP_DM") {
                authorString = `${author.tag} (${channel.name})`;
                if(!channel.name || channel.name === " " || channel.name === "") {
                    authorString = `${author.tag} (${channel.members.map(e => e.username).join(", ")})`;
                }
            }
            if(channel.type === "DM") {
                authorString = `${author.tag}`;
            }
            
            if(message.call) {
                content = [React.createElement(CallJoin, {style: {height: "16px", width: "16px", color: "rgb(67, 181, 129)", marginRight: "2px"}}), "Started a call"]
            }

            if(message.attachments.length !== 0) {
                content = [React.createElement(ImagePlaceholder, {style: {height: "16px", width: "16px", marginRight: "2px"}}), ParseUtils.parse(message.content)]
                
                if(message.content === "") {
                    content = [React.createElement(ImagePlaceholder, {style: {height: "16px", width: "16px", marginRight: "2px"}}), "Attachment"]
                }
            }

            if(message.embeds.length !== 0) {
                content = [React.createElement(ImagePlaceholder, {style: {height: "16px", width: "16px", marginRight: "2px"}}), ParseUtils.parse(message.content)];

                if(message.content === "") {
                    content = [React.createElement(ImagePlaceholder, {style: {height: "16px", width: "16px", marginRight: "2px"}}), "Embed"];
                }
            }

            if(!this.checkSettings(message, channel)) return;
            const children = content ? content : ParseUtils.parse(message.content);
            const time = isNaN(notiTime * 1000) ? 3000 : notiTime * 1000;
            QWERTLib.Toasts.create(children, {
                avatar: author.avatarURL,
                author: authorString,
                time,
                onClick: () => {
                    NavigationUtils.transitionToGuild(channel.guild_id || "@me", message.channel_id, message.id);
                },
                onManualClose: () => {
                    if(!this.settings.markAsRead) return;
                    AckUtils.ack(message.channel_id);
                }
            });
        }

        supposedToNotify(message, channel) {
            if(message.author.id === UserStore.getCurrentUser().id) return false;
            const isSuppressEveryone = MuteStore.isSuppressEveryoneEnabled(message.guild_id || "@me");
            const isSuppressRoles = MuteStore.isSuppressRolesEnabled(message.guild_id || "@me");
            if(MuteStore.allowAllMessages(channel)) return true;
            return isMentioned.isRawMessageMentioned(message, UserStore.getCurrentUser().id, isSuppressEveryone, isSuppressRoles);
        }

        checkSettings(message, channel) {
            let shouldNotify = true;
            const ignoredUsers = this.settings.ignoredUsers.replace(/\s/g, "").split(",");
            const ignoredServers = this.settings.ignoredServers.replace(/\s/g, "").split(",");
            const ignoredChannels = this.settings.ignoredChannels.replace(/\s/g, "").split(",");
            const ignoreDMs = this.settings.ignoreDMs;
            const ignoreDMGroups = this.settings.ignoreDMGroups;

            const disableOnDnd = this.settings.disableOnDnd;
            const isDnd = UserStatusStore.getStatus(UserStore.getCurrentUser().id) === "dnd";

            if(disableOnDnd) {
                shouldNotify = !isDnd;
            }

            if(ignoreDMs) {
                if(channel.type === "DM") shouldNotify = false;
            }

            if(ignoreDMGroups) {
                if(channel.type === "GROUP_DM") shouldNotify = false;
            }

            if(ignoredUsers.includes(message.author.id)) shouldNotify = false;
            if(ignoredServers.includes(channel.guild_id)) shouldNotify = false;
            if(ignoredChannels.includes(channel.id)) shouldNotify = false;

            return shouldNotify;
        }

        friendRequest({user}) {
            if(!this.settings.relationshipsNotis) return;
            user = UserStore.getUser(user.id);
            QWERTLib.Toasts.create([React.createElement(PersonAdd, {style: {height: "16px", width: "16px", color: "rgb(67, 181, 129)", marginRight: "2px"}}), "Accepted your friend request."], {
                author: user.tag,
                avatar: user.avatarURL,
                onClick: () => {
                    UserProfileModals.open(user.id);
                }
            })
        }

        onStop() {
            Dispatcher.unsubscribe("MESSAGE_CREATE", this.onMessage);
            Dispatcher.unsubscribe("FRIEND_REQUEST_ACCEPTED", this.friendRequest);
            PluginUtilities.removeStyle("QWERTLib");
            QWERTLib.shutdown();
       }

    }

    return plugin;
})(global.ZeresPluginLibrary.buildPlugin(config));
