import { Button, TextField } from '@material-ui/core';
import { Shuffle } from '@material-ui/icons';
import PlayArrow from '@material-ui/icons/PlayArrow';
import React, { useState } from 'react';
import { getRandomSeed } from '../../lib/rando';
import { defaultButtonAttrs } from '../App/App';
import './SeedPicker.scss';

type SeedPickerProps = {
  onPickedSeed: (seed: string) => void;
};

export const SeedPicker = (props: SeedPickerProps) => {
  const exampleValue = 'CHANGEME';

  const [seed, setSeed] = useState(exampleValue);

  const queryParams = new URLSearchParams(window.location.search);
  if ((!seed || seed === exampleValue) && queryParams.has('seed')) {
    const querySeed: string | null = queryParams.get('seed');
    if (querySeed) {
      setSeed(querySeed);
    }
  }

  const handleUpdateSeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(event.target.value);
  };

  const generateSeed = () => {
    setSeed(getRandomSeed());
  };

  const handleSelectSeed = (
    _event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    props.onPickedSeed(seed);
  };


  return (
    <div className="seedpicker">
      <label className='headerlabel' htmlFor="input-seedpicker">Choose your seed!</label>

      <Button {...{
        ...defaultButtonAttrs,
        'aria-label': 'Randomize seed',
        id: 'generate-seed',
        startIcon: <Shuffle />,
        onClick: generateSeed,
      }} >
        Randomize
      </Button>


      <TextField
        color="primary"
        className="input-seedpicker"
        label="Seed"
        variant="outlined"
        value={seed}
        onChange={handleUpdateSeed}
      />

      <Button {...{
        ...defaultButtonAttrs,
        id: 'go-button',
        onClick: handleSelectSeed,
        startIcon: <PlayArrow />
      }}>
        Start run
      </Button>
    </div>
  );
};
