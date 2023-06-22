import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Snackbar} from '@src/components';
import {
    OrderPage,
    StopListPage,
    MenuPage,
    ConfigureMenuPage,
    LocationPage,
    UploadMenuPage,
    MatchMenuPage,
    CreateMenuSuccess,
    PublicationMenuPage,
    CallCenterPage,
    TimeSettingPage,
    AttributeGroupPage,
    ConfigureIIKOMenuPage,
    MainPage, CollectionsPage
} from '@src/pages';
import {withLayout} from '@src/layout/Layout';
import {routes} from '@src/shared/routes';
import {withAuthenticator,} from '@aws-amplify/ui-react';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress} from '@mui/material';
import {initalApp} from './store/auth/actionCreators';
import {selectAuthLoader} from './store/auth/selector';
import {roles} from "@src/shared/roles";
import './App.css';
import {AuthHeader, formFields, SignInHeader} from './pages/AuthPage';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const authLoader = useSelector(selectAuthLoader);

    React.useLayoutEffect(() => {
        dispatch(initalApp());
    }, []);

    const hasPermission = (roleList: string[]) => {
        const userRoles = JSON.parse(localStorage.getItem("userRole") || '[]') || "";
        if (!userRoles) {
            return false;
        }

        return userRoles.some((i: any) => roleList.includes(i));
    };

    return (
        <React.Fragment>
            {authLoader ?
                <CircularProgress/>
                :
                <Routes>
                    <Route path={routes.main} element={<MainPage/>}/>
                    <Route path={routes.collections} element={<CollectionsPage/>}/>
                    {/*{hasPermission(roles.order) && <Route path={routes.order} element={<OrderPage/>}/>}*/}
                    {/*{hasPermission(roles.stopList) && <Route path={`${routes.stopList}/*`} element={<StopListPage/>}/>}*/}
                    {/*{hasPermission(roles.menu) && <Route path={routes.menu} element={<MenuPage/>}/>}*/}
                    {/*{hasPermission(roles.configureMenu) &&*/}
                    {/*    <Route path={`${routes.configureMenu}/*`} element={<ConfigureMenuPage/>}/>}*/}
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
                    {/*{hasPermission(roles.order) && <Route path='*' element={<Navigate to={routes.main}/>}/>}*/}
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

export default withLayout(App) as any;
//     {
//         hideSignUp: false,
//         variation: "modal",
//         components: {
//             SignIn: {Header: SignInHeader},
//             SignUp: {Header: SignInHeader}
//         },
//         formFields: formFields,
//
//     }
// );


