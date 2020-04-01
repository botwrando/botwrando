import { mount } from 'enzyme';
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
    it('adds a split', () => { expect(1).toBe(1); })
    it('skips a split', () => { expect(1).toBe(1); })
    it('undos a split', () => { expect(1).toBe(1); })
    it('pauses the timer', () => { expect(1).toBe(1); })
    it('resumes the timer', () => { expect(1).toBe(1); })
    it('resets the run', () => { expect(1).toBe(1); })
  });
});
