import React from 'react';
import ReactDOM from 'react-dom';
import { DesktopHelp, MobileControls } from './Help';
import { Run, getDefaultRun } from '../../lib/run';

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
  });
});
