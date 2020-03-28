import React from 'react';
import { FormattedTime } from '../FormattedTime/FormattedTime';
import { Run, RunState } from '../../lib/run';

type ToggleTimer = {
  startedAt: number;
  pausedAt: number;
};

export type RunTimerProps = {
  run: Run;
  setPausedTime: Function;
};

export const RunTimer = (props: RunTimerProps) => {
  const { run, setPausedTime } = props;
  const [toggleTimer, setToggleTimer] = React.useState<ToggleTimer>({
    startedAt: -1,
    pausedAt: -1
  });
  const [timerDisplay, setTimerDisplay] = React.useState(0);

  const request_ref = React.useRef<number>(-1);

  const update_time = (_time: number) => {
    if (run.state === RunState.Init) {
      setTimerDisplay(0);
      setPausedTime(-1);
    }
    if (run.state === RunState.Running) {
      if (toggleTimer.startedAt === -1) {
        setToggleTimer(prev => ({ ...prev, startedAt: Date.now() }));
      }
      if (toggleTimer.pausedAt !== -1) {
        setPausedTime(run.pausedTime + Date.now() - toggleTimer.pausedAt);
        setToggleTimer(prev => ({ ...prev, pausedAt: -1 }));
      }
      setTimerDisplay(Date.now() - run.rundate - run.pausedTime);
    } else if (run.rundate >= 0 && run.state === RunState.Paused) {
      if (toggleTimer.startedAt !== -1) {
      }
      if (toggleTimer.pausedAt === -1) {
        setToggleTimer(_prev => ({
          startedAt: -1,
          pausedAt: Date.now()
        }));
      }
    }
  };

  React.useEffect(() => {
    if (run.rundate <= 0) {
      setToggleTimer({ startedAt: -1, pausedAt: -1 });
    }
  }, [run.rundate]);

  React.useEffect(() => {
    request_ref.current = requestAnimationFrame(update_time);
    return () => cancelAnimationFrame(request_ref.current);
  });

  return <FormattedTime timestamp={timerDisplay} fullFormat={true} />;
};
