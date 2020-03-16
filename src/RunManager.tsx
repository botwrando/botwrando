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

	const onUpdatePausedTime = (pausedTime: number) => {
		setRun(prev => ({ ...prev, paused_time: pausedTime }));
	};

	const updateSplits = (splits: Map<number, number>) => {
		setRun(prev => ({ ...prev, splits: splits }));
	};

	const updateShrines = (shrine_ids: number[]) => {
		setRun(prev => ({ ...prev, shrine_ids: shrine_ids }));
	};

	const setRunState = (state: RunState) => {
		setRun(prev => ({ ...prev, state: state }));

		if (state === RunState.Running) {
			if (run.rundate === -1) {
				setRun(prev => ({ ...prev, rundate: Date.now() }));
			}
		}
	};

	const addSplit = () => {
		if (run.state === RunState.Paused) {
			setRunState(RunState.Running);
		}
		if (run.state === RunState.Ended) return;
		if (run.state === RunState.Default) {
			setShrinePtr(0);
			setRunState(RunState.Running);
		}
		if (run.state === RunState.Running) {
			const splits = run.splits;
			splits.set(shrinePtr, Date.now() - run.rundate - run.paused_time);
			updateSplits(splits);
			setShrinePtr(prev => prev + 1);
		}
	};

	const undoSplit = () => {
		const splits = run.splits;
		if (splits.size < 1) {
			return;
		}
		splits.delete(shrinePtr - 1);
		updateSplits(splits);
		setShrinePtr(prev => prev - 1);
	};

	React.useEffect(() => {
		if (shrinePtr >= run.shrine_ids.length) {
			setRunState(RunState.Ended);
		} else if (shrinePtr > -1 && shrinePtr < run.shrine_ids.length) {
			setRunState(RunState.Running);
		}
	}, [shrinePtr]);

	const skipSplit = () => {
		if (run.state == RunState.Ended) return;

		const splits = run.splits;
		splits.set(shrinePtr, -1);
		updateSplits(splits);
		setShrinePtr(prev => prev + 1);
	};

	const resetSplits = () => {
		const splits = run.splits;
		splits.clear();
		updateSplits(splits);
		setRun(prev => ({ ...prev, paused_time: -1, rundate: -1 }));
		setShrinePtr(-1);
		setRunState(RunState.Default);
	};

	const pause = () => setRunState(RunState.Paused);

	const show_help = () => setShowHelp(!showHelp);

	const toggleBloodMoon = () => {
		const { shrine_ids } = run;

		if (bloodMoonState.isDone) {
			return;
		}
		const currentShrine = Math.max(0, shrinePtr);

		if (shrine_ids[currentShrine] === BLOOD_MOON_SHRINE) {
			shrine_ids.splice(currentShrine, 1);
			updateShrines(shrine_ids);
		} else {
			shrine_ids.splice(currentShrine, 0, BLOOD_MOON_SHRINE);
			updateShrines(shrine_ids);
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
			add_split: addSplit,
			undo_split: undoSplit,
			skip_split: skipSplit,
			reset_splits: resetSplits,
			pause,
			show_help,
			toggle_blood_moon: toggleBloodMoon
		});
	});

	const getClasses = () => {
		const classes = ["bg"];
		if (bloodMoonState.isActive) classes.push("is-blood-moon");
		return classes.join(" ");
	};

	const getCurrentShrine = (): Shrine | undefined => {
		const current_shrine = shrines.find(
			item => item.index === run.shrine_ids[shrinePtr]
		);
		return current_shrine;
	};

	const isTouch = window.matchMedia("(pointer: coarse)").matches;
	const touchProps = {
		run: run,
		onSplit: addSplit,
		onUndo: undoSplit,
		onReset: resetSplits,
		onPause: pause,
		onBloodMoon: toggleBloodMoon
	};

	let lastCall = Date.now();

	const handleKey = (key: string, event: KeyboardEvent) => {
		let ts = Date.now();
		if (ts - lastCall < 16) {
			return;
		}
		lastCall = ts;
		const callback = parse_keypress(event.code);

		if (callback) {
			callback();
		}
	};

	return (
		<div className={getClasses()}>
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
						<QuickMap shrine={getCurrentShrine()} />
					</>
				)}
				{isTouch && <MobileControls {...touchProps} />}
				{!isTouch && <DesktopHelp run={run} showHelp={showHelp} />}
			</div>
		</div>
	);
};
