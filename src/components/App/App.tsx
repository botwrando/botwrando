import React from 'react';
// import { getRandomizedShrines } from "../../lib/rando";
import { Run, RunState } from '../../lib/run';
import { RunManager } from '../RunManager/RunManager';
import '../../styles/style.scss';
import '../../assets/bloodmoon.svg';

function App() {
  // const testSeed = "420SPECSNLUL69";
  // getRandomizedShrines(testSeed)
  const run: Run = {
    state: RunState.None,
    runner: 'Probably Specs',
    rundate: -1,
    pausedTime: -1,
    seed: '',
    shrineIds: [],
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
