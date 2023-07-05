import React, {useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Snackbar} from '@src/components';
import {
    DiplomaDetailsPage,
    DiplomaPage,
    LoginPage,
    MainPage,
    RegisterPage,
    UniversityDetailsPage,
    UniversityPage
} from '@src/pages';
import {withLayout} from '@src/layout/Layout';
import {routes} from '@src/shared/routes';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress} from '@mui/material';
import {initalApp} from './store/auth/actionCreators';
import {selectAuthLoader} from './store/auth/selector';
import './App.css';
import ReactGA from 'react-ga';

const App: React.FC = () => {
    const TRACKING_ID = "G-5RPKC1NF38"; // OUR_TRACKING_ID
    ReactGA.initialize(TRACKING_ID);

    const dispatch = useDispatch();
    const authLoader = useSelector(selectAuthLoader);

    React.useLayoutEffect(() => {
        dispatch(initalApp());
    }, []);
    React.useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    const hasPermission = (roleList: string[]) => {
        const userRoles = localStorage.getItem("userRole") || "";
        if (!userRoles) {
            console.log(userRoles);
            return false;
        }
        console.log(roleList, userRoles);
        return roleList.includes(userRoles);
    };

    return (
        <React.Fragment>
            {authLoader ?
                <CircularProgress/>
                :
                <Routes>
                    <Route path={routes.main} element={<MainPage/>}/>
                    <Route path={routes.university} element={<UniversityPage/>}/>
                    <Route path={routes.universityDetails} element={<UniversityDetailsPage/>}/>
                    <Route path={routes.diploma} element={<DiplomaPage/>}/>
                    <Route path={routes.diplomaDetails} element={<DiplomaDetailsPage/>}/>
                    <Route path={routes.login} element={<LoginPage/>}/>
                    <Route path={routes.register} element={<RegisterPage/>}/>
                    {<Route path='*' element={<Navigate to={routes.main}/>}/>}
                </Routes>
            }
            <Snackbar/>
        </React.Fragment>
    );
};


export default withLayout(App as any);



