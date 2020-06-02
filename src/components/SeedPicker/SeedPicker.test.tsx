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
    el.find('button#generate-seed').simulate('click');
    expect(el.find('input').props().value).not.toEqual('CHANGEME');
  });
  it('does not allow the run to start with an empty seed string', () => {
    const onPickedSeed = () => {};
    const el = mount(<SeedPicker onPickedSeed={onPickedSeed} />);
    el.find('input').simulate('change', {target: {value: ''}});
    expect(el.find('button#go-button').props().disabled).toBe(true);
  });
  it('calls the callback when the Go button is clicked', () => {
    const onPickedSeed = jest.fn();
    const el = mount(<SeedPicker onPickedSeed={onPickedSeed} />);
    const inputValue = el.find('input').props().value;
    el.find('button#go-button').simulate('click');
    expect(onPickedSeed).toHaveBeenCalledTimes(1);
    expect(onPickedSeed).toHaveBeenCalledWith(inputValue);
  });
});
