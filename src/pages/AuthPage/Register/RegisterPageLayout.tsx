import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Link, Paper, Typography} from '@mui/material';
import {Input} from '@src/components';
import {IAuthLogin, IAuthRegister} from "@src/pages/AuthPage/types";
import {useDispatch} from "react-redux";
import {fetchLoginRequest, fetchRegisterRequest} from "@src/store/auth/actionCreators";
import {routes} from "@src/shared/routes";

export const RegisterPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IAuthRegister>({
        email: "",
        password: "",
        companyName: "",
    });
    const dispatch = useDispatch();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };
    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const payload = state;
        dispatch(fetchRegisterRequest(payload));
    };
    return (
        <Card sx={{marginY: "11rem", borderRadius: ".8rem", padding: ".6rem"}}>

            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <Typography fontSize='1.3rem' fontWeight='700'>
                    Регистрация
                </Typography>
                <form style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem"}}>
                    <Input type="text" name="email" sx={{background: "white"}} onChange={handleChange}
                           placeholder="Логин или Email"/>
                    <Input type="text" name="companyName" sx={{background: "white"}} onChange={handleChange}
                           placeholder="Название организаций"/>
                    <Input type="password" name="password" sx={{background: "white"}} onChange={handleChange}
                           placeholder="Пароль"/>
                    <Button fullWidth={true} variant='contained' onClick={onSubmit} type='submit'>Зарегестрироваться</Button>
                </form>
                <Typography fontSize=".8rem" textAlign="center" mt="auto">
                    Уже есть аккаунт? <Link sx={{textDecoration: "none", fontWeight: "600"}} href={routes.login}>
                    Войти
                </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};