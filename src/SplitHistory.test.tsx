import React from "react";
import ReactDOM from "react-dom";
import { SplitHistory } from "./SplitHistory";
import { Run, RunState } from "./RunManager";

describe("SplitHistory", () => {
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
  
    const div = document.createElement('div');
    ReactDOM.render(<SplitHistory run={run} />, div);
  });
});
