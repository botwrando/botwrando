import React from 'react';
import { HotkeyList } from '../HotkeyList/HotkeyList';
import { Run } from '../../lib/run';

type MobileProps = {
  run: Run;
  onSplit: (event: React.MouseEvent | React.TouchEvent) => void;
	onUndo: (event: React.MouseEvent | React.TouchEvent) => void;
	onReset: (event: React.MouseEvent | React.TouchEvent) => void;
	onPause: (event: React.MouseEvent | React.TouchEvent) => void;
	onBloodMoon: (event: React.MouseEvent | React.TouchEvent) => void;
};

export const MobileControls = (props: MobileProps) => {
  return (
    <div className="touchpanel">
      <button className="split" onClick={props.onSplit} onTouchEnd={props.onSplit}>
				Split
      </button>
      <button className="undo" onClick={props.onUndo} onTouchEnd={props.onSplit}>
				Undo
      </button>
      <button className="pause" onClick={props.onPause} onTouchEnd={props.onSplit}>
				Pause
      </button>
      <button className="reset" onClick={props.onReset} onTouchEnd={props.onSplit}>
				Reset
      </button>
      <button className="bloodmoon" onClick={props.onBloodMoon} onTouchEnd={props.onSplit}>
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
