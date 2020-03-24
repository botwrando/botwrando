import { Timestamp, trunc, pad, getTimestamp, smart_format } from './time';

describe('time', () => {
  describe('trunc', () => {
    it('truncates a timestamp integer correctly', () => {
      expect(trunc(12345)).toEqual(1234);
      expect(trunc(8)).toEqual(0);
    });
  });

  describe('pad', () => {
    it('zero-pads integers to the default length of 2', () => {
      expect(pad(0)).toEqual('00');
      expect(pad(5)).toEqual('05');
      expect(pad(23)).toEqual('23');
      expect(pad(352)).toEqual('352');
    });
    it('zero-pads integers to the specified length', () => {
      expect(pad(55, 4)).toEqual('0055');
    });
    it('does not zero-pad when length 0 is specified', () => {
      expect(pad(2, 0)).toEqual('2');
      expect(pad(2536, 0)).toEqual('2536');
    });
  });

  describe('getTimestamp', () => {
    it('returns a Timestamp representation of the number', () => {
      const ts: Timestamp = getTimestamp(199308563);
      expect(ts).toHaveProperty('h');
      expect(ts).toHaveProperty('m');
      expect(ts).toHaveProperty('s');
      expect(ts).toHaveProperty('ms');
      expect(ts).toMatchObject({
        h: '55',
        m: '21',
        s: '48',
        ms: '56'
      });
    });
  });

  describe('smart_format', () => {
    describe('with full_format = false', () => {
      it('formats positive seconds correctly', () => {
        const expected: Timestamp = { s: '48', ms: '56', sign: '' };
        const formatted = smart_format(48563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats positive minutes correctly', () => {
        const expected: Timestamp = { m: '21', s: '48', sign: '' };
        const formatted = smart_format(1308563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours correctly', () => {
        const expected: Timestamp = { h: '07', m: '21', s: '48', sign: '' };
        const formatted = smart_format(26508563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours > 1 day correctly', () => {
        const expected: Timestamp = { h: '55', m: '21', s: '48', sign: '' };
        const formatted = smart_format(199308563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats negative seconds correctly', () => {
        const expected: Timestamp = { s: '48', ms: '56', sign: '-' };
        const formatted = smart_format(-48563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats negative minutes correctly', () => {
        const expected: Timestamp = { m: '21', s: '48', sign: '-' };
        const formatted = smart_format(-1308563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats negative hours correctly', () => {
        const expected: Timestamp = { h: '07', m: '21', s: '48', sign: '-' };
        const formatted = smart_format(-26508563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats negative hours of magnitude > 1 day correctly', () => {
        const expected: Timestamp = { h: '55', m: '21', s: '48', sign: '-' };
        const formatted = smart_format(-199308563, false);
        expect(formatted).toEqual(expected);
      });
      it('formats positive seconds with a specified sign', () => {
        const expected: Timestamp = { s: '48', ms: '56', sign: '+' };
        const formatted = smart_format(48563, false, '+');
        expect(formatted).toEqual(expected);
      });
      it('formats positive minutes with a specified sign', () => {
        const expected: Timestamp = { m: '21', s: '48', sign: '+' };
        const formatted = smart_format(1308563, false, '+');
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours with a specified sign', () => {
        const expected: Timestamp = { h: '07', m: '21', s: '48', sign: '+' };
        const formatted = smart_format(26508563, false, '+');
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours > 1 day with a specified sign', () => {
        const expected: Timestamp = { h: '55', m: '21', s: '48', sign: '+' };
        const formatted = smart_format(199308563, false, '+');
        expect(formatted).toEqual(expected);
      });
    });

    describe('with full_format = true', () => {
      it('formats positive seconds correctly', () => {
        const expected: Timestamp = { s: '48', ms: '56', sign: '' };
        const formatted = smart_format(48563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats positive minutes correctly', () => {
        const expected: Timestamp = { m: '21', s: '48', ms: '56', sign: '' };
        const formatted = smart_format(1308563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours correctly', () => {
        const expected: Timestamp = { h: '07', m: '21', s: '48', ms: '56', sign: '' };
        const formatted = smart_format(26508563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours > 1 day correctly', () => {
        const expected: Timestamp = { h: '55', m: '21', s: '48', ms: '56', sign: '' };
        const formatted = smart_format(199308563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats negative seconds correctly', () => {
        const expected: Timestamp = { s: '48', ms: '56', sign: '-' };
        const formatted = smart_format(-48563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats negative minutes correctly', () => {
        const expected: Timestamp = { m: '21', s: '48', ms: '56', sign: '-' };
        const formatted = smart_format(-1308563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats negative hours correctly', () => {
        const expected: Timestamp = { h: '07', m: '21', s: '48', ms: '56', sign: '-' };
        const formatted = smart_format(-26508563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats negative hours of magnitude > 1 day correctly', () => {
        const expected: Timestamp = { h: '55', m: '21', s: '48', ms: '56', sign: '-' };
        const formatted = smart_format(-199308563, true);
        expect(formatted).toEqual(expected);
      });
      it('formats positive seconds with a specified sign', () => {
        const expected: Timestamp = { s: '48', ms: '56', sign: '+' };
        const formatted = smart_format(48563, true, '+');
        expect(formatted).toEqual(expected);
      });
      it('formats positive minutes with a specified sign', () => {
        const expected: Timestamp = { m: '21', s: '48', ms: '56', sign: '+' };
        const formatted = smart_format(1308563, true, '+');
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours with a specified sign', () => {
        const expected: Timestamp = { h: '07', m: '21', s: '48', ms: '56', sign: '+' };
        const formatted = smart_format(26508563, true, '+');
        expect(formatted).toEqual(expected);
      });
      it('formats positive hours > 1 day with a specified sign', () => {
        const expected: Timestamp = { h: '55', m: '21', s: '48', ms: '56', sign: '+' };
        const formatted = smart_format(199308563, true, '+');
        expect(formatted).toEqual(expected);
      });
    });
  });
});
