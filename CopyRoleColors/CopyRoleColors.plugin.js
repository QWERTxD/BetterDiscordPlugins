/**
 * @name CopyRoleColors
 * @source https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/CopyRoleColors/CopyRoleColors.plugin.js
 * @updateUrl https://raw.githubusercontent.com/QWERTxD/BetterDiscordPlugins/main/CopyRoleColors/CopyRoleColors.plugin.js
 * @website https://github.com/QWERTxD/BetterDiscordPlugins/tree/main/CopyRoleColors
 * @version 0.0.3
 */

const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
  info: {
    name: "CopyRoleColors",
    authors: [
      {
        name: "QWERT",
      },
    ],
    version: "0.0.3",
    description: "Adds option to copy role color in the role context menu.",
  },
  changelog: [
    {
      title: "Fixed",
      type: "fixed",
      items: ["Fixed a bug where the plugin would crash."],
    },
  ],
  defaultConfig: [],
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
<<<<<<< HEAD
              );
            },
          }
        );
      }

      start() {}

      stop() {}
    }
  : (([Plugin, Library]) => {
      const { DiscordModules, WebpackModules, Toasts, Patcher, ContextMenu } =
        Library;
      const { Strings, ElectronModule } = DiscordModules;
      const MemberRole = WebpackModules.getByProps("MemberRole").MemberRole;

      class plugin extends Plugin {
=======
            ],
            version: '0.0.2',
            description: 'Adds option to copy role color in the role context menu.',
        },
        changelog: [
            {
                title: 'Fixed',
                type: 'fixed',
                items: [
                    'maybe not crashy on contextmenu'
                    ]
            }
        ],
        defaultConfig: [  ]
    };
    
    module.exports = !global.ZeresPluginLibrary ? class {
>>>>>>> origin/development
        constructor() {
          super();
        }
<<<<<<< HEAD

        onStart() {
          this.patch();
=======
    
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
        const { DiscordModules, WebpackModules, Toasts, Patcher, DiscordContextMenu } = Library;
        const { ElectronModule } = DiscordModules;
        const MemberRole = WebpackModules.getByProps('MemberRole').MemberRole;
        class plugin extends Plugin {
            constructor() {
                super();
            }
            
            onStart() { 
                this.patch();    
            }
    
            onStop() { 
                Patcher.unpatchAll();
            }

            patch() {
                Patcher.after(MemberRole, 'render', (_, [props], ret) => {
                    const newContextMenu = DiscordContextMenu.buildMenu([
                        {
                            label: 'Copy Role Color',
                            action: _ => {
                                ElectronModule.copy(props.role.colorString || '#b9bbbe');
                                Toasts.success(`Successfully copied role color for <strong>${props.role.name}</strong>!`)
                            }
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: "Copy ID",
                            action: _ => {
                                ElectronModule.copy(props.role.id);
                            }
                        }
                    ]);

                    ret.props.children.props.onContextMenu = e => {
                        DiscordContextMenu.openContextMenu(e, newContextMenu)
                    }
                });
                }    
>>>>>>> origin/development
        }

        onStop() {
          Patcher.unpatchAll();
        }

        patch() {
          Patcher.after(MemberRole, "render", (_, [props], ret) => {
            console.log({ props, ret });
            const newContextMenu = ContextMenu.buildMenu([
              {
                label: "Copy Role Color",
                action: (_) => {
                  ElectronModule.copy(props.role.colorString || "#b9bbbe");
                  Toasts.success(
                    `Successfully copied role color for <strong>${props.role.name}</strong>!`
                  );
                },
              },
              {
                type: "separator",
              },
              {
                id: "copy-id",
                label: Strings.Messages.COPY_ID,
                action: (_) => {
                  ElectronModule.copy(props.role.id);
                },
              },
            ]);

            ret.props.children.props.onContextMenu = (e) => {
              ContextMenu.openContextMenu(e, newContextMenu);
            };
          });
        }
      }

      return plugin;
    })(global.ZeresPluginLibrary.buildPlugin(config));
