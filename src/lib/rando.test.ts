import { getRandomizedWaypoints, getRandomSeed, range, Ranges } from './rando';
import { Waypoint, Presets } from './waypoint';

const allFlags = {
  // ClampDist: true, // TODO: Not ready yet!
  EarlyDupe: true,
  LateEventide: true,
  LateMajorTests: true
};

const getNonBloodShrineWaypoints = () => {
  return Waypoint.all
    .filter((w) => !w.inCollection('BLOOD_MOON'))
    .map((w) => w.id);
};

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
        const waypoints = getRandomizedWaypoints(getRandomSeed(), allFlags);
        expect(waypoints).not.toEqual(Array.from(Array(119).keys()).map(x => x++));
      }
    });
    it('includes each shrine only once', () => {
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed(), allFlags);
        const deduped = waypoints.filter(function(waypointId, idx, allShrines) {
          return allShrines.indexOf(waypointId) === idx;
        });
        expect(waypoints).toEqual(deduped);
      }
    });
    it('includes all shrines except the blood moon shrine', () => {
      const allWaypoints = getNonBloodShrineWaypoints();
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed(), allFlags);
        for (const waypointId of allWaypoints) {
          expect(waypoints).toContain(waypointId);
        }
      }
    });
    it('always includes the plateau shrines first', () => {
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed(), allFlags);
        const plateauShrines = Waypoint.all.filter((w) => {
          return (new Waypoint(w)).isPlateau;
        }).map((w) => w.id);
        for (const waypointId of plateauShrines) {
          expect(waypoints.slice(0, 4)).toContain(waypointId);
          expect(waypoints.slice(4)).not.toContain(waypointId);
        }
      }
    });
    it('does not include the blood moon shrine', () => {
      const [ bloodMoonShrine, ] = Waypoint.byCollection('BLOOD_MOON');
      for (let n = 0; n < 10; n++) {
        const waypoints = getRandomizedWaypoints(getRandomSeed(), allFlags);
        expect(waypoints).not.toContain(bloodMoonShrine);
      }
    });
    it('puts the Ganon waypoint at the end', () => {
      const [ ganon, ] = Waypoint.byCollection('GANON');
      for (let n = 0; n < 10; n++) {
        const seed = getRandomSeed();
        const waypoints = getRandomizedWaypoints(seed);
        expect(waypoints.slice(118)).toContain(ganon.id);
        expect(waypoints.slice(0, 118)).not.toContain(ganon.id);
      }
    });
    it('puts the eventide island shrine late in the run if LateEventide flag', () => {
      const [ eventideShrine, ] = Waypoint.byCollection('EVENTIDE');
      for (let n = 0; n < 10; n++) {
        const seed = getRandomSeed();
        const waypoints = getRandomizedWaypoints(seed, { LateEventide: true });
        expect(waypoints.indexOf(eventideShrine.id))
          .toBeGreaterThanOrEqual(Ranges.Late.bound);
      }
    });
    it('puts Major Test Shrines late in the run if LateMajorTests flag', () => {
      const majorTests = Waypoint.byCollection('MAJOR_TEST');
      for (let n = 0; n < 10; n++) {
        const seed = getRandomSeed()
        const waypoints = getRandomizedWaypoints(seed, { LateMajorTests: true });
        for (const waypoint of majorTests) {
          expect(waypoints.indexOf(waypoint.id))
            .toBeGreaterThanOrEqual(Ranges.Late.bound);
        }
      }
    });
    it('puts the dupe shrine early in the run if EarlyDupe flag', () => {
      const [ dupeShrine, ] = Waypoint.byCollection('DUPE_GLITCH');
      for (let n = 0; n < 10; n++) {
        const seed = getRandomSeed();
        const waypoints = getRandomizedWaypoints(seed, { EarlyDupe: true });
        expect(waypoints.indexOf(dupeShrine.id))
          .toBeGreaterThanOrEqual(Ranges.Early.bound);
        expect(waypoints.indexOf(dupeShrine.id))
          .toBeLessThanOrEqual(Ranges.Early.limit as number);
      }
    });
  });
});
