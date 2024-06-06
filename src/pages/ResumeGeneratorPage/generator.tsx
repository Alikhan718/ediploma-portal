import { specialities } from "@src/layout/Filter/generator";
import React from "react";

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
const mainForms = [
  {
    type: "select",
    name: "desired_schedule",
    maxRows: 2,
    label: {
      "kz": "Жұмыс кестесі",
      "ru": "График работы",
      "en": "Working schedule"
    },
    values: [
      {
        value: "full",
        label: {
          "en": "Full-time",
          "ru": "Полная занятость",
          "kz": "Толық уақытта",
        }
      },
      {
        value: "partly",
        label: {
          "en": "Part-time",
          "ru": "Частичная занятость",
          "kz": "Жарты",
        },
      },
      {
        value: "project",
        label: {
          "en": "Project Word",
          "ru": "Проектная работа",
          "kz": "Проект жұмыс",
        }
      },
      {
        value: "intern",
        label: {
          "en": "Internship",
          "ru": "Стажировка",
          "kz": "Стажировка",
        }
      },
    ],
    placeholder: ""
  },
  {
    type: "text",
    name: "desired_position",
    label: {
      "kz": "Мамандық",
      "ru": "Должность",
      "en": "Occupation"
    },
    maxRows: 2,
    placeholder: {
      'ru': "Например: программист",
      'kz': "Мысалы: программист",
      'en': "Example: programmer"
    }
  },
  {
    type: "number",
    name: "desired_salary_amount",
    maxRows: 2,
    min: 0,
    label: {
      "kz": "Жалақы",
      "ru": "Зароботная плата",
      "en": "Salary"
    },
    placeholder: {
      'ru': "Введите ваши ожидания от зарплаты",
      'kz': "Күтілетін жалақаны енгізіңіз",
      'en': "Enter your expected salary"
    }
  },
];
const personalForms = [
  {
    type: "text",
    name: "last_name",
    label: {
      "kz": "Тегі",
      "ru": "Фамилия",
      "en": "Surname"
    },
    placeholder: {
      'ru':"Ваше Фамилия",
      'kz':"Сіздің Тегі",
      'en':"Ваше Фамилия"
    },
    maxRows: 2,
  },
  {
    type: "salary_amount",
    name: "first_name",
    maxRows: 2,
    label: {
      "kz": "Аты",
      "ru": "Имя",
      "en": "Name"
    },
    placeholder: {
      'ru': "Ваше Имя",
      'kz': "Сіздің Атыңыз",
      'en': "Your Name"
    }
  },
  {
    type: "text",
    name: "middle_name",
    maxRows: 2,
    label: {
      "kz": "Әкесінің аты",
      "ru": "Отчество",
      "en": "Father's Name"
    },
    placeholder: {
      'ru': "Ваше Отчество",
      'kz': "Сіздің Әкеңіздің аты",
      'en': "Your Father's Name"
    }
  },
  {
    type: "select",
    name: "gender",
    maxRows: 2,
    label: {
      "kz": "Жыныс",
      "ru": "Пол",
      "en": "Sex"
    },
    values: [
      {
        value: "male",
        label: {
          "en": "Male",
          "ru": "Мужской",
          "kz": "Ер",
        }
      },
      {
        value: "female",
        label: {
          "en": "Female",
          "ru": "Женский",
          "kz": "Әйел",
        },
      },
    ],
    placeholder: ""
  },
  {
    type: "date",
    name: "date_of_birth",
    maxRows: 2,
    label: {
      "kz": "Туған күніңіз",
      "ru": "Дата рождения",
      "en": "Date of Birth"
    },
    placeholder: ""
  },
];
const additionalForms = [
  {
    type: "avatar",
    name: "avatar",
    label: {
      "kz": "Фотосуретті жүктеу",
      "ru": "Загрузить фотографию",
      "en": "Upload picture"
    },
    maxRows: 1,
    placeholder: ""
  },
  {
    type: "phone",
    name: "phone",
    label: {
      "kz": "Телефон нөмірі",
      "ru": "Номер телефона",
      "en": "Phone number"
    },
    maxRows: 2,
    placeholder: "+7"
  },
  {
    type: "email",
    name: "email",
    label: {
      "kz": "Пошта",
      "ru": "Почта",
      "en": "Mail"
    },
    maxRows: 2,
    placeholder: "example@mail.kz"
  },
  {
    type: "text",
    name: "telegram",
    maxRows: 2,
    label: {
      "kz": "Телеграм",
      "ru": "Телеграм",
      "en": "Telegram"
    },
    placeholder: "@username"
  },
  {
    type: "select",
    name: "address",
    label: {
      "kz": "Қала",
      "ru": "Город",
      "en": "City"
    },
    maxRows: 2,
    values: [
      {
        value: "Алматы",
        label: {
          "en": "Almaty",
          "ru": "Алматы",
          "kz": "Алматы",
        }
      },
      {
        value: "Астана",
        label: {
          "en": "Astana",
          "ru": "Астана",
          "kz": "Астана",
        },
      },
      {
        value: "Шымкент",
        label: {
          "en": "Shymkent",
          "ru": "Шымкент",
          "kz": "Шымкент",
        },
      },
      {
        value: "Караганда",
        label: {
          "en": "Karaganda",
          "ru": "Караганда",
          "kz": "Қарағанды",
        },
      },
      {
        value: "Актобе",
        label: {
          "en": "Aktobe",
          "ru": "Актобе",
          "kz": "Ақтөбе",
        },
      },
      {
        value: "Тараз",
        label: {
          "en": "Taraz",
          "ru": "Тараз",
          "kz": "Тараз",
        },
      },
      {
        value: "Павлодар",
        label: {
          "en": "Pavlodar",
          "ru": "Павлодар",
          "kz": "Павлодар",
        },
      },
      {
        value: "Уральск",
        label: {
          "en": "Oral",
          "ru": "Уральск",
          "kz": "Орал",
        },
      },
      {
        value: "Семей",
        label: {
          "en": "Semey",
          "ru": "Семей",
          "kz": "Семей",
        },
      },
      {
        value: "Атырау",
        label: {
          "en": "Atyrau",
          "ru": "Атырау",
          "kz": "Атырау",
        },
      },
      {
        value: "Усть-Каменогорск",
        label: {
          "en": "Ust-Kamenogorsk",
          "ru": "Усть-Каменогорск",
          "kz": "Өскемен",
        },
      },
      {
        value: "Костанай",
        label: {
          "en": "Kostanay",
          "ru": "Костанай",
          "kz": "Қостанай",
        },
      },
      {
        value: "Кызылорда",
        label: {
          "en": "Kyzylorda",
          "ru": "Кызылорда",
          "kz": "Қызылорда",
        },
      },
      {
        value: "Петропавловск",
        label: {
          "en": "Petropavlovsk",
          "ru": "Петропавловск",
          "kz": "Петропавловск",
        },
      },
      {
        value: "Талдыкорган",
        label: {
          "en": "Taldykorgan",
          "ru": "Талдыкорган",
          "kz": "Талдықорған",
        },
      },
    ],
    placeholder: ""
  },
  {
    type: "text",
    name: "description",
    rows: 5,
    multiline: true,
    label: {
      "kz": "Cіз жайлы",
      "ru": "О себе",
      "en": "About you"
    },
    placeholder: {
      'ru': "Опишите кратко о себе",
      'kz': "Қысқаша өзіңіз туралы сипаттаңыз",
      'en': "Describe yourself briefly"
    }
  },
];
const educationForms = [
  {
    type: "select",
    name: "major",
    label: {
      "kz": "Түрі",
      "ru": "Вид",
      "en": "Type"
    },
    values: [
      {
        value: "bachelor",
        label: {
          "en": "Bachelor",
          "ru": "Бакалавр",
          "kz": "Бакалавр",
        }
      },
      {
        value: "master",
        label: {
          "en": "Masters",
          "ru": "Магистратура",
          "kz": "Магистратура",
        },
      },
    ],
    maxRows: 2,
    placeholder: ""
  },
  {
    type: "text",
    name: "university_name",
    label: {
      "kz": "Оқу орнының атауы",
      "ru": "Название учебного заведения",
      "en": "University Name"
    },
    maxRows: 2,
    disabled: true,
    placeholder: "Введите полное название"
  },
  {
    type: "number",
    name: "year",
    maxRows: 2,
    min: 1900, max: 2099,
    label: {
      "kz": "Аяқталған жылы",
      "ru": "Год окончания",
      "en": "Graduation Year"
    },
    placeholder: "####",
    disabled: true
  },
  {
    type: "text",
    name: "speciality_ru",
    label: {
      "kz": "Мамандығыңыз",
      "ru": "Специализация",
      "en": "Major"
    },
    rows: 5,
    multiline: true,
    disabled: true,
    maxRows: 2,
    placeholder: {
      'ru': "Введите вашу специальность",
      'kz': "Мамандығыңызды енгізіңіз",
      'en': "Enter your major"
    }
  },
];
const experienceForms = [
  {
    type: "text",
    name: "company_name",
    maxRows: 2,
    label: {
      "kz": "Компания",
      "ru": "Компания",
      "en": "Company"
    },
    placeholder: {
      'ru': "Название компании/организации",
      'kz': "Компанияның атауы",
      'en': "Company name"
    }
  },
  {
    type: "text",
    name: "desired_job_position",
    maxRows: 2,
    label: {
      "kz": "Мамандық",
      "ru": "Должность",
      "en": "Role"
    },
    placeholder: {
      'ru': "Главный Разработчик",
      'kz': "Басты Бағдарламашы",
      'en': "Lead Developer"
    }
  },
  {
    type: "month",
    name: "experience_start",
    maxRows: 2,
    label: {
      "kz": "Жұмыстың басталуы",
      "ru": "Начало работы",
      "en": "Beginning of work"
    },
    placeholder: {
      'ru':"Год",
      'kz':"Жыл",
      'en':"Year"
    }
  },
  {
    type: "month",
    name: "experience_end",
    ifNotInput: "experience_still_working",
    maxRows: 2,
    label: {
      "kz": "Жұмыстың аяқталуы",
      "ru": "Конец работы",
      "en": "End of the work"
    },
    placeholder: {
      'ru':"Месяц",
      'kz':"Ай",
      'en':"Month"
    }
  },
  {
    type: "checkbox",
    name: "experience_still_working",
    label: {
      "kz": "Қазір жұмыс істеймін",
      "ru": "Я сейчас работаю",
      "en": "Still working"
    },
    maxRows: 1,
    placeholder: {
      'ru': "Год",
      'kz': "Жыл",
      'en': "Year"
    }
  },
  {
    type: "number",
    name: "responsibility",
    rows: 4,
    multiline: true,
    label: {
      "kz": "Міндеттер",
      "ru": "Обязанности",
      "en": "Duties"
    },
    placeholder: {
      'ru': "Опишите какие задачи вы выполняли на данной должности",
      'kz': "Осы мамандықта орындаған тапсырмаларды сипаттаңыз",
      'en': "Describe the tasks you performed in this position"
    }
  },
];
const skillForms = [
  {
    type: "multi-select",
    name: "skills",
    label: {
      "kz": "Дағдылар",
      "ru": "Навыки",
      "en": "Skills"
    },
    maxRows: 1,
    placeholder: ""
  },
];
const certificateForms = [
  {
    type: "text",
    name: "certificate_name",
    label: {
      "kz": "Компанияның атауы",
      "ru": "Название организация",
      "en": "Company name"
    },
    maxRows: 2,
    placeholder: {
      'ru': "Например: SkillBox",
      'kz': "Мысалы: SkillBox",
      'en': "Example: SkillBox"
    }
  },
  {
    type: "text",
    name: "program",
    label: {
      "kz": "Бағдарламаның атауы",
      "ru": "Название программы",
      "en": "Program name"
    },
    maxRows: 2,
    placeholder: {
      'ru': "Например: Python-Разработичик",
      'kz': "Мысалы: Python-Бағдарламашы",
      'en': "Example: Python-Developer"
    }
  },
  {
    type: "number",
    min: 1900, max: 2099,
    name: "publish_year",
    label: {
      "kz": "Берілген жылы",
      "ru": "Год выдачи",
      "en": "Year of Issue"
    },
    maxRows: 2,
    placeholder: ""
  },
  {
    type: "file",
    name: "certificates",
    maxRows: 1,
    multiline: true,
    placeholder: {
      'ru': "Формат: pdf, png",
      'kz': "Формат: pdf, png",
      'en': "Format: pdf, png"
    }
  },
];
const resumeForms = [
  {
    type: "pdf",
    name: "resume_link2",
    label: {
      "kz": "",
      "ru": "",
      "en": ""
    },
    placeholder: ""
  },
];
export const content = [
  {
    title: {
      "en": "Work conditions",
      "kz": "Жұмыс шарттары",
      "ru": "Условия работы"
    },
    additionalText: null,
    name: "main",
    can_skip: true,
    reference: 0,
    forms: mainForms
  },
  {
    title: {
      "en": "Personal information",
      "kz": "Жеке ақпарат",
      "ru": "Личная информация"
    },
    additionalText: null,
    name: "personal_information",
    can_skip: false,
    reference: 0,
    forms: personalForms
  },
  {
    title: {
      "en": "Additional Information",
      "kz": "Қосымша ақпарат",
      "ru": "Дополнительные сведения"
    },
    additionalText: null,
    name: "additional_information",
    can_skip: false,
    reference: 0,
    forms: additionalForms
  },
  {
    title: {
      "en": "Education",
      "kz": "Білім беру орны",
      "ru": "Образование"
    },
    additionalText: null,
    name: "education",
    can_skip: false,
    reference: 0,
    forms: educationForms
  },
  {
    title: {
      "en": "Work experience",
      "kz": "Жұмыс тәжірибесі",
      "ru": "Опыт работы"
    },
    additionalText: null,
    name: "work_experience",
    can_skip: false,
    reference: 0,
    forms: experienceForms
  },
  {
    title: {
      "en": "Skills",
      "kz": "Дағдылар",
      "ru": "Навыки"
    },
    additionalText: null,
    name: "skills_section",
    can_skip: false,
    reference: 0,
    forms: skillForms
  },
  {
    title: {
      "en": "Certificates",
      "kz": "Сертификаттар",
      "ru": "Сертификаты"
    },
    additionalText: null,
    name: "cert",
    can_skip: false,
    reference: 0,
    forms: certificateForms
  },
  {
    title: {
      "en": "Resume is ready",
      "kz": "Резюме жүктелуге дайын",
      "ru": "Резюме готово к скачиванию"
    },
    name: "resume_link3",
    can_skip: false,
    reference: 0,
    forms: resumeForms
  },
];

export const desktopContent = [
  {
    title: {
      "en": "Personal Information",
      "kz": "Жеке ақпарат",
      "ru": "Личная информация"
    },
    additionalText: null,
    name: "personal_information",
    can_skip: false,
    reference: 0,
    forms: [...personalForms, ...mainForms]
  },
  {
    title: {
      "en": "Additional Information",
      "kz": "Қосымша ақпарат",
      "ru": "Дополнительные сведения"
    },
    additionalText: null,
    name: "additional_information",
    can_skip: false,
    reference: 0,
    forms: additionalForms
  },
  {
    title: {
      "en": "Education",
      "kz": "Білім алу орны",
      "ru": "Образование"
    },
    additionalText: null,
    name: "education",
    can_skip: false,
    reference: 0,
    forms: educationForms
  },
  {
    title: {
      "en": "Work experience",
      "kz": "Жұмыс тәжірибеңіз",
      "ru": "Опыт работы"
    },
    additionalText: null,
    name: "work_experience",
    can_skip: false,
    reference: 0,
    forms: experienceForms
  },
  {
    title: {
      "en": "Skills",
      "kz": "Дағдылар",
      "ru": "Навыки"
    },
    additionalText: null,
    name: "skills_section",
    can_skip: false,
    reference: 0,
    forms: skillForms
  },
  {
    title: {
      "en": "Certificates",
      "kz": "Сертификаттар",
      "ru": "Сертификаты"
    },
    additionalText: null,
    name: "cert",
    can_skip: false,
    reference: 0,
    forms: certificateForms
  },
  {
    title: {
      "en": "Resume is ready",
      "kz": "Резюмеңіз жүктелуге дайын",
      "ru": "Резюме готово к скачиванию"
    },
    name: "resume_link1",
    can_skip: false,
    reference: 0,
    forms: resumeForms
  },
];
export const localization = {
  "kz": {
    Alert: 'Бүкіл ақпаратты толтырыңыз!',
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
      confirm: "Растау",
      diplomaConfirmation: "Дипломды растау",
      acreditation: "Бұл аккредитация расталған организацияға тиесілі",
    },
    StudentPage: {
      Menu: {
        goto: "Сайтқа өту",
        favorite: "Таңдауларға қосу",
        share: "Бөлісу",
        back: "Артқа қайту",
      },
      MainInfo: {
        nameUni: "Вуз атауы: ",
        major: "Мамандық: ",
        degree: "Деңгей: ",
        graduationYear: "Аяқтау жылы: ",
        kbtu: "Қазақстан-Британ Техникалық Университет",
        noData: "Ақпарат жеткіліксіз",
        rating: "Академиялық рейтинг: ",
      },
      AddInfo: {
        downloadResume: "Түйіндемені жүктеу",
        sendInvite: "Шақыру жіберу",
        about: "Түлек туралы",
        show: "Көрсету",
        more: "көбірек",
        less: "аз",
        certifications: "Дипломдар және Сертификаттар",
        skills: "Дағдылар",
        studentData: "Cтудент жайлы ақпарат",
      },
      Confirmation: {
        signedWithDS: "ЭЦҚ мен расталған",
        deployedToBlockchain: "Блокчейнге жүктелген",
        smartContractAddress: "Смарт-контракт сілтемесі",
        owner: "Диплом иесі",
        date: "Уақыты:"
      },
      Alert: {
        copied: "Сәтті көшірілді",
      },
      Generator: {
        steps: {
          personal: {
            title: 'Жеке ақпарат',
            lastname: 'Тегі',
            name: 'Аты',
            fathername: 'Әкесінің аты',
            sex: 'Жыныс',
            male: 'Еркек',
            female: 'Әйел',
            fulltime: 'Толық уақытта',
            parttime: 'Жарты уақытта',
            project: 'Проект жұмыс',
            intern: 'Стажировка',
            birthdate: 'Туған күні',
            schedule: 'Жұмыс кестесі',
            ocupation: 'Мамандық',
            salary: 'Жалақы',
            example: 'Мысалы: программист',
            salaryEnter: 'Күтілетін жалақаны енгізіңіз'
          },
          additional: {
            title: 'Қосымша ақпарат',
            photo: 'Фотосуретті жүктеу',
            phone: 'Телефон нөмірі',
            email: 'Электронды пошта',
            telegram: 'Телеграм',
            city: 'Қала',
            about: 'Өзіңіз туралы',
            describe: 'Қысқаша өзіңізді сипаттаңыз',
            warn: 'Фотосурет png немесе jpg пішімінде, 5МБ-тан аспауы тиіс'
          },
          education: {
            title: 'Білім',
            degree: 'Дәреже',
            bachelor: 'Бакалавр',
            masters: 'Магистратура',
            university: 'Оқу орнының атауы',
            speciality: 'Мамандық'
          },
          experience: {
            title: 'Тәжірибе',
            company: 'Компания',
            occupation: 'Мамандық',
            leadDeveloper: 'Бас кәсіпкер',
            begin: 'Жұмыс басталды',
            end: 'Жұмыс аяқталды',
            year: 'Жыл',
            month: 'Ай',
            duties: 'Міндеттер',
            describe: 'Осы мамандықта орындаған тапсырмаларды сипаттаңыз'
          },
          skills: {
            title: 'Дағдылар',
            choose: 'Дағдыларды таңдау'
          },
          certificates: {
            title:'Сертификаттар',
            orgName: 'Ұйымның атауы',
            orgExample: 'Мысалы: SkillBox',
            program: 'Бағдарламаның атауы',
            programExample: 'Мысалы: Python-Дамытушы',
            year: 'Берілген жыл',
            upload: 'Сертификатты жүктеу',
            format: 'Пішім: pdf, png',
            require: '5МБ-тан аспауы тиіс',
            choose: 'Таңдау'
          },
          ready: 'Резюме жүктелу үшін дайын'
        },
        continue: 'Жалғастыру',
        back: 'Кері'
      }
    }
  },
  "ru": {
    Alert: 'Заполните все поля!',
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
      confirm: "Подтвердить",
      diplomaConfirmation: "Подтверждение диплома",
      acreditation: "Эта аккредитация принадлежит проверенной организации",
    },
    StudentPage: {
      Menu: {
        goto: "Перейти на сайт",
        favorite: "В  Избранное",
        share: "Поделиться",
        back: "Вернуться назад",
      },
      MainInfo: {
        nameUni: "Название вуза: ",
        major: "Cпециальность: ",
        degree: "Степень: ",
        graduationYear: "Год окончания: ",
        kbtu: "Казахстанско-Британский технический университет",
        noData: "Недостаточно данных",
        rating: "Академический рейтинг: ",
      },
      AddInfo: {
        downloadResume: "Скачать резюме",
        sendInvite: "Отправить приглашение",
        about: "О выпускнике",
        show: "Показать",
        more: "больше",
        less: "меньше",
        certifications: "Дипломы и Сертификаты",
        skills: "Навыки",
        studentData: "Данные студента",
      },
      Confirmation: {
        signedWithDS: "Подписано с ЭЦП",
        deployedToBlockchain: "Выгруженно на блокчейн",
        smartContractAddress: "Адрес смарт-контракта",
        owner: "Владелец диплома",
        date: "Дата:"
      },
      Alert: {
        copied: "Успешно скопировано",
      },
      Generator:{
        steps: {
          personal: {
            title: 'Личная информация',
            lastname: 'Фамилия',
            name: 'Имя',
            fathername: 'Отчество',
            sex: 'Пол',
            male: 'Мужской',
            female: 'Женский',
            fulltime: 'Полная занятость',
            parttime: 'Частичная занятость',
            project: 'Проектная работа',
            intern: 'Стажировка',
            birthdate: 'Дата рождения',
            schedule: 'График работы',
            ocupation: 'Должность',
            salary: 'Зароботная плата',
            example: 'Например: программист',
            salaryEnter: 'Введите ваши ожидания от зарплаты',
          },
          additional: {
            title: 'Дополнительная сведения',
            photo: 'Загрузить фотографию',
            phone: 'Номер телефона',
            email: 'Почта',
            telegram: 'Телеграм',
            city: 'Город',
            about: 'О себе',
            describe: 'Опишите кратко о себе',
            warn: 'Фотография должна быть в формате png jpg неболее 5 мб'
          },
          education: {
            title: 'Образование',
            degree: 'Степень',
            bachelor: 'Бакалавр',
            masters: 'Магистратура',
            university: 'Название учебного заведения',
            speciality: 'Специализация',
          },
          experience: {
            title: 'Опыт работы',
            company: 'Компания',
            occupation: 'Должность',
            leadDeveloper: 'Главный Разработчик',
            begin: 'Начало работы',
            end: 'Конец работы',
            year: 'Год',
            month: 'Месяц',
            duties: 'Обязанности',
            describe: 'Опишите какие задачи вы выполняли на данной должности',
          },
          skills: {
            title: 'Навыки',
            choose: 'Выберите навыки',
          },
          certificates: { 
            title:'Сертификаты',
            orgName: 'Название организация',
            orgExample: 'Например: SkillBox',
            program: 'Название программы',
            programExample: 'Например: Python-Разработичик',
            year: 'Год выдачи',
            upload: 'Загрузите сертификат',
            format: 'Формат: pdf, png',
            require: 'не более 5мб',
            choose: 'Выбрать',
          },
          ready: 'Резюме готово к скачиванию'
        },
        continue: 'Продолжить',
        back: 'Назад',
      }
    }
  },
  "en": {
    Alert: 'Fill all the required fields',
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
      confirm: "Confirm",
      diplomaConfirmation: "Diploma confirmation",
      acreditation: "This accreditation belongs to a verified organization",
    },
    StudentPage: {
      Menu: {
        goto: "Go to the website",
        favorite: "Add to Favorites",
        share: "Share",
        back: "Go back",
      },
      MainInfo: {
        nameUni: "University name: ",
        major: "Major: ",
        degree: "Degree: ",
        graduationYear: "Graduation year: ",
        kbtu: "Kazakh-British Technical University",
        noData: "No data",
        rating: "Academic rating: ",
      },
      AddInfo: {
        downloadResume: "Download resume",
        sendInvite: "Send invitation",
        about: "About graduate",
        show: "Show",
        more: "more",
        less: "less",
        certifications: "Diplomas and Certificates",
        skills: "Skills",
        studentData: "Student data",
      },
      Confirmation: {
        signedWithDS: "Signed with DS",
        deployedToBlockchain: "Uploaded to Blockchain",
        smartContractAddress: "Smart contract address",
        owner: "Diploma owner",
        date: "Date:"
      },
      Alert: {
        copied: "Copied successfully",
      },
      Generator: {
        steps: {
          personal: {
            title: 'Personal Information',
            lastname: 'Last name',
            name: 'First name',
            fathername: "Father's name",
            sex: 'Gender',
            male: 'Male',
            female: 'Female',
            fulltime: 'Full-time',
            parttime: 'Part-time',
            project: 'Project-based',
            intern: 'Internship',
            birthdate: 'Date of birth',
            schedule: 'Work schedule',
            ocupation: 'Occupation',
            salary: 'Salary',
            example: 'e.g. programmer',
            salaryEnter: 'Enter your expected salary'
          },
          additional: {
            title: 'Additional Information',
            photo: 'Upload photo',
            phone: 'Phone number',
            email: 'Email',
            telegram: 'Telegram',
            city: 'City',
            about: 'About me',
            describe: 'Briefly describe yourself',
            warn: 'Photo should be in png or jpg format, no more than 5MB'
          },
          education: {
            title: 'Education',
            degree: 'Degree',
            bachelor: "Bachelor's",
            masters: "Master's",
            university: 'University name',
            speciality: 'Specialization'
          },
          experience: {
            title: 'Work experience',
            company: 'Company',
            occupation: 'Occupation',
            leadDeveloper: 'Lead developer',
            begin: 'Start date',
            end: 'End date',
            year: 'Year',
            month: 'Month',
            duties: 'Responsibilities',
            describe: 'Describe the tasks you performed in this position'
          },
          skills: {
            title: 'Skills',
            choose: 'Choose skills'
          },
          certificates: {
            title:'Certificates',
            orgName: 'Organization name',
            orgExample: 'e.g. SkillBox',
            program: 'Program name',
            programExample: 'e.g. Python developer',
            year: 'Year of issue',
            upload: 'Upload certificate',
            format: 'Format: pdf, png',
            require: 'Not more than 5MB',
            choose: 'Choose'
          },
          ready: 'Resume is ready for download'
        },
        continue: 'Continue',
        back: 'Back'
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

type SkillsEntry = {
  en: any;
  kz: any;
  ru: any;
};

type Skills = {
  [key: string]: SkillsEntry;
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

export const uniRatings = {
  1: 4.4,
  2: 0.0,
  3: 4.4,
};

export const skillsList = {
  "default": {
    "ru": [],
    "kz": [],
    "en": [],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B07101 ХИМИЧЕСКАЯ ТЕХНОЛОГИЯ ОРГАНИЧЕСКИХ ВЕЩЕСТВ»": {
    "ru": [
      "Технология переработки",
      "Химическая инженерия",
      "Катализ и нефтепереработка",
      "Моделирование процессов",
      "Производство полимеров",
      "Органический синтез",
      "Проектирование оборудования",
      "Промышленная экология",
      "Противокоррозионная защита",
      "Финансовый анализ"
    ],
    "kz": [
      "Өңдеу технологиясы",
      "Химиялық инженерия",
      "Катализ және мұнай өңдеу",
      "Процесті модельдеу",
      "Полимер өндірісі",
      "Органикалық синтез",
      "Жабдықтың дизайны",
      "Өнеркәсіптік экология",
      "Коррозияға қарсы қорғаныс",
      "Қаржылық талдау"
    ],
    "en": [
      "Processing technology",
      "Chemical engineering",
      "Catalysis and oil refining",
      "Process modeling",
      "Polymer production",
      "Organic synthesis",
      "Equipment design",
      "Industrial ecology",
      "Anti-corrosion protection",
      "Financial analysis"
    ]
  },
  "БАКАЛАВР\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B07101 ХИМИЧЕСКАЯ ТЕХНОЛОГИЯ ОРГАНИЧЕСКИХ ВЕЩЕСТВ»": {
    "ru": [
      "Технология переработки",
      "Химическая инженерия",
      "Катализ и нефтепереработка",
      "Моделирование процессов",
      "Производство полимеров",
      "Органический синтез",
      "Проектирование оборудования",
      "Промышленная экология",
      "Противокоррозионная защита",
      "Финансовый анализ"
    ],
    "kz": [
      "Өңдеу технологиясы",
      "Химиялық инженерия",
      "Катализ және мұнай өңдеу",
      "Процесті модельдеу",
      "Полимер өндірісі",
      "Органикалық синтез",
      "Жабдықтың дизайны",
      "Өнеркәсіптік экология",
      "Коррозияға қарсы қорғаныс",
      "Қаржылық талдау"
    ],
    "en": [
      "Processing technology",
      "Chemical engineering",
      "Catalysis and oil refining",
      "Process modeling",
      "Polymer production",
      "Organic synthesis",
      "Equipment design",
      "Industrial ecology",
      "Anti-corrosion protection",
      "Financial analysis"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nБИЗНЕСА И УПРАВЛЕНИЯ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В04105 МАРКЕТИНГ»": {
    "ru": [
      "Маркетинговая стратегия",
      'Маркетинговые исследования',
      'Поведение анализ',
      'Маркетинг и социальные сети',
      'Бизнес планирование',
      'Стратегический маркетинг',
      'Международный маркетинг',
      'Стратегия развития бизнеса',
      'Предпринимательство',
      'Менеджмент'
    ],
    "kz": [
      "Маркетинг стратегиясы",
      "Маркетингтік зерттеулер",
      "Мінез-құлықты талдау",
      "Маркетинг және әлеуметтік медиа",
      "Бизнес-жоспарлау",
      "Стратегиялық маркетинг",
      "Халықаралық маркетинг",
      "Бизнесті дамыту стратегиясы",
      "Кәсіпкерлік",
      "Басқару"
    ],
    "en": [
      "Marketing strategy",
      "Marketing research",
      "Behavior analysis",
      "Marketing & social media",
      "Business planning",
      "Strategic marketing",
      "International marketing",
      "Business development strategy",
      "Entrepreneurship",
      "Management"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО СПЕЦИАЛЬНОСТИ «5В070200 АВТОМАТИЗАЦИЯ И УПРАВЛЕНИЕ»": {
    "ru": [
      "Автоматизация и управление",
      "Проектирование решений",
      "Применение математики и наук",
      "Инженерный анализ",
      "Прогнозирование и моделирование",
      "Электрические устройства",
      "Безопасность и этика",
      "Эффективная коммуникация",
      "Инженерное мышление",
      "Устойчивое развитие"
    ],
    "kz": [
      "Жүйелік интеграция",
      "Бағдарламалау және әзірлеу",
      "Статистикалық талдау",
      "Геофизикалық зерттеу әдістері",
      "Қолданбалы минералогия",
      "Фурье түрлендіру әдістері",
      "Химиялық өндірістегі технологиялар",
      "Пайдалы қазбаларды барлау",
      "Терең оқыту және ЖИ",
      "Python бағдарламалау"
    ],
    "en": [
      "System integration",
      "Programming and development",
      "Statistical analysis",
      "Geophysical research methods",
      "Applied mineralogy",
      "Fourier transform methods",
      "Technologies in chemical production",
      "Mineral exploration",
      "Deep learning and AI",
      "Python programming"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B07103 АВТОМАТИЗАЦИЯ И УПРАВЛЕНИЕ»": {
    "ru": [
      "Автоматизация и управление",
      "Проектирование решений",
      "Применение математики и наук",
      "Инженерный анализ",
      "Прогнозирование и моделирование",
      "Электрические устройства",
      "Безопасность и этика",
      "Эффективная коммуникация",
      "Инженерное мышление",
      "Устойчивое развитие"
    ],
    "kz": [
      "Автоматтандыру және басқару",
      "Шешім дизайны",
      "Математика және ғылымды қолдану",
      "Инженерлік талдау",
      "Болжау және модельдеу",
      "Электрлік құрылғылар",
      "Қауіпсіздік және этика",
      "Тиімді қарым-қатынас",
      "Инженерлік ойлау",
      "Тұрақты даму"
    ],
    "en": [
      "Automation and control",
      "Solution design",
      "Applied mathematics & sciences",
      "Engineering analysis",
      "Forecasting and modeling",
      "Electrical devices",
      "Safety and ethics",
      "Effective communication",
      "Engineering thinking",
      "Sustainable development"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nВ ОБЛАСТИ ИНФОРМАЦИОННО-КОММУНИКАЦИОННЫХ ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B06101 ИНФОРМАЦИОННЫЕ СИСТЕМЫ»": {
    "ru": [
      "Системное моделирование", "Анализ данных", "Программное обеспечение", "Информационные технологии", "Техническое решение", "Инженерный анализ", "Командная работа", "Коммуникативные навыки", "Профессиональная этика", "Самообучаемость"
    ],
    "kz": [
      "Жүйені модельдеу",
      "Деректерді талдау",
      "Бағдарламалық қамтамасыз ету",
      "Ақпараттық технологиялар",
      "Техникалық шешім",
      "Инженерлік талдау",
      "Топтық жұмыс",
      "Қарым-қатынас дағдылары",
      "Кәсіби этика",
      "Өздігінен білім алу"
    ],
    "en": [
      "System modeling",
      "Data analysis",
      "Software",
      "Information technology",
      "Technical solution",
      "Engineering analysis",
      "Teamwork",
      "Communication skills",
      "Professional ethics",
      "Self-learning"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО СПЕЦИАЛЬНОСТИ «5В070300 ИНФОРМАЦИОННЫЕ СИСТЕМЫ»": {
    "ru": [
      "Системное моделирование", "Анализ данных", "Программное обеспечение", "Информационные технологии", "Техническое решение", "Инженерный анализ", "Командная работа", "Коммуникативные навыки", "Профессиональная этика", "Самообучаемость"
    ],
    "kz": ["Жүйені модельдеу",
      "Деректерді талдау",
      "Бағдарламалық қамтамасыз ету",
      "Ақпараттық технологиялар",
      "Техникалық шешім",
      "Инженерлік талдау",
      "Топтық жұмыс",
      "Қарым-қатынас дағдылары",
      "Кәсіби этика",
      "Өздігінен білім алу"
    ],
    "en": ["System Modeling",
      "Data analysis",
      "Software",
      "Information Technology",
      "Technical solution",
      "Engineering analysis",
      "Teamwork",
      "Communication skills",
      "Professional ethics",
      "Self-learning"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М07201 НЕФТЕГАЗОВОЕ ДЕЛО»": {
    "ru": [
      "Разработка месторождений", "Нефтегазовая геология", "Бурение скважин", "Трубопроводный транспорт", "Нефтегазовая химия", "Гидродинамические исследования", "Управление запасами", "Автоматизация производства", "Техника безопасности", "Экономика нефтегаза"
    ],
    "kz": ["Тау-кен",
      "Мұнай және газ геологиясы",
      "Ұңғымаларды бұрғылау",
      "Құбыр көлігі",
      "Мұнай және газ химиясы",
      "Гидродинамикалық зерттеулер",
      "Инвентаризацияны басқару",
      "Өндірісті автоматтандыру",
      "Қауіпсіздік ережесі",
      "Мұнай және газ экономикасы"
    ],
    "en": ["Mining",
      "Oil and gas geology",
      "Drilling of the wells",
      "Pipeline transport",
      "Oil and gas chemistry",
      "Hydrodynamic studies",
      "Inventory management",
      "Automation of production",
      "Safety precautions",
      "Economics of oil and gas"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА ЭКОНОМИЧЕСКИХ НАУК\nПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ \n«7M04104 ФИНАНСЫ»": {
    "ru": [
      "Инвестиционный анализ", "Финансовый учет", "Портфельное управление", "Количественные методы", "Экономический учет", "Инвестиционные инструменты", "Информационные технологии", "Этические стандарты", "Глобальный контекст"
    ],
    "kz": ["Инвестициялық талдау",
      "Қаржылық есеп",
      "Портфельді басқару",
      "Сандық әдістер",
      "Экономикалық есеп",
      "Инвестициялық құралдар",
      "Ақпараттық технологиялар",
      "Этикалық нормалар",
      "Ғаламдық контекст",
      "Тәуелсіз зерттеу"
    ],
    "en": ["Investment analysis",
      "Financial accounting",
      "Portfolio management",
      "Quantitative methods",
      "Economic accounting",
      "Investment instruments",
      "Information Technology",
      "Ethical standards",
      "Global context",
      "Independent research"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nБИЗНЕСА И УПРАВЛЕНИЯ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В04108 ФИНАНСЫ И ЭКОНОМИКА»": {
    "ru": [
      "Статистические методы", "Экономические модели", "Финансовые рынки", "Аналитические модели", "Проектная оценка", "Исследование рынка", "Углубленная математика", "Эмпирические стратегии", "Стратегический анализ", "Бюджетный процесс"
    ],
    "kz": ["Статистикалық әдістер",
      "Экономикалық модельдер",
      "Қаржы нарықтары",
      "Аналитикалық модельдер",
      "Жобаны бағалау",
      "Нарықты зерттеу",
      "Жетілдірілген математика",
      "Эмпирикалық стратегиялар",
      "Стратегиялық талдау",
      "Бюджеттік процесс"
    ],
    "en": ["Statistical methods",
      "Economic models",
      "Financial markets",
      "Analytical models",
      "Project assessment",
      "Market research",
      "Advanced mathematics",
      "Empirical strategies",
      "Strategic analysis",
      "Budget process"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М06101 ИНФОРМАЦИОННЫЕ СИСТЕМЫ»": {
    "ru": [
      "Системное моделирование", "Анализ данных", "Программное обеспечение", "Информационные технологии", "Техническое решение", "Инженерный анализ", "Командная работа", "Коммуникативные навыки", "Профессиональная этика", "Самообучаемость"
    ],
    "kz": ["Жүйені модельдеу",
      "Деректерді талдау",
      "Бағдарламалық қамтамасыз ету",
      "Ақпараттық технологиялар",
      "Техникалық шешім",
      "Инженерлік талдау",
      "Топтық жұмыс",
      "Қарым-қатынас дағдылары",
      "Кәсіби этика",
      "Өздігінен білім алу"
    ],
    "en": [
      "System modeling",
      "Data analysis",
      "Software",
      "Information technology",
      "Technical solution",
      "Engineering analysis",
      "Teamwork",
      "Communication skills",
      "Professional ethics",
      "Self-learning"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nБИЗНЕСА И УПРАВЛЕНИЯ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В04101 МЕНЕДЖМЕНТ»": {
    "ru": [
      "Менеджмент", "Управление проектами", "Бизнес планирование", "Стратегия развития", "Маркетинг", "Управление персоналом", "Инновационный менеджмент", "Международный бизнес", "Предпринимательство", "Анализ данных"
    ],
    "kz": ["Басқару",
      "Жобаны басқару",
      "Бизнес-жоспарлау",
      "Даму стратегиясы",
      "Маркетинг",
      "Жеке құрам менеджменті",
      "Инновациялық менеджмент",
      "халықаралық бизнес",
      "Кәсіпкерлік",
      "Деректерді талдау"
    ],
    "en": ["Management",
      "Project management",
      "Business planning",
      "Development strategy",
      "Marketing",
      "Personal management",
      "Innovation management",
      "International business",
      "Entrepreneurship",
      "Data analysis"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО СПЕЦИАЛЬНОСТИ «5В070800 НЕФТЕГАЗОВОЕ ДЕЛО»": {
    "ru": [
      "Разработка месторождений", "Геология нефти/газа", "Бурение скважин", "Транспорт углеводородов", "Обработка углеводородов", "Промышленная безопасность", "Инновационные технологии", "Экономика нефтегаза", "Автоматизация процессов", "Нефтегазовое право"
    ],
    "kz": [
      "Тау-кен",
      "Мұнай/газ геологиясы",
      "Ұңғымаларды бұрғылау",
      "Көмірсутектерді тасымалдау",
      "Көмірсутектерді өңдеу",
      "Өнеркәсіптік қауіпсіздік",
      "Инновациялық технологиялар",
      "Мұнай және газ экономикасы",
      "Процесті автоматтандыру",
      "Мұнай және газ туралы заң"
    ],
    "en": [
      "Mining",
      "Geology of oil/gas",
      "Drilling of the wells",
      "Transport of hydrocarbons",
      "Hydrocarbon processing",
      "Industrial Safety",
      "Innovative technologies",
      "Economics of oil and gas",
      "Process automation",
      "Oil and gas law"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М07108   НАНОМАТЕРИАЛЫ И НАНОТЕХНОЛОГИИ (ПО ОБЛАСТЯМ ПРИМЕНЕНИЯ)»": {
    "ru": [
      "Нанотехнологии", "Физические методы", "Химическое моделирование", "Физическое моделирование", "Биологическое моделирование", "Методы анализа", "Математическое моделирование", "Прогнозирование моделей", "Исследование систем", "Информационные технологии"
    ],
    "kz": [
      "Нанотехнология",
      "Физикалық әдістер",
      "Химиялық модельдеу",
      "Физикалық модельдеу",
      "Биологиялық модельдеу",
      "Талдау әдістері",
      "Математикалық модельдеу",
      "Модельді болжау",
      "Жүйелік зерттеулер",
      "Ақпараттық технологиялар"
    ],
    "en": [
      "Nanotechnology",
      "Physical methods",
      "Chemical modeling",
      "Physical modeling",
      "Biological modeling",
      "Analysis methods",
      "Math modeling",
      "Model Forecasting",
      "Systems research",
      "Information Technology"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА ЭКОНОМИЧЕСКИХ НАУК\nПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ \n«7M04106 УПРАВЛЕНИЕ ПРОЕКТАМИ»": {
    "ru": [
      "Управление проектами", "Техники управления", "Операционное управление", "Методы управления", "Цикл проекта", "Качественный анализ", "Количественный анализ", "IT в управлении", "Этика и ответственность", "Деловое общение"
    ],
    "kz": [
      "Жобаны басқару",
      "Бақылау әдістері",
      "Операциялық басқару",
      "Басқару әдістері",
      "Жоба циклі",
      "Сапалық талдау",
      "Сандық талдау",
      "Менеджменттегі IT",
      "Этика және жауапкершілік",
      "Іскерлік әңгіме"
    ],
    "en": [
      "Project management",
      "Management techniques",
      "Operational management",
      "Management methods",
      "Project cycle",
      "Qualitative analysis",
      "Quantitative analysis",
      "IT in management",
      "Ethics and responsibility",
      "Business communication"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО СПЕЦИАЛЬНОСТИ «5B070500 МАТЕМАТИЧЕСКОЕ И КОМПЬЮТЕРНОЕ МОДЕЛИРОВАНИЕ»": {
    "ru": [
      "Математическое моделирование", "Методы анализа", "Информационные технологии", "Решение задач", "Программные решения", "Вычислительные задачи", "Работа с данными", "Управление информацией", "ИТ технологии", "Знание естественных наук"
    ],
    "kz": [
      "Математикалық модельдеу",
      "Талдау әдістері",
      "Ақпараттық технологиялар",
      "Мәселені шешу",
      "Бағдарламалық шешімдер",
      "Есептеу тапсырмалары",
      "Деректермен жұмыс",
      "Ақпаратты басқару",
      "IT технологиялар",
      "Жаратылыстану ғылымдарын білу"
    ],
    "en": [
      "Mathematical modeling",
      "Analysis methods",
      "Information technology",
      "Problem solving",
      "Software solutions",
      "Computational problems",
      "Working with data",
      "Information management",
      "IT technologies",
      "Knowledge of natural sciences"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М06106 ПРОГРАММНАЯ ИНЖЕНЕРИЯ»": {
    "ru": [
      "Программная инженерия", "Архитектура программного обеспечения", "Тестирование и отладка", "Разработка веб-приложений", "Мобильное программирование", "Системы баз данных", "Искусственный интеллект", "Гарантия качества", "Анализ алгоритмов", "Обратный инжиниринг"
    ],
    "kz": [
      "Бағдарламалық қамтамасыз ету инженериясы",
      "Бағдарламалық қамтамасыз ету архитектурасы",
      "Тестілеу және жөндеу",
      "Веб қолданбаларды әзірлеу",
      "Мобильді бағдарламалау",
      "Мәліметтер базасы жүйелері",
      "Жасанды интеллект",
      "Сапа кепілдігі",
      "Алгоритмді талдау",
      "Кері инженерия"
    ],
    "en": [
      "Software engineering",
      "Software architecture",
      "Testing and debugging",
      "Web application development",
      "Mobile programming",
      "Database systems",
      "Artificial intelligence",
      "Quality assurance",
      "Algorithm analysis",
      "Reverse engineering"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nЭКОНОМИКИ И БИЗНЕСА ПО СПЕЦИАЛЬНОСТИ «5B050600 ЭКОНОМИКА»": {
    "ru": [
      "Экономический анализ", "Статистические методы", "Математическая основа", "Экономические модели", "Финансовые рынки", "Бюджетирование", "Оценка проектов", "Международная экономическая теория", "Аналитические модели", "Эмпирические стратегии"
    ],
    "kz": [
      "Экономикалық талдау",
      "Статистикалық әдістер",
      "Математикалық негіз",
      "Экономикалық модельдер",
      "Қаржы нарықтары",
      "Бюджеттеу",
      "Жобаны бағалау",
      "Халықаралық экономикалық теория",
      "Аналитикалық модельдер",
      "Эмпирикалық стратегиялар"
    ],
    "en": [
      "Economic analysis",
      "Statistical methods",
      "Mathematical basis",
      "Economic models",
      "Financial markets",
      "Budgeting",
      "Project evaluation",
      "International economic theory",
      "Analytical models",
      "Empirical strategies"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nБИЗНЕСА И УПРАВЛЕНИЯ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В04104 ФИНАНСЫ»": {
    "ru": [
      "Инвестиционный анализ", "Финансовый учет", "Портфельное управление", "Количественные методы", "Экономический учет", "Инвестиционные инструменты", "Информационные технологии", "Этические стандарты", "Глобальный контекст", "Независимые исследования"
    ],
    "kz": [
      "Инвестициялық талдау",
      "Қаржылық есеп",
      "Портфельді басқару",
      "Сандық әдістер",
      "Экономикалық есеп",
      "Инвестициялық құралдар",
      "Ақпараттық технологиялар",
      "Этикалық нормалар",
      "Ғаламдық контекст",
      "Тәуелсіз зерттеу"
    ],
    "en": [
      "Investment analysis",
      "Financial accounting",
      "Portfolio management",
      "Quantitative methods",
      "Economic accounting",
      "Investment instruments",
      "Information Technology",
      "Ethical standards",
      "Global context",
      "Independent research"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИКИ И ТЕХНОЛОГИИ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М07202 ГЕОЛОГИЯ И РАЗВЕДКА МЕСТОРОЖДЕНИЙ ПОЛЕЗНЫХ ИСКОПАЕМЫХ (ПРОФИЛЬНОЕ НАПРАВЛЕНИЕ)»": {
    "ru": [
      "Геологическое моделирование", "Решение задач", "Эксперименты и анализ", "Данных интерпретация", "Технические исследования", "Инженерные решения", "Командная работа", "Профессиональная этика", "Эффективная коммуникация", "Инновационные методы"
    ],
    "kz": [
      "Геологиялық модельдеу",
      "Мәселені шешу",
      "Эксперимент және талдау",
      "Мәліметтерді интерпретациялау",
      "Техникалық зерттеулер",
      "Инженерлік шешімдер",
      "Топтық жұмыс",
      "Кәсіби этика",
      "Тиімді қарым-қатынас",
      "Инновациялық әдістер"
    ],
    "en": [
      "Geological modeling",
      "Problem solving",
      "Experiments and analysis",
      "Data interpretation",
      "Technical research",
      "Engineering solutions",
      "Teamwork",
      "Professional ethics",
      "Effective communication",
      "Innovative methods"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B07105 СУДОВОЖДЕНИЕ»": {
    "ru": [
      "Маневрирование и управление", "Несение ходовой вахты", "Предотвращение пожаров", "Морская безопасность", "Планирование и переход", "Метео прогнозирование", "Определение местоположения", "Наблюдение за грузами", "Маневрирование с опасными грузами", "Организация медпомощи"
    ],
    "kz": [
      "Maneuvering and control",
      "Watchkeeping",
      "Fire prevention",
      "Maritime safety",
      "Planning and transition",
      "Weather forecasting",
      "Location determination",
      "Cargo observation",
      "Maneuvering with dangerous cargo",
      "Medical assistance organization"
    ],
    "en": [
      "Maneuvering and control",
      "Watchkeeping",
      "Fire prevention",
      "Maritime safety",
      "Planning and transition",
      "Weather forecasting",
      "Location determination",
      "Cargo observation",
      "Maneuvering with dangerous cargo",
      "Medical assistance organization"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nБИЗНЕСА И УПРАВЛЕНИЯ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В04103 УЧЕТ И АУДИТ»": {
    "ru": [
      "Финансовый анализ", "Бухгалтерский учет", "Налоговый учет", "Проведение аудита", "Управленческий учет", "Проектный анализ", "Экономический анализ", "Бухгалтерское ПО", "Бизнес-этика", "Коммуникативные навыки"
    ],
    "kz": [
      "Қаржылық талдау",
      "Бухгалтерлік есеп",
      "Салық есебі",
      "Аудит жүргізу",
      "Басқару есебі",
      "Дизайнды талдау",
      "Экономикалық талдау",
      "Бухгалтерлік бағдарламалық қамтамасыз ету",
      "Іскерлік этика",
      "Қарым-қатынас дағдылары"
    ],
    "en": [
      "Financial analysis",
      "Accounting",
      "Tax accounting",
      "Audit",
      "Managerial accounting",
      "Design analysis",
      "Economic analysis",
      "Accounting software",
      "Business ethics",
      "Communication skills"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО СПЕЦИАЛЬНОСТИ «5B070600 ГЕОЛОГИЯ И РАЗВЕДКА МЕСТОРОЖДЕНИЙ ПОЛЕЗНЫХ ИСКОПАЕМЫХ»": {
    "ru": [
      "Решение технических задач", "Интерпретация гео-данных", "Моделирование систем", "Инженерные решения", "Научно-исследовательская деятельность", "Инженерные эксперименты", "Профессиональная этика", "Эффективная коммуникация", "Командная работа", "Самообучаемость"
    ],
    "kz": [
      "Техникалық мәселелерді шешу",
      "Гео-мәліметтерді интерпретациялау",
      "Жүйені модельдеу",
      "Инженерлік шешімдер",
      "Зерттеу қызметі",
      "Инженерлік тәжірибелер",
      "Кәсіби этика",
      "Тиімді қарым-қатынас",
      "Топтық жұмыс",
      "Өздігінен білім алу"
    ],
    "en": [
      "Technical problem solving",
      "Interpretation of geo-data",
      "System modeling",
      "Engineering solutions",
      "Research activities",
      "Engineering experiments",
      "Professional ethics",
      "Effective communication",
      "Teamwork",
      "Self-learning"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МBA\nПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7M04108 ДЕЛОВОЕ АДМИНИСТРИРОВАНИЕ ДЛЯ РУКОВОДИТЕЛЕЙ (EMBA)»": {
    "ru": [
      "Стратегическое планирование", "Лидерство и управление", "Финансовый анализ", "Управление проектами", "Маркетинговая стратегия", "Организационное развитие", "Принятие решений", "Управление инновациями", "Эффективное общение", "Корпоративная этика"
    ],
    "kz": [
      "Стратегиялық жоспарлау",
      "Көшбасшылық және менеджмент",
      "Қаржылық талдау",
      "Жобаны басқару",
      "Маркетинг стратегиясы",
      "Ұйымдастырушылық даму",
      "Шешімдерді қабылдау",
      "Инновацияларды басқару",
      "Тиімді коммуникация",
      "Корпоративтік этика"
    ],
    "en": [
      "Strategic planning",
      "Leadership and management",
      "Financial analysis",
      "Project management",
      "Marketing strategy",
      "Organizational development",
      "Decision making",
      "Innovation management",
      "Effective communication",
      "Corporate ethics"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М06105 НАУКА О ДАННЫХ»": {
    "ru": [
      "Машинное обучение", "Анализ данных", "Обработка больших данных", "Разработка алгоритмов", "Статистическое моделирование", "Статистический анализ", "Визуализация данных", "Оценка моделей", "Алгоритмическая оптимизация", "Интерпретация результатов"
    ],
    "kz": [
      "Машиналық оқыту",
      "Деректерді талдау",
      "Үлкен деректерді өңдеу",
      "Алгоритм құрастыру",
      "Статистикалық модельдеу",
      "Статистикалық талдау",
      "Деректерді визуализациялау",
      "Үлгі бойынша бағалау",
      "Алгоритмдік оңтайландыру",
      "Нәтижелерді интерпретациялау",
    ],
    "en": [
      "Geological modeling",
      "Problem solving",
      "Experiments and analysis",
      "Data interpretation",
      "Technical research",
      "Engineering solutions",
      "Teamwork",
      "Professional ethics",
      "Effective communication",
      "Innovative methods",
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М07202 ГЕОЛОГИЯ И РАЗВЕДКА МЕСТОРОЖДЕНИЙ ПОЛЕЗНЫХ ИСКОПАЕМЫХ»": {
    "ru": [
      "Геологическое моделирование",
      "Решение задач",
      "Эксперименты и анализ",
      "Данных интерпретация",
      "Технические исследования",
      "Инженерные решения",
      "Командная работа",
      "Профессиональная этика",
      "Эффективная коммуникация",
      "Инновационные методы",
    ],
    "kz": [
      "Геологиялық модельдеу",
      "Мәселені шешу",
      "Эксперимент және талдау",
      "Мәліметтерді интерпретациялау",
      "Техникалық зерттеулер",
      "Инженерлік шешімдер",
      "Топтық жұмыс",
      "Кәсіби этика",
      "Тиімді қарым-қатынас",
      "Инновациялық әдістер",
    ],
    "en": [
      "Geological modeling",
      "Problem solving",
      "Experiments and analysis",
      "Data interpretation",
      "Technical research",
      "Engineering solutions",
      "Teamwork",
      "Professional ethics",
      "Effective communication",
      "Innovative methods",
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nБИЗНЕСА И УПРАВЛЕНИЯ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В04102 ЭКОНОМИКА»": {
    "ru": [
      "Экономические модели",
      "Математическая основа",
      "Статистические методы",
      "Экономический анализ",
      "Финансовые рынки",
      "Оценка проектов",
      "Бюджетирование",
      "Эмпирические стратегии",
      "Международная экономическая теория",
      "Аналитические модели",
    ],
    "kz": [
      "Экономикалық модельдер",
      "Математикалық негіз",
      "Статистикалық әдістер",
      "Экономикалық талдау",
      "Қаржы нарықтары",
      "Жобаны бағалау",
      "Бюджеттеу",
      "Эмпирикалық стратегиялар",
      "Халықаралық экономикалық теория",
      "Аналитикалық модельдер",
    ],
    "en": [
      "Economic models",
      "Mathematical basis",
      "Statistical methods",
      "Economic analysis",
      "Financial markets",
      "Project evaluation",
      "Budgeting",
      "Empirical strategies",
      "International economic theory",
      "Analytical models",
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО СПЕЦИАЛЬНОСТИ «5B071500 МОРСКАЯ ТЕХНИКА И ТЕХНОЛОГИИ»": {
    "ru": [
      "Инспекция морских судов",
      "Техническое обслуживание",
      "Управление проектами",
      "Организационное управление",
      "Финансовый анализ",
      "Контроль качества",
      "Управление изменениями",
      "Управление инновациями",
      "Эффективное общение",
      "Охрана окружающей среды"
    ],
    "kz": [
      "Теңіз кемелерін тексеру",
      "Техникалық қызмет көрсету",
      "Жобаны басқару",
      "Ұйымдастырушылық басқару",
      "Қаржылық талдау",
      "Сапа бақылауы",
      "Басқаруды өзгерту",
      "Инновацияларды басқару",
      "Тиімді коммуникация",
      "Қоршаған ортаны қорғау",
    ],
    "en": [
      "Inspection of ships",
      "Technical maintenance",
      "Project management",
      "Organizational management",
      "Financial analysis",
      "Quality control",
      "Change management",
      "Innovation management",
      "Effective communication",
      "Environmental protection"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nВ ОБЛАСТИ ИНФОРМАЦИОННО-КОММУНИКАЦИОННЫХ ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B06102 ВЫЧИСЛИТЕЛЬНАЯ ТЕХНИКА И ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ»": {
    "ru": [
      "Программирование",
      "Программное моделирование",
      "Компьютерная инженерия",
      "Анализ данных",
      "Технические решения",
      "Инженерно-технический анализ",
      "Командная работа",
      "Самообучаемость",
      "Эффективная коммуникация",
      "Профессиональная этика"
    ],
    "kz": [
      "Бағдарламалау",
      "Программалық модельдеу",
      "Компьютерлік инженерия",
      "Деректерді талдау",
      "Техникалық шешімдер",
      "Инженерлік талдау",
      "Топтық жұмыс",
      "Өздігінен білім алу",
      "Тиімді қарым-қатынас",
      "Кәсіби этика",
    ],
    "en": [
      "Programming",
      "Software modeling",
      "Computer engineering",
      "Data analysis",
      "Technical solutions",
      "Engineering and technical analysis",
      "Teamwork",
      "Self-learning",
      "Effective communication",
      "Professional ethics"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М07109 МАТЕРИАЛОВЕДЕНИЕ И ТЕХНОЛОГИЯ НОВЫХ МАТЕРИАЛОВ»": {
    "ru": [
      "Синтез материалов",
      "Анализ материалов",
      "Технологическое моделирование",
      "Физико-химические испытания",
      "Наноматериалы разработка",
      "Материаловедческие методы",
      "Инженерное проектирование",
      "Компьютерные технологии",
      "Стандартные испытания",
      "Экологическая ответственность",
    ],
    "kz": [
      "Материалдардың синтезі",
      "Материалдарды талдау",
      "Процесті модельдеу",
      "Физико-химиялық сынақтар",
      "Наноматериалдардың дамуы",
      "Материалтану әдістері",
      "Инженерлік дизайн",
      "Компьютерлік технологиялар",
      "Стандартты сынақтар",
      "Экологиялық жауапкершілік"
    ],
    "en": [
      "Material synthesis",
      "Material analysis",
      "Technological modeling",
      "Physico-chemical tests",
      "Nanomaterials development",
      "Materials science methods",
      "Engineering design",
      "Computer technology",
      "Standard tests",
      "Environmental responsibility",
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B07104 ЭКСПЛУАТАЦИЯ СУДОВЫХ ЭНЕРГЕТИЧЕСКИХ УСТАНОВОК»": {
    "ru": [
      "Безопасность машинной вахты",
      "Эксплуатация главных установок",
      "Техобслуживание судовых механизмов",
      "Эксплуатация электрооборудования",
      "Техобслуживание электрооборудования",
      "Предотвращение загрязнения",
      "Предотвращение пожаров",
      "Управление двигательной установкой",
      "Мореходное состояние судна",
      "Ремонт судовых механизмов"
    ],
    "kz": [
      "Қозғалтқыш сағатының қауіпсіздігі",
      "Негізгі қондырғыларды пайдалану",
      "Кеме техникасына техникалық қызмет көрсету",
      "Электр жабдықтарын пайдалану",
      "Электр техникалық қызмет көрсету",
      "Ластанудың алдын алу",
      "Өрттің алдын алу",
      "Қозғалтқышты басқару",
      "Кеменің теңізге жарамдылығы",
      "Кеме механизмдерін жөндеу"
    ],
    "en": [
      "Safety of the engine room watch",
      "Operation of main installations",
      "Maintenance of ship mechanisms",
      "Operation of electrical equipment",
      "Maintenance of electrical equipment",
      "Prevention of pollution",
      "Fire prevention",
      "Engine installation management",
      "Seaworthiness of the vessel",
      "Repair of ship mechanisms"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nБИЗНЕСА И УПРАВЛЕНИЯ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В04108  ФИНАНСЫ И ЭКОНОМИКА»": {
    "ru": [
      "Статистические методы",
      "Экономические модели",
      "Финансовые рынки",
      "Аналитические модели",
      "Проектная оценка",
      "Исследование рынка",
      "Углубленная математика",
      "Эмпирические стратегии",
      "Стратегический анализ",
      "Бюджетный процесс",
    ],
    "kz": [
      "Статистикалық әдістер",
      "Экономикалық модельдер",
      "Қаржы нарықтары",
      "Аналитикалық модельдер",
      "Жобаны бағалау",
      "Нарықты зерттеу",
      "Жетілдірілген математика",
      "Эмпирикалық стратегиялар",
      "Стратегиялық талдау",
      "Бюджеттік процесс"
    ],
    "en": [
      "Statistical methods",
      "Economic models",
      "Financial markets",
      "Analytical models",
      "Project evaluation",
      "Market research",
      "Advanced mathematics",
      "Empirical strategies",
      "Strategic analysis",
      "Budget process"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА БИЗНЕСА И УПРАВЛЕНИЯ\nПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ \n«7M04106 УПРАВЛЕНИЕ ПРОЕКТАМИ (ПРОФИЛЬНОЕ НАПРАВЛЕНИЕ)»": {
    "ru": [
      "Управление проектами",
      "Техники управления",
      "Операционное управление",
      "Методы управления",
      "Цикл проекта",
      "Качественный анализ",
      "Количественный анализ",
      "IT в управлении",
      "Этика и ответственность",
      "Деловое общение"
    ],
    "kz": [
      "Жобаны басқару",
      "Бақылау әдістері",
      "Операциялық басқару",
      "Басқару әдістері",
      "Жоба циклі",
      "Сапалық талдау",
      "Сандық талдау",
      "Менеджменттегі IT",
      "Этика және жауапкершілік",
      "Іскерлік әңгіме",
    ],
    "en": [
      "Project management",
      "Management techniques",
      "Operational management",
      "Management methods",
      "Project cycle",
      "Qualitative analysis",
      "Quantitative analysis",
      "IT in management",
      "Ethics and responsibility",
      "Business communication"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М06104 МЕНЕДЖМЕНТ В ИТ»": {
    "ru": [
      "Управление IT",
      "Анализ методов",
      "Количественные инструменты",
      "Моделирование",
      "Решения поддержки",
      "Программирование",
      "Управление технологиями",
      "Коммуникация (английский)",
      "Математические модели",
      "Проектирование"
    ],
    "kz": [
      "АТ басқару",
      "Әдістерді талдау",
      "Сандық құралдар",
      "Модельдеу",
      "Қолдау шешімдері",
      "Бағдарламалау",
      "Технологияларды басқару",
      "Байланыс (ағылшын тілі)",
      "Математикалық модельдер",
      "Дизайн"
    ],
    "en": [
      "IT management",
      "Methods analysis",
      "Quantitative tools",
      "Modeling",
      "Decision support",
      "Programming",
      "Technology management",
      "Communication (English)",
      "Mathematical models",
      "Design"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nВ ОБЛАСТИ ИНФОРМАЦИОННО-КОММУНИКАЦИОННЫХ ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B06103 МАТЕМАТИЧЕСКОЕ И КОМПЬЮТЕРНОЕ МОДЕЛИРОВАНИЕ»": {
    "ru": [
      "Математический анализ",
      "Статистические методы",
      "Экономическое моделирование",
      "Анализ данных",
      "Наука о данных",
      "Программные пакеты",
      "Исследование моделей",
      "Аналитические модели",
      "Эмпирические стратегии",
      "Обучение по данным"
    ],
    "kz": [
      "Математикалық талдау",
      "Статистикалық әдістер",
      "Экономикалық модельдеу",
      "Деректерді талдау",
      "Деректер туралы ғылым",
      "Бағдарламалық қамтамасыз ету пакеттері",
      "Модельді зерттеу",
      "Аналитикалық модельдер",
      "Эмпирикалық стратегиялар",
      "Деректерден үйрену"
    ],
    "en": [
      "Mathematical analysis",
      "Statistical methods",
      "Economic modeling",
      "Data analysis",
      "Data science",
      "Software packages",
      "Model research",
      "Analytical models",
      "Empirical strategies",
      "Data learning"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nВ ОБЛАСТИ ИНФОРМАЦИОННО-КОММУНИКАЦИОННЫХ ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B06108 ЭКОНОМИКО-МАТЕМАТИЧЕСКОЕ И КОМПЬЮТЕРНОЕ МОДЕЛИРОВАНИЕ»": {
    "ru": [
      "Математический анализ",
      "Статистические методы",
      "Экономическое моделирование",
      "Анализ данных",
      "Наука о данных",
      "Программные пакеты",
      "Исследование моделей",
      "Аналитические модели",
      "Эмпирические стратегии",
      "Обучение по данным",
    ],
    "kz": [
      "Математикалық талдау",
      "Статистикалық әдістер",
      "Экономикалық модельдеу",
      "Деректерді талдау",
      "Деректер туралы ғылым",
      "Бағдарламалық қамтамасыз ету пакеттері",
      "Модельді зерттеу",
      "Аналитикалық модельдер",
      "Эмпирикалық стратегиялар",
      "Деректерден үйрену"
    ],
    "en": [
      "Mathematical analysis",
      "Statistical methods",
      "Economic modeling",
      "Data analysis",
      "Data science",
      "Software packages",
      "Model research",
      "Analytical models",
      "Empirical strategies",
      "Data learning",
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М07101 ХИМИЧЕСКАЯ ТЕХНОЛОГИЯ ОРГАНИЧЕСКИХ ВЕЩЕСТВ»": {
    "ru": [], "kz": [], "en": []
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nЭКОНОМИКИ И БИЗНЕСА ПО СПЕЦИАЛЬНОСТИ «5В050700 МЕНЕДЖМЕНТ»": {
    "ru": [
      "Командная работа",
      "Деловое общение",
      "Анализ данных",
      "Профессиональная этика",
      "Решение задач",
      "Экономический анализ",
      "Проектное моделирование",
      "Самообучаемость",
      "Понимание трендов",
      "Глобальное образование"
    ],
    "kz": [
      "Топтық жұмыс",
      "Іскерлік әңгіме",
      "Деректерді талдау",
      "Кәсіби этика",
      "Мәселені шешу",
      "Экономикалық талдау",
      "Жобаны модельдеу",
      "Өздігінен білім алу",
      "Трендтерді түсіну",
      "Жаһандық білім"
    ],
    "en": [
      "Teamwork",
      "Business communication",
      "Data analysis",
      "Professional ethics",
      "Problem solving",
      "Economic analysis",
      "Project modeling",
      "Self-learning",
      "Understanding trends",
      "Global education"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО СПЕЦИАЛЬНОСТИ «5В070400 ВЫЧИСЛИТЕЛЬНАЯ ТЕХНИКА И ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ»": {
    "ru": [
      "Программирование",
      "Разработка ПО",
      "Компьютерная архитектура",
      "Алгоритмические основы",
      "Базы данных",
      "Системный анализ",
      "Сетевые технологии",
      "Кибербезопасность",
      "Искусственный интеллект",
      "Машинное обучение",
    ],
    "kz": [
      "Бағдарламалау",
      "Бағдарламалық қамтамасыз етуді әзірлеу",
      "Компьютердің архитектурасы",
      "Алгоритмдік негіздері",
      "Дерекқор",
      "Жүйелік талдау",
      "Желілік технологиялар",
      "Киберқауіпсіздік",
      "Жасанды интеллект",
      "Машиналық оқыту"
    ],
    "en": [
      "Programming",
      "Software development",
      "Computer architecture",
      "Algorithmic foundations",
      "Databases",
      "System analysis",
      "Network technologies",
      "Cybersecurity",
      "Artificial intelligence",
      "Machine learning",
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nЭКОНОМИКИ И БИЗНЕСА ПО СПЕЦИАЛЬНОСТИ «5В050900 ФИНАНСЫ»": {
    "ru": [
      "Анализ финансовой отчетности",
      "Корпоративные финансы",
      "Инвестиции",
      "Финансовый риск менеджмент",
      "Налоги и налогообложение",
      "Финансовый учет",
      "Управленческий учет",
      "Экономическое прогнозирование",
      "Оценка бизнеса и стоимости компании",
      "Управление проектами"
    ],
    "kz": [
      "Қаржылық есептілікті талдау",
      "Корпоративтік қаржы",
      "Инвестициялар",
      "Қаржылық тәуекелді басқару",
      "Салықтар және салық салу",
      "Қаржылық есеп",
      "Басқару есебі",
      "Экономикалық болжау",
      "Кәсіпорынның және кәсіпорынның құнын бағалау",
      "Жобаны басқару",
    ],
    "en": [
      "Financial statement analysis",
      "Corporate finance",
      "Investments",
      "Financial risk management",
      "Taxes and taxation",
      "Financial accounting",
      "Management accounting",
      "Economic forecasting",
      "Business valuation and company valuation",
      "Project management"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ МАГИСТРА\nТЕХНИЧЕСКИХ НАУК ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «7М06107 КОМПЬЮТЕРНАЯ НАУКА И АНАЛИТИКА ДАННЫХ»": {
    "ru": [
      "Машинное обучение",
      "Технологии больших данных",
      "Методы Data Mining",
      "Статистический анализ",
      "Обработка данных",
      "Создание баз данных",
      "Разработка моделей",
      "Проектирование программ",
      "Анализ вычислений",
      "Анализ и обобщение"
    ],
    "kz": [
      "Машиналық оқыту",
      "Үлкен деректер технологиялары",
      "Мәліметтерді іздеу әдістері",
      "Статистикалық талдау",
      "Мәліметтерді өңдеу",
      "Мәліметтер қорын құру",
      "Модель әзірлеу",
      "Бағдарлама дизайны",
      "Есептеулерді талдау",
      "Анализ және синтез"
    ],
    "en": [
      "Machine learning",
      "Big data technologies",
      "Data Mining Methods",
      "Statistical analysis",
      "Data processing",
      "Database creation",
      "Model development",
      "Program design",
      "Computational analysis",
      "Analysis and synthesis"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nВ ОБЛАСТИ ИНФОРМАЦИОННО-КОММУНИКАЦИОННЫХ ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B06109 ИНФОРМАЦИОННЫЕ СИСТЕМЫ В БИЗНЕСЕ»": {
    "ru": [
      "Информационные технологии",
      "Наука о данных",
      "Алгоритмы и структуры данных",
      "Статистические методы",
      "Экономические модели",
      "Оценка проектов",
      "Математическая основа",
      "Эмпирические стратегии",
      "Программные пакеты",
      "Технологические изменения"
    ],
    "kz": [
      "Ақпараттық технологиялар",
      "Деректер туралы ғылым",
      "Алгоритмдер және деректер құрылымдары",
      "Статистикалық әдістер",
      "Экономикалық модельдер",
      "Жобаны бағалау",
      "Математикалық негіз",
      "Эмпирикалық стратегиялар",
      "Бағдарламалық қамтамасыз ету пакеттері",
      "Технологиялық өзгерістер"
    ],
    "en": [
      "Information technology",
      "Data science",
      "Algorithms and data structures",
      "Statistical methods",
      "Economic models",
      "Project evaluation",
      "Mathematical basis",
      "Empirical strategies",
      "Software packages",
      "Technological changes"
    ],
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6В07202 ГЕОЛОГИЯ И РАЗВЕДКА МЕСТОРОЖДЕНИЙ ПОЛЕЗНЫХ ИСКОПАЕМЫХ»": {
    "ru": [
      "Решение технических задач",
      "Данные и интерпретация",
      "Моделирование систем",
      "Инженерные решения",
      "Научно-исследовательская деятельность",
      "Инженерные эксперименты",
      "Профессиональная этика",
      "Эффективная коммуникация",
      "Командная работа",
      "Самообучаемость",
    ],
    "kz": [
      "Техникалық мәселелерді шешу",
      "Мәліметтер және интерпретация",
      "Жүйені модельдеу",
      "Инженерлік шешімдер",
      "Зерттеу қызметі",
      "Инженерлік тәжірибелер",
      "Кәсіби этика",
      "Тиімді қарым-қатынас",
      "Топтық жұмыс",
      "Өздігінен білім алу"
    ],
    "en": [
      "Solving technical problems",
      "Data and interpretation",
      "System modeling",
      "Engineering solutions",
      "Research activities",
      "Engineering experiments",
      "Professional ethics",
      "Effective communication",
      "Teamwork",
      "Self-learning"
    ]
  },
  "ПРИСУЖДЕНА СТЕПЕНЬ БАКАЛАВРА\nТЕХНИКИ И ТЕХНОЛОГИЙ ПО ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЕ «6B07201 НЕФТЕГАЗОВОЕ ДЕЛО»": {
    "ru": [
      "Технологические режимы бурения",
      "Применение безопасности производства",
      "Анализ данных скважин",
      "Практические знания нефтегаза",
      "Диагностика оборудования",
      "Командная работа",
      "Компьютерные технологии",
      "Решение проблем",
      "Коммуникационные навыки",
      "Критическое мышление"
    ],
    "kz": [
      "Технологиялық бұрғылау режимдері",
      "Өндіріс қауіпсіздігін қолдану",
      "Жақсы деректерді талдау",
      "Мұнай және газ туралы практикалық білім",
      "Жабдықтың диагностикасы",
      "Топтық жұмыс",
      "Компьютерлік технологиялар",
      "Мәселені шешу",
      "Қарым-қатынас дағдылары",
      "Сыни тұрғыдан ойлау"
    ],
    "en": [
      "Drilling technology modes",
      "Application of production safety",
      "Well data analysis",
      "Practical knowledge of oil and gas",
      "Equipment diagnostics",
      "Teamwork",
      "Computer technology",
      "Problem solving",
      "Communication skills",
      "Critical thinking"
    ],
  },
  "Алматыгенплан Q-Lab": {"kz": [], "ru": [], "en": []}
}