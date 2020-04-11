import React from 'react';
import { Run } from '../../lib/run';
import { DesktopHelp, MobileControls } from '../Help/Help';

export type AppFooterProps = {
  run: Run,
  touchCallbacks: {
    onSplit: (event: React.TouchEvent) => void,
    onUndo: (event: React.TouchEvent) => void,
    onReset: (event: React.TouchEvent) => void,
    onPause: (event: React.TouchEvent) => void,
    onBloodMoon: (event: React.TouchEvent) => void,
  },
  mouseCallbacks: {
    onSplit: (event: React.MouseEvent) => void,
    onUndo: (event: React.MouseEvent) => void,
    onReset: (event: React.MouseEvent) => void,
    onPause: (event: React.MouseEvent) => void,
    onBloodMoon: (event: React.MouseEvent) => void,
  },
  showHelp: boolean,
};

export function AppFooter({ run, touchCallbacks, mouseCallbacks, showHelp }: AppFooterProps) {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  return run.seed !== '' ? (
    <div className="footer">
      {isTouch ? (
        <MobileControls
          run={run}
          touchCallbacks={touchCallbacks}
          mouseCallbacks={mouseCallbacks}
        />
      ) : (
        <DesktopHelp run={run} showHelp={showHelp} />
      )}
    </div>
  ) : (
    <></>
  );
};
