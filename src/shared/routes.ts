const appRoot = '/app';

export const routes = {
    login: `/auth/login`,
    register: `/auth/register`,
    main: `${appRoot}/main`,
    diploma: `${appRoot}/diploma`,
    diplomaDetails: `${appRoot}/diploma/:id/details`,
    university: `${appRoot}/university`,
    universityDetails: `${appRoot}/university/1`,
};
