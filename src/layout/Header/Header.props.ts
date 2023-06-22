import { SetStateAction } from "react";

export interface HeaderProps {
	open: boolean;

	restaurantId: string | null,
	currLocation?: string,
	handleRestaurantId: (restId: string) => SetStateAction<any>,
	locations: any;
	menuList: any[];
}