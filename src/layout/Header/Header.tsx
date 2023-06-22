import React from 'react';

import LocationIcon from '@src/assets/icons/location.png';
import MenuIcon from '@src/assets/icons/menu lines.svg';
import BrandIcon from '@src/assets/icons/brand.svg';
import {ReactComponent as UserIcon} from '@src/assets/icons/user.svg';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {ReactComponent as FilterIcon} from '@src/assets/icons/Filter-icon.svg';
import {privateNavigations} from "@src/layout/Header/generator";
import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    styled,
    Typography,
    Box,
    LinearProgress,
    MenuItem,
    InputAdornment,
    ListSubheader, Divider
} from '@mui/material';

import {HeaderProps} from './Header.props';

import {DRAWER_WIDTH} from '../Layout';
import {TextFieldSelect} from '@src/components/TextFieldSelect/TexttFieldSelect';

import {GlobalLoader} from './GlobalLoader';

import {Button, Input} from '@src/components';
import {NavLink} from "react-router-dom";


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
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const AppHeader: React.FC<HeaderProps> = (props) => {
    const {open, locations, restaurantId, handleRestaurantId} = props;


    const [search, setSearch] = React.useState("");

    const handleRestChange = (e: any): void => {
        handleRestaurantId(e.target.value);
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    const filterLocations = React.useMemo(() => {
        if (locations.length) {
            return locations.filter((item: any) => item.name.toLowerCase().includes(search.toLocaleLowerCase()));
        }
        return [];
    }, [search, locations]);
    const userRole = JSON.parse(localStorage.getItem("userRole") || '[]') || "";

    const handleDeliveryName = (delivery: string): string => {
        return delivery.charAt(0).toUpperCase() + delivery.slice(1);
    }
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
            <Box display="flex" justifyContent="space-between" gap={'1.5rem'} height={'4rem'} alignItems="center">
                {/*<img src={MenuIcon}/>*/}
                <img style={{marginLeft:"3rem"}} src={BrandIcon}/>
                {privateNavigations.map(nav => (
                    <NavLink
                        to={nav.to}
                        key={nav.id}
                        className={(props) => handleClassName(props.isActive, nav.id)}
                    >
                        <Typography
                            variant='h4'
                            color={activeNav === nav.id ? '#0A66C2' : 'gray'}
                            fontWeight='450'>
                            {nav.name}
                        </Typography>
                    </NavLink>
                ))}
                <Input placeholder='Найти по ФИО, специальности и номеру диплома' fullWidth={true} inputSize='s' onChange={handleSearch} startAdornment={<SearchIcon/>} endAdornment={<FilterIcon/>}/>

                {/* REST SELECTOR  */}
                <Box display='flex' justifyContent='flex-end' py='10px' pr='1.5rem'>
                    <Button
                        onClick={() => {
                        }}
                        startIcon={<UserIcon style={{height: "1.2rem"}}/>}
                        variant='contained'
                    >
                        <Typography
                            variant='h4'
                            color={'white'}
                            fontSize={'16px'}
                            fontWeight='450'>
                            Войти
                        </Typography>

                    </Button>
                </Box>
            </Box>
            <GlobalLoader/>
            <Divider/>
        </AppBar>
    );
};
export const Header = React.memo(AppHeader);
