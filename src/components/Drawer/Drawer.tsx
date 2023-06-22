import React, { useState } from 'react';
import { Button, Input, Textarea, Select, Select2, Modal } from '@src/components';
import { ReactComponent as UploadIcon } from '@src/assets/icons/upload.svg';
import PlusIcon from '@src/assets/icons/plus.png';
import { Drawer as MuiDrawer, Box, Typography, MenuItem } from '@mui/material';
import { DrawerProps } from './Drawer.props';
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Step1 } from "@src/components/Attribute/step1";
import { Step2 } from "@src/components/Attribute/step2";
import { Step3 } from "@src/components/Attribute/step3";

export const Drawer: React.FC<DrawerProps> = (props) => {
  const { open, onClose } = props;
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      aggregator: 1,
      // storeIds: [{ name: "" }],
      webURL: "",
    }
  });

  const [form, setForm] = useState({
    name: "",
    min: 1,
    max: 1,
    attributes: [],
    products: []
  });

  const handleNameChange = (newName: string): void => {
    setForm({
      ...form,
      name: newName
    });
  };
  const handleMinMaxChange = (e: any): void => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  interface IForm {
    aggregator: number,
    // storeIds: Array<{ name: string }>,
    api_login: string,
    organization_id: string,
    webURL: string,
    payment_type_card: any,
    payment_type_cash: any
  }

  const handleBack = () => {
    if (step - 1 !== 0) {
      setStep(step - 1);
    } else {
      setModalOpen(false);
    }
  };
  const handleNext = () => {
    if (step + 1 < 4) {
      setStep(step + 1);
    }
  };

  return (
    <MuiDrawer variant="temporary" anchor='right' open={open} onClose={onClose}>
      <Box p='40px'>
        <Typography fontSize='1.75em' fontWeight='700'> Изменение позиции </Typography>
        <Box mt='40px' />
        <Box display='flex'>
          <img
            src='https://via.placeholder.com/150x150'
            alt='menu image'
            style={{ display: 'block', borderRadius: '10px', maxWidth: '150px', width: '100%' }} />

          <Box ml='30px'>
            <Typography
              variant='h4'
              fontWeight='600'>
              Загрузить изображение
            </Typography>

            <Typography
              variant='h3'
              color='text.secondary'
              mt='10px'>
              Поддерживаемы форматы: <b> png, gif, jpeg, jpg </b>
            </Typography>

            <Typography
              variant='h3'
              color='text.secondary'
              mt='5px'
              mb='15px'>
              Максимальный размер: <b> 2 MB </b>
            </Typography>

            <Button buttonSize='s' startIcon={<UploadIcon />} variant='outlined' color='onyx'>
              Выбрать изображение
            </Button>
          </Box>
        </Box>
        <Box mt='15px'>
          <Box display='flex' mb='15px'>
            <Input fullWidth label='Название позиции в агрегаторе' />
            <Box mr='15px' />
            <Input disabled={true} label='Цена за единицу' />
          </Box>
          <Textarea fullWidth label='Описание' helper='0/ 200 символов' />
        </Box>
        <Box mt='15px'>
          <Box display='flex' mb='15px'>
            <Controller
              name="payment_type_card"
              control={control}
              rules={{ required: true }}
              render={({ field }): JSX.Element => (
                <Select label="ID товара в POS" {...field} fullWidth defaultValue={'null'}>
                  <MenuItem style={{ display: "hidden" }} value={'null'} disabled>Выберите категорию товара</MenuItem>
                </Select>
              )}
            />
            {errors.payment_type_card && <Typography color="red">Заполните поле</Typography>}
            <Controller
              name="payment_type_card"
              control={control}
              rules={{ required: true }}
              render={({ field }): JSX.Element => (
                <Select label="Категория товара" {...field} fullWidth defaultValue={'null'}>
                  <MenuItem style={{ display: "hidden" }} value={'null'} disabled>Выберите категорию товара</MenuItem>
                </Select>
              )}
            />
            {errors.payment_type_card && <Typography color="red">Заполните поле</Typography>}
          </Box>
          <Box display='flex' mb='15px'>
            <Controller
              name="payment_type_card"
              control={control}
              rules={{ required: true }}
              render={({ field }): JSX.Element => (
                <Select label="Атрибуты" {...field} fullWidth>
                  {/*<MenuItem selected></MenuItem>*/}
                </Select>
              )}
            />
            {errors.payment_type_card && <Typography color="red">Заполните поле</Typography>}
            <Box mr='15px' />
            <Controller
              name="payment_type_cash"
              control={control}
              rules={{ required: true }}
              render={({ field }): JSX.Element => (
                <Select label="Категория товара" {...field} fullWidth defaultValue={'null'}>
                  {/*<MenuItem hidden value={'null'}>Выберите категорию товара</MenuItem>*/}
                </Select>
              )}
            />
            {errors.payment_type_card && <Typography color="red">Заполните поле</Typography>}
          </Box>
        </Box>
        <Box mt="20px">
          <Button buttonSize='s' onClick={() => {
            setModalOpen(true);

          }} variant='contained' color='inherit'>
            <img src={PlusIcon} style={{ marginRight: ".8em" }} alt="" />
            Добавить группу атрибутов
          </Button>
        </Box>


        <Modal maxWidth={500} open={modalOpen} handleClose={() => {
          setModalOpen(false);
        }}>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <h1>Новая группа аттрибутов</h1>
            {/* {step == 1 && <Step1 name={form.name} handleChange={handleNameChange} />} */}
            {step == 2 && <Step2 min={form.min} max={form.max} handleChange={handleMinMaxChange} />}
            {/* {step == 3 && <Step3 />} */}
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
            <Button buttonSize='s' style={{ margin: ".1em" }} onClick={handleBack} variant='text' color='onyx'>
              {step == 1 ? 'Отмена' : 'Назад'}
            </Button>
            <Button buttonSize='s' style={{ margin: ".1em" }} onClick={handleNext} variant='contained' color='success'>
              {step != 3 ? 'Далее' : 'Сохранить'}
            </Button>
          </div>

        </Modal>


      </Box>

    </MuiDrawer>
  );
};