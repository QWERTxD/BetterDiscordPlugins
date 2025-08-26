/**
 * @name CallTimeCounter
 * @author tigertaev
 * @authorLink https://discord.com/users/1333264984817401944
 * @version 1.0.1
 * @description Call duration timer replacing the voice channel & server name in Discord’s voice panel.
 * @donate BTC: 1Kyf8uLgGrco8FdVuYpqi5CqVaVNxvnfDJ
 * @patreon USDT TRC20: TV5jZrPGJJcxrdS7wWpmNJZzqihZ6HBqQZ
 * @website If you want to support me, please feel free to DM me on Discord: tigertaev
 * @updateUrl https://raw.githubusercontent.com/TigerTaeV/BetterDiscordPlugins/refs/heads/main/CallTimer/CallTimeCounter.plugin.js
 */
"use strict";

const { Webpack, UI, Data } = BdApi;

module.exports = class CallTimeCounter {
  constructor() {
    this.meta = {
      name: "CallTimeCounter",
      version: "1.0.1",
      author: "tigertaev",
      authorLink: "https://discord.com/users/1333264984817401944",
      description: "Call duration timer replacing the voice channel & server name in Discord’s voice panel."
    };
    this._timerId = null;
    this._observer = null;
    this._startTime = null;
    this._lastConnected = false;
    this._originalText = null;
    this._voiceDetailsNode = null;
    this._UserStore = null;
    this._RTCConnectionStore = null;
    this._VoiceStateStore = null;
  }

  start() {
    this._initModules();
    // Guard for missing modules
    if (!this._UserStore || !this._RTCConnectionStore || !this._VoiceStateStore) {
      BdApi.showToast("CallTimeCounter: Required modules not found. Plugin may be broken after a Discord update.", { type: "error" });
      return;
    }
    this._showWelcome();
    this._beginLoops();
  }

  stop() {
    this._teardownLoops();
    this._restoreOriginal();
  }

  _initModules() {
    const byProps = (...props) => Webpack.getModule(m => props.every(p => m?.[p] !== undefined));
    this._UserStore = byProps("getCurrentUser");
    this._RTCConnectionStore = Webpack.getModule(m => typeof m?.isConnected === "function" && typeof m?.getChannelId === "function");
    this._VoiceStateStore = Webpack.getModule(m => typeof m?.getAllVoiceStates === "function" || typeof m?.getVoiceState === "function" || typeof m?.getVoiceStatesForChannel === "function");
  }

  _findVoiceDetailsNode() {
    if (this._voiceDetailsNode && document.contains(this._voiceDetailsNode)) {
      return this._voiceDetailsNode;
    }
    const parent = document.querySelector('[class*="rtcConnectionStatus"], [class*="voiceUserInfo"]');
    if (!parent) return null;
    this._voiceDetailsNode = parent.querySelector('[class*="subtext"]') || parent.querySelector('[class*="channelName"]') || parent;
    return this._voiceDetailsNode;
  }

  _beginLoops() {
    let lastFrameTime = performance.now();
    const loop = (time) => {
      const delta = time - lastFrameTime;
      if (delta >= 1000) {
        lastFrameTime = time - (delta % 1000);
        this._tick();
      }
      this._timerId = requestAnimationFrame(loop);
    };
    this._timerId = requestAnimationFrame(loop);
    const panel = document.querySelector('[class*="rtcConnectionStatus"], [class*="voiceUserInfo"]');
    if (panel) {
      this._observer = new MutationObserver(() => {
        this._voiceDetailsNode = null; // Invalidate cache when DOM mutates
        this._render();
      });
      this._observer.observe(panel, { childList: true, subtree: true });
    }
    this._tick();
  }

  _teardownLoops() {
    if (this._timerId) cancelAnimationFrame(this._timerId);
    if (this._observer) this._observer.disconnect();
    this._timerId = null;
    this._observer = null;
    this._startTime = null;
    this._lastConnected = false;
    this._voiceDetailsNode = null;
  }

  _getSelfId() {
    return this._UserStore?.getCurrentUser?.()?.id ?? null;
  }

  _getConnectedChannelId() {
    if (this._RTCConnectionStore?.isConnected?.()) {
      return this._RTCConnectionStore.getChannelId?.() ?? null;
    }
    const uid = this._getSelfId();
    if (!uid || !this._VoiceStateStore) return null;
    if (typeof this._VoiceStateStore.getAllVoiceStates === "function") {
      const all = this._VoiceStateStore.getAllVoiceStates();
      for (const [, users] of Object.entries(all)) {
        const vs = users instanceof Map ? users.get(uid) : users[uid];
        if (vs?.channelId) return vs.channelId;
      }
    }
    if (typeof this._VoiceStateStore.getVoiceState === "function") {
      return this._VoiceStateStore.getVoiceState(uid)?.channelId ?? null;
    }
    return null;
  }

  _tick() {
    const connected = Boolean(this._getConnectedChannelId());
    if (connected && !this._lastConnected) {
      this._startTime = Date.now();
      if (this._originalText === null) {
        const node = this._findVoiceDetailsNode();
        if (node) this._originalText = node.textContent;
      }
    }
    if (!connected && this._lastConnected) {
      this._restoreOriginal();
      this._startTime = null;
    }
    this._lastConnected = connected;
    this._render();
  }

  _format(ms) {
    const secTotal = Math.floor(ms / 1000);
    const hours = Math.floor(secTotal / 3600);
    const mins = Math.floor((secTotal % 3600) / 60);
    const secs = secTotal % 60;
    const pad = n => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
  }

  _render() {
    const node = this._findVoiceDetailsNode();
    if (!node) return;
    if (this._lastConnected) {
      if (!this._startTime) this._startTime = Date.now();
      node.textContent = this._format(Date.now() - this._startTime);
      Object.assign(node.style, {
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.3px",
        fontWeight: "600"
      });
    } else {
      this._restoreOriginal();
    }
  }

  _restoreOriginal() {
    const node = this._findVoiceDetailsNode();
    if (node && this._originalText !== null && node.textContent !== this._originalText) {
      node.textContent = this._originalText;
      Object.assign(node.style, {
        fontVariantNumeric: "",
        letterSpacing: "",
        fontWeight: ""
      });
    }
    this._originalText = null;
  }

  _showWelcome() {
    const savedVersion = Data.load("CallTimeCounter", "version");
    if (savedVersion === this.meta.version) return; // Skip if version hasn't changed

    UI.showConfirmationModal(
      "🎉 Welcome to CallTimeCounter!",
      BdApi.React.createElement("div", {
        style: {
          lineHeight: "1.6",
          color: "#ffffff",
          fontSize: "16px",
          padding: "10px",
          backgroundColor: "#2f3136",
          borderRadius: "8px"
        }
      }, [
        BdApi.React.createElement("h2", {
          style: {
            margin: "0 0 12px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: "#4CAF50"
          }
        }, "CallTimeCounter v" + this.meta.version),
        BdApi.React.createElement("p", {
          style: { marginBottom: "12px" }
        }, "Thank you for installing CallTimeCounter! This plugin displays a live HH:MM:SS timer in the Discord voice panel, replacing the voice channel and server name during calls."),
        BdApi.React.createElement("h4", {
          style: {
            margin: "16px 0 8px 0",
            fontSize: "18px",
            color: "#ffffff"
          }
        }, "What's New"),
        BdApi.React.createElement("ul", {
          style: {
            paddingLeft: "20px",
            listStyle: "disc",
            marginBottom: "16px"
          }
        }, [
          BdApi.React.createElement("li", {
            style: { color: "#4CAF50", fontWeight: "500" }
          }, "Added: Real-time call duration display with improved accuracy"),
          BdApi.React.createElement("li", {
            style: { color: "#FF9800", fontWeight: "500" }
          }, "Fixed: Restored original UI after call disconnect"),
          BdApi.React.createElement("li", {
            style: { color: "#4CAF50", fontWeight: "500" }
          }, "Improved: Welcome message now only shows on first install or update")
        ]),
        BdApi.React.createElement("h4", {
          style: {
            margin: "16px 0 8px 0",
            fontSize: "18px",
            color: "#ffffff"
          }
        }, "Support the Developer"),
        BdApi.React.createElement("p", {
          style: {
            fontSize: "14px",
            opacity: "0.9",
            lineHeight: "1.4"
          }
        }, [
          "If you enjoy this plugin, consider supporting me via ",
          BdApi.React.createElement("a", {
            href: "https://discord.com/users/1333264984817401944",
            style: { color: "#5865F2", textDecoration: "none", fontWeight: "500" },
            onClick: () => BdApi.openLink("https://discord.com/users/1333264984817401944")
          }, "Discord DM"),
          " or through donations:"
        ]),
        BdApi.React.createElement("p", {
          style: {
            fontSize: "14px",
            opacity: "0.9",
            marginTop: "8px",
            fontFamily: "monospace"
          }
        }, [
          "BTC: 1Kyf8uLgGrco8FdVuYpqi5CqVaVNxvnfDJ",
          BdApi.React.createElement("br"),
          "USDT (TRC20): TV5jZrPGJJcxrdS7wWpmNJZzqihZ6HBqQZ"
        ])
      ]),
      {
        confirmText: "Got it!",
        cancelText: "Close",
        onConfirm: () => {
          Data.save("CallTimeCounter", "version", this.meta.version);
        }
      }
    );
  }

  getName() {
    return this.meta.name;
  }

  getDescription() {
    return this.meta.description;
  }

  getVersion() {
    return this.meta.version;
  }

  getAuthor() {
    return this.meta.author;
  }

  getAuthorLink() {
    return this.meta.authorLink;
  }
};
