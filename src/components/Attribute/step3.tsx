import React, { useState } from "react";
// import Props from "react-select";
import { Box, Chip, CircularProgress, MenuItem, SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAttributeLoader, selectAttributes, selectProducts } from "@src/store/attributes/selectors";
import { Select } from "../Select/Select";

interface Step3Props {
  handleChange: (e: SelectChangeEvent<any>) => void;
  selected_attributes: Array<any>,
  selected_products: Array<any>,
  handleDeleteProduct: (id: string) => void,
  handleDeleteAttribute: (id: string) => void
}


export const Step3: React.FC<Step3Props> = ({ handleChange, selected_attributes, selected_products, handleDeleteAttribute, handleDeleteProduct }) => {

  const attributes = useSelector(selectAttributes);
  const products = useSelector(selectProducts);
  const isFetching = useSelector(selectAttributeLoader);



  if (isFetching) return <CircularProgress />;
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <p style={{ textAlign: "center" }}>Выберите атрибуты в данную категорию</p>
      <Box mb='15px'>
        <Select name="attributes" onChange={handleChange} fullWidth={true} value={'Выберите аттрибута'} >
          <MenuItem disabled value={'Выберите аттрибута'}>Выберите аттрибута</MenuItem>
          <MenuItem value={'all'}>Select all</MenuItem>
          {attributes ? attributes.map((attribute: any, index: number) => (
            <MenuItem key={`${attribute.ext_id}@${index}`} value={attribute}>{attribute.name}</MenuItem>
          )) : null}
        </Select>
        <Box display="flex" mt="10px" flexWrap="wrap">
          {selected_attributes.map((attribute: any, index: number) => (
            <Chip
              key={`${attribute.ext_id}0${index}`}
              onDelete={() => handleDeleteAttribute(attribute.ext_id)}
              label={attribute.name} sx={{ margin: "3px" }} />
          ))}
        </Box>
      </Box>
      <p style={{ textAlign: "center" }}>Или при желании можете выбрать
        в качестве атрибута продукт из меню</p>
      <Box mb='15px'>

        <Select name="products" onChange={handleChange} fullWidth value={'Выберите продукта'}>
          <MenuItem disabled value={'Выберите продукта'}>Выберите продукта</MenuItem>
          {products ? products.map((product, index: number) => (
            <MenuItem key={`${index}#${product.id}`} value={product}>
              <Box display="flex" justifyContent="space-between">
                <Box >{product.name ? product.name[0].Value : ''} </Box>
                <Box >{product.price ? product.price[0].Value : ''} </Box>
              </Box>
            </MenuItem>
          )) : null}
        </Select>
        <Box display="flex" flexWrap='wrap'>
          {selected_products.map((product: any, index: number) => (
            <Chip
              key={`${product.name}${index}`}
              onDelete={() => handleDeleteProduct(product.id)}
              label={product.name[0].Value} sx={{ margin: "3px" }} />
          ))}
        </Box>

      </Box>
    </div>
  );
};
