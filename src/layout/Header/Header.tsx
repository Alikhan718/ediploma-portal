import React, { useState, useEffect } from 'react';
import MenuIcon from '@src/assets/icons/menu.svg';
import MenuClosedIcon from '@src/assets/icons/cross.svg';
import AppLogo from '@src/assets/icons/app-logo.svg';
import { ReactComponent as HeaderSearchIcon } from '@src/assets/icons/search.svg';
import RuFlag from '@src/assets/icons/ru-flag.svg';
import KzFlag from '@src/assets/icons/Flag.svg';
import EnFlag from '@src/assets/icons/EnFlag.svg';
import { ReactComponent as UserIcon } from '@src/assets/icons/user.svg';
import { ReactComponent as AccountCircleIcon } from '@src/assets/icons/profileIcon.svg';
import { ReactComponent as FilterIcon } from '@src/assets/icons/Filter-icon.svg';
import LogoutIcon from '@src/assets/icons/out.png';
import { headerNavigations, interFaceOptions, sidebarNavigations } from "@src/layout/Header/generator";
import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Box,
	Divider,
	styled,
	Typography, InputAdornment,
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
import { selectUserRole } from "@src/store/auth/selector";
import { ReactComponent as NotIcon } from "@src/assets/icons/Notification.svg";
import { ReactComponent as ModeIcon } from "@src/assets/icons/Moons.svg";
import { ReactComponent as Settings } from "@src/assets/icons/Settings.svg";
import { ReactComponent as Out } from "@src/assets/icons/logout_outline.svg";
import { ReactComponent as Analytics } from "@src/assets/icons/analytics_outlined.svg";
import { ReactComponent as Avatar } from "@src/assets/icons/avatar_outlined.svg";
import { ReactComponent as Folder } from "@src/assets/icons/folder_outilne.svg";
import { useLocation } from 'react-router';

interface AppBarProps extends MuiAppBarProps {
	open: boolean;
}
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => (
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
	const { isSideBarOpen } = props;
	console.log("isSideBarOpen", isSideBarOpen);
	const [showFilter, setShowFilter] = React.useState(false);
	const tabletBreakpoint = 992;
	const isTablet = window.innerWidth < tabletBreakpoint;
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
		setFilterAttributes({ ...filterAttributes, text: e.target.value.trim() });
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
	const checkSecondHeaderRoute = (): boolean => {
		const urlElements = window.location.href.split('/');
		const secondHeaderEnabledRoutes = ['detail', 'notifications', 'addingGraduates', 'settingsPage', 'student', 'employer'];
		for (const item of secondHeaderEnabledRoutes) {
			if (urlElements.includes(item)) {
				return true;
			}
		}
		return false;
	};
	const isSecondHeaderVisible = checkSecondHeaderRoute();
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
	const getHeaderText = () => {
		const currentPath = window.location.pathname;
		if (currentPath === routes.detail) {
			return 'Dashboard';
		} else if (currentPath === routes.notifications) {
			return 'Уведомления';
		}
		else if (currentPath === routes.addingGraduates) {
			return 'Выпустить дипломы';
		}
		else if (currentPath === routes.settings) {
			return 'Настройки';
		}
		return 'Dashboard';
	};

	React.useEffect(() => {
		setOpen(checkRoute());
	});

	const [showDropdown, setShowDropdown] = useState<{ profile: boolean; lang: boolean }>({
		profile: false,
		lang: false
	});
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState('ru');
	const userRole = localStorage.getItem("userRole");

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, dropDownType: string) => {
		setAnchorEl(event.currentTarget);
		setShowDropdown(prevState => ({
			...prevState,
			[dropDownType]: true,
			[dropDownType === 'lang' ? 'profile' : 'lang']: false,
		}));
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
		setShowDropdown({ profile: false, lang: false });
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

	const headerText = getHeaderText();
	return (
		<>
			{isSecondHeaderVisible ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						backgroundColor: 'white',
						padding: '1rem',
						width: '95%',
						marginLeft: '2rem',
						borderRadius: '30px',
						marginBottom: '1rem',
					}}
				>
					<Box sx={{ fontSize: '1.2rem', fontWeight: '600' }}>
						{headerText}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Input
							type="text"
							name="email"
							placeholder="Найти"
							sx={{ marginRight: '1rem', flex: '1', }}
							endAdornment={
								<InputAdornment position="end">
									<HeaderSearchIcon />
								</InputAdornment>
							}
						/>

						<NotIcon style={{ width: '25%', borderLeft: '1px solid gray', }} />
						<ModeIcon style={{ width: '25%', borderRight: '1px solid gray', }} />
						<AccountCircleIcon style={{ width: '25%', marginLeft: '0.5rem' }} />
					</Box>

				</Box>

			) : (
				<AppBar open={open} sx={{ padding: "0 !important" }} className="app-navbar-container">
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

								<img src={NeedAuthorizationPic} alt="" />
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
						{(checkSideBarRoute() || isTablet) ? <img className='diploma-logo' src={AppLogo} onClick={() => {
							handleActiveNav(0);
							navigate(routes.main);
						}} alt="logo" /> : null}
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
							gap=".5rem"
							className="diploma-btn-container">
							<IconButton
								style={{
									cursor: 'pointer',
									minHeight: '2.5rem',
									minWidth: '3rem'
								}}
							>
								<HeaderSearchIcon style={{ alignSelf: "center" }} />
							</IconButton>
							<IconButton
								style={{
									cursor: 'pointer',
									minHeight: '2.5rem',
									minWidth: '3rem'
								}}
								onClick={(event) => {
									handleOpenMenu(event, "lang");
								}}
							>
								{selectedLanguage === 'ru' && <img src={RuFlag} alt="Russian" />}
								{selectedLanguage === 'en' && <img src={EnFlag} alt="English" />}
								{selectedLanguage === 'kz' && <img src={KzFlag} alt="Kazakh" />}
							</IconButton>


							{!isAuthenticated() ?
								<Box display='flex' justifyContent="center" gap="1.25rem" height="3rem">
									<Button
										onClick={() => {
											navigate(routes.login, { replace: true });
										}}
										className="diploma-auth-btn"
										variant='contained'
										borderRadius="3rem"
										style={{ padding: "0 2rem" }}
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
										}} alt={"menu-icon"} />
									</Box>
								</Box>
								:
								<Box display='flex' justifyContent="center" gap="1rem" height="3rem">
									<IconButton
										style={{
											cursor: 'pointer',
										}}
										onClick={(event) => {
											handleOpenMenu(event, "profile");
										}}
									>
										<AccountCircleIcon style={{ alignSelf: "center" }} />
									</IconButton>


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
							height: "calc(100vh - 4rem)",
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
												sx={{ background: `${activeNav === nav.id ? '#white' : 'white'}` }}>
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
											sx={{ fontSize: '14px' }}
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
												sx={{ background: `${activeNav === option.id ? '#white' : 'white'}` }}>
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
											sx={{ fontSize: '14px' }}
										>
											{option.name}
										</Typography>
									</Box>
								))}
							</Box>
							<Box display='flex' flexDirection="column" justifyContent="center" mt="auto" gap="1.25rem"
								pb="1rem">
								<Button
									onClick={() => {
										navigate(routes.login, { replace: true });
									}}
									fullWidth
									variant='contained'
									borderRadius="3rem"
									style={{ padding: "0 2rem" }}
								>
									Войти
								</Button>
								<Button
									onClick={() => {
										navigate(routes.register, { replace: true });
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
									style={{ padding: "0 2rem" }}
								>
									Регистрироваться

								</Button>

							</Box>
						</Box>
					</Box>
					<Menu
						anchorEl={anchorEl}
						open={showDropdown.profile}
						onClose={handleCloseMenu}
						sx={{
							color: "green",
							padding: "10rem !important",
						}}
					>
						<MenuItem onClick={() => {
							navigate(routes[userRole!.toLowerCase()], { replace: true });
						}}>
							<Avatar style={{ marginRight: '10px', verticalAlign: "center" }} />
							<Typography>Профиль</Typography>
						</MenuItem>
						<MenuItem onClick={() => {
							navigate(routes.settings);
						}}>
							<Analytics style={{ marginRight: '10px', verticalAlign: "center" }} />
							<Typography>
								Аналитика
							</Typography>
						</MenuItem>

						<MenuItem onClick={() => {
							navigate(routes.addingGraduates);
						}}>
							<Folder style={{ marginRight: '10px', verticalAlign: "center" }} />
							<Typography>
								Выпустить дипломы
							</Typography>
						</MenuItem>

						<Divider style={{ margin: "0 1rem" }} />

						<MenuItem onClick={() => {
							navigate(routes.settings);
						}}>
							<Settings style={{ marginRight: '10px', verticalAlign: "center" }} />
							<Typography>
								Настройки
							</Typography>
						</MenuItem>

						<MenuItem onClick={handleLogout}>
							<Out style={{ marginRight: '10px' }} />
							<Typography
								color='red'>
								Выйти
							</Typography>

						</MenuItem>
					</Menu>
					<Menu
						anchorEl={anchorEl}
						open={showDropdown.lang}
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
					<GlobalLoader />
				</AppBar>
			)}
		</>
	)
		;
};
export const Header = React.memo(AppHeader);
