import React from 'react';
import ReactDOM from 'react-dom';
import { RunState } from '../../lib/run';
import { RunTimer } from './RunTimer';

describe('RunTimer', () => {
  it('renders without crashing', () => {
    const run = {
      state: RunState.None,
      runner: 'Probably Specs',
      rundate: -1,
      pausedTime: -1,
      seed: '1234',
      waypointIds: [],
      splits: new Map<number, number>([]),
      pbSplits: new Map<number, number>([]),
      wrSplits: new Map<number, number>([])
    };
    const setPausedTime = () => {};

    const div = document.createElement('div');
    ReactDOM.render(<RunTimer run={run} setPausedTime={setPausedTime} />, div);
  });
});
