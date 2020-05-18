import React from 'react';
import '../../assets/bloodmoon.svg';
// import { getRandomizedShrines } from "../../lib/rando";
import { Run, RunState } from '../../lib/run';
import '../../styles/style.scss';
import { RunManager } from '../RunManager/RunManager';

function App() {
  // const testSeed = "420SPECSNLUL69";
  // getRandomizedShrines(testSeed)
  const run: Run = {
    state: RunState.None,
    runner: 'Probably Specs',
    rundate: -1,
    pausedTime: -1,
    seed: '',
    waypointIds: [],
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
