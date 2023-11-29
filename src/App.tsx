import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Snackbar } from '@src/components';
import {
	AboutUsPage,
	AddingGraduates,
	DiplomaDetailsPage,
	DiplomaPage, ForgotPassword,
	LoginPage,
	MainPage,
	RegisterPage, SettingsPage,
	UniversityDetailsPage,
	UniversityPage,
	StudentPage,
	EmployerPage,
	UniversityProfilePage,
	UniversityDeatailPage, AnalysisPage, NotFoundPage,
	Serverpage, AIChatPage, QLabPage
} from '@src/pages';
import { withLayout } from '@src/layout/Layout';
import { routes } from '@src/shared/routes';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { selectAuthLoader, selectUserRole } from './store/auth/selector';
import './App.css';
import ReactGA from 'react-ga';
import { hasPermission, permissions } from '@src/shared/permissions';
import { isAuthenticated } from "@src/utils/userAuth";

const App: React.FC = () => {

	const TRACKING_ID = "G-H12GFWB4FY"; // OUR_TRACKING_ID
	ReactGA.initialize(TRACKING_ID);

	const dispatch = useDispatch();
	const authLoader = useSelector(selectAuthLoader);

	React.useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);
	React.useEffect(() => {
		if (isAuthenticated()) {
			setUserRoles(localStorage.getItem('userRole') ?? 'Guest');
		}
	}, [!isAuthenticated()]);
	const [userRoles, setUserRoles] = React.useState(useSelector(selectUserRole));

	return (
		<React.Fragment>
			{authLoader ?
				<CircularProgress />
				:
				<Routes>
					{hasPermission(userRoles, permissions["main"]) && <Route path={routes.main} element={<MainPage />} />}
					{hasPermission(userRoles, permissions["university"]) && <Route path={routes.university} element={<UniversityPage />} />}
					{hasPermission(userRoles, permissions["universityDetails"]) && <Route path={routes.universityDetails} element={<UniversityDetailsPage />} />}
					{hasPermission(userRoles, permissions["hr_bank"]) && <Route path={routes.hrBank} element={<DiplomaPage />} />}
					{hasPermission(userRoles, permissions["diplomaDetails"]) && <Route path={routes.diplomaDetails} element={<DiplomaDetailsPage />} />}
					{hasPermission(userRoles, permissions["aboutUs"]) && <Route path={routes.aboutUs} element={<AboutUsPage />} />}
					{hasPermission(userRoles, permissions["login"]) && <Route path={routes.login} element={<LoginPage />} />}
					{hasPermission(userRoles, permissions["register"]) && <Route path={routes.register} element={<RegisterPage />} />}
					{hasPermission(userRoles, permissions["passwordReset"]) && <Route path={routes.passwordReset} element={<ForgotPassword />} />}
					{hasPermission(userRoles, permissions["addingGraduates"]) && <Route path={routes.addingGraduates} element={<AddingGraduates />} />}
					{hasPermission(userRoles, permissions["settings"]) && <Route path={routes.settings} element={<SettingsPage />} />}
					{hasPermission(userRoles, permissions["studentProfile"]) && <Route path={routes.studentProfile} element={<StudentPage />} />}
					{hasPermission(userRoles, permissions["employerProfile"]) && <Route path={routes.employerProfile} element={<EmployerPage />} />}
					{hasPermission(userRoles, permissions["universityProfile"]) && <Route path={routes.universityProfile} element={<UniversityProfilePage />} />}
					{hasPermission(userRoles, permissions["aiChat"]) && <Route path={routes.aiChat} element={<AIChatPage/>}/>}
					<Route path={routes.universityProfileSecond} element={<UniversityDeatailPage />} />
					<Route path={routes.analysisPage} element={<AnalysisPage />} />
					{/*{hasPermission(userRoles, permissions["notifications"]) && <Route path={routes.notifications} element={<Notifications/>}/>}*/}
					<Route path={routes.notFound} element={<NotFoundPage />} />
					<Route path={routes.server} element={<Serverpage />} />
					<Route path={routes.qLab} element={<QLabPage />} />
					{<Route path='*' element={<Navigate to={routes.notFound} />} />}
				</Routes>
			}
			<Snackbar />
		</React.Fragment>
	);
};


export default withLayout(App as any);



