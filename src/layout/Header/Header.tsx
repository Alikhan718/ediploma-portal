import React, { useState, useEffect } from 'react';
import MenuIcon from '@src/assets/icons/menu.svg';
import AppLogo from '@src/assets/icons/app-logo.svg';
import HeaderSearchIcon from '@src/assets/icons/search.svg';
import RuFlag from '@src/assets/icons/ru-flag.svg';
import KzFlag from '@src/assets/icons/Flag.svg';
import EnFlag from '@src/assets/icons/EnFlag.svg';
import { ReactComponent as UserIcon } from '@src/assets/icons/user.svg';
import { ReactComponent as AccountCircleIcon } from '@src/assets/icons/profileIcon.svg';
import { ReactComponent as FilterIcon } from '@src/assets/icons/Filter-icon.svg';
import LogoutIcon from '@src/assets/icons/out.png';
import { headerNavigations, sidebarNavigations } from "@src/layout/Header/generator";
import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Box,
	Divider,
	styled,
	Typography,
	useMediaQuery, Menu, MenuItem, ListItemIcon, IconButton
} from '@mui/material';
import { HeaderProps } from './Header.props';
import { GlobalLoader } from './GlobalLoader';
import { Button, Input, Modal } from '@src/components';
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "@src/shared/routes";
import { isAuthenticated } from "@src/utils/userAuth";
import { FilterSection } from "@src/layout/Filter/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthLogout } from "@src/store/auth/saga";
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import { selectSearchText } from "@src/store/diplomas/selectors";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import { Sidebar } from '../Sidebar/Sidebar';

interface AppBarProps extends MuiAppBarProps {
	open: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({theme, open}) => (
	{
		// width: `calc(100% - ${theme.spacing(7)})`,
		boxShadow: 'none',
		position: 'unset',
		display: "none",
		zIndex: "1",
		backgroundColor: '#ffffff',
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			// marginLeft: DRAWER_WIDTH,
			// width: `calc(100% - ${DRAWER_WIDTH}px)`,
			display: "flex",
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

export interface FilterAttributes {
	text?: string,
	specialities?: string;
	degree?: string;
	region?: string;
	year?: number;
	gpaL?: number;
	gpaR?: number;
}

const AppHeader: React.FC<HeaderProps> = (props) => {
	const {isSideBarOpen} = props;
	console.log("isSideBarOpen", isSideBarOpen);
	const [showFilter, setShowFilter] = React.useState(false);

	const navigate = useNavigate();
	const searchText = useSelector(selectSearchText);
	const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
		text: searchText,
		specialities: "",
		region: "",
		degree: "",
		year: 0,
		gpaL: 0,
		gpaR: 0,
	});
	const [open, setOpen] = React.useState(false);
	const [minimized, setMinimized] = React.useState(true);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFilterAttributes({...filterAttributes, text: e.target.value.trim()});
		if (e.target.value.trim().length >= 2) {
			triggerSearchFilters(filterAttributes);
		}
	};
	const triggerSearchFilters = (filterAttributes: any) => {
		dispatch(fetchSearch(filterAttributes));
	};
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = React.useState(false);
	const [activeNav, setActiveNav] = React.useState(0);

	const handleActiveNav = (navId: number): void => {
		setActiveNav(navId);
	};
	const handleClassName = (isActive: boolean, id: number): string | undefined => {
		isActive && handleActiveNav(id);
		return "";
	};
	const getQueryWidth = () => {
		const matchesLg = useMediaQuery('(min-width:1200px)');
		const matchesMd = useMediaQuery('(max-width:1180px)');
		const matchesSm = useMediaQuery('(max-width:768px)');
		const matchesXs = useMediaQuery('(max-width:576px)');
		if (matchesXs) return "80%";
		if (matchesSm) return "60%";
		if (matchesMd) return "40%";
		if (matchesLg) return "25%";
	};
	const urlElements = window.location.href.split('/');
	const checkRoute = (): boolean => {
		const sidebarEnabledRoutes = [
			'university',
			'detail',
			'notifications',
			'addingGraduates',
			'main',
			'about-us',
			'settingsPage',
			'diploma',
			'student',
			'employer'
		];
		for (const item of sidebarEnabledRoutes) {
			if (urlElements.includes(item)) {
				return true;
			}
		}
		return false;
	};
	const checkSideBarRoute = (): boolean => {
		const sidebarEnabledRoutes = ['detail', 'notifications', 'addingGraduates', 'settingsPage', 'student', 'employer'];
		for (const item of sidebarEnabledRoutes) {
			if (urlElements.includes(item)) {
				return false;
			}
		}
		return true;
	};

	React.useEffect(() => {
		setOpen(checkRoute());
	});

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState('ru');
	const userRole = localStorage.getItem("userRole");

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		fetchAuthLogout();
		localStorage.clear();
		navigate(routes.login, { replace: true });
		handleCloseMenu();
	};
	const handleFlagSelect = (language: string) => {
		setSelectedLanguage(language);
		handleCloseMenu();
	};

	return (
		<AppBar open={open} className="app-navbar-container">
			<Box className="app-navbar" height='4rem'>
				<Modal
					open={openModal}
					handleClose={() => setOpenModal(true)}
					maxWidth={getQueryWidth()}
					width={getQueryWidth()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

						<img src={NeedAuthorizationPic} alt=""/>
						<Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'
						            fontWeight='600'
						            variant="h6"
						            component="h2">
							Для использования требуется авторизация
						</Typography>
						<Button variant='contained' sx={{
							marginTop: "1rem",
							padding: "1rem",
							width: "80%",
							fontSize: "1rem",
							fontWeight: "600",
							borderRadius: "2rem"
						}} onClick={() => {
							navigate(routes.login);
						}}>Авторизоваться</Button>
					</Box>
				</Modal>
				{/*<img src={MenuIcon} onClick={() => {*/}
				{/*    (!isSideBarOpen);*/}
				{/*}} className="menu-icon"/>*/}
				{checkSideBarRoute() && <img className='diploma-logo' src={AppLogo} onClick={() => {
					handleActiveNav(0);
					navigate(routes.main);
				}} alt="logo"/>}
				{headerNavigations.map(nav => (
					<NavLink
						to={nav.to}
						key={nav.id}
						className={(props) => handleClassName(props.isActive, nav.id) + "diploma-navbar-item"}
					>
						<Typography
							noWrap
							variant='h4'
							color={activeNav === nav.id ? '#0A66C2' : 'rgba(45, 45, 45, 1)'}
							fontWeight='400'
							fontSize='16px'
							lineHeight='20px'
						>
							{nav.name}
						</Typography>
					</NavLink>
				))}


				
				<Box
					display='flex'
					ml="auto"
					justifyContent='flex-end'
					py='10px'
					gap="1.5rem"
					className="diploma-btn-container">
					<Box display='flex' justifyContent='center'>
						<img style={{
							cursor: 'pointer',
							minHeight: '1.25rem'
						}} src={HeaderSearchIcon} alt=""/>
					</Box>
					<Box display='flex' justifyContent='center'>
						<IconButton
						style={{
							cursor: 'pointer',
							minHeight: '1.25rem'
						}}
						onClick={handleOpenMenu}
						>
							{selectedLanguage === 'ru' && <img src={RuFlag} alt="Russian" />}
							{selectedLanguage === 'en' && <img src={EnFlag} alt="English" />}
							{selectedLanguage === 'kz' && <img src={KzFlag} alt="Kazakh" />}
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleCloseMenu}
						>
							<MenuItem onClick={() => handleFlagSelect('ru')} sx={{ fontSize: '1rem' }}>
								<img src={RuFlag} alt="Russian" style={{ marginRight: '0.5rem' }} />
								Русский
							</MenuItem>
							<MenuItem onClick={() => handleFlagSelect('en')} sx={{ fontSize: '1rem' }}>
								<img src={EnFlag} alt="English" style={{ marginRight: '0.5rem' }} />
								Англиский
							</MenuItem>
							<MenuItem onClick={() => handleFlagSelect('kz')} sx={{ fontSize: '1rem' }}>
								<img src={KzFlag} alt="French" style={{ marginRight: '0.5rem' }} />
								Казахский
							</MenuItem>
						</Menu>
					</Box>

					{!isAuthenticated() ?
						<Box display='flex' justifyContent="center" gap="1.25rem" height="3rem">
							<Button
								onClick={() => {
									navigate(routes.login, {replace: true});
								}}
								className="diploma-auth-btn"
								variant='contained'
								borderRadius="3rem"
								style={{padding: "0 2rem"}}
							>
								<Typography
									variant='h4'
									color={'white'}
									fontSize={'16px'}
									className="diploma-navbar-item"
									fontWeight='500'>
									Войти
								</Typography>

							</Button>
							<Box className="menu-icon">
								<img style={{
									width: "2rem",
									minHeight: '1.25rem'

								}} src={minimized ? MenuIcon : MenuClosedIcon} onClick={() => {
									setMinimized(!minimized);
								}} alt={"menu-icon"}/>
							</Box>
						</Box>
						:
						<Box display='flex' justifyContent="center" gap="1.25rem" height="3rem">
							<Button
								onClick={handleOpenMenu}
								className="diploma-auth-btn"
								startIcon={<AccountCircleIcon style={{ height: "1.2rem" }} />}
								variant="contained"
								borderRadius="3rem"
								width={120}
							>
								<Typography
									variant="h4"
									color="white"
									fontSize="16px"
									className="diploma-navbar-item"
									fontWeight="450"
								>
									Профиль
								</Typography>
							</Button>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleCloseMenu}
							>
								<MenuItem onClick={handleLogout}>

									<Typography variant="inherit">Выйти</Typography>
								</MenuItem>
							</Menu>

							<UserIcon style={{
								height: "100%",
								width: "3rem",
								cursor: "pointer"
							}}/>

						</Box>
					}

				</Box>
			</Box>
			<Box className="" display={minimized ? 'none' : 'flex'} flexDirection="column"
			     style={{
				     position: "absolute",
				     zIndex: "99",
				     backgroundColor: "white",
				     width: "100%",
				     height: "90vh",
				     top: "100%",
			     }}>
				<Box display="flex" flexDirection="column" gap=".5rem" height="100%" p="1rem">
					<Typography color="#B6B6B6" fontSize="0.95rem">
						Информация
					</Typography>
					<Box mb=".5rem">
						{headerNavigations.map(nav => (
							<NavLink
								to={nav.to}
								key={nav.id}
								className={(props) => handleClassName(props.isActive, nav.id)}
								style={{
									display: 'flex', flexDirection: 'row',
									background: `${activeNav === nav.id ? '#3B82F6' : 'unset'}`,
									padding: '15px',
									borderRadius: '19px', marginRight: '10px'
								}}
							>
								<Box mr='18px' ml='8px'>
									<Box
										sx={{background: `${activeNav === nav.id ? '#white' : 'white'}`}}>
										<Box
											style={{
												filter: activeNav === nav.id ? "brightness(4)" : "",
												verticalAlign: nav.verticalAlign
											}}>{nav.icon}</Box>
									</Box>
								</Box>
								<Typography
									color={activeNav === nav.id ? 'white' : '#697B7A'}
									fontWeight='600'
									alignSelf="center"
									sx={{fontSize: '14px'}}
								>
									{nav.name}
								</Typography>
							</NavLink>
						))}
					</Box>

					<Typography display="none" mb=".5rem" color="#B6B6B6" fontSize="0.95rem">
						Интерфейс
					</Typography>
					<Box mb=".5rem" display="none">
						{interFaceOptions.map(option => (
							<Box
								key={option.id}
								style={{
									display: 'flex', flexDirection: 'row',
									background: `${activeNav === option.id ? '#3B82F6' : 'unset'}`,
									padding: '15px',
									borderRadius: '19px', marginRight: '10px'
								}}
							>
								<Box mr='18px' ml='8px'>
									<Box
										sx={{background: `${activeNav === option.id ? '#white' : 'white'}`}}>
										<Box
											style={{
												filter: activeNav === option.id ? "brightness(4)" : "",
												verticalAlign: option.verticalAlign
											}}>{option.icon}</Box>
									</Box>
								</Box>
								<Typography
									color={activeNav === option.id ? 'white' : '#697B7A'}
									fontWeight='600'
									alignSelf="center"
									sx={{fontSize: '14px'}}
								>
									{option.name}
								</Typography>
							</Box>
						))}
					</Box>
					<Box display='flex' flexDirection="column" justifyContent="center" mt="auto" gap="1.25rem" pb="1rem">
						<Button
							onClick={() => {
								navigate(routes.login, {replace: true});
							}}
							fullWidth
							variant='contained'
							borderRadius="3rem"
							style={{padding: "0 2rem"}}
						>
							Войти
						</Button>
						<Button
							onClick={() => {
								navigate(routes.register, {replace: true});
							}}
							fullWidth
							borderRadius="3rem"
							sx={{
								backgroundColor: "#EBF2FE",
								color: "#2F69C7",
								"&:hover": {
									"background-color": "#3B82F6", color: "white"
								}
							}}
							style={{padding: "0 2rem"}}
						>
							Регистрироваться

						</Button>

					</Box>
				</Box>
			</Box>
			<GlobalLoader/>
		</AppBar>
	);
};
export const Header = React.memo(AppHeader);
{/*<Modal*/ }
{/*    open={openModal}*/ }
{/*    handleClose={() => setOpenModal(true)}*/ }
{/*    width={getQueryWidth()}*/ }
{/*    aria-labelledby="modal-modal-title"*/ }
{/*    aria-describedby="modal-modal-description"*/ }
{/*>*/ }
{/*    <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>*/ }

{/*        <img src={NeedAuthorizationPic} alt=""/>*/ }
{/*        <Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'*/ }
{/*                    fontWeight='600'*/ }
{/*                    variant="h6"*/ }
{/*                    component="h2">*/ }
{/*            Для использования требуется авторизация*/ }
{/*        </Typography>*/ }
{/*        <Button variant='contained' sx={{*/ }
{/*            marginTop: "1rem",*/ }
{/*            padding: "1rem",*/ }
{/*            width: "80%",*/ }
{/*            fontSize: "1rem",*/ }
{/*            fontWeight: "600",*/ }
{/*            borderRadius: "2rem"*/ }
{/*        }} onClick={() => {*/ }
{/*            navigate(routes.login);*/ }
{/*        }}>Авторизоваться</Button>*/ }
{/*    </Box>*/ }
{/*</Modal>*/ }


{/*<Box className="diploma-navbar-item" width="100%">*/ }
{/*    {!window.location.href.split('/').includes('main') && !window.location.href.split('/').includes('university') && !window.location.href.split('/').includes('university') &&*/ }
{/*        (<Input placeholder='Найти по ФИО' fullWidth={true} inputSize='s'*/ }
{/*               value={filterAttributes.text}*/ }
{/*               onChange={handleSearch} startAdornment={<SearchIcon/>}*/ }
{/*               endAdornment={*/ }
{/*                   <FilterIcon*/ }
{/*                       style={{cursor: "pointer"}}*/ }
{/*                       onClick={() => {*/ }
{/*                           if (isAuthenticated()) {*/ }
{/*                               setShowFilter(!showFilter);*/ }
{/*                           }*/ }
{/*                           else {*/ }
{/*                               setOpenModal(true);*/ }
{/*                           }*/ }
{/*                       }}*/ }
{/*                   />}*/ }
{/*        />)}*/ }
{/*</Box>*/ }
{/*<FilterSection*/ }
{/*    triggerSearchFilters={triggerSearchFilters}*/ }
{/*    filterAttributes={filterAttributes}*/ }
{/*    setFilterAttributes={setFilterAttributes}*/ }
{/*    open={showFilter}*/ }
{/*    setOpen={setShowFilter}*/ }
{/*/>*/ }
