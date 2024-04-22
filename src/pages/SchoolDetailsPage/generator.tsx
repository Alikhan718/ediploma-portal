import React from "react";

import {ReactComponent as PasswordIcon} from "@src/assets/icons/Password.svg";
import {ReactComponent as EmailIcon} from "@src/assets/icons/Letter.svg";
import FastIcon from "@src/components/FastIcon/FastIcon";

export const navigation = [

    {
        title: {
            "en": "Main information",
            "ru": 'Основная информация',
            "kz": 'Жеке ақпарат'
        },
        reference: 0,
        icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
    },
    {
        title: {
            "en": "Email",
            "ru": 'Email',
            "kz": 'Email'
        },
        reference: 1,
        icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
    },
    {
        title: {
            "en": "Password",
            "ru": 'Пароль',
            "kz": 'Кұпия сөз'
        },
        reference: 2,
        icon: <PasswordIcon color="primary" style={{marginRight: '0.5rem'}}/>
    },
];

const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateHttpsLink = (link: string) => {
    const httpsRegex = /^https:\/\/.+/;
    return httpsRegex.test(link);
};

const validatePassword = (password: string) => {
    return password.length >= 8;
};

const validatePhoneNumber = (phoneNumber: string) => {
    // Assuming a phone number format of +77777777777
    const phoneRegex = /^\+\d{11}$/;
    return phoneRegex.test(phoneNumber);
};

const validateField = (type: string, val: string) => {
    switch (type) {
        case "email":
            return validateEmail(val);
        case "password":
            return validatePassword(val);
        case "phoneNumber":
            return validatePhoneNumber(val);
        case "link":
            return validateHttpsLink(val);
        default:
            return true;
    }
};

const socialForms = [
    {
        type: "link",
        name: "instagram_link",
        maxRows: 1,
        multiline: true,
        label: "Instagram",
        placeholder: "https://www.example.com"
    },
    {
        type: "link",
        name: "telegram_link",
        maxRows: 1,
        multiline: true,
        label: "Telegram",
        placeholder: "https://www.example.com"
    },
    {
        type: "link",
        name: "youtube_link",
        maxRows: 1,
        multiline: true,
        label: "YouTube",
        placeholder: "https://www.example.com"
    },
    {
        type: "link",
        name: "linkedin_link",
        maxRows: 1,
        multiline: true,
        label: "Linkedin",
        placeholder: "https://www.example.com"
    },
    {
        type: "link",
        name: "facebook_link",
        maxRows: 1,
        multiline: true,
        label: "Facebook",
        placeholder: "https://www.example.com"
    },
];

export const content = {
    "*": [
        {
            title: {
                "en": "Email",
                "kz": "Email",
                "ru": "Email"
            },
            additionalText: {
                "en": "Your current email is: ",
                "kz": "Сіздің қазіргі поштаныз бұл: ",
                "ru": "Ваша текущая почта: "
            },
            name: "email",
            reference: 1,
            forms: [{
                type: "email",
                name: "email",
                multiline: false,
                label: {
                    "en": "New email*",
                    "kz": "Жаңа пошта*",
                    "ru": "Новая почта*"
                },
                placeholder: "Email"
            }]
        },
        {
            title: {
                "en": "Change your password",
                "kz": "Құпия сөзді өзгертіңіз",
                "ru": "Смена пароля"
            },
            additionalText: null,
            name: "password",
            reference: 2,
            forms: [
                {
                    type: "password",
                    name: "password",
                    multiline: false,
                    label: {
                        "en": "Current password*",
                        "kz": "Қазіргі қүпия сөз*",
                        "ru": "Текущий пароль*"
                    },
                    placeholder: {
                        "en": "Enter your current password",
                        "kz": "Қазіргі қүпия сөзінізді енгізіңіз",
                        "ru": "Введите текущий пароль"
                    }
                },
                {
                    type: "password",
                    name: "newPassword",
                    multiline: false,
                    label: {
                        "en": "New passwords*",
                        "kz": "Жаңа құпия сөз*",
                        "ru": "Новый пароль*"
                    },
                    placeholder: {
                        "en": "Enter new password",
                        "kz": "Жаңа құпия сөзінізді енгізіңіз",
                        "ru": "Введите новый пароль"
                    }
                },
                {
                    type: "password",
                    name: "rePassword",
                    multiline: false,
                    label: {
                        "en": "Verify new password*",
                        "kz": "Жаңа құпия сөзінізді растаңыз*",
                        "ru": "Подтвердите новый пароль"
                    },
                    placeholder: {
                        "en": "Verify new password*",
                        "kz": "Жаңа құпия сөзінізді растаңыз*",
                        "ru": "Подтвердите новый пароль"
                    },
                },
            ]
        },
        {
            title: {
                "en": "Privacy",
                "kz": "Privacy",
                "ru": "Конфидециальность"
            },
            additionalText: {
                "en": "Display diploma for employers",
                "kz": "Дипломды жұмыс берушіге көрсету",
                "ru": "Отображать диплом для работодателей"
            },
            name: "privacy",
            reference: 3,
            forms: [],
        },
        {
            title: {
                "en": "Social networks",
                "kz": "Әлеуметтік желілер",
                "ru": "Социальные сети"
            },
            additionalText: null,
            name: "socials",
            reference: 2,
            forms: socialForms
        }
    ],
    "university": {
        title: {
            "en": "Main information",
            "kz": "Басты ақпарат",
            "ru": "Основная информация"
        },
        additionalText: null,
        name: "main",
        reference: 0,
        forms: [
            {
                type: "text",
                name: "name",
                label: {
                    "en": "University name",
                    "kz": "Университеттің аты",
                    "ru": "Название университета"
                },
                placeholder: {
                    "en": "Enter full name of the university",
                    "kz": "Университеттің толық атауын енгізіңіз",
                    "ru": "Введите имя университета"
                }
            },
            {
                type: "phone",
                name: "phone",
                label: {
                    "en": "Phone number",
                    "kz": "Қоңырау шалу нөмірі",
                    "ru": "Номер телефона"
                },
                placeholder: "+7"
            },
            {
                type: "email",
                name: "email",
                label: {
                    "en": "University email",
                    "kz": "Университеттің поштасы",
                    "ru": "Email университета"
                },
                placeholder: "example@info.kz"
            },
            {
                type: "number",
                name: "student_amount",
                label: {
                    "en": "Number of students",
                    "kz": "Студенттер саны",
                    "ru": "Количество студентов"
                },
                placeholder: "####"
            },
            {
                type: "number",
                name: "graduate_amount",
                label: {
                    "en": "Number of alumnis",
                    "kz": "Түлектер саны",
                    "ru": "Количество алгоритмов"
                },
                placeholder: "####"
            },
            {
                type: "number",
                name: "highlighting_amount",
                label: {
                    "en": "Number of highlighting students",
                    "kz": "Үздіктер саны",
                    "ru": "Количество студентов с отличием"
                },
                placeholder: "####"
            },
            {
                type: "number",
                name: "average_gpa",
                label: {
                    "en": "Average GPA",
                    "kz": "Орташа GPA",
                    "ru": "Средний GPA"
                },
                placeholder: "####"
            },
            {
                type: "text",
                name: "description",
                label: {
                    "en": "Description",
                    "kz": "Сипаттама",
                    "ru": "Описание"
                },
                multiline: true,
                rows: 4,
                placeholder: {
                    "en": "Briefly describe the university",
                    "kz": "Университетті қысқаша сипаттаңыз",
                    "ru": "Описание университета",
                }
            },
            {
                type: "link",
                name: "web_link",
                maxRows: 1,
                multiline: true,
                label: "Web",
                placeholder: "https://www.example.com"
            },
            {
                type: "file",
                name: "gallery",
                multiline: true,
                label: {
                    "en": "University images",
                    "kz": "Университет суреттері",
                    "ru": "Изображения университета"
                },
                placeholder: null
            },
        ]
    },
    "student": {
        title: {
            "en": "Personal information",
            "kz": "Жеке ақпарат",
            "ru": "Личная информация"
        },
        additionalText: null,
        name: "main",
        reference: 0,
        forms: [
            {
                type: "text",
                name: "name",
                disabled: true,
                label: {
                    "kz": "Толық аты жөніңіз",
                    "ru": "Полное имя",
                    "en": "Full name"
                },
                placeholder: ""
            },
            {
                type: "link",
                name: "resume_link",
                maxRows: 1,
                multiline: true,
                label: {
                    "kz": "Резюмеңізге сілтеме",
                    "ru": "Ссылка на резюме",
                    "en": "Resume link"
                },
                placeholder: "https://www.example.com"
            },
            {
                type: "phone",
                name: "phone",
                maxRows: 1,
                multiline: true,
                label: {
                    "en": "Mobile phone",
                    "kz": "Телефон нөміріңіз",
                    "ru": "Номер телефона"
                },
                placeholder: "+7"
            },
        ]
    },
    "employer": {
        title: {
            "en": "Personal information",
            "kz": "Жеке ақпарат",
            "ru": "Личная информация"
        },
        additionalText: null,
        name: "main",
        reference: 0,
        forms: [
            {
                type: "text",
                name: "name",
                label: {
                    "kz": "Толық аты жөніңіз",
                    "ru": "Полное имя",
                    "en": "Full name"
                },

                placeholder: ""
            },
            {
                type: "phone",
                name: "phone",
                maxRows: 1,
                multiline: true,
                label: {
                    "en": "Mobile phone",
                    "kz": "Телефон нөміріңіз",
                    "ru": "Номер телефона"
                },
                placeholder: "+7"
            },
            {
                type: "text",
                name: "description",
                label: {
                    "en": "Description",
                    "kz": "Сипаттама",
                    "ru": "Описание"
                },
                multiline: true,
                rows: 4,
                placeholder: {
                    "en": "Briefly describe the university",
                    "kz": "Университетті қысқаша сипаттаңыз",
                    "ru": "Описание университета",
                }
            },
            {
                type: "text",
                name: "position",
                label: {
                    "en": "Position",
                    "kz": "Қызметі",
                    "ru": "Должность"
                },
                multiline: true,
                placeholder: {
                    "en": "for ex. Founder",
                    "kz": "Мысалы Негізін қалаушы",
                    "ru": "Например Основатель"
                },
            },
            {
                type: "number",
                name: "branches_amount",
                label: {
                    "en": "Number of Branches",
                    "kz": "Филиалдар саны",
                    "ru": "Кол-во филлиалов"
                },
                placeholder: "####"
            },
            {
                type: "number",
                name: "vacancy_amount",
                label: {
                    "en": "Open Vacancies",
                    "kz": "Бос жұмыс орындар",
                    "ru": "Открытых ваканскии"
                },
                placeholder: "####"
            },
            {
                type: "number",
                name: "hired_amount",
                label: {
                    "en": "Employees Hired",
                    "kz": "Жұмысқа алынғандар саны",
                    "ru": "Нанято сотрудников"
                },
                placeholder: "####"
            },
            {
                type: "link",
                name: "web_link",
                maxRows: 1,
                multiline: true,
                label: "Web",
                placeholder: "https://www.example.com"
            },
        ]
    },
};

export const localization = {
    "kz": {
        MainCard: {
            uniNames: "Сәтпаев Университеті",
            uniName: "Қазақстан-Британ техникалық университеті",
            ratings: "пікірлер",
            mail: "Пошта",
            phone: "Телефон нөмірі",
            numStudents: "Студенттер саны",
            numAlumnies: "Түлектер саны",
            numExtra: "Үздіктер саны",
            gpa: "Орташа GPA",
            mainInfo: "Негізгі ақпарат",
            info2: "Satbayev University-ғылыми-инновациялық зерттеулер мен жоғары дәлдіктегі өндірістің жақсы дамыған инфрақұрылымы бар Қазақстандағы ең ірі ғылыми-білім беру кешені.Кешен негізінде құрылған инновациялық экожүйе университетке технологиялық дамудың жоғары қарқынын қамтамасыз етеді.Университет өндірістерге ғылыми қолдау көрсетуді және ғылыми зерттеулер мен стартаптарды қаржыландыруға көмектесуді ұсынады",
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
            smart: "Смарт-контракт",
            smartlink: "Смарт-контрактқа сілтеме",
            finish: "Аяқтау"
        },
        Alerts: {
            copied: "Көшірілді!",
        }
    },
    "ru": {
        MainCard: {
            uniNames: "Сатпаевский Университет",
            uniName: "Казахстанско-Британский Технический Университет",
            ratings: "отзывов",
            mail: "Почта",
            phone: "Номер телефона",
            numStudents: "Кол-во студентов",
            numAlumnies: "Кол-во выпускников",
            numExtra: "Кол-во c отличием",
            gpa: "Средний GPA",
            mainInfo: "Основная информация",
            info2: "Satbayev University – крупнейший в Казахстане научно-образовательный комплекс с хорошо развитой инфраструктурой научно-инновационных исследований и высокоточного производства.Инновационная экосистема, созданная на базе комплекса, обеспечивает университету высокий темп технологического развития.Университет предлагает научную поддержку производств и содействие в поиске финансирования для научных исследований и стартапов.",
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
            download: "Загрузка файлов",
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
            addressLink: "Ссылка на адрес IPFS",
            smart: "Смарт-контракт",
            smartlink: "Ссылка на смарт-контракт",
            finish: "Завершить"
        },
        Alerts: {
            copied: "Скопиравно!",
        }
    },
    "en": {
        MainCard: {
            uniNames: "Satpayev University",
            uniName: "Kazakhstan-British Technical University",
            ratings: "feedbacks",
            mail: "E-mail",
            phone: "Phone number",
            numStudents: "Number of students",
            numAlumnies: "Number of alumnies",
            numExtra: "Number of outstandings",
            gpa: "Average GPA",
            mainInfo: "Main information",
            info2: "Satbayev University is the largest scientific and educational complex in Kazakhstan with a well–developed infrastructure of scientific and innovative research and high-precision production.The innovative ecosystem created on the basis of the complex provides the university with a high rate of technological development.The University offers scientific support to industries and assistance in finding funding for research and start-ups",
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
            addressLink: "Link to IPFS address",
            smart: "Smart-contract",
            smartlink: "Link to smart-contract",
            finish: "Finish"
        },
        Alerts: {
            copied: "Copied!",
        }
    },
};

export const schools = {
    1: {
        id: 1,
        banner: "",
        name: {
            'kz': 'Назарбаев Зияткерлік мектебі IB',
            'ru': 'Назарбаев Интеллектуальная Школа IB',
            'en': 'Nazarbayev Intellectual School IB'
        },
        description: {
            'kz': 'Астана қаласандағы Назарбаев зияткерлік мектебі халықаралық бакалавриат бағдарламаларын қолдана отырып, дарынды студенттерге білім беру мүмкіндіктерін ұсынатын және зияткерлік қоғамдастықты, мәдениетаралық түсінушілікті және өмір бойы оқуды бағалай білуді дамыту міндеті болып табылатын халықаралық мектеп. Қоғамдастық ретінде біз оқу бағдарламалары мен қосымша білім беру курстары негізінде жоғары сапалы оқыту мен оқытуды; ұлттық және жеке құндылықтарды тәрбиелеу арқылы оқушылардың әл-ауқаты мен қауіпсіздігіне қамқорлық жасауды қамтамасыз етеміз.',
            'ru': 'Назарбаев Интеллектуальная школа города Астана является международной школой, которая предоставляет образовательные возможности  одаренным учащимся, используя программы Международного бакалавриата, и чью миссию мы разделяем через развитие интеллектуального сообщества, межкультурного понимания и умения ценить обучение в течение всей жизни. Как сообщество мы обеспечиваем преподавание и обучение высокого качества на основе учебных программ и курсов дополнительного образования, заботу о благосостоянии  и безопасности  учащихся через воспитание национальных и личных ценностей.',
            'en': 'Nazarbayev Intellectual School of Astana is an international school that provides educational opportunities for gifted students through International Baccalaureate programmes and whose mission is to develop intellectual community, intercultural understanding and the value of lifelong learning. As a community, we provide learning and teaching of high quality (HQTL) through curriculum and further education courses. We care for the welfare and safety of students through the cultivation of national and personal values.'
        },
        phone: '8 (7172) 55 80 33',
        graduate_amount: '-',
        student_amount: '-',
        average_gpa: '-',
        highlighting_amount: '-',
        university_id: 4,
    },
    2: {
        id: 2,
        banner: "",
        name: {
            'kz': 'Мирас',
            'ru': 'Мирас',
            'en': 'Miras',
        },
        description: {
            'kz': '«Мирас» мектебі 1999 жылы есігін айқара ашты және халықаралық бакалавриат бағдарламасының барлық деңгейлеріне рұқсат етілген және Халықаралық мектептер кеңесі (ТМД) аккредитациясынан өткен Қазақстан астанасындағы алғашқы ресми танылған халықаралық мектеп болды. Қазақстан Республикасы Үкіметінің 2012 жылғы 28 ақпандағы No267 қаулысына сәйкес мектепке елімізде алғаш рет халықаралық мектеп мәртебесі ресми түрде берілді. 1999-2014 жылдар аралығында мектеп Қазақстан Республикасы Білім және ғылым министрлігінің тәжірибелік алаңы болды. Эксперименттік жұмыстың нәтижелері Қазақстандағы мектеп білімін жаңарту бағдарламасының негізін құрады. Мектепте 2 мен 18 жас аралығындағы балаларға арналған бірегей интеграцияланған білім беру бағдарламалары әзірленіп, сәтті жүзеге асырылуда.',
            'ru': 'Школа “Мираc ” открыла свои двери в 1999 году и стала первой официально признанной международной школой в столице Казахстана, авторизованной по всем ступеням программы Международного Бакалавриата (International Baccalaureate) и аккредитованной Советом международных школ (CIS). В соответствии с Постановлением Правительства Республики Казахстан № 267 от 28 февраля 2012 года за школой впервые в стране был официально закреплён статус международной школы. В период с 1999 по 2014 годы школа являлась экспериментальной площадкой Министерства образования и науки Республики Казахстан.   Результаты экспериментальной работы были положены в основу программы обновления школьного образования в Казахстане. Школой разработаны и успешно реализуются уникальные интегрированные образовательные программы  для детей в возрасте от 2 до 18 лет',
            'en': 'The Miras School opened its doors in 1999 and became the first officially recognized international school in the capital of Kazakhstan, authorized for all levels of the International Baccalaureate program and accredited by the Council of International Schools (CIS). In accordance with Decree of the Government of the Republic of Kazakhstan No. 267 dated February 28, 2012, the school was officially assigned the status of an international school for the first time in the country. In the period from 1999 to 2014, the school was an experimental site of the Ministry of Education and Science of the Republic of Kazakhstan. The results of the experimental work formed the basis of a program for updating school education in Kazakhstan. The school has developed and successfully implemented unique integrated educational programs for children aged 2 to 18 years'
        },
        phone: '8 (717)2 36 98 67',
        graduate_amount: '-',
        student_amount: '-',
        average_gpa: '-',
        highlighting_amount: '-',
        university_id: 5,
    }
}