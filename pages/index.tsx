import { useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { Grid } from '@mui/material';

import { DeviceList, Map } from '../components/device';
import { useSensors } from '../hooks';
import { garbageApi } from '../apis';
import { Container, GarbageData, Sensor } from '../interfaces';


const HomePage: NextPage = () => {

  // Values extracted from websocket custom hook useSensors
  const { containersData, sensorsData, isConnected } = useSensors(process.env.NEXT_PUBLIC_WS_URL!);

  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [containers, setContainers] = useState<Container[]>([]);

  useEffect(() => {
    if (!isConnected) return;

    // TODO: Create get api call
    const fecthInitialData = async() => {
      try {
        const { data } = await garbageApi.get<GarbageData>('sensor');

        setSensors(data.sensors);

      } catch (error) {
        console.error('Failed to gather data: ', error);
      }
    }

    fecthInitialData();
  }, [isConnected]);

  useEffect(() => {
    if (containersData.length === 0 || sensorsData.length === 0) return;

    setContainers(containersData);
    setSensors(sensorsData);
  }, [containersData, sensorsData]);

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
