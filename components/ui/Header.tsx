import React, { useContext, useEffect } from 'react';

import { ContainersContext } from '../../contexts/ContainersContext';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';


export const Header = () => {

  const { updateVisibility, showContainers } = useContext(ContainersContext);

  return (
    <AppBar position='static' elevation={ 0 } sx={{ maxHeight: '60px', backgroundColor: '#1e1e1e' }}>
      <Toolbar>
        <Box>
          <Button onClick={ () => updateVisibility(!showContainers) }>
            <Typography variant='h5'>Dashboard</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
