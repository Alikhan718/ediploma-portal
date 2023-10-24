import React from 'react';
import { routes } from "@src/shared/routes";
import { ReactComponent as DiplomaIcon } from "@src/assets/icons/Widget.svg";
import { ReactComponent as MainPageIcon } from "@src/assets/icons/pie.svg";
import { ReactComponent as FolderIcon } from "@src/assets/icons/Folder.svg";
import { ReactComponent as HrBankIcon } from "@src/assets/icons/academic_cap.svg";
import { ReactComponent as UniversityIcon } from "@src/assets/icons/buildings.svg";
import { ReactComponent as AboutUsIcon } from "@src/assets/icons/jiggle_user.svg";
import { ReactComponent as LangIcon } from "@src/assets/icons/global.svg";
import { ReactComponent as ModeIcon } from "@src/assets/icons/moon.svg";

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
		to: routes.universityProfile,
		role: "*",
		icon: <DiplomaIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: "bottom",
	},
	{
		id: 2,
		name: 'Аналитика',
		to: routes.main,
		role: "*",
		icon: <MainPageIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: "middle",
	},
	{
		id: 3,
		name: 'Выпустить дипломы',
		to: routes.addingGraduates,
		role: '*',
		icon: <FolderIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
];
export const headerNavigations: AppRoutesNavigation[] = [
	{
		id: 6,
		name: 'HR Bank',
		to: routes.hrBank,
		role: '*',
		icon: <HrBankIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
	{
		id: 5,
		name: 'Университеты',
		to: routes.university,
		role: '*',
		icon: <UniversityIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
	{
		id: 4,
		name: 'О нас',
		to: routes.aboutUs,
		role: '*',
		icon: <AboutUsIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},

];
export const interFaceOptions: AppRoutesNavigation[] = [
	{
		id: 7,
		name: 'Режим',
		to: '#',
		role: '*',
		icon: <ModeIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
	{
		id: 8,
		name: 'Язык',
		to: '#',
		role: '*',
		icon: <LangIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},


];
