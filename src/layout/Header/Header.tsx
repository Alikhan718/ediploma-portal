import React, {useState, useEffect} from 'react';
import MenuIcon from '@src/assets/icons/menu.svg';
import AppLogo from '@src/assets/icons/app-logo.svg';
import HeaderSearchIcon from '@src/assets/icons/search.svg';
import RuFlag from '@src/assets/icons/ru-flag.svg';
import {ReactComponent as UserIcon} from '@src/assets/icons/user.svg';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {ReactComponent as FilterIcon} from '@src/assets/icons/Filter-icon.svg';
import LogoutIcon from '@src/assets/icons/out.png';
import {headerNavigations, sidebarNavigations} from "@src/layout/Header/generator";
import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Box,
    Divider,
    styled,
    Typography,
    useMediaQuery
} from '@mui/material';
import {HeaderProps} from './Header.props';
import {GlobalLoader} from './GlobalLoader';
import {Button, Input, Modal} from '@src/components';
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthLogout} from "@src/store/auth/saga";
import {fetchSearch} from "@src/store/diplomas/actionCreators";
import {selectSearchText} from "@src/store/diplomas/selectors";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import {Sidebar} from '../Sidebar/Sidebar';

interface AppBarProps extends MuiAppBarProps {
    open: boolean;
}


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({theme, open}) => ({
    // width: `calc(100% - ${theme.spacing(7)})`,
    boxShadow: 'none',
    position: 'unset',
    display: "none",
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
    // const getQueryWidth = () => {
    //     const matchesLg = useMediaQuery('(min-width:1200px)');
    //     const matchesMd = useMediaQuery('(max-width:1180px)');
    //     const matchesSm = useMediaQuery('(max-width:768px)');
    //     const matchesXs = useMediaQuery('(max-width:576px)');
    //     console.log(1);
    //     if (matchesXs) return "80%";
    //     if (matchesSm) return "60%";
    //     if (matchesMd) return "40%";
    //     if (matchesLg) return "25%";
    // };
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
        ];
        console.log(2);

        for (const item of sidebarEnabledRoutes) {
            if (urlElements.includes(item)) {
                return true;
            }
        }
        return false;
    };
    const checkSideBarRoute = (): boolean => {
        console.log(3);

        const sidebarEnabledRoutes = ['detail', 'notifications', 'addingGraduates', 'settingsPage'];
        for (const item of sidebarEnabledRoutes) {
            if (urlElements.includes(item)) {
                return false;
            }
        }
        return true;
    };

    React.useEffect(() => {
        setOpen(checkRoute());
    }, [urlElements]);

    const userRole = localStorage.getItem("userRole");

    return (
        <AppBar open={open}>
            <Box className="diploma-navbar" height='4rem'>
                {/*<Modal*/}
                {/*    open={openModal}*/}
                {/*    handleClose={() => setOpenModal(true)}*/}
                {/*    width={getQueryWidth()}*/}
                {/*    aria-labelledby="modal-modal-title"*/}
                {/*    aria-describedby="modal-modal-description"*/}
                {/*>*/}
                {/*    <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>*/}

                {/*        <img src={NeedAuthorizationPic} alt=""/>*/}
                {/*        <Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'*/}
                {/*                    fontWeight='600'*/}
                {/*                    variant="h6"*/}
                {/*                    component="h2">*/}
                {/*            Для использования требуется авторизация*/}
                {/*        </Typography>*/}
                {/*        <Button variant='contained' sx={{*/}
                {/*            marginTop: "1rem",*/}
                {/*            padding: "1rem",*/}
                {/*            width: "80%",*/}
                {/*            fontSize: "1rem",*/}
                {/*            fontWeight: "600",*/}
                {/*            borderRadius: "2rem"*/}
                {/*        }} onClick={() => {*/}
                {/*            navigate(routes.login);*/}
                {/*        }}>Авторизоваться</Button>*/}
                {/*    </Box>*/}
                {/*</Modal>*/}
                {checkSideBarRoute() && <img className='diploma-logo' src={AppLogo} onClick={() => {
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


                {/*<Box className="diploma-navbar-item" width="100%">*/}
                {/*    {!window.location.href.split('/').includes('main') && !window.location.href.split('/').includes('university') && !window.location.href.split('/').includes('university') &&*/}
                {/*        (<Input placeholder='Найти по ФИО' fullWidth={true} inputSize='s'*/}
                {/*               value={filterAttributes.text}*/}
                {/*               onChange={handleSearch} startAdornment={<SearchIcon/>}*/}
                {/*               endAdornment={*/}
                {/*                   <FilterIcon*/}
                {/*                       style={{cursor: "pointer"}}*/}
                {/*                       onClick={() => {*/}
                {/*                           if (isAuthenticated()) {*/}
                {/*                               setShowFilter(!showFilter);*/}
                {/*                           }*/}
                {/*                           else {*/}
                {/*                               setOpenModal(true);*/}
                {/*                           }*/}
                {/*                       }}*/}
                {/*                   />}*/}
                {/*        />)}*/}
                {/*</Box>*/}
                {/*<FilterSection*/}
                {/*    triggerSearchFilters={triggerSearchFilters}*/}
                {/*    filterAttributes={filterAttributes}*/}
                {/*    setFilterAttributes={setFilterAttributes}*/}
                {/*    open={showFilter}*/}
                {/*    setOpen={setShowFilter}*/}
                {/*/>*/}

                <Box display='flex' ml="auto" gap="2rem" py='10px' className="diploma-btn-container">

                    <img style={{
                        cursor: 'pointer'
                    }} src={HeaderSearchIcon} alt=""/>
                    <img style={{
                        cursor: 'pointer'
                    }} src={RuFlag} alt=""/>

                    {!isAuthenticated() ? <Button
                            onClick={() => {
                                navigate(routes.login, {replace: true});
                            }}
                            className="diploma-auth-btn"
                            startIcon={<UserIcon style={{height: "1.2rem"}}/>}
                            variant='contained'
                            borderRadius="3rem"
                            width={120}
                        >
                            <Typography
                                variant='h4'
                                color={'white'}
                                fontSize={'16px'}
                                className="diploma-navbar-item"
                                fontWeight='450'>
                                Войти
                            </Typography>

                        </Button>
                        :
                        <Button
                            className="diploma-auth-btn"
                            onClick={() => {
                                fetchAuthLogout();
                                localStorage.clear();
                                navigate(routes.login, {replace: true});
                            }}
                            borderRadius="3rem"
                            startIcon={<img src={LogoutIcon} style={{height: "1rem"}}/>}
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

                    }

                    <img src={MenuIcon} onClick={() => {
                        setOpen(!open);
                    }} className="menu-icon"/>
                </Box>
            </Box>
            <GlobalLoader/>
        </AppBar>
    );
};
export const Header = React.memo(AppHeader);
