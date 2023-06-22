import React from 'react';
import { DRAWER_WIDTH } from '../Layout';
import { Drawer, styled, Theme, CSSObject, DrawerProps, Box, Typography, IconButton, CircularProgress } from '@mui/material';

import { drawerHead, privateNavigations } from './generator';
import { SidebarProps } from './Sidebar.props';
import { NavLink } from 'react-router-dom';
import { Button } from '@src/components';
import { Auth } from 'aws-amplify';
import Out from "@src/assets/icons/out.png";
import { selectAuthLoader } from '@src/store/auth/selector';
import { useSelector } from 'react-redux';



interface ICustomDrawer extends DrawerProps {
	open: boolean;
}

const drawerMixin = (theme: Theme, open: boolean): CSSObject => ({
	overflowX: 'hidden',
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
		width: `calc(${theme.spacing(7)})`,
	})
});


const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<ICustomDrawer>(
	({ theme, open }) => ({
		width: DRAWER_WIDTH,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...{
			...drawerMixin(theme, open),
			'& .MuiDrawer-paper': {
				...drawerMixin(theme, open),
				backgroundColor: '#025F3E'
			},
		}
	}),
);

export const AppSidebar: React.FC<SidebarProps> = (props): JSX.Element => {
	const { open, toggleDrawer } = props;
	const authLoader = useSelector(selectAuthLoader);


	const [activeNav, setActiveNav] = React.useState(0);

	const handleActiveNav = (navId: number): void => {
		setActiveNav(navId);
	};
	const handleClassName = (isActive: boolean, id: number): string | undefined => {
		isActive && handleActiveNav(id);
		return "";
	};
	const onSignOut = (): void => {
		Auth.signOut();
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("currLocation");
	};



	const userRole: string[] = JSON.parse(localStorage.getItem("userRole") || '[]') || "";


	return (
		<CustomDrawer variant="permanent" open={open} sx={{ position: "relative" }}>

			{!authLoader ? <React.Fragment><Box p={`40px 0 0 ${open ? '20px' : '8px'}`} >
				<Box display='flex' alignItems='center'>
					<IconButton onClick={toggleDrawer}>
						<img src={drawerHead.menu} alt='' />
					</IconButton>
					<Box ml='12px' display='flex' alignItems='center'>
						<img src={drawerHead.kwaaka} alt='' />
					</Box>
				</Box>

				<Box mt='100px'>
					{privateNavigations.filter(nav => userRole && userRole?.some(role => nav.role.includes(role))).map(nav => (
						<NavLink
							to={nav.to}
							key={nav.id}
							className={(props) => handleClassName(props.isActive, nav.id)}
						>
							<Box display='flex' alignItems='center' p='20px 0' mb='5px'>
								<Box mr='18px' ml='8px'>
									{React.cloneElement(nav.icon, { fill: activeNav === nav.id ? '#FCAF58' : '#FFFFFF' })}
								</Box>
								<Typography
									variant='h4'
									color={activeNav === nav.id ? 'secondary' : 'common.white'}
									fontWeight='600'>
									{nav.name}
								</Typography>
							</Box>
						</NavLink>
					))
					}
				</Box>

			</Box>
				<Box position="absolute" bottom="30px" left={open ? "20px" : "8px"}>
					<Button startIcon={<img src={Out} />} color="neutral" onClick={onSignOut}>
						{open ? "Выход" : ""}
					</Button>
				</Box>
			</React.Fragment> : <CircularProgress color="warning" />}
		</CustomDrawer>
	);
};

export const Sidebar = React.memo(AppSidebar);