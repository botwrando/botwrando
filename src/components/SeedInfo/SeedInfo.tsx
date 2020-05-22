import React, { useState } from 'react';
import { Run } from '../../lib/run';
import './SeedInfo.scss';

export type SeedInfoProps = {
  run: Run
}

export function SeedInfo({ run }: SeedInfoProps) {
  const [showSeed, setShowSeed] = useState(false);

  const toggleSeed = (isVisible: boolean) => (setShowSeed(isVisible));

  const seedViewer = () => (
    (<div className='seed'>
      <span className='seednumber'>Seed: {run.seed} </span>
      <span className='toggle' onClick={() => toggleSeed(false)}> Hide </span>
    </div>)
  )

  return (
    <div className='seedinfo'>
      {run.seed ?

        showSeed ?
          seedViewer() :
          (
            <div className='seed'>
              <div className='toggle' onClick={() => toggleSeed(true)}> Show seed </div>
            </div>
          ) :
        (<></>)
      }
    </div>
  );
}
