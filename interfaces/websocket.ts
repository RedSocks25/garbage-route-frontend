export interface Container {
  coordinates: Coordinates;
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
