import React from "react";

import { Box, Typography } from "@mui/material";

import { Button } from "@src/components";
import { ReactComponent as UploadIcon } from '@src/assets/icons/upload.svg';

interface ProductImageContainerProps {
  handleImageSelected: (base64: string, name: string, res?: string) => void;
  images?: string[]
}

export const ProductImageContainer: React.FC<ProductImageContainerProps> = ({ handleImageSelected, images }) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);

  const handleChangeImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      const name = fileUploaded.name;
      let reader = new FileReader();
      reader.readAsDataURL(fileUploaded);
      reader.onload = () => {
        let res = reader.result;
        res = res?.toString() || '';
        handleImageSelected(res.split(',')[1], name, res);
      };
    };
  };
  const handleActiveInput = (): void => {

    inputRef.current
      ? inputRef.current.click()
      : null;
  };
  return (
    <Box display='flex'>
      <img
        src={images?.length ? images[images?.length - 1] : 'src/assets/icons/menu_image.jpeg'}
        alt='menu image'
        style={{ display: 'block', borderRadius: '10px', maxWidth: '150px', width: '100%' }} />

      <Box ml='30px'>
        <Typography
          variant='h4'
          fontWeight='600'>
          Загрузить изображение
        </Typography>

        <Typography
          variant='h3'
          color='text.secondary'
          mt='10px'>
          Поддерживаемы форматы: <b> png, gif, jpeg, jpg </b>
        </Typography>

        <Typography
          variant='h3'
          color='text.secondary'
          mt='5px'
          mb='15px'>
          Максимальный размер: <b> 2 MB </b>
        </Typography>
        <Button
          buttonSize='s'
          startIcon={<UploadIcon />}
          variant='outlined'
          color='onyx'
          onClick={handleActiveInput}
        >
          Выбрать изображение
        </Button>
        <input ref={inputRef} type="file" onChange={handleChangeImg} style={{ display: "none" }} />
      </Box>
    </Box>
  );
};
