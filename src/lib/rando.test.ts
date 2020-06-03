import { getRandomizedWaypoints, getRandomSeed, Presets, range } from './rando';
import { BLOOD_MOON_SHRINE, DUPE_SHRINE, EVENTIDE_SHRINE, GANON, PLATEAU_SHRINES } from './waypoints';

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
    it('generates an 8 character string containing alphanumerics', () => {
      const seed = getRandomSeed(8);
      expect(seed.length).toEqual(8);
      const regexp = /^[A-Za-z0-9]+$/
      expect(regexp.test(seed)).toBe(true);
    });
    it('generates a 40 character string containing alphanumerics', () => {
      const seed = getRandomSeed(40);
      expect(seed.length).toEqual(40);
      const regexp = /^[A-Za-z0-9]+$/
      expect(regexp.test(seed)).toBe(true);
    });
    it('generates a unique seed each run', () => {
      const seeds = Array.from(new Array(10)).map(() => getRandomSeed());
      const deduped = seeds.filter(function(seed, idx, allSeeds) {
        return allSeeds.indexOf(seed) === idx;
      });
      expect(seeds).toEqual(deduped);
    });
  });

  describe('getRandomizedWaypoints', () => {
    it('shuffles the shrines', () => {
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed());
        expect(waypoints).not.toEqual(Array.from(Array(119).keys()).map(x => x++));
      }
    });
    it('includes each shrine only once', () => {
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed());
        const deduped = waypoints.filter(function(waypointId, idx, allShrines) {
          return allShrines.indexOf(waypointId) === idx;
        });
        expect(waypoints).toEqual(deduped);
      }
    });
    it('includes all shrines except the blood moon shrine', () => {
      let allWaypoints = Array.from(Array(BLOOD_MOON_SHRINE).keys()).map(x => x++);
      allWaypoints = allWaypoints.concat(
        Array.from(Array(120 - BLOOD_MOON_SHRINE - 1).keys())
          .map(x => x += BLOOD_MOON_SHRINE + 1)
      );
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed());
        for (const waypointId of allWaypoints) {
          expect(waypoints).toContain(waypointId);
        }
      }
    });
    it('always includes the plateau shrines first', () => {
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed());
        for (const waypointId of PLATEAU_SHRINES) {
          expect(waypoints.slice(0, 4)).toContain(waypointId);
          expect(waypoints.slice(4)).not.toContain(waypointId);
        }
      }
    });
    it('does not include the blood moon shrine', () => {
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed());
        expect(waypoints).not.toContain(BLOOD_MOON_SHRINE);
      }
    });
    describe('Default profile', () => {
      it('puts the eventide island shrine at position 80 or later in the run', () => {
        for (let n = 0; n < 10; n++) {
          const seed = getRandomSeed();
          const waypoints = getRandomizedWaypoints(seed, Presets.Default?.flags);
          expect(waypoints.slice(80)).toContain(EVENTIDE_SHRINE);
          expect(waypoints.slice(0, 80)).not.toContain(EVENTIDE_SHRINE);
        }
      });
    });
    describe('Runner profile', () => {
      it('puts the dupe shrine between position 20 and 40', () => {
        for (let n = 0; n < 10; n++) {
          const seed = getRandomSeed();
          const waypoints = getRandomizedWaypoints(seed, Presets.Default?.flags);
          expect(waypoints.slice(40)).not.toContain(DUPE_SHRINE);
          expect(waypoints.slice(20, 40)).toContain(DUPE_SHRINE);
        }
      });
    });
    it('puts the Ganon waypoint at the end', () => {
      for (let n = 0; n < 10; n++) {
        const seed = getRandomSeed();
        const waypoints = getRandomizedWaypoints(seed);
        expect(waypoints.slice(118)).toContain(GANON);
        expect(waypoints.slice(0, 118)).not.toContain(GANON);
      }
    })
  });
});
