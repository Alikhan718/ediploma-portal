const appRoot = '';

export const routes: Record<string, string> = {
	login: `/auth/login`,
	register: `/auth/register`,
	passwordReset: `/auth/password-reset`,
	main: `${appRoot}`,
	hrBank: `${appRoot}/hr-bank`,
	diplomaDetails: `${appRoot}/diploma/:id/:token`,
	university: `${appRoot}/university`,
	universityDetails: `${appRoot}/university/:id`,
 	universityProfileSecond: `${appRoot}/university/satpayev-university`,
	qLab: `${appRoot}/university/qlab`,
	aboutUs: `${appRoot}/about-us`,
	vacancies: `${appRoot}/vacancies`,
	news: `${appRoot}/news`,
	notifications: `${appRoot}/notifications`,
	student: `${appRoot}/student/:id`,
	employer: `${appRoot}/employer/:id`,
	analysisPage: `${appRoot}/analysisPage`,
	notFound: `${appRoot}/notFound`,
	server: `${appRoot}/server`,
	// universityDetails: `${appRoot}/university/:id/detail`,
	// aboutUs: `${appRoot}/about-us`,
	addingGraduates: `${appRoot}/university/graduates/add`,
	settings: `${appRoot}/user/settings`,
	profile: `${appRoot}/user/profile`,
	resumeGenerator: `${appRoot}/user/resume-generator`,
	studentProfile: `${appRoot}/user/profile`,
	employerProfile: `${appRoot}/user/profile`,
	universityProfile: `${appRoot}/user/profile`,
	// universityProfile: `${appRoot}/user/profile`,
	// vacancies: `${appRoot}/vacancies`,
	// news: `${appRoot}/news`,
	// notifications: `${appRoot}/user/notifications`,
	aiChat: `${appRoot}/ai-chat`,
	myDiplomas: `${appRoot}/user/profile/my-diplomas`,
	school: `${appRoot}/school`,
	schoolDetails: `${appRoot}/school/:id`,
};
