import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { Button, Modal } from '@src/components';
import { createMenuProduct, setAlertModal } from '@src/store/menu/actionCreators';
import { selectCreateProductAlertModal, selectMenuSections } from '@src/store/menu/selector';
import { FORM_MODE } from './types';
import { EditProductForm } from './EditProductForm';
import { ProductImageContainer } from './ProductImageContainer';

interface CreateProductProps { menuID: string };
interface ICreateImageData { [key: string]: string }

export const CreateProduct: React.FC<CreateProductProps> = ({ menuID }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sections = useSelector(selectMenuSections);
  const alertModal = useSelector(selectCreateProductAlertModal);
  const [imageData, setImageData] = React.useState<ICreateImageData>({});

  const setModalOpen = (val: boolean): void => { };
  const handleImageSelected = (base64: string, name: string, res?: string): void => {
    setImageData({ base64_data: base64, image_name: name, imgSrc: res || "" });
  };
  const handleCloseAlertModal = (): void => {
    dispatch(setAlertModal(false));
    navigate(`/app/menu/configure/${params.aggregator}/${menuID}`);
  };
  const handleCloseDrawer = () => navigate(`/app/menu/configure/${params.aggregator}/${menuID}`);
  const handleSubmit = (data: any): void => {
    const body = {
      section_id: data.product.section,
      name: data.product.name[0].Value,
      description: data.product.description[0].Value,
      price: data.product.price[0].Value,
      alcohol: data.alcohol,
      ...imageData
    };

    dispatch(createMenuProduct({ menu_id: menuID, body }));
  };


  return (
    <Box p="20px">
      <ProductImageContainer
        images={[imageData.imgSrc]}
        handleImageSelected={handleImageSelected}
      />
      <EditProductForm
        sections_product={sections}
        attributes={[]}
        default_attributes={[]}
        editUrl=""
        locations={[]}
        onSubmit={handleSubmit}
        setModalOpen={setModalOpen}
        handleCloseDrawer={handleCloseDrawer}
        product={{}}
        formMode={FORM_MODE.CREATE}
      />
      <Modal open={alertModal} handleClose={handleCloseAlertModal}>
        <Box p="10px" textAlign="center">
          <Typography fontSize="18px" mb="35px">
            Новая позиция добавлена,
            необходимо перейти на этап
            сопоставления (мэтчинга)
          </Typography>
          <Button color="success" variant="contained" onClick={handleCloseAlertModal}>Ok</Button>
        </Box>
      </Modal>
    </Box>
  );
};
