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
            smart: "Смарт-контакт",
            smartlink: "Смарт-контактқа сілтеме",
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
            smart: "Смарт-контакт",
            smartlink: "Ссылка на смарт-контакт",
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
            addressLink: "Link to IFPS address",
            smart: "Smart-contact",
            smartlink: "Link to smart-contract",
            finish: "Finish"
        },
        Alerts: {
            copied: "Copied!",
        }
    },
};
