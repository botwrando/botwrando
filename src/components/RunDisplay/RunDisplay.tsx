import React from 'react';
import { Run } from '../../lib/run';
import { Waypoint } from '../../lib/waypoint';
import { QuickMap } from '../QuickMap/QuickMap';
import { SplitHistory } from '../SplitHistory/SplitHistory';
import { SplitTimer } from '../SplitTimer/SplitTimer';

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
        currentWaypoint={run.splits.size}
        onUpdatePausedTime={onUpdatePausedTime}
      />
      <QuickMap waypoint={Waypoint.byId(run.waypointIds[run.splits.size])} />
    </div>
  );
}
