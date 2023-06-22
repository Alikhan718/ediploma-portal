import React from 'react';

import { Box, Typography } from '@mui/material';

import { Input } from '@src/components';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search.svg';
import { AttributeGroupHeaderProps } from '../types';

export const AttributeGroupHeader: React.FC<AttributeGroupHeaderProps> = ({ handleSearch }) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleSearch(e.target.value.trim());
  };
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Typography fontSize='1.75em' noWrap fontWeight='700'> Аттрибут-группы </Typography>
      <Box display='flex' alignItems='center'>
        <Input inputSize='m' placeholder='Поиск' onChange={onChange} endAdornment={<SearchIcon />} />
      </Box>
    </Box>
  );
};
