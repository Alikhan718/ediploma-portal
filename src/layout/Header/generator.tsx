import React from 'react';

import {routes} from "@src/shared/routes";
import {ReactComponent as DiplomaIcon} from "@src/assets/icons/diplomaIcon.svg";
import {ReactComponent as MainPageIcon} from "@src/assets/icons/mainPageIcon.svg";
import {ReactComponent as UniversityIcon} from "@src/assets/icons/universityIcon.svg";

export const privateNavigations = [
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

];