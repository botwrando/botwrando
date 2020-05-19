import React, { useEffect, useState } from 'react';
import { Waypoint } from '../../lib/waypoints';

export type WorldMapProps = {
	waypoint?: Waypoint;
};

export const WorldMap = (props: WorldMapProps) => {
  const [location, setLocation] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    let zoomLevel = 6;
    let x = props.waypoint?.location.x;
    let z = props.waypoint?.location.z;
    const locationString = `z${zoomLevel},${x},${z}`;
    if (locationString !== location) {
      setLocation(locationString);
    }
  }, [props.waypoint, location]);

  useEffect(() => {
    setShowMap(!!props.waypoint);
  }, [props.waypoint]);

  return (
    <div className="worldmap">
      <div className="mapwrapper">
        {showMap && <MapFrame location={location} />}
      </div>
    </div>
  );
};

type MapFrameProps = {
	location: string;
};

const MapFrame = (props: MapFrameProps) => {
  return (
    <iframe
      title="BOTW map"
      key={props.location}
      className="mapframe"
      src={`https://objmap.zeldamods.org/#/map/${props.location}`}
    ></iframe>
  );
};
