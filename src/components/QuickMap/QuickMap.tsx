import React from "react";
import { Shrine } from "../../lib/shrines";
import "../WorldMap/WorldMap.scss";
export type QuickMapProps = {
	shrine?: Shrine;
};

export const QuickMap = (props: QuickMapProps) => {
	const { shrine } = props;
	if (!shrine) {
		return <></>;
	}
	const bgClasses = ["mapwrapper"];
	if (shrine) bgClasses.push(`bg-${shrine.index}`);
	return (
		<div className="worldmap">
			<div className={bgClasses.join(" ")}></div>
		</div>
	);
};
