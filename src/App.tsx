import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Snackbar} from '@src/components';
import {
    OrderPage,
    LocationPage,
    UploadMenuPage,
    CreateMenuSuccess,
    PublicationMenuPage,
    TimeSettingPage,
    AttributeGroupPage,
    MainPage, UniversityPage, LoginPage, RegisterPage, DiplomaPage, DiplomaDetailsPage, UniversityDetailsPage
} from '@src/pages';
import {withLayout} from '@src/layout/Layout';
import {routes} from '@src/shared/routes';
import {useDispatch, useSelector} from 'react-redux';
import {Box, CircularProgress, Typography} from '@mui/material';
import {initalApp} from './store/auth/actionCreators';
import {selectAuthLoader} from './store/auth/selector';
import './App.css';
import {roles} from "@src/shared/roles";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const authLoader = useSelector(selectAuthLoader);

    React.useLayoutEffect(() => {
        dispatch(initalApp());
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
                    {/*{hasPermission(roles.stopList) && <Route path={`${routes.stopList}/*`} element={<StopListPage/>}/>}*/}
                    {/*{hasPermission(roles.menu) && <Route path={routes.menu} element={<MenuPage/>}/>}*/}
                    {/*{hasPermission(roles.configureMenu) &&*/}
                    {/*<Route path={`${routes.diploma}/*`} element={<DiplomaPage/>}/>*/}
                    {/*{hasPermission(roles.configureIIKOMenu) &&*/}
                    {/*    <Route path={`${routes.configureIIKOMenu}/*`} element={<ConfigureIIKOMenuPage/>}/>}*/}
                    {/*{hasPermission(roles.location) && <Route path={`${routes.location}/*`} element={<LocationPage/>}/>}*/}
                    {/*{hasPermission(roles.uploadMenu) && <Route path={routes.uploadMenu} element={<UploadMenuPage/>}/>}*/}
                    {/*{hasPermission(roles.matchMenu) && <Route path={routes.matchMenu} element={<MatchMenuPage/>}/>}*/}
                    {/*{hasPermission(roles.createMenuSuccess) &&*/}
                    {/*    <Route path={routes.createMenuSuccess} element={<CreateMenuSuccess/>}/>}*/}
                    {/*{hasPermission(roles.publicationMenu) &&*/}
                    {/*    <Route path={routes.publicationMenu} element={<PublicationMenuPage/>}/>}*/}
                    {/*{hasPermission(roles.timeSetting) &&*/}
                    {/*    <Route path={routes.timeSetting} element={<TimeSettingPage/>}/>}*/}
                    {/*{hasPermission(roles.callCenter) && <Route path={routes.callCenter} element={<CallCenterPage/>}/>}*/}
                    {<Route path='*' element={<Navigate to={routes.main}/>}/>}
                    {/*{hasPermission(roles.callCenter) && <Route path='*' element={<Navigate to={routes.callCenter}/>}/>}*/}
                    {/*{hasPermission(roles.timeSetting) &&*/}
                    {/*    <Route path='*' element={<Navigate to={routes.timeSetting}/>}/>}*/}
                    {/*{hasPermission(roles.attributeGroup) &&*/}
                    {/*    <Route path={`${routes.attributeGroup}/*`} element={<AttributeGroupPage/>}/>}*/}
                </Routes>
            }
            <Snackbar/>
        </React.Fragment>
    );
};


export default withLayout(App as any);



