import React, { FC, useEffect, useState } from 'react';

import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';

import { Container } from '../../interfaces';
import { calculateRoute, mapCenter, routeOrigin, greenDotIcon, redDotIcon, truckIcon } from '../../utils';


interface Props {
  containers: Container[];
}

export const Map: FC<Props> = ({ containers = [] }) => {

  const [direction, setDirection] = useState<google.maps.DirectionsResult | null>(null);

  // Calculate the best route every time the ws containers data changes
  useEffect(() => {
    if (!isLoaded) return;
    const getDirections = async() => {
      setDirection(await calculateRoute(containers, routeOrigin));
    }
    getDirections();
  }, [containers]);

  // Connection with Google Maps API service. Return if the app is connected.
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });
  
  // If not connected to Google Maps API service, then return other render
  if (!isLoaded) return <></>;
  
  return (
    <>
      <GoogleMap
        center={ mapCenter }
        zoom={ 15 }
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false
        }}        
      >

        {/* Container Icons render */}
        { containers.length !== 0 && containers.map(({ fillLevel, lat, lng }, idx) => (
          <Marker
            options={{
              optimized: true,
              label: {
               text: `Contenedor ${ idx + 1 }`,
               color: '#000000',
               fontSize: '15px',
               fontWeight: 'bold',
              }
            }}
            position={{lat, lng}}
            key={ idx }
            icon={{
              url: fillLevel === 'Verde' ? greenDotIcon : redDotIcon,
              scaledSize: new google.maps.Size(50,50)
            }} 
          />
        ))}

        {/* Truck or origin of the route iconn render */}
        <Marker
          position={ routeOrigin }
          icon={{
            url: truckIcon,
            scaledSize: new google.maps.Size(50,50)
          }}
        />

        {/* Route renderer for directions */}
        { direction &&
          <DirectionsRenderer
            options={{
              markerOptions: {
                visible: true,
              },
              preserveViewport: true,
            }}
            directions={ direction } />}

      </GoogleMap>
    </>
  );
}
