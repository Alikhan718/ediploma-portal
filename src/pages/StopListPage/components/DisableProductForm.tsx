import React from "react";

import { Button, FormControlLabel, Radio, RadioGroup, Typography, Box } from "@mui/material";

import { HeaderTitle, Input } from "@src/components";
import { DisableProductFormProps } from "../types";
import { LocationsListForm } from "./LocationsListForm";

export const DisableProductForm: React.FC<DisableProductFormProps> = ({ productStores, handleOpen, state, setState }) => {

  return (
    <Box position="relative">
      <HeaderTitle title="Отключить продукт" backTo="/app/stopList" /><Box mb="55px" />
      <form >
        {/* DISABLE TIME RANGE */}
        <Typography fontSize="20px" fontWeight="700" mb="25px">
          На сколько вы желаете отключить { }?
        </Typography>
        <RadioGroup>

          <FormControlLabel checked value={3} control={<Radio />} label="Бессрочно" />
          <FormControlLabel disabled value={4} control={<Radio />} label="Пользовательские дата и время" />
        </RadioGroup>
        {/* CUSTOM TIME */}
        {false &&
          <Box mt="30px" mb="50px">
            {/* Choose Date */}
            <Typography fontSize="16px" fontWeight="600" mb="20px">Выберите дату</Typography>
            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb="30px">
              <Input fullWidth type="date" label="Дата начала" />
              <Box width="20px" />
              <Input fullWidth type="date" label="Дата окончания" />
            </Box>
            {/* Choose Time */}
            <Typography fontSize="16px" fontWeight="600" mb="10px">Выберите время дня (необязательно)</Typography>
            <Typography color="onyx" fontSize="18px" fontWeight="400" mb="15px">Оставьте этот раздел пустым, чтобы отключение проводилось весь день</Typography>
            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
              <Input fullWidth type="time" label="Начать" />
              <Box width="20px" />
              <Input fullWidth type="time" label="Завершить" />
            </Box>
          </Box>
        }
        {/* Select Locations  */}
        <Box height="100px">
          <Typography fontSize="20px" fontWeight="600" mb="20px">Применить изменение позиции на следующих точках:</Typography>
          <Typography fontWeight="400" fontSize="20px">Отметьте галочкой на каких точках хотите поставить на стоп этот продукт</Typography>
        </Box>

        {/* LOCATIONS LIST */}
        <LocationsListForm state={state} setState={setState} productStores={productStores} />

        <Box width="100%" height="100px" />
        <Box position="absolute" bottom="0" right="0" marginBottom="10px">
          <Button color="onyx" size="large">Отменить</Button>
          <Button variant="contained" color="success" size="large" onClick={handleOpen}>Отключить</Button>
        </Box>
      </form>
    </Box>
  );
};