import React from 'react';

import {routes} from "@src/shared/routes";
import {ReactComponent as DiplomaIcon} from "@src/assets/icons/diplomaIcon.svg";
import {ReactComponent as MainPageIcon} from "@src/assets/icons/mainPageIcon.svg";
import {ReactComponent as UniversityIcon} from "@src/assets/icons/universityIcon.svg";

export interface AppRoutesNavigation {
    id: number;
    name: string;
    to: typeof routes[keyof typeof routes];
    role: string;
    icon: React.ReactNode
}

export const privateNavigations: AppRoutesNavigation[] = [
    {
        id: 1,
        name: 'Дипломы',
        to: routes.diploma,
        role: "*",
        icon: <DiplomaIcon/>,
    },
    {
        id: 2,
        name: 'Университеты',
        to: routes.university,
        role: "*",
        icon: <UniversityIcon/>,
    },
    {
        id: 3,
        name: 'О нас',
        to: routes.aboutUs,
        role: '*',
        icon: <UniversityIcon />
    },
    {
        id: 4,
        name: 'Вакансии',
        to: routes.vacancies,
        role: '*',
        icon: <UniversityIcon />,
    },
    {
        id: 5,
        name: 'Новости',
        to: routes.news,
        role: '*',
        icon: <UniversityIcon />
    }
];