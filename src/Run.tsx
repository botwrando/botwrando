export enum RunState {
	Default,
	Running,
	Paused,
	Ended
}

export type Run = {
	state: RunState;
	is_blood_moon: Boolean;
	runner: string;
	rundate: number;
	paused_time: number;
	seed: string;
	shrine_ids: number[];
	splits: Map<number, number>;
	wr_splits: Map<number, number>;
	pb_splits: Map<number, number>;
};
