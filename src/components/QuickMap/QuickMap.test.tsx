import React from 'react';
import ReactDOM from 'react-dom';
import { QuickMap } from './QuickMap';

describe('QuickMap', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QuickMap />, div);
  });
});
