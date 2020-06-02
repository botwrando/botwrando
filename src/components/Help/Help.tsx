import { Button } from '@material-ui/core';
import React from 'react';
import { Run } from '../../lib/run';
import { defaultButtonAttrs } from '../App/App';
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
      <Button {...{...defaultButtonAttrs, className:'split', onClick:callbacks.onSplit}}>
        Split
      </Button>
      <Button {...{...defaultButtonAttrs, className:'undo' ,onClick:callbacks.onUndo}}>
        Undo
      </Button>
      <Button {...{...defaultButtonAttrs, className:'pause', onClick:callbacks.onPause}}>
        Pause
      </Button>
      <Button {...{...defaultButtonAttrs, className:'reset', onClick:callbacks.onReset}}>
        Reset
      </Button>
      <Button {...{...defaultButtonAttrs, className:'bloodmoon', onClick:callbacks.onBloodMoon}}>
        Blood Moon
      </Button>
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
