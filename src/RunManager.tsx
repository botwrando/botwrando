import React, { useState } from "react";
import { shrines, Shrine } from "./shrines";
import { SplitHistory } from "./SplitHistory";
import { SplitTimer } from "./SplitTimer";
import { WorldMap } from "./WorldMap";
import { parse_keypress, register_callbacks } from "./lib/keyboard";

export enum RunState {
	Default,
	Running,
	Paused,
	Ended
}

export type Run = {
	state: RunState;
	runner: string;
	rundate: number;
	paused_time: number;
	seed: string;
	shrine_ids: number[];
	splits: Map<number, number>;
	wr_splits: Map<number, number>;
	pb_splits: Map<number, number>;
}

type RunManagerProps = {
	run: Run;
}

export const RunManager = (props: RunManagerProps) => {
	const [run, setRun] = useState(props.run);
	const [shrineCount, setShrineCount] = useState(-1);

	const onUpdatePausedTime = (paused_time: number) => {
		setRun(prev => ({ ...prev, paused_time }));
	}

	const update_splits = (splits: Map<number, number>) => {
		setRun(prev => ({ ...prev, splits: splits }));
	}

	const set_run_state = (state: RunState) => {
		setRun(prev => ({ ...prev, state: state }));

		if (state === RunState.Running) {
			if (run.rundate === -1) {
				setRun(prev => ({ ...prev, rundate: Date.now() }));
			}
			if (shrineCount === -1) {
				setShrineCount(0);
			}
		}
	}

	const add_split = () => {
		if (run.state === RunState.Running) {
			if (shrineCount >= run.shrine_ids.length -1) {
				run.state = RunState.Ended;
			}

			const splits = run.splits;
			splits.set(shrineCount, Date.now() - run.rundate - run.paused_time);
			update_splits(splits);
			setShrineCount(prev => prev + 1);
		}
		else {
			set_run_state(RunState.Running);
		}
	}

	const undo_split = () => {
		const splits = run.splits;
		if (splits.size < 1) {
			return
		}
		splits.delete(shrineCount - 1);
		setShrineCount(prev => prev - 1);
		update_splits(splits);
	};

	const skip_split = () => {
		const splits = run.splits;
		splits.set(shrineCount, -1);
		update_splits(splits);
		setShrineCount(prev => prev + 1);
	};

	const reset_splits = () => {
		const splits = run.splits;
		splits.clear();
		update_splits(splits);
		setRun(prev => ({ ...prev, paused_time: -1, rundate: -1 }));
		set_run_state(RunState.Default);
		setShrineCount(-1);
	};

	const pause = () => set_run_state(RunState.Paused);


	const handle_keyboard = (event: KeyboardEvent) => {
		const callback = parse_keypress(event.code);
		if (callback) callback();
	}

	React.useEffect(() => {
		register_callbacks({ add_split, undo_split, skip_split, reset_splits, pause });
	});

	React.useEffect(() => {
		document.addEventListener("keydown", handle_keyboard, false);

		return () => {
			document.removeEventListener("keydown", handle_keyboard, false)
		};
	});


	const get_current_shrine = (): Shrine | undefined => {
		const current_shrine = shrines.find(item => item.index === run.shrine_ids[shrineCount]);
		return current_shrine;
	}

	return (
		<div className="main">
			<div className="header">Botw All Shrines Randomizer</div>
			<div className="seedinfo">Seed: {run.seed}</div>
			<SplitHistory run={run} />
			<SplitTimer
				run={run}
				currentShrine={shrineCount}
				onUpdatePausedTime={onUpdatePausedTime}
			/>
			<WorldMap shrine={get_current_shrine()} />
		</div>
	);
}
