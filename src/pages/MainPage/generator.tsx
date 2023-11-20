import { routes } from "@src/shared/routes";

export const localization = {
	"kz": {
		Hero: {
			title: 'Блокчейндағы цифрлық',
			titleBlue: 'дипломдарының',
			titleEnd: ' ресми порталы',
			description: 'Дипломды тексеріп, компанияға жоғары бағалы түлектерді табыңыз'
		},
		SearchField: {
			placeholder: 'Толық есімі, университет аты',
			search: 'Іздеу',
		},
		WorkPrincipal: {
			title: 'Процесс негіздері',
			description: 'Дипломды тексеріп, компанияға жоғары',
			description2: 'бағалы түлектерді табыңыз',
		},
		Upload: {
			title: 'Түлектер туралы деректерді жүктеу',
			description: 'Дипломдарды жасау және метадеректерді келесі Excel пішімінде қолданамыз. Жүйеге тіркелгеннен кейін, жеке кабинетке кіріп, жаңа NFT диплом коллекциясын жасау процесін бастауыңыз.',
		}
		,
		Check: {
			title: 'Дипломдарды тексеріңіз',
			description: 'Деректерді жүктегеннен кейін өтінішті дипломдарды тексеріп көріңіз, суреттер мен метадеректермен жасалған архивді жүктеп алу арқылы.',
		},
		Select: {
			title: 'Дипломдарды ЭЦП арқылы растау',
			description: 'Келесі қадамда сіз өтінішті дипломдарды электронды қолтаумен қолдайсыз. Біз қауіпсіздік мақсатында ЭЦҚ пайдаланамыз',
		},
		Results: {
			title: 'Жаңа дипломдарды порталда көру',
			description: 'Барлық жасалды! Аталған дипломдарды blockchain-ге жүктеу порталы, жаңа коллекция үшін сілтемелерді аласыздар!',

		},
		Reviews: {
			title: 'Пікірлер',
			elements: [
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "КБТУ Ректоры",
					text: "КБТУ  Қазақстандағы дипломды НФТ түрінде енгізген алғашқы университет. Біздің студенттер бірінші болып блокчейн арқылы дипломдарын растаудың бірегей мүмкіндігіне иеленді.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "КБТУ Ректоры",
					text: "КБТУ  Қазақстандағы дипломды НФТ түрінде енгізген алғашқы университет. Біздің студенттер бірінші болып блокчейн арқылы дипломдарын растаудың бірегей мүмкіндігіне иеленді.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "КБТУ Ректоры",
					text: "КБТУ  Қазақстандағы дипломды НФТ түрінде енгізген алғашқы университет. Біздің студенттер бірінші болып блокчейн арқылы дипломдарын растаудың бірегей мүмкіндігіне иеленді.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "КБТУ Ректоры",
					text: "КБТУ  Қазақстандағы дипломды НФТ түрінде енгізген алғашқы университет. Біздің студенттер бірінші болып блокчейн арқылы дипломдарын растаудың бірегей мүмкіндігіне иеленді.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "КБТУ Ректоры",
					text: "КБТУ  Қазақстандағы дипломды НФТ түрінде енгізген алғашқы университет. Біздің студенттер бірінші болып блокчейн арқылы дипломдарын растаудың бірегей мүмкіндігіне иеленді.",
					rate: 5,
				},
			]
		},
		AboutUs: {
			contactsTitle: "Байланыс \nмәліметтері",
			description: "Сізге жауап беру үшін, электрондық пошта және \n мекен-жайыңызды енгізіңіз!",
			address: {
				title: "Мекен-жай",
				value: "Astana, Mangilik el 55/14 C2.2"
			},
			contacts: {
				email: "info@jasaim.kz",
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
		Footer: {
			city: "Астана қ.",
			links1: [
				{
					title: "eDiploma",
					link: routes.main
				}, {
					title: "Біз туралы",
					link: routes.aboutUs
				}, {
					title: "Байланыс",
					link: routes.aboutUs
				},
			],
			links2: [
				{
					title: "Түлектер",
					link: routes.hrBank
				},
				{
					title: "Профиль",
					link: routes.profile
				},
			],
			links3: [
				{
					title: "Университеттерге",
					link: routes.university
				},
				{
					title: "Дипломдар",
					link: routes.hrBank
				},
				{
					title: "Сыбайластық",
					link: routes.aboutUs
				},
			],
		},
	},
	"ru": {
		Hero: {
			title: 'Цифровой портал ',
			titleBlue: 'дипломов ',
			titleEnd: 'на блокчейне',
			description: 'Проверьте диплом и найдите себе лучших \nвыпускников в компанию'
		},
		SearchField: {
			placeholder: 'Фамилия Имя, название вуза',
			search: 'Найти',
		},
		WorkPrincipal: {
			title: 'Принципы работы',
			description: 'Проверьте диплом и найдите себе лучших',
			description2: 'выпускников в компанию',
		},
		Upload: {
			title: 'Загрузите данные о выпускниках',
			description: 'Для создания изображений дипломов и метаданных мы используем исходные данные в формате Excel. После регистрации зайдите в личный кабинет и начните процесс создания новой коллекции дипломов NFT.',
		}
		,
		Check: {
			title: 'Проверьте сгенерированные дипломы',
			description: 'После загрузки проверьте корректность сгенерированных дипломов, скачав архив с изображениями и метаданными.',
		},
		Select: {
			title: 'Подпишите дипломы ЭЦП',
			description: 'На следующем этапе вы подписываете сформированные дипломы электронной подписью. Мы используем ЭЦП в целях безопасности',
		},
		Results: {
			title: 'Просмотреть новые дипломы на портале',
			description: 'Все готово! Теперь портал загрузит сгенерированные дипломы в blockchain, и вы получите ссылки на новую коллекцию!',

		},
		Reviews: {
			title: 'Отзывы',
			elements: [
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "Ректор КБТУ",
					text: "КБТУ стал первым университетом в Казахстане, внедрившим дипломы НФТ. Наши студенты теперь имеют уникальную возможность подтвердить свои дипломы с помощью блокчейна.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "Ректор КБТУ",
					text: "КБТУ стал первым университетом в Казахстане, внедрившим дипломы НФТ. Наши студенты теперь имеют уникальную возможность подтвердить свои дипломы с помощью блокчейна.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "Ректор КБТУ",
					text: "КБТУ стал первым университетом в Казахстане, внедрившим дипломы НФТ. Наши студенты теперь имеют уникальную возможность подтвердить свои дипломы с помощью блокчейна.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "Ректор КБТУ",
					text: "КБТУ стал первым университетом в Казахстане, внедрившим дипломы НФТ. Наши студенты теперь имеют уникальную возможность подтвердить свои дипломы с помощью блокчейна.",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "Ректор КБТУ",
					text: "КБТУ стал первым университетом в Казахстане, внедрившим дипломы НФТ. Наши студенты теперь имеют уникальную возможность подтвердить свои дипломы с помощью блокчейна.",
					rate: 5,
				},
			]
		},
		AboutUs: {
			contactsTitle: "Контакты",
			description: "Введите свой адрес электронной\n почты для того чтобы мы могли вам ответить!",
			address: {
				title: "Адрес",
				value: "Astana, Mangilik el 55/14 C2.2"
			},
			contacts: {
				email: "info@jasaim.kz",
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
		Footer: {
			city: "г. Астана",
			links1: [
				{
					title: "eDiploma",
					link: routes.main
				}, {
					title: "О нас",
					link: routes.aboutUs
				}, {
					title: "Контакты",
					link: routes.aboutUs
				},
			],
			links2: [
				{
					title: "Выпуск",
					link: routes.hrBank
				},
				{
					title: "Профиль",
					link: routes.profile
				},
			],
			links3: [
				{
					title: "Университетам",
					link: routes.university
				},
				{
					title: "Дипломы",
					link: routes.hrBank
				},
				{
					title: "Сотрудничество",
					link: routes.aboutUs
				},
			],
		},

	},
	"en": {
		Hero: {
			title: 'Digital portal ',
			titleBlue: 'of diplomas ',
			titleEnd: 'on blockchain',
			description: 'Verify your diploma and find \nthe best graduates for your company'
		},
		SearchField: {
			placeholder: 'Full name, University',
			search: 'Search',
		},
		WorkPrincipal: {
			title: 'Work principles',
			description: 'Verify your diploma and find the best ',
			description2: 'graduates for your company',
		},
		Upload: {
			title: 'Upload alumni data',
			description: 'To generate diploma images and metadata, we use source data in Excel format. After registration, go to your personal account and begin the process of creating a new NFT diploma collection.',
		}
		,
		Check: {
			title: 'Check generated diplomas',
			description: 'After uploading, verify that generated diplomas are correct by downloading archive with images and metadata',
		},
		Select: {
			title: 'Sign diplomas with digital signature',
			description: 'In the next step, you sign generated diplomas using an electronic signature. We use EDS for security reasons',
		},
		Results: {
			title: 'View new diplomas on portal',
			description: 'All done! Now portal will upload newly generated diplomas to the blockchain and you will get links for new collection!',

		},
		Reviews: {
			title: 'Reviews',
			elements: [
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "KBTU President",
					text: "KBTU was the first university in Kazakhstan to implement NFT diplomas. Our students now have unique ability to verify their diplomas with blockchain",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "KBTU President",
					text: "KBTU was the first university in Kazakhstan to implement NFT diplomas. Our students now have unique ability to verify their diplomas with blockchain",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "KBTU President",
					text: "KBTU was the first university in Kazakhstan to implement NFT diplomas. Our students now have unique ability to verify their diplomas with blockchain",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "KBTU President",
					text: "KBTU was the first university in Kazakhstan to implement NFT diplomas. Our students now have unique ability to verify their diplomas with blockchain",
					rate: 5,
				},
				{
					avatar: "https://kbtu.edu.kz/images/gabdullin_m.png",
					fullname: "KBTU President",
					text: "KBTU was the first university in Kazakhstan to implement NFT diplomas. Our students now have unique ability to verify their diplomas with blockchain",
					rate: 5,
				},
			]
		},
		AboutUs: {
			contactsTitle: "Contacts",
			description: "Enter your email address \n so we can respond to you!",
			address: {
				title: "Address",
				value: "Astana, Mangilik el 55/14 C2.2"
			},
			contacts: {
				email: "info@jasaim.kz",
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
		Footer: {
			city: "Astana c.",
			links1: [
				{
					title: "eDiploma",
					link: routes.main
				}, {
					title: "About us",
					link: routes.aboutUs
				}, {
					title: "Contacts",
					link: routes.aboutUs
				},
			],
			links2: [
				{
					title: "Graduation",
					link: routes.hrBank
				},
				{
					title: "Profile",
					link: routes.profile
				},
			],
			links3: [
				{
					title: "For Universities",
					link: routes.university
				},
				{
					title: "Diplomas",
					link: routes.hrBank
				},
				{
					title: "Cooperation",
					link: routes.aboutUs
				},
			],
		},

	},
};