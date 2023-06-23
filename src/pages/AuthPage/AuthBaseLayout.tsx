import React from 'react';

import {Box, Typography} from '@mui/material';
import {IAuthPageBase} from "@src/pages/AuthPage/types";
import {isAuthenticated} from '@src/utils/userAuth';
import BrandIcon from '@src/assets/icons/brand.svg';
import {ReactComponent as Web} from '@src/assets/auth/web.svg';

import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";
import styles from "./AuthPage.module.css";

export const AuthBasePageLayout: React.FC<IAuthPageBase> = (props) => {

    const {children} = props;
    const navigate = useNavigate();

    React.useEffect(() => {
        const urlElements = window.location.href.split('/');

        if (isAuthenticated() && urlElements.includes('auth')) {
            console.log(urlElements);
            navigate(routes.main, {replace: true});
        }
    }, []);
    return (
        <Box className={styles.container}>
            <Box className={styles.navbar}>
                <img src={BrandIcon} className={styles.brand}/>
                <Box>
                    <Box display='flex' gap='.5rem' style={{cursor:"pointer"}}>
                        <Typography fontWeight='500' color='white' fontSize='1.5rem' >
                            Рус
                        </Typography>
                        <Web style={{marginTop: ".2rem"}}/>
                    </Box>
                </Box>
            </Box>
            <Box display='flex' flexDirection='column' width='50%' paddingY='12rem'>
                <Typography fontSize='3rem' fontWeight='700' width='70%' color='white'>
                    Цифровые дипломы NFT для студентов
                </Typography>
                <Typography fontSize='1.1rem' color='white' width='70%'>
                    Дипломы NFT приносят пользу университетам за счет экономии средств и повышения доверия и
                    прозрачности. Студенты получают надежные и уникальные цифровые учетные данные и легко демонстрируют
                    свою квалификацию. Работодатели получают мгновенную проверку дипломов и доступ к глобальным
                    талантам.
                </Typography>

            </Box>
            {children}
        </Box>
    );
};