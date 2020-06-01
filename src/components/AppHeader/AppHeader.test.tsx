import { mount, render, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { getDefaultRun, Run } from '../../lib/run';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  let setRun: (value: React.SetStateAction<Run>) => void;
  let seed: string;
  let showSeed: boolean;
  beforeEach(() => {
    setRun = jest.fn();
    seed = 'abcdefg1234567890';
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppHeader seed={seed} showSeed={true} setRun={setRun} />, div);
  });
  it('renders the Quit button when a seed has been picked', () => {
    const el = shallow(<AppHeader seed={seed} showSeed={true} setRun={setRun} />);
    expect(el.contains(<div className="header" />));
    expect(el.contains(<div className="btn-back" />));
  });
  it('renders the seed picker screen without the Quit button', () => {
    const el = shallow(<AppHeader seed="" showSeed={false} setRun={setRun} />);
    expect(el.contains(<div className="header" />));
    expect(el.contains(<div className="btn-back" />)).toBe(false);
  });
  it('mounts in a full DOM', () => {
    expect(mount(<AppHeader seed="" showSeed={false} setRun={setRun} />)
      .find('.appheader').length).toBe(1);
  });
  it('should render the expected text', () => {
    expect(render(<AppHeader seed="" showSeed={false} setRun={setRun} />).text()).toMatch(
      /BotW All Shrines Randomizer/
    );
  });
  describe('when the Quit Run button is clicked', () => {
    it('should call setRun', () => {
      const el = mount(<AppHeader seed="" showSeed={true} setRun={setRun} />);
      el.find('#quit button').simulate('click');
      expect(setRun).toHaveBeenCalledTimes(1);
    });
    it('should set the default run', () => {
      const defaultRun = getDefaultRun();
      const el = mount(<AppHeader seed="" showSeed={true} setRun={setRun} />);
      el.find('#quit button').simulate('click');
      expect(setRun).toHaveBeenCalledWith(defaultRun);
    });
  });
});
