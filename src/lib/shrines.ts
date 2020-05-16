import shrines from '../data/shrines.json';

export type Location = {
	x: String;
	y: String;
	z: String;
};

export type Shrine = {
	index: Number;
	name: String | null;
	desc: String | null;
	region: String | null;
	location: Location;
	isBloodMoon: Boolean;
	isPlateau: Boolean;
};

export const getShrine = (shrine_id: number): Shrine | undefined =>
  shrines.find(item => item.index === shrine_id);

export const PLATEAU_SHRINES: number[] = [38, 41, 9, 65];
export const BLOOD_MOON_SHRINE: number = 78;
export const EVENTIDE_SHRINE: number = 97;
export const GANON: number = 999;

export const isNormalShrine = (id: number): Boolean => {
  return (
    PLATEAU_SHRINES.indexOf(id) === -1 &&
		BLOOD_MOON_SHRINE !== id && EVENTIDE_SHRINE !== id && GANON !== id
  );
};
