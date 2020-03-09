import React, { useState, useEffect } from "react";
import { Shrine } from "./shrines";

export type WorldMapProps = {
	shrine?: Shrine;
};

export const WorldMap = (props: WorldMapProps) => {
	const [location, setLocation] = useState("");
	const [showMap, setShowMap] = useState(false);

	useEffect(() => {
		let zoomLevel = 6;
		let x = props.shrine?.location.x;
		let z = props.shrine?.location.z;
		const locationString = `z${zoomLevel},${x},${z}`;
		if (locationString !== location) {
			setLocation(locationString);
		}
	}, [props.shrine, location]);

	useEffect(() => {
		setShowMap(!!props.shrine);
	}, [props.shrine]);

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
