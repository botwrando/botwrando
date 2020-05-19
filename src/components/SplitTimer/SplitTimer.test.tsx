import React from 'react';
import ReactDOM from 'react-dom';
import { Run, RunState } from '../../lib/run';
import { SplitTimer } from './SplitTimer';

describe('SplitTimer', () => {
  it('renders without crashing', () => {
    const run: Run = {
      state: RunState.None,
      runner: 'abc',
      rundate: 36,
      pausedTime: 23,
      seed: 'xyz',
      waypointIds: [83, 1, 53, 63, 12],
      splits: new Map(),
      wrSplits: new Map(),
      pbSplits: new Map(),
    };
    const currentWaypoint: number = 53;
    const onUpdatePausedTime = (_paused_time: number) => { };

    const div = document.createElement('div');
    ReactDOM.render(
      <SplitTimer
        run={run}
        currentWaypoint={currentWaypoint}
        onUpdatePausedTime={onUpdatePausedTime}
      />, div);
  });
});
