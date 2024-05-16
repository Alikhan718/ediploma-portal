import React, { useState } from 'react';
import MenuIcon from '@src/assets/icons/menu.svg';
import MenuClosedIcon from '@src/assets/icons/cross.svg';
import AppLogo from '@src/assets/icons/app-logo.svg';
import { ReactComponent as HeaderSearchIcon } from '@src/assets/icons/search.svg';
import RuFlag from '@src/assets/icons/RuFlag.svg';
import KzFlag from '@src/assets/icons/Flag.svg';
import EnFlag from '@src/assets/icons/EnFlag.svg';
import { ReactComponent as AccountCircleIcon } from '@src/assets/icons/profileIcon.svg';
import { ReactComponent as CheckNote } from '@src/assets/icons/checkNot.svg';
import {
    headerNavigations,
    interFaceOptions,
    dropdownItems,
    dropdownItemsBottom, localization, notifications
} from "@src/layout/Header/generator";
import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Box,
    Divider,
    styled,
    Typography, InputAdornment,
    Menu, MenuItem, IconButton, Popper, MenuList
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
import { ReactComponent as NotIcon } from "@src/assets/icons/Notification.svg";
import { ReactComponent as ModeIcon } from "@src/assets/icons/Moons.svg";
import { selectUserRole, selectUserState } from "@src/store/auth/selector";
import { selectLanguage } from "@src/store/generals/selectors";
import { setLanguage } from '@src/store/generals/actionCreators';
import { fetchLogoutAction, fetchUserProfile } from '@src/store/auth/actionCreators';
import io from 'socket.io-client';
import { set } from 'react-ga';
import { ReactComponent as GreenNote } from '@src/assets/icons/greenNote.svg';

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

interface DropdownItem {
    id: number;
    name: {
        ru: string;
        kz: string;
        en: string;
    };
    to: string;
    role: string[];
    icon: React.ReactNode;
    verticalAlign: string;
    function?: () => void;
}

export interface FilterAttributes {
    text?: string,
    specialities?: string;
    degree?: string;
    region?: string;
    year?: number;
    gpaL?: number;
    gpaR?: number;
    university_id?: number;
    ratingL?: number;
    ratingR?: number;
}

export interface EmployerFilterAttributes {
    field?: string,
    text?: string,
}

const StyledMenu = styled(Menu)(({ theme }) => ({
    [`&.MuiMenu-paper`]: {
        borderRadius: '1rem'
    },
}));

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
    const [notificationOpen, setNotificationOpen] = React.useState(true);
    const [notification, setNotification] = React.useState<any[]>([]);

    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL || 'http://localhost:8080';
    // const baseURL = 'http://localhost:8080';

    if (!baseURL) {
        throw new Error("REACT_APP_ADMIN_API_BASE_URL is not defined");
    }
    
    const userState = useSelector(selectUserState);
    const socket = io(baseURL);

    React.useEffect(() => {
        dispatch(fetchUserProfile());
    }, [!userState]);

    React.useEffect(() => {
        if (userState.id) {
            if (!socket.connected) {
                if (role === 'Employer') {
                    socket.auth = { role: 'employer', userId: userState.id };
                    socket.connect();
                }
                if (role === 'Student') {
                    socket.auth = { role: 'student', userId: userState.id };
                    socket.connect();
                }
            }
        }
    }, [userState]);

    React.useEffect(() => {
        if (socket.connected) {
            console.log('Socket connected');
        }
        socket.on('new-application', (application) => {
            console.log('You received new application !', application.studentId);
            setAnchorEl(document.getElementById('notification-icon'));
            setNotification([...notification, application]);
            setNotificationOpen(true);
        });
    }, [socket]);

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
        const secondHeaderEnabledRoutes = ['analysisPage', 'user', 'profile', 'graduates', 'applications', 'student', 'employer'];
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
        if (currentPath === routes.profile) {
            return lang === 'ru' ? 'Профиль' : lang === 'kz' ? 'Профиль' : 'Profile';
        } else if (currentPath === routes.notifications) {
            return lang === 'ru' ? 'Уведомления' : lang === 'kz' ? 'Хабарландырулар' : 'Notifications';
        } else if (currentPath === routes.addingGraduates) {
            return lang === 'ru' ? 'Выпустить дипломы' : lang === 'kz' ? 'Диплом тапсыру' : 'Issue Diplomas';
        } else if (currentPath === routes.settings) {
            return lang === 'ru' ? 'Настройки' : lang === 'kz' ? 'Параметрлер' : 'Settings';
        } else if (currentPath === routes.analysisPage) {
            return lang === 'ru' ? 'Аналитика' : lang === 'kz' ? 'Аналитика' : 'Analytics';
        } else if (currentPath === routes.resumeGenerator) {
            return lang === 'ru' ? 'Моё резюме' : lang === 'kz' ? 'Түйіндемені құру' : 'My resume';
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
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };
    const closeLogoutModal = () => {
        setShowDropdown({ profile: false, lang: false });
        setIsLogoutModalOpen(false);
    };

    const handleLogoutClick = (item: DropdownItem) => {
        if (item.verticalAlign === "red") {
            openLogoutModal();
        } else {
            setActiveNav(item.id);
            handleCloseMenu();
            navigate(item.to);
        }
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
        setShowDropdown({ profile: false, lang: false });
        setNotificationOpen(false);
    };

    const handleFlagSelect = (language: string) => {
        dispatch(setLanguage(language));
        handleCloseMenu();
    };
    const role = useSelector(selectUserRole);
    const headerText = getHeaderText();
    return (
        <Box
            mb={urlElements.includes('user') || urlElements.includes('detail') || urlElements.includes('diploma') ? "1rem" : ""}>
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
                    <Box sx={{ fontSize: '1.2rem', fontWeight: '600', marginLeft: '1rem' }}>
                        {headerText}
                    </Box>
                    <Box sx={{
                        display: 'flex', alignItems: 'center',
                        '@media (max-width: 1000px)': {
                            gap: ".5rem",
                        },
                    }}>
                        {/* <Input
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
                        /> */}
                        <Box className="app-icon-img">
                            <IconButton
                                style={{
                                    cursor: 'pointer',
                                    minHeight: '2.5rem',
                                    minWidth: '3rem'
                                }}
                                onClick={(event) => {
                                }}
                            >
                                <HeaderSearchIcon />
                            </IconButton>
                        </Box>
                        <Divider orientation="vertical"
                            style={{
                                borderLeftWidth: "1px",
                                borderRightWidth: "0",
                                borderColor: "grey",
                                height: "1.5rem",
                            }} />
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
                            {lang == 'ru' && <img src={RuFlag} alt="Russian" />}
                            {lang == 'en' && <img src={EnFlag} alt="English" />}
                            {lang == 'kz' && <img src={KzFlag} alt="Kazakh" />}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={showDropdown.lang}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={() => handleFlagSelect('ru')} sx={{ fontSize: '1rem' }}>
                                <img src={RuFlag} alt="Russian" style={{ marginRight: '0.5rem' }} />
                                {localization.lang1[lang]}
                            </MenuItem>
                            <MenuItem onClick={() => handleFlagSelect('en')} sx={{ fontSize: '1rem' }}>
                                <img src={EnFlag} alt="English" style={{ marginRight: '0.5rem' }} />
                                {localization.lang3[lang]}
                            </MenuItem>
                            <MenuItem onClick={() => handleFlagSelect('kz')} sx={{ fontSize: '1rem' }}>
                                <img src={KzFlag} alt="French" style={{ marginRight: '0.5rem' }} />
                                {localization.lang2[lang]}                        </MenuItem>
                        </Menu>
                        {/* <NotIcon style={{
                            cursor: 'pointer'
                        }} className="app-icon"
                                 onClick={() => {
                                     navigate(routes.notifications);
                                 }}/> */}
                        <Divider orientation="vertical"
                            style={{
                                borderLeftWidth: "1px",
                                borderRightWidth: "0",
                                borderColor: "grey",
                                height: "1.5rem",
                            }} />
                        {/* <IconButton
                            style={{
                                cursor: 'pointer',
                                minHeight: '2.5rem',
                                width: '3rem'
                            }}
                            onClick={(event) => {
                            }}
                        >
                            <ModeIcon/>
                        </IconButton> */}

                        {/* <Divider orientation="vertical"
                                 style={{
                                     borderLeftWidth: "1px",
                                     borderRightWidth: "0",
                                     borderColor: "grey",
                                     height: "1.5rem",
                                 }}/> */}
                        <IconButton
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={(event) => {
                                handleOpenMenu(event, "profile");
                            }}
                            id="notification-icon"
                        >
                            <AccountCircleIcon style={{ alignSelf: "center" }} />
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
                                            navigate(routes.studentProfile, { replace: true });
                                        } else if (userRole === "Employer") {
                                            navigate(routes.employerProfile, { replace: true });
                                        } else if (userRole === "University") {
                                            navigate(routes.universityProfile, { replace: true });
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
                        <Divider style={{ margin: "0 1rem" }} />
                        {dropdownItemsBottom.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    handleLogoutClick(item);
                                }}
                            >
                                {item.icon}
                                <Typography color={item.verticalAlign}>
                                    {item.name[lang]}
                                </Typography>
                            </MenuItem>
                        ))}
                        <Modal
                            open={isLogoutModalOpen}
                            handleClose={closeLogoutModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                                <Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1.2rem'
                                    fontWeight='600'
                                >
                                    {localization.logout[lang]}
                                </Typography>
                                <Button variant='contained' sx={{
                                    marginTop: "1rem",
                                    padding: "1rem",
                                    width: "80%",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    borderRadius: "2rem"
                                }} onClick={() => {
                                    closeLogoutModal();
                                    dispatch(fetchLogoutAction());
                                    navigate(routes.login);
                                }}>{localization.log[lang]}</Button>
                                <Button variant='outlined' sx={{
                                    marginTop: "1rem",
                                    padding: "1rem",
                                    width: "80%",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    borderRadius: "2rem"
                                }} onClick={() => {
                                    closeLogoutModal();
                                }}>{localization.cancel[lang]}</Button>
                            </Box>
                        </Modal>
                    </Menu>

                </Box>
            ) : (
                <AppBar open={open} sx={{ padding: "0 !important" }} className="app-navbar-container">
                    <Box className="app-navbar" height='5rem'>
                        <Modal open={openModal} handleClose={() => setOpenModal(true)}
                            aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                        {(checkSideBarRoute() || isTablet) ?
                            <img className='diploma-logo' src={AppLogo} onClick={() => {
                                handleActiveNav(0);
                                navigate(routes.main);
                            }} alt="logo" />
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
                            {/* <IconButton
                                    style={{
                                        cursor: 'pointer',
                                        minHeight: '2.5rem',
                                        minWidth: '3rem'
                                    }}
                                >
                                    <HeaderSearchIcon style={{alignSelf: "center"}}/>
                                </IconButton> */}

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
                                {lang == 'ru' && <img src={RuFlag} alt="Russian" />}
                                {lang == 'en' && <img src={EnFlag} alt="English" />}
                                {lang == 'kz' && <img src={KzFlag} alt="Kazakh" />}
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
                                        onClick={(): void => { setMinimized(true); }}
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
                                            {option.name[lang]}
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
                        {dropdownItems.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (index === 0) {
                                        if (role === "Student") {
                                            navigate(routes.studentProfile, { replace: true });
                                        } else if (userRole === "Employer") {
                                            navigate(routes.employerProfile, { replace: true });
                                        } else if (userRole === "University") {
                                            navigate(routes.universityProfile, { replace: true });
                                        }
                                    }
                                    handleLogoutClick(item)
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
                        <Divider style={{ margin: "0 1rem" }} />
                        {dropdownItemsBottom.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    handleLogoutClick(item)
                                }}
                            >
                                {item.icon}
                                <Typography color={item.verticalAlign}>
                                    {item.name[lang]}
                                </Typography>
                            </MenuItem>
                        ))}
                        <Modal
                            open={isLogoutModalOpen}
                            handleClose={closeLogoutModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                                <Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1.2rem'
                                    fontWeight='600'
                                >
                                    {localization.logout[lang]}
                                </Typography>
                                <Button variant='contained' sx={{
                                    marginTop: "1rem",
                                    padding: "1rem",
                                    width: "80%",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    borderRadius: "2rem"
                                }} onClick={() => {
                                    closeLogoutModal();
                                    dispatch(fetchLogoutAction());
                                    navigate(routes.login);
                                }}>{localization.log[lang]}</Button>
                                <Button variant='outlined' sx={{
                                    marginTop: "1rem",
                                    padding: "1rem",
                                    width: "80%",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    borderRadius: "2rem"
                                }} onClick={() => {
                                    closeLogoutModal();
                                }}>{localization.cancel[lang]}</Button>
                            </Box>
                        </Modal>

                    </Menu>
                    <StyledMenu
                        open={notificationOpen}
                        anchorEl={anchorEl}
                        onClose={handleCloseMenu}
                    // sx={{ '& > *': {borderRadius: '1rem'} }}
                    >
                        <Box sx={{ paddingX: '1.5rem', paddingY: '1rem', width: 'fit-content' }}>
                            <Box sx={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem',
                                width: '100%'
                            }}>
                                <Typography sx={{
                                    fontSize: '1.5rem', fontWeight: '600', color: '#293357'
                                }}>
                                    Уведомления
                                </Typography>
                                <Box sx={{ cursor: 'pointer' }} onClick={()=>{handleCloseMenu()}}>
                                    <CheckNote/>
                                </Box>
                            </Box>
                            {notifications.map((el, index) => (
                                <MenuItem key={index} onClick={()=>{navigate('/applications')}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '0.75rem', }}>
                                        <Box sx={{
                                            width: '2.5rem', height: '2.5rem', borderRadius: '1.25rem', backgroundColor: '#E9F9EF',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        }}>
                                            <GreenNote/>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem'
                                        }}>
                                            <Box>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: '#58607C', marginBottom: '0.1rem' }}>
                                                    Заявки на работу (+{notification.length})
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.75rem', fontWeight: '400', color: '#9499AB' }}>
                                                    У вас новые заявки на вакансии
                                                </Typography>
                                            </Box>
                                            <Typography sx={{ fontSize: '0.75rem', fontWeight: '400', color: '#9499AB' }}>
                                                07.05.2024
                                            </Typography>
                                        </Box>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Box>
                    </StyledMenu>
                    {/*<Modal*/}
                    {/*	open={isLogoutModalOpen}*/}
                    {/*	handleClose={closeLogoutModal}*/}
                    {/*	aria-labelledby="modal-modal-title"*/}
                    {/*	aria-describedby="modal-modal-description"*/}
                    {/*>*/}
                    {/*	<Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>*/}

                    {/*		<Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1.2rem'*/}
                    {/*			fontWeight='600'*/}
                    {/*		>*/}
                    {/*			{localization.logout[lang]}*/}
                    {/*		</Typography>*/}
                    {/*		<Button variant='contained' sx={{*/}
                    {/*			marginTop: "1rem",*/}
                    {/*			padding: "1rem",*/}
                    {/*			width: "80%",*/}
                    {/*			fontSize: "1rem",*/}
                    {/*			fontWeight: "600",*/}
                    {/*			borderRadius: "2rem"*/}
                    {/*		}} onClick={() => {*/}
                    {/*			closeLogoutModal();*/}
                    {/*			dispatch(fetchLogoutAction());*/}
                    {/*			navigate(routes.login);*/}

                    {/*		}}>{localization.log[lang]}</Button>*/}
                    {/*		<Button variant='outlined' sx={{*/}
                    {/*			marginTop: "1rem",*/}
                    {/*			padding: "1rem",*/}
                    {/*			width: "80%",*/}
                    {/*			fontSize: "1rem",*/}
                    {/*			fontWeight: "600",*/}
                    {/*			borderRadius: "2rem"*/}
                    {/*		}} onClick={() => {*/}
                    {/*			closeLogoutModal();*/}
                    {/*		}}>{localization.cancel[lang]}</Button>*/}
                    {/*	</Box>*/}
                    {/*</Modal>*/}
                    <Menu
                        anchorEl={anchorEl}
                        open={showDropdown.lang}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => handleFlagSelect('ru')} sx={{ fontSize: '1rem' }}>
                            <img src={RuFlag} alt="Russian" style={{ marginRight: '0.5rem' }} />
                            {localization.lang1[lang]}
                        </MenuItem>
                        <MenuItem onClick={() => handleFlagSelect('en')} sx={{ fontSize: '1rem' }}>
                            <img src={EnFlag} alt="English" style={{ marginRight: '0.5rem' }} />
                            {localization.lang3[lang]}
                        </MenuItem>
                        <MenuItem onClick={() => handleFlagSelect('kz')} sx={{ fontSize: '1rem' }}>
                            <img src={KzFlag} alt="French" style={{ marginRight: '0.5rem' }} />
                            {localization.lang2[lang]}                        </MenuItem>
                    </Menu>
                    <GlobalLoader />
                </AppBar>
            )
            }
        </Box>
    );
};
export const Header = React.memo(AppHeader);
