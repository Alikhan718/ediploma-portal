
export const tableHead = [

	{ id: 1, content: 'Название', sortName: "name" },
	{ id: 2, content: `Кол-во попыток`, sortName: null },
	{ id: 3, content: 'Тип', sortName: "delivery" },
	{ id: 4, content: 'Дата обновления', sortName: "date" },
	{ id: 5, content: 'Статус', sortName: null }
];

export const tableBody = [
	{ name: 'Farsh Menu IIKO', menuType: 'Главное меню', lastDateUpdate: '13/03/2022' },
	{ name: 'Farsh Menu Glovo', menuType: 'Glovo меню', lastDateUpdate: '13/03/2022' },
	{ name: 'Farsh Menu Wolt', menuType: 'Wolt меню', lastDateUpdate: '13/03/2022' },
];

export const getMenuURL = (resti_id: string, menu_id: string): string => {
	return `https://api.kwaaka.com/v1/restaurants/${resti_id}/menus/glovo?menu_id=${menu_id}`;
};

export const MenuUploadStatusesEnum: { [key: string]: string } = {
	SUCCESS: "Загружен в агрегатор",
	PARTIALLY_PROCESSED: "Частично загружен в агрегатор",

	PROCESSING: "Публикуется",
	NOT_PROCESSED: "Не загружен в аггрегатор",

	READY: "Готов к публикации",
	NOT_READY: "Не готов к публикации",

	ERROR: "Ошибка",
	KWAAKA_ERROR: "Наша ошибка"
};

export const MenuUploadStatusesColors: { [key: string]: "error" | "success" | "warning" | "info" } = {
	SUCCESS: "success",
	PARTIALLY_PROCESSED: "info",

	PROCESSING: "warning",
	NOT_PROCESSED: "info",

	READY: "success",
	NOT_READY: "error",

	ERROR: "error",
	KWAAKA_ERROR: "info"
};