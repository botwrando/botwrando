import waypoints_data from '../data/waypoints.json';

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

export interface WaypointData {
  id: number;
  name: string | null;
  desc: string | null;
  region: string | null;
  location: Location;
}

export interface WaypointCollections {
  [key: string]: number[]
}

export class Waypoint {
  id: number;
  name: string | null;
  desc: string | null;
  region: string | null;
  location: Coord;
  private ordering: number | null;
  private _collections: { [key: string]: boolean } = {};
  private static collection_ids: WaypointCollections =
    waypoints_data.collections as WaypointCollections;
  private static _all: Waypoint[] = (waypoints_data.waypoints as WaypointData[])
    .map((data: WaypointData) => { return new Waypoint(data); });

  constructor(data: WaypointData) {
    this.id = data.id;
    this.name = data.name;
    this.desc = data.desc;
    this.region = data.region;
    this.location = {
      x: parseFloat(data.location.x),
      y: parseFloat(data.location.y),
      z: parseFloat(data.location.z)
    };
    this.ordering = null;
    for (const key in Waypoint.collection_ids) {
      this._collections[key] = Waypoint.collection_ids[key].indexOf(this.id) > -1;
    }
  }

  static get all(): Waypoint[] {
    return this._all;
  }

  static byId(id: number): Waypoint | undefined {
    return Waypoint.all.find((w) => w.id === id);
  }

  static byCollection(collection: string): Waypoint[] {
    return this.collection_ids[collection]
      .map((id: number): Waypoint | undefined => Waypoint.byId(id)) as Waypoint[];
  }

  static forEach(callback: (w: Waypoint) => void): void {
    Waypoint.all.forEach(callback);
  }

  static map(callback: (w: Waypoint) => any): any[] {
    Waypoint.all.map(callback);
  }

  get collections(): { [key: string]: boolean } {
    return this._collections;
  }

  get placement(): number | null {
    return this.ordering;
  }

  placeAt(placement: number) {
    if (placement >= 0 && placement <= Waypoint.all.length) {
      this.ordering = placement;
    }
  }

  inCollection(collectionName: string): boolean {
    return this.collections[collectionName];
  }
  get isPlateau(): boolean { return this.inCollection('PLATEAU'); }
  get isDupeGlitch(): boolean { return this.inCollection('DUPE_GLITCH'); }
  get isApparatus(): boolean { return this.inCollection('APPARATUS'); }
  get isBloodMoon(): boolean { return this.inCollection('BLOOD_MOON'); }
  get isEventide(): boolean { return this.inCollection('EVENTIDE'); }
  get isGanon(): boolean { return this.inCollection('GANON'); }
  get isMinorTestOfStrength(): boolean { return this.inCollection('MINOR_TEST'); }
  get isModestTestOfStrength(): boolean { return this.inCollection('MODEST_TEST'); }
  get isMajorTestOfStrength(): boolean { return this.inCollection('MAJOR_TEST'); }
  get isTestOfStrength(): boolean {
    return (
      this.inCollection('MINOR_TEST') ||
      this.inCollection('MODEST_TEST') ||
      this.inCollection('MAJOR_TEST')
    );
  }

  inBox(size: number, other: Waypoint): boolean {
    const xInBox = Math.abs(this.location.x - other.location.x) < size;
    const yInBox = Math.abs(this.location.y - other.location.y) < size;
    return xInBox && yInBox;
  }

  inRadius(radius: number, other: Waypoint): boolean {
    return this.dist(other) < radius;
  }

  dist(other: Waypoint): number {
    const diff = {
      x: other.location.x - this.location.x,
      y: other.location.y - this.location.y,
      z: other.location.z - this.location.z,
    };
    return Math.sqrt(
      diff.x * diff.x + diff.y * diff.y + diff.z * diff.z
    );
  }
};
