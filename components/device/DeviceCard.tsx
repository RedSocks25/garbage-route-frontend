import { Divider, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Sensor } from '../../interfaces';


interface Props {
  sensor: Sensor;
  color?: string;
}

export const DeviceCard: FC<Props> = ({ sensor, color = '#ffffff' }) => {
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
      <Typography variant='subtitle1' color='white'>{ sensor.type }</Typography>
      <Divider />
      <Typography variant='h6' color='white'>{ `${ sensor.value } ${ sensor.unit }` }</Typography>
    </Paper>
  );
}
