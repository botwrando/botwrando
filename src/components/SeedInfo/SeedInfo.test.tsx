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

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SeedInfo run={props.run} />, div);
  });
  it('renders the footer contents', () => {
    const el = shallow(<SeedInfo run={props.run} />);
    expect(el.contains(<div className="seedinfo"/>));
  });
  it('mounts in a full DOM', () => {
    expect(mount(<SeedInfo run={props.run} />).find('.seedinfo'))
      .toHaveLength(1);
  });
  describe('when there is no seed', () => {
    it('does not render the seed div', () => {
      expect(shallow(<SeedInfo run={props.run} />)
        .containsMatchingElement(<div className="seed" />))
        .toEqual(false);
      expect(shallow(<SeedInfo run={props.run} />)
        .containsMatchingElement(<div className="seed">Seed: </div>))
        .toEqual(false);
    });
    it('should not render seed text', () => {
      expect(render(<SeedInfo run={props.run} />).text())
        .not.toMatch(/Seed/);
    });
  });
  describe('when there is a seed set', () => {
    beforeEach(() => {
      props.run.seed = 'abc123';
    });
    it('renders the seed div', () => {
      expect(shallow(<SeedInfo run={props.run} />)
        .containsMatchingElement(<div className="seed">Seed: abc123</div>))
        .toEqual(true);
    });
    it('should render the expected text', () => {
      expect(render(<SeedInfo run={props.run} />).text())
        .toMatch(/Seed: abc123/);
    });
  });
});
