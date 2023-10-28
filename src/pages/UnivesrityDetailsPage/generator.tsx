import React from "react";

import {ReactComponent as PasswordIcon} from "@src/assets/icons/Password.svg";
import {ReactComponent as EmailIcon} from "@src/assets/icons/Letter.svg";
import FastIcon from "@src/components/FastIcon/FastIcon";

export const navigation = [
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
    {
        title: 'Удалить аккаунт',
        reference: 3,
        icon: <FastIcon name={"trash"} style={{marginRight: '0.5rem'}} color="primary"/>
    }
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
