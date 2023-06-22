import React from "react";

import { Box, LinearProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, HeaderTitle } from "@src/components";
import { enableProduct, getProductStores } from "@src/store/stoplist/reducer";
import { selectIsFetching, selectProductStores } from "@src/store/stoplist/selector";
import { LocationsListForm } from "../components/LocationsListForm";
import { Loader } from "@src/components/Loader/Loader";

export const EnableProduct: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productStores = useSelector(selectProductStores);
  const isFetching = useSelector(selectIsFetching);

  const [state, setState] = React.useState<{ [key: string]: Set<string> }>({});


  const onSubmit = (): void => {
    const payload = [];


    for (const item of productStores ?? []) {
      if (state[item.restaurant_id] && state[item.restaurant_id]?.size > 0) {
        const aggregators = item.aggregators.filter((el: any) => state[item.restaurant_id].has(el.delivery_name))

        payload.push({
          store_id: item?.restaurant_id,
          aggregators: aggregators.map((el: any) => ({ name: el.delivery_name, is_active: true }))
        });
      }
    }

    dispatch(enableProduct(params.product_id ?? '', payload, navigate));
  };

  React.useEffect(() => {
    dispatch(getProductStores(params.product_id ?? '', false));
  }, []);
  return (
    <Box position="relative" pt="30px">
      {isFetching ? <Loader /> : null}

      <HeaderTitle
        title="Запустить продукт"
        backTo="/app/stopLists"
      />
      <Box mb="40px" />
      <Typography mb="15px" fontSize="20px" fontWeight="600">Применить изменение позиции на следующих точках:</Typography>
      <Typography fontSize="20px" fontWeight="400">
        Уберите галочку с точек с которых хотите снять продукт со стоп- листа
      </Typography>
      <LocationsListForm state={state} setState={setState} productStores={productStores} />
      <Box width="100%" height="100px" />
      <Box position="absolute" bottom="0" right="0">
        <Button color="neutral">Отменить</Button>
        <Button variant="contained" color="success" size="large" onClick={onSubmit}>Запустить</Button>
      </Box>
    </Box >
  );
};