import { groupBy } from "./utils";

type Effect =
	| "add_split"
	| "undo_split"
	| "skip_split"
	| "reset_splits"
	| "pause"
	| "show_help"
	| "toggle_blood_moon";

export type FunctionMap = {
	[key in Effect]: Function;
};

export type Binding = {
	desc: string;
	callback?: Function;
};

type BindingMap = {
	[key: string]: Binding;
};

let bindings: BindingMap = {
	add_split: { desc: "Start the run / add a split" },
	undo_split: { desc: "Undo last split" },
	skip_split: { desc: "Skip a split" },
	reset_splits: { desc: "Reset the run" },
	pause: { desc: "Pause the timer" },
	show_help: { desc: "Show / hide help" },
	toggle_blood_moon: { desc: "Toggle Blood Moon shrine" }
};

let descriptions = {};

export const register_callbacks = (map: FunctionMap) => {
	Object.entries(map).map(value => {
		const [key, fn] = value;
		bindings[key].callback = fn;
	});
};

type Profile = { [key: string]: Effect };

const teetow_profile: Profile = {
	Space: "add_split",
	Backspace: "undo_split",
	Period: "skip_split",
	KeyR: "reset_splits",
	KeyP: "pause",
	KeyH: "show_help",
	KeyB: "toggle_blood_moon"
};

const livesplit_profile: Profile = {
	Numpad1: "add_split",
	Numpad8: "undo_split",
	Numpad2: "skip_split",
	Numpad3: "reset_splits",
	Numpad5: "pause"
};

const specs_profile: Profile = {
	NumpadAdd: "add_split",
	NumpadSubtract: "undo_split",
	NumpadDivide: "skip_split",
	KeyQ: "reset_splits",
	NumpadMultiply: "pause"
};

const dj_profile: Profile = {
	F1: "add_split",
	F4: "undo_split",
	F5: "skip_split",
	F3: "reset_splits",
	F6: "pause"
};

const keyboard_profile: Profile = {
	...teetow_profile,
	...livesplit_profile,
	...specs_profile,
	...dj_profile
};

export const getProfile = () => keyboard_profile;

export const parse_keypress = (code: string): Function | undefined => {
	let effect = keyboard_profile[code];
	return bindings[effect]?.callback;
};

const re_shortkeynames = /Key(.+)/;
const re_shortnumpadnames = /Numpad(.+)/;
const stringsubst: any = {
	Add: "+",
	Subtract: "-",
	Divide: "/",
	Multiply: "*",
	Period: "."
};

export const getShortKeyname = (keyname: string) => {
	let outstr = keyname;

	Object.entries(stringsubst).map(value => {
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
	const grouped = groupBy(Object.entries(keys), (value: [string, Effect]) => {
		const [key, effect] = value;
		return bindings[effect].desc;
	});
	return grouped;
};
