import {routes} from "@src/shared/routes";

export const signals = [
	{
		id: 1,
		name: 'Glovo',
		isActive: false,
	},
	{
		id: 2,
		name: 'Wolt',
		isActive: true,
	},
	{
		id: 3,
		name: 'Choco Food',
		isActive: true,
	}
];

export const restaurants = [
	{ id: "1rest", name: "Farsh Burger Abu Dhabi" },
	{ id: "2rest", name: "Salam Bro Abaya" },
];

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