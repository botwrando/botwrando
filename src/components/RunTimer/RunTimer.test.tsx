import React from 'react';
import ReactDOM from 'react-dom';
import { RunTimer } from './RunTimer';
import { RunState } from '../../lib/run';

describe('RunTimer', () => {
  it('renders without crashing', () => {
    const timestamp = 35;
    const runstate = RunState.None;
    const setPausedTime = () => {};

    const div = document.createElement('div');
    ReactDOM.render(
      <RunTimer
        timestamp={timestamp}
        runstate={runstate}
        pausedTime={0}
        setPausedTime={setPausedTime}
      />,
      div
    );
  });
});
