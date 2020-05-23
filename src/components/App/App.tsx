import React from 'react';
import '../../assets/bloodmoon.svg';
import '../../styles/style.scss';
import { Run, getDefaultRun } from '../../lib/run';
import { RunManager } from '../RunManager/RunManager';

function App() {
  const run: Run = getDefaultRun();

  return (
    <>
      <link rel="preload" href="assets/bloodmoon.svg" as="image"></link>
      <RunManager run={run} />
    </>
  );
}

export default App;
