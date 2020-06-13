import { shuffle } from 'shuffle-seed';
import { Waypoint } from './waypoint';

export type RangeLimit = {
  bound: number,
  limit: number | undefined
};

export function range(bound: number, limit:number = 0): number[] {
  const start = limit ? bound : 0;
  const end = limit ? limit : bound;
  const base = [...Array.from(Array(end - start + 1).keys())];
  return base.map((idx: number) => start + idx);
}

export function getRandomSeed(numChars = 12): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let a;
  for (a = ''; a.length < numChars;) { a += chars[(Math.random() * 60) | 0]; }
  return a;
}

export type RandoFlags = Partial<{
  LateEventide: boolean,
  EarlyDupe: boolean,
  ClampDist: boolean,
  LateMajorTests: boolean,
}>;

export type ValidPreset = 'None' | 'Default' | 'Casual' | 'Runner';

export type RandoPreset = {
  name: string
  desc: string
  flags: RandoFlags
}

export const Ranges: {[key: string]: RangeLimit} = {
  Plateau: { bound:   0, limit:   3 },
  Any:     { bound:   4, limit: 118 },
  Early:   { bound:  20, limit:  40 },
  Late:    { bound:  80, limit: 118 },
  Ganon:   { bound: 119, limit: 119 }
}
function inRange(ordering: number, { bound, limit }: RangeLimit): boolean {
  return ordering >= bound && ordering <= (limit ? limit : bound);
}
function validPlateau(ordering: number): boolean {
  return inRange(ordering, Ranges.Plateau);
}
function validEarly(ordering: number): boolean {
  return inRange(ordering, Ranges.Early);
}
function validLate(ordering: number): boolean {
  return inRange(ordering, Ranges.Late);
}
function validGanon(ordering: number): boolean {
  return inRange(ordering, Ranges.Ganon);
}

export const Presets: Partial<Record<ValidPreset, RandoPreset>> = {
  'Default': {
    name: 'Default',
    desc: 'Shuffled shrines, nothing more',
    flags: {},
  },
  'Casual': {
    name: 'Casual',
    desc: 'Shorter distances between shrines, late Eventide, late Major Tests',
    flags: { LateEventide: true, ClampDist: true, LateMajorTests: true },
  },
  'Runner': {
    name: 'Runner',
    desc: 'Early heart / stamina duping, late Eventide',
    flags: { EarlyDupe: true, LateEventide: true },
  }
}

export function getRandomizedWaypoints(
  seed: string,
  flags: RandoFlags = Presets.Default!.flags
): number[] {
  const placements = shuffle(range(120), seed);
  if (flags.ClampDist) { return generateClampDistOrdering(placements, flags); }
  else {
    Waypoint.forEach((waypoint: Waypoint) => {
      let valid = [...placements];
      if (waypoint.isGanon) { valid = valid.filter(validGanon); }
      if (waypoint.isPlateau) { valid = valid.filter(validPlateau); }
      const waypointEarly = flags.EarlyDupe && waypoint.isDupeGlitch;
      const waypointLate = (flags.LateMajorTests && waypoint.isMajorTestOfStrength) ||
        (flags.LateEventide && waypoint.isEventide);
      if (waypointEarly) { valid = valid.filter(validEarly); }
      if (waypointLate) { valid = valid.filter(validLate); }
      if (valid.length === 0) {
        // should not happen, but just in case...
        throw new Error(`Error placing waypoint ${waypoint.id}: ${waypoint.name} using seed ${seed}`);
      }
      let placed: boolean = false, i: number = 0;
      while (!placed) {
        if (isValidForPlacement(waypoint, valid[i], flags)) {
          waypoint.placeAt(valid[i]);
          placed = true;
        }
        i++;
        if (i === valid.length) {
          // should not happen, but just in case...
          throw new Error(`Error placing waypoint ${waypoint.id}: ${waypoint.name} using seed ${seed}`);
        }
      }
    });
    return Waypoint.all
      .sort((a: Waypoint, b: Waypoint) => {
        if (a.placement !== null && b.placement !== null) {
          return a.placement - b.placement
        }
        if (a.placement === null) { return -1; }
        if (a.placement === null) { return 1; }
        return 0;
      })
      .map((w: Waypoint) => w.id);
  }
}

function generateClampDistOrdering(
  placements: number[],
  flags: RandoFlags = Presets.Default!.flags
): number[] {
  for (const placement: number of placements) {
    // For each plaecment, find all waypoints in box of prior that meet conditions,
    // and place first candidate there.

  }
  return [];
}

function isValidForPlacement(waypoint: Waypoint, placement: number, flags: RandoFlags) {
  const constraints = {
    isPlateau: Ranges.Plateau,
    isDupeGlitch: {
      bound: flags.EarlyDupe ? Ranges.Early.bound : Ranges.Any.bound,
      range: flags.EarlyDupe ? Ranges.Early.limit : Ranges.Any.limit
    },
    isEventide: {
      bound: flags.LateEventide ? Ranges.Late.bound : Ranges.Any.bound,
      limit: flags.LateEventide ? Ranges.Late.limit : Ranges.Any.limit
    },
    isMajorTestOfStrength: {
      bound: flags.LateMajorTests ? Ranges.Late.bound : Ranges.Any.bound,
      limit: flags.LateMajorTests ? Ranges.Late.limit : Ranges.Any.limit
    },
    isGanon: Ranges.Ganon
  };
  let maxBound: number = -1, minLimit: number = 9999;
  Object.entries(constraints).forEach(([ key, { bound, limit } ]) => {
    if (waypoint[key]) {
      maxBound = Math.max(maxBound, bound);
      minLimit = Math.min(minLimit, limit as number);
    }
  });
  return placement >= maxBound && placement <= minLimit;
}

// const permuteClampDist = (waypoints: number[], seed: string): number[] => {
//   waypoints = [...waypoints.filter(item => isNormalShrine(item))];
//   const deltas = waypoints.map((item, index): number => {
//     if (index !== waypoints.length - 1)
//       return calcDist(item, waypoints[index + 1]);
//     return Number.MAX_SAFE_INTEGER;
//   });
//   deltas.sort();
//   console.log(deltas[0], deltas[deltas.length - 1]);
//   return waypoints;
// }
