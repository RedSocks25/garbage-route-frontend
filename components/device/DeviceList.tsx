import React from 'react';

import { Box, Divider, List, ListItem, Paper, Typography } from '@mui/material';


const devices = [
  {
    type: "Sensor 1",
    value: 123.456,
    unit: "pH",
  },
  {
    type: "Sensor 2",
    value: 456.789,
    unit: "HR",
  },
  {
    type: "Sensor 3",
    value: 789.123,
    unit: "ppm",
  },
  {
    type: "Sensor 4",
    value: 123.456,
    unit: "pH",
  },
  {
    type: "Sensor 5",
    value: 456.789,
    unit: "HR",
  },
  {
    type: "Sensor 6",
    value: 789.123,
    unit: "ppm",
  },
  {
    type: "Sensor 7",
    value: 789.123,
    unit: "ppm",
  },
  {
    type: "Sensor 8",
    value: 789.123,
    unit: "ppm",
  },
];

export const DeviceList = () => {
  return (
    <Box sx={{ flexDirection: 'column', backgroundColor: '#F0F0F0', height: '100%' }}>

      <List sx={{ overflow: 'auto', height: '100%' }}>
        {
          devices.map(({ type, value, unit }) => (
            <ListItem key={ type }>
              <Paper elevation={ 0 } sx={{ padding: 2, width: '100%', paddingY: 1, margin: 0, borderRadius: 1 }}>
                <Typography variant='subtitle1'>{ type }</Typography>
                <Divider />
                <Typography variant='h6'>{ `${ value } ${ unit }` }</Typography>
              </Paper>
            </ListItem>
          ))
        }
      </List>

    </Box>
  );
}
