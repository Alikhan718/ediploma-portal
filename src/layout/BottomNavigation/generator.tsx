import React, { ReactNode } from 'react';
import { routes } from "@src/shared/routes";

export interface AppRoutesNavigation {
  id: number;
  name: {
    ru: string;
    kz: string;
    en: string;
  };
  to: typeof routes[keyof typeof routes];
  icon: ReactNode;
  role: string[];
  verticalAlign: string,
  function?: () => void,
}

export const bottomNavigations: AppRoutesNavigation[] = []
export const localization = {
  ru: {
    job: 'Работа',
    diplomas: 'Дипломы',
    resume: 'Резюме',
    universities: 'Университеты',
    settings: 'Настройки',
  },
  kz: {
    job: 'Жұмыс',
    diplomas: 'Дипломдар',
    resume: 'Резюме',
    universities: 'Университеттер',
    settings: 'Параметрлер',
  },
  en: {
    job: 'Job',
    diplomas: 'Diplomas',
    resume: 'Resume',
    universities: 'Universities',
    settings: 'Settings',
  },
}