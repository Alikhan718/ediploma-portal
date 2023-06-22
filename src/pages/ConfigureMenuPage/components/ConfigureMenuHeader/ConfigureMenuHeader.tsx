import React from "react";


import cn from "classnames";
import { useDispatch } from "react-redux";
import { Box, MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


import { HeaderTitle, Button, Input, Select, Modal } from "@src/components";
import { ReactComponent as SearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as PlusIcon } from '@src/assets/icons/plus.svg';
import { menu_routes, routes } from "@src/shared/routes";
import { IConfigureMenuHeader, MenuDrawMode } from "../../types";
import styles from './ConfigureMenuHeader.module.css';
import { roles } from "@src/shared/roles";
import { MenuActions } from "../../generator";
import { deleteMenu } from "@src/store/menulist/actionCreators";

const hasPermission = (roleList: string[]) => {
  const userRoles = JSON.parse(localStorage.getItem("userRole") || '[]') || "";
  if (!userRoles) {
    return false;
  }
  return userRoles.some((i: any) => roleList.includes(i));
};

export const ConfigureMenuHeader: React.FC<IConfigureMenuHeader> = (props) => {
  const { menuID, setDrawer, handleValidateMenu, onSearch } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteMenuModal, setDeleteMenuModal] = React.useState(false);


  const handleEditMenu = (): void => {
    setDrawer(MenuDrawMode.OPEN);
    navigate(menu_routes.edit);
  };
  const handleCreateProduct = (): void => {
    setDrawer(MenuDrawMode.OPEN);
    navigate(menu_routes.create_product);
  };
  const handleSearch = (event: any): void => {
    let search_name: string = event.target.value.trim();
    if (search_name.length > 3) {
      onSearch(1, search_name);
    } else if (!search_name.length) {
      onSearch(1, '');
    }
  };
  const handleChangeMenuAction = (e: SelectChangeEvent<any>): void => {
    if (e.target.value === MenuActions.EDIT_ATTRIBUTE_GROUP) {
      navigate(`/app/menu/configure/${menuID}/attribute-group`);
    } else if (e.target.value === MenuActions.EDIT_MENU) {
      handleEditMenu();
    } else if (e.target.value === MenuActions.DELETE_MENU) {
      setDeleteMenuModal(true);
    }
  };

  const handleCloseDeleteMenu = (): void => setDeleteMenuModal(false);

  const handleDeleteMenu = (): void => {
    dispatch(deleteMenu({ menu_id: menuID }));
    navigate("/app/menu");
  };

  return (
    <Box className={styles.header}>
      <Box className={styles.headerInner}>
        <HeaderTitle
          title="Редактирование меню"
          backTo={routes.menu}
        />
      </Box>
      <Box className={styles.items}>
        <Box className={cn(styles.searchContainer, styles.item)}>
          <Input placeholder='Поиск' inputSize='m' onChange={handleSearch} endAdornment={<SearchIcon />} />
        </Box>

        {hasPermission(roles.menu_advanced)
          && <>
            <Button
              className={cn(styles.btnEdit, styles.item)}
              buttonSize="m"
              variant="contained"
              color="warning"
              onClick={handleValidateMenu}
              sx={{ backgroundColor: '#FFAE3B', '&:hover': { backgroundColor: '#FFAE3B' } }}
            >Проверить меню
            </Button>
            <Button
              className={cn(styles.btnEdit, styles.item)}
              buttonSize="m"
              variant="contained"
              color="success"
              onClick={handleCreateProduct}
              sx={{ backgroundColor: "#025F3E", '&:hover': { boxShadow: 'none', backgroundColor: '#07714B' } }}
            ><PlusIcon style={{ marginRight: '5px' }} /> Добавить блюдо
            </Button>


            <Select sx={{ height: "50px" }} value={0} onChange={handleChangeMenuAction} size="medium" >
              <MenuItem key={1} value={0}>Действия с меню</MenuItem>

              <MenuItem key={MenuActions.EDIT_MENU} value={MenuActions.EDIT_MENU}>{MenuActions.EDIT_MENU}</MenuItem>
              <MenuItem key={MenuActions.EDIT_ATTRIBUTE_GROUP} value={MenuActions.EDIT_ATTRIBUTE_GROUP}>{MenuActions.EDIT_ATTRIBUTE_GROUP}</MenuItem>
              <MenuItem key={MenuActions.EDIT_ATTRIBUTE} value={MenuActions.EDIT_ATTRIBUTE}>{MenuActions.EDIT_ATTRIBUTE}</MenuItem>
              <MenuItem key={MenuActions.DELETE_MENU} value={MenuActions.DELETE_MENU}>{MenuActions.DELETE_MENU}</MenuItem>

            </Select>
          </>
        }
        <Modal open={deleteMenuModal} handleClose={handleCloseDeleteMenu} maxWidth={400}>
          <Box>
            <Typography textAlign="center" fontSize="20px" fontWeight="600">Удаление блюда</Typography>

            <Typography textAlign="center" m="30px 0" fontSize="14px" fontWeight="400">
              Вы подтверждаете, что хотите удалить блюдо?
              Оно останется в списке и его можно будет восстановить
            </Typography>

            <Button fullWidth color="success" variant="contained" onClick={handleDeleteMenu}>
              Удалить
            </Button>
            <Button fullWidth color="onyx" onClick={handleCloseDeleteMenu}>
              Отмена
            </Button>
          </Box>
        </Modal>


      </Box>
    </Box>
  );
};
