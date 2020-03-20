import React from "react";
import ReactDOM from "react-dom";
import { SplitTimer } from "./SplitTimer";
import { Run, RunState } from "./RunManager";

describe("SplitTimer", () => {
  it("renders without crashing", () => {
    const run: Run = {
      state: RunState.Default,
      is_blood_moon: false,
      runner: "abc",
      rundate: 36,
      paused_time: 23,
      seed: "xyz",
      shrine_ids: [83, 1, 53, 63, 12],
      splits: new Map(),
      wr_splits: new Map(),
      pb_splits: new Map(),
    };
    const currentShrine: number = 53;
    const onUpdatePausedTime = (_paused_time: number) => { };

    const div = document.createElement('div');
    ReactDOM.render(
      <SplitTimer
        run={run}
        currentShrine={currentShrine}
        onUpdatePausedTime={onUpdatePausedTime}
      />, div);
  });
});
