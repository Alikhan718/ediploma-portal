import React, {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {Header} from './Header/Header';
import {LayoutProps} from './Layout.props';
import {Sidebar} from './Sidebar/Sidebar';
import {selectGlobalIsLoading} from '@src/store/generals/selectors';
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";

export const DRAWER_WIDTH = "17%";

const AppLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
    const {children} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isGLoading = useSelector(selectGlobalIsLoading);

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = React.useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    const checkRoute = (): boolean => {
        const urlElements = window.location.href.split('/');
        const sidebarEnabledRoutes = ['detail', 'notifications', 'addingGraduates'];
        for (const item of sidebarEnabledRoutes) {
            if (urlElements.includes(item)) {
                return true;
            }
        }
        return false;
    };

    const urlElements = window.location.href.split('/');
    const isAuthenticatedUser = isAuthenticated();

    const [isSidebarVisible, setIsSidebarVisible] = useState(!checkRoute());
    const [isHeaderVisible, setHeaderVisible] = useState(false);
    console.log("Lay isSidebarVisible", isSidebarVisible);
    const handleWindowResize = () => {
        const windowWidth = window.innerWidth;
        const tabletBreakpoint = 998;
        setIsSidebarVisible(windowWidth >= tabletBreakpoint);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <Box display='flex' height='100%' sx={{backgroundColor: "#FAFBFF"}}>
            <Sidebar open={isSidebarVisible} setOpen={setIsSidebarVisible} toggleDrawer={toggleDrawer}/>
            <Box
                mt={!urlElements.includes('auth') ? '1rem' : "0"}
                width='100%'
                height='100vh'
                p={"0"}
                position='relative'
            >
                <Box>
                    <Header isSideBarOpen={isSidebarVisible} setOpen={setHeaderVisible}/>
                    {isGLoading && (
                        <Box position='absolute' zIndex={10} top={0} bottom={0} left={0} right={0}
                             bgcolor='rgba(255, 255, 255, 0.6)'/>
                    )}
                    {children}
                </Box>
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
