import "./ShrineInfo.scss";
import React from "react";
import { getShrine } from "./shrines";
import { format_time } from "./lib/time";

export type ShrineInfoProps = {
	counter: number;
	shrine_id: number;
	timestamp: number;
	is_main?: boolean;
	diff?: number;
	is_ahead?: boolean;
	is_pb?: boolean;
};

export const ShrineInfo = (props: ShrineInfoProps) => {
	const current_shrine = getShrine(props.shrine_id);

	const diff_label = props.diff ? format_time(props.diff, "--", "+") : "";
	const timestamp_label = format_time(props.timestamp);

	const diff_classes = ["diff"];
	if (props.is_ahead) diff_classes.push("is-ahead");
	if (props.is_pb) diff_classes.push("is-pb");

	return (
		<div className="shrine infolog">
			<div className="counter">{props.counter + 1}</div>
			<div className="name">{current_shrine?.name}</div>
			<div className={diff_classes.join(" ")}>{diff_label}</div>
			<div className="time">{timestamp_label}</div>
		</div>
	);
};
