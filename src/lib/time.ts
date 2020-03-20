const HOUR_THRES = 1000 * 60 * 60;
const MINUTE_THRES = 1000 * 60;

type Timestamp = {
	h: string;
	m: string;
	s: string;
	ms: string;
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

const smart_format = (
	timestamp: number,
	pos_sign: string = "",
	full_format = false
): string => {
	const sign = timestamp >= 0 ? pos_sign : "-";
	const ts = getTimestamp(timestamp);

	const out = (fmt_ts: string) => `${sign}${fmt_ts}`;

	if (timestamp >= HOUR_THRES)
		return full_format
			? out(`${ts.h}:${ts.m}:${ts.s}.${ts.ms}`)
			: out(`${ts.h}:${ts.m}:${ts.s}`);
	if (timestamp >= MINUTE_THRES)
		return full_format
			? out(`${ts.m}:${ts.s}.${ts.ms}`)
			: out(`${ts.m}:${ts.s}`);
	return out(`${ts.s}.${ts.ms}`);
};

export const format_time = (
	timestamp: number,
	empty_label = "--:--",
	pos_sign = "",
	full_fmt = false
): string => {
	if (timestamp !== -1) return smart_format(timestamp, pos_sign, full_fmt);
	return empty_label;
};
