import {
  bindings,
  Effect,
  FunctionMap,
  registerCallbacks,
  getProfile,
  parseKeypress,
  getShortKeyname,
  getKeyMap
} from './keyboard';

describe('keyboard', () => {
  let customCallbacks: FunctionMap;
  beforeEach(() => {
    const addSplitCallback = jest.fn();
    const undoSplitCallback = jest.fn();
    const skipSplitCallback = jest.fn();
    const resetSplitsCallback = jest.fn();
    const pauseCallback = jest.fn();
    const toggleHelpCallback = jest.fn();
    const toggleBloodMoonCallback = jest.fn();
    customCallbacks = {
      addSplit: addSplitCallback,
      undoSplit: undoSplitCallback,
      skipSplit: skipSplitCallback,
      resetSplits: resetSplitsCallback,
      pause: pauseCallback,
      toggleHelp: toggleHelpCallback,
      toggleBloodMoon: toggleBloodMoonCallback,
    };
  });

  describe('registerCallbacks', () => {
    it('registers a custom addSplit callback', () => {
      registerCallbacks(customCallbacks);
      const cb = bindings['addSplit'].callback;
      expect(typeof cb).toBe('function');
      if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.addSplit).toHaveBeenCalledTimes(1);
    });
    it('registers a custom undoSplit callback', () => {
      registerCallbacks(customCallbacks);
      const cb = bindings['undoSplit'].callback;
      expect(typeof cb).toBe('function');
      if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.undoSplit).toHaveBeenCalledTimes(1);
    });
    it('registers a custom skipSplit callback', () => {
      registerCallbacks(customCallbacks);
      const cb = bindings['skipSplit'].callback;
      expect(typeof cb).toBe('function');
      if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.skipSplit).toHaveBeenCalledTimes(1);
    });
    it('registers a custom resetSplits callback', () => {
      registerCallbacks(customCallbacks);
      const cb = bindings['resetSplits'].callback;
      expect(typeof cb).toBe('function');
      if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.resetSplits).toHaveBeenCalledTimes(1);
    });
    it('registers a custom pause callback', () => {
      registerCallbacks(customCallbacks);
      const cb = bindings['pause'].callback;
      expect(typeof cb).toBe('function');
      if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.pause).toHaveBeenCalledTimes(1);
    });
    it('registers a custom toggleHelp callback', () => {
      registerCallbacks(customCallbacks);
      const cb = bindings['toggleHelp'].callback;
      expect(typeof cb).toBe('function');
      if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.toggleHelp).toHaveBeenCalledTimes(1);
    });
    it('registers a custom toggleBloodMoon callback', () => {
      registerCallbacks(customCallbacks);
      const cb = bindings['toggleBloodMoon'].callback;
      expect(typeof cb).toBe('function');
      if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.toggleBloodMoon).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProfile', () => {
    beforeEach(() => {
      registerCallbacks(customCallbacks);
    });
    it('returns a keyboard profile containing teetow\'s settings', () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty('Space');
      expect(keyboardProfile.Space).toBe('addSplit');
      expect(keyboardProfile).toHaveProperty('Backspace');
      expect(keyboardProfile.Backspace).toBe('undoSplit');
      expect(keyboardProfile).toHaveProperty('Period');
      expect(keyboardProfile.Period).toBe('skipSplit');
      expect(keyboardProfile).toHaveProperty('KeyR');
      expect(keyboardProfile.KeyR).toBe('resetSplits');
      expect(keyboardProfile).toHaveProperty('KeyP');
      expect(keyboardProfile.KeyP).toBe('pause');
      expect(keyboardProfile).toHaveProperty('KeyH');
      expect(keyboardProfile.KeyH).toBe('toggleHelp');
      expect(keyboardProfile).toHaveProperty('KeyB');
      expect(keyboardProfile.KeyB).toBe('toggleBloodMoon');
    });
    it('returns a keyboard profile containing livesplit settings', () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty('Numpad1');
      expect(keyboardProfile.Numpad1).toBe('addSplit');
      expect(keyboardProfile).toHaveProperty('Numpad8');
      expect(keyboardProfile.Numpad8).toBe('undoSplit');
      expect(keyboardProfile).toHaveProperty('Numpad2');
      expect(keyboardProfile.Numpad2).toBe('skipSplit');
      expect(keyboardProfile).toHaveProperty('Numpad3');
      expect(keyboardProfile.Numpad3).toBe('resetSplits');
      expect(keyboardProfile).toHaveProperty('Numpad5');
      expect(keyboardProfile.Numpad5).toBe('pause');
    });
    it('returns a keyboard profile containing specs\' settings', () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty('NumpadAdd');
      expect(keyboardProfile.NumpadAdd).toBe('addSplit');
      expect(keyboardProfile).toHaveProperty('NumpadSubtract');
      expect(keyboardProfile.NumpadSubtract).toBe('undoSplit');
      expect(keyboardProfile).toHaveProperty('NumpadDivide');
      expect(keyboardProfile.NumpadDivide).toBe('skipSplit');
      expect(keyboardProfile).toHaveProperty('KeyQ');
      expect(keyboardProfile.KeyQ).toBe('resetSplits');
      expect(keyboardProfile).toHaveProperty('NumpadMultiply');
      expect(keyboardProfile.NumpadMultiply).toBe('pause');
    });
    it('returns a keyboard profile containing dj\'s settings', () => {
      const keyboardProfile = getProfile();
      expect(keyboardProfile).not.toBeUndefined();
      expect(keyboardProfile).toHaveProperty('F1');
      expect(keyboardProfile.F1).toBe('addSplit');
      expect(keyboardProfile).toHaveProperty('F4');
      expect(keyboardProfile.F4).toBe('undoSplit');
      expect(keyboardProfile).toHaveProperty('F5');
      expect(keyboardProfile.F5).toBe('skipSplit');
      expect(keyboardProfile).toHaveProperty('F3');
      expect(keyboardProfile.F3).toBe('resetSplits');
      expect(keyboardProfile).toHaveProperty('F6');
      expect(keyboardProfile.F6).toBe('pause');
    });
  });

  describe('parseKeypress', () => {
    beforeEach(() => {
      registerCallbacks(customCallbacks);
    });
    it('returns the expected callback function', () => {
      const spaceCallback = parseKeypress('Space');
      expect(spaceCallback).toBe(customCallbacks.addSplit);
      if (spaceCallback) { spaceCallback(); }
      else { throw new Error('It\'s not a function!'); }
      expect(customCallbacks.addSplit).toHaveBeenCalledTimes(1);
    });
  });

  describe('getShortKeyname', () => {
    it('returns names of the special keys', () => {
      let keyname = getShortKeyname('KeySpace');
      expect(keyname).toEqual('Space');
    });
    it('returns the number for numeric keys', () => {
      const keyname = getShortKeyname('Key9');
      expect(keyname).toEqual('9');
    });
    it('returns names of the alpha keys', () => {
      const keyname = getShortKeyname('KeyC');
      expect(keyname).toEqual('C');
    });
    it('returns "Num" plus the key symbol for numpad keys', () => {
      const keyname = getShortKeyname('NumAdd');
      expect(keyname).toEqual('Num+');
    });
    it('returns the argument otherwise', () => {
      const keyname = getShortKeyname('MySpecialKey');
      expect(keyname).toEqual('MySpecialKey');
    });
  });

  describe('getKeyMap', () => {
    beforeEach(() => {
      registerCallbacks(customCallbacks);
    });
    it('provides all the addSplit function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain('Start the run / add a split');
      const addSplit_fns: Array<[string, Effect]> = keyMap.get('Start the run / add a split');
      addSplit_fns.forEach((entry: [string, Effect]) => {
        const cb = bindings[entry[1]].callback;
        expect(typeof cb).toBe('function');
        if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      });
      expect(customCallbacks.addSplit).toHaveBeenCalledTimes(addSplit_fns.length);
    });
    it('provides all the undoSplit function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain('Undo last split');
      const undoSplit_fns: Array<[string, Effect]> = keyMap.get('Undo last split');
      undoSplit_fns.forEach((entry: [string, Effect]) => {
        const cb = bindings[entry[1]].callback;
        expect(typeof cb).toBe('function');
        if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      });
      expect(customCallbacks.undoSplit).toHaveBeenCalledTimes(undoSplit_fns.length);
    });
    it('provides all the skipSplit function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain('Skip a split');
      const skipSplit_fns: Array<[string, Effect]> = keyMap.get('Skip a split');
      skipSplit_fns.forEach((entry: [string, Effect]) => {
        const cb = bindings[entry[1]].callback;
        expect(typeof cb).toBe('function');
        if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      });
      expect(customCallbacks.skipSplit).toHaveBeenCalledTimes(skipSplit_fns.length);
    });
    it('provides all the resetSplits function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain('Reset the run');
      const resetSplits_fns: Array<[string, Effect]> = keyMap.get('Reset the run');
      resetSplits_fns.forEach((entry: [string, Effect]) => {
        const cb = bindings[entry[1]].callback;
        expect(typeof cb).toBe('function');
        if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      });
      expect(customCallbacks.resetSplits).toHaveBeenCalledTimes(resetSplits_fns.length);
    });
    it('provides all the pause function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain('Pause the timer');
      const pause_fns: Array<[string, Effect]> = keyMap.get('Pause the timer');
      pause_fns.forEach((entry: [string, Effect]) => {
        const cb = bindings[entry[1]].callback;
        expect(typeof cb).toBe('function');
        if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      });
      expect(customCallbacks.pause).toHaveBeenCalledTimes(pause_fns.length);
    });
    it('provides all the toggleHelp function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain('Show / hide help');
      const toggleHelp_fns: Array<[string, Effect]> = keyMap.get('Show / hide help');
      toggleHelp_fns.forEach((entry: [string, Effect]) => {
        const cb = bindings[entry[1]].callback;
        expect(typeof cb).toBe('function');
        if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      });
      expect(customCallbacks.toggleHelp).toHaveBeenCalledTimes(toggleHelp_fns.length);
    });
    it('provides all the toggleBloodMoon function key mappings', () => {
      const keyMap = getKeyMap();
      expect(keyMap.keys()).toContain('Toggle Blood Moon shrine');
      const toggleBloodMoon_fns: Array<[string, Effect]> = keyMap.get('Toggle Blood Moon shrine');
      toggleBloodMoon_fns.forEach((entry: [string, Effect]) => {
        const cb = bindings[entry[1]].callback;
        expect(typeof cb).toBe('function');
        if (cb) { cb(); } else { throw new Error('It\'s not a function!'); }
      });
      expect(customCallbacks.toggleBloodMoon).toHaveBeenCalledTimes(toggleBloodMoon_fns.length);
    });
  });
});
