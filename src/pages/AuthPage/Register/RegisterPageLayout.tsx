import React, {useEffect} from 'react';

import {Box, CardContent, Link, Typography} from '@mui/material';
import {Button, Input, Label} from '@src/components';
import {IAuthRegister} from "@src/pages/AuthPage/types";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthValidateEmailRequest, fetchLoginRequest, fetchRegisterRequest,} from "@src/store/auth/actionCreators";
import {routes} from "@src/shared/routes";
import OtpInput from 'react-otp-input';
import {selectOtpSent, selectRegistrationStep} from "@src/store/auth/selector";
import {fetchAuthLogin} from "@src/store/auth/saga";
import {isAuthenticated} from "@src/utils/userAuth";
import {useNavigate} from "react-router-dom";
import {modelType} from "./generator";

export const RegisterPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IAuthRegister>({
        email: "",
        password: "",
        companyName: "",
        otp: ""
    });
    const [type, setType] = React.useState<keyof typeof modelType>('Student');
    // Types: [Student, Company, University]
    const dispatch = useDispatch();
    const step = useSelector(selectRegistrationStep);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value});
    };
    // const otpSent = useSelector(selectOtpSent);
    const otpSent = true;

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
            code: state.otp,
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

    const [counter, setCounter] = React.useState(50);
    useEffect(() => {
        if (otpSent && counter > 0) {
            const timer = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [otpSent, counter]);

    return (
        <Box sx={{marginY: 'auto', borderRadius: '.8rem', padding: '.6rem', width: "30rem"}}>
            <CardContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box mb="1rem">
                    <Typography fontSize="1.75rem" fontWeight="700">
                        {!otpSent ? "Зарегистрироваться" : "Подтвердите почту!"}
                    </Typography>
                    <Typography fontSize="0.85rem" color="#818181">
                        {!otpSent ? "Введите свой адрес электронной почты и пароль для входа в систему!" : "Мы отправили вам код подтверждение по адресу account@ediploma."}
                    </Typography>
                </Box>
                <form>
                    {!otpSent ?

                        <Box style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <Box mb="1rem" display="flex" flex="row" p=".175rem .25rem"
                                 style={{backgroundColor: "#F8F8F8", borderRadius: "3rem"}}>
                                <Button fullWidth={true} color={type == 'Student' ? "primary" : "secondary"}
                                        variant="contained"
                                        borderRadius="3rem"
                                        onClick={() => setType('Student')}>
                                    Студент
                                </Button>
                                <Button fullWidth={true} color={type == 'Company' ? "primary" : "secondary"}
                                        variant="contained"
                                        borderRadius="3rem"
                                        onClick={() => setType('Company')}
                                >
                                    Компания
                                </Button>
                                <Button fullWidth={true} color={type == 'University' ? "primary" : "secondary"}
                                        variant="contained"
                                        borderRadius="3rem"
                                        onClick={() => setType('University')}
                                >
                                    Университет
                                </Button>
                            </Box>
                            <Box>
                                <Label label={modelType[type].label}/>
                                <Input
                                    type={modelType[type].inputType}
                                    name={modelType[type].inputName}
                                    onChange={handleChange}
                                    placeholder={modelType[type].placeholder}
                                />
                            </Box>

                            <Box mb="1rem">
                                <Label label="Почта"/>
                                <Input type="text" name="email" onChange={handleChange}
                                       placeholder="Email"/>
                            </Box>
                            {/*<Box>*/}
                            {/*    <Label label="Почта*"/>*/}
                            {/*    <Input type="password" name="password" sx={{background: "white"}}*/}
                            {/*           onChange={handleChange}*/}
                            {/*           placeholder="Пароль"/>*/}
                            {/*</Box>*/}
                            {/*<Box>*/}
                            {/*    <Label label="Почта*"/>*/}
                            {/*    <Input type="password" name="repassword" sx={{background: "white"}}*/}
                            {/*           onChange={handleChange}*/}
                            {/*           endAdornment={*/}
                            {/*               <InputAdornment position="end">*/}
                            {/*                   <IconButton*/}
                            {/*                       onClick={(e) => {*/}
                            {/*                           e.type = "text";*/}
                            {/*                       }*/}
                            {/*                       }*/}
                            {/*                       onMouseDown={(e) => {*/}
                            {/*                           e.type = "text";*/}
                            {/*                       }*/}
                            {/*                       }*/}
                            {/*                   >*/}
                            {/*                       /!*{this && this.type = "text" ? "on" : "off"}*!/*/}
                            {/*                   </IconButton>*/}
                            {/*               </InputAdornment>*/}
                            {/*           }*/}
                            {/*           placeholder="Повтор пароля"/>*/}
                            {/*</Box>*/}
                            <Button fullWidth={true} variant="contained" borderRadius="3rem" sx={{
                                backgroundColor: "#EBF2FE",
                                color: "#2F69C7",
                                "&:hover": {"background-color": "#3B82F6", color: "white"}
                            }}>
                                Выбрать ключ ЭЦП
                            </Button>
                            <Button fullWidth={true} variant="contained" borderRadius="3rem" onClick={onSubmit}
                                    type="submit">
                                Зарегистрироваться
                            </Button>

                            <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                                У вас уже есть учетная запись? {'  '}
                                <Link sx={{textDecoration: 'none', fontWeight: '600'}} href={routes.login}>
                                    Войдите в профиль
                                </Link>
                            </Typography>
                        </Box>
                        :
                        <Box mt="1rem" style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "100%",
                        }}>
                            <Button disabled={counter != 0} style={{borderRadius: "3rem", backgroundColor: "#F8F8F8"}}>
                                <Typography textAlign="center" color="#B6B6B6">
                                    {`Отправить еще раз через ${counter} сек`}
                                </Typography>
                            </Button>

                            <Box display="flex" width="100%">
                                <OtpInput value={otp}
                                          containerStyle={{
                                              width: "100%",
                                              padding: "0 0rem",
                                              justifyContent: "space-between"
                                          }}
                                          onChange={setOtp}
                                          inputType="tel"
                                          numInputs={4}
                                          inputStyle={{
                                              backgroundColor: "#F8F8F8",
                                              borderRadius: ".5rem",
                                              color: "#818181",
                                              fontSize: "2rem",
                                              borderStyle: "solid",
                                              borderColor: "#F8F8F8",
                                              textAlign: "center",
                                              padding: ".5rem",
                                              height: "6rem",
                                              width: "5rem",
                                          }}
                                          renderInput={(props) => <input {...props} />}/>
                            </Box>

                            <Button fullWidth={true} variant="contained" borderRadius="3rem" sx={{
                                backgroundColor: "#EBF2FE",
                                color: "#2F69C7",
                                "&:hover": {"background-color": "#3B82F6", color: "white"}
                            }}>
                                {state.otp.length < 3 ? "Отменить" : "Проверить"}
                            </Button>
                            <Typography fontSize="0.85rem" mt=".5rem">
                                Письмо отправлено! Проверьте свой почтовый ящик на наличие этого письма.
                            </Typography>
                        </Box>
                    }
                </form>


            </CardContent>
        </Box>

    );
};