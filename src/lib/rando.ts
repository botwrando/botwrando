import { shuffle } from "shuffle-seed";
import { PLATEAU_SHRINES, EVENTIDE_SHRINE, isNormalShrine } from "./shrines";

export function range(bound: number, limit: number = 0): number[] {
	const start = limit ? bound : 0;
	const end = limit ? limit : bound;
	const base = [...Array.from(Array(end - start + 1).keys())];
	return base.map((idx: number) => start + idx);
}

export function getRandomSeed(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let a;
  for (a = ''; a.length < 40;) { a += chars[(Math.random() * 60) | 0]; }
  return a;
}

export function getShrines(seed: string): number[] {
	const normalShrines = range(119).filter(item => isNormalShrine(item));
	const eventideSlot = shuffle(range(80, 118), seed)[0];

	const shrines: number[] = [];
	shrines.push(...shuffle(PLATEAU_SHRINES, seed));
	shrines.push(...shuffle(normalShrines, seed));
	shrines.splice(eventideSlot, 0, EVENTIDE_SHRINE);

	return shrines;
}
