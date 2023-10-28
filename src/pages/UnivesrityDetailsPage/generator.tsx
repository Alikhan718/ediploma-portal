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