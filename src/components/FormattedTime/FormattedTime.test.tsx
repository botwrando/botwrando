import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { FormattedTime, FormattedTimeProps } from './FormattedTime';

describe('FormattedTime', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormattedTime />, div);
  });
  it('renders a zero timestamp by default', () => {
    const el = shallow(<FormattedTime />);
    expect(el.contains(<span className="s">00</span>)).toBe(true);
    expect(el.contains(<span className="ms">.00</span>)).toBe(true);
  });
  it('does not include the sign if not present', () => {
    const props: FormattedTimeProps = {
      timestamp: 9107593,
      fullFormat: true
    }
    const el = shallow(<FormattedTime
      timestamp={props.timestamp}
      fullFormat={props.fullFormat}
      plusSign={props.plusSign}
    />);
    expect(el.contains(<span className="h">02</span>));
    expect(el.contains(<span className="m">31</span>));
    expect(el.contains(<span className="s">47</span>));
    expect(el.contains(<span className="ms">59</span>));
  });
  describe('when fullFormat is true', () => {
    it('renders the specified timestamp', () => {
      const props: FormattedTimeProps = {
        timestamp: 9107593,
        fullFormat: true,
        plusSign: '+'
      }
      const el = shallow(<FormattedTime
        timestamp={props.timestamp}
        fullFormat={props.fullFormat}
        plusSign={props.plusSign}
      />);
      expect(el.contains(<span className="sign">+</span>));
      expect(el.contains(<span className="h">02</span>));
      expect(el.contains(<span className="m">31</span>));
      expect(el.contains(<span className="s">47</span>));
      expect(el.contains(<span className="ms">59</span>));
    });
  });
  describe('when fullFormat is missing or false', () => {
    it('renders with the plus sign specified when included', () => {
      const props: FormattedTimeProps = { timestamp: 47593, plusSign: '+++' };
      const el = shallow(<FormattedTime
        timestamp={props.timestamp}
        fullFormat={props.fullFormat}
        plusSign={props.plusSign}
      />);
      expect(el.contains(<span className="sign">+++</span>));
      expect(el.contains(<span className="s">47</span>));
      expect(el.contains(<span className="ms">59</span>));
    });
    it('renders only seconds and milliseconds when less than a minute', () => {
      const props: FormattedTimeProps = { timestamp: 47593 };
      const el = shallow(<FormattedTime
        timestamp={props.timestamp}
        fullFormat={props.fullFormat}
        plusSign={props.plusSign}
      />);
      expect(el.contains(<span className="s">47</span>));
      expect(el.contains(<span className="ms">59</span>));
    });
    it('renders only minutes and seconds when between a minute and an hour', () => {
      const props: FormattedTimeProps = { timestamp: 167593 };
      const el = shallow(<FormattedTime
        timestamp={props.timestamp}
        fullFormat={props.fullFormat}
        plusSign={props.plusSign}
      />);
      expect(el.contains(<span className="m">02</span>));
      expect(el.contains(<span className="s">47</span>));
    });
    it('renders only hours, minutes and seconds when over an hour', () => {
      const props: FormattedTimeProps = { timestamp: 9107593 };
      const el = shallow(<FormattedTime
        timestamp={props.timestamp}
        fullFormat={props.fullFormat}
        plusSign={props.plusSign}
      />);
      expect(el.contains(<span className="h">02</span>));
      expect(el.contains(<span className="m">31</span>));
      expect(el.contains(<span className="s">47</span>));
    });
  });
  it('renders the empty label when the timestamp is -Infinity', () => {
    const props: FormattedTimeProps = {
      timestamp: Number.NEGATIVE_INFINITY,
      emptyLabel: 'spork'
    };
    const el = shallow(<FormattedTime
      timestamp={props.timestamp}
      emptyLabel={props.emptyLabel}
    />);
    expect(el.contains(<span className="empty">spork</span>));
  });
  it('mounts in a full DOM', () => {
    expect(mount(<FormattedTime />).find('.s').length).toBe(1);
    expect(mount(<FormattedTime />).find('.ms').length).toBe(1);
  });
  it('should render the expected text', () => {
    expect(render(<FormattedTime />).text()).toEqual('00.00');
  });
});
