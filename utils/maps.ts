import { Container, Coordinates } from '../interfaces/websocket';

export const calculateRoute = async(containers: Container[], truck: Coordinates) => {

  // Getting just the full containers coordinates
  let fullContainers: Container[] = containers.filter((container) => {
    if (container.fillLevel === 'Rojo') return container;
  });

  // If we have no full containers, then we dont make a route planification
  if (fullContainers.length === 0) return null;


  // Defines waypoints in case we have two or more containers full
  let waypoints: google.maps.DirectionsWaypoint[] = [];
  if (fullContainers.length >= 2) { 
    
    console.log(fullContainers);
    fullContainers = orderByDistance(fullContainers, truck);
    const numContainers: number = fullContainers.length;

    // We use as waypoints all the containers that are not the lastone in the array
    waypoints = [...Array(numContainers)].map((u, idx) => {
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


const orderByDistance = (containers: Container[], origin: Coordinates) => {
  
  let auxContainers = [...containers];

  // Bubble sort algorithm logic
  let i, j: number;
  for (i = 0; i < auxContainers.length -1; i++) {
    for (j = 0; j < auxContainers.length - 1 - i; j++) {

      // Get the distance between the origin with each points separately
      const distanceFirst = getDistanceBetween(origin, {
        lat: auxContainers[j].lat,
        lng: auxContainers[j].lng
      });
      const distanceSecond = getDistanceBetween(origin, {
        lat: auxContainers[j+1].lat,
        lng: auxContainers[j+1].lng
      });

      // Compare distance and swap them if the first one is further than the second one
      if (distanceFirst > distanceSecond) {
        let aux = auxContainers[j];
        auxContainers[j] = auxContainers[j+1];
        auxContainers[j+1] = aux;
      }
    }
  }

  return auxContainers;
}


const getDistanceBetween = (a: Coordinates, b: Coordinates) => {
  return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2))
}
