const appRoot = '/app';

export const routes: Record<string, string> = {
	login: `/auth/login`,
	register: `/auth/register`,
	passwordReset: `/auth/password-reset`,
	main: `${appRoot}/main`,
	diploma: `${appRoot}/diploma`,
	diplomaDetails: `${appRoot}/diploma/:id/details`,
	university: `${appRoot}/university`,
	universityDetails: `${appRoot}/university/1`,
	aboutUs: `${appRoot}/about-us`,
	vacancies: `${appRoot}/vacancies`,
	news: `${appRoot}/news`,
	addingGraduates: `${appRoot}/addingGraduates`,
	settings: `${appRoot}/settingsPage`,
	notifications: `${appRoot}/notifications`,
};
