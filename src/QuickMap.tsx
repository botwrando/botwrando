import React from "react";
import { Shrine } from "./shrines";
import "./WorldMap.scss";
export type QuickMapProps = {
	shrine?: Shrine;
};

export const QuickMap = (props: QuickMapProps) => {
	const { shrine } = props;
	if (!shrine) {
		return <></>;
	}
	// const imgPath = `./map/${shrine?.index}.jpg`;
	// console.log(imgPath);
	// const imgUrl = require(imgPath);
	// console.log(imgUrl);
	const bgClasses = ["mapwrapper"];
	if (shrine) bgClasses.push(`bg-${shrine.index}`);
	return (
		<div className="worldmap">
			<div className={bgClasses.join(" ")}></div>
		</div>
	);
};
