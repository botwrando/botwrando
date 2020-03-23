const HOUR_THRES = 1000 * 60 * 60;
const MINUTE_THRES = 1000 * 60;

export type Timestamp = {
	sign?: string;
	h?: string;
	m?: string;
	s?: string;
	ms?: string;
};

export const trunc = (ts: number) => {
	if (ts < 10) {
		return 0;
	}
	return Math.floor(ts / 10);
};

export const pad = (ts: number, zpad: number = 2) => {
	let out = ts.toString();
	while (out.length < zpad) {
		out = '0' + out;
	}
	return out.substr(0, (zpad > 0 ? Math.max(zpad, out.length) : out.length));
};

export const getTimestamp = (ts: number): Timestamp => {
	let tsMagn: number = Math.abs(ts);
	const h = Math.floor(tsMagn / HOUR_THRES);
	tsMagn -= h * HOUR_THRES;
	const m = Math.floor(tsMagn / MINUTE_THRES);
	tsMagn -= m * MINUTE_THRES;
	const s = Math.floor(tsMagn / 1000);
	tsMagn -= s * 1000;
	const ms = tsMagn;
	return { h: pad(h), m: pad(m), s: pad(s), ms: pad(trunc(ms)) };
};

export const smart_format = (
	timestamp: number,
	full_format: boolean,
	pos_sign: string = "",
): Timestamp => {
	if (timestamp === Number.NEGATIVE_INFINITY) {
		return {}
	}
	const sign = timestamp >= 0 ? pos_sign : "-";
	const { h, m, s, ms } = getTimestamp(timestamp);

	let out = {};

	if (Math.abs(timestamp) >= HOUR_THRES)
		out = full_format ? { h, m, s, ms } : { h, m, s };
	else if (Math.abs(timestamp) >= MINUTE_THRES) 
		out = full_format ? { m, s, ms } : { m, s };
	else 
		out = { s, ms };
	out = { ...out, sign };

	return out;
};
