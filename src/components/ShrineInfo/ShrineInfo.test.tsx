import React from "react";
import ReactDOM from "react-dom";
import { ShrineInfo } from "./ShrineInfo";

describe("ShrineInfo", () => {
  it("renders without crashing", () => {
    const counter = 34;
    const shrine_id = 23;
    const timestamp = 354;
    const is_main = true;
    const diff = 12;
    const is_ahead = false;
    const is_pb = false;

    const div = document.createElement('div');
    ReactDOM.render(
      <ShrineInfo
        counter={counter}
        shrine_id={shrine_id}
        timestamp={timestamp}
        is_main={is_main}
        diff={diff}
        is_ahead={is_ahead}
        is_pb={is_pb}
      />, div);
  });
});
