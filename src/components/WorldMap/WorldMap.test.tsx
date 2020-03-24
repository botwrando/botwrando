import React from 'react';
import ReactDOM from 'react-dom';
import { WorldMap } from './WorldMap';

describe('WorldMap', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <WorldMap shrine={undefined} />, div);
  });
});
