import React from "react";

import { Alert, Box } from "@mui/material";

import { PublicationCountItemProps } from "../types";
import { useDispatch } from "react-redux";
import { closePublicationCountAlert } from "@src/store/menulist/actionCreators";

export const PublicationCountItem: React.FC<PublicationCountItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);


  const handleCloseAlert = (): void => {
    setOpen(false);
    dispatch(closePublicationCountAlert({ aggregator_name: item.aggregator_name, count: item.count }));

  };

  React.useEffect(() => {
    setOpen(true);
  }, [item]);

  if (!open) {
    return <React.Fragment />;
  }
  return (
    <Box m="10px 0">
      <Alert severity="info" color="success" onClose={handleCloseAlert}>
        Ограничение {item.aggregator_name}: На один стор максимум 5 раз в день можно публиковать меню. Попыток осталось: {item.count}
      </Alert>
    </Box>
  );
};