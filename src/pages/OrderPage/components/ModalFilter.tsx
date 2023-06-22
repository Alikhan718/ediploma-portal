import React from "react";

import { Box, Typography, IconButton, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectOrderDirection, selectOrderPage, selectOrderField } from "@src/store/orders/selector";
import { fetchOrders } from "@src/store/orders/actionCreators";
import { statusList, deliveryList } from "../generator";
import { ModalFilterProps } from "../types";
import { Input, Select, Label, Button } from '@src/components';
import { ReactComponent as CloseIcon } from '@src/assets/icons/close.svg';
import { statusTranslations } from '@src/utils/getStatusTranslation';



export const ModalFilter: React.FC<ModalFilterProps> = ({ onClose, params, setParams }) => {

  const dispatch = useDispatch();

  const currentPage = useSelector(selectOrderPage);
  const field = useSelector(selectOrderField);
  const direction = useSelector(selectOrderDirection);

  const [filter, setFilter] = React.useState({
    date_to: "",
    date_from: "",
    ID: "",
    canal: "",
    status: ""
  });

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [status, setStatus] = React.useState("");
  const [canal, setCanal] = React.useState("");

  const handleChangeStartDate = (e: any): void => {
    setStartDate(new Date(e.target.value));
  };

  const handleChangeEndDate = (e: any): void => {
    setEndDate(new Date(e.target.value));
  };

  const handleChangeStatus = (e: any): void => {
    setStatus(e.target.value);
  };

  const handleChangeCanal = (e: any): void => {
    setCanal(e.target.value);
  };

  const handleClick = (): void => {

    if (canal) {
      params.set("delivery_service", canal.toLowerCase());
    } else {
      params.delete("delivery_service");
    }
    if (status) {
      params.set("status", status.toLowerCase());
    } else {
      params.delete("status");
    }
    if (startDate) {
      params.set("date_from", startDate.toISOString().substring(0, startDate.toISOString().length - 5));
    } else {
      params.delete("date_from");
    }
    if (endDate) {
      params.set("date_to", endDate.toISOString().substring(0, endDate.toISOString().length - 5));
    } else {
      params.delete("date_to");
    }
    setParams(params);
    dispatch(fetchOrders({ page: currentPage, field, direction, q: params.get("q"), only_active: null, delivery_service: canal.toLowerCase(), status: status.toLowerCase(), date_from: startDate?.toISOString().substring(0, startDate.toISOString().length - 5), date_to: endDate?.toISOString().substring(0, endDate.toISOString().length - 5) }));
    onClose();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Typography variant='h4' fontWeight='600'> Фильтр </Typography>
        <IconButton onClick={onClose}> <CloseIcon /> </IconButton>
      </Box>
      <Label label='Дата' />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Input type='date' value={startDate?.toLocaleDateString('en-CA')} fullWidth onChange={handleChangeStartDate} />
        <Box width="20px" />
        <Input type='date' value={endDate?.toLocaleDateString('en-CA')} fullWidth onChange={handleChangeEndDate} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="40px">
        <Select
          label='Канал'
          value={canal}
          fullWidth
          onChange={handleChangeCanal}
        >
          <MenuItem value="Выбрать канал">Выбрать канал</MenuItem>
          {deliveryList.map(delivery => (
            <MenuItem key={delivery} value={delivery}>{delivery}</MenuItem>
          ))}
        </Select>
        <Box width="20px" />
        <Select
          label='Статус'
          value={status}
          fullWidth
          onChange={handleChangeStatus}
        >
          <MenuItem value="Выбрать Статус">Выбрать Статус</MenuItem>
          {statusList.map((status: string) => (
            <MenuItem key={status} value={status}>{statusTranslations[status as keyof typeof statusTranslations] ? statusTranslations[status as keyof typeof statusTranslations].ru : status}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box display="flex" sx={{ float: "right" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#025F3E", '&:hover': { boxShadow: 'none', backgroundColor: '#07714B' } }}
          onClick={handleClick}>
          Применить
        </Button>
      </Box>
    </Box>
  );
};
