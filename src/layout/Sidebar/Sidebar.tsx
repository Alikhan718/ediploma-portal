import React, { useState } from 'react';
import {
	Drawer,
	styled,
	Theme,
	CSSObject,
	DrawerProps,
	Box,
	Typography,
	CircularProgress, Divider
} from '@mui/material';

import { Button, Input, Modal } from '@src/components';
import AppLogo from '@src/assets/icons/app-logo.svg';
import LogoutIcon from '@src/assets/icons/out.png';
import Menu from '@src/assets/example/Menu.svg';
import { SidebarProps } from './Sidebar.props';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { selectAuthLoader, selectUserRole } from '@src/store/auth/selector';
import { useSelector } from 'react-redux';
import { privateNavigations } from "@src/layout/Header/generator";
import { DRAWER_WIDTH } from '../Layout';
import { routes } from "@src/shared/routes";
import { fetchAuthLogout } from "@src/store/auth/saga";
import icon from "@src/assets/icons/Logo (2).svg";


interface ICustomDrawer extends DrawerProps {
	open: boolean;
}

const drawerMixin = (theme: Theme, open: boolean): CSSObject => ({
	overflowX: 'hidden',
	borderRadius: "0 2rem 2rem 0",
	boxShadow: "-8rem 0 10rem",
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		...(open ? {
			duration: theme.transitions.duration.enteringScreen,
		} : {
			duration: theme.transitions.duration.leavingScreen,
		})
	}),
	...(open ? {
		width: DRAWER_WIDTH,
	} : {
		width: `0px`,
		left: "-1px",
	})
});

const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<ICustomDrawer>(
	({ theme, open }) => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: DRAWER_WIDTH,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		zIndex: '999999',
		boxShadow: 'unset',
		height: '10%',
		...{
			...drawerMixin(theme, open),
			'& .MuiDrawer-paper': {
				...drawerMixin(theme, open),
				backgroundColor: 'white'
			},
		}
	}),
);

const role = localStorage.getItem("userRole")
console.log(privateNavigations, "asfdasdf");

export const AppSidebar: React.FC<SidebarProps> = (props): JSX.Element => {
	const location = useLocation();
	console.log('pathname', location.pathname);
	const { open, toggleDrawer } = props;
	const navigate = useNavigate();
	const authLoader = useSelector(selectAuthLoader);

	const [activeNav, setActiveNav] = React.useState(0);

	const handleClassName = (isActive: boolean, id: number): string | undefined => {
		isActive && setActiveNav(id);
		return "";
	};

	const onSignOut = (): void => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("currLocation");
	};

	const [isSidebarVisible, setIsSidebarVisible] = useState(true);



	return (
		<>
			{isSidebarVisible && (
				<CustomDrawer variant="permanent" open={isSidebarVisible}>
					{!authLoader ? (
						<Box sx={{ height: '100vh' }}>
							<Box p={`1.5rem 0 0 10px`} sx={{ height: '100%' }}>
								<img src={AppLogo} style={{ width: '75%' }} />
								<Box sx={{
									borderBottom: '1px solid #F8F8F8',
									paddingBottom: '24px',
									marginBottom: '24px'
								}}></Box>
								<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80%' }}>
									<Box>
										{privateNavigations.map(nav => (
											<NavLink
												to={nav.to}
												key={nav.id}
												onClick={() => setActiveNav(nav.id)}
												className={(props) => handleClassName(props.isActive, nav.id)}
												style={{
													display: 'flex', flexDirection: 'row',
													background: `${activeNav === nav.id ? '#3B82F6' : 'unset'}`,
													padding: '15px',
													borderRadius: '19px',
												}}
											>
												<Box mr='18px' ml='8px'>
													<Box sx={{ background: `${activeNav === nav.id ? '#white' : 'white'}` }}>
														{nav.icon}
													</Box>
												</Box>
												<Typography
													color={activeNav === nav.id ? 'white' : '#697B7A'}
													fontWeight='600'
													sx={{ fontSize: '14px' }}
												>
													{nav.name}
												</Typography>
											</NavLink>)
										)}

									</Box>
									<Box sx={{ marginTop: 'auto', padding: '10px' }}>
										<Typography sx={{ color: '#697B7A', fontSize: '14px', }}>Аккаунт</Typography>

										<Box mt="1rem" >
											<Button sx={{ color: '#697B7A', fontSize: '14px' }} onClick={() => navigate(routes.settings)}>
												Настройки
											</Button>
										</Box>
										<Box mt="0rem" mb="2rem">
											<Button
												onClick={() => {
													fetchAuthLogout();
													localStorage.clear();
													navigate(routes.login);
												}}

												variant='text'
												width={120}
											>
												<Typography
													variant='h4'
													color={'red'}
													fontSize={'16px'}
													className="diploma-navbar-item"
													fontWeight='450'>
													Выйти
												</Typography>

											</Button>
										</Box>
										<Box sx={{
											backgroundColor: '#3B82F6', width: '100%', height: '144px',
											borderRadius: '20px', marginBoottom: '50px',
											display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'
										}}>
											<img src={icon} style={{ marginTop: "20px" }} />
											<Box sx={{ fontSize: '16px', padding: '10px', color: 'white ' }}>
												Скачайте мобильное <br /> приложение
											</Box>
											<Box sx={{ color: 'white', marginBottom: '20px' }}>
												Dashboard
											</Box>
										</Box>
									</Box>

								</Box>
							</Box>
						</Box>
					) : (
						<CircularProgress color="warning" />
					)}



				</CustomDrawer>
			)}
		</>
	);
};

export const Sidebar = React.memo(AppSidebar);