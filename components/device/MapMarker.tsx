import React, { FC } from 'react';

import { Marker } from '@react-google-maps/api';

import { Coordinates } from '../../interfaces';

import { greenDotIcon, redDotIcon } from '../../utils';


interface Props {
  labelText: string,
  position: Coordinates,
  fillLevel: string,
}

export const MapMarker: FC<Props> = ({ labelText, position, fillLevel }) => {
  return (
    <Marker
      options={{
        optimized: true,
        label: {
          text: labelText,
          color: '#000000',
          fontSize: '15px',
          fontWeight: 'bold',
        }
      }}
      position={ position }
      icon={{
        url: fillLevel === 'Verde' ? greenDotIcon : redDotIcon,
        scaledSize: new google.maps.Size(50,50)
      }} 
    />
  )
}
