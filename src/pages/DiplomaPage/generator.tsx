import {routes} from "@src/shared/routes";

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


export const MenuUploadStatusesEnum: { [key: string]: string } = {
	SUCCESS: "Загружен в агрегатор",
	PARTIALLY_PROCESSED: "Частично загружен в агрегатор",

	PROCESSING: "Публикуется",
	NOT_PROCESSED: "Не загружен в аггрегатор",

	READY: "Готов к публикации",
	NOT_READY: "Не готов к публикации",

	ERROR: "Ошибка",
};

export const MenuUploadStatusesColors: { [key: string]: "error" | "success" | "warning" | "info" } = {
	SUCCESS: "success",
	PARTIALLY_PROCESSED: "info",

	PROCESSING: "warning",
	NOT_PROCESSED: "info",

	READY: "success",
	NOT_READY: "error",

	ERROR: "error",
};

export const localization = {
	"kz":{
		Header:{
			filter: "Фильтр",
			searchBar: "Толық есімі, университеттің атауы",
			searchButton: "Іздеу",
			aiHiring: "ЖИ Жалдау"
		},
		Modal:{
			needAuth: "Қарау үшін рұқсаттарды растау қажет",
			authButton: "Рұқсаттарды растау"
		},
	},
	"ru":{
		Header:{
			filter: "Фильтр",
			searchBar: "Фамилия Имя, название вуза",
			searchButton: "Поиск",
			aiHiring: "ИИ Найм"
		},
		Modal:{
			needAuth: "Для просмотра требуется авторизация",
			authButton: "Авторизоваться"
		},
	},
	"en":{
		Header:{
			filter: "Filter",
			searchBar: "Full name, University name",
			searchButton: "Search",
			aiHiring: "AI Hiring"
		},
		Modal:{
			needAuth: "Authorization required to view",
			authButton: "Authorize"
		},
	},
}

type Unis = {
	kz:{[key: number]: string;},
	ru:{[key: number]: string;},
	en:{[key: number]: string;},
};

export const unis: Unis = {
	kz:{
		1: "КБТУ",
		2: "АГП",
	},
	ru:{
		1: "КБТУ",
		2: "АГП",
	},
	en:{
		1: "KBTU",
		2: "AGP",
	},
}

export const uniRatings = {
    1: 4.4,
    2: 0.0,
    3: 4.4,
}