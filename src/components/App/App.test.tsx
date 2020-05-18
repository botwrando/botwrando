import { mount, render, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { Run, RunState } from '../../lib/run';
import { RunManager } from '../RunManager/RunManager';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('renders the RunManager with the default run information', () => {
    const run: Run = {
      state: RunState.None,
      runner: 'Probably Specs',
      rundate: -1,
      pausedTime: -1,
      seed: '',
      waypointIds: [],
      splits: new Map([]),
      pbSplits: new Map([]),
      wrSplits: new Map([])
    };
    const el = shallow(<App />);
    expect(el.contains(<RunManager run={run} />));
  });
  it('mounts in a full DOM', () => {
    expect(mount(<App />).find('link').length).toBe(1);
  });
  it('should render the expected text', () => {
    expect(render(<App />).text()).toMatch(/BotW All Shrines Randomizer/);
  });
});
