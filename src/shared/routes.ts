const appRoot = '/app';

export const routes = {
	login: `/auth/login`,
	register: `/auth/register`,
	forgotPassword: `auth/forgot-password`,
	attributeGroup: `${appRoot}/menu/configure/:menu_id/attribute-group`,
	callCenter: `${appRoot}/call-center`,
	configureMenu: `${appRoot}/menu/configure/:aggregator/:menuId`,
	configureIIKOMenu: `${appRoot}/menu/configure-iiko/:menuId`,
	createMenuSuccess: `${appRoot}/createMenu/success`,
	location: `${appRoot}/location`,
	matchMenu: `${appRoot}/createMenu/match-menu/:menuId`,
	menu: `${appRoot}/menu`,
	order: `${appRoot}/order`,
	publicationMenu: `${appRoot}/publication-menu`,
	stopList: `${appRoot}/stopList`,
	timeSetting: `${appRoot}/time-settings`,
	uploadMenu: `${appRoot}/createMenu/upload-file`,
	main: `${appRoot}/`,
	diploma: `${appRoot}/diploma`,
	diplomaDetails: `${appRoot}/diploma/1`,
	university: `${appRoot}/university`,
};
export const menu_routes = {
	create_product: "create-product",
	edit: "edit",
	edit_product: "edit-product/:product_id",
	edit_attribute_group: "edit-attribute-group/:product_id/attribute_group_id/:attribute_group_id",
	select_all: "edit-product/:product_id/select-all"
};
