import React from 'react';
import ReactDOM from 'react-dom';
import { WaypointInfo } from './WaypointInfo';

describe('WaypointInfo', () => {
  it('renders without crashing', () => {
    const counter = 34;
    const waypoint_id = 23;
    const timestamp = 354;
    const is_main = true;
    const diff = 12;
    const is_ahead = false;
    const is_pb = false;

    const div = document.createElement('div');
    ReactDOM.render(
      <WaypointInfo
        counter={counter}
        waypoint_id={waypoint_id}
        timestamp={timestamp}
        is_main={is_main}
        diff={diff}
        is_ahead={is_ahead}
        is_pb={is_pb}
      />, div);
  });
});
