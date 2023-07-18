import React, {useEffect} from 'react';

import {Box, Button, Card, CardContent, IconButton, InputAdornment, Link, Typography} from '@mui/material';
import {Input} from '@src/components';
import {IAuthRegister} from "@src/pages/AuthPage/types";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthValidateEmailRequest, fetchLoginRequest, fetchRegisterRequest,} from "@src/store/auth/actionCreators";
import {routes} from "@src/shared/routes";
import OtpInput from 'react-otp-input';
import {selectOtpSent, selectRegistrationStep} from "@src/store/auth/selector";
import {fetchAuthLogin} from "@src/store/auth/saga";
import {isAuthenticated} from "@src/utils/userAuth";
import {useNavigate} from "react-router-dom";

export const RegisterPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IAuthRegister>({
        email: "",
        password: "",
        companyName: "",
    });
    const dispatch = useDispatch();
    const step = useSelector(selectRegistrationStep);
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };
    const otpSent = useSelector(selectOtpSent);

    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const payload = state;
        dispatch(fetchRegisterRequest(payload));
    };
    const navigate = useNavigate();
    const verifyEmail = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const payload = {
            email: state.email,
            code: otp,
            password: state.password
        };
        dispatch(fetchAuthValidateEmailRequest(payload));
    };
    useEffect(() => {
        if (step == 2) {

            const payload = {
                email: state.email,
                password: state.password
            };

            dispatch(fetchLoginRequest(payload));

            setTimeout(() => {
                const urlElements = window.location.href.split('/');
                if (isAuthenticated() && urlElements.includes('auth')) {
                    navigate(routes.main, {replace: true});
                }
            }, 2000);

        }

    }, [step]);
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
                                   placeholder="Email"/>
                            <Input type="text" name="companyName" sx={{background: "white"}} onChange={handleChange}
                                   placeholder="Название организации"/>
                            <Input type="password" name="password" sx={{background: "white"}} onChange={handleChange}
                                   placeholder="Пароль"/>
                            <Input type="password" name="repassword" sx={{background: "white"}} onChange={handleChange}
                                   endAdornment={
                                       <InputAdornment position="end">
                                           <IconButton
                                               onClick={(e) => {
                                                   e.type = "text";
                                               }
                                               }
                                               onMouseDown={(e) => {
                                                   e.type = "text";
                                               }
                                               }
                                           >
                                               {/*{this && this.type = "text" ? "on" : "off"}*/}
                                           </IconButton>
                                       </InputAdornment>
                                   }
                                   placeholder="Повтор пароля"/>
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
                                fontSize="1rem"
                            >
                                Мы отправили код на <br/>указанную вами почту
                            </Typography>
                            <Box display="flex" width="100%" gap='1rem'>
                                <OtpInput value={otp}
                                          containerStyle={{
                                              gap: "1rem",
                                          }}
                                          onChange={setOtp}
                                          inputType="tel"
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