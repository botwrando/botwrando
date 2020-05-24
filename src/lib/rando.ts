import { shuffle } from 'shuffle-seed';
import { EVENTIDE_SHRINE, GANON, isNormalShrine, PLATEAU_SHRINES } from './waypoints';

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

enum RandoFlags {
  None,
  LateEventide = 1 << 0
}

export const RandoPresets = {
  Default: RandoFlags.LateEventide,
}

const permuteDefault = (waypoints: number[], seed: string): void => {
  const normalShrines = range(119).filter(item => isNormalShrine(item));
  waypoints.push(...shuffle(PLATEAU_SHRINES, seed));
  waypoints.push(...shuffle(normalShrines, seed));
}

const permuteLateEventide = (waypoints: number[], seed: string): void => {
  const [eventideSlot,] = shuffle(range(80, 118), seed);
  waypoints.splice(eventideSlot, 0, EVENTIDE_SHRINE);
}

export function getRandomizedWaypoints(seed: string, preset = RandoPresets.Default): number[] {
  const waypoints: number[] = [];
  permuteDefault(waypoints, seed)

  if (preset & RandoFlags.LateEventide)
    permuteLateEventide(waypoints, seed)

  waypoints.push(GANON);

  return waypoints;
}
