import { shuffle } from 'shuffle-seed';
import { calcDist, DUPE_SHRINE, EVENTIDE_SHRINE, GANON, isNormalShrine, MAJOR_TEST_SHRINES, PLATEAU_SHRINES } from './waypoints';

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

export const Ranges = {
  Eventide: { bound: 80, limit: 118 },
  MajorTest: { bound: 80, limit: 118 },
  Dupe: { bound: 20, limit: 40 },
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
  return waypoints;
}

const permuteLateEventide = (waypoints: number[], seed: string): number[] => {
  if (waypoints.indexOf(EVENTIDE_SHRINE) > Ranges.Eventide.bound)
    return waypoints;

  waypoints = waypoints.filter(item => item !== EVENTIDE_SHRINE);
  const [eventideSlot,] = shuffle(range(Ranges.Eventide.bound, Ranges.Eventide.limit), seed);
  waypoints.splice(eventideSlot, 0, EVENTIDE_SHRINE);
  return waypoints;
}

const permuteEarlyDupe = (waypoints: number[], seed: string): number[] => {
  const dupe_index = waypoints.indexOf(DUPE_SHRINE);
  if (dupe_index >= Ranges.Dupe.bound && dupe_index <= Ranges.Dupe.limit)
    return waypoints;

  waypoints = waypoints.filter(item => item !== DUPE_SHRINE)
  const [dupeSlot,] = shuffle(range(Ranges.Dupe.bound, Ranges.Dupe.limit), seed);
  waypoints.splice(dupeSlot, 0, DUPE_SHRINE);
  return waypoints;
}

const isMajorTest = (shrineId: number): boolean => {
  return (MAJOR_TEST_SHRINES.indexOf(shrineId) > -1);
}

const permuteLateMajortests = (waypoints: number[], seed: string): number[] => {
  waypoints = waypoints.filter(item => !isMajorTest(item));
  const majorTestShrines = shuffle([...MAJOR_TEST_SHRINES], seed);
  const majorTestShrineSlots = shuffle(range(Ranges.MajorTest.bound, Ranges.MajorTest.limit), seed);
  majorTestShrines.forEach((shrineId, index) => {
    waypoints.splice(majorTestShrineSlots[index], 0, shrineId);
  });
  return waypoints;
}

const permuteClampDist = (waypoints: number[], seed: string): number[] => {
  waypoints = [...waypoints.filter(item => isNormalShrine(item))];
  const deltas = waypoints.map((item, index): number => {
    if (index !== waypoints.length - 1)
      return calcDist(item, waypoints[index + 1]);
    return Number.MAX_SAFE_INTEGER;
  });
  deltas.sort();
  console.log(deltas[0], deltas[deltas.length - 1]);
  return waypoints;
}

export function getRandomizedWaypoints(seed: string, flags: RandoFlags = Presets.Default!.flags): number[] {
  let waypoints = generateDefault(seed);

  if (flags.LateEventide)
    waypoints = permuteLateEventide(waypoints, seed);

  if (flags.EarlyDupe)
    waypoints = permuteEarlyDupe(waypoints, seed);

  if (flags.LateMajorTests)
    waypoints = permuteLateMajortests(waypoints, seed);

  if (flags.ClampDist)
    waypoints = permuteClampDist(waypoints, seed);

  waypoints.push(GANON);

  return waypoints;
}
