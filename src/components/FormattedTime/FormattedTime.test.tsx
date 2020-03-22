import React from "react";
import ReactDOM from "react-dom";
import { FormattedTime } from "./FormattedTime";

describe('FormattedTime', () => {
  it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormattedTime />, div);
  });
});
