
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
	"kz": {
		Header: {
			filter: "Фильтр",
			searchBar: "Университеттің атауы",
			searchButton: "Іздеу",
			university: "Университеттер",
		},
		UniCards: {
			nameKBTU: "Қазақстан-Британ Техникалық Университеті (КБТУ)",
			nameKBTUshort: "Қазақстан-Британ Техникалық Университеті",
			nameSU: "Қ.И.Сәтбаев атындағы Қазақстандық Ұлттық Техниқалық Зерттеу Университеті (ҚазҰТЗУ)",
			nameSUshort: "Сәтбаев Университет (CУ)",
			ratings: "пікірлер",
			majors: "Түлектер",
			city: "Қала",
		},
	},
	"ru": {
		Header: {
			filter: "Фильтр",
			searchBar: "Название вуза",
			searchButton: "Поиск",
			university: "Университеты",
		},
		UniCards: {
			nameKBTU: "Казахстанско-Британский Технический Университет (КБТУ)",
			nameKBTUshort: "Казахстанско-Британский Технический Университет",
			nameSU: "Казахский национальный исследовательский технический университет имени К. И. Сатпаева (КазНИТУ)",
			nameSUshort: "Сатпаев Университет (CУ)",
			ratings: "отзывов",
			majors: "Выпукников",
			city: "Город",
		},
	},
	"en": {
		Header: {
			filter: "Filter",
			searchBar: "University name",
			searchButton: "Search",
			university: "Universities",
		},
		UniCards: {
			nameKBTU: "Kazakh-British Technical University (KBTU)",
			nameKBTUshort: "Kazakh-British Technical University",
			nameSU: "Kazakh National Research Technical University named after K. I. Satpayev (KazNTU)",
			nameSUshort: "Satpaev University (SU)",
			ratings: "feedbacks",
			majors: "Graduates",
			city: "City",
		}
	},
}

export const universityNames = {
	'КазНИТУ имени  К. И. Сатпаева': {
		'kz': 'Қ.И. атыңдағы ҚазҰТЗУ',
		'ru': 'КазНИТУ имени К. И. Сатпаева',
		'en': 'Satbayev University'
	},
	'Казахстанско-Британский Технический Университет': {
		'kz': 'Қазақстан-Британ техникалық университеті',
		'ru': 'Казахстанско-Британский Технический Университет',
		'en': 'Kazakhstan-British Technical University'
	},
	'Q-Lab': {
		'kz': 'Q-Lab',
		'ru': 'Q-Lab',
		'en': 'Q-Lab',
	},
};

export const universityGraduatesCount = {
	1: 705,
	2: 30,
	3: 2111,
};

export const universityCity = {
	1: {
		kz: 'Алматы',
		ru: 'Алматы',
		en: 'Almaty',
	},
	2: {
		kz: 'Алматы',
		ru: 'Алматы',
		en: 'Almaty',
	},
	3: {
		kz: 'Алматы',
		ru: 'Алматы',
		en: 'Almaty',
	},
}