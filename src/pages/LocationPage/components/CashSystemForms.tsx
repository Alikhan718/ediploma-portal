import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, MenuItem, CircularProgress, FormGroup, FormControlLabel, Checkbox, Switch } from '@mui/material';

import { Input, Select, Button } from '@src/components';
import { ReactComponent as BackIcon } from "@src/assets/icons/arrowBack.svg";

import { OpenMode } from '../types';
import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { ReactComponent as RefreshIcon } from "@src/assets/icons/refresh.svg";
import { fetchOrganizations } from '@src/store/locations/reducer';
import { cashSystemList, checks } from './generators';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@src/components/Loader/Loader';

// dfbc46f8
interface CashSystemFormsProps {
  open: OpenMode,
  onSubmit: (data: any) => void;
}
interface ICashSystemForm {
  cashSystem: string,
  api_login: string,
  organization_id: string,
  terminal_id: string,
  terminals: Array<any>
}

export const CashSystemForms: React.FC<CashSystemFormsProps> = ({ open, onSubmit }): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { organizations, loading, nextInProgress, cashSystemForms, drawerLoader } = useTypedSelector(state => state.locations);
  const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<ICashSystemForm>({ defaultValues: { ...cashSystemForms, cashSystem: cashSystemForms.pos_type } });

  // WATCHERS
  const api_login = useWatch({ control, name: "api_login" });
  const terminals = useWatch({ control, name: "terminals" });
  const organization = useWatch({ control, name: "organization_id" });
  const cashSystem = useWatch({ control, name: "cashSystem" });

  const getTerminals = (): void => {
    dispatch(fetchOrganizations(api_login));
  };

  React.useEffect(() => {
    const { pos_type, ...payload } = cashSystemForms;
    reset({ ...payload, cashSystem: String(pos_type).toUpperCase() });
  }, [cashSystemForms]);

  React.useEffect(() => {
    organizations.forEach((item: any) => {
      if (item.id === organization) {
        setValue("terminals", [...item.terminals]);
        return;
      }
    });
  }, [organization, setValue, loading]);


  const [showSwitches, setShowSwitches] = useState(false);
  return (
    <React.Fragment>
      <Box display="flex" gap={2} alignItems="center">
        {drawerLoader ? <Loader /> : null}
        <BackIcon style={{ cursor: "pointer" }} onClick={(): void => navigate(-1)} />
        <Typography fontSize='1.75em' fontWeight='700'> Интеграция c IIKO </Typography>
      </Box>
      <Box mt='40px' />

      {/* REACT HOOK FORM */}
      {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*  <Controller*/}
      {/*    name="cashSystem"*/}
      {/*    control={control}*/}
      {/*    rules={{ required: true }}*/}
      {/*    render={({ field }): JSX.Element => (*/}
      {/*      <Select label="Кассовая система" {...field} fullWidth>*/}
      {/*        {cashSystemList.map(item => (*/}
      {/*          <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>*/}
      {/*        ))}*/}
      {/*      </Select>*/}
      {/*    )}*/}

      {/*  />*/}
      {/*  {errors.cashSystem && <Typography>Заполните поле</Typography>}*/}
      {/*  <Box mb="30px" />*/}

      {/*  {cashSystem &&*/}
      {/*    <Box display="flex" justifyContent="space-between" alignItems="end" mb="20px">*/}

      {/*      <Controller*/}
      {/*        name="api_login"*/}
      {/*        control={control}*/}
      {/*        rules={{ required: "Заполните поле" }}*/}
      {/*        render={({ field, fieldState: { error } }): JSX.Element => (*/}
      {/*          <Input*/}
      {/*            {...field}*/}
      {/*            label={`Введите токен от `}*/}
      {/*            error={!!error?.message}*/}
      {/*            helper={error?.message}*/}
      {/*            fullWidth*/}
      {/*          />*/}
      {/*        )}*/}
      {/*      /><Box width="20px" />*/}

      {/*      <Button*/}
      {/*        variant='contained'*/}
      {/*        color='neutral'*/}
      {/*        onClick={getTerminals}*/}
      {/*        startIcon={organizations.length ? <RefreshIcon /> : null}*/}
      {/*      >*/}
      {/*        {organizations.length ? "Обновить" : "Загрузить"}*/}
      {/*      </Button>*/}

      {/*    </Box>*/}
      {/*  }*/}
      {/*  {loading*/}
      {/*    ? <Box display="flex" justifyContent="center" mb="10px">*/}
      {/*      <CircularProgress />*/}
      {/*    </Box> : null}*/}

      {/*  {organizations.length ?*/}
      {/*    <Box mt="20px">*/}
      {/*      <Controller*/}
      {/*        name="organization_id"*/}
      {/*        control={control}*/}
      {/*        rules={{ required: true }}*/}
      {/*        render={({ field }): JSX.Element => (*/}
      {/*          <Select label="Название организации" {...field} fullWidth>*/}
      {/*            {organizations.map((item: any, index: number) => (*/}
      {/*              <MenuItem value={item.id} key={index}>{item.name}</MenuItem>*/}
      {/*            ))}*/}
      {/*          </Select>*/}
      {/*        )}*/}
      {/*      />{errors.organization_id && <Typography color="red">Заполните поле</Typography>}*/}
      {/*    </Box>*/}
      {/*    : null*/}
      {/*  }*/}
      {/*  {organizations.length ?*/}
      {/*    <Box mt="20px">*/}
      {/*      <Controller*/}
      {/*        name="terminal_id"*/}
      {/*        control={control}*/}
      {/*        rules={{ required: true }}*/}
      {/*        render={({ field }): JSX.Element => (*/}
      {/*          <Select label="Имя терминала" fullWidth {...field}>*/}
      {/*            {Array.isArray(terminals) ? terminals.map((terminal: any) => (*/}
      {/*              <MenuItem key={terminal.name} value={terminal.id} >{terminal.name}</MenuItem>*/}
      {/*            )) : null}*/}
      {/*          </Select>*/}
      {/*        )}*/}
      {/*      />{errors.terminal_id && <Typography color="red">Заполните поле</Typography>}*/}
      {/*    </Box> : null*/}
      {/*  }*/}
      {/*  {!organizations.length ?*/}
      {/*    <FormGroup>*/}
      {/*      <FormControlLabel*/}
      {/*        style={{ marginBottom: ".5rem" }}*/}
      {/*        control={*/}
      {/*          <Checkbox onChange={(event: any) => {*/}
      {/*            setShowSwitches(event.target.checked);*/}
      {/*          }} />*/}
      {/*        }*/}
      {/*        label={*/}
      {/*          <Typography fontSize="18px" fontWeight="600">*/}
      {/*            Редактировать поля чеков*/}
      {/*          </Typography>*/}
      {/*        }*/}
      {/*      />*/}
      {/*      {showSwitches && checks.map((el) => (*/}
      {/*        <FormControlLabel*/}
      {/*          key={el.controller}*/}
      {/*          label={el.label}*/}
      {/*          control={*/}
      {/*            <Switch*/}
      {/*              name={el.controller}*/}
      {/*            // checked=*/}
      {/*            // onChange={handleChangeSwitch}*/}
      {/*            />*/}
      {/*          }*/}
      {/*        />*/}
      {/*      ))*/}
      {/*      }*/}

      {/*    </FormGroup>*/}
      {/*    : null}*/}
      {/*  <Button*/}
      {/*    sx={{ position: 'absolute', bottom: "40px", right: "40px" }}*/}
      {/*    type="submit"*/}
      {/*    disabled={nextInProgress}*/}
      {/*    variant="contained">*/}
      {/*    Далее*/}
      {/*  </Button>*/}
      {/*</form>*/}
    </React.Fragment>
  );
};
