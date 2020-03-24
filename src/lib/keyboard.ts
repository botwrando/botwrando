import { groupBy } from './utils';

export type Effect =
	| 'addSplit'
	| 'undoSplit'
	| 'skipSplit'
	| 'resetSplits'
	| 'pause'
	| 'toggleHelp'
	| 'toggleBloodMoon';

export type FunctionMap = {
	[key in Effect]: Function;
};

export type Binding = {
	desc: string;
	callback?: Function;
};

export type BindingMap = {
	[key: string]: Binding;
};

export let bindings: BindingMap = {
  addSplit: { desc: 'Start the run / add a split' },
  undoSplit: { desc: 'Undo last split' },
  skipSplit: { desc: 'Skip a split' },
  resetSplits: { desc: 'Reset the run' },
  pause: { desc: 'Pause the timer' },
  toggleHelp: { desc: 'Show / hide help' },
  toggleBloodMoon: { desc: 'Toggle Blood Moon shrine' }
};

export const registerCallbacks = (map: FunctionMap) => {
  Object.entries(map).forEach(value => {
    const [key, fn] = value;
    bindings[key].callback = fn;
  });
};

type Profile = { [key: string]: Effect };

const profileTeetow: Profile = {
  Space: 'addSplit',
  Backspace: 'undoSplit',
  Period: 'skipSplit',
  KeyR: 'resetSplits',
  KeyP: 'pause',
  KeyH: 'toggleHelp',
  KeyB: 'toggleBloodMoon'
};

const profileLivesplit: Profile = {
  Numpad1: 'addSplit',
  Numpad8: 'undoSplit',
  Numpad2: 'skipSplit',
  Numpad3: 'resetSplits',
  Numpad5: 'pause'
};

const profileSpecs: Profile = {
  NumpadAdd: 'addSplit',
  NumpadSubtract: 'undoSplit',
  NumpadDivide: 'skipSplit',
  KeyQ: 'resetSplits',
  NumpadMultiply: 'pause'
};

const profileDj: Profile = {
  F1: 'addSplit',
  F4: 'undoSplit',
  F5: 'skipSplit',
  F3: 'resetSplits',
  F6: 'pause'
};

const keyboardProfile: Profile = {
  ...profileTeetow,
  ...profileLivesplit,
  ...profileSpecs,
  ...profileDj
};

export const getProfile = () => keyboardProfile;

export const parseKeypress = (code: string): Function | undefined => {
  let effect = keyboardProfile[code];
  return bindings[effect]?.callback;
};

const re_shortkeynames = /Key(.+)/;
const re_shortnumpadnames = /Numpad(.+)/;
const stringsubst: any = {
  Add: '+',
  Subtract: '-',
  Divide: '/',
  Multiply: '*',
  Period: '.'
};

export const getShortKeyname = (keyname: string) => {
  let outstr = keyname;

  Object.entries(stringsubst).forEach(value => {
    const [search, replace] = value;
    outstr = outstr.replace(search, replace as string);
  });

  const alphanum_matches = re_shortkeynames.exec(outstr);
  if (alphanum_matches && alphanum_matches.length > 0) {
    return alphanum_matches[1];
  }

  const numpad_matches = re_shortnumpadnames.exec(outstr);
  if (numpad_matches && numpad_matches.length > 0) {
    let [,outstr] = numpad_matches;
    return `Num ${outstr}`;
  }

  return outstr;
};

export const getKeyMap = () => {
  const keys = getProfile();
  const grouped = groupBy(Object.entries(keys), (value: [string, Effect]) => {
    const [, effect] = value;
    return bindings[effect].desc;
  });
  return grouped;
};
