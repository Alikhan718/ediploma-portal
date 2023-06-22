import React from "react";

import { Box, Chip, Menu, MenuItem, SelectChangeEvent, Typography } from "@mui/material";

import { EditAttributeFormProps } from "./types";
import { Button, HeaderTitle, Select, Input } from "@src/components";
import { AttributeItem } from "./AttributeItem";

export const EditAttributeForm: React.FC<EditAttributeFormProps> = ({ attribute_group, onSubmit }) => {
  const { attribute_group: attribute_groupDetail, pos_product_attributes: attributeProps, pos_products: productsProps, attributes: selectedAttributes } = attribute_group;
  const [form, setForm] = React.useState<any>({});
  const [attributes, setAttributes] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);



  const handleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleMinMax = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };
  const handleProductSelect = (e: SelectChangeEvent<any>): void => {
    setProducts([...products, { ...e.target.value, name: [{ Value: e.target.value.name[0].Value, LanguageCode: "" }] }]);
  };
  const handleAttributeSelect = (e: SelectChangeEvent<any>): void => {
    setAttributes([...attributes, e.target.value]);
  };
  const handleDeleteProduct = (productArg: any): void => {
    setProducts(products.filter(product => product.id !== productArg.id));
  };
  const handleDeleteAttribute = (id: string): void => {
    setAttributes(attributes.filter(item => item.ext_id !== id));
  };
  const handleSubmitAttributeItem = (id: string, name: string, isDefault: boolean): void => {

    setAttributes(attributes.map(item => {
      if (item.ext_id === id) {
        return { ...item, name: name, Default: isDefault };
      }
      return item;
    }));
  };

  const doesExistId = (id: string, array: Array<any>): boolean => {
    for (const elem of array) {
      if (elem.id === id) {
        return true;
      }
    }
    return false;
  };

  const doesExistExtId = (id: string, array: Array<any>): boolean => {
    for (const elem of array) {
      if (elem.ext_id === id) {
        return true;
      }
    }
    return false;
  };

  const isExistInAttribute = (id: string): boolean => {
    for (const attribute of attributeProps) {
      if (attribute.ext_id === id) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { attribute_group_new_name, ...rest } = form;
    const body = {
      ...rest,
      name: form?.name,
      attributes,
      products
    };
    onSubmit(body);
  };


  React.useEffect(() => {
    setForm({
      name: attribute_groupDetail?.name || ' ',
      min: attribute_groupDetail?.min || 0,
      max: attribute_groupDetail?.max || 0
    });
    if (attributeProps) {
      setAttributes(attribute_groupDetail.attributes
        ? selectedAttributes.filter((at: any) => attribute_groupDetail.attributes.includes(at.ext_id) && isExistInAttribute(at.ext_id))
        : []);
    }
    if (productsProps) {
      setProducts(attribute_groupDetail.attributes
        ? productsProps.filter((prod: any) => attribute_groupDetail.attributes.includes(prod.id))
        : []);
    }
  }, [attribute_group]);



  return (

    <form style={{ position: "relative" }} onSubmit={handleSubmit}>
      <Box mt="40px">
        <Typography mb="10px" fontWeight="600" fontSize="20px" lineHeight="24px">1. Напишите название группы</Typography>
        <Input name="name" value={form?.name} onChange={handleName} label="Название группы аттрибутов" fullWidth />
      </Box>

      <Box mt="40px">
        {/* ATTRIBUTES */}
        <Typography mb="10px" fontWeight="600" fontSize="20px" lineHeight="24px">2. Добавьте аттрибуты в группу</Typography>
        <Select fullWidth value={0} onChange={handleAttributeSelect}>
          <MenuItem value={0}>Выберите аттрибуты</MenuItem>
          {attributeProps ? attributeProps.filter((attribute: any) => !doesExistExtId(attribute.ext_id, attributes)).map((attribute: any, index: number) => (
            <MenuItem key={attribute.ext_id} value={attribute}>{attribute.name}</MenuItem>
          )) : null}
        </Select><Box mb="10px" />
        {/* SELECTED ATTRIUBUTES*/}

        {attributes ? attributes.map((atr: any, index: number) => (
          <AttributeItem
            key={atr.ext_id}
            attribute={atr}
            onDelete={handleDeleteAttribute}
            onSubmit={handleSubmitAttributeItem} />
        )) : null}
      </Box>

      {/* PRODUCTS */}
      <Box mt="40px">
        <Typography mb="10px" fontWeight="600" fontSize="20px" lineHeight="24px">
          3. Выберите в качестве аттрибута продукт из меню (необязательно)
        </Typography>
        <Select fullWidth value={1} onChange={handleProductSelect}>
          <MenuItem value={1}>Выберите продукт (необязательно)</MenuItem>
          {productsProps
            ? productsProps.filter((product:any) => !doesExistId(product.id, products)).map((product: any, index: number) => {
              return <MenuItem key={`${product.id}+${index}`} value={product}>{product.name[0].Value}</MenuItem>;
            })
            : null}
        </Select><Box mb="10px" />

        {products ? products.map((prod: any, index: number) => (
          <Chip key={`${prod.id}_${index}`} label={prod.name[0].Value} onDelete={() => handleDeleteProduct(prod)} style={{ marginRight: '5px', marginTop: '5px' }} />
        )) : null}

      </Box>

      <Box mt="40px">
        <Typography mb="15px" fontWeight="600" fontSize="20px" lineHeight="24px">4. Укажите количество товаров</Typography>
        <Typography mb="20px" fontWeight="400" fontSize="18px" lineHeight="25px">
          Укажите, какое минимальное и максимальное
          количество товаров может выбрать пользователь в этой группе
        </Typography>
        <Box width="50%" display="flex" justifyContent="space-between">
          <Input name="min" value={form.min} type="number" onChange={handleMinMax} label="Минимум" sx={{ width: '47%' }} />
          <Input name="max" value={form.max} type="number" onChange={handleMinMax} label="Максимум" sx={{ width: '47%' }} />
        </Box>
        <Typography mt="20px" fontWeight="400" fontSize="16px" lineHeight="19px" color="#656665">
          Например: минимум 1, максимум 2.<br />
          Это значит, что пользователь должен выбрать
          минимум 1 атрибут для заказа и максимум 2 атрибута
        </Typography>
      </Box>
      <Box height="140px" width="100%" />
      <Box position="absolute" bottom="10px" right="0px">
        <Button>Отменить</Button>
        <Button type="submit" variant="contained">Сохранить</Button>
      </Box>
    </form>
  );
};

