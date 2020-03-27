import React, { useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import '../../assets/bloodmoon.svg';
import { DesktopHelp, MobileControls } from '../Help/Help';
import { parseKeypress, registerCallbacks } from '../../lib/keyboard';
import { getRandomizedShrines } from '../../lib/rando';
import { QuickMap } from '../QuickMap/QuickMap';
import { Run, RunState, getDefaultRun } from '../../lib/run';
import { SeedPicker } from '../SeedPicker/SeedPicker';
import { BLOOD_MOON_SHRINE, getShrine } from '../../lib/shrines';
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
  const [showHelp, setShowHelp] = useState(false);
  const [bloodMoonState, setBloodMoonState] = useState<BloodMoonState>({
    isDone: false,
    isActive: false
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
    if (run.state === RunState.Ended) return;
    if (run.state === RunState.Paused) {
      setRunState(RunState.Running);
    }
    if (run.state === RunState.Init) {
      setRun(prev => ({ ...prev, rundate: Date.now() }));
      setRunState(RunState.Running);
    }
    if (run.state === RunState.Running) {
      run.splits.set(
        run.splits.size,
        Date.now() - run.rundate - run.pausedTime
      );
      updateSplits(run.splits);
    }
  };

  const undoSplit = () => {
    run.splits.delete(run.splits.size - 1);
    updateSplits(run.splits);
  };

  React.useEffect(() => {
    if (
      run.state === RunState.None ||
      run.state === RunState.Init ||
      run.state === RunState.Paused
    ) {
      return;
    }
    if (run.rundate && run.splits.size > 0) {
      setRun(prev => ({ ...prev, state: RunState.Running }));
    }
    if (run.rundate && run.splits.size >= run.shrineIds.length) {
      setRun(prev => ({ ...prev, state: RunState.Ended }));
    }
  }, [run.state, run.rundate, run.splits.size, run.shrineIds.length]);

  const skipSplit = () => {
    if (run.state === RunState.Ended) return;
    run.splits.set(run.splits.size, -1);
    updateSplits(run.splits);
  };

  const resetSplits = () => {
    run.splits.clear();
    updateSplits(run.splits);
    setRun(prev => ({ ...prev, pausedTime: 0, rundate: -1 }));
    setRunState(RunState.Init);
  };

  const pause = () => setRunState(RunState.Paused);

  const toggleHelp = () => setShowHelp(!showHelp);

  const toggleBloodMoon = () => {
    const { shrineIds } = run;

    if (bloodMoonState.isDone) {
      return;
    }
    const currentShrine = Math.max(0, run.splits.size);

    if (shrineIds[currentShrine] === BLOOD_MOON_SHRINE) {
      shrineIds.splice(currentShrine, 1);
      updateShrines(shrineIds);
    } else {
      shrineIds.splice(currentShrine, 0, BLOOD_MOON_SHRINE);
      updateShrines(shrineIds);
    }
  };

  // Blood moon state
  React.useEffect(() => {
    const state = {
      isActive:
        run.shrineIds[Math.max(0, run.splits.size)] === BLOOD_MOON_SHRINE,
      isDone: run.splits.has(run.shrineIds.indexOf(BLOOD_MOON_SHRINE))
    };
    setBloodMoonState(prev => ({
      ...prev,
      ...state
    }));
  }, [run, run.splits.size]);
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

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const touchProps = {
    run: run,
    onSplit: addSplit,
    onUndo: undoSplit,
    onReset: resetSplits,
    onPause: pause,
    onBloodMoon: toggleBloodMoon
  };

  const handleKey = (_key: string, event: KeyboardEvent) => {
    const callback = parseKeypress(event.code);
    if (callback) callback();
  };

  const onPickedSeed = (seed: string) => {
    const shrineIds = getRandomizedShrines(seed);
    setRun(prev => ({ ...prev, seed, shrineIds }));
    setRunState(RunState.Init);
  };

  const onQuit = () => setRun(getDefaultRun());

  const header = () => (
    <div className="header">
      <div className="caption">BotW All Shrines Randomizer</div>
      <button className="btn-text btn-back" onClick={onQuit}>
        Quit run
      </button>
    </div>
  );

  const seedinfo = () =>
    run.seed ? (
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
          currentShrine={run.splits.size}
          onUpdatePausedTime={onUpdatePausedTime}
        />
        <QuickMap shrine={getShrine(run.shrineIds[run.splits.size])} />
      </>
    );

  const footer = () =>
    isTouch ? (
      <MobileControls {...touchProps} />
    ) : (
      <DesktopHelp run={run} showHelp={showHelp} />
    );

  return (
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
};
