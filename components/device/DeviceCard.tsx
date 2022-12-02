import React, { FC, useContext } from 'react';

import { Divider, Paper, Skeleton, Typography } from '@mui/material';

import { ContainersContext } from '../../contexts/ContainersContext';

import { Sensor } from '../../interfaces';


interface Props {
  sensor: Sensor;
  color?: string;
  isLoaded?: boolean;
}

export const DeviceCard: FC<Props> = ({ sensor, color = '#ffffff', isLoaded = false }) => {

  return (
    <Paper
      elevation={ 0 }
      sx={{
        padding: 2,
        width: '100%',
        margin: 0,
        borderRadius: 1,
        backgroundColor: `#${ color }`
      }}
    >
      { isLoaded ? (
        <React.Fragment>
          <Typography variant='subtitle1' color='white'>{ sensor.type }</Typography>
          <Divider />
          <Typography variant='h6' color='white'>{ `${ sensor.type !== 'Nivel de luminosidad' ? sensor.value : '' } ${ sensor.unit }` }</Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Divider />
          <Skeleton variant="rectangular" height={45} sx={{ width: '100%', borderRadius: 1, marginTop: 1 }} />
        </React.Fragment>
      )}
    </Paper>
  );
}
