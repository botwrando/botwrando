import { mount, render, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { getDefaultRun, Run } from '../../lib/run';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  let setRun: (run: Run) => void;
  beforeEach(() => {
    setRun = jest.fn();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppHeader hasSeed={true} setRun={setRun} />, div);
  });
  it('renders the Quit button when a seed has been picked', () => {
    const el = shallow(<AppHeader hasSeed={true} setRun={setRun} />);
    expect(el.contains(<div className="header" />));
    expect(el.contains(<div className="btn-back" />));
  });
  it('renders the seed picker screen without the Quit button', () => {
    const el = shallow(<AppHeader setRun={setRun} />);
    expect(el.contains(<div className="header" />));
    expect(el.contains(<div className="btn-back" />)).toBe(false);
  });
  it('mounts in a full DOM', () => {
    expect(mount(<AppHeader setRun={setRun} />).find('.header').length).toBe(1);
  });
  it('should render the expected text', () => {
    expect(render(<AppHeader setRun={setRun} />).text()).toMatch(
      /BotW All Shrines Randomizer/
    );
  });
  describe('when the Quit Run button is clicked', () => {
    it('should call setRun', () => {
      const el = mount(<AppHeader hasSeed={true} setRun={setRun} />);
      el.find('button#quit').simulate('pointerdown');
      expect(setRun).toHaveBeenCalledTimes(1);
    });
    it('should set the default run', () => {
      const defaultRun = getDefaultRun();
      const el = mount(<AppHeader hasSeed={true} setRun={setRun} />);
      el.find('button#quit').simulate('pointerdown');
      expect(setRun).toHaveBeenCalledWith(defaultRun);
    });
  });
});
