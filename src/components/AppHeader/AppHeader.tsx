import { Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React from 'react';
import { getDefaultRun, Run } from '../../lib/run';

type AppHeaderProps = {
  hasSeed?: boolean;
  setRun: (run: Run) => void;
};

export function AppHeader({ hasSeed, setRun }: AppHeaderProps) {
  const onQuit = () => setRun(getDefaultRun());
  return (
    <div className="header">
      <div className="caption">BotW All Shrines Randomizer</div>
      {hasSeed && (
        <Button
          id="quit"
          startIcon={<ArrowBack />}
          onClick={onQuit}
        >
          Quit run
        </Button>
      )}
    </div>
  );
}
