
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

export const localization = {
	"kz":{
		Modal: {
			msg: "Қолдану үшін авторизация қажет",
			authorize: "Авторизация жасау",
		},
		switchDetails: {
			check: "Тексеру", 
			data: "Ақпарат",
			status: "Статус:",
			confirmed: "Расталды",
			seeEtherscan: "Etherscan-да қарау",
			seeSmartContract: "Smart Contract-та қарау",

		},
		StudentPage: {
			Menu: {
				goto: "Сайтқа өту",
				favorite: "Таңдауларға қосу",
				share: "Бөлісу",
			},
			MainInfo: {
				nameUni: "Вуз атауы: ",
				major: "Мамандық: ",
				degree: "Деңгей: ",
				graduationYear: "Аяқтау жылы: ",
				kbtu: "Қазақстан-Британ Техникалық Университет",
				noData: "Ақпарат жеткіліксіз",
			},
			AddInfo:{
				sendInvite: "Шақыру жіберу",
				about: "Түлек туралы",
				show: "Көрсету",
				more: "көбірек",
				less: "аз",
				certifications: "Дипломдар және Сертификаттар",
			},
			Alert: {
				copied: "Сәтті көшірілді",
			}
		}
    },
	"ru":{
		Modal: {
			msg: "Для использования требуется авторизация",
			authorize: "Авторизоваться",
		},
		switchDetails: {
			check: "Проверка", 
			data: "Данные",
			status: "Статус:",
			confirmed: "Подтвержден",
			seeEtherscan: "Посмотреть на Etherscan",
			seeSmartContract: "Посмотреть на Smart Contract",

		},
		StudentPage: {
			Menu: {
				goto: "Перейти на сайт",
				favorite: "В  Избранное",
				share: "Поделиться",
			},
			MainInfo: {
				nameUni: "Название вуза: ",
				major: "Cпециальность: ",
				degree: "Степень: ",
				graduationYear: "Год окончания: ",
				kbtu: "Казахстанско-Британский технический университет",
				noData: "Недостаточно данных",
			},
			AddInfo:{
				sendInvite: "Отправить приглашение",
				about: "О выпускнике",
				show: "Показать",
				more: "больше",
				less: "меньше",
				certifications: "Дипломы и Сертификаты",
			},
			Alert: {
				copied: "Успешно скопировано",
			}
		}
    },
	"en":{
		Modal: {
			msg: "Authorization is required to use this feature",
			authorize: "Authorize",
		},
		switchDetails: {
			check: "Check",
			data: "Data",
			status: "Status:",
			confirmed: "Confirmed",
			seeEtherscan: "View on Etherscan",
			seeSmartContract: "View on Smart Contract",
		},
		StudentPage: {
			Menu: {
				goto: "Go to the website",
				favorite: "Add to Favorites",
				share: "Share",
			},
			MainInfo: {
				nameUni: "University name: ",
				major: "Major: ",
				degree: "Degree: ",
				graduationYear: "Graduation year: ",
				kbtu: "Kazakh-British Technical University",
				noData: "No data",
			},
			AddInfo:{
				sendInvite: "Send invitation",
				about: "About graduate",
				show: "Show",
				more: "more",
				less: "less",
				certifications: "Diplomas and Certificates",
			},
			Alert: {
				copied: "Copied successfully",
			}
		},
    },
};
