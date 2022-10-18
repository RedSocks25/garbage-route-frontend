import React from 'react';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';


export const Header = () => {
  return (
    <AppBar position='static' elevation={ 0 } sx={{ maxHeight: '60px' }}>
      <Toolbar>
        <Box>
          <Typography variant='h6'>Dashboard</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
