import { BLOOD_MOON_SHRINE, EVENTIDE_SHRINE, GANON, getWaypoint, isNormalShrine, PLATEAU_SHRINES } from './waypoints';

describe('waypoints', () => {
  describe('isNormalShrine', () => {
    it('reports false when the ID is a Great Plateau shrine', () => {
      for (const waypointId of PLATEAU_SHRINES) {
        expect(isNormalShrine(waypointId)).toBe(false);
      }
    });
    it('reports false when the ID is the blood moon shrine', () => {
      expect(isNormalShrine(BLOOD_MOON_SHRINE)).toBe(false);
    });
    it('reports true when the ID is the Eventide Island shrine', () => {
      expect(isNormalShrine(EVENTIDE_SHRINE)).toBe(true);
    });
    it('reports false when the ID is the Ganon waypoint', () => {
      expect(isNormalShrine(GANON)).toBe(false);
    })
  });

  describe('getWaypoint', () => {
    describe('when the waypoint ID is between 0 and 119', () => {
      it('returns a Waypoint object of the requested shrine', () => {
        const waypoint = getWaypoint(27);
        const rotaOoh = {
          index: 27,
          name: 'Rota Ooh',
          desc: 'Passing of the Gates',
          region: 'Central',
          location: {
            x: '-1556.068f',
            y: '186.7413f',
            z: '1307.912f'
          },
          isBloodMoon: false,
          isPlateau: false
        };
        expect(waypoint).toEqual(rotaOoh);
      });
      it('returns a Waypoint object with isPlateau true for Great Plateau shrines', () => {
        const allWaypointIds = Array.from(Array(120).keys());
        for (const waypointIds of allWaypointIds) {
          const waypoint = getWaypoint(waypointIds);
          expect(waypoint).toHaveProperty('index');
          expect(waypoint?.index).toEqual(waypointIds);
        }
      });
      it('returns a Waypoint object with isPlateau true for Great Plateau shrines', () => {
        for (const waypointId of PLATEAU_SHRINES) {
          const waypoint = getWaypoint(waypointId);
          expect(waypoint).toHaveProperty('isPlateau');
          expect(waypoint?.isPlateau).toEqual(true);
        }
      });
      it('returns a Waypoint object with isBloodMoon true for the blood moon shrine', () => {
        const waypoint = getWaypoint(BLOOD_MOON_SHRINE);
        expect(waypoint).toHaveProperty('isBloodMoon');
        expect(waypoint?.isBloodMoon).toEqual(true);
      });
      it('returns the Ganon waypoint for waypoint id 999', () => {
        const waypoint = getWaypoint(GANON);
        expect(waypoint).toHaveProperty('name');
        expect(waypoint?.name).toEqual('Ganon');
      })
    });
  });
});
