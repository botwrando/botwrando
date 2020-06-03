import waypoints from '../data/waypoints.json';

export type Location = {
  x: string;
  y: string;
  z: string;
};

export type Coord = {
  x: number;
  y: number;
  z: number;
}

export const calcDist = (hereId: number, thereId: number): number => {
  const [here, there] = [waypoints[hereId], waypoints[thereId]];
  const diff = {
    x: parseInt(there.location.x) - parseInt(here.location.x),
    y: parseInt(there.location.y) - parseInt(here.location.y),
    z: parseInt(there.location.z) - parseInt(here.location.z),
  };

  return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2) + Math.pow(diff.z, 2));
}

export type Waypoint = {
  index: Number;
  name: String | null;
  desc: String | null;
  region: String | null;
  location: Location;
  isBloodMoon: Boolean;
  isPlateau: Boolean;
};

export const getWaypoint = (waypoint_id: number): Waypoint | undefined =>
  waypoints.find(item => item.index === waypoint_id);

export const PLATEAU_SHRINES: number[] = [38, 41, 9, 65];
export const MAJOR_TEST_SHRINES: number[] = [82, 83, 84, 85, 86, 87, 88, 89];
export const BLOOD_MOON_SHRINE: number = 78;
export const EVENTIDE_SHRINE: number = 97;
export const DUPE_SHRINE: number = 39;
export const GANON: number = 999;

export const isNormalShrine = (id: number): Boolean => {
  return (
    PLATEAU_SHRINES.indexOf(id) === -1 &&
    BLOOD_MOON_SHRINE !== id && GANON !== id
  );
};
