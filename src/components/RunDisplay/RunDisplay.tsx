import React from 'react';
import { Run } from '../../lib/run';
import { getShrine } from '../../lib/shrines';
import { SplitHistory } from '../SplitHistory/SplitHistory';
import { SplitTimer } from '../SplitTimer/SplitTimer';
import { QuickMap } from '../QuickMap/QuickMap';

type RunDisplayProps = {
  run: Run,
  onUpdatePausedTime: (pausedTime: number) => void
}

export function RunDisplay({ run, onUpdatePausedTime }: RunDisplayProps) {
  return (
    <div className="run-display">
      <SplitHistory run={run} />
      <SplitTimer
        run={run}
        currentShrine={run.splits.size}
        onUpdatePausedTime={onUpdatePausedTime}
      />
      <QuickMap shrine={getShrine(run.shrineIds[run.splits.size])} />
    </div>
  );
}
