import React from 'react';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Typography } from '@mui/material';


// The Hub Calgary
const markers = [
  {
    lat: 51.0678913292,
    lng: -114.113761605,
  },
  {
    lat: 51.058527,
    lng: -114.113798,
  },
  {
    lat: 51.134477,
    lng: -114.219920,
  },
];

export const Map = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });

  // If cannot be loaded, display a custom message
  if (!isLoaded)
    return <Typography variant='h1' component='h1'>Not loaded</Typography>;

  return (
    <>
      <GoogleMap
        center={ markers[0] }
        zoom={ 15 }
        mapContainerStyle={{ width: '100%', height: '100%' }}>

        {/* TODO: Display markers */}

        {
          markers.map((pointOfInterest, idx) => (
            <Marker position={ pointOfInterest } key={ idx } icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"} />
          ))
        }

        {/* TODO: Display route */}


      </GoogleMap>
    </>
  );
}
