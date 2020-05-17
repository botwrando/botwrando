import { BLOOD_MOON_SHRINE, EVENTIDE_SHRINE, GANON, getShrine, isNormalShrine, PLATEAU_SHRINES } from './shrines';

describe('shrines', () => {
  describe('isNormalShrine', () => {
    it('reports false when the ID is a Great Plateau shrine', () => {
      for (const shrineId of PLATEAU_SHRINES) {
        expect(isNormalShrine(shrineId)).toBe(false);
      }
    });
    it('reports false when the ID is the blood moon shrine', () => {
      expect(isNormalShrine(BLOOD_MOON_SHRINE)).toBe(false);
    });
    it('reports false when the ID is the Eventide Island shrine', () => {
      expect(isNormalShrine(EVENTIDE_SHRINE)).toBe(false);
    });
    it('reports false when the ID is the Ganon "shrine"', () => {
      expect(isNormalShrine(GANON)).toBe(false);
    })
  });

  describe('getShrine', () => {
    describe('when the shrine ID is between 0 and 119', () => {
      it('returns a Shrine object of the requested shrine', () => {
        const shrine = getShrine(27);
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
        expect(shrine).toEqual(rotaOoh);
      });
      it('returns a Shrine object with isPlateau true for Great Plateau shrines', () => {
        const allShrineIds = Array.from(Array(120).keys());
        for (const shrineId of allShrineIds) {
          const shrine = getShrine(shrineId);
          expect(shrine).toHaveProperty('index');
          expect(shrine?.index).toEqual(shrineId);
        }
      });
      it('returns a Shrine object with isPlateau true for Great Plateau shrines', () => {
        for (const shrineId of PLATEAU_SHRINES) {
          const shrine = getShrine(shrineId);
          expect(shrine).toHaveProperty('isPlateau');
          expect(shrine?.isPlateau).toEqual(true);
        }
      });
      it('returns a Shrine object with isBloodMoon true for the blood moon shrine', () => {
        const shrine = getShrine(BLOOD_MOON_SHRINE);
        expect(shrine).toHaveProperty('isBloodMoon');
        expect(shrine?.isBloodMoon).toEqual(true);
      });
      it('returns the Ganon shrine for shine id 999', () => {
        const shrine = getShrine(GANON);
        expect(shrine).toHaveProperty('name');
        expect(shrine?.name).toEqual('Ganon');
      })
    });
  });
});
