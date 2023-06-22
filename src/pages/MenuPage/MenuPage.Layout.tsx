import React from 'react';

import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { tableHead } from './generator';
import { IMenuPageLayout } from './types';
import { Button, Modal, Pagination } from '@src/components';
import { MenuTable, MenuHeader } from './components';
import { deleteMenu, publicationMenu } from '@src/store/menulist/actionCreators';
import { Menu, PublictionMenuPayload } from '@src/store/menulist/types';
import { updateAllStopLists } from '@src/store/stoplist/reducer';
import { PublicationCount } from './components/PublicationCount';



export const MenuPageLayout: React.FC<IMenuPageLayout> = (props) => {

	const dispatch = useDispatch();
	const menuId = React.useRef('');
	const [open, setOpen] = React.useState(false);
	const [menus, setMenus] = React.useState<PublictionMenuPayload[]>([]);
	const { menuList, page, page_count, handlePage, handleSort, restaurant_id, available_uploads } = props;


	const publicateMenu = (): void => {
		dispatch(publicationMenu(menus));
		setMenus([]);
	};

	const updateStopList = (): void => {
		dispatch(updateAllStopLists());
	};

	const handleMenuItem = (tr: Menu, e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.checked) {
			setMenus([
				...menus, {
					menu_id: tr.menu_id,
					restaurant_id: restaurant_id,
					delivery_service: tr.delivery
				}
			]);
		} else {
			setMenus(menus.filter((menu) => menu.menu_id !== tr.menu_id));
		}
	};

	const handleDeleteMenu = (): void => {
		if (menuId.current) {
			dispatch(deleteMenu({ menu_id: menuId.current }));
			setOpen(false);
		}
	};

	const handleCloseDeleteMenu = (): void => setOpen(false);

	const handleOpenDeleteMenu = (menu_id: string): void => {
		menuId.current = menu_id;
		setOpen(true);
	};

	return (
		<Box>

			<Modal open={open} handleClose={handleCloseDeleteMenu} maxWidth={400}>

				<Typography textAlign="center" fontSize="20px" fontWeight="600">Удаление меню</Typography>
				<Typography m="30px 0" textAlign="center" fontSize="18px" fontWeight="400">
					Вы уверены, что хотите удалить меню? Все позиции этого меню будут удалены
				</Typography>
				<Button fullWidth color="success" variant="contained" onClick={handleDeleteMenu}>
					Удалить
				</Button>
				<Button fullWidth color="onyx" onClick={handleCloseDeleteMenu}>
					Отмена
				</Button>

			</Modal>

			<MenuHeader publicateMenu={publicateMenu} updateStopList={updateStopList} />

			{/* <PublicationCount /> */}

			<div style={{ marginBottom: '40px' }} />

			{
				menuList.length
					? <MenuTable
						tableHead={tableHead}
						selectedMenus={menus}
						tableBody={menuList}
						handleSort={handleSort}
						handleMenuItem={handleMenuItem}
						onDeleteMenu={handleOpenDeleteMenu}
						available_uploads={available_uploads}
					/>
					: <Typography>Пусто</Typography>
			}

			<div style={{ marginBottom: '40px' }} />
			{page_count > 0 ? <Pagination currentPage={page} maxPage={page_count} onChange={handlePage} /> : null}
		</Box>
	);
};