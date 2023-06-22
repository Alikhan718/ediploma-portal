import React from 'react';
import { Box, Typography } from '@mui/material';
import { Input, Button } from '@src/components';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as AddIcon } from '@src/assets/icons/add.svg';
import { LocationHeaderProps } from '../types';

export const LocationHeader: React.FC<LocationHeaderProps> = ({ handleOpenDrawer, handleSearch }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Typography fontSize='1.75em' noWrap fontWeight='700'> Подключение </Typography>
      <Box display='flex' alignItems='center'>
        <Input inputSize='m' placeholder='Поиск' onChange={(e) => {
          if (e.target.value.trim().length > 3) {
            handleSearch(e.target.value);
          }
        }} endAdornment={<SearchIcon />} />
        <Button
          variant='contained'
          color="success"
          buttonSize='m'
          sx={{ ml: '10px', '&:hover': { boxShadow: 'none', backgroundColor: '#07714B' } }}
          startIcon={<AddIcon />}
          onClick={handleOpenDrawer}>
          Добавить ресторан
        </Button>
      </Box>
    </Box>
  );
};
