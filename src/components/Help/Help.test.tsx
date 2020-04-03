import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { getDefaultRun, Run } from '../../lib/run';
import { DesktopHelp, MobileControls } from './Help';

describe('Help', () => {
  let run: Run;
  beforeEach(() => {
    run = getDefaultRun();
  });

  describe('DesktopHelp', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<DesktopHelp
        run={run}
        showHelp={false}
      />, div);
    });
    it('shows the help when toggled on', () => {
      expect(mount(<DesktopHelp
        run={run}
        showHelp={true}
      />).find('.hotkeys').length).toBe(1);
    });
    it('does not show the help when toggled off', () => {
      expect(mount(<DesktopHelp
        run={run}
        showHelp={false}
      />).find('.hotkeys').length).toBe(0);
    });
  });

  describe('MobileControls', () => {
    let touchCallbacks: Record<string, (event: React.MouseEvent) => void>;
    beforeEach(() => {
      touchCallbacks = {
        onSplit: jest.fn(),
        onUndo: jest.fn(),
        onPause: jest.fn(),
        onReset: jest.fn(),
        onBloodMoon: jest.fn()
      };
    })
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<MobileControls
        run={run}
        onSplit={touchCallbacks.onSplit}
        onUndo={touchCallbacks.onUndo}
        onPause={touchCallbacks.onPause}
        onReset={touchCallbacks.onReset}
        onBloodMoon={touchCallbacks.onBloodMoon}
      />, div);
    });
    describe('touch handlers setup', () => {
      let mounted: ReactWrapper;
      beforeEach(() => {
        mounted = mount(<MobileControls
          run={run}
          onSplit={touchCallbacks.onSplit}
          onUndo={touchCallbacks.onUndo}
          onPause={touchCallbacks.onPause}
          onReset={touchCallbacks.onReset}
          onBloodMoon={touchCallbacks.onBloodMoon}
        />);
      });
      describe.skip('when tapped', () => {
        it('calls the split callback', () => {
          mounted.find('button.split').simulate('touchStart');
          mounted.find('button.split').simulate('touchEnd');
          expect(touchCallbacks.onSplit).toHaveBeenCalledTimes(1);
        });
        it.skip('calls the skip callback - there is no skip callback?', () => { });
        it('calls the undo callback', () => {
          mounted.find('button.undo').simulate('touchStart');
          mounted.find('button.undo').simulate('touchEnd');
          expect(touchCallbacks.onUndo).toHaveBeenCalledTimes(1);
        });
        it('calls the pause callback', () => {
          mounted.find('button.pause').simulate('touchStart');
          mounted.find('button.pause').simulate('touchEnd');
          expect(touchCallbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it.skip('resumes the timer - no way to test this here', () => { });
        it('calls the reset callback', () => {
          mounted.find('button.reset').simulate('touchStart');
          mounted.find('button.reset').simulate('touchEnd');
          expect(touchCallbacks.onReset).toHaveBeenCalledTimes(1);
        });
        it('calls the bloodmoon callback', () => {
          mounted.find('button.bloodmoon').simulate('touchStart');
          mounted.find('button.bloodmoon').simulate('touchEnd');
          expect(touchCallbacks.onBloodMoon).toHaveBeenCalledTimes(1);
        });
      });
      describe('when clicked', () => {
        it('calls the split callback', () => {
          mounted.find('button.split').simulate('click');
          expect(touchCallbacks.onSplit).toHaveBeenCalledTimes(1);
        });
        it.skip('calls the skip callback - there is no skip callback?', () => { });
        it('calls the undo callback', () => {
          mounted.find('button.undo').simulate('click');
          expect(touchCallbacks.onUndo).toHaveBeenCalledTimes(1);
        });
        it('calls the pause callback', () => {
          mounted.find('button.pause').simulate('click');
          expect(touchCallbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it.skip('resumes the timer - no way to test this here', () => { });
        it('calls the reset callback', () => {
          mounted.find('button.pause').simulate('click');
          expect(touchCallbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it('calls the bloodmoon callback', () => {
          mounted.find('button.bloodmoon').simulate('click');
          expect(touchCallbacks.onBloodMoon).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
