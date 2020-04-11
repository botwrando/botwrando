import React from 'react';
import { HotkeyList } from '../HotkeyList/HotkeyList';
import { Run } from '../../lib/run';

type MobileProps = {
  run: Run;
  touchCallbacks: {
    onSplit: (event: React.TouchEvent) => void;
    onUndo: (event: React.TouchEvent) => void;
    onReset: (event: React.TouchEvent) => void;
    onPause: (event: React.TouchEvent) => void;
    onBloodMoon: (event: React.TouchEvent) => void;
  },
  mouseCallbacks: {
    onSplit: (event: React.MouseEvent) => void;
    onUndo: (event: React.MouseEvent) => void;
    onReset: (event: React.MouseEvent) => void;
    onPause: (event: React.MouseEvent) => void;
    onBloodMoon: (event: React.MouseEvent) => void;
  }
};

export const MobileControls = (props: MobileProps) => {
  const mouse = props.mouseCallbacks;
  const touch = props.touchCallbacks;

  return (
    <div className="touchpanel">
      <button className="split" onClick={mouse.onSplit} onTouchEnd={touch.onSplit}>
        Split
      </button>
      <button className="undo" onClick={mouse.onUndo} onTouchEnd={touch.onUndo}>
        Undo
      </button>
      <button className="pause" onClick={mouse.onPause} onTouchEnd={touch.onPause}>
        Pause
      </button>
      <button className="reset" onClick={mouse.onReset} onTouchEnd={touch.onReset}>
        Reset
      </button>
      <button className="bloodmoon" onClick={mouse.onBloodMoon} onTouchEnd={touch.onBloodMoon}>
        Blood Moon
      </button>
    </div>
  );
};

type DesktopProps = {
	run: Run;
	showHelp: boolean;
};

export const DesktopHelp = (props: DesktopProps) => {
  const { run, showHelp } = props;
  return (
    <div className={`help ${showHelp ? 'is-visible' : ''}`}>
      {!showHelp && (
        <>
          <div className="helphint">
            <span className="key">Space</span> to start / split
            &nbsp;
            <span className="key">H</span> to show / hide help
          </div>
        </>
      )}
      {showHelp && (
        <>
          <div className="instructions">
            <Instructions run={run} />
          </div>
          <div className="hotkeys">
            <HotkeyList />
          </div>
        </>
      )}
    </div>
  );
};

export const Instructions = (props: { run: Run }) => {
  const { run } = props;
  return (
    <>
      <p>
				All shrines except the Blood Moon shrine has been shuffled using
				the seed {run.seed}.
      </p>
      <p>
				Hit <span className="key">B</span> to insert a Blood Moon shrine
				split.
      </p>
    </>
  );
};
