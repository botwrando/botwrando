import React from "react";
import ReactDOM from "react-dom";
import { RunManager } from "./RunManager";
import { Run, RunState } from "../../lib/run";

describe("RunManager", () => {
  it("renders without crashing", () => {
    const run: Run = {
      state: RunState.None,
      runner: "abc",
      rundate: 36,
      pausedTime: 23,
      seed: "xyz",
      shrineIds: [83, 1, 53, 63, 12],
      splits: new Map(),
      wrSplits: new Map(),
      pbSplits: new Map(),
    };

    const div = document.createElement('div');
    ReactDOM.render(<RunManager run={run} />, div);
  });
});
