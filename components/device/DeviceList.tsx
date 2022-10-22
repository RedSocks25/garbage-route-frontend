import React, { FC, useEffect, useState } from 'react';

import { Box, Divider, List, ListItem, Typography } from '@mui/material';

import { Sensor } from '../../interfaces';
import { DeviceCard, ContainerCard } from './';
import { colors } from '../../utils';
import { Container } from '../../interfaces/websocket';


interface Props {
  devices: Sensor[];
  containers: Container[];
}

export const DeviceList: FC<Props> = ({ devices = [], containers = [] }) => {

  // Stores a state to indicate if the is data loaded. Is false meanwhile the websocket is not sending any information
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    
    // Check if the array of items is the default definition of undefined
    if (typeof(devices[0]) === undefined) return;

    setIsLoaded(true);
  }, [devices]);

  return (
    <Box sx={{ flexDirection: 'column', backgroundColor: '#353535', height: '100%' }}>
      <List sx={{ overflow: 'auto', height: '100%' }}>
        <Typography variant='h6' component='h6' color='white' sx={{ marginX: 2 }}>Sensores</Typography>
        {
          devices.map(( sensor, idx ) => (
            <ListItem key={ idx }>
              <DeviceCard sensor={ sensor } color={ colors[idx] } isLoaded={ isLoaded } />
            </ListItem>
          ))
        }
        <Divider sx={{ backgroundColor: '#000000', marginY: 3 }} />
        <Typography variant='h6' component='h6' color='white' sx={{ marginX: 2 }}>Contenedores</Typography>
        {
          containers.map(( container, idx ) => (
            <ListItem key={ idx }>
              <ContainerCard container={ container } isLoaded={ isLoaded } id={ idx } />
            </ListItem>
          ))
        }

      </List>

    </Box>
  );
}
