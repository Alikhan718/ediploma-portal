const appRoot = '/app';

export const routes: Record<string, string> = {
	login: `/auth/login`,
	register: `/auth/register`,
	passwordReset: `/auth/password-reset`,
	main: `${appRoot}/main`,
	diploma: `${appRoot}/diploma`,
	diplomaDetails: `${appRoot}/diploma/:id/details`,
	university: `${appRoot}/university`,
	universityDetails: `${appRoot}/university/1/detail`,
	universityProfileSecond: `${appRoot}/university/2/profile`,
	aboutUs: `${appRoot}/about-us`,
	vacancies: `${appRoot}/vacancies`,
	news: `${appRoot}/news`,
	addingGraduates: `${appRoot}/addingGraduates`,
	settings: `${appRoot}/settingsPage`,
	notifications: `${appRoot}/notifications`,
	student: `${appRoot}/student/1/details`,
	employer: `${appRoot}/employer/1/details`,
	universityProfile: `${appRoot}/university/1/profile`,
	analysisPage: `${appRoot}/analysisPage`
};
