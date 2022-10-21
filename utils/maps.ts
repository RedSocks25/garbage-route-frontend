import { Container, Coordinates } from '../interfaces/websocket';

export const calculateRoute = async(containers: Container[], truck: Coordinates) => {

  // Getting just the full containers coordinates
  const fullContainers: Container[] = containers.filter((container) => {
    if (container.fillLevel === 'rojo') return container;
  });

  // If we have no full containers, then we dont make a route planification
  if (fullContainers.length === 0) return null;

  // Defines waypoints in case we have two or more containers full
  let waypoints: google.maps.DirectionsWaypoint[] = [];
  if (fullContainers.length >= 2) {
    const numFullContainers: number = fullContainers.length;

    // We use as waypoints all the containers that are not the lastone in the array
    waypoints = [...Array(numFullContainers)].map((u, idx) => {
      const { lat, lng } = fullContainers[idx];
      return {
        location: new google.maps.LatLng(lat, lng),
        stopover: true,
      };
    })
  }

  // Set as destination the last container in the full containers array
  const destination: Coordinates = fullContainers[fullContainers.length -1];

  // Define the route based in all the previous process
  const route = new google.maps.DirectionsService().route({
    origin: truck,
    destination: destination,
    waypoints: [...waypoints],
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  return route;
}