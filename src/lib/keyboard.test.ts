import {
  KeyMap,
  callbacks,
  register_callbacks,
  getProfile,
  parse_keypress,
  getShortKeyname,
  getKeyMap
} from "./keyboard";

describe('keyboard', () => {
  let customCallbacks: KeyMap;
  beforeEach(() => {
    const add_split_cb = jest.fn();
    const undo_split_cb = jest.fn();
    const skip_split_cb = jest.fn();
    const reset_splits_cb = jest.fn();
    const pause_cb = jest.fn();
    const show_help_cb = jest.fn();
    const toggle_blood_moon_cb = jest.fn();
    customCallbacks = {
      add_split: add_split_cb,
      undo_split: undo_split_cb,
      skip_split: skip_split_cb,
      reset_splits: reset_splits_cb,
      pause: pause_cb,
      show_help: show_help_cb,
      toggle_blood_moon: toggle_blood_moon_cb,
    };
  });

  describe('register_callbacks', () => {
    it('registers a custom add_split callback', () => {
      register_callbacks(customCallbacks);
      callbacks.add_split()
      expect(customCallbacks.add_split).toHaveBeenCalledTimes(1);
    });
    it('registers a custom undo_split callback', () => {
      register_callbacks(customCallbacks);
      callbacks.undo_split()
      expect(customCallbacks.undo_split).toHaveBeenCalledTimes(1);
    });
    it('registers a custom skip_split callback', () => {
      register_callbacks(customCallbacks);
      callbacks.skip_split()
      expect(customCallbacks.skip_split).toHaveBeenCalledTimes(1);
    });
    it('registers a custom reset_splits callback', () => {
      register_callbacks(customCallbacks);
      callbacks.reset_splits()
      expect(customCallbacks.reset_splits).toHaveBeenCalledTimes(1);
    });
    it('registers a custom pause callback', () => {
      register_callbacks(customCallbacks);
      callbacks.pause()
      expect(customCallbacks.pause).toHaveBeenCalledTimes(1);
    });
    it('registers a custom show_help callback', () => {
      register_callbacks(customCallbacks);
      callbacks.show_help()
      expect(customCallbacks.show_help).toHaveBeenCalledTimes(1);
    });
    it('registers a custom toggle_blood_moon callback', () => {
      register_callbacks(customCallbacks);
      callbacks.toggle_blood_moon()
      expect(customCallbacks.toggle_blood_moon).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('getProfile', () => {
    beforeEach(() => {
      register_callbacks(customCallbacks);
    });
    it("returns a keyboard profile containing teetow's settings", () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty("Space");
      keyboardProfile.Space();
      expect(customCallbacks.add_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("Backspace");
      keyboardProfile.Backspace();
      expect(customCallbacks.undo_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("Period");
      keyboardProfile.Period();
      expect(customCallbacks.skip_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("KeyR");
      keyboardProfile.KeyR();
      expect(customCallbacks.reset_splits).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("KeyP");
      keyboardProfile.KeyP();
      expect(customCallbacks.pause).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("KeyH");
      keyboardProfile.KeyH();
      expect(customCallbacks.show_help).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("KeyB");
      keyboardProfile.KeyB();
      expect(customCallbacks.toggle_blood_moon).toHaveBeenCalledTimes(1);
    });
    it("returns a keyboard profile containing livesplit settings", () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty("Numpad1");
      keyboardProfile.Numpad1();
      expect(customCallbacks.add_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("Numpad8");
      keyboardProfile.Numpad8();
      expect(customCallbacks.undo_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("Numpad2");
      keyboardProfile.Numpad2();
      expect(customCallbacks.skip_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("Numpad3");
      keyboardProfile.Numpad3();
      expect(customCallbacks.reset_splits).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("Numpad5");
      keyboardProfile.Numpad5();
      expect(customCallbacks.pause).toHaveBeenCalledTimes(1);
    });
    it("returns a keyboard profile containing specs' settings", () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty("NumpadAdd");
      keyboardProfile.NumpadAdd();
      expect(customCallbacks.add_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("NumpadSubtract");
      keyboardProfile.NumpadSubtract();
      expect(customCallbacks.undo_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("NumpadDivide");
      keyboardProfile.NumpadDivide();
      expect(customCallbacks.skip_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("KeyQ");
      keyboardProfile.KeyQ();
      expect(customCallbacks.reset_splits).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("NumpadMultiply");
      keyboardProfile.NumpadMultiply();
      expect(customCallbacks.pause).toHaveBeenCalledTimes(1);
    });
    it("returns a keyboard profile containing dj's settings", () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty("F1");
      keyboardProfile.F1();
      expect(customCallbacks.add_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("F4");
      keyboardProfile.F4();
      expect(customCallbacks.undo_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("F5");
      keyboardProfile.F5();
      expect(customCallbacks.skip_split).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("F3");
      keyboardProfile.F3();
      expect(customCallbacks.reset_splits).toHaveBeenCalledTimes(1);
      expect(keyboardProfile).toHaveProperty("F6");
      keyboardProfile.F6();
      expect(customCallbacks.pause).toHaveBeenCalledTimes(1);
    });
  });

  describe('parse_keypress', () => {
    beforeEach(() => {
      register_callbacks(customCallbacks);
    });
    it('returns the expected callback function', () => {
      const keyboardProfile = getProfile();
      const spaceCallback = parse_keypress("Space");
      expect(spaceCallback).toBe(keyboardProfile.Space);
      spaceCallback();
      expect(customCallbacks.add_split).toHaveBeenCalledTimes(1);
    });
  });

  describe('getShortKeyname', () => {
    it('returns names of the special keys', () => {
      let keyname = getShortKeyname("KeySpace");
      expect(keyname).toEqual("Space");
    });
    it('returns the number for numeric keys', () => {
      const keyname = getShortKeyname("Key9");
      expect(keyname).toEqual("9");
    });
    it('returns names of the alpha keys', () => {
      const keyname = getShortKeyname("KeyC");
      expect(keyname).toEqual("C");
    });
    it('returns "Num" plus the key symbol for numpad keys', () => {
      const keyname = getShortKeyname("NumAdd");
      expect(keyname).toEqual("Num+");
    });
    it('returns the argument otherwise', () => {
      const keyname = getShortKeyname("MySpecialKey");
      expect(keyname).toEqual("MySpecialKey");
    });
  });

  describe('getKeyMap', () => {
    beforeEach(() => {
      register_callbacks(customCallbacks);
    });
    it('provides all the add_split function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain("Start the run / add a split");
      const add_split_fns: Array<[string, Function]> = keyMap.get("Start the run / add a split");
      add_split_fns.forEach((entry: [string, Function]) => entry[1]());
      expect(customCallbacks.add_split).toHaveBeenCalledTimes(add_split_fns.length);
    });
    it('provides all the undo_split function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain("Undo last split");
      const undo_split_fns: Array<[string, Function]> = keyMap.get("Undo last split");
      undo_split_fns.forEach((entry: [string, Function]) => entry[1]());
      expect(customCallbacks.undo_split).toHaveBeenCalledTimes(undo_split_fns.length);
    });
    it('provides all the skip_split function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain("Skip a split");
      const skip_split_fns: Array<[string, Function]> = keyMap.get("Skip a split");
      skip_split_fns.forEach((entry: [string, Function]) => entry[1]());
      expect(customCallbacks.skip_split).toHaveBeenCalledTimes(skip_split_fns.length);
    });
    it('provides all the reset_splits function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain("Reset the run");
      const reset_splits_fns: Array<[string, Function]> = keyMap.get("Reset the run");
      reset_splits_fns.forEach((entry: [string, Function]) => entry[1]());
      expect(customCallbacks.reset_splits).toHaveBeenCalledTimes(reset_splits_fns.length);
    });
    it('provides all the pause function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain("Pause the timer");
      const pause_fns: Array<[string, Function]> = keyMap.get("Pause the timer");
      pause_fns.forEach((entry: [string, Function]) => entry[1]());
      expect(customCallbacks.pause).toHaveBeenCalledTimes(pause_fns.length);
    });
    it('provides all the show_help function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain("Show / hide help");
      const show_help_fns: Array<[string, Function]> = keyMap.get("Show / hide help");
      show_help_fns.forEach((entry: [string, Function]) => entry[1]());
      expect(customCallbacks.show_help).toHaveBeenCalledTimes(show_help_fns.length);
    });
    it('provides all the toggle_blood_moon function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain("Toggle the Blood Moon");
      const toggle_blood_moon_fns: Array<[string, Function]> = keyMap.get("Toggle the Blood Moon");
      toggle_blood_moon_fns.forEach((entry: [string, Function]) => entry[1]());
      expect(customCallbacks.toggle_blood_moon).toHaveBeenCalledTimes(toggle_blood_moon_fns.length);
    });
  });
});
