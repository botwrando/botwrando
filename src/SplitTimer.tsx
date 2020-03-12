import React, { useEffect, useState } from "react";
import { Run, RunState } from "./Run";
import { RunTimer } from "./RunTimer";
import { getShrine } from "./shrines";

export type SplitTimerProps = {
	run: Run;
	currentShrine: number;
	onUpdatePausedTime: (paused_time: number) => void;
};

export const SplitTimer = (props: SplitTimerProps) => {
	const [timestamp, setTimestamp] = useState(-1);
	const [timeclasses, setTimeclasses] = useState(["time"]);

	const { run, currentShrine } = props;

	const shrine_id = run.shrine_ids[currentShrine];
	const current_shrine = getShrine(shrine_id);

	useEffect(() => {
		setTimestamp(run.rundate);
	}, [run.rundate]);

	useEffect(() => {
		const time_classes = ["time"];
		if (run.state === RunState.Default) {
			time_classes.push("is-initial");
		}
		if (run.state === RunState.Paused) {
			time_classes.push("is-paused");
		}
		setTimeclasses(time_classes);
	}, [run.state]);

	return (
		<div className="shrine current">
			<div className="counter">
				{currentShrine > -1 ? currentShrine + 1 : ""}
			</div>

			<div className="name">
				{current_shrine?.name ? current_shrine.name : "Ready to go"}
			</div>

			<div className="desc">
				{current_shrine?.desc
					? current_shrine.desc
					: "Start the timer to reveal the first shrine!"}
			</div>

			<div className={timeclasses.join(" ")}>
				<RunTimer
					timestamp={timestamp}
					runstate={run.state}
					onUpdatePausedTime={props.onUpdatePausedTime}
				/>
			</div>
		</div>
	);
};
