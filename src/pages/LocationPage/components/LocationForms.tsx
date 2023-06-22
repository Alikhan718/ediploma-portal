import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Typography, Box, MenuItem, CircularProgress, Button } from '@mui/material';

import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { Input, Select } from '@src/components';
// import { currencies } from './generators';

interface LocationFormsProps {
  formType: string
  onSubmit: (data: any) => void
}
interface IForm {
  name: string,
  city: string,
  street: string,
  currency: string,
  timezone: { tz: string, utc_offset: string },
  language: string
}

export const LocationForms: React.FC<LocationFormsProps> = ({ formType, onSubmit }): React.ReactElement => {
  const { cities, loading, nextInProgress, locationForms, currencies, languages } = useTypedSelector(state => state.locations);
  const { control, handleSubmit, reset } = useForm<IForm>();

  const handleSubmitForm = (data: IForm): void => {
    const city_item = cities.find((item: any) => item.name === data.city);
    data["timezone"] = city_item.timezone;
    onSubmit(data);
  };

  React.useEffect(() => {
    reset({
      name: locationForms.name,
      city: locationForms.address ? locationForms.address.city : "",
      street: locationForms.address ? locationForms.address.street : "",
      currency: locationForms.currency,
      timezone: { tz: "", utc_offset: "" },
      language: locationForms.language_code,

    });
  }, [locationForms, currencies, languages]);

  return (
    <React.Fragment>
      <Typography fontSize='1.75em' fontWeight='700'> Добавить ресторан: Основная информация </Typography>
      <Box mt='40px' />
      {/*<form onSubmit={handleSubmit(handleSubmitForm)}>*/}
      {/*  <Controller*/}
      {/*    name="name"*/}
      {/*    control={control}*/}
      {/*    defaultValue=""*/}
      {/*    rules={{ required: true }}*/}
      {/*    render={({ field, fieldState: { error } }): React.ReactElement => (*/}
      {/*      <Input error={!!error}  {...field} label="Название ресторана" fullWidth />)}*/}
      {/*  /><Box mb="15px" />*/}
      {/*  <Controller*/}
      {/*    name="street"*/}
      {/*    control={control}*/}
      {/*    defaultValue=""*/}
      {/*    rules={{ required: true }}*/}
      {/*    render={({ field, fieldState: { error } }): React.ReactElement =>*/}
      {/*      (<Input error={!!error} {...field} label="Адрес" fullWidth />)}*/}
      {/*  /><Box mb="15px" />*/}
      {/*  <Controller*/}
      {/*    name="city"*/}
      {/*    control={control}*/}
      {/*    defaultValue=""*/}
      {/*    // rules={{ required: true }}*/}
      {/*    render={({ field, fieldState: { error } }): React.ReactElement => (*/}
      {/*      <React.Fragment>*/}
      {/*        <Select*/}
      {/*          error={!!error}*/}
      {/*          label="Город"*/}
      {/*          {...field}*/}
      {/*          fullWidth*/}
      {/*        >{loading ? <CircularProgress /> :*/}
      {/*          cities.map((city: any, index: number) => (*/}
      {/*            <MenuItem key={index} value={city.name} >*/}
      {/*              {city.name}*/}
      {/*            </MenuItem>*/}
      {/*          ))}*/}
      {/*        </Select>*/}
      {/*      </React.Fragment>*/}
      {/*    )}*/}
      {/*  /><Box mb="20px" />*/}
      {/*  <Controller*/}
      {/*    name="currency"*/}
      {/*    control={control}*/}
      {/*    defaultValue=""*/}
      {/*    // rules={{ required: true }}*/}
      {/*    render={({ field, fieldState: { error } }): React.ReactElement =>*/}
      {/*    (<Select {...field} fullWidth label='Валюта'>*/}
      {/*      {currencies.map((item: any) => (*/}
      {/*        <MenuItem key={item.code} value={item.code}>{item.code}</MenuItem>*/}
      {/*      ))}*/}
      {/*    </Select>)}*/}
      {/*  /><Box mb="20px" />*/}


      {/*  <Controller*/}
      {/*    name="language"*/}
      {/*    control={control}*/}
      {/*    defaultValue=""*/}
      {/*    // rules={{ required: true }}*/}
      {/*    render={({ field, fieldState: { error } }): React.ReactElement =>*/}
      {/*    (<Select {...field} fullWidth label='Язык'>*/}
      {/*      {languages.map((item: any) => (*/}
      {/*        <MenuItem key={item.code} value={item.code}>{item.code}</MenuItem>*/}
      {/*      ))}*/}
      {/*    </Select>)}*/}
      {/*  />*/}


      {/*  {formType !== "EDIT" ? <Button*/}
      {/*    type="submit"*/}
      {/*    disabled={nextInProgress}*/}
      {/*    sx={{ position: 'absolute', bottom: "40px", right: "40px" }}*/}
      {/*    variant="contained">*/}
      {/*    Далее*/}
      {/*  </Button>*/}
      {/*    : <Box>*/}
      {/*      <Button sx={{ position: 'absolute', bottom: "40px", right: "200px" }}>*/}
      {/*        Отменить*/}
      {/*      </Button>*/}
      {/*      <Button*/}
      {/*        type="submit"*/}
      {/*        disabled={nextInProgress}*/}
      {/*        sx={{ position: 'absolute', bottom: "40px", right: "40px" }}*/}
      {/*        variant="contained">*/}
      {/*        Сохранить*/}
      {/*      </Button>*/}
      {/*    </Box>}*/}
      {/*</form>*/}

    </React.Fragment>
  );
};