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

export function getRandomizedWaypoints(seed: string): number[] {
  const normalShrines = range(119).filter(item => isNormalShrine(item));
  const [eventideSlot,] = shuffle(range(80, 118), seed);

  const waypoints: number[] = [];
  waypoints.push(...shuffle(PLATEAU_SHRINES, seed));
  waypoints.push(...shuffle(normalShrines, seed));
  waypoints.splice(eventideSlot, 0, EVENTIDE_SHRINE);
  waypoints.push(GANON);

  return waypoints;
}
