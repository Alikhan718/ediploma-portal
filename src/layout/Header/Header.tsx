import React, { useState } from 'react';
import MenuIcon from '@src/assets/icons/menu.svg';
import MenuClosedIcon from '@src/assets/icons/cross.svg';
import AppLogo from '@src/assets/icons/app-logo.svg';
import {ReactComponent as HeaderSearchIcon} from '@src/assets/icons/search.svg';
import RuFlag from '@src/assets/icons/RuFlag.svg';
import KzFlag from '@src/assets/icons/Flag.svg';
import EnFlag from '@src/assets/icons/EnFlag.svg';
import {ReactComponent as AccountCircleIcon} from '@src/assets/icons/profileIcon.svg';
import {
    headerNavigations,
    interFaceOptions,
    dropdownItems,
    dropdownItemsBottom
} from "@src/layout/Header/generator";
import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Box,
	Divider,
	styled,
	Typography, InputAdornment,
	Menu, MenuItem, IconButton
} from '@mui/material';
import { HeaderProps } from './Header.props';
import { GlobalLoader } from './GlobalLoader';
import { Button, Input, Modal } from '@src/components';
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "@src/shared/routes";
import { isAuthenticated } from "@src/utils/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import { selectSearchText } from "@src/store/diplomas/selectors";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import {ReactComponent as NotIcon} from "@src/assets/icons/Notification.svg";
import {ReactComponent as ModeIcon} from "@src/assets/icons/Moons.svg";
import {selectUserRole} from "@src/store/auth/selector";
import {selectLanguage} from "@src/store/generals/selectors";
import {setLanguage} from '@src/store/generals/actionCreators';
import { fetchLogoutAction } from '@src/store/auth/actionCreators';

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
    // const [showFilter, setShowFilter] = React.useState(false);
    



    const lang = useSelector(selectLanguage);
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
    const checkSecondHeaderRoute = (): boolean => {
        const urlElements = window.location.href.split('/');
        const secondHeaderEnabledRoutes = ['analysisPage', 'user', 'profile', 'graduates'];
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

    const urlElements = window.location.href.split('/');
    const checkRoute = (): boolean => {
        const headerDisabledRoutes = [
            'auth',
        ];
        for (const item of headerDisabledRoutes) {
            if (urlElements.includes(item)) {
                return true;
            }
        }
        return false;
    };
    const checkSideBarRoute = (): boolean => {
        const sidebarEnabledRoutes = ['details', 'user', 'graduates'];
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
        } else if (currentPath === routes.addingGraduates) {
            return 'Выпустить дипломы';
        } else if (currentPath === routes.settings) {
            return 'Настройки';
        }
        return 'Dashboard';
    };

    React.useEffect(() => {
        setOpen(!checkRoute());
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
        setShowDropdown({profile: false, lang: false});
    };

    const handleFlagSelect = (language: string) => {
        dispatch(setLanguage(language));
        handleCloseMenu();
    };
    const role = useSelector(selectUserRole);
    const headerText = getHeaderText();
    return (
        <Box mb={urlElements.includes('user') || urlElements.includes('detail') || urlElements.includes('diploma') ? "1rem" : ""}>
            {isSecondHeaderVisible ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '0.8rem',
                        width: 'calc(100% - (97% - 220px) % 992px)',
                        marginX: "1.5rem",
                        marginTop: "1rem",
                        borderRadius: '30px',
                        marginBottom: '1rem',
                        '@media (max-width: 778px)': {
                            width: "100%",
                            marginX: "0",
                            marginBottom: '-2rem',
                        },
                    }}
                >
                    <Box sx={{fontSize: '1.2rem', fontWeight: '600', marginLeft: '1rem'}}>
                        {headerText}
                    </Box>
                    <Box sx={{
                        display: 'flex', alignItems: 'center',
                        '@media (max-width: 1000px)': {
                            gap: ".5rem",
                        },
                    }}>
                        <Input
                            type="text"
                            name="email"
                            placeholder="Найти"
                            sx={{
                                marginRight: '1rem', flex: '1',
                                '@media (max-width: 778px)': {
                                    display: 'none'
                                },
                                '@media (max-width: 1208px)': {
                                    display: 'none'
                                },
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <HeaderSearchIcon/>
                                </InputAdornment>
                            }
                        />
                        <HeaderSearchIcon className="app-icon-img"/>
                        <Divider orientation="vertical"
                                 style={{
                                     borderLeftWidth: "1px",
                                     borderRightWidth: "0",
                                     borderColor: "grey",
                                     height: "1.5rem",
                                 }}/>
                        <NotIcon style={{
                            cursor: 'pointer'
                        }} className="app-icon"
                                 onClick={() => {
                                     navigate(routes.notifications);
                                 }}/>
                        <Divider orientation="vertical"
                                 style={{
                                     borderLeftWidth: "1px",
                                     borderRightWidth: "0",
                                     borderColor: "grey",
                                     height: "1.5rem",
                                 }}/>
                        <ModeIcon style={{cursor: 'pointer'}} className="app-icon"/>
                        <Divider orientation="vertical"
                                 style={{
                                     borderLeftWidth: "1px",
                                     borderRightWidth: "0",
                                     borderColor: "grey",
                                     height: "1.5rem",
                                 }}/>
                        <IconButton
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={(event) => {
                                handleOpenMenu(event, "profile");
                            }}
                        >
                            <AccountCircleIcon style={{alignSelf: "center"}}/>
                        </IconButton>
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
                        {dropdownItems.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (index === 0) {
                                        if (role === "Student") {
                                            navigate(routes.studentProfile, {replace: true});
                                        } else if (userRole === "Employer") {
                                            navigate(routes.employerProfile, {replace: true});
                                        } else if (userRole === "University") {
                                            navigate(routes.universityProfile, {replace: true});
                                        }
                                    }
                                    handleCloseMenu();
                                    navigate(item.to);
                                }}
                            >
                                {item.icon}
                                <Typography>
                                    {item.name[lang]}
                                </Typography>
                            </MenuItem>
                        ))}
                        <Divider style={{margin: "0 1rem"}}/>
                        {dropdownItemsBottom.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (item.verticalAlign == "red") {
                                        dispatch(fetchLogoutAction());
                                    }
                                    handleCloseMenu();
                                    navigate(item.to);
                                }}
                            >
                                {item.icon}
                                <Typography color={item.verticalAlign}>
                                    {item.name[lang]}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

            ) : (
                <AppBar open={open} sx={{padding: "0 !important"}} className="app-navbar-container">
                    <Box className="app-navbar" height='5rem'>
                        <Modal open={openModal} handleClose={() => setOpenModal(true)}
                               aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                        {(checkSideBarRoute() || isTablet) ?
                            <img className='diploma-logo' src={AppLogo} onClick={() => {
                                handleActiveNav(0);
                                navigate(routes.main);
                            }} alt="logo"/>
                            :
                            null
                        }
                        {
                            headerNavigations.map(nav => (
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
                                        {nav.name[lang]}
                                    </Typography>
                                </NavLink>
                            ))
                        }


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
                                <HeaderSearchIcon style={{alignSelf: "center"}}/>
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
                                {lang == 'ru' && <img src={RuFlag} alt="Russian"/>}
                                {lang == 'en' && <img src={EnFlag} alt="English"/>}
                                {lang == 'kz' && <img src={KzFlag} alt="Kazakh"/>}
                            </IconButton>


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
                                <Box display='flex' justifyContent="center" gap="1rem" height="3rem">
                                    <IconButton
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        onClick={(event) => {
                                            handleOpenMenu(event, "profile");
                                        }}
                                    >
                                        <AccountCircleIcon style={{alignSelf: "center"}}/>
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
                                            {nav.name[lang]}
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
                                            {option.name[lang]}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box display='flex' flexDirection="column" justifyContent="center" mt="auto" gap="1.25rem"
                                 pb="1rem">
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
                    <Menu
                        anchorEl={anchorEl}
                        open={showDropdown.profile}
                        onClose={handleCloseMenu}
                        sx={{
                            color: "green",
                            padding: "10rem !important",
                        }}
                    >
                        {dropdownItems.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (index === 0) {
                                        if (role === "Student") {
                                            navigate(routes.studentProfile, {replace: true});
                                        } else if (userRole === "Employer") {
                                            navigate(routes.employerProfile, {replace: true});
                                        } else if (userRole === "University") {
                                            navigate(routes.universityProfile, {replace: true});
                                        }
                                    }
                                    handleCloseMenu();
                                    navigate(item.to);
                                }}
                            >
                                {item.icon}
                                <Typography>
                                    {item.name[lang]}
                                </Typography>
                            </MenuItem>
                        ))}
                        <Divider style={{margin: "0 1rem"}}/>
                        {dropdownItemsBottom.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (item.verticalAlign == "red") {
                                        dispatch(fetchLogoutAction());
                                    }
                                    handleCloseMenu();
                                    navigate(item.to);
                                }}
                            >
                                {item.icon}
                                <Typography color={item.verticalAlign}>
                                    {item.name[lang]}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    <Menu
                        anchorEl={anchorEl}
                        open={showDropdown.lang}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => handleFlagSelect('ru')} sx={{fontSize: '1rem'}}>
                            <img src={RuFlag} alt="Russian" style={{marginRight: '0.5rem'}}/>
                            Русский
                        </MenuItem>
                        <MenuItem onClick={() => handleFlagSelect('en')} sx={{fontSize: '1rem'}}>
                            <img src={EnFlag} alt="English" style={{marginRight: '0.5rem'}}/>
                            Англиский
                        </MenuItem>
                        <MenuItem onClick={() => handleFlagSelect('kz')} sx={{fontSize: '1rem'}}>
                            <img src={KzFlag} alt="French" style={{marginRight: '0.5rem'}}/>
                            Казахский
                        </MenuItem>
                    </Menu>
                    <GlobalLoader/>
                </AppBar>
            )
            }
        </Box>
    );
};
export const Header = React.memo(AppHeader);
