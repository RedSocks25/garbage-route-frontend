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

// Structure of the websocket message
export interface WebsocketEvent {
  event: string,
  data: {
    sensors: Sensor[],
    containers: Container[],
  }
}

// Stores the data gathered from the API call
export interface GarbageData {
  sensors: Sensor[],
  containers: Container[],
}
