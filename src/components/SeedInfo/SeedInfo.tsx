import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
      <span className='seednumber'>Seed: <span className="seednumberbox">{seed} </span> </span>

    ) : (
      <></>
    );
  }

  const icon = () => showSeed ? <VisibilityOff /> : <Visibility />

  const toggleText = () => {
    return showSeed ? ' Hide ' : ' Show seed ';
  }

  const seedViewer = () => {
    return seed ? (
      <div className='seed'>

        {seedNumber()}
        <span className='toggle' onClick={toggleShowSeed}>
          {icon()}
          {toggleText()}
        </span>
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
