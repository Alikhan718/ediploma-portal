import React from 'react';
import { Modal } from '@src/components';
import { Drawer as MuiDrawer, Box, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

import { addExistAttributeGroup, clearMenuProductDetail, editMenuProduct, fetchMenuProduct, uploadMenuProductImage } from '@src/store/menu/actionCreators';
import { selecMenuPageLoader, selectAttribute_groups, selectDefaultAttributes, selectLocations, selectMenuProduct, selectPosAttributes, selectPosProduct, selectProductSections } from '@src/store/menu/selector';
import { Loader } from '@src/components/Loader/Loader';
import { AddAggregatorsForm } from './AddAggregatorsForm';
import { EditProductForm } from './EditProductForm';
import { ProductImageContainer } from './ProductImageContainer';
import { FORM_MODE } from './types';
import { selectCurrentLocation } from '@src/store/locations/selector';

interface EditProductProps {
  menuID: string,
  open: boolean,
  navigate?: NavigateFunction
}

export const EditProduct: React.FC<EditProductProps> = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const product = useSelector(selectMenuProduct);
  const sections_product = useSelector(selectProductSections);
  const pos_products = useSelector(selectPosProduct);
  const locations = useSelector(selectLocations);
  const attribute_groups = useSelector(selectAttribute_groups);
  const default_attributes = useSelector(selectDefaultAttributes);
  const pos_attributes = useSelector(selectPosAttributes);
  const loader = useSelector(selecMenuPageLoader);
  const restaurant_id = useSelector(selectCurrentLocation);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [aggregatorModal, setAggregatorModal] = React.useState(false);

  const handleModalClose = (): void => setModalOpen(false);
  const handleCloseDrawer = (): void => {
    navigate(-1);
  };
  const handleAttributeGroup = (attribute_group_id: any): void => {
    dispatch(addExistAttributeGroup({ menu_id: props.menuID, product_id: product.id, attribute_group_id }));
  };
  const handleImageSelected = (base64: string, name: string): void => {
    dispatch(uploadMenuProductImage({
      menu_id: props.menuID,
      body: {
        product_id: params.product_id,
        name, base64_data: base64
      }
    }));
  };


  const getAttributeGroupForRequest = (attribute_groups_props: any) => {

    if (!attribute_groups_props) return null;
    let attribute_group_req = [];
    attribute_group_req = [];
    for (const attribute of attribute_groups) {
      if (attribute_groups_props.includes(attribute.id)) {
        attribute_group_req.push(attribute);
      }
    }
    return attribute_group_req;
  };
  const onSubmit = (data: any): void => {    
    dispatch(editMenuProduct(
      {
        url: params['*']?.split("edit-product/")[0],
        navigate: props.navigate,
        section_name: data.section,
        menu_id: props.menuID,
        product_id: params.product_id,
        body: {
          ...data,
          restaurant_id: restaurant_id
        }
      }));
  };

  React.useEffect(() => {
    const payload = {
      menu_id: props.menuID,
      product_id: params.product_id,
    };
    dispatch(fetchMenuProduct(payload));
    return () => {
      dispatch(clearMenuProductDetail());
    };
  }, []);

  const attributes = React.useMemo(() => {
    if (attribute_groups && product.attribute_groups) {
      const res = attribute_groups.filter((attribute: any) => product.attribute_groups.indexOf(attribute.ExtID) !== -1);
      return res;
    }
    return [];
  }, [attribute_groups, product.attribute_groups]);

  const editUrl = `/app/menu/configure/${params.aggregator}/${props.menuID}/edit-attribute-group/${params.product_id}/attribute_group_id/`;
  return (
    <React.Fragment>
      <Box p='20px' position="relative">
        {loader ? <Loader /> : null}
        <Typography fontSize='1.75em' fontWeight='700'> Изменение позиции </Typography>
        <Box mt='40px' />

        <ProductImageContainer
          images={product.images}
          handleImageSelected={handleImageSelected}
        />

        <EditProductForm
          attributes={attributes}
          pos_products={pos_products}
          product={product}
          default_attributes={default_attributes}
          pos_attributes={pos_attributes}
          sections_product={sections_product}
          locations={locations}
          formMode={FORM_MODE.EDIT}

          editUrl={editUrl}
          setModalOpen={setModalOpen}
          handleCloseDrawer={handleCloseDrawer}
          onSubmit={onSubmit}
        />



        {/*===================================ATRIBUTES FORM========================================================================================= */}
        <Modal maxWidth={500} open={modalOpen} marginLeft="15rem" handleClose={handleModalClose}>
          <Box sx={{ overflowY: "scroll", maxHeight: "500px" }}>
            <AddAggregatorsForm
              menu_id={props.menuID}
              product_id={params.product_id}
              setModalOpen={setModalOpen}
              handleAttributeGroupe={handleAttributeGroup}
            />
          </Box>
        </Modal>
      </Box >
    </React.Fragment >

  );
};
