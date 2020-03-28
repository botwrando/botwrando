import { groupBy, throttle } from './utils';

describe('utils', () => {
  describe('groupBy', () => {
    it('groups an array with keys from a function', () => {
      const obj = [{ id: 'z1',  }, { id: 'z2' }, { id: 'z1' }, { id: 'z3' }, { id: 'z2' }];
      const grouped = groupBy(obj, (val: Record<string, string>) => val.id);
      expect(grouped).toBeInstanceOf(Map);
      expect(grouped.size).toEqual(3);
      expect(grouped.has('z1')).toBe(true);
      expect(grouped.has('z2')).toBe(true);
      expect(grouped.has('z3')).toBe(true);
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('throttles the function passed in', () => {
      const original = jest.fn();
      const throttled = throttle(original, 100);
      for (let x = 0; x < 5; x++) { throttled(); };
      expect(original).toHaveBeenCalledTimes(1);
    });
    it('allows another call after the timeframe specified', () => {
      const original = jest.fn();
      const throttled = throttle(original, 100);
      for (let x = 0; x < 5; x++) {
        throttled();
        jest.advanceTimersByTime(25);
      };
      expect(original).toHaveBeenCalledTimes(2);
    });
  });
});
