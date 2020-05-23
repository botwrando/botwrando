import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { SeedInfo, SeedInfoProps } from './SeedInfo';
import { getDefaultRun } from '../../lib/run';

describe('SeedInfo', () => {
  let props: SeedInfoProps;
  beforeEach(() => {
    props = { run: getDefaultRun() }
  });
  describe('when no seed is set', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<SeedInfo run={props.run} />, div);
    });
    it('renders the empty seedinfo div', () => {
      const el = shallow(<SeedInfo run={props.run} />);
      expect(el.contains(<div className="seedinfo" />));
    });
    it('mounts in a full DOM', () => {
      expect(mount(<SeedInfo run={props.run} />).find('.seedinfo'))
        .toHaveLength(1);
    });
  });
  describe('when a seed is set', () => {
    beforeEach(() => {
      props.run.seed = 'abc123';
    });
    describe('upon load', () => {
      it('renders the seed div', () => {
        const wrapper = mount(<SeedInfo run={props.run} />);
        expect(wrapper.find('div.seed').exists()).toBe(true);
      });
      it('does not render the seednumber div', () => {
        const wrapper = mount(<SeedInfo run={props.run} />);
        expect(wrapper.find('div.seednumber').exists()).not.toBe(true);
      });
      it('should not render seed text', () => {
        expect(render(<SeedInfo run={props.run} />).text())
          .not.toMatch(/abc123/);
      });
    });
    describe('when the Show Seed link is clicked', () => {
      it('renders the seednumber div', () => {
        const wrapper = mount(<SeedInfo run={props.run} />);
        expect(wrapper.find('div.seed').exists()).toBe(true);
        expect(wrapper.find('div.seednumber').exists()).toBe(false);
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper
          .containsMatchingElement(<span className="seednumber">Seed: abc123 </span>))
          .toEqual(true);
      });
      it('should render seed text', () => {
        const wrapper = mount(<SeedInfo run={props.run} />);
        expect(wrapper.text()).not.toMatch(/abc123/);
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.text()).toMatch(/abc123/);
      });
      it('shows a Hide link', () => {
        const wrapper = mount(<SeedInfo run={props.run} />);
        expect(wrapper.text()).toMatch(/Show seed/);
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.text()).toMatch(/Hide/);
      });
    });
    describe('when the Hide link is clicked', () => {
      it('hides the seednumber div', () => {
        // setup: seednumber should be showing
        const wrapper = mount(<SeedInfo run={props.run} />);
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.find('div.seed').exists()).toBe(true);
        expect(wrapper
          .containsMatchingElement(<span className="seednumber">Seed: abc123 </span>))
          .toEqual(true);
        expect(wrapper.text()).toMatch(/Hide/);
        // test: click the toggle, and it should be gone
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.find('div.seednumber').exists()).toBe(false);
      });
      it('should render the expected text', () => {
        // setup: seed text should be visible
        const wrapper = mount(<SeedInfo run={props.run} />);
        expect(wrapper.text()).not.toMatch(/abc123/);
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.text()).toMatch(/abc123/);
        // test: click the toggle, and it should be gone
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.text()).not.toMatch(/abc123/);
      });
      it('shows a Show Seed link', () => {
        // setup: toggle link should say 'Hide'
        const wrapper = mount(<SeedInfo run={props.run} />);
        expect(wrapper.text()).toMatch(/Show seed/);
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.text()).toMatch(/Hide/);
        // test: click toggle and toggle link should change
        wrapper.find('span.toggle').simulate('click');
        expect(wrapper.text()).toMatch(/Show seed/);
      });
    });
  });
});
