import React from 'react';

import { routes } from "@src/shared/routes";
import { ReactComponent as DiplomaIcon } from "@src/assets/icons/diplomaIcon.svg";
import { ReactComponent as MainPageIcon } from "@src/assets/icons/mainPageIcon.svg";
import { ReactComponent as UniversityIcon } from "@src/assets/icons/universityIcon.svg";

export interface AppRoutesNavigation {
	id: number;
	name: string;
	to: typeof routes[keyof typeof routes];
	role: string;
	icon: React.ReactNode
}

export const privateNavigations: AppRoutesNavigation[] = [
	{
		id: 1,
		name: 'Dashboard',
		to: routes.universityDetails,
		role: "*",
		icon: <DiplomaIcon />,
	},
	{
		id: 2,
		name: 'Аналитика',
		to: routes.login,
		role: "*",
		icon: <UniversityIcon />,
	},
	{
		id: 3,
		name: 'Выпустить дипломы',
		to: routes.addingGraduates,
		role: '*',
		icon: <UniversityIcon />
	},
	// {
	//     id: 4,
	//     name: 'Вакансии',
	//     to: routes.vacancies,
	//     role: '*',
	//     icon: <UniversityIcon />,
	// },
	// {
	//     id: 5,
	//     name: 'Новости',
	//     to: routes.news,
	//     role: '*',
	//     icon: <UniversityIcon />
	// }
];