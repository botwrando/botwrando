import React from 'react';
import ReactDOM from 'react-dom';
import { SplitTimer } from './SplitTimer';
import { Run, RunState } from '../../lib/run';

describe('SplitTimer', () => {
  it('renders without crashing', () => {
    const run: Run = {
      state: RunState.None,
      runner: 'abc',
      rundate: 36,
      pausedTime: 23,
      seed: 'xyz',
      shrineIds: [83, 1, 53, 63, 12],
      splits: new Map(),
      wrSplits: new Map(),
      pbSplits: new Map(),
    };
    const currentShrine: number = 53;
    const onUpdatePausedTime = (_paused_time: number) => { };

    const div = document.createElement('div');
    ReactDOM.render(
      <SplitTimer
        run={run}
        currentShrine={currentShrine}
        onUpdatePausedTime={onUpdatePausedTime}
      />, div);
  });
});
