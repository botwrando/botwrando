import { WaypointData, Coord, Waypoint } from './waypoint';
export const PLATEAU_SHRINES: number[] = collections.PLATEAU; //[38, 41, 9, 65];
export const APPARATUS_SHRINES: number[] = collections.APPARATUS;
export const MINOR_TEST_SHRINES: number[] = collections.MINOR_TEST;
export const MODEST_TEST_SHRINES: number[] = collections.MODEST_TEST;
export const MAJOR_TEST_SHRINES: number[] = collections.MAJOR_TEST; // [82, 83, 84, 85, 86, 87, 88, 89];
export const BLOOD_MOON_SHRINE: number = collections.BLOOD_MOON[0]; // 78;
export const EVENTIDE_SHRINE: number = collections.EVENTIDE[0]; // 97;
export const DUPE_SHRINE: number = collections.DUPE_GLITCH[0]; // 39;
export const GANON: number = collections.GANON[0]; // 999;

export const calcDist = (hereId: number, thereId: number): number => {
  const [here, there] = [waypoints[hereId], waypoints[thereId]];
  const diff = {
    x: parseInt(there.location.x) - parseInt(here.location.x),
    y: parseInt(there.location.y) - parseInt(here.location.y),
    z: parseInt(there.location.z) - parseInt(here.location.z),
  };

  return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2) + Math.pow(diff.z, 2));
}

// export const withinBox(id: number, size: number)

export const isNormalShrine = (id: number): Boolean => {
  return (
    PLATEAU_SHRINES.indexOf(id) === -1 &&
    BLOOD_MOON_SHRINE !== id && GANON !== id
  );
};

export const isTestOfStrength = (id: number): Boolean => {
  return (
    MINOR_TEST_SHRINES.indexOf(id) > -1 ||
    MODEST_TEST_SHRINES.indexOf(id) > -1 ||
    MAJOR_TEST_SHRINES.indexOf(id) > -1
  );
};
