import { shuffle } from 'shuffle-seed';
import { DUPE_SHRINE, EVENTIDE_SHRINE, GANON, isNormalShrine, PLATEAU_SHRINES } from './waypoints';

export function range(bound: number, limit: number = 0): number[] {
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

const generateDefault = (seed: string): number[] => {
  const normalShrines = range(119).filter(item => isNormalShrine(item));
  const waypoints: number[] = [];
  waypoints.push(...shuffle(PLATEAU_SHRINES, seed));
  waypoints.push(...shuffle(normalShrines, seed));
  return waypoints
}

const permuteLateEventide = (waypoints: number[], seed: string): number[] => {
  const [eventideSlot,] = shuffle(range(80, 118), seed);
  waypoints.splice(eventideSlot, 0, EVENTIDE_SHRINE);
  return waypoints
}

const permuteEarlyDupe = (waypoints: number[], seed: string): number[] => {
  waypoints = waypoints.filter(item => item !== DUPE_SHRINE)
  const [dupeSlot,] = shuffle(range(20, 39), seed);
  waypoints.splice(dupeSlot, 0, DUPE_SHRINE);
  return waypoints
}

export function getRandomizedWaypoints(seed: string, flags: RandoFlags): number[] {
  let waypoints = generateDefault(seed)

  if (flags.LateEventide)
    waypoints = permuteLateEventide(waypoints, seed)

  if (flags.EarlyDupe)
    waypoints = permuteEarlyDupe(waypoints, seed)

  waypoints.push(GANON);

  return waypoints;
}
