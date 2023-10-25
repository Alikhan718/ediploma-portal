const appRoot = '/app';

export const routes: Record<string, string> = {
	login: `/auth/login`,
	register: `/auth/register`,
	passwordReset: `/auth/password-reset`,
	main: `${appRoot}/main`,
	hrBank: `${appRoot}/hr-bank`,
	diplomaDetails: `${appRoot}/diploma/:id/details`,
	university: `${appRoot}/university`,
	universityDetails: `${appRoot}/university/1/detail`,
	aboutUs: `${appRoot}/about-us`,
	addingGraduates: `${appRoot}/university/graduates/add`,
	settings: `${appRoot}/user/settings`,
	profile: `${appRoot}/user/profile`,
	studentProfile: `${appRoot}/user/profile`,
	employerProfile: `${appRoot}/user/profile`,
	universityProfile: `${appRoot}/user/profile`,
	// vacancies: `${appRoot}/vacancies`,
	// news: `${appRoot}/news`,
	// notifications: `${appRoot}/user/notifications`,
};
