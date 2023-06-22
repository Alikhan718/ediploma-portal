import React from 'react';
// Drawer head icons
import newKwaakaLogo from '@src/assets/icons/newKwaakaLogo.svg';
import MenuIcon from '@src/assets/icons/menu.svg';

// Navigation icons
import { ReactComponent as NavLocationIcon } from '@src/assets/icons/navLocation.svg';
import { ReactComponent as NavMenuIcon } from '@src/assets/icons/navMenu.svg';
import { ReactComponent as NavOrderIcon } from '@src/assets/icons/navOrder.svg';
import { ReactComponent as NavStopIcon } from '@src/assets/icons/navStop.svg';
import { ReactComponent as NavSettingsIcon } from '@src/assets/icons/settings.svg';
import { routes } from '@src/shared/routes';
import { roles } from "@src/shared/roles";

export const drawerHead = {
	menu: MenuIcon,
	kwaaka: newKwaakaLogo
};

export const privateNavigations = [
	{
		id: 1,
		name: 'Заказы',
		icon: <NavOrderIcon />,
		to: routes.order,
		role: roles.order
	},
	{
		id: 2,
		name: 'Стоп-лист',
		icon: <NavStopIcon />,
		to: routes.stopList,
		role: roles.stopList
	},
	{
		id: 3,
		name: 'Меню',
		icon: <NavMenuIcon />,
		to: routes.menu,
		role: roles.menu
	},
	{
		id: 4,
		name: 'Локации',
		icon: <NavLocationIcon />,
		to: routes.location,
		role: roles.location
	},
	{
		id: 5,
		name: 'Настройки',
		icon: <NavSettingsIcon />,
		role: roles.timeSetting,
		to: routes.timeSetting,
		subNav: [
			{
				id: 11,
				name: 'Настройка времени',
				to: routes.timeSetting
			}
		]
	},
	{
		id: 6,
		name: "Call Center",
		icon: <NavOrderIcon />,
		to: routes.callCenter,
		role: roles.callCenter
	}
];
