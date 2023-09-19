import React from 'react';
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
import { NavLink, useNavigate } from 'react-router-dom';
import { selectAuthLoader, selectUserRole } from '@src/store/auth/selector';
import { useSelector } from 'react-redux';
import { privateNavigations } from "@src/layout/Header/generator";
import { DRAWER_WIDTH } from '../Layout';
import { routes } from "@src/shared/routes";
import { fetchAuthLogout } from "@src/store/auth/saga";


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
console.log(role);

export const AppSidebar: React.FC<SidebarProps> = (props): JSX.Element => {
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

	return (
		<CustomDrawer variant="permanent" open={true}>
			{!authLoader ? (
				<React.Fragment>
					<Box p={`1.5rem 0 0 10px`}>
						<img src={AppLogo} style={{ width: '75%' }} />
						<Box sx={{
							borderBottom: '1px solid #F8F8F8',
							paddingBottom: '24px',
							marginBottom: '24px'
						}}></Box>
						<Box mt='1rem'>
							{privateNavigations.map(nav => (
								<NavLink
									to={nav.to}
									key={nav.id}
									onClick={() => setActiveNav(nav.id)}
									className={(props) => handleClassName(props.isActive, nav.id)}
								>
									<Box
										display='flex'
										alignItems='center'
										pt='1rem'
										mb='5px'
										sx={{
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
									</Box>
									<Box
										style={{
											position: 'fixed',
											bottom: '0px',
											left: '20px',
											width: 'auto',
											height: 'auto',
											padding: '20px',
											zIndex: '999',
										}}
									>
										<Typography sx={{ color: '#697B7A', fontSize: '14px' }}>Аккаунт</Typography>

										<Box mt="1rem" >
											<Button sx={{ color: '#697B7A', fontSize: '14px', position: 'static' }} onClick={onSignOut}>
												Настройки
											</Button>
										</Box>
										<Box mt="0rem" mb="5rem">
											<Button
												onClick={() => {
													fetchAuthLogout();
													localStorage.clear();
													navigate(routes.login);
												}}

												variant='contained'
												width={120}
											>
												<Typography
													variant='h4'
													color={'white'}
													fontSize={'16px'}
													className="diploma-navbar-item"
													fontWeight='450'>
													Выйти
												</Typography>

											</Button>
										</Box>

										<img src={Menu} style={{ width: '90%' }} />
									</Box>
								</NavLink>
							))}
						</Box>

					</Box>
				</React.Fragment>
			) : (
				<CircularProgress color="warning" />
			)}



		</CustomDrawer>
	);
};

export const Sidebar = React.memo(AppSidebar);