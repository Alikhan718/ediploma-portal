import React from "react";
import { Box, Typography } from "@mui/material";
import { Input, Textarea, Button } from "@src/components";
import { ReactComponent as HelperIcon } from '@src/assets/icons/helper.svg';
import { IEditMenu } from "../types";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editMenu, fetchMenuItem } from "@src/store/menu/actionCreators";
import { selecMenuPageLoader, selectMenuItem } from "@src/store/menu/selector";
import { useNavigate } from "react-router-dom";



export const EditMenu: React.FC<IEditMenu> = ({ menuID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItemData = useSelector(selectMenuItem);
  const loader = useSelector(selecMenuPageLoader);
  const { control, handleSubmit, reset } = useForm({ defaultValues: menuItemData });

  const onSubmit = (body: any): void => {
    dispatch(editMenu({ body, menu_id: menuID }));
  };
  const handleCancel = (): void => navigate(-1);
  React.useEffect(() => {
    dispatch(fetchMenuItem(menuID));
  }, [menuID]);
  React.useEffect(() => {
    reset(menuItemData);
  }, [menuItemData]);
  return (
    <Box position="relative" height="100%">
      <Typography fontSize='1.75em' fontWeight='700'>Изменение меню</Typography>
      <Box mt='40px' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}

          render={({ field, fieldState: { error } }): React.ReactElement => (
            <Input disabled={loader} error={!!error} {...field} label='Название меню в системе Kwaaka' helper={<HelperIcon />} fullWidth />
          )}
        />
        <Box mt='20px' />


        <Box position="absolute" bottom="0" right="0">
          <Button buttonSize="m" onClick={handleCancel}>Отменить</Button>
          <Button disabled={loader} variant="contained" type="submit" buttonSize="m" sx={{ backgroundColor: '#025F3E' }}>
            Сохранить и опубликовать
          </Button>
        </Box>
      </form>
    </Box>
  );
};