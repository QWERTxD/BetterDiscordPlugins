const {
	React,
	ReactDOM,
	Patcher,
	findModule: get,
	findModuleByProps: getByProps,
	findModuleByDisplayName: getByName,
	getData,
	setData
} = BdApi;

const Slider = getByName("Slider");
const FormItem = getByName("FormItem");

export default class Plugin {
	start() {
		console.log("%cUser Volume Booster", "background: #61DBFB; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Successfully started.")
		this.patch();
	}

	stop() {
		Patcher.unpatchAll("slider");
		console.log("%cUser Volume Booster", "background: #61DBFB; color: black; padding: 2px; border-radius: 4px; font-weight: bold;", "Stopped.")
	}

	patch() {
		Patcher.after("slider", Slider.prototype, 'render', (_this, [props], ret) => {
			if(_this?.props?.className !== "slider-BEB8u7") return;
			_this.props.maxValue = 200 * this.getMultiplier();
			_this.state.range = 200 * this.getMultiplier();
			_this.state.max = 200 * this.getMultiplier();
			_this.state.value = _this.state.initialValueProp;
		})
	}

	getMultiplier() {
		return getData("UserVolumeBooster", "multiplier") ?? 2;
	}

	getSettingsPanel() {
		return <FormItem title="Volume Multiplier">
			<Slider initialValue={this.getMultiplier()} max={5} min={1} markers={[1,2,3,4,5]} stickToMarkers={true} onValueChange={(value) => {
				setData("UserVolumeBooster", "multiplier", value)
			}}></Slider>
		</FormItem>
	}
}
