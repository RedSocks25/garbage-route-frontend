import { ThemeProvider } from '@emotion/react';

import type { AppProps } from 'next/app';

import { CssBaseline } from '@mui/material';

import { lightTheme } from '../themes';

import '../styles/globals.css';
import { DashboardLayout } from '../components/layouts';
import { ContainersProvider } from '../contexts/ContainersProvider';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContainersProvider>
      <ThemeProvider theme={ lightTheme }>
        <CssBaseline />
        <DashboardLayout title='Dashboard'>
          <Component {...pageProps} />
        </DashboardLayout>
      </ThemeProvider>
    </ContainersProvider>
  );
}

export default MyApp;
