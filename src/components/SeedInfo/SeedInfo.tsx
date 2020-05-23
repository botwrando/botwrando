import React from 'react';
import './SeedInfo.scss';

export type SeedInfoProps = {
  seed: string,
  showSeed: boolean,
  toggleShowSeed: () => void
}

export function SeedInfo({ seed, showSeed, toggleShowSeed }: SeedInfoProps) {
  const seedNumber = () => {
    return showSeed ? (
      <span className='seednumber'>Seed: {seed} </span>
    ) : (
      <></>
    );
  }

  const toggleText = () => {
    return showSeed ? ' Hide ' : ' Show seed ';
  }

  const seedViewer = () => {
    return seed ? (
      <div className='seed'>
        {seedNumber()}
        <span className='toggle' onClick={toggleShowSeed}>{toggleText()}</span>
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
