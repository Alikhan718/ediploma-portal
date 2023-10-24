import React, {useState} from 'react';
import {
    Drawer,
    styled,
    Theme,
    CSSObject,
    DrawerProps,
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import out from "./../../assets/icons/Logout.svg";
import settings from "./../../assets/icons/Settings.svg"
import {Button, Input, Modal} from '@src/components';
import AppLogo from '@src/assets/icons/app-logo.svg';
import {SidebarProps} from './Sidebar.props';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {selectAuthLoader, selectUserRole} from '@src/store/auth/selector';
import {useSelector} from 'react-redux';
import {sidebarNavigations} from "@src/layout/Header/generator";
import {DRAWER_WIDTH} from '../Layout';
import {routes} from "@src/shared/routes";
import {fetchAuthLogout} from "@src/store/auth/saga";
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
    }),
    '@media (max-width: 1000px)': {
        display: 'none !important',
    },
});

const CustomDrawer = styled(Drawer, {shouldForwardProp: (prop) => prop !== 'open'})<ICustomDrawer>(
    ({theme, open}) => ({
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

const role = localStorage.getItem("userRole");

export const AppSidebar: React.FC<SidebarProps> = (props): JSX.Element => {
    const location = useLocation();
    // console.log('pathname', location.pathname);
    const {open, toggleDrawer} = props;
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
    const checkRoute = (): boolean => {
        const urlElements = window.location.href.split('/');
        const sidebarEnabledRoutes = ['user', 'profile', 'graduates'];
        for (const item of sidebarEnabledRoutes) {
            if (urlElements.includes(item)) {
                // console.log(item);
                return true;
            }
        }
        return false;
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const [isSidebarVisible, setIsSidebarVisible] = useState(checkRoute());

    const tabletBreakpoint = 992;
    const isTablet = window.innerWidth < tabletBreakpoint;

    React.useEffect(() => {
        setIsSidebarVisible(checkRoute);
    });

    return (
        <>
            {!isTablet && (
                <CustomDrawer variant="permanent" open={isSidebarVisible}>
                    {!authLoader ? (
                        <Box sx={{height: '100vh'}}>
                            <Box p={`1.5rem 0 0 10px`} sx={{height: '100%'}}>
                                <img
                                    src={AppLogo}
                                    onClick={() => navigate(routes.main)}
                                    style={{
                                        width: '75%',
                                        cursor: "pointer",
                                        margin: "1rem"
                                    }}
                                />
                                <Box sx={{
                                    borderBottom: '1px solid #F8F8F8',
                                    paddingBottom: '24px',
                                    marginBottom: '24px'
                                }}></Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '80%'
                                }}>
                                    <Box>
                                        {sidebarNavigations.map(nav => (
                                            <NavLink
                                                to={nav.to}
                                                key={nav.id}
                                                onClick={() => setActiveNav(nav.id)}
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
                                            </NavLink>)
                                        )}

                                    </Box>
                                    <Box display="flex" height="100%" justifyContent="space-between" flexDirection="column"
                                         sx={{marginTop: '3rem', padding: '10px'}}>
                                        <Typography sx={{color: '#B6B6B6', fontSize: '16px',}}>Аккаунт</Typography>

                                        <Box mt="0.5rem" sx={{marginRight: '50px'}}>
                                            <Button sx={{color: '#697B7A', fontSize: '16px'}}
                                                    onClick={() => navigate(routes.settings)}>
                                                <img src={settings} style={{marginRight: '10px',}}/>Настройки
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() => {
                                                    fetchAuthLogout();
                                                    localStorage.clear();
                                                    navigate(routes.login);
                                                }}
                                                variant='text'
                                                width={120}
                                            >
                                                <img src={out} style={{marginRight: '10px'}}/>
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
                                            backgroundColor: '#3B82F6',
                                            width: '100%',
                                            borderRadius: '20px',
                                            marginTop: 'auto',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            position: 'relative',
                                            paddingTop: "2rem",
                                            paddingBottom: "1rem",
                                            cursor: "pointer",
                                        }}
                                            onClick={()=> {navigate(routes.aboutUs)}}

                                        >
                                            <img src={icon} style={{position: "absolute", top: "-40%"}}/>
                                            <Typography sx={{
                                                fontSize: '16px',
                                                padding: '10px',
                                                color: 'white ',
                                                textAlign: 'center'
                                            }}>
                                                Появились вопросы? <br/> Свяжитесь с нами!
                                            </Typography>
                                            {/*<Box sx={{ color: 'white', marginBottom: '20px' }}>*/}
                                            {/*	Dashboard*/}
                                            {/*</Box>*/}
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <CircularProgress color="warning"/>
                    )}


                </CustomDrawer>
            )}
        </>
    );
};

export const Sidebar = React.memo(AppSidebar);