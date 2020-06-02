import React from 'react';
import { getWaypoint } from '../../lib/waypoints';
import { FormattedTime } from '../FormattedTime/FormattedTime';
import './WaypointInfo.scss';
import { Typography } from '@material-ui/core';

export type WaypointInfoProps = {
  counter: number;
  waypoint_id: number;
  timestamp: number;
  is_main?: boolean;
  diff?: number;
  is_ahead?: boolean;
  is_pb?: boolean;
};

export const WaypointInfo = React.memo((props: WaypointInfoProps) => {
  const current_wp = getWaypoint(props.waypoint_id);

  const diffProps = {
    timestamp: props.diff,
    plus_sign: '+',
    empty_label: '--'
  };
  const diff_ts = props.diff ? <FormattedTime {...diffProps} /> : '';
  const ts = <FormattedTime timestamp={props.timestamp} />;

  const diff_classes = ['diff'];
  if (props.is_ahead) diff_classes.push('is-ahead');
  if (props.is_pb) diff_classes.push('is-pb');

  return (
    <div key={props.waypoint_id} className="waypoint infolog">
      <Typography variant="h6" className="counter">{props.counter + 1}</Typography>
      <Typography variant="h5" className="name">{current_wp?.name}</Typography>
      <Typography variant="h6" className={diff_classes.join(' ')}>{diff_ts}</Typography>
      <Typography variant="h4" className="time">{ts}</Typography>
    </div>
  );
});
