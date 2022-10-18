import type { NextPage } from 'next';

import { Container, Grid, Typography } from '@mui/material';

import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

import { DeviceList } from '../components/device';


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

const HomePage: NextPage = () => {

  // Connect to Map service.
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });

  // If cannot be loaded, display a custom message
  if (!isLoaded)
    return <Typography variant='h1' component='h1'>Not loaded</Typography>;

  // If loaded...
  return (
    /* TODO: Style section of map visualization */
    <Grid container direction='row' justifyContent='flex-start'>

      <Grid item sm={2} sx={{ width: '100vw', height: 'calc(100vh - 60px)' }}>
        <DeviceList />
      </Grid>

      <Grid item sm={10} sx={{ width: '100vw', height: 'calc(100vh - 60px)' }}>

        <GoogleMap
          center={ markers[0] }
          zoom={ 15 }
          mapContainerStyle={{ width: '100%', height: '100%' }}>

          {/* TODO: Display markers */}

          {
            markers.map((pointOfInterest, idx) => (
              <Marker position={ pointOfInterest } key={ idx } />
            ))
          }

          {/* TODO: Display route */}


        </GoogleMap>

      </Grid>

    </Grid>
  );
}

export default HomePage;
