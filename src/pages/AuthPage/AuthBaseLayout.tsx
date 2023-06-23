import React from 'react';

import {Box, Typography} from '@mui/material';
import {IAuthPageBase} from "@src/pages/AuthPage/types";
import {isAuthenticated} from '@src/utils/userAuth';
import BrandIcon from '@src/assets/icons/brand.svg';
import {ReactComponent as Web} from '@src/assets/auth/web.svg';
import {ReactComponent as RegisterIcon} from '@src/assets/auth/sign_up_icon.svg';

import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";
import styles from "./AuthPage.module.css";

export const AuthBasePageLayout: React.FC<IAuthPageBase> = (props) => {

    const {children} = props;
    const navigate = useNavigate();

    React.useEffect(() => {
        const urlElements = window.location.href.split('/');

        if (isAuthenticated() && urlElements.includes('auth')) {
            console.log(urlElements)
            navigate(routes.main, {replace: true});
        }
    }, []);
    return (
        <Box className={styles.container}>
            <Box className={styles.navbar}>
                <img src={BrandIcon} className={styles.brand}/>
                <Box>
                    <Box display='flex'>
                        <Typography fontWeight='500' color='white' fontSize='1.5rem'>
                            Рус
                        </Typography>
                        <Web/>
                    </Box>
                </Box>
            </Box>
            {children}
        </Box>

    );
};