import { getShrine, Shrine, BLOOD_MOON_SHRINE, PLATEAU_SHRINES } from "./shrines";

describe('shrines', () => {
  describe('getShrine', () => {
    it('provides the expected shrine by ID', () => {
      const shrine = getShrine(38);
      const omanAu: Shrine = {
        index: 38,
        name: "Oman Au",
        desc: "Magnesis Trial",
        region: "Great plateau",
        location: {
          x: "-667.3707f",
          y: "173.1039f",
          z: "1517.671f"
        },
        is_blood_moon: false,
        is_plateau: true
      };
      expect(shrine).toMatchObject(omanAu);
    });
    
    it('returns undefined for unknown IDs', () => {
      const shrine = getShrine(5253);
      expect(shrine).toBeUndefined();
    });
  });

  describe('BLOOD_MOON_SHRINE', () => {
    it('provides the ID for Mijah Rokee', () => {
      const shrine = getShrine(BLOOD_MOON_SHRINE);
      expect(shrine).not.toBeUndefined();
      expect(shrine?.is_blood_moon).toBe(true);
      expect(shrine?.name).toBe("Mijah Rokee");
    });
  });

  describe('PLATEAU_SHRINES', () => {
    it('provides IDs for the Great Plateau shrines', () => {
      const shrine_names: Record<number, string> = {
        38: "Oman Au",
        41: "Ja Baij",
        9: "Owa Daim",
        65: "Keh Namut"
      };
      for (const shrine_id of PLATEAU_SHRINES) {
        const shrine = getShrine(shrine_id);
        expect(shrine).not.toBeUndefined();
        expect(shrine?.region).toBe("Great plateau");
        expect(shrine?.is_plateau).toBe(true);
        expect(shrine?.name).toBe(shrine_names[shrine_id]);
      }
    });
  });
});
