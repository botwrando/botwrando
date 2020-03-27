import React from 'react';
import { Run } from '../../lib/run';

export type SeedInfoProps = {
  run: Run
}

export function SeedInfo ({ run }: SeedInfoProps) {
  return (
    <div className="seedinfo">
      { run.seed ? (<div className="seed">Seed: {run.seed}</div>) : <></>}
    </div>
  );
}
