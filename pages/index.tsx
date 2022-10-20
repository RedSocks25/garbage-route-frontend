import type { NextPage } from 'next';

import { Grid } from '@mui/material';

import { DeviceList, Map } from '../components/device';
import { useSensors } from '../hooks';


const HomePage: NextPage = () => {

  // Values extracted from websocket custom hook useSensors
  const { containers, sensors } = useSensors('ws://localhost:8080');

  return (
    /* TODO: Style section of map visualization */
    <Grid container direction='row' justifyContent='flex-start'>

      <Grid item sm={2} sx={{ width: '100vw', height: 'calc(100vh - 60px)' }}>
        <DeviceList devices={ sensors } />
      </Grid>

      <Grid item sm={10} sx={{ width: '100vw', height: 'calc(100vh - 60px)' }}>
        <Map containers={ containers } />
      </Grid>

    </Grid>
  );
}

export default HomePage;
