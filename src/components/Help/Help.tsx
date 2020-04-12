import React from 'react';
import { Run } from '../../lib/run';
import { HotkeyList } from '../HotkeyList/HotkeyList';

type MobileProps = {
  run: Run;
  callbacks: {
    onSplit: (event: React.SyntheticEvent) => void;
    onUndo: (event: React.SyntheticEvent) => void;
    onReset: (event: React.SyntheticEvent) => void;
    onPause: (event: React.SyntheticEvent) => void;
    onBloodMoon: (event: React.SyntheticEvent) => void;
  }
};

export const MobileControls = (props: MobileProps) => {
  const { callbacks } = props;

  return (
    <div className="touchpanel">
      <button className="split" onClick={callbacks.onSplit}>
        Split
      </button>
      <button className="undo" onClick={callbacks.onUndo}>
        Undo
      </button>
      <button className="pause" onClick={callbacks.onPause}>
        Pause
      </button>
      <button className="reset" onClick={callbacks.onReset}>
        Reset
      </button>
      <button className="bloodmoon" onClick={callbacks.onBloodMoon}>
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
