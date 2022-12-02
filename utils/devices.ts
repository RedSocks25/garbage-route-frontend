import { Sensor } from "../interfaces";


const sensorToFilter: string[] = [
  'acidez de suelo',
  'humedad de suelo',
];

export const filterSensors = (sensors: Sensor[]): Sensor[] => {
  return sensors.filter((s) => !sensorToFilter.includes(s.type));
}