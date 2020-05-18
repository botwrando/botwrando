import React, { useEffect, useState } from 'react';
import { Run, RunState } from '../../lib/run';
import { getWaypoint } from '../../lib/waypoints';
import { RunTimer } from '../RunTimer/RunTimer';

export type SplitTimerProps = {
  run: Run;
  currentWaypoint: number;
  onUpdatePausedTime: (paused_time: number) => void;
};

export const SplitTimer = (props: SplitTimerProps) => {
  const { run, currentWaypoint } = props;
  const waypoint_id = run.waypointIds[currentWaypoint];
  const current_waypoint = getWaypoint(waypoint_id);

  const [timeclasses, setTimeclasses] = useState(['time']);

  useEffect(() => {
    const time_classes = ['time'];
    if (run.state === RunState.Init) time_classes.push('is-initial');
    if (run.state === RunState.Paused) time_classes.push('is-paused');
    if (run.state === RunState.Ended) time_classes.push('is-ended');
    setTimeclasses(time_classes);
  }, [run.state]);

  const getDetailsProps = () => {
    if (run.state !== RunState.Ended) {
      return {
        counter: currentWaypoint > -1 ? currentWaypoint + 1 : '',
        name: current_waypoint?.name ? current_waypoint.name : 'Ready to go',
        desc: current_waypoint?.desc
          ? current_waypoint.desc
          : 'Start the timer to reveal the first shrine!'
      };
    } else {
      return {
        counter: '',
        name: 'Congratulations!',
        desc: `You've completed ${run.seed}`
      };
    }
  };
  return (
    <div className="waypoint current">
      <SplitDetails {...getDetailsProps()} />
      <div className={timeclasses.join(' ')}>
        <RunTimer run={run} setPausedTime={props.onUpdatePausedTime} />
      </div>
    </div>
  );
};

const SplitDetails = (props: {
  counter: String | Number;
  name: String;
  desc: String;
}) => (
  <>
    <div className="counter">{props.counter}</div>
    <div className="name">{props.name}</div>
    <div className="desc"> {props.desc} </div>
  </>
);
