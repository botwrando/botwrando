import { mount, render, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { RunState } from '../../lib/run';
import { DesktopHelp, MobileControls } from '../Help/Help';
import { AppFooter, AppFooterProps } from './AppFooter';

describe('AppFooter', () => {
  let props: AppFooterProps;
  beforeEach(() => {
    props = {
      run: {
        state: RunState.None,
        runner: 'abc',
        rundate: 36,
        pausedTime: 23,
        seed: 'xyz',
        shrineIds: [83, 1, 53, 63, 12],
        splits: new Map(),
        wrSplits: new Map(),
        pbSplits: new Map(),
      },
      callbacks: {
        onSplit: jest.fn(),
        onUndo: jest.fn(),
        onReset: jest.fn(),
        onPause: jest.fn(),
        onBloodMoon: jest.fn()
      },
      showHelp: false
    }
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppFooter
      run={props.run}
      callbacks={props.callbacks}
      showHelp={props.showHelp}
    />, div);
  });
  it('renders the footer contents', () => {
    const el = shallow(<AppFooter
      run={props.run}
      callbacks={props.callbacks}
      showHelp={props.showHelp}
    />);
    expect(el.contains(<div className="footer"/>));
  });
  it('mounts in a full DOM', () => {
    expect(mount(<AppFooter
      run={props.run}
      callbacks={props.callbacks}
      showHelp={props.showHelp}
    />).find('.footer').length).toBe(1);
  });
  it('should render the expected text', () => {
    expect(render(<AppFooter
      run={props.run}
      callbacks={props.callbacks}
      showHelp={props.showHelp}
    />).text()).toMatch(/to start \/ split/);
  });
  describe('on mobile devices', () => {
    beforeEach(() => {
      window.matchMedia = jest.fn().mockReturnValue({
        matches: true
      });
    });
    it('renders MobileControls', () => {
      expect(shallow(<AppFooter
        run={props.run}
        callbacks={props.callbacks}
        showHelp={props.showHelp}
      />).containsMatchingElement(<MobileControls
        run={props.run}
        callbacks={props.callbacks}
      />)).toEqual(true);
    });
  });
  describe('on desktop devices', () => {
    beforeEach(() => {
      window.matchMedia = jest.fn().mockReturnValue({
        matches: false
      });
    });
    it('renders DesktopHelp', () => {
      expect(shallow(<AppFooter
        run={props.run}
        callbacks={props.callbacks}
        showHelp={props.showHelp}
      />).containsMatchingElement(<DesktopHelp
        run={props.run}
        showHelp={props.showHelp}
      />)).toEqual(true);
    });
  });
});
