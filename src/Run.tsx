export enum RunState {
	None,
	Init,
	Running,
	Paused,
	Ended
}

export type Run = {
	state: RunState;
	runner: string;
	rundate: number;
	pausedTime: number;
	seed: string;
	shrineIds: number[];
	splits: Map<number, number>;
	wrSplits: Map<number, number>;
	pbSplits: Map<number, number>;
};
