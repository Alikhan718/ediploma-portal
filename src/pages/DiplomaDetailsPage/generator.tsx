
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
    },
}
