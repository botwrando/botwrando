import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { SeedPicker } from './SeedPicker';

describe('SeedPicker', () => {
  it('renders without crashing', () => {
    const onPickedSeed = () => { };
    const onSetFlags = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(<SeedPicker {...{ onPickedSeed, onSetFlags }} />, div);
  });
  it('generates a seed when the generate button is clicked', () => {
    const onPickedSeed = () => { };
    const onSetFlags = jest.fn();
    const el = mount(<SeedPicker {...{ onPickedSeed, onSetFlags }} />);
    expect(el.find('input#js-seed-textinput')).toHaveLength(1);
    expect(el.find('input#js-seed-textinput').props().value).toEqual('CHANGEME');
    el.find('button#generate-seed').simulate('click');
    expect(el.find('input#js-seed-textinput').props().value).not.toEqual('CHANGEME');
  });
  it('does not allow the run to start with an empty seed string', () => {
    const onPickedSeed = () => { };
    const onSetFlags = jest.fn();
    const el = mount(<SeedPicker {...{ onPickedSeed, onSetFlags }} />);
    el.find('input#js-seed-textinput').simulate('change', { target: { value: '' } });
    expect(el.find('button#go-button').props().disabled).toBe(true);
  });
  it('calls the callback when the Go button is clicked', () => {
    const onPickedSeed = jest.fn();
    const onSetFlags = jest.fn();
    const el = mount(<SeedPicker {...{ onPickedSeed, onSetFlags }} />);
    const inputValue = el.find('input#js-seed-textinput').props().value;
    el.find('button#go-button').simulate('click');
    expect(onPickedSeed).toHaveBeenCalledTimes(1);
    expect(onPickedSeed).toHaveBeenCalledWith(inputValue);
  });
});
