export const permissions = {
    login: ['*'],
    register: ['*'],
    passwordReset: ['employer', 'student', 'university'],
    main: ['*'],
    diplomaDetails: ['*'],
    hr_bank: ['*'],
    university: ['*'],
    universityDetails: ['*'],	
    server: ['*'],
    notFound: ['*'],
    aboutUs: ['*'],
    addingGraduates: ['university'],
    settings: ['employer', 'student', 'university'],
    studentProfile: ['student'],
    employerProfile: ['employer'],
    universityProfile: ['university'],
    aiChat: ['employer', 'student'],
    myDiplomas: ['student'],
    // vacancies: ['*'],
    // news: ['*'],
    // notifications: ['employer', 'student', 'university'],
    school: ['*'],
    schoolDetails: ['*'],
    employersList: ['*'],
    employerDetails: ['*'],
};

export const hasPermission = (role: string, page: string | string[]): boolean => {
	return page.includes('*') || page.includes(role.toLowerCase());
};
