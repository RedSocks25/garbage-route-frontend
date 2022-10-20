import React, { FC, useEffect } from 'react';

import { Box, List, ListItem } from '@mui/material';

import { Sensor } from '../../interfaces';
import { DeviceCard, SkeletonCard } from './';
import { colors } from '../../utils';


interface Props {
  devices: Sensor[];
}

export const DeviceList: FC<Props> = ({ devices = [] }) => {

  return (
    <Box sx={{ flexDirection: 'column', backgroundColor: '#353535', height: '100%' }}>

      <List sx={{ overflow: 'auto', height: '100%' }}>
        {
          devices.length !== 0 ? (
            devices.map(( sensor, idx ) => (
              <ListItem key={ idx }>
                <DeviceCard sensor={ sensor } color={ colors[idx] } />
              </ListItem>
            ))
          ) : (
            [...Array(7)].map((idx) => (
              <ListItem key={ idx }>
                <SkeletonCard />
              </ListItem>
            ))
          )
        }

      </List>

    </Box>
  );
}
