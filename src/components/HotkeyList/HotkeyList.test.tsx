import React from 'react';
import ReactDOM from 'react-dom';
import { HotkeyList } from './HotkeyList';

describe('HotkeyList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HotkeyList />, div);
  });
});
