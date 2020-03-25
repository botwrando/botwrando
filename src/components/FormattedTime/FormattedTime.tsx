import React from "react";
import { smartFormat } from "../../lib/time";

export type FormattedTimeProps = {
	timestamp?: number;
	fullFormat?: boolean;
	plusSign?: string;
	emptyLabel?: string;
};

export const FormattedTime = (props: FormattedTimeProps) => {
	const p = {
		timestamp: 0,
		fullFormat: false,
		plusSign: "",
		emptyLabel: "--:--",
		...props
	}
	const { sign, h, m, s, ms } = smartFormat(p.timestamp, p.fullFormat);
	return (
		<>
			{sign && (<><span className="sign">{sign}</span>:</>)}
			{h && (<><span className="h">{h}</span>:</>)}
			{m && (<><span className="m">{m}</span>:</>)}
			{s && (<><span className="s">{s}</span></>)}
			{ms && (<><span className="ms">.{ms}</span></>)}
			{(!h && !m && !s && !ms) && (<span className="empty">{p.emptyLabel}</span>)}
		</>
	);
};
