import React from "react";

import { Box, Typography } from "@mui/material";
import { ICallCenterOrder } from "@src/store/callcenter/types";

interface OrderItemProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: any) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  borderColor: string,
  order: ICallCenterOrder
}

export const OrderItem: React.FC<OrderItemProps> = ({ onDragStart, onDragEnd, borderColor, order }) => {

  const [timer, setTimer] = React.useState(Number((Date.now() - order.order_time * 1000) / 1000));

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  let ss = ('0' + Math.floor(timer % 60)).slice(-2);
  let mm = Math.floor(timer / 60);
  return (
    <Box
      width="100%"
      height="auto"
      mb="25px"
      p="27px 20px"
      draggable
      display="flex"
      justifyContent="space-between"
      alignItems="start"
      border={`3px solid ${borderColor}`}
      borderRadius="10px"
      onDragStart={(e) => onDragStart(e, order)}
      onDragEnd={onDragEnd}
    >
      <Box width="70%">
        <Typography fontSize="20px" fontWeight="700">ID {order.order_code}</Typography>
        <Typography >
          Адрес доставки: {order.delivery_address}
        </Typography>
      </Box>
      <Box width="28%" mr="10px" display="flex" justifyContent="end">
        <Typography fontSize="32px" fontWeight="600" textAlign="right"  >
          {mm} :
        </Typography>
        <Typography width="12%" fontSize="32px" fontWeight="600" textAlign="right" ml="5px">
          {ss}
        </Typography>


      </Box>
    </Box >
  );
};