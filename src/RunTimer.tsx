import React from "react";
import { format_time_full } from "./lib/time";
import { RunState } from "./RunManager";

type ToggleTimer = {
	startedAt: number;
	pausedAt: number;
}

export type RunTimerProps = {
	timestamp: number
	runstate: RunState
	onUpdatePausedTime: Function
}

export const RunTimer = (props: RunTimerProps) => {
	const [toggleTimer, setToggleTimer] = React.useState<ToggleTimer>({ startedAt: -1, pausedAt: -1 });
	const [timerDisplay, setTimerDisplay] = React.useState(0);
	const [pausedTime, setPausedTime] = React.useState(0);

	const request_ref = React.useRef<number>(-1);

	const update_time = (time: number) => {
		if (props.runstate === RunState.Default) {
			setTimerDisplay(0);
			setPausedTime(-1);
		}
		if (props.runstate === RunState.Running) {
			if (toggleTimer.startedAt === -1) {
				setToggleTimer(prev => ({ ...prev, startedAt: Date.now() }));
			}
			if (toggleTimer.pausedAt !== -1) {
				setPausedTime(prev => prev + Date.now() - toggleTimer.pausedAt);
				props.onUpdatePausedTime(pausedTime);
				setToggleTimer(prev => ({ ...prev, pausedAt: -1 }));
			}
			setTimerDisplay(Date.now() - props.timestamp - pausedTime);
		}
		else if (props.runstate === RunState.Paused) {
			if (toggleTimer.startedAt !== -1) {

			}
			if (toggleTimer.pausedAt === -1) {
				setToggleTimer(prev => ({ startedAt: -1, pausedAt: Date.now() }));
			}
		}
	}

	React.useEffect(() => {
		request_ref.current = requestAnimationFrame(update_time);
		return () => cancelAnimationFrame(request_ref.current);
	})

	React.useEffect(() => {
		props.onUpdatePausedTime(pausedTime);
	}, [pausedTime])

	return <>{format_time_full(timerDisplay)}</>
}