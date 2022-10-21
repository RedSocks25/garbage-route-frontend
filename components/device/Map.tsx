import React, { FC, useEffect, useState } from 'react';

import { GoogleMap, MarkerF, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

import { Container, Coordinates } from '../../interfaces';


const iconsRoute = "http://maps.google.com/mapfiles/ms/icons";

const center: Coordinates = {
  lat: -12.082514011004939,
  lng: -77.04626663309747,
}

const pointsOfInteres: Coordinates[] = [
  { lat: -12.082514011004939, lng: -77.05626663309747 },
  { lat: -12.082514011004939, lng: -77.04626663309747 },
  { lat: -12.092514011004939, lng: -77.04626663309747 },
];

interface Props {
  containers: Container[];
}

export const Map: FC<Props> = ({ containers = [] }) => {

  const [direction, setDirection] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    const calculateRoute = async() => {
  
      console.log('getting routes')
      const directionService = new google.maps.DirectionsService();
  
      const results = await directionService.route({
        origin: { lat: containers[0].lat, lng: containers[0].lng },
        destination: { lat: containers[1].lat, lng: containers[1].lng },
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      setDirection(results);
    }

    calculateRoute();
  }, [containers]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });
  
  if (!isLoaded) return <></>;
  
  return (
    <>
      <GoogleMap
        center={ center }
        zoom={ 15 }
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        {
          containers.length !== 0 && containers.map(({ fillLevel, lat, lng }, idx) => (
            <MarkerF position={{lat, lng}} key={ idx } icon={ fillLevel === 'rojo' ? `${ iconsRoute }/red-dot.png` : `${ iconsRoute }/green-dot.png` } />
          ))
        }
        { direction && <DirectionsRenderer directions={ direction } />}
      </GoogleMap>
    </>
  );
}
