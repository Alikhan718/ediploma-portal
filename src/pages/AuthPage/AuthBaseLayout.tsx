import React from 'react';

import {Box, CardContent, Typography} from '@mui/material';
import {IAuthPageBase} from "@src/pages/AuthPage/types";
import {isAuthenticated} from '@src/utils/userAuth';
import BrandIcon from '@src/assets/icons/brand.svg';
import BrandIconWhite from '@src/assets/icons/brand_white.svg';
import ModeIcon from '@src/assets/icons/Mode.svg';
import {ReactComponent as Web} from '@src/assets/auth/web.svg';

import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";
import styles from "./AuthPage.module.css";
import {selectUserRole} from "@src/store/auth/selector";
import {useSelector} from "react-redux";
import cn from "classnames";

export const AuthBasePageLayout: React.FC<IAuthPageBase> = (props) => {
    const {children} = props;
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);
    React.useEffect(() => {
        const urlElements = window.location.href.split('/');

        if (isAuthenticated() && urlElements.includes('auth')) {
            console.log("State Role", userRole);
            console.log("LocalStore token:", localStorage.getItem('token'));
            console.log("LocalStore role:", localStorage.getItem('role'));
            navigate(routes.profile, {replace: true});
        }
    }, [userRole]);


    return (
        <Box className={styles.container}
             sx={{
                 backgroundColor: "white",
             }}>
            <Box className={styles.navbar}>
                <img src={BrandIcon} className={cn(styles.brand, styles.navItemLg)} onClick={() => {
                    navigate(routes.main);
                }}/>
                <img src={ModeIcon} style={{cursor: "pointer"}} className={styles.navItemLg} onClick={() => {
                }}/>
                <img src={BrandIconWhite} className={cn(styles.brand, styles.navItemSm)} onClick={() => {
                    navigate(routes.main);
                }}/>
            </Box>
            <Box className={styles.contentLeft}>
                <Box sx={{
                    marginY: 'auto', borderRadius: '.8rem', padding: '.6rem', width: "30rem",
                    '@media (max-width: 1000px)': {
                        padding: '.8rem',
                        width: 'inherit',
                    }
                }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            borderRadius: "2rem",
                            justifyContent: 'space-between',
                            backgroundColor: "white",
                            '@media (max-width: 1000px)': {
                                padding: '2rem !important',
                            }
                        }}
                    >
                        {children}
                    </CardContent>
                </Box>
            </Box>
            <Box className={styles.containerRight}>
            </Box>
            <Box className={styles.footerAuth}>
                <Typography fontSize="0.75rem">
                    © 2023 Все права защищены
                </Typography>
                <Box display="flex" flex="row" width="35vw" className={styles.footerRightItemsMob}
                     justifyContent="space-between" color="white">
                    <Typography fontSize="0.75rem">
                        Политика конфиденциальности
                    </Typography>
                    <Typography fontSize="0.75rem">
                        Пользовательское соглашение
                    </Typography><Typography fontSize="0.75rem">
                    Помощь
                </Typography>
                </Box>
            </Box>
        </Box>
    );
};

