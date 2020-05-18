import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { Run } from '../../lib/run';
import { WaypointInfo } from '../WaypointInfo/WaypointInfo';

const WaypointList = (
  waypoint_id: number,
  rando_id: number,
  timestamp: number,
  diff: number,
  is_pb: boolean
) => (
  <WaypointInfo
    key={waypoint_id}
    waypoint_id={waypoint_id}
    counter={rando_id}
    timestamp={timestamp}
    diff={diff}
    is_ahead={diff <= 0}
    is_pb={is_pb}
  />
);

export type SplitHistoryProps = {
  run: Run;
};

export const SplitHistory = (props: SplitHistoryProps) => {
  const { run } = props;

  const has_split = (rando_id: number) => run.splits.get(rando_id);

  const get_split = (rando_id: number) => {
    const split = run.splits.get(rando_id);
    return split ? split : Number.NEGATIVE_INFINITY;
  };

  const get_diff = (rando_id: number): number => {
    const curr_split = run.splits.get(rando_id);
    const other_split = run.wrSplits.get(rando_id);
    if (curr_split && other_split) return curr_split - other_split;

    return Number.NEGATIVE_INFINITY;
  };

  const get_is_pb = (rando_id: number) => {
    const curr_split = run.splits.get(rando_id);
    const pb_split = run.pbSplits.get(rando_id);
    if (curr_split && pb_split) return curr_split - pb_split < 0;

    return false;
  };

  return (
    <div className="history">
      <ScrollableFeed forceScroll={true} className="historylist">
        {run.waypointIds
          .filter((waypoint_id, rando_id) => has_split(rando_id))
          .map((waypoint_id, rando_id) =>
            WaypointList(
              waypoint_id,
              rando_id,
              get_split(rando_id),
              get_diff(rando_id),
              get_is_pb(rando_id)
            )
          )}
      </ScrollableFeed>
    </div>
  );
};
