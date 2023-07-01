import React from 'react';

import {Box, Typography} from '@mui/material';
import {IAuthPageBase} from "@src/pages/AuthPage/types";
import {isAuthenticated} from '@src/utils/userAuth';
import BrandIcon from '@src/assets/icons/brand.svg';
import {ReactComponent as Web} from '@src/assets/auth/web.svg';

import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";
import styles from "./AuthPage.module.css";
import {selectUserRole} from "@src/store/auth/selector";
import {useSelector} from "react-redux";

export const AuthBasePageLayout: React.FC<IAuthPageBase> = (props) => {

    const {children} = props;
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);
    React.useEffect(() => {
        const urlElements = window.location.href.split('/');

        if (isAuthenticated() && urlElements.includes('auth')) {
            console.log(urlElements);
            navigate(routes.main, {replace: true});
        }
    }, [userRole]);
    return (
        <Box className={styles.container}>
            <Box className={styles.navbar}>
                <img src={BrandIcon} className={styles.brand} onClick={() => {navigate(routes.main)}}/>
                <Box>
                    <Box display='flex' gap='.5rem' style={{cursor:"pointer"}}>
                        <Typography fontWeight='500' color='white' fontSize='1.5rem' >
                            Рус
                        </Typography>
                        <Web style={{marginTop: ".2rem"}}/>
                    </Box>
                </Box>
            </Box>
            <Box flexDirection='column' className={styles.contentLeft}  paddingY='12rem'>
                <Typography fontSize='3rem' fontWeight='700' width='70%' color='white'>
                    Цифровые дипломы NFT для выпускников
                </Typography>
                <Typography fontSize='1.2rem' color='white' width='70%'>
                    Лучший инструмент для работодателя по поиску кандидатов. Доступ к глобальным
                    талантам страны.
                </Typography>

            </Box>
            {children}
        </Box>
    );
};