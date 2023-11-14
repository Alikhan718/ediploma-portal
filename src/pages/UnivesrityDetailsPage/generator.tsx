import React from "react";

import { ReactComponent as PasswordIcon } from "@src/assets/icons/Password.svg";
import { ReactComponent as EmailIcon } from "@src/assets/icons/Letter.svg";
import { ReactComponent as ProfileIcon } from "@src/assets/icons/Avatar_out.svg";
import FastIcon from "@src/components/FastIcon/FastIcon";

export const navigation = [
	{
		title: 'Основная информация',
		reference: 0,
		icon: <ProfileIcon color="primary" style={{ marginRight: '0.5rem' }} />
	},
	{
		title: 'Почта',
		reference: 1,
		icon: <EmailIcon color="primary" style={{ marginRight: '0.5rem' }} />
	},
	{
		title: 'Пароль',
		reference: 2,
		icon: <PasswordIcon color="primary" style={{ marginRight: '0.5rem' }} />
	},
	// {
	// 	title: 'Удалить аккаунт',
	// 	reference: 3,
	// 	icon: <FastIcon name={"trash"} style={{ marginRight: '0.5rem' }} color="primary" />
	// }
];

export const content = {
	"*": [
		{
			title: "Почта",
			additionalText: "Ваш текущий email это: ",
			name: "email",
			reference: 1,
			forms: [{
				type: "email",
				name: "email",
				label: "Новый адрес*",
				placeholder: "Email"
			}]
		},
		{
			title: "Измените свой пароль",
			additionalText: null,
			name: "password",
			reference: 2,
			forms: [
				{
					type: "password",
					name: "password",
					label: "Текущий пароль*",
					placeholder: "Введите текущий пароль"
				},
				{
					type: "password",
					name: "newPassword",
					label: "Новый пароль*",
					placeholder: "Введите новый пароль"
				},
				{
					type: "password",
					name: "rePassword",
					label: "Подтвердите новый пароль*",
					placeholder: "Введите подтверждение нового пароля"
				},
			]
		}
	],
	"university":
	{
		title: "Основная информация",
		additionalText: null,
		name: "main",
		reference: 0,
		forms: [
			{
				type: "text",
				name: "name",
				label: "Название университета",
				placeholder: "Введите полное название университета"
			},
			{
				type: "text",
				name: "phone",
				label: "Номер телефона",
				placeholder: "+7"
			},
			{
				type: "email",
				name: "email",
				label: "Почта университета",
				placeholder: "example@info.kz"
			},
			{
				type: "number",
				name: "student-amount",
				label: "Кол-во студентов",
				placeholder: "####"
			},
			{
				type: "number",
				name: "graduate-amount",
				label: "Кол-во выпускников",
				placeholder: "####"
			},
			{
				type: "number",
				name: "highlighting-amount",
				label: "Кол-во c отличием",
				placeholder: "####"
			},
			{
				type: "text",
				name: "description",
				label: "Основная информация",
				multiline: true,
				rows: 4,
				placeholder: "Опишите кратко про университет"
			},

		]
	}
	,
	"student":
		{}
	,
	"employer":
		{}
	,
}
	;

export const localization = {
	"kz": {
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
			info: "Қазақстан-Британ техникалық университеті-өңірдегі жетекші техникалық университеттердің бірі. Біз сапаның, Академиялық адалдық пен ашықтықтың іргелі құндылықтары үшін әлемдік академиялық қауымдастықпен, корпоративтік және мемлекеттік секторлармен серіктестікте жұмыс істейміз.ҚБТУ-әлемдік экономиканың түрлі салалары үшін ғылыми элита мен жоғары білікті кадрларды ғылыми зерттеумен, оқытумен және даярлаумен айналысатын әлемдік деңгейдегі университет.Біз қоғам мен ғылым арасында, Қазақстан мен әлемнің қалған бөлігі арасында технология мен бизнес сияқты салаларда білім көпірін құрып жатырмыз. Біз әртүрлі мүдделі серіктестермен жұмыс жасай отырып, өз қабілеттеріміз бен мүмкіндіктерімізге сенімдіміз. Инновациялық және шығармашылық тәсіл-ҚБТУ үшін басымдық, біздің жобаларымыз тұжырымдамамен ерекшеленеді және әртүрлі міндеттерді шешеді.",
			show: "Көрсету",
			more: "көбірек",
			less: "аз",
			diploma: "Дипломдар",
			analytics: "Аналитика"
		},
		Students: {
			diplomas: "Түлектердің дипломдары",
			filter: "Фильтр",
			searchBar: "Іздеу",
			fullname: "Толық аты-жөні",
			major: "Мамандық",
			graduationYear: "Аяқатаған жылы",
		},
		AddingGratuates: {
			download: "Файлдарды жүктеу",
			check: "Тексеру",
			digital: "ЭЦП қолы",
			results: "Нәтижелер",
			file: "Excel файлын жүктегіңіз немесе",
			file2: "компьютерден таңдаңыз",
			template: "Шаблонды жүктеп алу",
			note: "Көрсеткіш",
			notes: "Көрсеткіш туралы сипаттама",
			data: "Деректерді тексеріңіз",
			nameFile: "Файлдың аты",
			status: "Жағдайы",
			next: "Келесі қадам",
			sign: "ЭЦП арқылы деректерге қол қою",
			signButton: "ЭЦП арқылы қол қою",
			adress: "Мекен-жай",
			addressLink: "Мекен-жайға сілтеме",
			smart: "Смарт-контакт",
			smartlink: "Смарт-контактқа сілтеме",
			finish: "Аяқтау"
		}
	},
	"ru": {
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
			info: "Казахстанско-Британский технический университет - один из ведущих технических университетов региона. Мы работаем в партнерстве с мировым академическим сообществом, корпоративным и государственным секторами над фундаментальными ценностями качества, академической честности и открытости.КБТУ - университет мирового уровня, занимающийся научными исследованиями, обучением и подготовкой научной элиты и высококвалифицированных кадров для различных сфер мировой экономики.Мы наводим мост знаний между обществом и наукой, между Казахстаном и остальным миром в таких областях, как технологии и бизнес. Мы уверены в своих силах и возможностях, работая с разными заинтересованными партнерами. Новаторский и творческий подход - приоритет для КБТУ, наши проекты различаются концепцией и решают разные задачи.",
			show: "Показать",
			more: "больше",
			less: "меньше",
			diploma: "Дипломы",
			analytics: "Аналитика"
		},
		Students: {
			diplomas: "Дипломы выпускников",
			filter: "Фильтр",
			searchBar: "Поиск",
			fullname: "ФИО",
			major: "Специальность",
			graduationYear: "Год выпуска",
		},
		AddingGratuates: {
			download: "Загрузка фалов",
			check: "Проверка",
			digital: "Подписать данные через ЭЦП",
			results: "Результат",
			file: "Перетащите ваш Excel сюда или",
			file2: "выберите с компьютера",
			template: "Скачать шаблон",
			note: "Примечание",
			notes: "Описание примечание",
			data: "Деректерді тексеріңіз",
			nameFile: "Название файла",
			status: "Статус",
			next: "Далее",
			sign: "Подписать данные с помощью ЭЦП",
			signButton: "Подписать через ЭЦП",
			adress: "Адрес",
			addressLink: "Ссылка на адрес IFPS",
			smart: "Смарт-контакт",
			smartlink: "Ссылка на смарт-контакт",
			finish: "Завершить"
		}
	},
	"en": {
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
			info: "The Kazakh-British Technical University is one of the leading technical universities in the region. We work in partnership with the global academic community, corporate and public sectors on the fundamental values of quality, academic integrity and openness.KBTU is a world-class university engaged in scientific research, education and training of the scientific elite and highly qualified personnel for various spheres of the world economy.We are building a bridge of knowledge between society and science, between Kazakhstan and the rest of the world in such areas as technology and business. We are confident in our abilities and capabilities, working with various interested partners. Innovative and creative approach is a priority for KBTU, our projects differ in concept and solve different tasks.",
			show: "Show",
			more: "more",
			less: "less",
			diploma: "Diplomas",
			analytics: "Analytics"
		},
		Students: {
			diplomas: "Alumnies' diplomas",
			filter: "Filter",
			searchBar: "Search",
			fullname: "Full name",
			major: "Major",
			graduationYear: "Grad. year",
		},
		AddingGratuates: {
			download: "Download files",
			check: "Check",
			digital: "Sign data with a digital signature",
			results: "Results",
			file: "Drag and drop your Excel here or",
			file2: "choose from your computer",
			template: "Download template",
			note: "Note",
			notes: "Notes",
			data: "Verify your data",
			nameFile: "File name",
			status: "Status",
			next: "Next",
			sign: "Sign data with a digital signature",
			signButton: "Sign data with a digital signature",
			adress: "Adress",
			addressLink: "Link to IFPS address",
			smart: "Smart-contact",
			smartlink: "Link to smart-contract",
			finish: "Finish"

		}
	},
}
