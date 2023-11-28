import React from "react";

import {ReactComponent as PasswordIcon} from "@src/assets/icons/Password.svg";
import {ReactComponent as EmailIcon} from "@src/assets/icons/Letter.svg";
import FastIcon from "@src/components/FastIcon/FastIcon";

export const navigation = {
    "kz":[
        {
            title: 'Основная информация',
            reference: 0,
            icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
        {
            title: 'Почта',
            reference: 1,
            icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
        {
            title: 'Пароль',
            reference: 2,
            icon: <PasswordIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
    ],
    "ru":[
        {
            title: 'Основная информация',
            reference: 0,
            icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
        {
            title: 'Почта',
            reference: 1,
            icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
        {
            title: 'Пароль',
            reference: 2,
            icon: <PasswordIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
    ],
    "en":[
        {
            title: 'Main information',
            reference: 0,
            icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
        {
            title: 'Email',
            reference: 1,
            icon: <EmailIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
        {
            title: 'Password',
            reference: 2,
            icon: <PasswordIcon color="primary" style={{marginRight: '0.5rem'}}/>
        },
    ],
};

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

export const content = {
    "kz": {
        "*": [
            {
                title: "Пошта",
                additionalText: "Сіздің қазіргі поштаныз бұл: ",
                name: "email",
                reference: 1,
                forms: [{
                    type: "email",
                    name: "email",
                    multiline: false,
                    label: "Жаңа пошта*",
                    placeholder: "Email"
                }]
            },
            {
                title: "Құпия сөзді өзгертіңіз",
                additionalText: null,
                name: "password",
                reference: 2,
                forms: [
                    {
                        type: "password",
                        name: "password",
                        multiline: false,
                        label: "Қазіргі қүпия сөз*",
                        placeholder: "Қазіргі қүпия сөзінізді енгізіңіз"
                    },
                    {
                        type: "password",
                        name: "newPassword",
                        multiline: false,
                        label: "Жаңа құпия сөз*",
                        placeholder: "Жаңа құпия сөзінізді енгізіңіз"
                    },
                    {
                        type: "password",
                        name: "rePassword",
                        multiline: false,
                        label: "Жаңа құпия сөзінізді растаңыз*",
                        placeholder: "Жаңа құпия сөзінізді растаңыз"
                    },
                ]
            },
            {
                title: "Әлеуметтік желілер",
                additionalText: null,
                name: "socials",
                reference: 2,
                forms: [
                    {
                        type: "link",
                        name: "web_link",
                        maxRows: 1,
                        multiline: true,
                        label: "Web",
                        placeholder: "https://www.example.com"
                    },
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
                ]
            }
        ],
        "university":
            {
                title: "Басты ақпарат",
                additionalText: null,
                name: "main",
                reference: 0,
                forms: [
                    {
                        type: "text",
                        name: "name",
                        label: "Университеттің аты",
                        placeholder: "Университеттің толық атауын енгізіңіз"
                    },
                    {
                        type: "phone",
                        name: "phone",
                        label: "Қоңырау шалу нөмірі",
                        placeholder: "+7"
                    },
                    {
                        type: "email",
                        name: "email",
                        label: "Университеттің поштасы",
                        placeholder: "example@info.kz"
                    },
                    {
                        type: "number",
                        name: "student-amount",
                        label: "Студенттер саны",
                        placeholder: "####"
                    },
                    {
                        type: "number",
                        name: "graduate-amount",
                        label: "Түлектер саны",
                        placeholder: "####"
                    },
                    {
                        type: "number",
                        name: "highlighting-amount",
                        label: "Үздіктер саны",
                        placeholder: "####"
                    },
                    {
                        type: "text",
                        name: "description",
                        label: "Басты ақпарат",
                        multiline: true,
                        rows: 4,
                        placeholder: "Университетті қысқаша сипаттаңыз"
                    },
                ]
            }
        ,
        "student":
            null
        ,
        "employer":
            null
        ,
    },
    "ru": {
        "*": [
            {
                title: "Почта",
                additionalText: "Ваш текущий email это: ",
                name: "email",
                reference: 1,
                forms: [{
                    type: "email",
                    name: "email",
                    multiline: false,
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
                        multiline: false,
                        label: "Текущий пароль*",
                        placeholder: "Введите текущий пароль"
                    },
                    {
                        type: "password",
                        name: "newPassword",
                        multiline: false,
                        label: "Новый пароль*",
                        placeholder: "Введите новый пароль"
                    },
                    {
                        type: "password",
                        name: "rePassword",
                        multiline: false,
                        label: "Подтвердите новый пароль*",
                        placeholder: "Введите подтверждение нового пароля"
                    },
                ]
            },
            {
                title: "Социальные сети",
                additionalText: null,
                name: "socials",
                reference: 2,
                forms: [
                    {
                        type: "link",
                        name: "web_link",
                        maxRows: 1,
                        multiline: true,
                        label: "Web",
                        placeholder: "https://www.example.com"
                    },
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
                        type: "phone",
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
            null
        ,
        "employer":
            null
        ,
    },
    "en": {
        "*": [
            {
                title: "Email",
                additionalText: "Your current email is: ",
                name: "email",
                reference: 1,
                forms: [{
                    type: "email",
                    name: "email",
                    multiline: false,
                    label: "New email*",
                    placeholder: "Email"
                }]
            },
            {
                title: "Change your password",
                additionalText: null,
                name: "password",
                reference: 2,
                forms: [
                    {
                        type: "password",
                        name: "password",
                        multiline: false,
                        label: "Current password*",
                        placeholder: "Enter your current password"
                    },
                    {
                        type: "password",
                        name: "newPassword",
                        multiline: false,
                        label: "New passwords*",
                        placeholder: "Enter new password"
                    },
                    {
                        type: "password",
                        name: "rePassword",
                        multiline: false,
                        label: "Verify new password*",
                        placeholder: "Enter the verification of the new password"
                    },
                ]
            },
            {
                title: "Social networks",
                additionalText: null,
                name: "socials",
                reference: 2,
                forms: [
                    {
                        type: "link",
                        name: "web_link",
                        maxRows: 1,
                        multiline: true,
                        label: "Web",
                        placeholder: "https://www.example.com"
                    },
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
                ]
            }
        ],
        "university":
            {
                title: "Main information",
                additionalText: null,
                name: "main",
                reference: 0,
                forms: [
                    {
                        type: "text",
                        name: "name",
                        label: "University name",
                        placeholder: "Enter te full name of the university"
                    },
                    {
                        type: "phone",
                        name: "phone",
                        label: "Phone number",
                        placeholder: "+7"
                    },
                    {
                        type: "email",
                        name: "email",
                        label: "University email",
                        placeholder: "example@info.kz"
                    },
                    {
                        type: "number",
                        name: "student-amount",
                        label: "Number of students",
                        placeholder: "####"
                    },
                    {
                        type: "number",
                        name: "graduate-amount",
                        label: "Number of alumnis",
                        placeholder: "####"
                    },
                    {
                        type: "number",
                        name: "highlighting-amount",
                        label: "Number of outstanding students",
                        placeholder: "####"
                    },
                    {
                        type: "text",
                        name: "description",
                        label: "Main information",
                        multiline: true,
                        rows: 4,
                        placeholder: "Briefly describe the university"
                    },

                ]
            }
        ,
        "student":
            null
        ,
        "employer":
            null
        ,
    },
};

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
            info: "eDiploma – JASAIM командасы әзірлеген, құжатты бұрмалау мүмкіндігін жоққа шығаратын NFT (нұсқаланбайтын токен) форматындағы түлектердің қағаз дипломдарын цифрлауды қамтамасыз ететін онлайн платформа. eDiploma порталы түлектерге, жұмыс берушілерге және университет әкімшілігіне дипломдармен жеке кабинеттер арқылы өзара әрекеттесу мүмкіндігін береді, бітірушілердің біліктілігін тексеру және растау процестерін жеңілдетеді.",
            show: "Көрсету",
            more: "көбірек",
            less: "аз",
            diploma: "Диплом",
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
            info: "eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов. Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы проверки и подтверждения квалификации выпускников.",
            show: "Показать",
            more: "больше",
            less: "меньше",
            diploma: "Диплом",
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
            info: "eDiploma is an online platform developed by the JASAIM team that provides digitization of paper diplomas of graduates in NFT (non-fungible token) format, which eliminates the possibility of document falsification. The eDiploma portal provides an opportunity for graduates, employers and university administrations to interact with diplomas through personal accounts, facilitating the processes of verification and confirmation of graduates’ qualifications.",
            show: "Show",
            more: "more",
            less: "less",
            diploma: "Diploma",
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
