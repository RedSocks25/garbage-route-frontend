export interface Container {
  lat: number;
  lng: number;
  fillLevel: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Sensor {
  type: string;
  value: number;
  unit: string;
}

export interface WebsocketEvent {
  event: string,
  data: {
    sensors: Sensor[],
    containers: Container[],
  }
}

export interface GarbageData {
  sensors: Sensor[],
  containers: Container[],
}
