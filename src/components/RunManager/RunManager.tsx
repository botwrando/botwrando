import React, { useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import '../../assets/bloodmoon.svg';
import { handleKey, registerCallbacks } from '../../lib/keyboard';
import { getRandomizedShrines } from '../../lib/rando';
import { Run, RunState } from '../../lib/run';
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';
import { SeedInfo } from '../SeedInfo/SeedInfo';
import { SeedPicker } from '../SeedPicker/SeedPicker';
import { BLOOD_MOON_SHRINE } from '../../lib/shrines';
import { RunDisplay } from '../RunDisplay/RunDisplay';

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
    const classes = ['run-manager', 'bg'];
    if (bloodMoonState.isActive) classes.push('is-blood-moon');
    return classes.join(' ');
  };

  const touchCallbacks = {
    onSplit: addSplit,
    onUndo: undoSplit,
    onReset: resetSplits,
    onPause: pause,
    onBloodMoon: toggleBloodMoon
  };

  const onPickedSeed = (seed: string) => {
    const shrineIds = getRandomizedShrines(seed);
    setRun(prev => ({ ...prev, seed, shrineIds }));
    setRunState(RunState.Init);
  };

  const mainsection = () =>
    run.state === RunState.None ? (
      <SeedPicker onPickedSeed={onPickedSeed} />
    ) : (
      <RunDisplay run={run} onUpdatePausedTime={onUpdatePausedTime} />
    );

  return (
    <div className={getClasses()}>
      <KeyboardEventHandler handleKeys={['all']} onKeyEvent={handleKey} />
      <div className="main">
        <AppHeader hasSeed={!!run.seed} setRun={setRun} />
        <SeedInfo run={run} />
        {mainsection()}
        <AppFooter
          run={run}
          touchCallbacks={touchCallbacks}
          showHelp={showHelp}
        />
      </div>
    </div>
  );
};