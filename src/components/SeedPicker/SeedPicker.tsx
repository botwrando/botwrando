import React, { ChangeEvent, useState } from 'react';

type SeedPickerProps = {
	onPickedSeed: (seed: string) => void;
};

export const SeedPicker = (props: SeedPickerProps) => {
  const exampleValue = 'CHANGEME';

  const [seed, setSeed] = useState(exampleValue);

  const handleUpdateSeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(event.target.value);
  };

  const handleSelectSeed = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.onPickedSeed(seed);
  };

  return (
    <div className="seedpicker">
      <label htmlFor="input-seedpicker">Type in a seed!</label>
      <input
        type="text"
        id="input-seedpicker"
        defaultValue={exampleValue}
        onChange={handleUpdateSeed}
      />
      <button onClick={handleSelectSeed}>Go!</button>
    </div>
  );
};
