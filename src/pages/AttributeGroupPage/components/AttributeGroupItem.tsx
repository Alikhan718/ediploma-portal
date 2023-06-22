import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Collapse, Divider, Typography, } from "@mui/material";

import { Button, ToolTip } from "@src/components";
import { ReactComponent as EditIcon } from '@src/assets/icons/edit.svg';
import DeleteIcon from '@src/assets/icons/delete_outline.svg';
import plus from '@src/assets/icons/plus.png';
import { ReactComponent as ArrowDown } from '@src/assets/icons/arrowDown.svg';
import { ReactComponent as RedToolTip } from '@src/assets/icons/tooltip_red.svg';
import GreenToolTip from '@src/assets/icons/tooltipGreen.png';
import styles from "./AttributeGroupItem.module.css";
import { useTypedSelector } from "@src/hooks/useTypedSelector";
import {fetchAttributeGroupProducts, updateAttributeGroup} from "@src/store/attributes/actionCreators";
import { MenuDrawMode } from "@src/pages/ConfigureMenuPage/types";

interface LocationTableItemProps {
  tr: any,
  // editButtonClick: (restaurant_id: string) => void
  setDrawer: (val: MenuDrawMode) => void;
  handleDeleteAttributeGroup: (resti_id: string) => void,
}

export const AttributeGroupItem: React.FC<LocationTableItemProps> = ({ tr, setDrawer }) => {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isFetching, attribute_products } = useTypedSelector(state => state.attributes);

  const [open, setOpen] = useState(false);
  tr.min = tr.min ?? 0;
  tr.max = tr.max ?? 0;
  const handleEdit = React.useCallback((product_id: string): void => {
    setDrawer(MenuDrawMode.OPEN);
    navigate(`${tr.ext_id}/edit-product/${product_id}`);
  }, []);

  const handleEditButton = (): void => {

  };
  const handleDropDown = (): void => {
    setOpen(!open);
  };
  const handleDelete = (): void => {
    const payload = {
      menu_id: params.menu_id,
      attribute_group_id: tr.ext_id,
      body: {
        IsDeleted: !tr.IsDeleted ?? true
      }
    };
    dispatch(updateAttributeGroup(payload));
  };
  React.useEffect(() => {
    if (attribute_products[tr.ext_id] == null && open) {
      const payload = {
        menu_id: params.menu_id,
        attribute_group_id: tr.ext_id
      };
      dispatch(fetchAttributeGroupProducts(payload));
    }
  }, [open]);
  return (
    <Box>

      <Box my="1rem" display="flex" justifyContent="space-between" flexDirection="row" gap="1rem" style={{
        filter: tr.IsDeleted ? "grayscale(100%)" : "",
        opacity: tr.IsDeleted ? "0.5" : "1"
      }}>
        <Box minWidth="40%" width="50%" alignSelf="center" >
          <Box width="95%">

            <Typography display="flex" alignItems="center" variant='h4' fontWeight='600' mb=".5rem">
              {tr.name}
              <ToolTip
                style={{ marginLeft: ".3rem" }}
                placement="top"
                textColor={!tr.min ? "#025F3E" : "#AB353F"}
                title={!tr.min
                  ? "НЕТ обязательных атрибут групп (с min >= 1)"
                  : "ЕСТЬ обязательных атрибут групп (с min >= 1)"}>
                {!tr.min ? <img src={GreenToolTip} /> : <RedToolTip />}
              </ToolTip>
            </Typography>
            <Typography variant='h3' fontWeight='400'>
              {tr.attribute_object && tr.attribute_object.map((item: any) => (item.name + ", "))}
            </Typography>

          </Box>

        </Box>

        <Box width="15%" display="flex" justifyContent="left" flexWrap="wrap" flexDirection="row">
          <Box minWidth="50%" alignSelf="center" display="block" >
            <Typography display="flex" alignItems="start" variant='h4' fontWeight='600'>
              Min={tr.min}
            </Typography>
          </Box>
          <Box minWidth="50%" alignSelf="center" display="block" >
            <Typography display="flex" alignItems="start" variant='h4' fontWeight='600'>
              Max={tr.max}
            </Typography>
          </Box>
        </Box>

        <Box minWidth="30%" alignSelf="center">
          <Box display="flex" justifyContent="start" flexWrap="wrap" flexDirection="row" gap=".5rem">
            <Button
              variant="outlined"
              style={{ alignSelf: "end", minWidth: "50%" }}
              startIcon={<EditIcon />}
              onClick={() => handleEditButton()}
              buttonSize='m'
            >
              Изменить
            </Button>
            <Button
              variant="text"
              color="onyx"
              style={{ alignSelf: "center", width: "2rem !important" }}
              onClick={handleDropDown}
              buttonSize='m'
            >
              <Box sx={{ transition: "all .3s ease" }} className={open ? styles.arrowIcon : styles.arrowDown}><ArrowDown /></Box>
            </Button>
            <Button
              variant="text"
              color="onyx"
              onClick={handleDelete}
              buttonSize='m'
            >
              <img src={tr.IsDeleted ? plus : DeleteIcon} alt="icon" />
            </Button>
          </Box>

        </Box>

      </Box>
      <Divider />
      <Collapse in={open} className={styles.showBox}>
        {isFetching && !attribute_products[tr.ext_id] && <Box p="1rem" alignItems="center" display="flex" justifyContent="center"><CircularProgress /></Box>}

        <Box display={isFetching && !attribute_products[tr.ext_id] ? "none" : "flex"} className={styles.detailsBox} >
          {attribute_products[tr.ext_id] && attribute_products[tr.ext_id].map((product: any) => (
            <Button
              key={product.id + "button"}
              variant="text"
              onClick={() => handleEdit(product.id)}
              buttonSize='s'
            >
              <Typography key={product.id} display="flex" alignItems="center" color="green" variant='h4' fontWeight='600'>
                {product.name[0].Value}
              </Typography>
            </Button>
          ))}
          {attribute_products[tr.ext_id] && !attribute_products[tr.ext_id].length && <Typography display="flex" alignItems="center" color="green" variant='h4'>
            Нет продуктов связанных с этой аттрибут группой
          </Typography>}

        </Box>
        <Divider />
      </Collapse>

    </Box>

  );
};
