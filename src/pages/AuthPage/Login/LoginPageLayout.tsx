import React from 'react';

import {Box, Button} from '@mui/material';
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
            console.log(urlElements)
            navigate(routes.main, {replace: true});
        }
    }, []);
    return (
        <Box display='block' flexWrap='wrap' justifyContent='center' gap='0 2rem' pt='1rem'>

            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please login</h2>
                    <Input type="text" name="email" onChange={handleChange} placeholder="Email Address"/>
                    <br/>
                    <Input type="password" name="password" onChange={handleChange} placeholder="Password"/>
                    <br/>
                    <Button onClick={onSubmit} type='submit'>Login</Button>
                </form>
            </div>
        </Box>

    );
};