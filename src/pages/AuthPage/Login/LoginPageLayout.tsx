import React from 'react';

import {Box, Button, Card, CardContent, Link, Typography} from '@mui/material';
import {Input} from '@src/components';
import {IAuthLogin} from "@src/pages/AuthPage/types";
import {useDispatch} from "react-redux";
import {fetchLoginRequest} from "@src/store/auth/actionCreators";
import {isAuthenticated} from '@src/utils/userAuth';
import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";

export const LoginPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IAuthLogin>({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };
    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const payload = state;
        dispatch(fetchLoginRequest(payload));

    };
    React.useEffect(() => {
        const urlElements = window.location.href.split('/');

        if (isAuthenticated() && urlElements.includes('auth')) {
            console.log(urlElements);
            navigate(routes.main, {replace: true});
        }
    }, []);
    return (
        <Card sx={{marginY: "auto", borderRadius: ".8rem", padding: ".6rem"}}>

            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <Typography fontSize='1.5rem' fontWeight='700'>
                    Войти
                </Typography>
                <form style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem"}}>
                    <Input type="text" name="email" sx={{background: "white"}} onChange={handleChange}
                           placeholder="Логин или Email"/>
                    <Input type="password" name="password" sx={{background: "white"}} onChange={handleChange}
                           placeholder="Пароль"/>
                    <Typography fontSize=".8rem" textAlign="end" mt="auto">
                        Забыли пароль? <Link sx={{textDecoration: "none", color: "gray"}} href={routes.register}>
                    </Link>
                    </Typography>
                    <Button fullWidth={true} variant='contained' onClick={onSubmit} type='submit'>Войти</Button>
                </form>
                <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                    Нет аккаунта? <Link sx={{textDecoration: "none", fontWeight: "600"}} href={routes.register}>
                    Зарегистрироваться
                </Link>
                </Typography>
            </CardContent>
        </Card>

    );
};