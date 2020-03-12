import React, { useState } from "react";
import { HotkeyList } from "./HotkeyList";
import { parse_keypress, register_callbacks } from "./lib/keyboard";
import { Run, RunState } from "./Run";
import { BLOOD_MOON_SHRINE, Shrine, shrines } from "./shrines";
import { SplitHistory } from "./SplitHistory";
import { SplitTimer } from "./SplitTimer";
import { WorldMap } from "./WorldMap";

type RunManagerProps = {
	run: Run;
};

export const RunManager = (props: RunManagerProps) => {
	const [run, setRun] = useState(props.run);
	const [shrineCount, setShrineCount] = useState(-1);
	const [showHelp, setShowHelp] = useState(false);
	const [bloodMoonDone, setBloodMoonDone] = useState(false);

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
			if (shrineCount === -1) {
				setShrineCount(0);
			}
		}
	};

	const add_split = () => {
		if (run.state === RunState.Running) {
			if (shrineCount >= run.shrine_ids.length - 1) {
				run.state = RunState.Ended;
			}

			const splits = run.splits;
			splits.set(shrineCount, Date.now() - run.rundate - run.paused_time);
			update_splits(splits);
			if (run.shrine_ids[shrineCount] === BLOOD_MOON_SHRINE) {
				setBloodMoonDone(true);
				setRun(prev => ({ ...prev, is_blood_moon: false }));
			}

			setShrineCount(prev => prev + 1);
		} else {
			set_run_state(RunState.Running);
		}
	};

	const toggle_blood_moon = () => {
		const { shrine_ids } = run;

		if (bloodMoonDone) return;
		if (shrine_ids[Math.max(0, shrineCount)] === BLOOD_MOON_SHRINE) {
			setRun(prev => ({ ...prev, is_blood_moon: false }));
			shrine_ids.splice(shrineCount, 1);
			update_shrines(shrine_ids);
		} else {
			setRun(prev => ({ ...prev, is_blood_moon: true }));
			shrine_ids.splice(Math.max(0, shrineCount), 0, BLOOD_MOON_SHRINE);
			update_shrines(shrine_ids);
		}
	};

	const undo_split = () => {
		const splits = run.splits;
		if (splits.size < 1) {
			return;
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

	const show_help = () => setShowHelp(!showHelp);

	const handle_keyboard = (event: KeyboardEvent) => {
		const callback = parse_keypress(event.code);
		if (callback) callback();
	};

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

	React.useEffect(() => {
		document.addEventListener("keydown", handle_keyboard, false);

		return () => {
			document.removeEventListener("keydown", handle_keyboard, false);
		};
	});

	const get_classes = () => {
		const classes = ["bg"];
		if (run.is_blood_moon) classes.push("is-blood-moon");
		return classes.join(" ");
	};

	const get_current_shrine = (): Shrine | undefined => {
		const current_shrine = shrines.find(
			item => item.index === run.shrine_ids[shrineCount]
		);
		return current_shrine;
	};

	return (
		<div className={get_classes()}>
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
				<div className={`help ${showHelp ? "is-visible" : ""}`}>
					{!showHelp && (
						<>
							<div className="helphint">
								<span className="key">Space</span> to start /
								split &nbsp;
								<span className="key">H</span> to show / hide
								help
							</div>
						</>
					)}
					{showHelp && (
						<>
							<div className="instructions">
								<Instructions run={run} />
							</div>

							<div className="hotkeys">
								<HotkeyList />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const Instructions = (props: { run: Run }) => {
	const { run } = props;
	return (
		<>
			<p>
				All shrines except the Blood Moon shrine has been shuffled using
				the seed {run.seed}.
			</p>
			<p>
				Hit <span className="key">B</span> to insert a Blood Moon shrine
				split.
			</p>
		</>
	);
};
