import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { SeedPicker } from './SeedPicker';

describe('SeedPicker', () => {
  it('renders without crashing', () => {
    const onPickedSeed = () => {};
    const div = document.createElement('div');
    ReactDOM.render(<SeedPicker onPickedSeed={onPickedSeed} />, div);
  });
  it('generates a seed when the generate button is clicked', () => {
    const onPickedSeed = () => {};
    const el = mount(<SeedPicker onPickedSeed={onPickedSeed} />);
    expect(el.find('input')).toHaveLength(1);
    expect(el.find('input').props().value).toEqual('CHANGEME');
    el.find('#generate-seed').simulate('click');
    expect(el.find('input').props().value).not.toEqual('CHANGEME');
  });
  it('calls the callback when the Go button is clicked', () => {
    const onPickedSeed = jest.fn();
    const el = mount(<SeedPicker onPickedSeed={onPickedSeed} />);
    const inputValue = el.find('input').props().value;
    el.find('#go-button').simulate('click');
    expect(onPickedSeed).toHaveBeenCalledTimes(1);
    expect(onPickedSeed).toHaveBeenCalledWith(inputValue);
  });
});
