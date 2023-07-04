import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Link, Paper, TextField, Typography} from '@mui/material';
import {Input} from '@src/components';
import {IAuthRegister} from "@src/pages/AuthPage/types";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegisterRequest, fetchValidateEmailRequest} from "@src/store/auth/actionCreators";
import {routes} from "@src/shared/routes";
import OtpInput from 'react-otp-input';
import {selectOtpSent} from "@src/store/auth/selector";

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
    const otpSent = useSelector(selectOtpSent);

    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const payload = state;
        dispatch(fetchRegisterRequest(payload));
    };

    const verifyEmail = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const payload = {
            email: state.email,
            code: otp
        };
        dispatch(fetchValidateEmailRequest(payload));
    };
    const [otp, setOtp] = React.useState('');
    return (
        <Card sx={{marginY: "auto", borderRadius: ".8rem", padding: ".6rem"}}>

            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                justifyContent: "space-between"
            }}>
                {!otpSent && <Typography fontSize='1.3rem' fontWeight='700'>
                    Регистрация
                </Typography>}
                <form>
                    {!otpSent ?
                        <Box style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem"}}>
                            <Input type="text" name="email" sx={{background: "white"}} onChange={handleChange}
                                   placeholder="Логин или Email"/>
                            <Input type="text" name="companyName" sx={{background: "white"}} onChange={handleChange}
                                   placeholder="Название организаций"/>
                            <Input type="password" name="password" sx={{background: "white"}} onChange={handleChange}
                                   placeholder="Пароль"/>
                            <Button fullWidth={true} variant='contained' onClick={onSubmit}
                                    type='submit'>Зарегистрироваться</Button>
                        </Box>
                        :
                        <Box style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "100%",
                        }}>
                            <Typography
                                textAlign="center"
                            >
                                Мы отправили код на <br/>указанную вами почту
                            </Typography>
                            <Box display="flex" width="100%" gap='1rem'>
                                <OtpInput value={otp}
                                          containerStyle={{
                                              gap: "1rem",
                                          }}
                                          onChange={setOtp}
                                          numInputs={4}
                                          inputStyle={{
                                              borderRadius: ".5rem",
                                              fontSize: "2rem",
                                              borderStyle: "solid",
                                              borderColor: "var(--primary)",
                                              textAlign: "center",
                                              padding: ".5rem",
                                              width: "3rem"
                                          }}
                                          renderInput={(props) => <input {...props} />}/>
                            </Box>
                            {/*<Input type="text" name="email" sx={{background: "white"}} onChange={handleChange}*/}
                            {/*       placeholder="Логин или Email"/>*/}
                            {/*<Input type="text" name="companyName" sx={{background: "white"}} onChange={handleChange}*/}
                            {/*       placeholder="Название организаций"/>*/}
                            {/*<Input type="password" name="password" sx={{background: "white"}}*/}
                            {/*       onChange={handleChange}*/}
                            {/*       placeholder="Пароль"/>*/}
                            <Button fullWidth={true} variant='contained' onClick={verifyEmail}
                                    type='submit'>Проверить</Button>
                        </Box>
                    }
                </form>

                <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                    Уже есть аккаунт? <Link sx={{textDecoration: "none", fontWeight: "600"}} href={routes.login}>
                    Войти
                </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};