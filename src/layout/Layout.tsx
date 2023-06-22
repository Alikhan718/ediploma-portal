import React from 'react';

import {Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import {Header} from './Header/Header';
import {LayoutProps} from './Layout.props';
import {Sidebar} from './Sidebar/Sidebar';
import {selectGlobalIsLoading} from '@src/store/generals/selectors';
import {setCurrentLocation} from '@src/store/locations/reducer';
import {selectAllLocations, selectCurrentLocation} from '@src/store/locations/selector';
import {selectMenuList} from '@src/store/menulist/selector';
import {fetchMenuList} from '@src/store/menulist/actionCreators';
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";

export const DRAWER_WIDTH = 270;

const AppLayout: React.FC<LayoutProps> = (props: LayoutProps) => {

    const {children} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const currLocation = useSelector(selectCurrentLocation);
    const locations = useSelector(selectAllLocations);
    const isGLoading = useSelector(selectGlobalIsLoading);
    const menuList = useSelector(selectMenuList);


    const [open, setOpen] = React.useState(false);
    const [restaurantId, setRestaurantId] = React.useState('');

    const toggleDrawer = React.useCallback((): void => {
        setOpen((prevState) => !prevState);
    }, []);
    const handleRestaurantId = React.useCallback((restId: string): void => {
        const url_arr = location.pathname.split("/");
        dispatch(setCurrentLocation(restId));
        setRestaurantId(restId);
        if (url_arr.indexOf("configure") !== -1) {
            navigate("/app/menu");
        }
    }, []);

    React.useEffect(() => {
        setRestaurantId(currLocation);
    }, [currLocation]);

    React.useEffect(() => {
        const urlElements = window.location.href.split('/');
        if (!urlElements.includes('auth') && !localStorage.getItem('token')) {
            navigate(routes.login, {replace: true});
        }
        if (isAuthenticated() && urlElements.includes('auth')) {
            console.log(urlElements)
            navigate(routes.main, {replace: true});
        }
    }, []);
    return (
        <Box display='flex' height='100%'>
            {isAuthenticated() && <Header
                open={open}
                locations={locations}
                currLocation={currLocation}
                restaurantId={restaurantId}
                handleRestaurantId={handleRestaurantId}
                menuList={menuList.filter((item: { is_active: boolean, is_deleted: boolean }) => item.is_active && !item.is_deleted)}
            />}

            {/*<Sidebar open={open} toggleDrawer={toggleDrawer} />*/}

            <Box
                mt='50px'
                width='100%'
                p='25px 40px'
                position='relative'>

                {isGLoading && <Box position='absolute' zIndex={10} top={0} bottom={0} left={0} right={0}
                                    bgcolor='rgba(255, 255, 255, 0.6)'/>}

                {children}

            </Box>

        </Box>
    );
};

const Layout = React.memo(AppLayout);


export const withLayout = <T extends Record<string, unknown>>(Component: React.FC<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};