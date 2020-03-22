import React from "react";
import ReactDOM from "react-dom";
import { SeedPicker } from "./SeedPicker";

describe("SeedPicker", () => {
  it("renders without crashing", () => {
    const onPickedSeed = () => {};
    const div = document.createElement('div');
    ReactDOM.render(<SeedPicker onPickedSeed={onPickedSeed} />, div);
  });
});
