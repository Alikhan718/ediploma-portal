
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
		MainCard: {
			uniName: "Қазақстан-Британ техникалық университеті",
			ratings: "пікірлер",
			mail: "Пошта",
			phone: "Телефон нөмірі",
			numStudents: "Студенттер саны",
			numAlumnies: "Түлектер саны",
			numExtra: "Үздіктер саны",
			gpa: "Орташа GPA",
			mainInfo: "Негізгі ақпарат",
			info: "eDiploma – JASAIM командасы әзірлеген, құжатты бұрмалау мүмкіндігін жоққа шығаратын NFT (нұсқаланбайтын токен) форматындағы түлектердің қағаз дипломдарын цифрлауды қамтамасыз ететін онлайн платформа. eDiploma порталы түлектерге, жұмыс берушілерге және университет әкімшілігіне дипломдармен жеке кабинеттер арқылы өзара әрекеттесу мүмкіндігін береді, бітірушілердің біліктілігін тексеру және растау процестерін жеңілдетеді.",
			show: "Көрсету",
			more: "көбірек",
			less: "аз",
		},
		Students: {
			diplomas: "Түлектердің дипломдары",
			filter: "Фильтр",
			searchBar: "Іздеу",
			fullname: "Толық аты-жөні",
			major: "Мамандық",
			graduationYear: "Аяқатаған жылы",
		},
	},
	"ru":{
		MainCard: {
			uniName: "Казахстанско-Британский Технический Университет",
			ratings: "отзывов",
			mail: "Почта",
			phone: "Номер телефона",
			numStudents: "Кол-во студентов",
			numAlumnies: "Кол-во выпускников",
			numExtra: "Кол-во c отличием",
			gpa: "Средний GPA",
			mainInfo: "Основная информация",
			info: "eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов. Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы проверки и подтверждения квалификации выпускников.",
			show: "Показать",
			more: "больше",
			less: "меньше",
		},
		Students: {
			diplomas: "Дипломы выпускников",
			filter: "Фильтр",
			searchBar: "Поиск",
			fullname: "ФИО",
			major: "Специальность",
			graduationYear: "Год выпуска",
		},
	},
	"en":{
		MainCard: {
			uniName: "Kazakhstan-British Technical University",
			ratings: "feedbacks",
			mail: "E-mail",
			phone: "Phone number",
			numStudents: "Number of students",
			numAlumnies: "Number of alumnies",
			numExtra: "Number of outstandings",
			gpa: "Average GPA",
			mainInfo: "Main information",
			info: "eDiploma is an online platform developed by the JASAIM team that provides digitization of paper diplomas of graduates in NFT (non-fungible token) format, which eliminates the possibility of document falsification. The eDiploma portal provides an opportunity for graduates, employers and university administrations to interact with diplomas through personal accounts, facilitating the processes of verification and confirmation of graduates’ qualifications.",
			show: "Show",
			more: "more",
			less: "less",
		},
		Students: {
			diplomas: "Alumnies' diplomas",
			filter: "Filter",
			searchBar: "Search",
			fullname: "Full name",
			major: "Major",
			graduationYear: "Graduation year",
		},
	},
}