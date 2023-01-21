/**
* @name TypingUsersAvatars
* @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/TypingUsersAvatars/TypingUsersAvatars.plugin.js
* @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/TypingUsersAvatars/TypingUsersAvatars.plugin.js
* @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/TypingUsersAvatars
* @version 1.0.6
* @description Shows avatars of typing users.
*/

const request = require('request');
const fs = require('fs');
const path = require('path');

const config = {
    info: {
        name: 'TypingUsersAvatars',
        authors: [
            {
                name: 'QWERT'
            }
        ],
        version: '1.0.6',
        description: 'Shows avatars of typing users.',
    },
    changelog: [
        {
            title: 'Fixed',
            type: 'fixed',
            items: [
                'The Plugin works again'
            ]
        }
    ],
    defaultConfig: [
        {
            type: 'switch',
            name: 'Show users status',
            id: 'showStatus',
            value: true
        }
    ]
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    load() {
        BdApi.showConfirmationModal('Library plugin is needed',
            `The library plugin needed for AQWERT'sPluginBuilder is missing. Please click Download Now to install it.`, {
            confirmText: 'Download',
            cancelText: 'Cancel',
            onConfirm: () => {
                request.get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', (error, response, body) => {
                    if (error)
                        return electron.shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js');

                    fs.writeFileSync(path.join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body);
                });
            }
        });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, PluginUtilities, Patcher, Popouts, Utilities, DiscordSelectors } = Library;
    const { React, UserStore, RelationshipStore, UserStatusStore, UserTypingStore, SelectedChannelStore } = DiscordModules;
    const Avatar = WebpackModules.getByProps('AnimatedAvatar');
    // const VoiceUserSummary = WebpackModules.findByDisplayName("VoiceUserSummaryItem")

    class AvatarComponent extends React.Component {
        render() {
            const { user, status } = this.props;
            return React.createElement(Avatar.default, {
                src: user.getAvatarURL(),
                status: status,
                size: Avatar.Sizes.SIZE_16,
                onClick() {
                    Popouts.showUserPopout(document.getElementById(`typing-user-${user.id}`), user)
                }
            })
        }
    }

    class plugin extends Plugin {
        constructor() {
            super();
            this.element = null;
            this.getSettingsPanel = () => {
                return this.buildSettingsPanel().getElement();
            };
        }

        onStart() {
            // Utilities.suppressErrors(this.patch.bind(this))();

            PluginUtilities.addStyle('TypingUsersAvatars', `
                .typing-2J1mQU .text-3S7XCz {
                    margin: 0;
                }
                
                .typing-2J1mQU .wrapper-1VLyxH {
                    display: flex;
                    margin: 0 4px;
                }
                
                .typing-2J1mQU .text-3S7XCz,
                .typing-2J1mQU .text-3S7XCz > strong {
                    display: contents;
                }
                
                .several-users {
                    margin-left: 5px;
                    margin-right: 5px;
                }
                
                .several-users .avatarSize-1KpZ5E {
                    margin: 0;
                }

                .typing-user {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-size: contain;
                    pointer-events: auto !important;
                }

                .typing-user:hover {
                    cursor: pointer;
                }
            `)

            UserTypingStore.addChangeListener(this.inject.bind(this));
        }

        onStop() {
            PluginUtilities.removeStyle('TypingUsersAvatars');
            UserTypingStore._changeCallbacks.listeners.clear()
        }

        inject() {
            if (!this.element) return;

            this.element.querySelector('#typing-users-avatars')?.remove();
            let avatars = document.createElement('div');
            avatars.className = 'wrapper-1VLyxH avatarStack-3vfSFa';
            avatars.id = 'typing-users-avatars';

            Object.keys(UserTypingStore.getTypingUsers(SelectedChannelStore.getChannelId()))
                .filter(user => user != UserStore.getCurrentUser().id && !RelationshipStore.isBlocked(user))
                .map((user) => UserStore.getUser(user))
                .forEach((user) => {
                    const status = this.settings.showStatus ? UserStatusStore.getStatus(user.id) : null;
                    const avatarURL = user.getAvatarURL();
                    
                    const avatar = document.createElement('div');
                    
                    avatar.id = `typing-user-${user.id}`;
                    avatar.className = 'typing-user mask-1FEkla';
                    avatar.style.backgroundImage = `url(${avatarURL})`;

                    //avatar.onclick = () => Popouts.showUserPopout(document.getElementById(`typing-user-${user.id}`), user);
                    avatar.addEventListener('click', () => Popouts.showUserPopout(document.getElementById(`typing-user-${user.id}`), user));
                    //avatar.addEventListener('click', (e) => console.log('click'));

                    avatars.appendChild(avatar);
                });

            this.element.children[1].prepend(avatars);
        }

        observer({addedNodes, removedNodes}) {
            for(const node of addedNodes) {
                if (Node.TEXT_NODE == node.nodeType) continue;
                Array.from(node.getElementsByClassName('typingDots-1Y8dki')).forEach((element) => {
                    this.element = element;
                    this.inject();
                });
            }

            for(const node of removedNodes) {
                if (Node.TEXT_NODE == node.nodeType) continue;
                Array.from(node.getElementsByClassName('typingDots-1Y8dki')).forEach((element) => {
                    this.element = null;
                });
            }
        }
    }

    return plugin;
})(global.ZeresPluginLibrary.buildPlugin(config));
