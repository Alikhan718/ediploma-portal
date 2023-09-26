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
	icon: React.ReactNode,
	verticalAlign: string,
}

export const sidebarNavigations: AppRoutesNavigation[] = [
	{
		id: 1,
		name: 'Dashboard',
		to: routes.universityDetails,
		role: "*",
		icon: <DiplomaIcon style={{verticalAlign: "middle"}} />,
		verticalAlign: "bottom",
	},
	{
		id: 2,
		name: 'Аналитика',
		to: routes.notifications,
		role: "*",
		icon: <MainPageIcon style={{verticalAlign: "middle"}} />,
		verticalAlign: "middle",
	},
	{
		id: 3,
		name: 'Выпустить дипломы',
		to: routes.addingGraduates,
		role: '*',
		icon: <UniversityIcon style={{verticalAlign: "middle"}} />,
		verticalAlign: '',
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
export const headerNavigations: AppRoutesNavigation[] = [
	{
		id: 1,
		name: 'Dashboard',
		to: routes.universityDetails,
		role: "*",
		icon: null,
		verticalAlign: "bottom",
	},
	{
		id: 2,
		name: 'Аналитика',
		to: routes.notifications,
		role: "*",
		icon: null,
		verticalAlign: "middle",
	},
	{
		id: 3,
		name: 'Выпустить дипломы',
		to: routes.addingGraduates,
		role: '*',
		icon: null,
		verticalAlign: '',
	},
	{
		id: 4,
		name: 'О нас',
		to: routes.aboutUs,
		role: '*',
		icon: null,
		verticalAlign: '',
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
