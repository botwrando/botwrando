import React from 'react';
import { Run, getDefaultRun } from '../../lib/run';

type AppHeaderProps = {
  setRun: (run: Run) => void;
}

export function AppHeader ({ setRun }: AppHeaderProps) {
  const onQuit = () => setRun(getDefaultRun());
  return (
    <div className="header">
      <div className="caption">BotW All Shrines Randomizer</div>
      <button className="btn-text btn-back" onClick={onQuit}>
        Quit run
      </button>
    </div>
  );
}
