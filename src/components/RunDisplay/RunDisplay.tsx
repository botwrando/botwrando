import React from 'react';
import { Run, RunState } from '../../lib/run';
import { getWaypoint } from '../../lib/waypoints';
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
      {(run.state !== RunState.Ended) ? (
        <QuickMap waypoint={getWaypoint(run.waypointIds[run.splits.size])} />
      ) : (
        <></>
      )}
    </div>
  );
}
