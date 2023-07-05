import React from 'react';

import MenuIcon from '@src/assets/icons/menu lines.svg';
import BrandIcon from '@src/assets/icons/brand.svg';
import {ReactComponent as UserIcon} from '@src/assets/icons/user.svg';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {ReactComponent as FilterIcon} from '@src/assets/icons/Filter-icon.svg';
import LogoutIcon from '@src/assets/icons/out.png';
import {privateNavigations} from "@src/layout/Header/generator";
import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    styled,
    Typography,
    Box,
    Divider
} from '@mui/material';

import {HeaderProps} from './Header.props';


import {GlobalLoader} from './GlobalLoader';

import {Button, Input} from '@src/components';
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import {useDispatch} from "react-redux";
import {fetchAuthLogout} from "@src/store/auth/saga";
import {fetchSearch} from "@src/store/diplomas/actionCreators";


interface AppBarProps extends MuiAppBarProps {
    open: boolean;
}


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({theme, open}) => ({
    // width: `calc(100% - ${theme.spacing(7)})`,
    boxShadow: 'none',
    backgroundColor: '#ffffff',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        // marginLeft: DRAWER_WIDTH,
        // width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export interface FilterAttributes {
    text?: string,
    specialities?: string;
    region?: string;
    year?: number;
    gpaL?: number;
    gpaR?: number;
}

const AppHeader: React.FC<HeaderProps> = (props) => {
    const {open, setOpen} = props;

    const [showFilter, setShowFilter] = React.useState(false);

    const navigate = useNavigate();

    const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
        text: "",
        specialities: "",
        region: "",
        year: 0,
        gpaL: 0,
        gpaR: 0,
    });


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterAttributes({...filterAttributes, text: e.target.value.trim()})
        if(e.target.value.trim().length >= 2) {
            triggerSearchFilters();
        }
    };
    const triggerSearchFilters = () => {
        dispatch(fetchSearch(filterAttributes));
    };
    const dispatch = useDispatch();
    const userRole = localStorage.getItem("userRole") || "";

    const [activeNav, setActiveNav] = React.useState(0);

    const handleActiveNav = (navId: number): void => {
        setActiveNav(navId);
    };
    const handleClassName = (isActive: boolean, id: number): string | undefined => {
        isActive && handleActiveNav(id);
        return "";
    };
    return (
        <AppBar position="fixed" open={open}>
            <Box className="diploma-navbar" height='4rem'>
                <img src={MenuIcon} onClick={() => {
                    setOpen(!open);
                }} className="menu-icon"/>
                <img className='diploma-logo' src={BrandIcon} onClick={() => {
                    navigate(routes.main);
                }} alt="logo"/>
                {privateNavigations.map(nav => (
                    <NavLink
                        to={nav.to}
                        key={nav.id}
                        className={(props) => handleClassName(props.isActive, nav.id) + "diploma-navbar-item"}
                    >
                        <Typography
                            variant='h4'
                            color={activeNav === nav.id ? '#0A66C2' : 'gray'}
                            fontWeight='450'>
                            {nav.name}
                        </Typography>
                    </NavLink>
                ))}
                <Box className="diploma-navbar-item" width="100%">
                    {!window.location.href.split('/').includes('main') && !window.location.href.split('/').includes('univeristy') &&
                        <Input placeholder='Найти по ФИО' fullWidth={true} inputSize='s'
                               onChange={handleSearch} startAdornment={<SearchIcon/>}
                               endAdornment={<FilterIcon style={{cursor: "pointer"}} onClick={() => {
                                   setShowFilter(!showFilter);
                               }}/>}/>
                    }</Box>
                <FilterSection triggerSearchFilters={triggerSearchFilters} filterAttributes={filterAttributes}
                               setFilterAttributes={setFilterAttributes} open={showFilter} setOpen={setShowFilter}/>
                {/* REST SELECTOR  */}
                <Box display='flex' justifyContent='flex-end' py='10px' className="diploma-btn-container">
                    {!isAuthenticated() ? <Button
                            onClick={() => {
                                navigate(routes.login, {replace: true});
                            }}
                            className="diploma-auth-btn"
                            startIcon={<UserIcon style={{height: "1.2rem"}}/>}
                            variant='contained'
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
                            startIcon={<img src={LogoutIcon} style={{height: "1rem"}}/>}
                            variant='contained'
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
                </Box>
            </Box>
            <GlobalLoader/>
            <Divider/>
        </AppBar>
    );
};
export const Header = React.memo(AppHeader);
