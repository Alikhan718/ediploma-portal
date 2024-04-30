import React, { useState } from 'react';
import { BottomNavigationProps } from './BottomNavigation.props';
import { Paper, BottomNavigation, BottomNavigationAction, useMediaQuery, Theme, createStyles, makeStyles } from '@mui/material';
import { ReactComponent as Diploma } from '@src/assets/icons/diplomaNavIcon.svg';
import { ReactComponent as Job } from '@src/assets/icons/jobIcon.svg';
import { ReactComponent as University } from '@src/assets/icons/universitiesIcon.svg';
import { ReactComponent as Settings } from '@src/assets/icons/settingsIcon.svg';
import { ReactComponent as Resume } from '@src/assets/icons/resumeIcon.svg';
import { useSelector } from 'react-redux';
import { selectLanguage } from "@src/store/generals/selectors";
import { selectUserRole } from '@src/store/auth/selector';
import { useNavigate } from 'react-router-dom';
import { localization } from './generator';

export const AppBottomNav: React.FC<BottomNavigationProps> = (props): JSX.Element => {
    const isMobile = useMediaQuery('(max-width:998px)');
    const lang = useSelector(selectLanguage);
    const role = useSelector(selectUserRole).toLowerCase();
    const [isBottomNavVisible, setIsBottomNavVisible] = useState(isMobile);
    const navigate = useNavigate();

    const checkRoute = (): number => {
        const urlElements = window.location.href.split('/');
        switch (urlElements[urlElements.length - 1]) {
            case 'hrBank':
                return 0;
            case 'profile':
                return 1;
            case 'resume-generator':
                return 2;
            case 'university':
                return 3;
            case 'settings':
                return 4;
            default:
                return -1;
        };
    };

    const [value, setValue] = useState(checkRoute);

    const handleNavigate = (value: number): void => {
        switch (value) {
            case 0:
                navigate(`/employer`);
                break;
            case 1:
                navigate(`/user/profile`);
                break;
            case 2:
                navigate(`/user/resume-generator`);
                break;
            case 3:
                navigate(`/university`);
                break;
            case 4:
                navigate(`/user/settings`);
                break;
            default:
                navigate(`/`);
                break;
        }
    };

    React.useEffect(() => {
        setValue(checkRoute);
    });

    return (
        <>
            {isBottomNavVisible && role === 'student' && (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingTop: '0.44rem', paddingBottom: '1rem' }} elevation={3}>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            console.log(newValue);
                            handleNavigate(newValue);
                        }}
                    >
                        <BottomNavigationAction label={localization[lang].job} icon={<Job fill={value === 0 ? '#3B82F6' : '#9499AB'} />} />
                        <BottomNavigationAction label={localization[lang].diplomas} icon={<Diploma fill={value === 1 ? '#3B82F6' : '#9499AB'} />} />
                        <BottomNavigationAction label={localization[lang].resume} icon={<Resume fill={value === 2 ? '#3B82F6' : '#9499AB'} />} />
                        <BottomNavigationAction label={localization[lang].universities} icon={<University fill={value === 3 ? '#3B82F6' : '#9499AB'} />} />
                        <BottomNavigationAction label={localization[lang].settings} icon={<Settings fill={value === 4 ? '#3B82F6' : '#9499AB'} />} />
                    </BottomNavigation>
                </Paper>
            )}
        </>
    );
};

export const BottomNav = React.memo(AppBottomNav);