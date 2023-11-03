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
	UniversityDeatailPage, AnalysisPage
} from '@src/pages';
import { withLayout } from '@src/layout/Layout';
import { routes } from '@src/shared/routes';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { selectAuthLoader } from './store/auth/selector';
import './App.css';
import ReactGA from 'react-ga';
import Notifications from "@src/pages/UnivesrityDetailsPage/Notifications";

const App: React.FC = () => {

	const TRACKING_ID = "G-H12GFWB4FY"; // OUR_TRACKING_ID
	ReactGA.initialize(TRACKING_ID);

	const dispatch = useDispatch();
	const authLoader = useSelector(selectAuthLoader);

	React.useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);
	const hasPermission = (roleList: string[]) => {
		const userRoles = localStorage.getItem("userRole") || "";
		if (!userRoles) {
			return false;
		}
		return roleList.includes(userRoles);
	};

	return (
		<React.Fragment>
			{authLoader ?
				<CircularProgress />
				:
				<Routes>
					<Route path={routes.main} element={<MainPage />} />
					<Route path={routes.university} element={<UniversityPage />} />
					<Route path={routes.universityDetails} element={<UniversityDetailsPage />} />
					<Route path={routes.diploma} element={<DiplomaPage />} />
					<Route path={routes.diplomaDetails} element={<DiplomaDetailsPage />} />
					<Route path={routes.aboutUs} element={<AboutUsPage />} />
					<Route path={routes.login} element={<LoginPage />} />
					<Route path={routes.register} element={<RegisterPage />} />
					<Route path={routes.passwordReset} element={<ForgotPassword />} />
					<Route path={routes.addingGraduates} element={<AddingGraduates />} />
					<Route path={routes.notifications} element={<Notifications />} />
					<Route path={routes.settings} element={<SettingsPage />} />
					<Route path={routes.student} element={<StudentPage />} />
					<Route path={routes.employer} element={<EmployerPage />} />
					<Route path={routes.universityProfile} element={<UniversityProfilePage />} />
					<Route path={routes.universityProfileSecond} element={<UniversityDeatailPage />} />
					<Route path={routes.analysisPage} element={<AnalysisPage />} />
					{<Route path='*' element={<Navigate to={routes.main} />} />}
				</Routes>
			}
			<Snackbar />
		</React.Fragment>
	);
};


export default withLayout(App as any);



