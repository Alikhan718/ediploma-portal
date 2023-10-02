import React, {useEffect} from 'react';

import {Box, CardContent, Link, Typography} from '@mui/material';
import {Button, Input, Label} from '@src/components';
import {IAuthRegister} from "@src/pages/AuthPage/types";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAuthDSRequest,
    fetchAuthValidateEmailRequest,
    fetchGetOtpRequest,
    fetchLoginRequest,
    fetchRegisterRequest,
} from "@src/store/auth/actionCreators";
import {routes} from "@src/shared/routes";
import OtpInput from 'react-otp-input';
import {selectOtpSent, selectRegistrationStep} from "@src/store/auth/selector";
import {isAuthenticated} from "@src/utils/userAuth";
import {useNavigate} from "react-router-dom";
import {modelType} from "./generator";
import * as NcaLayer from '@src/utils/functions';

export const RegisterPageLayout: React.FC = () => {

    const [type, setType] = React.useState<keyof typeof modelType>('Student');
    const [state, setState] = React.useState<IAuthRegister>({
        email: "",
        password: "",
        repassword: "",
        role: type.toString(),
        name: "",
        otp: "",
    });
    // Types: [Student, Company, University]
    const dispatch = useDispatch();
    const step = useSelector(selectRegistrationStep);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value});
    };
    const otpSent = useSelector(selectOtpSent);

    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (otpSent) {
            dispatch(fetchRegisterRequest({...state, ['role']: type}));
        } else {
            const payload = {
                email: state.email
            };
            dispatch(fetchGetOtpRequest(payload));
        }
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
        NcaLayer.enableWebSocket();
        if (step == 3) {
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

    const authWithDS = (res: any) => {
        if (res['code'] === "200") {
            res = res['responseObject'];
            const subjectDn = res['subjectDn'];
            let dateTo = res['certNotAfter'];
            let dateFrom = res['certNotBefore'];
            const authorityKeyIdentifier = res['authorityKeyIdentifier'];
            const data = {
                'subjectDn': subjectDn,
                'dateTo': dateTo,
                'dateFrom': dateFrom,
                'authorityKeyIdentifier': authorityKeyIdentifier,
                'role': type
            };
            dispatch(fetchAuthDSRequest(data));
            setTimeout(() => {
                const urlElements = window.location.href.split('/');
                if (isAuthenticated() && urlElements.includes('auth')) {
                    navigate(routes.main, {replace: true});
                }
            }, 2000);
        }
    };
    const ncaLayerAuth = () => {
        NcaLayer.getKeyInfo(authWithDS);
    };

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
                        {step == 2 ? 'Придумайте пароль' :
                            !otpSent ? "Зарегистрироваться" :
                                "Подтвердите почту!"}
                    </Typography>
                    <Typography fontSize="0.85rem" color="#818181">
                        {step == 2 ? 'Создайте надежный пароль который легко запоминается и не забудете' :
                            !otpSent ? "Введите свой адрес электронной почты и пароль для входа в систему!" :
                                "Мы отправили вам код подтверждение по адресу account@ediploma."}
                    </Typography>
                </Box>
                <form>
                    {!otpSent && step == 1 && <Box style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                        <Box mb="1rem" display="flex" flex="row" p=".175rem .25rem"
                             style={{backgroundColor: "#F8F8F8", borderRadius: "3rem"}}>
                            <Button fullWidth={true} color={type == 'Student' ? "primary" : "secondary"}
                                    variant="contained"
                                    borderRadius="3rem"
                                    onClick={() => setType('Student')}>
                                Студент
                            </Button>
                            <Button fullWidth={true} color={type == 'Employer' ? "primary" : "secondary"}
                                    variant="contained"
                                    borderRadius="3rem"
                                    onClick={() => setType('Employer')}
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
                        <Button fullWidth={true} variant="contained" borderRadius="3rem" sx={{
                            backgroundColor: "#EBF2FE",
                            color: "#2F69C7",
                            "&:hover": {"background-color": "#3B82F6", color: "white"}
                        }}
                                onClick={ncaLayerAuth}
                        >
                            Выбрать ключ ЭЦП
                        </Button>
                        <Button fullWidth={true} variant="contained" borderRadius="3rem"
                                onClick={onSubmit}
                                type="submit">
                            {otpSent ? "Зарегистрироваться" : "Отправить код"}
                        </Button>

                        <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                            У вас уже есть учетная запись? {'  '}
                            <Link sx={{textDecoration: 'none', fontWeight: '600'}} href={routes.login}>
                                Войдите в профиль
                            </Link>
                        </Typography>
                    </Box>}
                    {otpSent && step == 1 && <Box mt="1rem" style={{
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
                            backgroundColor: otp.length <= 3 ? "#EBF2FE" : "#2F69C7",
                            color: otp.length <= 3 ? "#2F69C7" : "#EBF2FE",
                            "&:hover": {"background-color": "#3B82F6", color: "white"}
                        }}
                                onClick={verifyEmail}
                        >
                            {otp.length <= 3 ? "Отменить" : "Проверить"}
                        </Button>
                        <Typography fontSize="0.85rem" mt=".5rem">
                            Письмо отправлено! Проверьте свой почтовый ящик на наличие этого письма.
                        </Typography>
                    </Box>
                    }
                    {step == 2 && <Box style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                        <Box>
                            <Label label="Пароль"/>
                            <Input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Минимум 8 символов"
                            />
                        </Box>

                        <Box mb="1rem">
                            <Label label="Повторите пароль"/>
                            <Input
                                type="password"
                                name="repassword"
                                onChange={handleChange}
                                placeholder="Повтор пароля"
                            />
                        </Box>
                        <Button fullWidth={true} variant="contained" borderRadius="3rem"
                                onClick={onSubmit}
                                type="submit">
                            Зарегистрироваться
                        </Button>

                        <Typography fontSize=".8rem" whiteSpace="pre-line" color="#818181" mt="1rem">
                            {`Подсказки для надежного пароля:
                            1. Используйте комбинацию заглавных и строчных букв
                            2. Добавьте цифры, чтобы сделать пароль более надежным
                            3. Включите специальные символы, такие как !, @, #, $ и т.д
                            4. Не используйте личные данные, такие как даты рождения или имена`}
                        </Typography>
                    </Box>}
                </form>


            </CardContent>
        </Box>

    );
};