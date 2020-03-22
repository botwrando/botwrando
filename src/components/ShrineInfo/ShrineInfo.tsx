import React from "react";
import { FormattedTime } from "../FormattedTime/FormattedTime";
import "./ShrineInfo.scss";
import { getShrine } from "../../lib/shrines";

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

	const diffProps = {
		timestamp: props.diff,
		plus_sign: "+",
		empty_label: "--"
	};
	const diff_ts = props.diff ? <FormattedTime {...diffProps} /> : "";
	const ts = <FormattedTime timestamp={props.timestamp} />;

	const diff_classes = ["diff"];
	if (props.is_ahead) diff_classes.push("is-ahead");
	if (props.is_pb) diff_classes.push("is-pb");

	return (
		<div className="shrine infolog">
			<div className="counter">{props.counter + 1}</div>
			<div className="name">{current_shrine?.name}</div>
			<div className={diff_classes.join(" ")}>{diff_ts}</div>
			<div className="time">{ts}</div>
		</div>
	);
};
