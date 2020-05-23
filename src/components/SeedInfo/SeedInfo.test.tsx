import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { SeedInfo, SeedInfoProps } from './SeedInfo';

describe('SeedInfo', () => {
  let props: SeedInfoProps;
  let showSeed: boolean;
  beforeEach(() => {
    const onToggleShowSeed = jest.fn().mockImplementation(() => { showSeed = !showSeed; });
    showSeed = false;
    props = { seed: '', showSeed: showSeed, toggleShowSeed: onToggleShowSeed }
  });
  describe('when no seed is set', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <SeedInfo
          seed={props.seed}
          showSeed={props.showSeed}
          toggleShowSeed={props.toggleShowSeed}
        />, div
      );
    });
    it('renders the empty seedinfo div', () => {
      const el = shallow(
        <SeedInfo
          seed={props.seed}
          showSeed={props.showSeed}
          toggleShowSeed={props.toggleShowSeed}
        />
      );
      expect(el.contains(<div className="seedinfo" />));
    });
    it('mounts in a full DOM', () => {
      expect(mount(
        <SeedInfo
          seed={props.seed}
          showSeed={props.showSeed}
          toggleShowSeed={props.toggleShowSeed}
        />
      ).find('.seedinfo'))
        .toHaveLength(1);
    });
  });
  describe('when a seed is set', () => {
    beforeEach(() => {
      props.seed = 'abc123';
    });
    describe('when showSeed is false', () => {
      beforeEach(() => {
        props.showSeed = false;
      });
      it('renders the seed div', () => {
        const wrapper = mount(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        );
        expect(wrapper.find('div.seed').exists()).toBe(true);
      });
      it('does not render the seednumber div', () => {
        const wrapper = mount(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        );
        expect(wrapper.find('div.seednumber').exists()).not.toBe(true);
      });
      it('should not render seed text', () => {
        expect(render(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        ).text())
          .not.toMatch(/abc123/);
      });
      it('displays a Show Seed toggle link', () => {
        expect(render(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        ).find('span.toggle').text()).toMatch(/Show seed/);
      });
    });
    describe('when showSeed is true', () => {
      beforeEach(() => {
        props.showSeed = true;
      });
      it('renders the seed div', () => {
        const wrapper = mount(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        );
        expect(wrapper.find('div.seed').exists()).toBe(true);
      });
      it('renders the seednumber div', () => {
        const wrapper = mount(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        );
        expect(wrapper
          .containsMatchingElement(<span className="seednumber">Seed: abc123 </span>))
          .toEqual(true);
      });
      it('renders the seed text', () => {
        expect(render(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        ).text()).toMatch(/abc123/);
      });
      it('displays a Hide toggle link', () => {
        expect(render(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        ).find('span.toggle').text()).toMatch(/Hide/);
      });
    });
    describe('when the Show Seed link is clicked', () => {
      it('calls the toggleShowSeed function', () => {
        const wrapper = mount(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        );
        wrapper.find('span.toggle').simulate('click');
        expect(props.toggleShowSeed).toHaveBeenCalledTimes(1);
      });
    });
    describe('when the Hide link is clicked', () => {
      it('calls the toggleShowSeed function', () => {
        const wrapper = mount(
          <SeedInfo
            seed={props.seed}
            showSeed={props.showSeed}
            toggleShowSeed={props.toggleShowSeed}
          />
        );
        wrapper.find('span.toggle').simulate('click');
        expect(props.toggleShowSeed).toHaveBeenCalledTimes(1);
      });
    });
  });
});
