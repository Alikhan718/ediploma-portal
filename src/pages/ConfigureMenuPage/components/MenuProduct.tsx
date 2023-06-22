import React from "react";

import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import { Button, Modal, ToolTip } from "@src/components";
import { ReactComponent as EditIcon } from "@src/assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "@src/assets/icons/delete_outline.svg";
import { ReactComponent as AlertYellowIcon } from "@src/assets/icons/alertYellow.svg";
import { ReactComponent as AlertRedIcon } from "@src/assets/icons/alertRed.svg";
import AddIcon from "@src/assets/icons/plus.png";
import { selectPosProductMatching } from "@src/store/menu/selector";
import GreenToolTip from '@src/assets/icons/tooltipGreen.png';
import { ReactComponent as RedToolTip } from '@src/assets/icons/tooltip_red.svg';


interface IMenuProduct {
  menuProduct: any,
  // posProducts: any[],
  handleEdit: (product_id: string) => void
  handleDelete?: (product_id: string, is_deleted: boolean) => void
}

const MemoMenuProduct: React.FC<IMenuProduct> = ({ menuProduct, handleEdit, handleDelete }) => {
  const posProducts = useSelector(selectPosProductMatching);
  const [open, setOpen] = React.useState(false);


  const handleClickEdit = (): void => handleEdit(menuProduct.id);

  const handleCloseModal = (): void => setOpen(false);

  const handleOpenModal = (): void => {
    if (menuProduct.is_deleted) {
      handleDelete && handleDelete(menuProduct.id, menuProduct.is_deleted ?? false);
    } else {
      setOpen(true);
    }
  };

  const handleClickDelete = (): void => {
    handleDelete && handleDelete(menuProduct.id, menuProduct.is_deleted ?? false);
    setOpen(false);
  };

  const formatedPrice = (price: number): string => {
    return price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }

  const matchedPosProduct = posProducts.find((item: any) => item.product_ext_id === menuProduct.id);

  const isMatchedCorrect = matchedPosProduct
    ? matchedPosProduct.price !== menuProduct.price[0].Value
      ? <ToolTip title="Заметчено неправильно" textColor="#C17303" placement="top" arrow >
        <AlertYellowIcon />
      </ToolTip>
      : null : null;

  const hasModifier = matchedPosProduct ? matchedPosProduct.has_attribute ?
    <ToolTip title="Есть модификатор в атрибутах" textColor="#AB353F" placement="top" arrow>
      <AlertRedIcon style={{ position: "absolute", top: "-30%", right: "-8%" }} />
    </ToolTip>
    : null : null;

  const imgURL = menuProduct.images ? menuProduct.images.length ? menuProduct.images[0] : "" : "";
  return (
    <Box
      style={{
        filter: menuProduct.is_deleted ? "grayscale(100%)" : "",
        opacity: menuProduct.is_deleted ? "0.5" : "1"
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 0"
      borderBottom='1px solid #E8E8E9'
    >

      <Modal open={open} handleClose={handleCloseModal} maxWidth={400}>
        <Typography textAlign="center" fontSize="20px" fontWeight="600" >Удаление блюда</Typography>
        <Typography textAlign="center" fontSize="18px" fontWeight="400" m="30px 0">
          Вы подтверждаете, что
          хотите удалить блюдо? Оно останется
          в списке и его можно будет восстановить
        </Typography>
        <Button fullWidth color="success" variant="contained" onClick={handleClickDelete}>Удалить</Button>
        <Button fullWidth color="onyx" onClick={handleCloseModal}>Отмена</Button>
      </Modal>

      <Box width="50%" display="flex" alignItems="start" borderRight='1px solid #E8E8E9'>
        <img style={{
          borderRadius: '10px',
          marginRight: '10px',
        }}
          height="80px"
          width="80px"
          src={imgURL}
        />

        <Box>
          <Typography display="flex" alignItems="center" variant='h4' fontWeight='600' mt='1rem'>
            {menuProduct?.name?.[0].Value}
            <ToolTip
              style={{ paddingLeft: '5px' }}
              arrow
              placement="top"
              textColor={menuProduct.has_required_attributes ? "#AB353F" : "#025F3E"}
              title={menuProduct.has_required_attributes
                ? "ЕСТЬ обязательные атрибут группы (с min >= 1)"
                : "НЕТ обязательных атрибут групп (с min >= 1)"}>
              {menuProduct.has_required_attributes ? <RedToolTip /> : <img src={GreenToolTip} />}
            </ToolTip>
          </Typography>
          <Typography variant='h3' fontWeight='400'>
            {menuProduct.description ? menuProduct.description[0].Value : ""}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems='center' justifyContent='center' flexDirection="column" width="20%" borderRight='1px solid #E8E8E9'>
        <Typography fontWeight="600" fontSize="18px" mb="10px">Цена</Typography>
        <Typography display="flex" alignItems="center" fontWeight="400" fontSize="18px" ml='10px'>
          {formatedPrice(menuProduct.price[0].Value)} {menuProduct.price[0].CurrencyCode} {isMatchedCorrect}
        </Typography>

      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection='row' gap={"1rem"} width="40%" paddingLeft='20px'>

        <Button variant="outlined" startIcon={<EditIcon />} onClick={handleClickEdit}>
          Изменить
          {hasModifier}
        </Button>

        <Button variant="text" style={{ padding: "0", minWidth: "3rem" }} onClick={handleOpenModal}> {menuProduct.is_deleted ?
          <img src={AddIcon} alt="" /> : <DeleteIcon />} </Button>

      </Box>
    </Box>
  );
};

export const MenuProduct = React.memo(MemoMenuProduct);
