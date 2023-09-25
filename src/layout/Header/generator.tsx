import React from 'react';

import { routes } from "@src/shared/routes";
import { ReactComponent as DiplomaIcon } from "@src/assets/icons/Widget.svg";
import { ReactComponent as MainPageIcon } from "@src/assets/icons/pie.svg";
import { ReactComponent as UniversityIcon } from "@src/assets/icons/Folder.svg";

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
		to: routes.notifications,
		role: "*",
		icon: <MainPageIcon />,
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