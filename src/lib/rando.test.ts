import { range, getShrines } from "./rando";
const plateauShrines = [38, 41, 9, 65];
const bloodMoonShrine = 78;
const eventideShrine = 97;

const getRandomSeed = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let a;
  for (a = ''; a.length < 40;) {
    a += chars[(Math.random() * 60) | 0];
  }
  return a;
}

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

  describe('getShrines', () => {
    it('shuffles the shrines', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getShrines(getRandomSeed());
        expect(shrines).not.toEqual(Array.from(Array(119).keys()).map(x => x++));
      }
    });
    it('includes each shrine only once', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getShrines(getRandomSeed());
        const deduped = shrines.filter(function (shrineId, idx, allShrines) {
          return allShrines.indexOf(shrineId) === idx;
        });
        expect(shrines).toEqual(deduped);
      }
    });
    it('includes all shrines except the blood moon shrine', () => {
      let allShrines = Array.from(Array(bloodMoonShrine).keys()).map(x => x++);
      allShrines = allShrines.concat(
        Array.from(Array(120 - bloodMoonShrine - 1).keys())
          .map(x => x += bloodMoonShrine + 1)
      );
      for (let n = 0; n < 10; n++) {
        const shrines = getShrines(getRandomSeed());
        for (const shrineId of allShrines) {
          expect(shrines).toContain(shrineId);
        }
      }
    });
    it('always includes the plateau shrines first', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getShrines(getRandomSeed());
        for (const shrineId of plateauShrines) {
          expect(shrines.slice(0, 4)).toContain(shrineId);
          expect(shrines.slice(4)).not.toContain(shrineId);
        }
      }
    });
    it('does not include the blood moon shrine', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getShrines(getRandomSeed());
        expect(shrines).not.toContain(bloodMoonShrine);
      }
    });
    it('puts the eventide island shrine toward the end of the run', () => {
      for (let n = 0; n < 10; n++) {
        const shrines = getShrines(getRandomSeed());
        expect(shrines.slice(80, 118)).toContain(eventideShrine);
        expect(shrines.slice(0, 80)).not.toContain(eventideShrine);
        expect(shrines.slice(118)).not.toContain(eventideShrine);
      }
    });
  });
});
