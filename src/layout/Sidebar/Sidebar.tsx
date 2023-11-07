import React, { useState } from 'react';
import {
    Drawer,
    styled,
    Theme,
    CSSObject,
    DrawerProps,
    Box,
    Typography,
    CircularProgress,
    Divider
} from '@mui/material';
import { Button, Input, Modal } from '@src/components';
import AppLogo from '@src/assets/icons/app-logo.svg';
import {SidebarProps} from './Sidebar.props';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {selectAuthLoader, selectUserRole} from '@src/store/auth/selector';
import {useDispatch, useSelector} from 'react-redux';
import {sidebarNavigations, dropdownItemsBottom, localization} from "@src/layout/Header/generator";
import {DRAWER_WIDTH} from '../Layout';
import {routes} from "@src/shared/routes";
import icon from "@src/assets/icons/Logo (2).svg";
import {selectLanguage} from "@src/store/generals/selectors";
import {fetchLogoutAction} from "@src/store/auth/actionCreators";


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


export const AppSidebar: React.FC<SidebarProps> = (props): JSX.Element => {
    const lang = useSelector(selectLanguage);
    const role = useSelector(selectUserRole);

    const location = useLocation();
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
        const sidebarEnabledRoutes = ['analysisPage', 'addingGraduates', 'details', 'user', 'profile', 'graduates'];
        for (const item of sidebarEnabledRoutes) {
            if (urlElements.includes(item)) {
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
    const dispatch = useDispatch();
    return (
        <>
            {!isTablet && (
                <CustomDrawer variant="permanent" open={isSidebarVisible}>
                    {!authLoader ? (
                        <Box sx={{height: '100vh'}}>
                            <Box sx={{height: '100%'}}>
                                <img
                                    src={AppLogo}
                                    onClick={() => navigate(routes.main)}
                                    style={{
                                        width: '75%',
                                        cursor: "pointer",
                                        margin: "1rem"
                                    }}
                                />
                                <Divider style={{marginBottom: "1rem" }}/>

                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingX: '.5rem',
                                    height: '85%'
                                }}>
                                    <Box>
                                        {sidebarNavigations.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map(nav => (
                                            <NavLink
                                                to={nav.to}
                                                key={nav.id}
                                                onClick={() => setActiveNav(nav.id)}
                                                className={(props) => handleClassName(props.isActive, nav.id)}
                                                style={{
                                                    display: 'flex', flexDirection: 'row',
                                                    background: `${activeNav === nav.id ? '#3B82F6' : 'unset'}`,
                                                    padding: '15px',
                                                    borderRadius: '19px'
                                                }}
                                            >
                                                <Box mr='18px' ml='8px'
                                                     style={{
                                                         filter: activeNav === nav.id ? "brightness(4)" : "",
                                                         verticalAlign: nav.verticalAlign
                                                     }}>
                                                    {nav.icon}
                                                </Box>
                                                <Typography
                                                    color={activeNav === nav.id ? 'white' : '#697B7A'}
                                                    fontWeight='600'
                                                    alignSelf="center"
                                                    sx={{fontSize: '14px'}}
                                                >
                                                    {nav.name[lang]}
                                                </Typography>
                                            </NavLink>)
                                        )}

                                    </Box>
                                    <Box display="flex" height="100%" justifyContent="space-between"
                                         flexDirection="column"
                                         sx={{marginY: "auto", padding: '10px', paddingBottom: "0"}}>
                                        <Typography sx={{
                                            color: '#B6B6B6',
                                            fontSize: '16px',
                                        }}>{localization.account[lang]}</Typography>
                                        {dropdownItemsBottom.filter((item) => item.role.includes(role.toLowerCase()) || item.role.includes('*')).map((item, index) => (
                                            <NavLink
                                                to={item.to}
                                                key={index}
                                                style={{
                                                    marginTop: "0.5rem",
                                                }}
                                                onClick={() => {
                                                    if (item.verticalAlign == "red") {
                                                        dispatch(fetchLogoutAction());
                                                    }
                                                    setActiveNav(item.id);
                                                }}
                                                className={(props) => handleClassName(props.isActive, item.id)}
                                            >
                                                <Button fullWidth sx={{
                                                    color: '#697B7A',
                                                    borderRadius: '19px',
                                                    background: `${activeNav === item.id ? '#3B82F6' : 'unset'}`,
                                                    fontSize: '16px',
                                                    '&:hover': {
                                                        background: `${activeNav === item.id ? '#3B82F6' : 'unset'}`,
                                                    },
                                                }}
                                                        onClick={() => {
                                                            if (item.function) {
                                                                item.function();
                                                            }
                                                            handleCloseMenu();
                                                            navigate(item.to);
                                                        }}>
                                                    <Box mr="auto" display="flex"
                                                         style={{filter: activeNav === item.id ? "brightness(10)" : "",}}>
                                                        {item.icon}
                                                        <Typography
                                                            color={activeNav === item.id ? 'white' : item.verticalAlign ?? '#697B7A'}
                                                            variant='h4'
                                                            fontSize={'16px'}
                                                            className="diploma-navbar-item"
                                                            fontWeight='450'>
                                                            {item.name[lang]}
                                                        </Typography>
                                                    </Box>

                                                </Button>
                                            </NavLink>
                                        ))}


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
                                             onClick={() => {
                                                 navigate(routes.aboutUs);
                                             }}

                                        >
                                            <img src={icon} style={{position: "absolute", top: "-40%"}}/>
                                            <Typography sx={{
                                                fontSize: '16px',
                                                padding: '10px',
                                                color: 'white',
                                                whiteSpace: 'pre-line',
                                                textAlign: 'center'
                                            }}>
                                                {localization.contactUs[lang]}
                                            </Typography>
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
