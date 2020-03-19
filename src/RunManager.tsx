import React, { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import "./assets/bloodmoon.svg";
import { DesktopHelp, MobileControls } from "./Help";
import { parse_keypress, registerCallbacks } from "./lib/keyboard";
import { getShrines } from "./lib/rando";
import { QuickMap } from "./QuickMap";
import { Run, RunState } from "./Run";
import { SeedPicker } from "./SeedPicker";
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
	const [hasRun, setHasRun] = useState(false);
	const [shrinePtr, setShrinePtr] = useState(-1);
	const [showHelp, setShowHelp] = useState(false);
	const [bloodMoonState, setBloodMoonState] = useState<BloodMoonState>({
		isDone: false,
		isActive: false
	});

	const onUpdatePausedTime = (pausedTime: number) => {
		setRun(prev => ({ ...prev, pausedTime }));
	};

	const updateSplits = (splits: Map<number, number>) => {
		setRun(prev => ({ ...prev, splits }));
	};

	const updateShrines = (shrineIds: number[]) => {
		setRun(prev => ({ ...prev, shrineIds }));
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
		if (run.state === RunState.Init) {
			setShrinePtr(0);
			setRunState(RunState.Running);
		}
		if (run.state === RunState.Running) {
			const splits = run.splits;
			splits.set(shrinePtr, Date.now() - run.rundate - run.pausedTime);
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
		if (shrinePtr >= run.shrineIds.length) {
			setRunState(RunState.Ended);
		} else if (shrinePtr > -1 && shrinePtr < run.shrineIds.length) {
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
		setRun(prev => ({ ...prev, pausedTime: -1, rundate: -1 }));
		setShrinePtr(-1);
		setRunState(RunState.Init);
	};

	const pause = () => setRunState(RunState.Paused);

	const toggleHelp = () => setShowHelp(!showHelp);

	const toggleBloodMoon = () => {
		const { shrineIds } = run;

		if (bloodMoonState.isDone) {
			return;
		}
		const currentShrine = Math.max(0, shrinePtr);

		if (shrineIds[currentShrine] === BLOOD_MOON_SHRINE) {
			shrineIds.splice(currentShrine, 1);
			updateShrines(shrineIds);
		} else {
			shrineIds.splice(currentShrine, 0, BLOOD_MOON_SHRINE);
			updateShrines(shrineIds);
		}
	};

	React.useEffect(() => {
		const state = {
			isActive:
				run.shrineIds[Math.max(0, shrinePtr)] === BLOOD_MOON_SHRINE,
			isDone: run.splits.has(run.shrineIds.indexOf(BLOOD_MOON_SHRINE))
		};
		setBloodMoonState(prev => ({
			...prev,
			...state
		}));
	}, [run, shrinePtr]);

	React.useEffect(() => {
		registerCallbacks({
			addSplit,
			undoSplit,
			skipSplit,
			resetSplits,
			pause,
			toggleHelp,
			toggleBloodMoon
		});
	});

	const getClasses = () => {
		const classes = ["bg"];
		if (bloodMoonState.isActive) classes.push("is-blood-moon");
		return classes.join(" ");
	};

	const getCurrentShrine = (): Shrine | undefined => {
		const current_shrine = shrines.find(
			item => item.index === run.shrineIds[shrinePtr]
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

	const onPickedSeed = (seed: string) => {
		const shrineIds = getShrines(seed);
		setRun(prev => ({ ...prev, seed: seed, shrineIds: shrineIds }));
		setHasRun(true);
		setRunState(RunState.Init);
	};

	const header = () => (
		<div className="header">Botw All Shrines Randomizer</div>
	);

	const seedinfo = () =>
		hasRun ? (
			<div className="seedinfo">Seed: {run.seed}</div>
		) : (
			<div className="seedinfo"></div>
		);

	const mainsection = () =>
		run.state == RunState.None ? (
			<SeedPicker onPickedSeed={onPickedSeed} />
		) : (
			// <div className="splashscreen">Ready to rock!</div>
			<>
				<SplitHistory run={run} />
				<SplitTimer
					run={run}
					currentShrine={shrinePtr}
					onUpdatePausedTime={onUpdatePausedTime}
				/>
				<QuickMap shrine={getCurrentShrine()} />
			</>
		);

	const footer = () =>
		isTouch ? (
			<MobileControls {...touchProps} />
		) : (
			<DesktopHelp run={run} showHelp={showHelp} />
		);

	const out = (
		<div className={getClasses()}>
			<KeyboardEventHandler handleKeys={["all"]} onKeyEvent={handleKey} />
			<div className="main">
				{header()}
				{seedinfo()}
				{mainsection()}
				{footer()}
			</div>
		</div>
	);

	return out;
};
