import {routes} from "@src/shared/routes";

export const privateNavigations = [
	{
		id: 1,
		name: 'Дипломы',
		to: routes.diploma,
		role: "*"
	},
	{
		id: 2,
		name: 'Университеты',
		to: routes.university,
		role: "*"
	},

];