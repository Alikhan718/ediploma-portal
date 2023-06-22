import React from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input, Button } from '@src/components';
import { routes } from '@src/shared/routes';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as AddIcon } from '@src/assets/icons/add.svg';
import { ReactComponent as RefreshWhiteIcon } from '@src/assets/icons/refreshWhite.svg';
import { ReactComponent as RefreshIcon } from '@src/assets/icons/refresh.svg';
import PublicationIcon from '@src/assets/icons/publicationIcon.png';
import { updateMenu } from '@src/store/menulist/actionCreators';
import { roles } from "@src/shared/roles";

interface MenuHeaderProps {
	publicateMenu: () => void;
	updateStopList: () => void
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ publicateMenu, updateStopList }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();


	const handlePublickMenu = (): void => publicateMenu();
	const goToCreatePage = (): void => navigate(routes.uploadMenu);
	const handleUpdateMenu = (): void => {
		dispatch(updateMenu());
	};
	const hasPermission = (roleList: string[]) => {
		const userRoles = JSON.parse(localStorage.getItem("userRole") || '[]') || "";
		if (!userRoles) {
			return false;
		}
		return userRoles.some((i: any) => roleList.includes(i));
	};
	return (
		<Box display='flex' alignItems='center' justifyContent='space-between'>
			<Typography fontSize='1.75em' noWrap fontWeight='700'> Меню </Typography>
			<Box display='flex' alignItems='center'>
				{/*<Input inputSize='m' placeholder='Поиск' endAdornment={<SearchIcon />} />*/}
				{hasPermission(roles.uploadMenu) &&
					<Button
						variant='contained'
						buttonSize='m'
						sx={{ ml: '10px' }}
						color="neutral"
						onClick={handleUpdateMenu}
						startIcon={<RefreshIcon />}>
						Обновить меню
					</Button>
				}
				{hasPermission(roles.publicationMenu) &&
					<Button
						sx={{ m: "0 20px" }}
						variant="outlined"
						buttonSize='m'
						color="success"
						onClick={handlePublickMenu}
						startIcon={<img src={PublicationIcon} alt="" />}
					>
						Опубликовать меню
					</Button>
				}
				{hasPermission(roles.createMenuSuccess) &&
					<Button
						variant='contained'
						buttonSize='m'
						onClick={goToCreatePage}
						startIcon={<AddIcon />}
						sx={{ backgroundColor: "#025F3E", '&:hover': { boxShadow: 'none', backgroundColor: '#07714B' }, m: "0 20px" }}>
						Создать меню
					</Button>
				}
				{hasPermission(roles.createMenuSuccess) &&
					<Button
						variant='contained'
						color="warning"
						buttonSize='m'
						sx={{ backgroundColor: '#FFAE3B', '&:hover': { backgroundColor: '#FFAE3B' }}}
						onClick={updateStopList}
						startIcon={<RefreshWhiteIcon />}>
						Обновить стоп-листы
					</Button>
				}
			</Box>


		</Box>
	);
};
