import { shuffle } from "shuffle-seed";

export function range(bound: number, limit: number = 0): number[] {
	const start = limit ? bound : 0;
	const end = limit ? limit : bound;
	const base = [...Array.from(Array(end - start + 1).keys())];
	return base.map((idx: number) => start + idx);
}

export function getShrines(seed: string): number[] {
	const plateau_shrines = [38, 41, 9, 65];
	const blood_moon_shrines = [78];
	const eventide_shrine = [97];

	const is_normal = (id: number): Boolean => {
		return (
			plateau_shrines.indexOf(id) === -1 &&
			blood_moon_shrines.indexOf(id) === -1 &&
			eventide_shrine.indexOf(id) === -1
		);
	};

	const normal_shrines = range(119).filter(item => is_normal(item));
	const eventide_slots = range(80, 118);
	const eventide_slot = shuffle(eventide_slots, seed)[0];

	const shrines: number[] = [];

	shrines.push(...shuffle(plateau_shrines, seed));
	shrines.push(...shuffle(normal_shrines, seed));
	shrines.splice(eventide_slot, 0, 97);

	return shrines;
}
