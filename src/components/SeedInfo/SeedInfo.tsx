import { Button, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import React from 'react';
import './SeedInfo.scss';
import { defaultButtonAttrs } from '../App/App';



export type SeedInfoProps = {
  seed: string,
  showSeed: boolean,
  toggleShowSeed: () => void
}

export function SeedInfo({ seed, showSeed, toggleShowSeed }: SeedInfoProps) {
  const seedNumberFrame = () => {
    return showSeed ? (
      <span className='seednumber'>
        <span className="seednumberbox">{seed} </span>
      </span>
    ) : (
      <></>
    );
  }

  const icon = () => showSeed ? <VisibilityOff /> : <Visibility />

  const toggleText = () => {
    return showSeed ? ' Hide seed ' : ' Show seed ';
  }

  const seedViewer = () => {
    return seed ? (
      <div className='seed'>
        <Button {...{ onClick: toggleShowSeed }}>
          {icon()}
          {toggleText()}
        </Button>

        {seedNumberFrame()}
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
