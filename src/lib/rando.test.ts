import { range, getRandomSeed, getRandomizedShrines } from "./rando";
import { PLATEAU_SHRINES, BLOOD_MOON_SHRINE, EVENTIDE_SHRINE } from "./shrines";

describe('rando', () => {
  describe('range', () => {
    describe('when a limit is provided', () => {
      it('provides an array of the expected length', () => {
        const vals = range(10, 20);
        expect(vals.length).toEqual(11);
      });
      it('provides sequential numbers', () => {
        const vals = range(10, 20);
        vals.reduce((prev, curr, _idx, _arr) => {
          expect(prev).toEqual(curr - 1);
          return curr;
        });
      });
      it('provides values starting with the lower bound', () => {
        const vals = range(10, 20);
        expect(vals[0]).toEqual(10);
      });
      it('provides values ending at the upper bound', () => {
        const vals = range(10, 20);
        expect(vals[vals.length - 1]).toEqual(20);
      });
    });

    describe('when a limit is not provided', () => {
      it('provides an array of the expected length', () => {
        const vals = range(10);
        expect(vals.length).toEqual(11);
      });
      it('provides sequential numbers', () => {
        const vals = range(10);
        vals.reduce((prev, curr, _idx, _arr) => {
          expect(prev).toEqual(curr - 1);
          return curr;
        });
      });
      it('provides values starting with zero', () => {
        const vals = range(10);
        expect(vals[0]).toEqual(0);
      });
      it('provides values ending at the bound provided', () => {
        const vals = range(10);
        expect(vals[vals.length - 1]).toEqual(10);
      });
    });
  });

  describe('getRandomSeed', () => {
    it('generates a 40 character string containing alphanumerics', () => {
      const seed = getRandomSeed();
      expect(seed.length).toEqual(40);
      const regexp = /^[A-Za-z0-9]+$/
      expect(regexp.test(seed)).toBe(true);
    });
    it('generates a unique seed each run', () => {
      const seeds = Array.from(new Array(10)).map(() => getRandomSeed());
      const deduped = seeds.filter(function (seed, idx, allSeeds) {
        return allSeeds.indexOf(seed) === idx;
      });
      expect(seeds).toEqual(deduped);
    });
  });

  describe('getRandomizedShrines', () => {
    it('shuffles the shrines', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getRandomizedShrines(getRandomSeed());
        expect(shrines).not.toEqual(Array.from(Array(119).keys()).map(x => x++));
      }
    });
    it('includes each shrine only once', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getRandomizedShrines(getRandomSeed());
        const deduped = shrines.filter(function (shrineId, idx, allShrines) {
          return allShrines.indexOf(shrineId) === idx;
        });
        expect(shrines).toEqual(deduped);
      }
    });
    it('includes all shrines except the blood moon shrine', () => {
      let allShrines = Array.from(Array(BLOOD_MOON_SHRINE).keys()).map(x => x++);
      allShrines = allShrines.concat(
        Array.from(Array(120 - BLOOD_MOON_SHRINE - 1).keys())
          .map(x => x += BLOOD_MOON_SHRINE + 1)
      );
      for (let n = 0; n < 10; n++) {
        const shrines = getRandomizedShrines(getRandomSeed());
        for (const shrineId of allShrines) {
          expect(shrines).toContain(shrineId);
        }
      }
    });
    it('always includes the plateau shrines first', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getRandomizedShrines(getRandomSeed());
        for (const shrineId of PLATEAU_SHRINES) {
          expect(shrines.slice(0, 4)).toContain(shrineId);
          expect(shrines.slice(4)).not.toContain(shrineId);
        }
      }
    });
    it('does not include the blood moon shrine', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getRandomizedShrines(getRandomSeed());
        expect(shrines).not.toContain(BLOOD_MOON_SHRINE);
      }
    });
    it('puts the eventide island shrine at position 80 or later in the run', () => {
      for (let n = 0; n < 10; n++) {
        const seed = getRandomSeed();
        const shrines = getRandomizedShrines(seed);
        expect(shrines.slice(80)).toContain(EVENTIDE_SHRINE);
        expect(shrines.slice(0, 80)).not.toContain(EVENTIDE_SHRINE);
      }
    });
  });
});
