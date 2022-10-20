import React, { FC, useMemo, useEffect, useState, ReactElement } from 'react';

import { GoogleMap, MarkerF, useJsApiLoader, Marker } from '@react-google-maps/api';

import { Typography } from '@mui/material';

import { Container, Coordinates } from '../../interfaces';


const iconsRoute = "http://maps.google.com/mapfiles/ms/icons";

const center: Coordinates = {
  lat: -12.082514011004939,
  lng: -77.04626663309747,
}

interface Props {
  containers: Container[];
}

export const Map: FC<Props> = ({ containers = [] }) => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });

  // If cannot be loaded, display a custom message
  if (!isLoaded)
    return <Typography variant='h1' component='h1'>Not loaded</Typography>;
  

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
      </GoogleMap>
    </>
  );
}
