import React, { FC } from 'react';

import { Divider, Paper, Skeleton, Typography } from '@mui/material';

import { Container } from '../../interfaces';


interface Props {
  container: Container;
  color?: string;
  isLoaded?: boolean;
  id: number;
}

export const ContainerCard: FC<Props> = ({ container, color = '000000', isLoaded = false, id }) => {
  return (
    <Paper
      elevation={ 0 }
      sx={{
        padding: 2,
        width: '100%',
        margin: 0,
        borderRadius: 1,
        backgroundColor: `#${ container.fillLevel === 'Rojo' ? 'FA3A3A' : '3ED863' }`
      }}
    >
      { isLoaded ? (
        <React.Fragment>
          <Typography variant='subtitle1' color='white'>{ `Contenedor ${ id + 1 }` }</Typography>
          <Divider />
          <Typography variant='h6' color='white'>{ `${ container.value } ${ container.unit }` }</Typography>
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
