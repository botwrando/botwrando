import React, { useState } from 'react';
import { Run } from '../../lib/run';
import './SeedInfo.scss';

export type SeedInfoProps = {
  run: Run
}

export function SeedInfo({ run }: SeedInfoProps) {
  const [showSeed, setShowSeed] = useState(false);

  const toggleShowSeed = () => (setShowSeed(!showSeed));

  const seedNumber = () => {
    return showSeed ? (
      <span className='seednumber'>Seed: {run.seed} </span>
    ) : (
      <></>
    );
  }

  const toggleText = () => {
    return showSeed ? ' Hide ' : ' Show seed ';
  }

  const seedViewer = () => {
    return run.seed ? (
      <div className='seed'>
        {seedNumber()}
        <span className='toggle' onClick={() => toggleShowSeed()}>{toggleText()}</span>
      </div>
    ) : (
      <></>
    )
  }

  return (
    <div className='seedinfo'>
      {seedViewer()}
    </div>
  );
}
