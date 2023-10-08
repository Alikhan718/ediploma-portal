import React from 'react';

import {Box, Card, CardContent, Link, Typography, useMediaQuery} from '@mui/material';
import {Button, Input, Label} from '@src/components';
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {IResetPassword} from "@src/pages/AuthPage/types";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetOtpRequest, fetchResetPasswordRequest, fetchValidateEmailRequest} from "@src/store/auth/actionCreators";
import {routes} from "@src/shared/routes";
import OtpInput from 'react-otp-input';
import {selectForgotStep, selectOtpSent, selectRedirectToLogin} from "@src/store/auth/selector";
import {useNavigate} from "react-router-dom";
import styles from "@src/pages/AuthPage/AuthPage.module.css";
import cn from "classnames";

export const ForgotPasswordPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IResetPassword>({
        email: "",
        password: "",
        repassword: "",
        code: "",
    });

    const getQueryWidth = () => {
        const matchesLg = useMediaQuery('(min-width:1200px)');
        const matchesSm = useMediaQuery('(max-width:768px)');
        if (matchesSm) return false;
        if (matchesLg) return true;
    };
    const dispatch = useDispatch();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };
    const otpSent = useSelector(selectOtpSent);
    const step = useSelector(selectForgotStep);
    const sendOtp = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        dispatch(fetchGetOtpRequest(state));
    };

    const verifyEmail = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        dispatch(fetchValidateEmailRequest(state));
    };

    const changePass = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        dispatch(fetchResetPasswordRequest(state));
    };
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState("");
    const redirectToLogin = useSelector(selectRedirectToLogin);
    React.useEffect(() => {
        state.code = otp;
    }, [otp]);
    React.useEffect(() => {
        if (redirectToLogin) {
            navigate(routes.login);
        }
    }, [redirectToLogin]);

    const [counter, setCounter] = React.useState(50);

    React.useEffect(() => {
        if (otpSent && counter > 0) {
            const timer = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [otpSent, counter]);
    return (
        <>
            <Typography className={styles.textLg} fontWeight='700'>
                {step == 1 ? 'Восстановление пароля' : step == 2 ? 'Подтвердите почту!' : 'Придумайте новый пароль'}
            </Typography>
            <form style={{display: 'flex', flexDirection: 'column'}}>
                {step == 1 &&
                    <Box style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem"}}>
                        <Typography color="#818181" className={styles.textMd} fontWeight='400'>
                            Для восстановления учетной записи введите почту
                        </Typography>
                        <Label label="Почта"/>
                        <Input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <Button fullWidth={true} variant="contained" style={{marginTop: ".5rem", marginBottom: ".2rem"}} borderRadius="3rem" onClick={sendOtp}
                                type='submit'>Отправить</Button>
                    </Box>
                }
                {step == 2 &&
                    <Box mt="1rem" style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        width: "100%",
                    }}>
                        <Button disabled={counter != 0} style={{borderRadius: "3rem", backgroundColor: "#F8F8F8"}}>
                            <Typography className={styles.textMd} textAlign="center" color="#B6B6B6">
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
                                          height: getQueryWidth() ? "6rem" : "5rem",
                                          width: getQueryWidth() ? "5rem" : "4rem",
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
                        <Typography className={styles.textMd} fontSize="0.85rem" mt=".5rem">
                            Письмо отправлено! Проверьте свой почтовый ящик на наличие этого письма.
                        </Typography>
                    </Box>


                }
                {step == 3 &&
                    <Box style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".8rem",
                        width: "100%",
                        marginTop: ".5rem",
                    }}>
                        <Typography color="#818181" className={styles.textMd} fontWeight='400'>
                            Для восстановления учетной записи введите почту
                        </Typography>
                            <Label label="Пароль"/>
                            <Input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Новый пароль"
                            />

                            <Label label="Повторите пароль"/>
                            <Input
                                type="password"
                                name="repassword"
                                onChange={handleChange}
                                placeholder="Повтор пароля"
                            />
                        <Button fullWidth={true} variant="contained" borderRadius="3rem" onClick={changePass}
                                type='submit'>Сменить</Button>
                        <Typography color="#818181" className={cn(styles.mobTextSm, styles.preLine)} fontWeight='400'>
                            {`Подсказки для надежного пароля:
                            1. Используйте комбинацию заглавных и строчных букв
                            2. Добавьте цифры, чтобы сделать пароль более надежным
                            3. Включите специальные символы, такие как !, @, #, $ и т.д
                            4. Не используйте личные данные, такие как даты рождения или имена`}
                        </Typography>
                    </Box>
                }
                {step != 3 &&
                    <Button fullWidth={true} variant="contained" borderRadius="3rem" sx={{
                        backgroundColor: "#EBF2FE",
                        marginTop: "1rem",
                        color: "#2F69C7",
                        "&:hover": {"background-color": "#3B82F6", color: "white"}
                    }} onClick={(e: any) => {
                        e.preventDefault();
                        navigate(routes.login);
                    }}
                    >
                        Войти
                    </Button>
                }
            </form>

        </>

    );
};