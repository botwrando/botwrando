import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { RunDisplay } from './RunDisplay';
import { Run, RunState } from '../../lib/run';
import { getShrine } from '../../lib/shrines';
import { SplitHistory } from '../SplitHistory/SplitHistory';
import { SplitTimer } from '../SplitTimer/SplitTimer';
import { QuickMap } from '../QuickMap/QuickMap';

describe('RunDisplay', () => {
  let run: Run,
    onUpdatePausedTime: (pausedTime: number) => void;
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
    onUpdatePausedTime = jest.fn();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RunDisplay
      run={run}
      onUpdatePausedTime={onUpdatePausedTime}
    />, div);
  });
  it('mounts in a full DOM', () => {
    expect(mount(<RunDisplay
      run={run}
      onUpdatePausedTime={onUpdatePausedTime}
    />).find('.run-display').length).toBe(1);
  });
  it('renders the SplitHistory', () => {
    const el = shallow(<RunDisplay
      run={run}
      onUpdatePausedTime={onUpdatePausedTime}
    />);
    expect(el.contains(<SplitHistory run={run} />));
  });
  it('renders the SplitTimer', () => {
    const el = shallow(<RunDisplay
      run={run}
      onUpdatePausedTime={onUpdatePausedTime}
    />);
    expect(el.contains(<SplitTimer
      run={run}
      currentShrine={0}
      onUpdatePausedTime={onUpdatePausedTime}
    />));
  });
  it('renders the QuickMap', () => {
    run.shrineIds.unshift(9);
    const shrine = getShrine(9);
    const el = shallow(<RunDisplay
      run={run}
      onUpdatePausedTime={onUpdatePausedTime}
    />);
    expect(el.contains(<QuickMap shrine={shrine} />));
  });
});
