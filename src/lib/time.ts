import { format } from "date-fns";

const DAY_THRES = 1000 * 60 * 60 * 24;
const HOUR_THRES = 1000 * 60 * 60;
const MINUTE_THRES = 1000 * 60;

const smart_format = (
	timestamp: number,
	pos_sign?: string,
	full_format = false
): string => {
	const sign = timestamp >= 0 ? (pos_sign ? pos_sign : "") : "-";

	const out = (fmt: string) => `${sign}${format(timestamp, fmt)}`;

	if (timestamp >= DAY_THRES)
		return full_format ? out("d H:mm:ss.SS") : out("d H:mm");
	if (timestamp >= HOUR_THRES)
		return full_format ? out("H:mm:ss.SS") : out("H:mm:ss");
	if (timestamp >= MINUTE_THRES)
		return full_format ? out("mm:ss.SS") : out("mm:ss");
	return out("s.SS");
};

export const format_time = (
	timestamp: number,
	empty_label: string = "--:--",
	pos_sign = ""
): string => {
	if (timestamp !== -1) return smart_format(timestamp, pos_sign);
	return empty_label;
};

export const format_time_full = (
	timestamp: number,
	empty_label: string = "--:--",
	pos_sign = ""
): string => {
	if (timestamp !== -1) return smart_format(timestamp, pos_sign, true);
	return empty_label;
};
