import React from 'react';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';


export const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Box>
          <Typography variant='h6'>Dashboard</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
