import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Location, Coord, WaypointData, Waypoint } from './waypoint';

const { waypoints } = JSON.parse(
  readFileSync(
    resolve(__dirname, '../data/waypoints.json')
  )
);

describe('waypoint (definitions)', () => {
  describe('Location', () => {
    test('contains assignable x, y, and z string values', () => {
      const loc: Location = { x: '24.3f', y: '18.4f', z: '3.9f' };
      expect(loc).toHaveProperty('x');
      expect(loc.x).toEqual('24.3f');
      expect(loc).toHaveProperty('y');
      expect(loc.y).toEqual('18.4f');
      expect(loc).toHaveProperty('z');
      expect(loc.z).toEqual('3.9f');
    });
  });

  describe('Coord', () => {
    test('contains assignable x, y, and z number values', () => {
      const coord: Coord = { x: 24.3, y: 18.4, z: 3.9 };
      expect(coord).toHaveProperty('x');
      expect(coord.x).toEqual(24.3);
      expect(coord).toHaveProperty('y');
      expect(coord.y).toEqual(18.4);
      expect(coord).toHaveProperty('z');
      expect(coord.z).toEqual(3.9);
    });
  });

  describe('WaypointData', () => {
    test('matches the format of incoming JSON data', () => {
      const waypoint_data = waypoints[2] as WaypointData;
      expect(waypoint_data).toHaveProperty('id');
      expect(waypoint_data.id).toEqual(9);
      expect(waypoint_data).toHaveProperty('name');
      expect(waypoint_data.name).toEqual('Owa Daim');
      expect(waypoint_data).toHaveProperty('desc');
      expect(waypoint_data.desc).toEqual('Stasis Trial');
      expect(waypoint_data).toHaveProperty('region');
      expect(waypoint_data.region).toEqual('Great plateau');
      expect(waypoint_data).toHaveProperty('location');
      const expectedLocation = waypoint_data.location as Location;
      expect(waypoint_data.location).toMatchObject(expectedLocation);
    });
  });

  describe('Waypoint', () => {
    let waypoint_info: WaypointData;
    beforeEach(() => {
      waypoint_info = {
        id: 3,
        name: 'test waypoint',
        desc: 'test trial',
        region: 'Hebra',
        location: {
          x: '1.23f',
          y: '2.34f',
          z: '3.45f'
        }
      };
    })
    describe('constructor', () => {
      test('creates a Waypoint object', () => {
        const wp: Waypoint = new Waypoint(waypoint_info);
        expect(wp).toHaveProperty('id');
        expect(wp.id).toEqual(3);
        expect(wp).toHaveProperty('name');
        expect(wp.name).toEqual('test waypoint');
        expect(wp).toHaveProperty('desc');
        expect(wp.desc).toEqual('test trial');
        expect(wp).toHaveProperty('region');
        expect(wp.region).toEqual('Hebra');
        expect(wp).toHaveProperty('location');
        expect(wp.location).toEqual({ x: 1.23, y: 2.34, z: 3.45 } as Coord);
        expect(wp).toHaveProperty('collections');
        expect(wp.collections).toHaveProperty('PLATEAU');
        expect(wp.collections.PLATEAU).toEqual(false);
        expect(wp.collections).toHaveProperty('DUPE_GLITCH');
        expect(wp.collections.DUPE_GLITCH).toEqual(false);
        expect(wp.collections).toHaveProperty('APPARATUS');
        expect(wp.collections.APPARATUS).toEqual(false);
        expect(wp.collections).toHaveProperty('MINOR_TEST');
        expect(wp.collections.MINOR_TEST).toEqual(false);
        expect(wp.collections).toHaveProperty('MODEST_TEST');
        expect(wp.collections.MODEST_TEST).toEqual(false);
        expect(wp.collections).toHaveProperty('MAJOR_TEST');
        expect(wp.collections.MAJOR_TEST).toEqual(false);
        expect(wp.collections).toHaveProperty('BLOOD_MOON');
        expect(wp.collections.BLOOD_MOON).toEqual(false);
        expect(wp.collections).toHaveProperty('EVENTIDE');
        expect(wp.collections.EVENTIDE).toEqual(false);
        expect(wp.collections).toHaveProperty('GANON');
        expect(wp.collections.GANON).toEqual(false);
      });
    });
  });
});
