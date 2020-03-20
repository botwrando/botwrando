import { format_time, format_time_full } from "./time";

describe('time', () => {
  describe('format_time', () => {
    it('formats positive seconds correctly', () => {
      const formatted = format_time(48563);
      expect(formatted).toEqual("48.56");
    });
    it('formats positive minutes correctly', () => {
      const formatted = format_time(1308563);
      expect(formatted).toEqual("21:48");
    });
    it('formats positive hours correctly', () => {
      const formatted = format_time(26508563);
      expect(formatted).toEqual("7:21:48");
    });
    it('formats positive days correctly', () => {
      const formatted = format_time(199308563);
      expect(formatted).toEqual("2 7:21");
    });
    it('formats negative seconds correctly', () => {
      const formatted = format_time(-48563);
      expect(formatted).toEqual("-48.56");
    });
    it('formats negative minutes correctly', () => {
      const formatted = format_time(-1308563);
      expect(formatted).toEqual("-21:48");
    });
    it('formats negative hours correctly', () => {
      const formatted = format_time(-26508563);
      expect(formatted).toEqual("-7:21:48");
    });
    it('formats negative days correctly', () => {
      const formatted = format_time(-199308563);
      expect(formatted).toEqual("-2 7:21");
    });
    it('formats missing values with the empty format specified', () => {
      const formatted = format_time(undefined, '---');
      expect(formatted).toEqual("---");
    });
    it('formats -1 values with the empty format specified', () => {
      // TODO: Rework this to use undefined or null for unset splits
      const formatted = format_time(-1, '---');
      expect(formatted).toEqual("---");
    });
    it('formats positive seconds with a specified sign', () => {
      const formatted = format_time(48563, undefined, '+');
      expect(formatted).toEqual("+48.56");
    });
    it('formats positive minutes with a specified sign', () => {
      const formatted = format_time(1308563, undefined, '+');
      expect(formatted).toEqual("+21:48");
    });
    it('formats positive hours with a specified sign', () => {
      const formatted = format_time(26508563, undefined, '+');
      expect(formatted).toEqual("+7:21:48");
    });
    it('formats positive days with a specified sign', () => {
      const formatted = format_time(199308563, undefined, '+');
      expect(formatted).toEqual("+2 7:21");
    });
  });

  describe('format_time_full', () => {
    it('formats positive seconds correctly', () => {
      const formatted = format_time_full(48563);
      expect(formatted).toEqual("48.56");
    });
    it('formats positive minutes correctly', () => {
      const formatted = format_time_full(1308563);
      expect(formatted).toEqual("21:48.56");
    });
    it('formats positive hours correctly', () => {
      const formatted = format_time_full(26508563);
      expect(formatted).toEqual("7:21:48.56");
    });
    it('formats positive days correctly', () => {
      const formatted = format_time_full(199308563);
      expect(formatted).toEqual("2 7:21:48.56");
    });
    it('formats negative seconds correctly', () => {
      const formatted = format_time_full(-48563);
      expect(formatted).toEqual("-48.56");
    });
    it('formats negative minutes correctly', () => {
      const formatted = format_time_full(-1308563);
      expect(formatted).toEqual("-21:48.56");
    });
    it('formats negative hours correctly', () => {
      const formatted = format_time_full(-26508563);
      expect(formatted).toEqual("-7:21:48.56");
    });
    it('formats negative days correctly', () => {
      const formatted = format_time_full(-199308563);
      expect(formatted).toEqual("-2 7:21:48.56");
    });
    it('formats missing values with the empty format specified', () => {
      const formatted = format_time_full(undefined, '---');
      expect(formatted).toEqual("---");
    });
    it('formats -1 values with the empty format specified', () => {
      // TODO: Rework this to use undefined or null for unset splits
      const formatted = format_time_full(-1, '---');
      expect(formatted).toEqual("---");
    });
    it('formats positive seconds with a specified sign', () => {
      const formatted = format_time_full(48563, undefined, '+');
      expect(formatted).toEqual("+48.56");
    });
    it('formats positive minutes with a specified sign', () => {
      const formatted = format_time_full(1308563, undefined, '+');
      expect(formatted).toEqual("+21:48.56");
    });
    it('formats positive hours with a specified sign', () => {
      const formatted = format_time_full(26508563, undefined, '+');
      expect(formatted).toEqual("+7:21:48.56");
    });
    it('formats positive days with a specified sign', () => {
      const formatted = format_time_full(199308563, undefined, '+');
      expect(formatted).toEqual("+2 7:21:48.56");
    });
  });
});
