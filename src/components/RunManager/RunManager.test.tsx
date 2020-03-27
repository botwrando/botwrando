import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { RunManager } from './RunManager';
import { Run, RunState } from '../../lib/run';
import { AppHeader } from '../AppHeader/AppHeader';
import { SeedInfo } from '../SeedInfo/SeedInfo';
import { AppFooter } from '../AppFooter/AppFooter';
import { SeedPicker } from '../SeedPicker/SeedPicker';
import { RunDisplay } from '../RunDisplay/RunDisplay';

describe('RunManager', () => {
  let run: Run;
  beforeEach(() => {
    run = {
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
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RunManager run={run} />, div);
  });
  it('mounts in a full DOM', () => {
    expect(mount(<RunManager run={run} />).find('.run-manager').length).toBe(1);
  });
  it('renders the AppHeader', () => {
    const el = shallow(<RunManager run={run} />);
    expect(el.contains(<AppHeader setRun={jest.fn()} />));
  });
  it('renders the SeedInfo', () => {
    const el = shallow(<RunManager run={run} />);
    expect(el.contains(<SeedInfo run={run} />));
  });
  it('renders the AppFooter', () => {
    const el = shallow(<RunManager run={run} />);
    expect(el.contains(<AppFooter
      run={run}
      touchCallbacks={{
        onSplit: jest.fn(),
        onUndo: jest.fn(),
        onReset: jest.fn(),
        onPause: jest.fn(),
        onBloodMoon: jest.fn()
      }}
      showHelp={false}
    />));
  });
  describe('when the run state is None', () => {
    beforeEach(() => {
      run.state = RunState.None;
    });

    it('renders the SeedPicker', () => {
      const el = shallow(<RunManager run={run} />);
      expect(el.contains(<SeedPicker onPickedSeed={jest.fn()} />));
    });
  });
  describe('when the run state is not None', () => {
    beforeEach(() => {
      run.state = RunState.Running;
    });

    it('renders the RunDisplay', () => {
      const el = shallow(<RunManager run={run} />);
      expect(el.contains(<RunDisplay run={run} onUpdatePausedTime={jest.fn()} />));
    });
  });

  describe('state management', () => {
    it.skip('needs testing and to be refactored into a separate component', () => { });
  });
});
