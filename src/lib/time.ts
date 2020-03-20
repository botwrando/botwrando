const SECONDS_MULTIPLIER = 1000;
const MINUTES_MULTIPLIER = 1000 * 60;
const HOURS_MULTIPLIER = 1000 * 60 * 60;
const DAYS_MULTIPLIER = 1000 * 60 * 60 * 24;

const smart_format = (
	timestamp: number,
	pos_sign?: string,
	full_format = false
): string => {
	const sign = timestamp >= 0 ? (pos_sign ? pos_sign : "") : "-";
	const parts = {
		days: Math.floor(Math.abs(timestamp) / DAYS_MULTIPLIER),
		hours: Math.floor((Math.abs(timestamp) / (HOURS_MULTIPLIER)) % 24),
		minutes: Math.floor((Math.abs(timestamp) / MINUTES_MULTIPLIER) % 60),
		seconds: Math.floor((Math.abs(timestamp) / SECONDS_MULTIPLIER) % 60),
		seconds_fraction: Math.round(
			100 * Math.floor((Math.abs(timestamp) % SECONDS_MULTIPLIER))
		) / 100
	};
	return `${sign}${format_parts(parts, full_format)}`;
};

export const format_parts = (
	parts: Record<string, number>,
	full: Boolean
): string => {
	const highest: number = parts.days > 0 ? 4 : (
		parts.hours > 0 ? 3 : (parts.minutes > 0 ? 2 : 1)
	);
	const numToString = (num: number, zpad: number = 0): string => {
		let out = num.toString();
		while (out.length < zpad) {
			out = '0' + out;
		}
		return out.substr(0, (zpad > 0 ? zpad : out.length));
	}
	let output = '';
	output += `${highest > 3 ? numToString(parts.days) + ' ' : ''}`;
	output += `${highest > 2 ? numToString(parts.hours) + ':' : ''}`;
	output += `${highest > 1 ? numToString(parts.minutes, 2) : ''}`;
	output += `${highest < 4 || full ?
		(highest < 2 ? '' : ':') + numToString(parts.seconds, (highest < 2 ? 0 : 2)) : ''}`;
	output += `${highest < 2 || full ?
		'.' + numToString(parts.seconds_fraction, 2) : ''}`;
	return output;
}

export const format_time = (
	timestamp?: number,
	empty_label: string = "--:--",
	pos_sign = ""
): string => {
	if (timestamp === undefined || timestamp === -1) return empty_label;
	return smart_format(timestamp, pos_sign);
};

export const format_time_full = (
	timestamp: number,
	empty_label: string = "--:--",
	pos_sign = ""
): string => {
	if (timestamp === undefined || timestamp === -1) return empty_label;
	return smart_format(timestamp, pos_sign, true);
};
