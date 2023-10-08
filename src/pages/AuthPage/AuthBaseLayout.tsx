import React from 'react';

import { Box, Typography } from '@mui/material';
import { IAuthPageBase } from "@src/pages/AuthPage/types";
import { isAuthenticated } from '@src/utils/userAuth';
import BrandIcon from '@src/assets/icons/brand.svg';
import ModeIcon from '@src/assets/icons/Mode.svg';
import { ReactComponent as Web } from '@src/assets/auth/web.svg';

import { routes } from "@src/shared/routes";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import {selectUserRole} from "@src/store/auth/selector";
import {useSelector} from "react-redux";
export const AuthBasePageLayout: React.FC<IAuthPageBase> = (props) => {
    const role = useSelector(selectUserRole);
    const {children} = props;
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);
    React.useEffect(() => {
        const urlElements = window.location.href.split('/');

        if (isAuthenticated() && urlElements.includes('auth')) {
            navigate(routes[role.toLowerCase()], {replace: true});
        }
    }, [userRole]);


    return (
        <Box className={styles.container}>
            <Box className={styles.navbar}>
                <img src={BrandIcon} className={styles.brand} onClick={() => {
                    navigate(routes.main);
                }}/>
                <img src={ModeIcon} style={{cursor: "pointer"}} onClick={() => {
                }}/>
            </Box>
            <Box className={styles.contentLeft}>
                {children}
            </Box>
            <Box className={styles.containerRight}>
            </Box>
            <Box className={styles.footer}>
                <Typography color="#818181" fontSize="0.75rem">
                    © 2023 Все права защищены
                </Typography>
                <Box display="flex" flex="row" width="35vw" justifyContent="space-between" color="white">
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

