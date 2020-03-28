import React, { ChangeEvent, useState } from 'react';
import { getRandomSeed } from '../../lib/rando';

type SeedPickerProps = {
	onPickedSeed: (seed: string) => void;
};

export const SeedPicker = (props: SeedPickerProps) => {
  const exampleValue = 'CHANGEME';

  const [seed, setSeed] = useState(exampleValue);

  const queryParams = (new URLSearchParams(window.location.search));
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
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.onPickedSeed(seed);
  };

  return (
    <div className="seedpicker">
      <label htmlFor="input-seedpicker">Type in a seed!</label>
      <div className="cursor">
        <input
          type="text"
          id="input-seedpicker"
          value={seed}
          placeholder={exampleValue}
          onChange={handleUpdateSeed}
        />
        <i></i>
      </div>
      <span>- or -</span>
      <button id="generate-seed" onClick={generateSeed}>Generate a seed!</button>
      <button id="go-button" onClick={handleSelectSeed}>Go!</button>
    </div>
  );
};
