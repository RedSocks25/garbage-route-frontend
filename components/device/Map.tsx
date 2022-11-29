import React, { FC, useContext, useEffect, useState } from 'react';

import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';

import { ContainersContext } from '../../contexts';

import { MapMarker } from './MapMarker';

import { Container, Coordinates } from '../../interfaces';
import { calculateRoute, mapCenter, routeOrigin, truckIcon } from '../../utils';


interface Props {
  containers: Container[];
}

export const Map: FC<Props> = ({ containers = [] }) => {

  const [direction, setDirection] = useState<google.maps.DirectionsResult | null>(null);
  const { showContainers } = useContext(ContainersContext);

  //* Calculate the best route every time the ws containers data changes
  useEffect(() => {

    // Verify if Google Maps is loaded, or there is no vosibility for the containers
    if (!isLoaded || !showContainers) return;
    const getDirections = async() => {
      
      // Refresh the route and save a new one just calculated
      setDirection(null);
      setDirection(await calculateRoute(containers, routeOrigin));
    }
    getDirections();
  }, [containers, showContainers]);

  //* Connection with Google Maps API service. Return if the app is connected.
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });
  
  //* If not connected to Google Maps API service, then return other render
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
        { containers.length !== 0 && (
          <>
            { showContainers ? (
              containers.map(({ fillLevel, lat, lng }, idx) => (
                <MapMarker
                  labelText={ `Contenedor ${ idx + 1 }` }
                  fillLevel={ fillLevel }
                  position={{ lat, lng } as Coordinates}
                />
              ))
            ) : (
              <MapMarker
                labelText={ `Contenedor ${ 1 }` }
                fillLevel={ containers[0].fillLevel }
                position={{
                  lat: containers[0].lat,
                  lng: containers[0].lng,
                } as Coordinates}
              />
            )}
          </>
        )}

        {/* Truck or origin of the route iconn render */}
        <Marker
          position={ routeOrigin }
          icon={{
            url: truckIcon,
            scaledSize: new google.maps.Size(50,50)
          }}
        />

        {/* Route renderer for directions */}
        { direction && showContainers &&
          <DirectionsRenderer
            options={{
              markerOptions: {
                visible: true,
              },
              preserveViewport: true,
            }}
            directions={ direction }
          />
        }

      </GoogleMap>
    </>
  );
}
