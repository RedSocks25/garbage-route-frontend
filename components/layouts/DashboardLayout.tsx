import React, { FC, PropsWithChildren } from 'react';

import Head from 'next/head';

import { AppBar } from '@mui/material';

import { Header } from '../ui';


interface Props extends PropsWithChildren {
  title: string,
}

export const DashboardLayout:FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        {/* TODO: Metatags */}
      </Head>

      <nav>
        <Header />
      </nav>

      <main>
        { children }
      </main>
    </>
  );
}
