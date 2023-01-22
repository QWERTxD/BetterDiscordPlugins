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
                'The Plugin works again.'
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
    const { DiscordModules, PluginUtilities, Popouts } = Library;
    const { UserStore, RelationshipStore, UserStatusStore, UserTypingStore, SelectedChannelStore } = DiscordModules;
    // const Avatar = WebpackModules.getByProps('AnimatedAvatar');
    const avatarSize = 20; // Avatar.Sizes.SIZE_16

    class plugin extends Plugin {
        constructor() {
            super();
            this.element = null;
            this.getSettingsPanel = () => {
                return this.buildSettingsPanel().getElement();
            };
        }


        onStart() {
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

                .user-overflow-count {
                    height: ${avatarSize}px;
                    border-radius: ${avatarSize/2}px;
                    font-size: 12px;
                    background-color: var(--channeltextarea-background);
                    padding: 0 7px 0 7px;
                    display: flex;
                }

                .user-overflow-count > strong {
                    margin-top: -1px;                    
                }

                .typing-user {
                    width: ${avatarSize}px;
                    height: ${avatarSize}px;
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

        statusToColor(status) {
            switch (status) {
                case 'online':
                    return '#3ba55c';
                case 'idle':
                    return '#faa61a';
                case 'dnd':
                    return '#ed4245';
                case 'offline':
                    return '#747f8d';
                default:
                    return '#00000000';
            }
        }

        avatarElement(user, masked) {
            const status = this.settings.showStatus ? UserStatusStore.getStatus(user.id) : null;
            const statusColor = this.statusToColor(status);

            const avatarURL = user.getAvatarURL();
            const avatar = document.createElement('div');
            avatar.id = `typing-user-${user.id}`;
            avatar.className = 'typing-user mask-1FEkla';
            avatar.addEventListener('click', () => Popouts.showUserPopout(document.getElementById(`typing-user-${user.id}`), user));

            avatar.innerHTML = `<svg width="${avatarSize}" height="${avatarSize}" class="avatarContainerMasked-13fYnN" viewBox="0 0 ${avatarSize} ${avatarSize}">
                <foreignObject x="0" y="0" width="${avatarSize}" height="${avatarSize}" overflow="visible" ${
                    masked ? `mask="url(#svg-mask-voice-user-summary-item)` : ''
                }">
                    <img src="${avatarURL}" class="avatar-3TrM7c">
                </foreignObject>
                <rect width="7" height="7" x="12" y="12" fill="${statusColor}" mask="url(#svg-mask-status-online)"
                class="pointerEvents-9SZWKj"></rect>
            </svg>`;

            return avatar;
        }

        inject() {
            if (!this.element) return;

            this.element.querySelector('#typing-users-avatars')?.remove();
            let avatars = document.createElement('div');
            avatars.className = 'wrapper-1VLyxH avatarStack-3vfSFa';
            avatars.id = 'typing-users-avatars';

            const users = Object.keys(UserTypingStore.getTypingUsers(SelectedChannelStore.getChannelId()))
                .filter(user => user != UserStore.getCurrentUser().id && !RelationshipStore.isBlocked(user))
                .map((user) => UserStore.getUser(user));

            if (users.length == 0) return;

            const severalThreshold = 2;
            const severalUsers = users.length > severalThreshold;
            for (let i = 0; i < (severalUsers ? severalThreshold : users.length - 1); i++) {
                avatars.appendChild(this.avatarElement(users[i], true));
            }
            if (severalUsers) {
                const severalUsersElement = document.createElement('div');
                severalUsersElement.className = 'user-overflow-count';
                severalUsersElement.innerHTML = `<strong>+${users.length - severalThreshold}</strong>`;
                avatars.appendChild(severalUsersElement);
            } else {
                avatars.appendChild(this.avatarElement(users[users.length - 1], false));
            }

            this.element.children[0]?.children[1]?.prepend(avatars);
        }

        observer({addedNodes, removedNodes}) {
            const dotsClass = 'typing-2J1mQU';
            for(const node of addedNodes) {
                if (Node.TEXT_NODE == node.nodeType) continue;
                Array.from(node.getElementsByClassName(dotsClass)).forEach((element) => {
                    this.element = element;
                    this.inject();
                });
            }

            for(const node of removedNodes) {
                if (Node.TEXT_NODE == node.nodeType) continue;
                Array.from(node.getElementsByClassName(dotsClass)).forEach((element) => {
                    this.element = null;
                });
            }
        }
    }

    return plugin;
})(global.ZeresPluginLibrary.buildPlugin(config));
