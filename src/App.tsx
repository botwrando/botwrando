import React from "react";
import { getShrines } from "./lib/rando";
import { Run, RunState } from "./Run";
import { RunManager } from "./RunManager";
import "./styles/style.scss";
import "./assets/bloodmoon.svg";

function App() {
	const testSeed = "1A39SPECSNLUL71F";
	const run: Run = {
		state: RunState.Default,
		runner: "Test Runner",
		rundate: -1,
		paused_time: -1,
		seed: testSeed,
		shrine_ids: getShrines(testSeed).slice(0, 12), // TODO: debug setting, remove later
		splits: new Map([]),
		pb_splits: new Map([
			[0, 13999],
			[1, 117123],
			[2, 261102],
			[3, 358000],
			[4, 458000],
			[5, 558000],
			[6, 658000]
		]),
		wr_splits: new Map([
			[0, 16000],
			[1, 115000],
			[2, 270000],
			[3, 361000],
			[4, 458000],
			[5, 558000],
			[6, 658000]
		])
	};

	return (
		<>
			<link
				rel="preload"
				href="assets/bloodmoon.svg"
				as="image"
			></link>
			<RunManager run={run} />
		</>
	);
}

export default App;
