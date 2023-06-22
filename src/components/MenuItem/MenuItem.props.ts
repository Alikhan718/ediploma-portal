import React from "react";

export interface MenuItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	menuItem?: any;
	children?: React.ReactNode;

	hanldeClickProduct?: (id: string, is_aviable: boolean) => void

}

interface IMenuItem {
	id: number;
	image: string;
	title: string;
	description: string;
	price: string;
}