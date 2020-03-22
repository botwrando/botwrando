import React from "react";
import { smart_format } from "../../lib/time";

export type FormattedTimeProps = {
	timestamp?: number;
	full_format?: boolean;
	plus_sign?: string;
	empty_label?: string;
};

export const FormattedTime = (props: FormattedTimeProps) => {
	const p = {
		timestamp: 0,
		full_format: false,
		plus_sign: "",
		empty_label: "--:--",
		...props
	}
	const { sign, h, m, s, ms } = smart_format(p.timestamp, p.full_format);
	return (
		<>
			{sign && (<><span className="sign">{sign}</span>:</>)}
			{h && (<><span className="h">{h}</span>:</>)}
			{m && (<><span className="m">{m}</span>:</>)}
			{s && (<><span className="s">{s}</span></>)}
			{ms && (<><span className="ms">.{ms}</span></>)}
			{(!h && !m && !s && !ms) && (<span className="empty">{p.empty_label}</span>)}
		</>
	);
};
