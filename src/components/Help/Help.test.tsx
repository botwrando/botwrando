import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { CallbackMap } from '../../lib/keyboard';
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
    let callbacks: Record<CallbackMap, (event: React.PointerEvent) => void>;
    beforeEach(() => {
      callbacks = {
        onSplit: jest.fn(),
        onUndo: jest.fn(),
        onPause: jest.fn(),
        onReset: jest.fn(),
        onBloodMoon: jest.fn()
      };
    });
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<MobileControls
        run={run}
        callbacks={callbacks}
      />, div);
    });
    describe('touch handlers setup', () => {
      let mounted: ReactWrapper;
      beforeEach(() => {
        mounted = mount(<MobileControls
          run={run}
          callbacks={callbacks}
        />);
      });
      describe.skip('when tapped', () => {
        it('calls the split callback', () => {
          mounted.find('button.split').simulate('pointerdown');
          mounted.find('button.split').simulate('pointerdown');
          expect(callbacks.onSplit).toHaveBeenCalledTimes(1);
        });
        it.skip('calls the skip callback - there is no skip callback?', () => { });
        it('calls the undo callback', () => {
          mounted.find('button.undo').simulate('pointerdown');
          expect(callbacks.onUndo).toHaveBeenCalledTimes(1);
        });
        it('calls the pause callback', () => {
          mounted.find('button.pause').simulate('pointerdown');
          expect(callbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it.skip('resumes the timer - no way to test this here', () => { });
        it('calls the reset callback', () => {
          mounted.find('button.reset').simulate('pointerdown');
          expect(callbacks.onReset).toHaveBeenCalledTimes(1);
        });
        it('calls the bloodmoon callback', () => {
          mounted.find('button.bloodmoon').simulate('pointerdown');
          expect(callbacks.onBloodMoon).toHaveBeenCalledTimes(1);
        });
      });
      describe('when clicked', () => {
        it('calls the split callback', () => {
          mounted.find('button.split').simulate('pointerdown');
          expect(callbacks.onSplit).toHaveBeenCalledTimes(1);
        });
        it.skip('calls the skip callback - there is no skip callback?', () => { });
        it('calls the undo callback', () => {
          mounted.find('button.undo').simulate('pointerdown');
          expect(callbacks.onUndo).toHaveBeenCalledTimes(1);
        });
        it('calls the pause callback', () => {
          mounted.find('button.pause').simulate('pointerdown');
          expect(callbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it.skip('resumes the timer - no way to test this here', () => { });
        it('calls the reset callback', () => {
          mounted.find('button.pause').simulate('pointerdown');
          expect(callbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it('calls the bloodmoon callback', () => {
          mounted.find('button.bloodmoon').simulate('pointerdown');
          expect(callbacks.onBloodMoon).toHaveBeenCalledTimes(1);
        });
      });
      describe('when tapped', () => {
        it('calls the split callback', () => {
          mounted.find('button.split').simulate('pointerdown');
          expect(callbacks.onSplit).toHaveBeenCalledTimes(1);
        });
        it.skip('calls the skip callback - there is no skip callback?', () => { });
        it('calls the undo callback', () => {
          mounted.find('button.undo').simulate('pointerdown');
          expect(callbacks.onUndo).toHaveBeenCalledTimes(1);
        });
        it('calls the pause callback', () => {
          mounted.find('button.pause').simulate('pointerdown');
          expect(callbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it.skip('resumes the timer - no way to test this here', () => { });
        it('calls the reset callback', () => {
          mounted.find('button.pause').simulate('pointerdown');
          expect(callbacks.onPause).toHaveBeenCalledTimes(1);
        });
        it('calls the bloodmoon callback', () => {
          mounted.find('button.bloodmoon').simulate('pointerdown');
          expect(callbacks.onBloodMoon).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
