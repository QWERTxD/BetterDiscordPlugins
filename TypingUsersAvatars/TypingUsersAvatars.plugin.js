    /**
    * @name TypingUsersAvatars
    * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/TypingUsersAvatars/TypingUsersAvatars.plugin.js
    * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/TypingUsersAvatars/TypingUsersAvatars.plugin.js
    * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/TypingUsersAvatars
    * @version 1.0.3
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
             version: '1.0.3',
             description: 'Shows avatars of typing users.',
         },
         changelog: [
             {
                title: 'Fixed',
                type: 'fixed',
                items: [
                    'the crashing issue'
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
         const { DiscordModules, WebpackModules, PluginUtilities, Patcher, ReactComponents, Popouts, Utilities, DiscordSelectors } = Library;
         const { React, UserStore, RelationshipStore, UserStatusStore, Strings } = DiscordModules;
         const Avatar = WebpackModules.getByProps('AnimatedAvatar');
         const VoiceUserSummary = WebpackModules.findByDisplayName("VoiceUserSummaryItem")

         class AvatarComponent extends React.Component {
            render() {
                const {user, status} = this.props;
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
                 this.getSettingsPanel = () => {
                     return this.buildSettingsPanel().getElement();
                 };
             } 
     
             onStart() {
               Utilities.suppressErrors(this.patch.bind(this))();
    
               PluginUtilities.addStyle('TypingUsersAvatars', `
                .typing-2J1mQU > .text-3S7XCz {
                    margin: 0;
                }
                  
                .typing-2J1mQU .wrapper-1VLyxH {
                    display: flex;
                    margin: 0 4px;
                }
    
                .typing-2J1mQU > .text-3S7XCz,
                .typing-2J1mQU > .text-3S7XCz > strong {
                    display: contents;
                }

                .several-users {
                    margin-left: 5px;
                    margin-right: 5px;
                }

                .several-users > .avatarSize-1KpZ5E {
                    margin: 0;
                }
                `)
             }
     
             onStop() { 
               Patcher.unpatchAll();
               PluginUtilities.removeStyle('TypingUsersAvatars');
             }
    
             filter(users) {
                return Object.keys(users).filter((user) => {
                    return user != UserStore.getCurrentUser().id && !RelationshipStore.isBlocked(user);
                })
            }
    
            /* code highly inspired by https://github.com/rauenzi/BetterDiscordAddons/blob/master/Plugins/BetterRoleColors/BetterRoleColors.plugin.js */
             async patch() {
                 const TypingUsers = await ReactComponents.getComponentByName('TypingUsers', DiscordSelectors.Typing.typing);
                 Patcher.after(TypingUsers.component.prototype, 'render', (thisObject, [props], ret) => {
                    const typingUsers = this.filter({...thisObject.props.typingUsers});

                    for (let u = 0; u < typingUsers.length; u++) {
                        const user = UserStore.getUser(typingUsers[u]); 
                        const status = this.settings.showStatus ? UserStatusStore.getStatus(user.id) : null; 
                        if(ret.props.children[1].props.children !== Strings.SEVERAL_USERS_TYPING) {
                            ret.props.children[1].props.children[2* u].props.children.unshift(React.createElement("div", {
                                id: `typing-user-${user.id}`, 
                                children: React.createElement(AvatarComponent, {user, status})
                            }));
                        }else{
                            ret.props.children[1].props.children = [
                                React.createElement(VoiceUserSummary, {
                                    className: "several-users",
                                    users: typingUsers.map(UserStore.getUser),
                                    max: 3
                                }),
                                ret.props.children[1].props.children
                            ]
                            
                        }
                    }
                    
                     if(!ret) return;
                     const tree = ret.props.children;
                     if(!tree) return;
    
                     tree.map((child) => {
                         const children = child?.props?.children;
                         if(!children || typeof children !== 'object') return;
    
                         child.props.style = {
                             display: 'flex',
                             alignItems: 'center'
                         };
                     })
                 })
             }
     
         }
     
         return plugin;
     })(global.ZeresPluginLibrary.buildPlugin(config));
