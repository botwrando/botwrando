import React, { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import "./assets/bloodmoon.svg";
import { DesktopHelp, MobileControls } from "./Help";
import { parse_keypress, register_callbacks } from "./lib/keyboard";
import { QuickMap } from "./QuickMap";
import { Run, RunState } from "./Run";
import { BLOOD_MOON_SHRINE, Shrine, shrines } from "./shrines";
import { SplitHistory } from "./SplitHistory";
import { SplitTimer } from "./SplitTimer";
import { throttle } from "./lib/utils";

type RunManagerProps = {
	run: Run;
};

type BloodMoonState = {
	isDone: boolean;
	isActive: boolean;
};

export const RunManager = (props: RunManagerProps) => {
	const [run, setRun] = useState(props.run);
	const [shrinePtr, setShrinePtr] = useState(-1);
	const [showHelp, setShowHelp] = useState(false);
	const [bloodMoonState, setBloodMoonState] = useState<BloodMoonState>({
		isDone: false,
		isActive: false
	});

	const onUpdatePausedTime = (paused_time: number) => {
		setRun(prev => ({ ...prev, paused_time }));
	};

	const update_splits = (splits: Map<number, number>) => {
		setRun(prev => ({ ...prev, splits: splits }));
	};

	const update_shrines = (shrine_ids: number[]) => {
		setRun(prev => ({ ...prev, shrine_ids: shrine_ids }));
	};

	const set_run_state = (state: RunState) => {
		setRun(prev => ({ ...prev, state: state }));

		if (state === RunState.Running) {
			if (run.rundate === -1) {
				setRun(prev => ({ ...prev, rundate: Date.now() }));
			}
			if (shrinePtr === -1) {
				setShrinePtr(0);
			}
		}
	};

	const add_split = () => {
		if (run.state === RunState.Running) {
			const splits = run.splits;
			splits.set(shrinePtr, Date.now() - run.rundate - run.paused_time);
			update_splits(splits);
			setShrinePtr(prev => prev + 1);
		} else if (shrinePtr >= run.shrine_ids.length - 1) {
			run.state = RunState.Ended;
		} else {
			set_run_state(RunState.Running);
		}
	};

	const undo_split = () => {
		const splits = run.splits;
		if (splits.size < 1) {
			return;
		}
		splits.delete(shrinePtr - 1);
		update_splits(splits);
		setShrinePtr(prev => prev - 1);
	};

	const skip_split = () => {
		const splits = run.splits;
		splits.set(shrinePtr, -1);
		update_splits(splits);
		setShrinePtr(prev => prev + 1);
	};

	const reset_splits = () => {
		const splits = run.splits;
		splits.clear();
		update_splits(splits);
		setRun(prev => ({ ...prev, paused_time: -1, rundate: -1 }));
		set_run_state(RunState.Default);
		setShrinePtr(-1);
	};

	const pause = () => set_run_state(RunState.Paused);

	const show_help = () => setShowHelp(!showHelp);

	const toggle_blood_moon = () => {
		const { shrine_ids } = run;

		if (bloodMoonState.isDone) {
			return;
		}
		const currentShrine = Math.max(0, shrinePtr);

		if (shrine_ids[currentShrine] === BLOOD_MOON_SHRINE) {
			shrine_ids.splice(currentShrine, 1);
			update_shrines(shrine_ids);
		} else {
			shrine_ids.splice(currentShrine, 0, BLOOD_MOON_SHRINE);
			update_shrines(shrine_ids);
		}
	};

	React.useEffect(() => {
		const state = {
			isActive:
				run.shrine_ids[Math.max(0, shrinePtr)] === BLOOD_MOON_SHRINE,
			isDone: run.splits.has(run.shrine_ids.indexOf(BLOOD_MOON_SHRINE))
		};
		setBloodMoonState(prev => ({
			...prev,
			...state
		}));
	}, [run, shrinePtr]);

	React.useEffect(() => {
		register_callbacks({
			add_split,
			undo_split,
			skip_split,
			reset_splits,
			pause,
			show_help,
			toggle_blood_moon
		});
	});

	const get_classes = () => {
		const classes = ["bg"];
		if (bloodMoonState.isActive) classes.push("is-blood-moon");
		return classes.join(" ");
	};

	const get_current_shrine = (): Shrine | undefined => {
		const current_shrine = shrines.find(
			item => item.index === run.shrine_ids[shrinePtr]
		);
		return current_shrine;
	};

	const isTouch = window.matchMedia("(pointer: coarse)").matches;
	const touchProps = {
		run: run,
		onSplit: add_split,
		onUndo: undo_split,
		onReset: reset_splits,
		onPause: pause,
		onBloodMoon: toggle_blood_moon
	};

	let lastCall = Date.now();

	const handleKey = (key: string, event: KeyboardEvent) => {
		let ts = Date.now();
		if (ts - lastCall < 60) {
			return;
		}
		lastCall = ts;
		const callback = parse_keypress(event.code);

		if (callback) {
			callback();
		}
	};

	return (
		<div className={get_classes()}>
			<KeyboardEventHandler handleKeys={["all"]} onKeyEvent={handleKey} />
			<div className="main">
				<div className="header">Botw All Shrines Randomizer</div>
				<div className="seedinfo">Seed: {run.seed}</div>
				{run.state == RunState.Default && (
					<div className="splashscreen">Ready to rock!</div>
				)}
				{run.state != RunState.Default && (
					<>
						<SplitHistory run={run} />
						<SplitTimer
							run={run}
							currentShrine={shrinePtr}
							onUpdatePausedTime={onUpdatePausedTime}
						/>
						<QuickMap shrine={get_current_shrine()} />
					</>
				)}
				{isTouch && <MobileControls {...touchProps} />}
				{!isTouch && <DesktopHelp run={run} showHelp={showHelp} />}
			</div>
		</div>
	);
};
