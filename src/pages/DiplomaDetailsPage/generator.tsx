export const tableHead = [

    {id: 1, content: 'Название', sortName: "name"},
    {id: 2, content: `Кол-во попыток`, sortName: null},
    {id: 3, content: 'Тип', sortName: "delivery"},
    {id: 4, content: 'Дата обновления', sortName: "date"},
    {id: 5, content: 'Статус', sortName: null}
];

export const tableBody = [
    {name: 'Farsh Menu IIKO', menuType: 'Главное меню', lastDateUpdate: '13/03/2022'},
    {name: 'Farsh Menu Glovo', menuType: 'Glovo меню', lastDateUpdate: '13/03/2022'},
    {name: 'Farsh Menu Wolt', menuType: 'Wolt меню', lastDateUpdate: '13/03/2022'},
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
    "kz": {
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
        StudentPage: {
            Menu: {
                goto: "Сайтқа өту",
                favorite: "Таңдауларға қосу",
                share: "Бөлісу",
            },
            MainInfo: {
                nameUni: "Вуз атауы: ",
                major: "Мамандық: ",
                degree: "Деңгей: ",
                graduationYear: "Аяқтау жылы: ",
                kbtu: "Қазақстан-Британ Техникалық Университет",
                noData: "Ақпарат жеткіліксіз",
            },
            AddInfo: {
                sendInvite: "Шақыру жіберу",
                about: "Түлек туралы",
                show: "Көрсету",
                more: "көбірек",
                less: "аз",
                certifications: "Дипломдар және Сертификаттар",
            },
            Alert: {
                copied: "Сәтті көшірілді",
            }
        }
    },
    "ru": {
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
        StudentPage: {
            Menu: {
                goto: "Перейти на сайт",
                favorite: "В  Избранное",
                share: "Поделиться",
            },
            MainInfo: {
                nameUni: "Название вуза: ",
                major: "Cпециальность: ",
                degree: "Степень: ",
                graduationYear: "Год окончания: ",
                kbtu: "Казахстанско-Британский технический университет",
                noData: "Недостаточно данных",
            },
            AddInfo: {
                sendInvite: "Отправить приглашение",
                about: "О выпускнике",
                show: "Показать",
                more: "больше",
                less: "меньше",
                certifications: "Дипломы и Сертификаты",
            },
            Alert: {
                copied: "Успешно скопировано",
            }
        }
    },
    "en": {
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
        StudentPage: {
            Menu: {
                goto: "Go to the website",
                favorite: "Add to Favorites",
                share: "Share",
            },
            MainInfo: {
                nameUni: "University name: ",
                major: "Major: ",
                degree: "Degree: ",
                graduationYear: "Graduation year: ",
                kbtu: "Kazakh-British Technical University",
                noData: "No data",
            },
            AddInfo: {
                sendInvite: "Send invitation",
                about: "About graduate",
                show: "Show",
                more: "more",
                less: "less",
                certifications: "Diplomas and Certificates",
            },
            Alert: {
                copied: "Copied successfully",
            }
        },
    },
};
type TranslationEntry = {
  en: string;
  kz: string;
  ru: string;
};

type Translations = {
  [key: string]: TranslationEntry;
};
export const fieldLocalizations: Translations = {

    "year": {
        "en": "Year",
        "kz": "Жыл",
        "ru": "Год"
    },
    "diploma_diploma_total": {
        "en": "Total grade",
        "kz": "Жалпы бағасы",
        "ru": "Общая оценка"
    },
    "diploma_email": {
        "en": "Email",
        "kz": "Электронды пошта",
        "ru": "Электронная почта"
    },
    "diploma_gender": {
        "en": "Gender",
        "kz": "Жыныс",
        "ru": "Пол"
    },
    "diploma_gpa": {
        "en": "GPA",
        "kz": "Орташа баллы",
        "ru": "Средний балл"
    },
    "diploma_grant": {
        "en": "Grant",
        "kz": "Грант",
        "ru": "Грант"
    },
    "diploma_iin": {
        "en": "IIN",
        "kz": "ИИН",
        "ru": "ИИН"
    },
    "diploma_nationality": {
        "en": "Nationality",
        "kz": "Ұлты",
        "ru": "Национальность"
    },
    "diploma_phone": {
        "en": "Phone",
        "kz": "Телефоны",
        "ru": "Телефон"
    },
    "diploma_region": {
        "en": "Region",
        "kz": "Аймақ",
        "ru": "Регион"
    },
    // "smart_contract_link": {
    //     "en": "Smart Contract Link",
    //     "kz": "Умтылу Договоры сілтемесі",
    //     "ru": "Ссылка на умный контракт"
    // }
    // "diploma_degree_en": {
    //   "en": "Diploma Degree (English)",
    //   "kz": "Диплом Деңгейі (Ағылшын)",
    //   "ru": "Степень диплома (Английский)"
    // },
    // "diploma_degree_kz": {
    //   "en": "Diploma Degree (Kazakh)",
    //   "kz": "Диплом Деңгейі (Қазақ)",
    //   "ru": "Степень диплома (Казахский)"
    // },
    // "diploma_degree_ru": {
    //   "en": "Diploma Degree (Russian)",
    //   "kz": "Диплом Деңгейі (Орыс)",
    //   "ru": "Степень диплома (Русский)"
    // },

    // "diploma_distinction_en": {
    //   "en": "Distinction (English)",
    //   "kz": "Үздік Диплом (Ағылшын)",
    //   "ru": "Диплом с отличием (Английский)"
    // },
    // "diploma_distinction_kz": {
    //   "en": "Distinction (Kazakh)",
    //   "kz": "Үздік Диплом (Қазақ)",
    //   "ru": "Диплом с отличием (Казахский)"
    // },
    // "diploma_distinction_ru": {
    //   "en": "Distinction (Russian)",
    //   "kz": "Үздік Диплом (Орыс)",
    //   "ru": "Диплом с отличием (Русский)"
    // },

    // "diploma_faculty": {
    //   "en": "Faculty",
    //   "kz": "Факультет",
    //   "ru": "Факультет"
    // },

    // "diploma_protocol_en": {
    //   "en": "Protocol (English)",
    //   "kz": "Протокол (Ағылшын)",
    //   "ru": "Протокол (Английский)"
    // },
    // "diploma_protocol_kz": {
    //   "en": "Protocol (Kazakh)",
    //   "kz": "Протокол (Қазақ)",
    //   "ru": "Протокол (Казахский)"
    // },
    // "diploma_protocol_ru": {
    //   "en": "Protocol (Russian)",
    //   "kz": "Протокол (Орыс)",
    //   "ru": "Протокол (Русский)"
    // },

    // "speciality_en": {
    //   "en": "Speciality (English)",
    //   "kz": "Мамандық (Ағылшын)",
    //   "ru": "Специальность (Английский)"
    // },
    // "speciality_kz": {
    //   "en": "Speciality (Kazakh)",
    //   "kz": "Мамандық (Қазақ)",
    //   "ru": "Специальность (Казахский)"
    // },
    // "speciality_ru": {
    //   "en": "Speciality (Russian)",
    //   "kz": "Мамандық (Орыс)",
    //   "ru": "Специальность (Русский)"
    // },
};