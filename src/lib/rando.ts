import { shuffle } from 'shuffle-seed';
import { Waypoint, WaypointObject, WaypointKey } from './waypoint';

export type RangeLimit = {
  bound: number,
  limit: number
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
  ClampDist: number,
  EarlyDupe: boolean,
  LateEventide: boolean,
  LateMajorTests: boolean
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
  Ganon:   { bound: 119, limit: 119 },
  ClampDist: { bound: 0, limit: 10000},
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
function validClampDist(flagValue: number): boolean {
  return inRange(flagValue, Ranges.ClampDist);
}

export const Presets: Partial<Record<ValidPreset, RandoPreset>> = {
  'Default': {
    name: 'Default',
    desc: 'Shuffled shrines, nothing more',
    flags: { ClampDist: Ranges.ClampDist.limit },
  },
  'Casual': {
    name: 'Casual',
    desc: 'Shorter distances between shrines, late Eventide, late Major Tests',
    flags: { LateEventide: true, LateMajorTests: true, ClampDist: 2000 },
  },
  'Runner': {
    name: 'Runner',
    desc: 'Early heart / stamina duping, late Eventide',
    flags: { EarlyDupe: true, LateEventide: true, ClampDist: Ranges.ClampDist.limit },
  }
}

export function getRandomizedWaypoints(
  seed: string,
  flags: RandoFlags = Presets.Default!.flags
): number[] {
  const placements = shuffle(range(120), seed);
  if (flags.ClampDist && flags.ClampDist > 0) {
    generateClampDistOrdering(placements, flags);
  } else {
    generateDefaultOrdering(placements, flags);
  }
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

function generateDefaultOrdering(
  placements: number[],
  flags: RandoFlags = Presets.Default!.flags
): void {
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
      throw new Error(`Error placing waypoint ${waypoint.id}: ${waypoint.name}`);
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
        throw new Error(`Error placing waypoint ${waypoint.id}: ${waypoint.name}`);
      }
    }
  });
}

function generateClampDistOrdering(
  placements: number[],
  flags: RandoFlags = Presets.Default!.flags
): void {
  if (!(typeof flags.ClampDist === 'number')) {
    const msg = 'Cannot generate distance limiting placements with ClampDist undefined';
    throw new Error(msg);
  }
  for (const index in placements) {
    // For each placement, find all waypoints in box of prior that meet conditions,
    // and place first candidate there.
    if (typeof index == 'number' && index > 0) {
      const priorPlaced: Waypoint | undefined = Waypoint.byPlacement(placements[index - 1]);
      if (priorPlaced !== null && priorPlaced !== undefined) {
        const candidates = Waypoint.all
          .filter((w: Waypoint) => !w.isPlaced)
          .filter((w: Waypoint) => w.inBox(flags.ClampDist as number, priorPlaced))
          .filter((w: Waypoint) => isValidForPlacement(w, placements[index], flags));
        if (candidates.length === 0) {
          const msg = 'Cannot generate distance limiting placements: unable to place waypoint at placement'
          throw new Error(`${msg} ${placements[index]}`)
        } else {
          candidates[0].placeAt(placements[index]);
        }
      }
    }
  }
}

function isValidForPlacement(
  waypoint: WaypointObject, placement: number, flags: RandoFlags
): boolean {
  const constraints: { [key: string]: RangeLimit } = {
    isPlateau: Ranges.Plateau,
    isDupeGlitch: flags.EarlyDupe ? Ranges.Early : Ranges.Any,
    isEventide: flags.LateEventide ? Ranges.Late : Ranges.Any,
    isMajorTestOfStrength: flags.LateMajorTests ? Ranges.Late : Ranges.Any,
    isGanon: Ranges.Ganon
  };
  const placementBounds: RangeLimit = getPlacementBounds(waypoint, constraints);
  return (
    (placement >= placementBounds.bound) &&
    (placement <= placementBounds.limit)
  );
}

function getPlacementBounds(
  waypoint: WaypointObject,
  constraints: { [key: string]: RangeLimit }
): RangeLimit {
  let maxBound: number = -1, minLimit: number = 9999;
  for (const key in constraints) {
    const rangeLimit: RangeLimit = constraints[key];
    if (isWaypointKey(key) && waypoint[key]) {
      maxBound = Math.max(maxBound, rangeLimit.bound);
      minLimit = Math.min(minLimit, rangeLimit.limit);
    }
  }
  return { bound: maxBound, limit: minLimit } as RangeLimit;
}

function isWaypointKey(key: string): key is WaypointKey {
  if (typeof (key as keyof WaypointObject)) {
    return true;
  }
  return false;
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
