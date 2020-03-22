import React from "react";
import { FormattedTime } from "../FormattedTime/FormattedTime";
import { RunState } from "../../lib/run";

type ToggleTimer = {
	startedAt: number;
	pausedAt: number;
};

export type RunTimerProps = {
	timestamp: number;
	runstate: RunState;
	onUpdatePausedTime: Function;
};

export const RunTimer = (props: RunTimerProps) => {
	const { timestamp, runstate, onUpdatePausedTime } = props;
	const [toggleTimer, setToggleTimer] = React.useState<ToggleTimer>({
		startedAt: -1,
		pausedAt: -1
	});
	const [timerDisplay, setTimerDisplay] = React.useState(0);
	const [pausedTime, setPausedTime] = React.useState(0);

	const request_ref = React.useRef<number>(-1);

	const update_time = (time: number) => {
		if (runstate === RunState.Init) {
			setTimerDisplay(0);
			setPausedTime(-1);
		}
		if (runstate === RunState.Running) {
			if (toggleTimer.startedAt === -1) {
				setToggleTimer(prev => ({ ...prev, startedAt: Date.now() }));
			}
			if (toggleTimer.pausedAt !== -1) {
				setPausedTime(prev => prev + Date.now() - toggleTimer.pausedAt);
				props.onUpdatePausedTime(pausedTime);
				setToggleTimer(prev => ({ ...prev, pausedAt: -1 }));
			}
			setTimerDisplay(Date.now() - timestamp - pausedTime);
		} else if (runstate === RunState.Paused) {
			if (toggleTimer.startedAt !== -1) {
			}
			if (toggleTimer.pausedAt === -1) {
				setToggleTimer(prev => ({
					startedAt: -1,
					pausedAt: Date.now()
				}));
			}
		}
	};

	React.useEffect(() => {
		request_ref.current = requestAnimationFrame(update_time);
		return () => cancelAnimationFrame(request_ref.current);
	});

	React.useEffect(() => {
		onUpdatePausedTime(pausedTime);
	}, [pausedTime]);

	return <FormattedTime timestamp={timerDisplay} full_format={true} />;
};
