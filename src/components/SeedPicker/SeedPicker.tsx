import React, { useState } from 'react';
import { getRandomSeed } from '../../lib/rando';

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
    _event: React.PointerEvent<HTMLButtonElement>
  ) => {
    props.onPickedSeed(seed);
  };

  return (
    <div className="seedpicker">
      <label htmlFor="input-seedpicker">Choose your seed!</label>

      <button id="generate-seed" onPointerDown={generateSeed}>
        Randomize
      </button>
      <input
        type="text"
        id="input-seedpicker"
        value={seed}
        placeholder={exampleValue}
        onChange={handleUpdateSeed}
      />
      <button id="go-button" onPointerDown={handleSelectSeed}>
        Start run
      </button>
    </div>
  );
};
