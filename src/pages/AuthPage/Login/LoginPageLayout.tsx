import React from 'react';
import {Box, CardContent, Link, Typography} from '@mui/material';
import {Button, Input, Label} from '@src/components';
import {IAuthLogin} from '@src/pages/AuthPage/types';
import {useDispatch} from 'react-redux';
import {fetchLoginRequest} from '@src/store/auth/actionCreators';
import {isAuthenticated} from '@src/utils/userAuth';
import {routes} from '@src/shared/routes';
import {useNavigate} from 'react-router-dom';
import ReactGA from 'react-ga';
import Checkbox from '@mui/material/Checkbox';

export const LoginPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IAuthLogin>({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        dispatch(fetchLoginRequest(state));

        // Track login event
        ReactGA.event({
            category: 'User',
            action: 'Login',
        });

        // Check authentication status after a delay to ensure the request has completed
        setTimeout(() => {
            const urlElements = window.location.href.split('/');
            if (isAuthenticated() && urlElements.includes('auth')) {
                navigate(routes.main, {replace: true});
            }
        }, 2000);
    };

    React.useEffect(() => {
        const urlElements = window.location.href.split('/');
        if (isAuthenticated() && urlElements.includes('auth')) {
            navigate(routes.main, {replace: true});
        }
    }, [localStorage.getItem('token')]);

    React.useEffect(() => {
        ReactGA.initialize('G-H12GFWB4FY');
        ReactGA.pageview(window.location.pathname + window.location.search);

        // Track cursor movements
        const handleMouseMove = (e: MouseEvent): void => {
            ReactGA.event({
                category: 'User',
                action: 'Cursor Move',
                label: `X: ${e.clientX}, Y: ${e.clientY}`,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const [webSocket, setWebSocket] = React.useState<WebSocket>(new WebSocket('wss://127.0.0.1:13579/'));
    let callback: any = null;

    webSocket.onopen = (event): void => {
        console.log("Connection opened");
    };

    webSocket.onclose = (event): void => {
        if (event.wasClean) {
            console.log('connection has been closed');
        } else {
            console.log('Connection error');
        }
        console.log('Code: ' + event.code + ' Reason: ' + event.reason);
    };


    webSocket.onmessage = (event): void => {
        var result = JSON.parse(event.data);

        if (result != null) {
            var rw = {
                code: result['code'],
                message: result['message'],
                responseObject: result['responseObject'],
                getResult: function () {
                    return this.responseObject;
                },
                getMessage: function () {
                    return this.message;
                },
                getResponseObject: function () {
                    return this.responseObject;
                },
                getCode: function () {
                    return this.code;
                }
            };
            if (callback !== null) {
                callback(rw);
            }
        }
    };
    const manageNcaLayer = () => {
        getKeyInfo('PKCS12', getKeyInfoBack);
    };

    const getKeyInfoBack = (result: any) => {
        if (result['code'] === "200") {
            let res = result['responseObject'];
            const subjectDn = res['subjectDn'];
            let dateTo = res['certNotAfter'];
            let dateFrom = res['certNotBefore'];
            const authorityKeyIdentifier = res['authorityKeyIdentifier'];
            console.log('subjectDn:', subjectDn);
            console.log('dateTo:', dateTo);
            console.log('dateFrom:', dateFrom);
            console.log('authorityKeyIdentifier:', authorityKeyIdentifier);
        }
    };


    const getKeyInfo = (storageName: string, callBack: any) => {
        const getKeyInfo = {
            "module": "kz.gov.pki.knca.commonUtils",
            "method": "getKeyInfo",
            "args": ['PKCS12']
        };
        callback = callBack;
        webSocket.send(JSON.stringify(getKeyInfo));
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
                <Box>
                    <Typography fontSize="1.75rem" fontWeight="700">
                        Войти
                    </Typography>
                    <Typography fontSize="0.85rem" color="#818181" width="17rem">
                        Введите свой адрес электронной почты и пароль для входа в систему!
                    </Typography>
                </Box>
                <form style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem'}}>
                    <Box>
                        <Label label="Почта*"/>
                        <Input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            placeholder="Логин или Email"
                        />
                    </Box>
                    <Box>
                        <Label label="Пароль*"/>
                        <Input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Пароль"
                        />
                    </Box>
                    <Box display="flex" flex="row" justifyContent="space-between">
                        <Box display="flex" flex="row">
                            <Checkbox defaultChecked size="small"/>
                            <Typography alignSelf="center" fontSize="0.875rem" fontWeight="500" color="#2D2D2D">
                                Запомнить меня
                            </Typography>
                        </Box>
                        <Link sx={{textDecoration: 'none', fontWeight: '600'}} href={routes.passwordReset}
                              alignSelf="center">
                            <Typography fontWeight="500" fontSize="0.875rem">
                                Забыли пароль?
                            </Typography>
                        </Link>
                    </Box>
                    <Button fullWidth={true} variant="contained" borderRadius="3rem" onClick={onSubmit} type="submit">
                        Войти
                    </Button>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        borderRadius="3rem"
                        sx={{
                            backgroundColor: "#EBF2FE",
                            color: "#2F69C7",
                            "&:hover": {
                                "background-color": "#3B82F6", color: "white"
                            }
                        }}
                        onClick={() => {
                            manageNcaLayer();
                        }}>
                        Выбрать ключ ЭЦП
                    </Button>
                </form>
                <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                    Еще не зарегистрировались?{'  '}
                    <Link sx={{textDecoration: 'none', fontWeight: '600'}} href={routes.register}>
                        Создать учетную запись
                    </Link>
                </Typography>
            </CardContent>
        </Box>
    );
};
