import React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DisableProductForm } from "../components/DisableProductForm";
import { selectIsFetching, selectProductStores } from "@src/store/stoplist/selector";
import { disableProduct, getProductStores } from "@src/store/stoplist/reducer";
import { Loader } from "@src/components/Loader/Loader";
import { Modal } from "@src/components";


export const DisableProduct: React.FC = () => {

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productStores = useSelector(selectProductStores);
  const isFetching = useSelector(selectIsFetching);

  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState<{ [key: string]: Set<string> }>({});

  const handleOpen = (): void => setModal(true);

  const handleClose = (): void => setModal(false);

  const onSubmit = (): void => {
    const payload = [];

    for (const item of productStores ?? []) {
      if (state[item.restaurant_id] && state[item.restaurant_id]?.size > 0) {
        const aggregators = item.aggregators.filter((el: any) => state[item.restaurant_id].has(el.delivery_name));
        payload.push({
          store_id: item?.restaurant_id,
          aggregators: aggregators.map((el: any) => ({ name: el.delivery_name, is_active: true }))
        });
      }
    }

    dispatch(disableProduct(params.product_id ?? '', payload, navigate));
    setModal(false);
  };

  React.useEffect(() => {
    dispatch(getProductStores(params.product_id ?? '', true));
  }, []);

  return (
    <Box pt="30px" position="relative">
      {isFetching ? <Loader /> : null}
      <Modal open={modal} handleClose={handleClose} maxWidth={"400"}>
        <Box>
          <Typography fontSize="20px" fontWeight="600" textAlign="center">Отключение блюда</Typography>
          <Typography m="30px 0" fontSize="18px" fontWeight="400" textAlign="center">
            Вы подтверждаете, что
            хотите отключить блюдо?
            Оно останется в списке и
            его можно будет включить
          </Typography>
          <Button fullWidth color="success" variant="contained" size="large" onClick={onSubmit}>
            Отключить
          </Button>
          <Button fullWidth color="onyx" onClick={handleClose}>
            Отмена
          </Button>
        </Box>
      </Modal>

      <DisableProductForm productStores={productStores} state={state} setState={setState} handleOpen={handleOpen} />
    </Box>
  );
};