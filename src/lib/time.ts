const HOUR_THRES = 1000 * 60 * 60;
const MINUTE_THRES = 1000 * 60;

export type Timestamp = {
	sign?: string;
	h?: string;
	m?: string;
	s?: string;
	ms?: string;
};

const trunc = (ts: number) => {
	if (ts < 10) {
		return 0;
	}
	return Math.floor(ts / 10);
};

const pad = (ts: number) => {
	return ts < 10 ? `0${ts}` : `${ts}`;
};

const getTimestamp = (ts: number): Timestamp => {
	const h = Math.floor(ts / HOUR_THRES);
	ts -= h * HOUR_THRES;
	const m = Math.floor(ts / MINUTE_THRES);
	ts -= m * MINUTE_THRES;
	const s = Math.floor(ts / 1000);
	ts -= s * 1000;
	const ms = ts;
	return { h: pad(h), m: pad(m), s: pad(s), ms: pad(trunc(ms)) };
};

export const smart_format = (
	timestamp: number,
	full_format: boolean,
	pos_sign: string = "",
): Timestamp => {
	if (timestamp == Number.NEGATIVE_INFINITY) {
		return {}
	}
	const sign = timestamp >= 0 ? pos_sign : "-";
	const { h, m, s, ms } = getTimestamp(timestamp);

	let out = {};

	if (timestamp >= HOUR_THRES)
		out = full_format ? { h, m, s, ms } : { h, m, s };
	if (timestamp >= MINUTE_THRES) 
		out = full_format ? { m, s, ms } : { m, s };
	else 
		out = { s, ms };
	out = { ...out, sign };

	return out;
};
