import React, { ReactNode } from 'react';
import { routes } from "@src/shared/routes";
import { ReactComponent as DiplomaIcon } from "@src/assets/icons/Widget.svg";
import { ReactComponent as MainPageIcon } from "@src/assets/icons/pie.svg";
import { ReactComponent as FolderIcon } from "@src/assets/icons/Folder.svg";
import { ReactComponent as HrBankIcon } from "@src/assets/icons/academic_cap.svg";
import { ReactComponent as UniversityIcon } from "@src/assets/icons/buildings.svg";
import { ReactComponent as AboutUsIcon } from "@src/assets/icons/jiggle_user.svg";
import { ReactComponent as LangIcon } from "@src/assets/icons/global.svg";
import { ReactComponent as ModeIcon } from "@src/assets/icons/moon.svg";
import { ReactComponent as Avatar } from "@src/assets/icons/avatar_outlined.svg";
import { ReactComponent as Analytics } from "@src/assets/icons/analytics_outlined.svg";
import { ReactComponent as Folder } from "@src/assets/icons/folder_outilne.svg";
import { ReactComponent as Settings } from "@src/assets/icons/Settings.svg";
import { ReactComponent as Out } from "@src/assets/icons/logout_outline.svg";

export interface AppRoutesNavigation {
	id: number;
	name: {
		ru: string;
		kz: string;
		en: string;
	};
	to: typeof routes[keyof typeof routes];
	icon: ReactNode;
	role: string[];
	verticalAlign: string,
	function?: () => void,
}

export const sidebarNavigations: AppRoutesNavigation[] = [
	{
		id: 101,
		name: {
			"ru": 'Профиль',
			"kz": 'Профиль',
			"en": 'Dashboard',
		},
		to: routes.universityProfile,
		role: ["student", "employer", "university"],
		icon: <DiplomaIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: "bottom",
	},
	{
		id: 102,
		name: {
			"ru": 'Аналитика',
			"kz": 'Аналитика',
			"en": 'Analytics',
		},
		to: routes.analysisPage,
		role: ["university"],
		icon: <MainPageIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: "middle",
	},
	{
		id: 103,
		name: {
			"ru": 'Университеты',
			"kz": 'Универститеттер',
			"en": 'Universities',
		},
		to: routes.university,
		role: ["university", "employer", "student"],
		icon: <UniversityIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: "middle",
	},
	{
		id: 104,
		name: {
			"ru": 'HR Bank',
			"kz": 'HR Bank',
			"en": 'HR Bank',
		},
		to: routes.hrBank,
		role: ["university", "employer", "student"],
		icon: <HrBankIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: "middle",
	},
	{
		id: 105,
		name: {
			"ru": 'Выпустить дипломы',
			"kz": 'Диплом шығару',
			"en": 'Issue diplomas',
		},
		to: routes.addingGraduates,
		role: ['university'],
		icon: <FolderIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
];
export const headerNavigations: AppRoutesNavigation[] = [
	{
		id: 104,
		name: {
			"ru": 'HR Bank',
			"kz": 'HR Bank',
			"en": 'HR Bank',
		},
		to: routes.hrBank,
		role: ['*'],
		icon: <HrBankIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
	{
		id: 103,
		name: {
			"ru": 'Университеты',
			"kz": 'Университеттер',
			"en": 'Universities',
		},
		to: routes.university,
		role: ['*'],
		icon: <UniversityIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
	{
		id: 106,
		name: {
			"ru": 'О нас',
			"kz": 'Біз туралы',
			"en": 'About us',
		},
		to: routes.aboutUs,
		role: ['*'],
		icon: <AboutUsIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},

];
export const interFaceOptions: AppRoutesNavigation[] = [
	{
		id: 201,
		name: {
			"ru": 'Режим',
			"kz": 'Режим',
			"en": 'Mode',
		},
		to: '#',
		role: ['*'],
		icon: <ModeIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},
	{
		id: 202,
		name: {
			"ru": 'Язык',
			"kz": 'Тіл',
			"en": 'Language',
		},
		to: '#',
		role: ['*'],
		icon: <LangIcon style={{ verticalAlign: "middle" }} />,
		verticalAlign: '',
	},


];
export const dropdownItems: AppRoutesNavigation[] = [
	{
		id: 101,
		name: {
			"ru": 'Профиль',
			"kz": 'Профиль',
			"en": 'Profile',
		},
		to: routes.profile,
		role: ['student', 'employer', 'university'],
		icon: <Avatar style={{ marginRight: '10px', verticalAlign: "center" }} />,
		verticalAlign: '',
	},
	{
		id: 102,
		name: {
			"ru": 'Аналитика',
			"kz": 'Аналитика',
			"en": 'Analytics',
		},
		to: "#",
		// to: routes.analytics,
		role: ["university"],
		icon: <Analytics style={{ marginRight: '10px', verticalAlign: "center" }} />,
		verticalAlign: "middle",
	},
	{
		id: 103,
		name: {
			"ru": 'Университеты',
			"kz": 'Универститеттер',
			"en": 'Universities',
		},
		to: routes.university,
		role: ["university", "employer", "student"],
		icon: <UniversityIcon style={{ marginRight: '10px', verticalAlign: "center" }} />,
		verticalAlign: "middle",
	},
	{
		id: 104,
		name: {
			"ru": 'HR Bank',
			"kz": 'HR Bank',
			"en": 'HR Bank',
		},
		to: routes.hrBank,
		role: ["university", "employer", "student"],
		icon: <HrBankIcon style={{ marginRight: '10px', verticalAlign: "center" }} />,
		verticalAlign: "middle",
	},
	{
		id: 105,
		name: {
			"ru": 'Выпустить дипломы',
			"kz": 'Диплом шығару',
			"en": 'Issue diplomas',
		},
		// to: "#",
		to: routes.addingGraduates,
		role: ["university"],
		icon: <Folder style={{ marginRight: '10px', verticalAlign: "center" }} />,
		verticalAlign: "middle",
	},


];

export const dropdownItemsBottom: AppRoutesNavigation[] = [
	{
		id: 106,
		name: {
			"ru": 'Настройки',
			"kz": 'Параметрлер',
			"en": 'Settings',
		},
		to: routes.settings,
		role: ['student', 'employer', 'university'],
		icon: <Settings style={{ marginRight: '10px', verticalAlign: "center" }} />,
		verticalAlign: '',
		function: () => {
		},
	},
	{
		id: 401,
		name: {
			"ru": 'Выйти',
			"kz": 'Шығу',
			"en": 'Logout',
		},
		to: routes.login,
		role: ['student', 'employer', 'university'],
		icon: <Out style={{ marginRight: '10px', verticalAlign: "center" }} />,
		verticalAlign: "red",
		function: () => {

		},
	},
];
export const localization = {
	account: {
		"ru": "Аккаунт",
		"kz": "Аккаунт",
		"en": "Account",
	},
	contactUs: {
		"ru": "Появились вопросы?\nСвяжитесь с нами!",
		"kz": "Сұрақтар пайда болды ма?\nБізге хабарласыңыз!",
		"en": "Have a question?\nContact us!"
	},
	logout: {
		"ru": "Вы действительно хотите выйти из профиля?",
		"kz": "Сіз шынымен профильден шыққыңыз келе ме?",
		"en": "Do you want to logout of the profile?"
	},
	log: {
		"ru": 'Выйти',
		"kz": 'Шығу',
		"en": 'Logout',

	},
	cancel: {
		"ru": 'Отменить',
		"kz": 'Бас тарту',
		"en": 'Cancel',
	},
	lang1: {
		"ru": 'Русский',
		"kz": 'Орысша',
		"en": 'Russian',
	},
	lang2: {
		"ru": 'Казахский',
		"kz": 'Қазақша',
		"en": 'Kazakh',
	},
	lang3: {
		"ru": 'Английский',
		"kz": 'Ағылшынша',
		"en": 'English',
	}
}
