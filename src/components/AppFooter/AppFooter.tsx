import React from 'react';
import { Run } from '../../lib/run';
import { DesktopHelp, MobileControls } from '../Help/Help';

export type AppFooterProps = {
  run: Run,
  touchCallbacks: {
    onSplit: (event: React.MouseEvent) => void
    onUndo: (event: React.MouseEvent) => void
    onReset: (event: React.MouseEvent) => void
    onPause: (event: React.MouseEvent) => void
    onBloodMoon: (event: React.MouseEvent) => void
  },
  showHelp: boolean
}

export function AppFooter ({ run, touchCallbacks, showHelp }: AppFooterProps) {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  return (
    <div className="footer">
      {isTouch?(
        <MobileControls
          run = { run }
          onSplit = { touchCallbacks.onSplit }
          onUndo = { touchCallbacks.onUndo }
          onReset = { touchCallbacks.onReset }
          onPause = { touchCallbacks.onPause }
          onBloodMoon = { touchCallbacks.onBloodMoon }
        />
      ): (
        <DesktopHelp run = { run } showHelp = { showHelp } />
      )}
    </div>
  );
}
