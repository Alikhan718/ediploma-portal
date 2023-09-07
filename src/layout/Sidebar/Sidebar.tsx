import React from 'react';
import {
	Drawer,
	styled,
	Theme,
	CSSObject,
	DrawerProps,
	Box,
	Typography,
	CircularProgress, Button, Divider
} from '@mui/material';
import AppLogo from '@src/assets/icons/app-logo.svg';
import Menu from '@src/assets/example/Menu.svg';
import { SidebarProps } from './Sidebar.props';
import { NavLink } from 'react-router-dom';
import Out from "@src/assets/icons/out.png";
import { selectAuthLoader } from '@src/store/auth/selector';
import { useSelector } from 'react-redux';
import { privateNavigations } from "@src/layout/Header/generator";
import { DRAWER_WIDTH } from '../Layout';

interface ICustomDrawer extends DrawerProps {
	open: boolean;
}

const drawerMixin = (theme: Theme, open: boolean): CSSObject => ({
	overflowX: 'hidden',
	borderRadius: "0 2rem 2rem 0",
	boxShadow: "-10rem 0 10rem",
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

export const AppSidebar: React.FC<SidebarProps> = (props): JSX.Element => {
	const { open, toggleDrawer } = props;
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
		<CustomDrawer variant="permanent" open={false}>
			{!authLoader ? (
				<React.Fragment>
					<Box p={`1.5rem 0 0 20px`}>
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
											variant='h4'
											color={activeNav === nav.id ? 'white' : '#697B7A'}
											fontWeight='600'
										>
											{nav.name}
										</Typography>
									</Box>
								</NavLink>
							))}
						</Box>
						{/* <Box
				style={{
					position: 'fixed',
					bottom: '200px',
					left: '20px',
					width: 'auto',
					height: 'auto',
					padding: '20px',
					zIndex: '999',
				}}
			>
				<Typography sx={{ color: '#697B7A', fontSize: '20px' }}>Аккаунт</Typography>

				<Box mt="1rem">
					<Button startIcon={<img src={Out} />} sx={{ color: '#697B7A', fontSize: '20px', position: 'static' }} onClick={onSignOut}>
						Настройки
					</Button>
				</Box>
				<Box mt="0rem" mb="5rem">
					<Button startIcon={<img src={Out} />} sx={{ color: '#EF4444', fontSize: '20px' }} onClick={onSignOut}>
						Выйти
					</Button>
				</Box>

				<img src={Menu} style={{ width: '100%' }} />
			</Box> */}
					</Box>
				</React.Fragment>
			) : (
				<CircularProgress color="warning" />
			)}



		</CustomDrawer>
	);
};

export const Sidebar = React.memo(AppSidebar);