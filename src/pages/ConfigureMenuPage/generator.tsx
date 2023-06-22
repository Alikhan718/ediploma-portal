import { menu_routes } from "@src/shared/routes";

export const menuItems = {
	id: 1,
	image: 'https://via.placeholder.com/150x150',
	title: 'Тетя из Барселоны',
	description: 'Сочный чизбургер с двойной котлетой из мраморной говядины, двойной порцией сыра чеддер, спелыми...',
	price: '30 500.00 тг',
};

export const defaultValues: any = {
	attribute_groups: [],
	attributes: [],
	by_admin: false,
	code: "3254654445220218",
	created_at: {},
	default_attributes: [],
	description: [{ Value: "", LanguageCode: "ru" }],
	id: "6dc7ddfd-c000-4e00-ac20-e1664af650b1",
	images: ["https://via.placeholder.com/150x150"],
	is_available: true,
	name: [{ Value: "", LanguageCode: "ru" }],
	price: [{ Value: 0 }],

	section: "9ce225ba-056f-013b-0168-3de1cb119fc9",
	sync: false
};

export const MenuActions = {
	EDIT_MENU: 'Изменить меню',
	EDIT_ATTRIBUTE_GROUP: 'Изменить атрибут-группы',
	EDIT_ATTRIBUTE: 'Изменить атрибуты',
	DELETE_MENU: 'Удалить меню'
};
// { name: "Изменить меню", goTo: (): string => menu_routes.edit, newPage: false },
// { name: "Изменить атрибут-группы", goTo: (menuID: string): string => `/app/menu/configure/${menuID}/attribute-group`, newPage: true },
// { name: "Изменить атрибуты", },
// { name: "Удалить меню", },


export const attributeTooltip = "Скрытые атрибуты нужны для того, чтобы при отправке заказа в кассу на их основе понимали некоторые доп детали по заказу. Но они не будут отображаться в меню сервисов доставки (то есть пользователи не будут видеть его)";

export enum DescriptionTypes {
	DELETE, ADD, CHANGE
}