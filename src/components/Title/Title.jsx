import { Typography } from '@mui/material';
import React, { useState } from 'react';

export const Title = (props) => {
  const { value, style } = props;

  return (
    <Typography
      variant="h2"
      gutterBottom
      sx={{
        textAlign: 'center',
        fontWeight: 700,
        // color: '#335',
        color: 'text.primary',
      }}
      style={style}
    >
      {value}
    </Typography>
  );
};
