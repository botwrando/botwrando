import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { Shuffle } from '@material-ui/icons';
import PlayArrow from '@material-ui/icons/PlayArrow';
import React, { useState } from 'react';
import { getRandomSeed, Presets, RandoFlags, ValidPreset } from '../../lib/rando';
import { defaultButtonAttrs } from '../App/App';
import './SeedPicker.scss';

type SeedPickerProps = {
  onPickedSeed: (seed: string) => void;
  onSetFlags: (preset: RandoFlags) => void;
};

export const SeedPicker = (props: SeedPickerProps) => {
  const exampleValue = 'CHANGEME';

  const [seed, setSeed] = useState(exampleValue);
  const [preset, setPresetName] = useState<ValidPreset>('Default')

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

  const profileElements = Object.keys(Presets).map(key =>
    <FormControlLabel key={key} value={key} label={key} labelPlacement='end' control={<Radio color='primary' />} />
  );

  const onSelectPreset = (event: any) => {
    const val: ValidPreset = event.target.value;
    const preset = Presets[val];
    if (preset !== undefined) {
      setPresetName(val);
      props.onSetFlags(preset.flags);
    }
  }

  return (
    <div className="seedpicker">

      <Typography variant='h3' className='headerlabel'>Choose your seed!</Typography>

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

      <div id="optionsbox">
        <RadioGroup aria-label='Randomizer profile' value={preset} onChange={onSelectPreset} >
          {profileElements}
        </RadioGroup>
      </div>

      <Button {...{
        ...defaultButtonAttrs,
        id: 'go-button',
        onClick: handleSelectSeed,
        disabled: (!seed),
        startIcon: <PlayArrow />
      }}>
        Start run
      </Button>
    </div>
  );
};
