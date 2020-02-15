export type KeyMap = {
	add_split: Function,
	undo_split: Function,
	skip_split: Function,
	reset_splits: Function,
	pause: Function,
}

let callbacks: KeyMap = {
	add_split: () => console.log("add_split"),
	undo_split: () => console.log("undo_split"),
	skip_split: () => console.log("skip_split"),
	reset_splits: () => console.log("reset_splits"),
	pause: () => console.log("pause"),
}

export const register_callbacks = (map: KeyMap) => {
	callbacks = map;
}

const teetow_profile: any = {
	"Space": () => callbacks.add_split(),
	"Backspace": () => callbacks.undo_split(),
	"Period": () => callbacks.skip_split(),
	"KeyR": () => callbacks.reset_splits(),
	"KeyP": () => callbacks.pause(),
}

const livesplit_profile: any = {
	"Numpad1": () => callbacks.add_split(),
	"Numpad8": () => callbacks.undo_split(),
	"Numpad2": () => callbacks.skip_split(),
	"Numpad3": () => callbacks.reset_splits(),
	"Numpad5": () => callbacks.pause(),
}

const specs_profile: any = {
	"NumpadAdd": () => callbacks.add_split(),
	"NumpadSubtract": () => callbacks.undo_split(),
	"NumpadDivide": () => callbacks.skip_split(),
	"KeyQ": () => callbacks.reset_splits(),
	"NumpadMultiply": () => callbacks.pause(),
}

const dj_profile: any = {
	"F1": () => callbacks.add_split(),
	"F4": () => callbacks.undo_split(),
	"F5": () => callbacks.skip_split(),
	"F3": () => callbacks.reset_splits(),
	"F6": () => callbacks.pause(),
}

const keyboard_profile = {
	...teetow_profile,
	...livesplit_profile,
	...specs_profile,
	...dj_profile,
}

export const parse_keypress = (code: string): Function => {
	return keyboard_profile[code];
}