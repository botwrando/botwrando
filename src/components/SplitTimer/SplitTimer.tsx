import React, { useEffect, useState } from "react";
import { Run, RunState } from "../../lib/run";
import { RunTimer } from "../RunTimer/RunTimer";
import { getShrine } from "../../lib/shrines";

export type SplitTimerProps = {
	run: Run;
	currentShrine: number;
	onUpdatePausedTime: (paused_time: number) => void;
};

export const SplitTimer = (props: SplitTimerProps) => {
	const { run } = props;

	let out = <></>;

	if (run.state === RunState.Ended) {
		out = <Ended />;
	} else {
		out = <RunDisplay {...props} />;
	}

	return <>{out}</>;
};

const _NotStarted = () => <>Not started</>;
const _Paused = () => <>Paused</>;
const Ended = () => <>Ended</>;

const RunDisplay = (props: SplitTimerProps) => {
	const { run, currentShrine } = props;
	const shrine_id = run.shrineIds[currentShrine];
	const current_shrine = getShrine(shrine_id);

	const [timestamp, setTimestamp] = useState(-1);
	const [timeclasses, setTimeclasses] = useState(["time"]);
	useEffect(() => {
		const time_classes = ["time"];
		if (run.state === RunState.Init) {
			time_classes.push("is-initial");
		}
		if (run.state === RunState.Paused) {
			time_classes.push("is-paused");
		}
		if (run.state === RunState.Ended) {
			time_classes.push("is-ended");
		}
		setTimeclasses(time_classes);
	}, [run.state]);

	useEffect(() => {
		setTimestamp(run.rundate);
	}, [run.rundate]);

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
