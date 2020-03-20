import { groupBy } from "./utils";

export type KeyMap = {
	add_split: Function;
	undo_split: Function;
	skip_split: Function;
	reset_splits: Function;
	pause: Function;
	show_help: Function;
	toggle_blood_moon: Function;
};

export let callbacks: KeyMap = {
	add_split: () => console.log("add_split"),
	undo_split: () => console.log("undo_split"),
	skip_split: () => console.log("skip_split"),
	reset_splits: () => console.log("reset_splits"),
	pause: () => console.log("pause"),
	show_help: () => console.log("show_help"),
	toggle_blood_moon: () => console.log("toggle_blood_moon"),
};

export const register_callbacks = (map: KeyMap) => {
	callbacks = map;
};

type Hotkey = { [key: string]: Function };

const teetow_profile: Hotkey = {
	Space: () => callbacks.add_split(),
	Backspace: () => callbacks.undo_split(),
	Period: () => callbacks.skip_split(),
	KeyR: () => callbacks.reset_splits(),
	KeyP: () => callbacks.pause(),
	KeyH: () => callbacks.show_help(),
	KeyB: () => callbacks.toggle_blood_moon(),
};

const livesplit_profile: Hotkey = {
	Numpad1: () => callbacks.add_split(),
	Numpad8: () => callbacks.undo_split(),
	Numpad2: () => callbacks.skip_split(),
	Numpad3: () => callbacks.reset_splits(),
	Numpad5: () => callbacks.pause()
};

const specs_profile: Hotkey = {
	NumpadAdd: () => callbacks.add_split(),
	NumpadSubtract: () => callbacks.undo_split(),
	NumpadDivide: () => callbacks.skip_split(),
	KeyQ: () => callbacks.reset_splits(),
	NumpadMultiply: () => callbacks.pause()
};

const dj_profile: Hotkey = {
	F1: () => callbacks.add_split(),
	F4: () => callbacks.undo_split(),
	F5: () => callbacks.skip_split(),
	F3: () => callbacks.reset_splits(),
	F6: () => callbacks.pause()
};

const keyboard_profile: Hotkey = {
	...teetow_profile,
	...livesplit_profile,
	...specs_profile,
	...dj_profile
};

export const getProfile = () => keyboard_profile;

export const parse_keypress = (code: string): Function => {
	return keyboard_profile[code];
};

type HotkeyDescription = {
	[key: string]: string;
};
const hotkey_descriptions: HotkeyDescription = {
	add_split: "Start the run / add a split",
	undo_split: "Undo last split",
	skip_split: "Skip a split",
	reset_splits: "Reset the run",
	pause: "Pause the timer",
	show_help: "Show / hide help",
	toggle_blood_moon: "Toggle the Blood Moon"
};

const re_fn_name = /\(\) => callbacks\.(.+?)\(\)/;

const getHotkeyDescription = (fn: Function) => {
	const matches = re_fn_name.exec(fn.toString());
	if (matches && matches.length > 0) {
		const hotkeyfunc = matches[1];
		if (hotkeyfunc in hotkey_descriptions)
			return hotkey_descriptions[hotkeyfunc];
	}
};

const re_shortkeynames = /Key(.+)/;
const re_shortnumpadnames = /Numpad(.+)/;
const stringsubst: Record<string, string> = {
	Add: "+",
	Subtract: "-",
	Divide: "/",
	Multiply: "*",
	Period: "."
};

export const getShortKeyname = (keyname: string) => {
	let outstr = keyname;

	Object.entries(stringsubst).forEach((value: Array<string>) => {
		const [search, replace] = value;
		outstr = outstr.replace(search, replace as string);
	});

	const alphanum_matches = re_shortkeynames.exec(outstr);
	if (alphanum_matches && alphanum_matches.length > 0) {
		return alphanum_matches[1];
	}

	const numpad_matches = re_shortnumpadnames.exec(outstr);
	if (numpad_matches && numpad_matches.length > 0) {
		let outstr = numpad_matches[1];
		return `Num ${outstr}`;
	}

	return outstr;
};

export const getKeyMap = () => {
	const keys = getProfile();
	const grouped = groupBy(Object.entries(keys), (value: [string, Function]) => {
		const fn = value[1];
		return getHotkeyDescription(fn);
	});
	return grouped;
};
