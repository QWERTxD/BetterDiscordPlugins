/**
 * @name AppNotifications
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/InAppNotifications/InAppNotifications.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/InAppNotifications/InAppNotifications.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/InAppNotifications
 * @version 1.1.2
*/
const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "AppNotifications",
        authors: [
            {
                name: "QWERT",
                discord_id: "678556376640913408",
                github_username: "QWERTxD"
            }
        ],
    github_raw:
      "https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/InAppNotifications/InAppNotifications.plugin.js",
    version: "1.1.2",
    description:
      "Displays notifications such as new messages, friends added in Discord.",
	},
  changelog: [
    {
      "title": "Fixed",
      "type": "fixed",
      "items": [
        "Fixed mentions not working.",
      ]
    }
  ],
  defaultConfig: [
    {
      type: "slider",
      name: "Notification display time (seconds)",
      note: "Sets the amount of time for a notification to stay on-screen.",
      min: 3,
      max: 25,
      id: "notiTime",
      value: 3,
      markers: [...Array(20).keys()].map((e) => (e += 1)),
      stickToMarkers: true,
    },
    {
      type: "dropdown",
      name: "Notifications Position",
      note: "Note: a client reload is required for changes to take effect.",
      value: 0,
      id: "position",
      options: [
        { label: "Top Right", value: 0 },
        { label: "Top Left", value: 1 },
        { label: "Bottom Right", value: 2 },
        { label: "Bottom Left", value: 3 },
      ]
    },
    {
      type: "textbox",
      name: "Keyword Notifications",
      note: "Push notifications if certain words were sent in a message. (Separate with a comma)",
      id: "keywords",
      value: "",
    },
    {
      type: "switch",
      name: "keywords case sensitive",
      id: "case",
      value: false,
    },
    {
      type: "switch",
      name: "Mark message as read when closing",
      note: "Marks the message as read if you press the close button on a notification.",
      id: "markAsRead",
      value: true,
    },
    {
      type: "switch",
      name: "Display author's highest role color if available",
      note: "Sets the author's color in the notification to its highest role color.",
      id: "roleColor",
      value: false,
    },
    {
      type: "switch",
      name: "Disable when window is not focused",
      note: "Do not push notifications if Discord is not focused.",
      id: "disableIfNoFocus",
      value: false,
    },
    {
      type: "switch",
      name: "Disable on Do Not Disturb",
      note: "Do not push notifications if the current user status is Do Not Disturb.",
      id: "disableOnDnd",
      value: false,
    },
    {
      type: "switch",
      name: "Disable DMs notifications",
      note: "Do not push notifications from DM chats.",
      id: "ignoreDMs",
      value: false,
    },
    {
      type: "switch",
      name: "Friend requests notifications",
      note: "Push notifications for accepted friend requests.",
      id: "relationshipsNotis",
      value: true,
    },
    {
      type: "switch",
      name: "Disable Group DMs notifications",
      note: "Do not push notifications from DM groups.",
      id: "ignoreDMGroups",
      value: false,
    },
    {
      type: "textbox",
      name: "Ignored Users IDs (Split with `, `)",
      note: "Do not push notifications if the author's id is specified.",
      id: "ignoredUsers",
      value: "",
    },
    {
      type: "textbox",
      name: "Ignored Servers IDs (Split with `, `)",
      note: "Do not push notifications if the message was sent from a specific server.",
      id: "ignoredServers",
      value: "",
    },
    {
      type: "textbox",
      name: "Ignored Channels IDs (Split with `, `)",
      note: "Do not push notifications if the message was sent from a specific channel.",
      id: "ignoredChannels",
      value: "",
    }
  ]
  };

module.exports = !global.ZeresPluginLibrary
  ? class {
      constructor() {
        this._config = config;
      }

      load() {
        BdApi.showConfirmationModal(
          "Library plugin is needed",
          `The library plugin needed for AQWERT'sPluginBuilder is missing. Please click Download Now to install it.`,
          {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
              request.get(
                "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
                (error, response, body) => {
                  if (error)
                    return electron.shell.openExternal(
                      "https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
                    );

                  fs.writeFileSync(
                    path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
                    body
                  );
                }
              );
            },
          }
        );
      }

      start() {}

      stop() {}
    }
  : (([Plugin, Library]) => {
      const {
        DiscordModules,
        WebpackModules,
        PluginUtilities,
        Settings,
        Patcher,
      } = Library;

      const {
        React,
        ReactDOM,
        Dispatcher,
        UserStore,
        ChannelStore,
        GuildStore,
        NavigationUtils,
        UserStatusStore,
        SelectedChannelStore,
        GuildMemberStore,
        // UserProfileModals,
        InviteActions,
      } = DiscordModules;
      const { Webpack } = BdApi;

      const ChannelTypes = Webpack.getModule(Webpack.Filters.byProps("GUILD_TEXT"), { searchExports: true });
      const MuteStore = WebpackModules.getByProps("isSuppressEveryoneEnabled");
      const isMentioned = { isRawMessageMentioned: WebpackModules.getModule(Webpack.Filters.byStrings("rawMessage", "suppressEveryone"), {searchExports: true}) };
      const Markdown = WebpackModules.getByProps("parse", "parseTopic");
      const AckUtils = { ack: Webpack.getModule(Webpack.Filters.byStrings("CHANNEL_ACK"), { searchExports: true }) };
      const CallJoin = WebpackModules.getByString("M11 5V3C16.515 3 21 7.486 21 13H19C19 8.589 15.411 5 11 5ZM17 13H15C15 10.795 13.206 9 11 9V7C14.309 7 17 9.691 17 13ZM11 11V13H13C13 11.896 12.105 11 11 11ZM14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16Z");
      const ImagePlaceholder = WebpackModules.getByString("M6 2C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6ZM10 8C10 6.8952 9.1032 6 8 6C6.8944 6 6 6.8952 6 8C6 9.1056 6.8944 10 8 10C9.1032 10 10 9.1056 10 8ZM9 14L6 18H18L15 11L11 16L9 14Z")
      const PersonAdd = WebpackModules.getByString("M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z")
			const CloseIcon = WebpackModules.getByString("M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z");
      const StickerIcon = WebpackModules.getByString("M12.0002 0.662583V5.40204C12.0002 6.83974 13.1605 7.99981 14.5986 7.99981H19.3393C19.9245 7.99981 20.222 7.29584 19.8055 6.8794L13.1209 0.196569C12.7043 -0.219868 12.0002 0.0676718 12.0002 0.662583ZM14.5759 10.0282C12.0336 10.0282 9.96986 7.96441 9.96986 5.42209V0.0583083H1.99397C0.897287 0.0583083 0 0.955595 0 2.05228V18.0041C0 19.1007 0.897287 19.998 1.99397 19.998H17.9457C19.0424 19.998 19.9397 19.1007 19.9397 18.0041V10.0282H14.5759ZM11.9998 12.2201C11.9998 13.3245 11.1046 14.2198 10.0002 14.2198C8.8958 14.2198 8.00052 13.3245 8.00052 12.2201H6.66742C6.66742 14.0607 8.15955 15.5529 10.0002 15.5529C11.8408 15.5529 13.3329 14.0607 13.3329 12.2201H11.9998ZM4.44559 13.331C4.44559 13.9446 3.94821 14.442 3.33467 14.442C2.72112 14.442 2.22375 13.9446 2.22375 13.331C2.22375 12.7175 2.72112 12.2201 3.33467 12.2201C3.94821 12.2201 4.44559 12.7175 4.44559 13.331ZM16.6657 14.442C17.2793 14.442 17.7766 13.9446 17.7766 13.331C17.7766 12.7175 17.2793 12.2201 16.6657 12.2201C16.0522 12.2201 15.5548 12.7175 15.5548 13.331C15.5548 13.9446 16.0522 14.442 16.6657 14.442Z")

      const openProfileModal = Webpack.getModule(Webpack.Filters.byStrings("friendToken"), { searchExports: true });
      const UserProfileModals = {
        open: (id) => {
          openProfileModal({ userId: id });
        }
      };

      const colors = {
        online: "#43b581",
        dnd: "#f04747",
        away: "#faa61a",
        offline: "#747f8d",
        brand: "#7289da",
      };

      const classes = {
        ...WebpackModules.getByProps("horizontal", "flex", "justifyStart"),
        ...WebpackModules.getByProps("avatar", "alt"),
      };
      /* Created by Strencher */
      const Spring = WebpackModules.getModule(e => e.useSpring);
      const { useSpring, animated } = Spring;

      const createStore = (state) => {
        const listeners = new Set();

        const api = {
          getState(collector) {
            return collector ? collector(state) : state;
          },
          setState(partial) {
            const partialState =
              typeof partial === "function" ? partial(state) : partial;
            state = Object.assign({}, state, partialState);
            listeners.forEach((listener) => {
              listener(state);
            });
          },
          get listeners() {
            return listeners;
          },
          on(listener) {
            if (listeners.has(listener)) return;
            listeners.add(listener);

            return () => listeners.delete(listener);
          },
          off(listener) {
            return listeners.delete(listener);
          },
        };

        function useState(collector) {
          collector = typeof collector === "function" ? collector : (e) => e;
          const forceUpdate = React.useReducer((e) => e + 1, 0)[1];

          React.useEffect(() => {
            const handler = () => forceUpdate();

            listeners.add(handler);

            return () => listeners.delete(handler);
          }, []);

          return collector(api.getState());
        }

        return [useState, api];
      };

      const { useEffect, useState } = React;

      const [useStore, api] = createStore({ toasts: [] });

      const QWERTLib = new (class {
        Toasts = {
          _api: api,
          get RunningToasts() {
            return api.getState((e) => e.toasts);
          },

          Toast: function Toast(props) {
            const {
              children = [],
              avatar,
              id,
              author,
              onClick = (_) => {},
              color,
              time = 3000,
              onManualClose,
              icon,
            } = props;
            const [readyToClose, setReadyToClose] = useState(false);

            useEffect(
              (_) => {
                if (readyToClose) {
                  api.setState((state) => {
                    const index = state.toasts.findIndex((e) => e.id === id);
                    if (index < 0) return state;
                    state.toasts.splice(index, 1);
                    return state;
                  });
                  if (props.onClose) props.onClose();
                }
              },
              [readyToClose]
            );
            const spring = useSpring({
              from: {
                progress: 0,
                scale: readyToClose ? 1 : 0,
              },
              to: {
                progress: 100,
                scale: readyToClose ? 0 : 1,
              },
              onRest: (_) => {
                setReadyToClose(true);
              },
              config: (key) => {
                let duration = time;
                if (key === "scale") duration = 100;

                return { duration };
              },
            });

            return React.createElement(animated.div, {
              className: "qwert-toast",
              id: id,
              onMouseOver: (_) => {
                spring.progress.pause();
              },
              onMouseOut: (_) => {
                spring.progress.resume();
              },
              style: {
                scale: spring.scale.to((e) => {
                  return e;
                }),
              },
              children: [
                icon &&
                  React.createElement("div", {
                    className: "qwert-toast-icon-container",
                    children: icon,
                  }),
                avatar &&
                  React.createElement("div", {
                    className: "qwert-toast-avatar-container",
                    children: React.createElement("img", {
                      src: avatar,
                      className: "qwert-toast-avatar",
                    }),
                  }),
                React.createElement(
                  "div",
                  {
                    onClick: function () {
                      onClick(), setReadyToClose(true);
                    },
                  },
                  author &&
                    React.createElement(
                      "strong",
                      {
                        className: "qwert-toast-author",
                      },
                      author
                    ),
                  React.createElement(
                    "div",
                    {
                      className: `qwert-toast-text ${classes.flex} ${classes.horizontal} ${classes.noWrap} ${classes.justifyStart}`,
                    },
                    children
                  )
                ),
                React.createElement(animated.div, {
                  className: "qwert-toast-bar",
                  style: {
                    width: spring.progress.to((e) => `${e}%`),
                    background: color ?? colors.brand,
                  },
                }),
                React.createElement(
                  "svg",
                  {
                    className: "qwert-toast-close",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    onClick: function () {
                      onManualClose ? onManualClose() : () => {};
                      setReadyToClose(true);
                    },
                  },
                  React.createElement(CloseIcon)
                ),
              ],
            });
          },

          detroy(id) {
            const state = api.getState().toasts;
            const toast = state.find((e) => e.id === id);
            if (!toast) return false;

            if (!toast.ref.current) return false;
            toast.ref.current.close();
            state.toasts.splice(state.toasts.indexOf(toast), 1);
            api.setState({ toasts });
          },

          create(children, props) {
            const id = QWERTLib.createUUID();

            api.setState((state) => ({
              toasts: state.toasts.concat({ children, ...props, id }),
            }));

            return id;
          },

          initialize() {
            const DOMElement = document.createElement("div");
            DOMElement.className = "qwert-toasts";

            function QWERTToasts() {
              const toasts = useStore((s) => s.toasts);
              return toasts.map((toast) =>
                React.createElement(QWERTLib.Toasts.Toast, {
                  ...toast,
                  key: toast.id,
                })
              );
            }

            ReactDOM.render(React.createElement(QWERTToasts, {}), DOMElement);
            if (document.querySelector(".qwert-toasts")) return;
            document.getElementById("app-mount").appendChild(DOMElement);
          },
          shutdown() {
            const DOMElement =
              document.getElementsByClassName("qwert-toasts")[0];
            ReactDOM.unmountComponentAtNode(DOMElement);
            DOMElement.remove();
          },
        };

        createUUID() {
          return "xxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
        }

        initialize() {
          this.Toasts.initialize();
        }

        shutdown() {
          this.Toasts.shutdown();
        }
      })();
      class plugin extends Plugin {
        constructor() {
          super();

          this.getSettingsPanel = () => {
            return this.buildSettingsPanel().getElement();
          };

          try {
            // QWERTLib.Toasts.create(["Successfully started ", React.createElement("strong", null, "In App Notifications"), "!"], {
            //     author: "QWERT Library",
            //     color: colors.online,
            //     icon: React.createElement(WebpackModules.findByDisplayName("Checkmark"), {
            //         style: {
            //             color: colors.online
            //         }
            //     }),
            //     time: 6000,
            //     onClick: () => {
            //         InviteActions.acceptInviteAndTransitionToInviteChannel("zMnHFAKsu3");
            //     }
            // })
          } catch (e) {
            console.log(
              `%c[InAppNotifications]%c Error!%c`,
              "color: #3a71c1;",
              "font-weight: 700; color: #b3001b;",
              "\n",
              e
            );
            BdApi.alert(
              "InAppNotifications",
              "There was an error while trying to start the plugin.\n Try checking the console for any errors from this plugin.\nFor any further support, join my support server (https://discord.gg/zJbXFXNAhJ)"
            );
          }

          const om = this.onMessage.bind(this);
          this.onMessage = (e) => {
            try {
              om(e);
            } catch (e) {
              console.log(
                `%c[InAppNotifications]%c Error!%c`,
                "color: #3a71c1;",
                "font-weight: 700; color: #b3001b;",
                "\n",
                e
              );
              try {
                QWERTLib.Toasts.create(
                  "There was an error while trying to start the plugin.\n Try checking the console for any errors from this plugin.\nFor any further support, click here to join my support server.",
                  {
                    author: "In App Notifications",
                    color: colors.dnd,
                    icon: React.createElement(CloseIcon, {
                      style: {
                        color: colors.dnd,
                      },
                    }),
                    time: 7000,
                    onClick: () => {
                      InviteActions.acceptInviteAndTransitionToInviteChannel(
                        "zMnHFAKsu3"
                      );
                    },
                  }
                );
              } catch {
                BdApi.alert(
                  "InAppNotifications",
                  "There was an error while trying to start the plugin.\n Try checking the console for any errors from this plugin.\nFor any further support, join my support server (https://discord.gg/zJbXFXNAhJ)"
                );
              }
            }
          };
          const friendRequestFunc = this.friendRequest.bind(this);
          this.friendRequest = (e) => {
            try {
              friendRequestFunc(e);
            } catch (e) {
              console.log(
                `%c[InAppNotifications]%c Error!%c`,
                "color: #3a71c1;",
                "font-weight: 700; color: #b3001b;",
                "\n",
                e
              );
              try {
                QWERTLib.Toasts.create(
                  "There was an error while trying to start the plugin.\n Try checking the console for any errors from this plugin.\nFor any further support, click here to join my support server.",
                  {
                    author: "In App Notifications",
                    icon: React.createElement(CloseIcon, {
                      style: {
                        color: colors.dnd,
                      },
                    }),
                    time: 7000,
                    onClick: () => {
                      InviteActions.acceptInviteAndTransitionToInviteChannel(
                        "zMnHFAKsu3"
                      );
                    },
                  }
                );
              } catch {
                BdApi.alert(
                  "InAppNotifications",
                  "There was an error while trying to start the plugin.\n Try checking the console for any errors from this plugin.\nFor any further support, join my support server (https://discord.gg/zJbXFXNAhJ)"
                );
              }
            }
          };
        }

        onStart() {
          Dispatcher.subscribe("MESSAGE_CREATE", this.onMessage);
          Dispatcher.subscribe("FRIEND_REQUEST_ACCEPTED", this.friendRequest);
          QWERTLib.initialize();
          PluginUtilities.addStyle(
            "QWERTLib",
            `
            .qwert-toasts {
                position: absolute;
                right: 10px;
                left: ${
                  [0, 1].includes(this.settings.position) ? "20px" : "10px"
                };
                right: 10px;
                ${
                  [0, 1].includes(this.settings.position)
                    ? "top: 10px"
                    : "bottom: 30px;"
                }
                justify-content: flex-start;
                align-items: ${
                  [0, 2].includes(this.settings.position)
                    ? "flex-end"
                    : "flex-start"
                };
                display: flex;
                flex-direction: column;
                pointer-events: none;
                z-index: 9999;
               }
               .qwert-toast {
                position: relative;
                display: -webkit-inline-box;
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
               .qwert-toast:hover .qwert-toast-image {
                display: block;
               }
               .qwert-toast-image {  
                position: relative;
                display: none;
                pointer-events: all;
                min-height: 24px;
                max-width: 50vw;
                margin-top: 2px;
                max-width: 300px;
                max-height: 300px;
               }
               
               .qwert-toast-text {
                position: relative;
                display: block;
                max-width: 400px;
                flex: 1 0 auto;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;     
               }
               .qwert-toast:hover .qwert-toast-text {
                white-space: normal;
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
               .qwert-toast-avatar {
                height: 32px;
                height: 32px;
                border-radius: 50%;
               }
               .qwert-toast-avatar-container {
                padding-right: 5px;
                margin-top: 1px;
                top: 10px;
               }
               .qwert-toast-icon {
                height: 22px;
                height: 22px;
                border-radius: 50%;
                  }
      
               .qwert-toast-icon-container {
                padding-right: 5px;
                margin-top: 1px;
                top: 10px;
               }
               .qwert-toast-close {
                margin-left: 5px;
                cursor: pointer;
               }
            }`
          );
        }


        onMessage({ message }) {
          const author = UserStore.getUser(message.author.id);
		  const channel = ChannelStore.getChannel(message.channel_id);
          const images = message.attachments.filter(
            (e) =>
              typeof e?.content_type === "string" &&
              e?.content_type.startsWith("image")
          );
          const notiTime = this.settings.notiTime;
          if (!channel || channel.id === SelectedChannelStore.getChannelId())
            return false;

          let content;
          const keywordFound = this.checkKeywords(message);
          if (!this.supposedToNotify(message, channel) && !keywordFound) return;
          let authorString = "";
          if (channel.guild_id) {
            const guild = GuildStore.getGuild(channel.guild_id);
            const colorString = GuildMemberStore.getMember(
              channel.guild_id,
              author.id
            )?.colorString;
            if (this.settings.roleColor && colorString) {
              authorString = [
                React.createElement(
                  "div",
                  {
                    style: {
                      color: colorString ?? "white",
                      display: "inline",
                    },
                  },
                  author.tag
                ),
                ` (${guild.name}, #${channel.name})`,
              ];
            } else {
              authorString = `${author.tag} (${guild.name}, #${channel.name})`;
            }
          }
          if (channel.type === ChannelTypes["GROUP_DM"]) {
            authorString = `${author.tag} (${channel.name})`;
			if (!channel.name || channel.name === " " || channel.name === "") {
              authorString = `${author.tag} (${channel.rawRecipients.map((e) => e.username).join(", ")})`;
            }
          }
          if (channel.type === ChannelTypes["DM"]) {
            authorString = `${author.tag}`;
          }

          if (message.call) {
            content = [
              React.createElement(CallJoin, {
                style: {
                  height: "16px",
                  width: "16px",
                  color: colors.online,
                  marginRight: "2px",
                },
              }),
              "Started a call",
            ];
          }

          if (message.attachments.length !== 0) {
            content = [
              React.createElement(ImagePlaceholder, {
                style: { height: "16px", width: "16px", marginRight: "2px" },
              }),
              Markdown.parse(message.content, "div", { channelId: channel.id }),
            ];

            if (message.content === "") {
              content = [
                React.createElement(ImagePlaceholder, {
                  style: { height: "16px", width: "16px", marginRight: "2px" },
                }),
                "Attachment",
              ];
            }
          }

          if (message.embeds.length !== 0) {
            content = [
              React.createElement(ImagePlaceholder, {
                style: { height: "16px", width: "16px", marginRight: "2px" },
              }),
              Markdown.parse(message.content, "div", { channelId: channel.id }),
            ];

            if (message.content === "") {
              content = [
                React.createElement(ImagePlaceholder, {
                  style: { height: "16px", width: "16px", marginRight: "2px" },
                }),
                message.embeds[0].description !== ""
                  ? message.embeds[0].description
                  : "Embed",
              ];
            }
          }

          if (message.stickers) {
            content = [
              React.createElement(StickerIcon, {
                style: { height: "16px", width: "16px", marginRight: "2px" },
              }),
              Markdown.parse(message.content, "div", { channelId: channel.id }),
            ];

            if (message.content === "") {
              content = [
                React.createElement(StickerIcon, {
                  style: { height: "16px", width: "16px", marginRight: "2px" },
                }),
                "Sticker",
              ];
            }
          }

          if (images[0]) {
            content.push(
              React.createElement("img", {
                className: "qwert-toast-image",
                src: images[0].url,
                style: {
                  maxWidth: "300px",
                  maxHeight: "300px",
                },
              })
            );
          }

          if (!this.checkSettings(message, channel)) return;
          const children = content
            ? content
            : Markdown.parse(message.content, "div", { channelId: channel.id });
          const time = isNaN(notiTime * 1000) ? 3000 : notiTime * 1000;
          QWERTLib.Toasts.create(children, {
            icon: React.createElement("div", {
              className: "qwert-toast-avatar-container",
              children: React.createElement("img", {
                src: author.getAvatarURL(),
                className: "qwert-toast-avatar",
              }),
            }),
            author: authorString,
            time,
            onClick: () => {
              NavigationUtils.replaceWith(
                `/channels/${message.guild_id || "@me"}/${message.channel_id}/${
                  message.id
                }`
              );
            },
            onManualClose: () => {
              if (!this.settings.markAsRead || AckUtils == null) return;
              AckUtils.ack(message.channel_id);
            },
          });
        }

        escapeRegex(string) {
          return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
        }

        checkKeywords(message) {
          let found = false;
          const { content } = message;
          const keywords = this.settings.keywords.trim().split(",").map((e) => e.trim()).filter((e) => e !== "");
          if (keywords.length === 0) return false;

          for (let keyword of keywords) {
            keyword = this.escapeRegex(keyword);
            const keywordRegex = new RegExp(`\\b${keyword}\\b`, "g");
            if (
              keywordRegex.test(
                this.settings.case ? content : content.toLowerCase()
              )
            ) {
              found = true;
              break;
            }
          }
          return found;
        }

        supposedToNotify(message, channel) {
          if (message.author.id === UserStore.getCurrentUser().id) return false;
          if (channel.type === ChannelTypes["PUBLIC_THREAD"] && !channel.member) return false;
          const suppressEveryone = MuteStore.isSuppressEveryoneEnabled(
            message.guild_id || "@me"
          );
          const suppressRoles = MuteStore.isSuppressRolesEnabled(
            message.guild_id || "@me"
          );
          if (MuteStore.allowAllMessages(channel)) return true;
          return isMentioned.isRawMessageMentioned(
            {
              rawMessage: message,
              userId: UserStore.getCurrentUser().id,
              suppressEveryone,
              suppressRoles
            }
          );
        }

        checkSettings(message, channel) {
          let shouldNotify = true;
          const ignoredUsers = this.settings.ignoredUsers.trim().split(",");
          const ignoredServers = this.settings.ignoredServers.trim().split(",");
          const ignoredChannels = this.settings.ignoredChannels
            .trim()
            .split(",");
          const ignoreDMs = this.settings.ignoreDMs;
          const ignoreDMGroups = this.settings.ignoreDMGroups;

          const disableOnDnd = this.settings.disableOnDnd;
          const isDnd =
            UserStatusStore.getStatus(UserStore.getCurrentUser().id) === "dnd";
          const disableIfNoFocus = this.settings.disableIfNoFocus;
          const hasFocus = document.hasFocus();

          if (disableOnDnd) {
            shouldNotify = !isDnd;
          }

          if (disableIfNoFocus) {
            if (!hasFocus) shouldNotify = false;
          }

          if (ignoreDMs) {
            if (channel.type === ChannelTypes["DM"]) shouldNotify = false;
          }

          if (ignoreDMGroups) {
            if (channel.type === ChannelTypes["GROUP_DM"]) shouldNotify = false;
          }

          if (ignoredUsers.includes(message.author.id)) shouldNotify = false;
          if (ignoredServers.includes(channel.guild_id)) shouldNotify = false;
          if (ignoredChannels.includes(channel.id)) shouldNotify = false;

          return shouldNotify;
        }

        friendRequest({ user }) {
          if (!this.settings.relationshipsNotis) return;
          user = UserStore.getUser(user.id);
          QWERTLib.Toasts.create(
            [
              React.createElement(PersonAdd, {
                style: {
                  height: "16px",
                  width: "16px",
                  color: colors.online,
                  marginRight: "2px",
                },
              }),
              "Accepted your friend request.",
            ],
            {
              author: user.tag,
              avatar: user.getAvatarURL(),
              onClick: () => {
                UserProfileModals.open(user.id);
              },
            }
          );
        }

        onStop() {
          Dispatcher.unsubscribe("MESSAGE_CREATE", this.onMessage);
          Dispatcher.unsubscribe("FRIEND_REQUEST_ACCEPTED", this.friendRequest);
          PluginUtilities.removeStyle("QWERTLib");
          QWERTLib.shutdown();
          Patcher.unpatchAll();
        }
      }

      return plugin;
    })(global.ZeresPluginLibrary.buildPlugin(config));
