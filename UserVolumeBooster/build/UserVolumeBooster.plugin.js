/**
 * @name UserVolumeBooster
 * @description Allows you to set a user's volume above the normal 200%
 * @version 1.0.0
 * @author QWERT
 */
(() => {
	"use strict";
	let __plugin_styles__ = "";
	let __style_element__ = null;
	var __webpack_exports__ = {};
	(() => {
		var exports = __webpack_exports__;
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		function _nullishCoalesce(lhs, rhsFn) {
			if (null != lhs) return lhs;
			else return rhsFn();
		}
		function _optionalChain(ops) {
			let lastAccessLHS;
			let value = ops[0];
			let i = 1;
			while (i < ops.length) {
				const op = ops[i];
				const fn = ops[i + 1];
				i += 2;
				if (("optionalAccess" === op || "optionalCall" === op) && null == value) return;
				if ("access" === op || "optionalAccess" === op) {
					lastAccessLHS = value;
					value = fn(value);
				} else if ("call" === op || "optionalCall" === op) {
					value = fn(((...args) => value.call(lastAccessLHS, ...args)));
					lastAccessLHS = void 0;
				}
			}
			return value;
		}
		const {
			React,
			Patcher,
			findModule: get,
			findModuleByProps: getByProps,
			findModuleByDisplayName: getByName,
			getData,
			setData
		} = BdApi;
		const Slider = getByName("Slider");
		const FormItem = getByName("FormItem");
		class Plugin {
			start() {
				console.log("%cUser Volume Booster", "background: #61DBFB; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Successfully started.");
				this.patch();
			}
			stop() {
				Patcher.unpatchAll("slider");
				console.log("%cUser Volume Booster", "background: #61DBFB; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Stopped.");
			}
			patch() {
				Patcher.after("slider", Slider.prototype, "render", ((_this, [props], ret) => {
					if ("slider-2zxowp" !== _optionalChain([_this, "optionalAccess", _ => _.props, "optionalAccess", _2 => _2.className])) return;
					_this.props.maxValue = 200 * this.getMultiplier();
					_this.state.range = 200 * this.getMultiplier();
					_this.state.max = 200 * this.getMultiplier();
					_this.state.value = _this.state.initialValueProp;
				}));
			}
			getMultiplier() {
				return _nullishCoalesce(getData("UserVolumeBooster", "multiplier"), (() => 2));
			}
			getSettingsPanel() {
				return React.createElement(FormItem, {
					title: "Volume Multiplier"
				}, React.createElement(Slider, {
					initialValue: this.getMultiplier(),
					max: 5,
					min: 1,
					markers: [1, 2, 3, 4, 5],
					stickToMarkers: true,
					onValueChange: value => {
						setData("UserVolumeBooster", "multiplier", value);
					}
				}));
			}
		}
		exports.default = Plugin;
	})();
	module.exports = __webpack_exports__.default ?? __webpack_exports__;
})();