import React, { FC } from 'react';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { Typography } from '@mui/material';

import { Container } from '../../interfaces';


const iconsRoute = "http://maps.google.com/mapfiles/ms/icons";

// The Hub Calgary
const testData: Container[] = [
  {
    fillLevel: 'rojo',
    coordinates: {
      lat: 51.0678913292,
      lng: -114.113761605,
    }
  },
  {
    fillLevel: 'verde',
    coordinates: {
      lat: 51.058527,
      lng: -114.113798,
    },
  },
  {
    fillLevel: 'verde',
    coordinates: {
      lat: 51.134477,
      lng: -114.219920,
    },
  },
];

interface Props {
  containers: Container[];
}

export const Map: FC<Props> = ({ containers }) => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });

  // If cannot be loaded, display a custom message
  if (!isLoaded)
    return <Typography variant='h1' component='h1'>Not loaded</Typography>;

  return (
    <>
      <GoogleMap
        center={ testData[0].coordinates }
        zoom={ 15 }
        mapContainerStyle={{ width: '100%', height: '100%' }}>

        {/* TODO: Display markers */}

        {
          testData.map(({ fillLevel, coordinates }, idx) => (
            <Marker position={ coordinates } key={ idx } icon={ fillLevel === 'rojo' ? `${ iconsRoute }/red-dot.png` : `${ iconsRoute }/green-dot.png` } />
          ))
        }

        {/* TODO: Display route */}


      </GoogleMap>
    </>
  );
}
