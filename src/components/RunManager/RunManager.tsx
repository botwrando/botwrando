import React, { useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import '../../assets/bloodmoon.svg';
import { handleKey, registerCallbacks } from '../../lib/keyboard';
import { getRandomizedWaypoints } from '../../lib/rando';
import { Run, RunState } from '../../lib/run';
import { BLOOD_MOON_SHRINE } from '../../lib/waypoints';
import { AppFooter } from '../AppFooter/AppFooter';
import { AppHeader } from '../AppHeader/AppHeader';
import { RunDisplay } from '../RunDisplay/RunDisplay';
import { SeedInfo } from '../SeedInfo/SeedInfo';
import { SeedPicker } from '../SeedPicker/SeedPicker';

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

  const updateWaypoints = (waypointIds: number[]) => {
    setRun(prev => ({ ...prev, waypointIds: waypointIds }));
  };

  const removeBloodMoonShrine = (waypointIds: number[]) => {
    const toDelete = waypointIds.indexOf(BLOOD_MOON_SHRINE);
    if (toDelete > -1) {
      waypointIds.splice(toDelete, 1);
      updateWaypoints(waypointIds);
    }
  }

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
    const currentWaypoint = Math.max(0, run.splits.size);
    const shouldRemoveBloodMoon =
      run.waypointIds[currentWaypoint] === BLOOD_MOON_SHRINE;
    if (shouldRemoveBloodMoon) {
      removeBloodMoonShrine(run.waypointIds);
    }
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
    if (run.rundate && run.splits.size >= run.waypointIds.length) {
      setRun(prev => ({ ...prev, state: RunState.Ended }));
    }
  }, [run.state, run.rundate, run.splits.size, run.waypointIds.length]);

  const skipSplit = () => {
    if (run.state === RunState.Ended) return;
    run.splits.set(run.splits.size, -1);
    updateSplits(run.splits);
  };

  const resetSplits = () => {
    removeBloodMoonShrine(run.waypointIds);
    run.splits.clear();
    updateSplits(run.splits);
    setRun(prev => ({ ...prev, pausedTime: 0, rundate: -1 }));
    setRunState(RunState.Init);
  };

  const pause = () => setRunState(RunState.Paused);

  const toggleHelp = () => setShowHelp(!showHelp);

  const toggleBloodMoon = () => {
    const { waypointIds } = run;

    if (bloodMoonState.isDone) {
      return;
    }
    const currentWaypoint = Math.max(0, run.splits.size);

    if (waypointIds[currentWaypoint] === BLOOD_MOON_SHRINE) {
      waypointIds.splice(currentWaypoint, 1);
      updateWaypoints(waypointIds);
    } else {
      waypointIds.splice(currentWaypoint, 0, BLOOD_MOON_SHRINE);
      updateWaypoints(waypointIds);
    }
  };

  // Blood moon state
  React.useEffect(() => {
    const state = {
      isActive:
        run.waypointIds[Math.max(0, run.splits.size)] === BLOOD_MOON_SHRINE,
      isDone: run.splits.has(run.waypointIds.indexOf(BLOOD_MOON_SHRINE))
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

  const callbacks = {
    onSplit: (_e: React.SyntheticEvent) => { addSplit() },
    onUndo: (_e: React.SyntheticEvent) => { undoSplit() },
    onReset: (_e: React.SyntheticEvent) => { resetSplits() },
    onPause: (_e: React.SyntheticEvent) => { pause() },
    onBloodMoon: (_e: React.SyntheticEvent) => { toggleBloodMoon() }
  };

  const onPickedSeed = (seed: string) => {
    const waypointIds = getRandomizedWaypoints(seed);
    setRun(prev => ({ ...prev, seed, waypointIds }));
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
        <AppHeader run={run} setRun={setRun} />
        {mainsection()}
        <AppFooter
          run={run}
          callbacks={callbacks}
          showHelp={showHelp}
        />
      </div>
    </div>
  );
};
