import React, { useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import '../../assets/bloodmoon.svg';
import { DesktopHelp, MobileControls } from '../Help/Help';
import { parseKeypress, registerCallbacks } from '../../lib/keyboard';
import { getRandomizedShrines } from '../../lib/rando';
import { QuickMap } from '../QuickMap/QuickMap';
import { Run, RunState, getDefaultRun } from '../../lib/run';
import { SeedPicker } from '../SeedPicker/SeedPicker';
import { BLOOD_MOON_SHRINE, Shrine, getShrine } from '../../lib/shrines';
import { SplitHistory } from '../SplitHistory/SplitHistory';
import { SplitTimer } from '../SplitTimer/SplitTimer';

type RunManagerProps = {
	run: Run;
};

type BloodMoonState = {
	isDone: boolean;
	isActive: boolean;
};

export const RunManager = (props: RunManagerProps) => {
  const [run, setRun] = useState(props.run);
  const [hasRun, setHasRun] = useState(false);
  const [shrinePtr, setShrinePtr] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);
  const [bloodMoonState, setBloodMoonState] = useState<BloodMoonState>({
    isDone: false,
    isActive: false
  });


  React.useEffect(() => {
    setHasRun(!!run.seed);
  });

  React.useEffect(() => {
    if (run.state == RunState.None || run.state == RunState.Init) {
      setShrinePtr(-1);
    } else {
      setShrinePtr(run.splits.size);
    }
  });

  const onUpdatePausedTime = (pausedTime: number) => {
    setRun(prev => ({ ...prev, pausedTime }));
  };

  const updateSplits = (splits: Map<number, number>) => {
    setRun(prev => ({ ...prev, splits }));
  };

  const updateShrines = (shrineIds: number[]) => {
    setRun(prev => ({ ...prev, shrineIds }));
  };

  const setRunState = (state: RunState) => {
    setRun(prev => ({ ...prev, state: state }));

    if (state === RunState.Running) {
      if (run.rundate === -1) {
        setRun(prev => ({ ...prev, rundate: Date.now() }));
      }
    }
  };

  const addSplit = () => {
    if (run.state === RunState.Paused) {
      setRunState(RunState.Running);
    }
    if (run.state === RunState.Ended) return;
    if (run.state === RunState.Init) {
      setRunState(RunState.Running);
    }
    if (run.state === RunState.Running) {
      const {splits} = run;
      splits.set(shrinePtr, Date.now() - run.rundate - run.pausedTime);
      updateSplits(splits);
    }
  };

  const undoSplit = () => {
    const {splits} = run;
    if (splits.size < 1) {
      return;
    }
    splits.delete(shrinePtr - 1);
    updateSplits(splits);
  };

  React.useEffect(() => {
    if (shrinePtr >= run.shrineIds.length) {
      setRunState(RunState.Ended);
    } else if (
      run.state == RunState.Ended &&
			shrinePtr > -1 &&
			shrinePtr < run.shrineIds.length
    ) {
      setRunState(RunState.Running);
    }
  }, [shrinePtr]);

  const skipSplit = () => {
    if (run.state === RunState.Ended) return;

    const {splits} = run;
    splits.set(shrinePtr, -1);
    updateSplits(splits);
  };

  const resetSplits = () => {
    const {splits} = run;
    splits.clear();
    updateSplits(splits);
    setRun(prev => ({ ...prev, pausedTime: -1, rundate: -1 }));
    setRunState(RunState.Init);
  };

  const pause = () => setRunState(RunState.Paused);

  const toggleHelp = () => setShowHelp(!showHelp);

  const toggleBloodMoon = () => {
    const { shrineIds } = run;

    if (bloodMoonState.isDone) {
      return;
    }
    const currentShrine = Math.max(0, shrinePtr);

    if (shrineIds[currentShrine] === BLOOD_MOON_SHRINE) {
      shrineIds.splice(currentShrine, 1);
      updateShrines(shrineIds);
    } else {
      shrineIds.splice(currentShrine, 0, BLOOD_MOON_SHRINE);
      updateShrines(shrineIds);
    }
  };

  React.useEffect(() => {
    const state = {
      isActive:
				run.shrineIds[Math.max(0, shrinePtr)] === BLOOD_MOON_SHRINE,
      isDone: run.splits.has(run.shrineIds.indexOf(BLOOD_MOON_SHRINE))
    };
    setBloodMoonState(prev => ({
      ...prev,
      ...state
    }));
  }, [run, shrinePtr]);

  React.useEffect(() => {
    registerCallbacks({
      addSplit,
      undoSplit,
      skipSplit,
      resetSplits,
      pause,
      toggleHelp,
      toggleBloodMoon
    });
  });

  const getClasses = () => {
    const classes = ['bg'];
    if (bloodMoonState.isActive) classes.push('is-blood-moon');
    return classes.join(' ');
  };

  const getCurrentShrine = (): Shrine | undefined => {
    const current_shrine = getShrine(run.shrineIds[shrinePtr]);
    return current_shrine;
  };

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const touchProps = {
    run: run,
    onSplit: addSplit,
    onUndo: undoSplit,
    onReset: resetSplits,
    onPause: pause,
    onBloodMoon: toggleBloodMoon
  };

  let lastCall = Date.now();

  const handleKey = (key: string, event: KeyboardEvent) => {
    let ts = Date.now();
    if (ts - lastCall < 16) {
      return;
    }
    lastCall = ts;
    const callback = parseKeypress(event.code);

    if (callback) {
      callback();
    }
  };

  const onPickedSeed = (seed: string) => {
    const shrineIds = getRandomizedShrines(seed);
    setRun(prev => ({ ...prev, seed: seed, shrineIds: shrineIds }));
    setHasRun(true);
    setRunState(RunState.Init);
  };

  const onQuit = () => {
    setRun(getDefaultRun());
  };

  const header = () => (
    <div className="header">
      <div className="caption">Botw All Shrines Randomizer</div>
      <button className="btn-text btn-back" onClick={onQuit}>
				Quit run
      </button>
    </div>
  );

  const seedinfo = () =>
    hasRun ? (
      <div className="seedinfo">
        <div className="seed">Seed: {run.seed}</div>
      </div>
    ) : (
      <div className="seedinfo"></div>
    );

  const mainsection = () =>
    run.state === RunState.None ? (
      <SeedPicker onPickedSeed={onPickedSeed} />
    ) : (
      <>
        <SplitHistory run={run} />
        <SplitTimer
          run={run}
          currentShrine={shrinePtr}
          onUpdatePausedTime={onUpdatePausedTime}
        />
        <QuickMap shrine={getCurrentShrine()} />
      </>
    );

  const footer = () =>
    isTouch ? (
      <MobileControls {...touchProps} />
    ) : (
      <DesktopHelp run={run} showHelp={showHelp} />
    );

  const out = (
    <div className={getClasses()}>
      <KeyboardEventHandler handleKeys={['all']} onKeyEvent={handleKey} />
      <div className="main">
        {header()}
        {seedinfo()}
        {mainsection()}
        {footer()}
      </div>
    </div>
  );

  return out;
};
