import React from "react";

import { Box, Typography } from "@mui/material";
// import { Button } from "@src/components";
import { AddressItem } from "./components/AddressItem";
import { OrderItem } from "./components/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCallCenterLocations, selectInProccessOrders, selectNewOrders } from "@src/store/callcenter/selector";
import { CALL_CENTER_ORDER_STATUS, ICallCenterLocation, ICallCenterOrder } from "@src/store/callcenter/types";
import { postOrderToLocation, putCallCenterOrders } from "@src/store/callcenter/actionCreators";
import { Button, Modal } from "@src/components";

export const CallCenterLayout: React.FC = () => {
  const dispatch = useDispatch();
  const new_orders = useSelector(selectNewOrders);
  const in_proccess_orders = useSelector(selectInProccessOrders);
  const locations = useSelector(selectCallCenterLocations);

  const [open, setOpen] = React.useState(false);
  const [currOrder, setCurrOrder] = React.useState<ICallCenterOrder | null>();
  const [currLocation, setCurrLocation] = React.useState<ICallCenterLocation>();


  const handleCloseModal = (): void => setOpen(false);
  // DRAG & DROP ORDER => LOCATION
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: ICallCenterOrder): void => {
    // @ts-ignore
    e.target.style.border = "3px solid green";
    setCurrOrder(item);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
    // @ts-ignore
    e.target.style = "none";
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    // @ts-ignore
    e.target.style.background = "#025F3E";
    // @ts-ignore
    e.target.style.color = "#FFF";
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    // @ts-ignore
    e.target.style.background = "#FFF";
    // @ts-ignore
    e.target.style.color = "#333";

  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, location: ICallCenterLocation): void => {
    // @ts-ignore
    e.target.style.background = "#FFF";
    // @ts-ignore
    e.target.style.color = "#333";
    setOpen(true);
    setCurrLocation(location);
  };

  // ORDERS 
  const handleOrdersDragOver = (e: React.DragEvent<HTMLDivElement>): void => e.preventDefault();
  const handleOrdersDragLeave = (e: React.DragEvent<HTMLDivElement>): void => e.preventDefault();
  const handleDropToOrders = (e: React.DragEvent<HTMLDivElement>, status: CALL_CENTER_ORDER_STATUS): void => {
    if (currOrder?.status !== status) {
      dispatch(putCallCenterOrders({ order_id: currOrder?.id, status }));
    }
  };
  const handleSubmitModal = (): void => {
    dispatch(postOrderToLocation({ restaurant_id: currLocation?.id, order_id: currOrder?.id }));
  };

  return (
    <React.Fragment>
      <Modal open={open} handleClose={handleCloseModal} maxWidth={444}>
        <React.Fragment>
          <Typography textAlign="center" fontSize="20px" fontWeight="700" mb="18px">
            ID {currOrder?.order_code}
          </Typography>
          <Typography textAlign="start" fontSize="20px" mb="35px">
            Адрес доставки: {currOrder?.delivery_address}
          </Typography>
          <Typography textAlign="start" fontSize="20px" fontWeight="700" mb="18px">
            Ресторан {currLocation?.name}
          </Typography>
          <Box display="flex" justifyContent="center" mt="30px">
            <Button buttonSize="m" onClick={handleCloseModal}>Отмена</Button>
            <Button buttonSize="m" color="success" variant="contained" onClick={handleSubmitModal}>
              Подтвердить
            </Button>
          </Box>
        </React.Fragment>
      </Modal>
      <Box display="flex" justifyContent="space-between" >
        {/* new orders */}
        <Box
          width="46%"
          id="BOX"
          onDragOver={handleOrdersDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDropToOrders(e, CALL_CENTER_ORDER_STATUS.NEW)}>
          <Box bgcolor="#F2F5FE" width="100%" borderRadius="10px" mb="25px" p="8px 20px">
            <Typography color="#4D77FB" fontWeight="600" fontSize="20px">Новые заказы</Typography>
          </Box>
          <div>
            {new_orders.map(el => (
              <OrderItem
                key={el.id}
                order={el}
                borderColor="#4D77FB"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </Box>
        <div>

        </div>
        {/* in process */}
        <Box
          width="46%"
          id="BOX"
          onDragOver={handleOrdersDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDropToOrders(e, CALL_CENTER_ORDER_STATUS.PROCESSING)}
        >
          <Box bgcolor="#FEF7F1" width="100%" borderRadius="10px" mb="25px" p="8px 20px">
            <Typography color="#FCAF58" fontWeight="600" fontSize="20px">В обработке</Typography>
          </Box>
          <div>
            {in_proccess_orders.map(el => (
              <OrderItem
                key={el.id}
                order={el}
                borderColor="#FFAE3B"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </Box>

      </Box >

      <Box
        width="100%"
        p="28px 21px"
        position="sticky"
        bottom="0"
        right="0"
        left="0"
        borderRadius="15px"
        bgcolor="#E8E8E9"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        {locations.map(el => (
          <AddressItem
            key={el.id}
            location={el}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        ))}

      </Box>
      {/* BOTTOM  */}

    </React.Fragment >
  );
};