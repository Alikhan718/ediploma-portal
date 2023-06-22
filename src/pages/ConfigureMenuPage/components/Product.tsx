import React from 'react';
import { Box, Typography } from '@mui/material';



export const Product: React.FC = () => {
  return (
    <Box
      width="100%"
      p='15px 0'
      display='flex'
      alignItems='start'
      justifyContent='space-between'
      borderBottom='1px solid #E8E8E9'>

      <Box display='flex' alignItems={"start"} width='60%'>

        <img
          style={{
            width: '100%',
            maxWidth: '80px',
            height: "80px",
            display: 'block',
            borderRadius: '10px',
            marginRight: '10px',
            background: "#eee"
          }}
          src={''}
          alt='' />

        <Box>
          <Typography variant='h4' fontWeight='600' mb='8px'> {'Product Name'} </Typography>
          <Typography variant='h3' fontWeight='400'> {"Descriptiotn"} </Typography>
        </Box>
      </Box>
      <Typography width="20%" variant='h4' fontWeight='600'> {345} {"$"} </Typography>
      <Box width="15%">


      </Box>
    </Box>
  );
};