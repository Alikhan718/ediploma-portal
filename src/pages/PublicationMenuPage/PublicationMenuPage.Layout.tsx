import React from 'react';

import { MenuItem, SelectChangeEvent, Typography, Box, Checkbox, FormControl, FormControlLabel } from '@mui/material';

import { HeaderTitle } from '@src/components/HeaderTitle/HeaderTitle';
import { Select, Select2 } from '@src/components';
import { PublicationMenuTable } from './components/PublicationMenuTable';
import { MultiSelect } from '@src/components/MultiSelect/MuiltiSelect';

export const PublicationMenuPageLayout: React.FC = () => {
  const [menuList, setMenuList] = React.useState([]);


  return (
    <React.Fragment>
      <HeaderTitle
        title="Публикация меню"
        backTo="/app/menu"
      />
      <Box m="45px 0" width="100%">
        <MultiSelect innerLabel="Выберите меню для публикации" handleChange={setMenuList} defaultValues={menuList} fullWidth>
          <MenuItem value="Rumi">Rumi</MenuItem>
          <MenuItem value="Bahandi">Bahandi</MenuItem>
          <MenuItem value="Mama mia">Mama mia</MenuItem>
          <MenuItem value="HalaL Slice">HalaL Slice</MenuItem>
        </MultiSelect>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="50px">
        <Typography fontSize="20px" fontWeight="600">
          Выберите ссылки на сервисы доставки, чтобы опубликовать меню
        </Typography>

        <FormControlLabel
          label="Выбрать все"
          labelPlacement="start"
          control={<Checkbox color="default" />} />
      </Box>

      <PublicationMenuTable />

    </React.Fragment>
  );
};