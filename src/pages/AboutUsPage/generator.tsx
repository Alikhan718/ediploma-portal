import { ReactComponent as Advantages1 } from "@src/assets/aboutUs/advantages_1.svg";
import { ReactComponent as Advantages2 } from "@src/assets/aboutUs/advantages_2.svg";
import { ReactComponent as Advantages3 } from "@src/assets/aboutUs/advantages_3.svg";
import { routes } from "@src/shared/routes";

export const advantages = [
	{
		'image': Advantages1,
		'title': "Прозрачность",
		"subtitle": "Применение технологий Blockchain позволяет повысить прозрачность выпуска новых дипломов, и мы стремимся к ее глобализации.",
	},
	{
		'image': Advantages2,
		'title': "Польза",
		'subtitle': "Нам важно чтобы наши продукты приносили пользу. Именно поэтому мы ориентируемся на ваши отзывы и на проблемы требующие решения",
	},
	{
		'image': Advantages3,
		'title': "Цифровизация",
		'subtitle': "Наша команда стремится ко всеобщей цифровизации в разных областях нашей повседневной жизни. Технология Blockchain - один из ключей к решению многих проблем",
	},
];

export const localization = {
	"kz": {
		Info: {
			title: 'Біз туралы',
			description: "2022 жылы Астанада (Қазақстан) құрылған Jasaim компаниясы - бүкіл әлемдік тұтынушылар, сатушылар, әзірлеушілер мен мекемелер үшін Web3, Blockchain және жасанды интеллектті интеграция жасауға көмектесетін қаржылық және білім беру технологиялық шешімдерін әзірлеуші болып табылады",
		},
		Info2: {
			title: 'eDiploma',
			description: "eDiploma-бұл jasaim командасы әзірлеген онлайн-платформа, ол түлектердің қағаз дипломдарын NFT форматында цифрландыруын қамтамасыз етеді (бір-бірін алмастырмайтын таңбалауыштар), бұл жалған құжаттарды жоққа шығаруға мүмкіндік береді.",
			description2: "Ediploma порталы түлектерге, жұмыс берушілерге және университет әкімшіліктеріне түлектердің біліктілігін тексеру процестерін жеңілдете отырып, жеке кабинеттер арқылы дипломдарын растауға мүмкіндік береді.",
		},
		Goal: {
			title: 'Біздің мақсатымыз',
			description: "Дипломдарды қолдан жасау қаупін жою және \nдипломдардың толық ашықтығы",
			elements: [
				{
					'image': Advantages1,
					'title': "Тұнықтық",
					"subtitle": "Blockchain технологияларын қолдануы жаңа дипломдар шығарудың ашықтығын арттыруға мүмкіндік береді және біз \nоның жаһандануына ұмтыламыз.",
				},
				{
					'image': Advantages2,
					'title': "Пайда",
					'subtitle': "Ең мағыздысы біздің өнімдеріміздің пайдалы болуы. Сондықтан да біз пікірлерге және қиындықтарды шешуге назар аударамыз",
				},
				{
					'image': Advantages3,
					'title': "Цифрландыру",
					'subtitle': "Күнделікті қолданылатын салаларын цифрландыру. Ал Blockchain технологиясы - көптеген мәселелерді шешудің кілттерінің бірі болып табылады",
				},
			],
		},
		Team: {
			title: 'Біздің команда',
			description: "Білім беруді трансформациялау үшін блокчейн мен жасанды интеллект технологияларын қолданатын ҚБТУ және РИТ студенттерінің \n адал және құзыретті тобы.",
			elements: [
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Syrym-CEO.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Alikhan-CTO.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Alisher-techlead.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/5.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Kunya-CFO.webp' },
			],
		},
		AboutUs: {
			contactsTitle: "Байланыс \nмәліметтері",
			description: "Сізге жауап беру үшін, электрондық пошта және \n мекен-жайыңызды енгізіңіз!",
			address: {
				title: "Мекен-жай",
				value: "Astana, Mangilik el 55/14 C2.2"
			},
			contacts: {
				email: "jasaim.kz",
				phone: "Телефон: +7 777 646 32 46",
			},
			links: [
				{
					title: "Telegram",
					link: "https://t.me/jasaimhub"
				},
				{
					title: "Instagram",
					link: "https://www.instagram.com/jasaim_blockchain/"
				},
				{
					title: "LinkedIn",
					link: "https://www.linkedin.com/company/96461080/admin/feed/posts/"
				},
			],
			form: {
				name: {
					label: "Сіздің атыңыз",
					placeholder: "Аты-жөні"
				},
				email: {
					label: "Пошта",
					placeholder: "example@mail.com"
				},
				message: {
					label: "Хабарлама",
					placeholder: "Сіздің хабарламаңызды енгізіңіз"
				},
				send: "Жіберу",
			},
		},


	},
	"ru": {
		Info: {
			title: 'О нас',
			description: "Компания JASAIM, основанная в Астане (Казахстан) в 2022 году, является разработчиком финансовых, образовательных технологических решений, которые помогают интегрировать Web3, Blockchain и искусственный интеллект для потребителей, продавцов, разработчиков и учреждений по всему миру",
		},
		Info2: {
			title: 'eDiploma',
			description: "eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов.",
			description2: "Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы проверки и подтверждения квалификации выпускников."
		},
		Goal: {
			title: 'К чему мы стремимся',
			description: "Исключение риска фальсификации дипломов и полная прозрачность \nих выпуска",
			elements: [
				{
					'image': Advantages1,
					'title': "Прозрачность",
					"subtitle": "Применение технологий Blockchain позволяет повысить прозрачность выпуска новых дипломов, и мы стремимся к ее глобализации.",
				},
				{
					'image': Advantages2,
					'title': "Польза",
					'subtitle': "Нам важно чтобы наши продукты приносили пользу. Именно поэтому мы ориентируемся на ваши отзывы и на проблемы требующие решения",
				},
				{
					'image': Advantages3,
					'title': "Цифровизация",
					'subtitle': "Наша команда стремится ко всеобщей цифровизации в разных областях нашей повседневной жизни. Технология Blockchain - один из ключей к решению многих проблем",
				},
			],
		},
		Team: {
			title: 'Наша команда',
			description: "Преданная и компетентная команда студентов КБТУ и РИТ, которые используют блокчейн и технологии искусственного интеллекта для \n трансформации образования.",
			elements: [
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Syrym-CEO.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Alikhan-CTO.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Alisher-techlead.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/5.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Kunya-CFO.webp' },
			],
		},
		AboutUs: {
			contactsTitle: "Контакты",
			description: "Введите свой адрес электронной\n почты для того чтобы мы могли вам ответить!",
			address: {
				title: "Адрес",
				value: "Astana, Mangilik el 55/14 C2.2"
			},
			contacts: {
				email: "jasaim.kz",
				phone: "Телефон: +7 777 646 32 46",
			},
			links: [
				{
					title: "Telegram",
					link: "https://t.me/jasaimhub"
				},
				{
					title: "Instagram",
					link: "https://www.instagram.com/jasaim_blockchain/"
				},
				{
					title: "LinkedIn",
					link: "https://www.linkedin.com/company/96461080/admin/feed/posts/"
				},
			],
			form: {
				name: {
					label: "Ваше имя",
					placeholder: "ФИО"
				},
				email: {
					label: "Почта",
					placeholder: "example@mail.com"
				},
				message: {
					label: "Сообщение",
					placeholder: "Введите ваше сообщение"
				},
				send: "Отправить",
			},
		},
	},
	"en": {

		Info: {
			title: 'About us',
			description: "Founded in Astana, Kazakhstan in 2022, JASAIM is a developer of financial, educational technology solutions that help integrate Web3, Blockchain and artificial intelligence for consumers, merchants, developers and institutions worldwide",
		},
		Info2: {
			title: 'eDiploma',
			description: "eDiploma is an online platform developed by the JASAIM team that provides digitization of paper diplomas of graduates in NFT (non-fungible token) format, which eliminates the possibility of document falsification.",
			description2: "The eDiploma portal provides an opportunity for graduates, employers and university administrations to interact with diplomas through personal accounts, facilitating the processes of verification and confirmation of graduates’ qualifications."
		},
		Goal: {
			title: 'What we strive for',
			description: "Eliminating the risk of falsification of diplomas and \ncomplete transparency of their issuance",
			elements: [
				{
					'image': Advantages1,
					'title': "Transparency",
					"subtitle": "The use of Blockchain technologies makes it possible to increase the transparency of the issuance of new diplomas, and we are committed to its globalization.",
				},
				{
					'image': Advantages2,
					'title': "Benefit",
					'subtitle': "It is important to us that our products are useful. That is why we focus on your feedback and problems that need to be solved.",
				},
				{
					'image': Advantages3,
					'title': "Digitalization",
					'subtitle': "Our team is committed to universal digitalization in various areas of our daily lives. Blockchain technology is one of the keys to solving many problems",
				},
			],
		},
		Team: {
			title: 'Our Team',
			description: "A dedicated and competent team of KBTU and RIT students who use blockchain and artificial intelligence \n technologies to transform education.",
			elements: [
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Syrym-CEO.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Alikhan-CTO.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Alisher-techlead.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/5.webp' },
				{ 'image': 'https://jasaim.kz/wp-content/uploads/2023/05/Kunya-CFO.webp' },
			],
		},
		AboutUs: {
			contactsTitle: "Contacts",
			description: "Enter your email address \n so we can respond to you!",
			address: {
				title: "Address",
				value: "Astana, Mangilik el 55/14 C2.2"
			},
			contacts: {
				email: "jasaim.kz",
				phone: "Mobile: +7 777 646 32 46",
			},
			links: [
				{
					title: "Telegram",
					link: "https://t.me/jasaimhub"
				},
				{
					title: "Instagram",
					link: "https://www.instagram.com/jasaim_blockchain/"
				},
				{
					title: "LinkedIn",
					link: "https://www.linkedin.com/company/96461080/admin/feed/posts/"
				},
			],
			form: {
				name: {
					label: "Your name",
					placeholder: "Full name"
				},
				email: {
					label: "Email",
					placeholder: "example@mail.com"
				},
				message: {
					label: "Message",
					placeholder: "Enter your message"
				},
				send: "Send",
			},
		},
	},
};