import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Snackbar } from '@src/components';
import {
	DiplomaDetailsPage,
	DiplomaPage, ForgotPassword,
	LoginPage,
	MainPage,
	RegisterPage,
	UniversityDetailsPage,
	UniversityPage,
	AddingGraduates,
	SettingsPage,
} from '@src/pages';
import Notifications from './pages/UnivesrityDetailsPage/Notifications';
import { withLayout } from '@src/layout/Layout';
import { routes } from '@src/shared/routes';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { initalApp } from './store/auth/actionCreators';
import { selectAuthLoader } from './store/auth/selector';
import './App.css';
import ReactGA from 'react-ga';

const App: React.FC = () => {

	const TRACKING_ID = "G-H12GFWB4FY"; // OUR_TRACKING_ID
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
					<Route path={routes.login} element={<LoginPage />} />
					<Route path={routes.register} element={<RegisterPage />} />
					<Route path={routes.passwordReset} element={<ForgotPassword />} />
					<Route path={routes.addingGraduates} element={<AddingGraduates />} />
					<Route path={routes.notifications} element={<Notifications />} />
					<Route path={routes.settings} element={<SettingsPage />} />

					{<Route path='*' element={<Navigate to={routes.main} />} />}
				</Routes>
			}
			<Snackbar />
		</React.Fragment>
	);
};


export default withLayout(App as any);



