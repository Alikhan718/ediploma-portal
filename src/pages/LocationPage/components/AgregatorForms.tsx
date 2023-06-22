import React from 'react';

import { Typography, Box, MenuItem, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Input, Select, Button } from '@src/components';
import { OpenMode } from '../types';
import { aggregators, PriceSource, woltStatusses, iikoStatusses, statusses, getWoltStatuses } from './generators';

import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { fetchPaymentTypes, fetchWoltStatusses } from '@src/store/locations/reducer';
import { fetchTime, updatePickupTime } from "@src/store/settings/reducer";
import { selectWoltStatusses } from "@src/store/locations/selector";
import { selectTime } from "@src/store/settings/selector";

import PlusIcon from "@src/assets/icons/plus.png";
import DeleteIcon from "@src/assets/icons/deleteIcon.png";
import { ReactComponent as BackIcon } from "@src/assets/icons/arrowBack.svg";
import { ReactComponent as RightIcon } from "@src/assets/icons/arrowRightIcon.svg";
import { ReactComponent as EmptyIcon } from "@src/assets/icons/emptyIcon.svg";

interface AggregatorFormsProps {
  open: OpenMode,
  onSubmit: (data: any, storeIds: Array<{ name: string }>) => void
}

interface IForm {
  aggregator: number,
  storeIds: Array<{ name: string }>,
  webURL: string,
  payment_type_delayed: any,
  payment_type_cash: any,
  api_key?: string,
  menu_username?: string,
  menu_password?: string,
  price_source: PriceSource,
  is_marketplace: boolean,
  wolt_statusses: Array<{ status: number }>
}

export const AggregatorForms: React.FC<AggregatorFormsProps> = ({ open, onSubmit }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { payment_types, loading, nextInProgress } = useTypedSelector(state => state.locations);

  const wolt_statusses = useSelector(selectWoltStatusses);

  const { control, handleSubmit, formState: { errors }, watch } = useForm<IForm>({
    defaultValues: {
      aggregator: 1,
      webURL: "",
      storeIds: [{ name: "" }],
      wolt_statusses: [{}]
    }
  });
  const time = useSelector(selectTime);
  const rest_id = String(params.resti_id);

  const { fields, append, remove } = useFieldArray({ control, name: "storeIds" });
  const aggregatorWatch = watch("aggregator");
  const storeIds = watch("storeIds");

  const [selectedValue, setSelectedValue] = React.useState(time ?? 0);
  const [openModal, setOpenModal] = React.useState(false);
  const [show, setValueShow] = React.useState<boolean>(false);

  const options = [25, 40, 60];


  const onSubmitForm: SubmitHandler<IForm> = (data: IForm): void => {
    const iiko_wolt_statuses = data.wolt_statusses?.map((item, index) => {
      return {
        iiko: iikoStatusses[index].status,
        wolt: getWoltStatuses[item.status]
      };
    });
    onSubmit({ ...data, iiko_wolt_statuses }, storeIds);
  };

  const appendStoreId = (): void => {
    if (storeIds[storeIds.length - 1].name) {
      append({ name: "" });
    }
  };
  const removeStoreIdItem = (index: number): void => {
    remove(index);
  };

  React.useEffect(() => {
    // FIXME: GET PAYMENTTYPES BY REST ID 
    dispatch(fetchPaymentTypes(String(params.resti_id)));
    dispatch(fetchWoltStatusses({ resti_id: rest_id, aggregator: "wolt" }));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (options.includes(Number(event.target.value))) {
      setValueShow(false);
    } else {
      event.target.value = String(Math.max(0, Number(event.target.value)));
      if (Number(event.target.value) > 60) {
        event.target.value = String(60);
        setValueShow(false);
      }
      else {
        setValueShow(true);
      }
    }
    setSelectedValue(Number(event.target.value));
  };

  const getTime = (): void => {
    dispatch(fetchTime(rest_id));
  };

  const updateTime = (): void => {
    dispatch(updatePickupTime(rest_id, selectedValue));
    setOpenModal(false);
  };

  const isWoltStatusExists = (status: string): boolean => {
    const isExists = wolt_statusses?.iiko_wolt_statuses?.some((el: { iiko: string, wolt: string }) => {
      if (el.iiko === status) {
        return true;
      }
      return false;
    });
    return isExists;
  };

  const getWoltStatus = (iiko_status: string): number => {
    const result = wolt_statusses?.iiko_wolt_statuses?.find((obj: { iiko: string; }) => obj.iiko === iiko_status);
    return result ? statusses[result.wolt] : 1;
  };


  React.useEffect(getTime, [rest_id]);

  React.useEffect(() => {
    if (options.includes(time)) {
      setValueShow(false);
    } else {
      setValueShow(true);
    }
    setSelectedValue(time);

  }, [time]);

  return (
    <Box position="relative" minHeight="100%">
      <Box display="flex" gap={2} alignItems="center">
        <BackIcon style={{ cursor: "pointer" }} onClick={(): void => navigate(-1)} />
        <Typography fontSize="1.75em" fontWeight="700">
          Интеграция c агрегатором
        </Typography>
      </Box>

      {/*  REACT HOOK FORMS  */}
      {/*<form onSubmit={handleSubmit(onSubmitForm)}>*/}
      {/*  <Box mt="50px" />*/}
      {/*  <Controller*/}
      {/*    name="aggregator"*/}
      {/*    control={control}*/}
      {/*    rules={{ required: true }}*/}
      {/*    render={({ field }): JSX.Element => (*/}
      {/*      <Select label="Агрегатор" {...field} fullWidth>*/}
      {/*        {aggregators.map(agr => (*/}
      {/*          <MenuItem key={agr.id} value={agr.id}>{agr.name}</MenuItem>*/}
      {/*        ))}*/}
      {/*      </Select>*/}
      {/*    )}*/}
      {/*  />*/}
      {/*  {errors.aggregator && <Typography color="red">Выберите агрегатора</Typography>}*/}
      {/*  <Box mb="60px" />*/}

      {/*  /!*=============================================STORE IDS=========================================================================================  *!/*/}
      {/*  <Box width="100%" display="flex" alignItems="start" mb="20px">*/}
      {/*    <Box style={{ listStyleType: "none", width: "100%" }}>*/}
      {/*      {fields.map((item, index) => {*/}
      {/*        return (*/}
      {/*          <Controller*/}
      {/*            key={item.id}*/}
      {/*            name={`storeIds.${index}.name`}*/}
      {/*            control={control}*/}
      {/*            rules={{ required: true }}*/}
      {/*            render={({ field }): JSX.Element => {*/}
      {/*              return (*/}
      {/*                <Box display="flex" alignItems="center" justifyContent="space-between">*/}
      {/*                  <Input*/}
      {/*                    fullWidth*/}
      {/*                    {...field}*/}
      {/*                    sx={{ marginBottom: "10px" }}*/}
      {/*                    label={"External ID ресторана"}*/}
      {/*                    error={errors.storeIds && errors.storeIds[index] ? true : false}*/}
      {/*                  />*/}
      {/*                  <Box width="20px" />*/}
      {/*                  {index > 0*/}
      {/*                    ? <Box paddingTop='12px'>*/}
      {/*                      <Button variant={"text"} color="neutral" onClick={removeStoreIdItem.bind(null, index)}>*/}
      {/*                        <img src={PlusIcon} />*/}
      {/*                      </Button>*/}
      {/*                    </Box>*/}
      {/*                    : <Box paddingTop='12px'>*/}
      {/*                      <Button variant={"contained"} color="neutral" onClick={appendStoreId}>*/}
      {/*                        <img src={DeleteIcon} />*/}
      {/*                      </Button>*/}
      {/*                    </Box>}*/}
      {/*                </Box>*/}
      {/*              );*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </Box>*/}
      {/*    <Box width="20px" />*/}
      {/*  </Box>*/}
      {/*  {aggregatorWatch === 3*/}
      {/*    ? <React.Fragment>*/}
      {/*      /!*  *!/*/}
      {/*      <Controller*/}
      {/*        name="api_key"*/}
      {/*        control={control}*/}
      {/*        rules={{ required: true }}*/}
      {/*        render={({ field }): JSX.Element => (*/}
      {/*          <Box mb='10px'>*/}
      {/*            <Input*/}
      {/*              {...field}*/}
      {/*              label="Order API token"*/}
      {/*              fullWidth*/}
      {/*            />*/}
      {/*            {errors.webURL && <Typography color="red">Заполните поле</Typography>}*/}
      {/*          </Box>*/}
      {/*        )}*/}
      {/*      />*/}
      {/*      <Controller*/}
      {/*        name="menu_username"*/}
      {/*        control={control}*/}
      {/*        rules={{ required: true }}*/}
      {/*        render={({ field }): JSX.Element => (*/}
      {/*          <Box mb='10px'>*/}
      {/*            <Input*/}
      {/*              {...field}*/}
      {/*              label="Menu Username"*/}
      {/*              fullWidth*/}
      {/*            />*/}
      {/*            {errors.webURL && <Typography color="red">Заполните поле</Typography>}*/}
      {/*          </Box>*/}
      {/*        )}*/}
      {/*      />*/}
      {/*      <Controller*/}
      {/*        name="menu_password"*/}
      {/*        control={control}*/}
      {/*        rules={{ required: true }}*/}
      {/*        render={({ field }): JSX.Element => (*/}
      {/*          <Box mb='10px'>*/}
      {/*            <Input*/}
      {/*              {...field}*/}
      {/*              label="Menu Password"*/}
      {/*              fullWidth*/}
      {/*            />*/}
      {/*            {errors.webURL && <Typography color="red">Заполните поле</Typography>}*/}
      {/*          </Box>*/}
      {/*        )}*/}
      {/*      />*/}

      {/*    </React.Fragment>*/}
      {/*    : null*/}
      {/*  }*/}

      {/*  {*/}
      {/*    aggregatorWatch !== 1 ?*/}
      {/*      <React.Fragment>*/}
      {/*        /!* ========================================================================WEBURL=============================================================================== *!/*/}
      {/*        <Box display="flex" flexDirection="column" gap="20px">*/}
      {/*          <Controller*/}
      {/*            name="webURL"*/}
      {/*            control={control}*/}
      {/*            rules={{ required: true }}*/}
      {/*            render={({ field }): JSX.Element => (*/}
      {/*              <Box>*/}
      {/*                <Input*/}
      {/*                  {...field}*/}
      {/*                  label="WEBURL вашего меню в Glovo"*/}
      {/*                  fullWidth*/}
      {/*                />*/}
      {/*                {errors.webURL && <Typography color="red">Заполните поле</Typography>}*/}
      {/*              </Box>*/}
      {/*            )}*/}
      {/*          />*/}
      {/*          {loading*/}
      {/*            ? <Box display="flex" justifyContent="center" mb="10px">*/}
      {/*              <CircularProgress />*/}
      {/*            </Box> : null}*/}
      {/*          /!*=======================================WOLT STATUSES SYNC============================================================================================== *!/*/}
      {/*          {aggregatorWatch == 3 && wolt_statusses.iiko_wolt_statuses ?*/}
      {/*            <Box>*/}
      {/*              <Typography mt="20px" fontWeight="600" fontSize="20px">Синхронизация статусов</Typography>*/}

      {/*              <Box display='flex' mt='20px'>*/}
      {/*                <Typography width='60%' fontWeight="400" fontSize="0.875em" color="#656665">Статусы Iiko</Typography>*/}
      {/*                <Typography width='50%' fontWeight="400" fontSize="0.875em" color="#656665">Wolt order statusses</Typography>*/}
      {/*              </Box>*/}

      {/*              {iikoStatusses.map((status: any, index: number) => (*/}
      {/*                <Box key={index} paddingTop="10px" display='flex' flexDirection='row' alignItems='center'>*/}
      {/*                  <Input*/}
      {/*                    value={`"${status.status}"`}*/}
      {/*                    disabled*/}
      {/*                    fullWidth*/}
      {/*                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}*/}
      {/*                  />*/}

      {/*                  <Box padding='10px'>*/}
      {/*                    {isWoltStatusExists(status.status) ? <RightIcon /> : <EmptyIcon />}*/}
      {/*                  </Box>*/}

      {/*                  <Controller*/}
      {/*                    key={index}*/}
      {/*                    defaultValue={isWoltStatusExists(status.status) ? getWoltStatus(status.status) : 1}*/}
      {/*                    name={`wolt_statusses.${index}.status`}*/}
      {/*                    control={control}*/}
      {/*                    rules={{ required: true }}*/}
      {/*                    render={({ field }): JSX.Element => (*/}
      {/*                      // <Select fullWidth {...field}>*/}
      {/*                      //   {woltStatusses.map((status) => (*/}
      {/*                      //     <MenuItem key={status.id} value={status.id}> {status.status} </MenuItem>*/}
      {/*                      //   ))}*/}
      {/*                      // </Select>*/}
      {/*                    )}*/}
      {/*                  />*/}

      {/*                  {errors.wolt_statusses && <Typography color="red">Заполните поле</Typography>}*/}
      {/*                </Box>*/}
      {/*              ))}*/}
      {/*            </Box>*/}
      {/*            : null}*/}
      {/*          /!*=======================================PAYMENT TYPES============================================================================================== *!/*/}
      {/*          {payment_types.length ?*/}
      {/*            <Box mt="20px">*/}
      {/*              <Controller*/}
      {/*                name="payment_type_cash"*/}
      {/*                control={control}*/}
      {/*                rules={{ required: true }}*/}
      {/*                render={({ field }): JSX.Element => (*/}
      {/*                  <Select label="Наличный расчет" renderValue={(value: any) => value.name} {...field} fullWidth defaultValue="Выберите способ оплаты">*/}
      {/*                    {payment_types.map((item: any, index: number) => {*/}
      {/*                      if (item.isDeleted == false) {*/}
      {/*                        return <MenuItem value={item} key={`${item.id}#${index}`}>{item.name}</MenuItem>;*/}
      {/*                      }*/}
      {/*                    }*/}
      {/*                    )}*/}
      {/*                  </Select>*/}
      {/*                )}*/}
      {/*              />{errors.payment_type_cash && <Typography color="red">Заполните поле</Typography>}*/}
      {/*            </Box>*/}
      {/*            : null*/}
      {/*          }*/}
      {/*          {payment_types.length ?*/}
      {/*            <Box mt="10px">*/}
      {/*              <Controller*/}
      {/*                name="payment_type_delayed"*/}
      {/*                control={control}*/}
      {/*                rules={{ required: true }}*/}
      {/*                render={({ field }): JSX.Element => (*/}
      {/*                  <Select label="Безналичный расчет" renderValue={(value: any) => value.name} {...field} fullWidth defaultValue="Выберите способ оплаты">*/}
      {/*                    {payment_types.map((item: any, index: number) => {*/}
      {/*                      if (item.isDeleted == false) {*/}
      {/*                        return <MenuItem value={item} key={index}>{item.name}</MenuItem>;*/}
      {/*                      }*/}
      {/*                    }*/}
      {/*                    )}*/}
      {/*                  </Select>*/}
      {/*                )}*/}
      {/*              />{errors.payment_type_delayed && <Typography color="red">Заполните поле</Typography>}*/}
      {/*            </Box>*/}
      {/*            : null*/}
      {/*          }*/}
      {/*        </Box>*/}
      {/*      </React.Fragment>*/}
      {/*      : null*/}
      {/*  }*/}
      {/*  {aggregatorWatch !== 1 ?*/}
      {/*    <Box mt="30px ">*/}
      {/*      <Typography fontWeight="600" fontSize="20px">Тип доставки</Typography>*/}
      {/*      <Controller*/}
      {/*        control={control}*/}
      {/*        name="is_marketplace"*/}
      {/*        render={({ field }) => (*/}
      {/*          <RadioGroup  >*/}
      {/*            <FormControlLabel*/}
      {/*              control={<Radio checked={field.value === true} onChange={() => field.onChange(true)} />} label="Доставка со стороны агрегатора" />*/}
      {/*            <FormControlLabel*/}
      {/*              control={<Radio checked={field.value === false} onChange={() => field.onChange(false)} />} label="Своя доставка" />*/}
      {/*          </RadioGroup>*/}
      {/*        )}*/}
      {/*      />*/}

      {/*      /!* <Typography mt="20px" fontWeight="600" fontSize="20px">Источник цены</Typography>*/}
      {/*      <Controller*/}
      {/*        control={control}*/}
      {/*        name="price_source"*/}
      {/*        render={({ field }) => (*/}
      {/*          <RadioGroup {...field}>*/}
      {/*            <FormControlLabel value={PriceSource.DELIVERY_SERVICE} control={<Radio />} label="Сервис доставки" />*/}
      {/*            <FormControlLabel value={PriceSource.POS} control={<Radio />} label="Касса" />*/}
      {/*          </RadioGroup>*/}
      {/*        )}*/}
      {/*      /> *!/*/}


      {/*    </Box> : null}*/}
      {/*  {aggregatorWatch == 3 ?*/}
      {/*    <Box>*/}
      {/*      <Typography mt="20px" fontWeight="600" fontSize="20px">Минимальное время готовки</Typography>*/}

      {/*      /!*<Typography variant='h4' fontWeight='600' mb='8px'> {'Минимальное время готовки'} </Typography>*!/*/}

      {/*      <RadioGroup*/}
      {/*        row={false}*/}
      {/*        aria-labelledby="demo-row-radio-buttons-group-label"*/}
      {/*        name="row-radio-buttons-group"*/}
      {/*      >*/}
      {/*        <FormControlLabel value="25"*/}
      {/*          control={<Radio checked={selectedValue == 25} onChange={handleChange} color="success" />}*/}
      {/*          label="25 мин." />*/}
      {/*        <FormControlLabel value="40"*/}
      {/*          control={<Radio checked={selectedValue == 40} onChange={handleChange} color="success" />}*/}
      {/*          label="40 мин." />*/}
      {/*        <FormControlLabel value="60"*/}
      {/*          control={<Radio checked={selectedValue == 60} onChange={handleChange} color="success" />}*/}
      {/*          label="60 мин." />*/}
      {/*        <FormControlLabel value=""*/}
      {/*          control={<Radio id='time-input' checked={![25, 40, 60].includes(selectedValue)}*/}
      {/*            onChange={handleChange} color="success" />}*/}
      {/*          label="Выбрать свое время" />*/}
      {/*        <div style={{ width: "25rem", marginBottom: '1rem', marginTop: '1rem', display: show ? "block" : "none" }}>*/}
      {/*          <Input type='number' label={'Задайте свое время, мин.'} onChange={handleChange}*/}
      {/*            fullWidth={true} value={options.includes(selectedValue) ? "" : selectedValue}*/}
      {/*            inputSize='s'></Input>*/}
      {/*        </div>*/}
      {/*      </RadioGroup>*/}
      {/*    </Box> : null}*/}
      {/*  <Box height="120px" width="100%" />*/}
      {/*  <Button*/}
      {/*    type="submit"*/}
      {/*    disabled={nextInProgress}*/}
      {/*    sx={{ position: 'absolute', bottom: "40px", right: "40px", backgroundColor: '#025F3E' }}*/}
      {/*    variant="contained">*/}
      {/*    Завершить*/}
      {/*  </Button>*/}
      {/*</form>*/}

    </Box>
  );
};
