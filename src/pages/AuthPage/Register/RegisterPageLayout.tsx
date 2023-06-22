import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {Input} from '@src/components';
import {IAuthLogin, IAuthRegister} from "@src/pages/AuthPage/types";
import {useDispatch} from "react-redux";
import {fetchLoginRequest, fetchRegisterRequest} from "@src/store/auth/actionCreators";

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
        <Box display='block' flexWrap='wrap' justifyContent='center' gap='0 2rem' pt='1rem'>

            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please Register</h2>
                    <Input type="text" name="email" onChange={handleChange} placeholder="Email Address"/>
                    <br/>
                    <Input type="text" name="companyName" onChange={handleChange} placeholder="CompanyName"/>
                    <br/>
                    <Input type="password" name="password" onChange={handleChange} placeholder="Password"/>
                    <br/>
                    <Button onClick={onSubmit} type='submit'>Login</Button>
                </form>
            </div>
        </Box>

    );
};