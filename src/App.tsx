import React from "react";
import { getShrines } from "./lib/rando";
import { Run, RunState } from "./Run";
import { RunManager } from "./RunManager";
import "./styles/style.scss";
import "./assets/bloodmoon.svg";

function App() {
	const testSeed = "420SPECSNLUL69";
	const run: Run = {
		state: RunState.Default,
		runner: "Probably Specs",
		rundate: -1,
		pausedTime: -1,
		seed: testSeed,
		shrineIds: getShrines(testSeed),
		splits: new Map([]),
		pbSplits: new Map([]),
		wrSplits: new Map([])
	};

	return (
		<>
			<link rel="preload" href="assets/bloodmoon.svg" as="image"></link>
			<RunManager run={run} />
		</>
	);
}

export default App;
