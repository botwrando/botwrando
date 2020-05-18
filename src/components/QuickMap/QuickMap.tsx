import React from 'react';
import { Waypoint } from '../../lib/waypoints';
import '../WorldMap/WorldMap.scss';
export type QuickMapProps = {
	waypoint?: Waypoint;
};

export const QuickMap = (props: QuickMapProps) => {
  const { waypoint } = props;
  if (!waypoint) {
    return <></>;
  }
  const bgClasses = ['mapwrapper'];
  if (waypoint) bgClasses.push(`bg-${waypoint.index}`);
  return (
    <div className="worldmap">
      <div className={bgClasses.join(' ')}></div>
    </div>
  );
};
