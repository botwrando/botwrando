import React from 'react';
import { Run } from '../../lib/run';
import { DesktopHelp, MobileControls } from '../Help/Help';

export type AppFooterProps = {
  run: Run,
  callbacks: {
    onSplit: (event: React.SyntheticEvent) => void,
    onUndo: (event: React.SyntheticEvent) => void,
    onReset: (event: React.SyntheticEvent) => void,
    onPause: (event: React.SyntheticEvent) => void,
    onBloodMoon: (event: React.SyntheticEvent) => void,
  },
  showHelp: boolean,
};

export function AppFooter({ run, callbacks, showHelp }: AppFooterProps) {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  return run.seed !== '' ? (
    <div className="footer">
      {isTouch ? (
        <MobileControls run={run} callbacks={callbacks} />
      ) : (
        <DesktopHelp run={run} showHelp={showHelp} />
      )}
    </div>
  ) : (
    <></>
  );
};
