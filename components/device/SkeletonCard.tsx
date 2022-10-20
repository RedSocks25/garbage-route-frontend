import { Divider, Paper, Skeleton } from '@mui/material'
import React from 'react'


export const SkeletonCard = () => {
  return (
    <Paper
      elevation={ 0 }
      sx={{
        padding: 2,
        width: '100%',
        paddingY: 1,
        margin: 0,
        borderRadius: 1,
      }}
    >
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Divider />
      <Skeleton variant="rectangular" height={45} sx={{ width: '100%', borderRadius: 1, marginTop: 1 }} />
    </Paper>
  )
}
