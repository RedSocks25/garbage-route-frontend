import { useContext, useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { Grid } from '@mui/material';

import { DeviceList, Map } from '../components/device';
import { useSensors } from '../hooks';
import { garbageApi } from '../apis';
import { Container, GarbageData, Sensor } from '../interfaces';
import { filterSensors } from '../utils';
import { ContainersContext } from '../contexts/ContainersContext';


const HomePage: NextPage = () => {

  // Values extracted from websocket custom hook useSensors
  const { containersData, sensorsData, isConnected } = useSensors(process.env.NEXT_PUBLIC_WS_URL!);

  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [filteredSensors, setFilteredSensors] = useState<Sensor[]>([]);
  const [containers, setContainers] = useState<Container[]>([]);

  const { showContainers } = useContext(ContainersContext);

  // When is connected get the last data from the database
  useEffect(() => {
    if (!isConnected) return;

    // Gather data
    const fecthInitialData = async() => {
      try {
        const { data } = await garbageApi.get<GarbageData>('sensor');

        setFilteredSensors(filterSensors([...data.sensors]))
        setSensors(data.sensors);
        setContainers(data.containers);

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
    <Grid container direction='row' justifyContent='flex-start'>

      {/* Devices list section */}
      <Grid item sm={2} sx={{ width: '100vw', height: 'calc(100vh - 60px)' }}>
        <DeviceList devices={ showContainers ? filteredSensors : sensors } containers={ containers } />
      </Grid>

      {/* Map section */}
      <Grid item sm={10} sx={{ width: '100vw', height: 'calc(100vh - 60px)' }}>
        <Map containers={ containers } />
      </Grid>

    </Grid>
  );
}

export default HomePage;
