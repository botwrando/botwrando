import React from "react";
import ReactDOM from "react-dom";
import { RunTimer } from "./RunTimer";
import { RunState } from "./RunManager";

describe("RunTimer", () => {
  it("renders without crashing", () => {
    const timestamp = 35;
    const runstate = RunState.Default;
    const onUpdatePausedTime = () => { };

    const div = document.createElement('div');
    ReactDOM.render(
      <RunTimer timestamp={timestamp}
        runstate={runstate}
        onUpdatePausedTime={onUpdatePausedTime}
      />, div);
  });
});
