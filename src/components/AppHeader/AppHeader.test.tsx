import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { AppHeader } from './AppHeader';
import { Run, getDefaultRun } from '../../lib/run';

describe('AppHeader', () => {
  let setRun: (run: Run) => void;
  beforeEach(() => {
    setRun = jest.fn();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppHeader setRun={setRun} />, div);
  });
  it('renders the header contents', () => {
    const el = shallow(<AppHeader setRun={setRun} />);
    expect(el.contains(<div className="header"/>));
  });
  it('mounts in a full DOM', () => {
    expect(mount(<AppHeader setRun={setRun} />).find('.header').length).toBe(1);
  });
  it('should render the expected text', () => {
    expect(render(<AppHeader setRun={setRun} />).text())
      .toMatch(/BotW All Shrines Randomizer/);
  });
  describe('when the Quit Run button is clicked', () => {
    it('should call setRun', () => {
      const el = mount(<AppHeader setRun={setRun} />);
      el.find('button').simulate('click');
      expect(setRun).toHaveBeenCalledTimes(1);
    });
    it('should set the default run', () => {
      const defaultRun = getDefaultRun();
      const el = mount(<AppHeader setRun={setRun} />);
      el.find('button').simulate('click');
      expect(setRun).toHaveBeenCalledWith(defaultRun);
    });
  });
});
