import { ThemeProvider } from '@emotion/react';

import type { AppProps } from 'next/app';

import { CssBaseline } from '@mui/material';

import { lightTheme } from '../themes';

import '../styles/globals.css';
import { DashboardLayout } from '../components/layouts';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline />
      <DashboardLayout title='Dashboard'>
        <Component {...pageProps} />
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default MyApp;
