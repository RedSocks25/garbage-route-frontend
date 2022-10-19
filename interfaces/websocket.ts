export interface Coordinate {
  lat: number;
  lng: number;
}

export interface FillLevel {
  level: string;
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
    fillLevel: FillLevel[],
    coordinates: Coordinate[],
  }
}
