import { Run } from "./run";

export const decodeRun = (runJson: string): Run => {
	const r = JSON.parse(runJson);
	const runObj = {
		...r,
		splits: new Map(r.splits),
		pbSplits: new Map(r.pbSplits),
		wrSplits: new Map(r.wrSplits),
		state: r.state
	};
	return runObj;
};

export const encodeRun = (r: Run): string => {
	const runObj = {
		...r,
		splits: Array.from(r.splits.entries()),
		pbSplits: Array.from(r.pbSplits.entries()),
		wrSplits: Array.from(r.wrSplits.entries())
	};
	const runJson = JSON.stringify(runObj);
	return runJson;
};
