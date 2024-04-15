import {routes} from "@src/shared/routes";
import tengriLogo from "@src/assets/icons/tengrilogo.png";
import turkmenLogo from "@src/assets/icons/tp_logo.png";
import profitLogo from "@src/assets/icons/profitLogo.jpeg";

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
        Media: {
            title: 'СМИ о нас',
            elements: [
                {
                    avatar: tengriLogo,
                    fullname: "Tengrinews",
                    text: "Қазақстан-Британ техникалық университеті Қазақстандағы дипломдар үшін өзгермейтін NFT токендерін шығарған алғашқы университет болды.",
                    link: "https://tengrinews.kz/news/v-kazahstane-vpervyie-vyidali-diplomyi-v-vide-nft-504947/",
                },
                {
                    avatar: turkmenLogo,
                    fullname: "Turkmenportal",
                    text: "Қазақстан-Британ техникалық университетінің студенттері алған NFT дипломдары білім беру саласында блокчейн технологияларын қолданудың алғашқы оқиғасы болды. Жүйені университет студенттерінің өздері жасаған. Мұндай дипломды қолдан жасауға болмайды және оның түпнұсқалығын жүйенің өзі оңай растайды.",
                    link: "https://turkmenportal.com/blog/64612/studenty-odnogo-iz-vuzov-kazahstana-vpervye-stali-obladatelyami-nftdiplomov",
                },
                {
                    avatar: profitLogo,
                    fullname: "Profit",
                    text: "ҚБТУ білім беру саласындағы инновацияларды ұсынды. NFT технологиясына негізделген цифрлық дипломдардың шығарылымы ҚБТУ және RIT студенттері негізін қалаған JASAIM студенттік стартапымен бірлесіп жарияланды.",
                    link: "https://profit.kz/news/64771/KBTU-vipustil-NFT-diplomi-sovmestno-so-studencheskim-startapom-JASAIM/",
                },
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
            ]
        },
        Media: {
            title: 'СМИ о нас',
            elements: [
                {
                    avatar: tengriLogo,
                    fullname: "Tengrinews",
                    text: "Казахстанско-Британский технический университет стал первым вузом в Казахстане, который выдал невзаимозаменяемые токены NFT для дипломов.",
                    link: "https://tengrinews.kz/news/v-kazahstane-vpervyie-vyidali-diplomyi-v-vide-nft-504947/",
                },
                {
                    avatar: turkmenLogo,
                    fullname: "Turkmenportal",
                    text: "NFT-дипломы, полученные студентами Казахстанско-Британского технического университета, стали первым случаем использования блокчейн-технологий в области образования. Система была разработана самими студентами университета. Такой диплом нельзя подделать и его подлинность легко подтверждается самой системой.",
                    link: "https://turkmenportal.com/blog/64612/studenty-odnogo-iz-vuzov-kazahstana-vpervye-stali-obladatelyami-nftdiplomov",
                },
                {
                    avatar: profitLogo,
                    fullname: "Profit",
                    text: "КБТУ представил инновацию в образовательной сфере. Объявлено о выпуске цифровых дипломов на основе технологии NFT в сотрудничестве со студенческим стартапом JASAIM, основанным студентами КБТУ и RIT.",
                    link: "https://profit.kz/news/64771/KBTU-vipustil-NFT-diplomi-sovmestno-so-studencheskim-startapom-JASAIM/",
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
        Media: {
            title: 'СМИ о нас',
            elements: [
                {
                    avatar: tengriLogo,
                    fullname: "Tengrinews",
                    text: "The Kazakh-British Technical University has become the first university in Kazakhstan to issue non-fungible NFT tokens for diplomas.",
                    link: "https://tengrinews.kz/news/v-kazahstane-vpervyie-vyidali-diplomyi-v-vide-nft-504947/",
                },
                {
                    avatar: turkmenLogo,
                    fullname: "Turkmenportal",
                    text: "NFT diplomas received by students of the Kazakh-British Technical University became the first case of using blockchain technologies in the field of education. The system was developed by university students themselves. Such a diploma cannot be faked and its authenticity is easily confirmed by the system itself.",
                    link: "https://turkmenportal.com/blog/64612/studenty-odnogo-iz-vuzov-kazahstana-vpervye-stali-obladatelyami-nftdiplomov",
                },
                {
                    avatar: profitLogo,
                    fullname: "Profit",
                    text: "KBTU presented innovation in the educational field. The release of digital diplomas based on NFT technology was announced in collaboration with the student startup JASAIM, founded by students of KBTU and RIT.",
                    link: "https://profit.kz/news/64771/KBTU-vipustil-NFT-diplomi-sovmestno-so-studencheskim-startapom-JASAIM/",
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