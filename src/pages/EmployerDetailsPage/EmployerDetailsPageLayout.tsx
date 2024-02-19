import React from 'react';
import {
    Box, Typography, useMediaQuery
} from '@mui/material';
import exampleImage from '@src/assets/example/employerDetails.jpeg';
import {ReactComponent as SingleCheck} from "@src/assets/icons/single check.svg";
import { useSelector } from 'react-redux';
import { selectLanguage } from '@src/store/generals/selectors';
import {ReactComponent as ExpandMore} from '@src/assets/icons/expand_more.svg';
import icon from "@src/assets/icons/Logo (2).svg";
import {ReactComponent as Telegram} from "@src/assets/icons/tgEmployer.svg";
import {ReactComponent as Whatsapp} from "@src/assets/icons/wpEmployer.svg";
import {ReactComponent as Linkedin} from "@src/assets/icons/inEmployer.svg";
import {ReactComponent as Dots} from "@src/assets/icons/dotsEmployer.svg";
import {ReactComponent as Mail} from "@src/assets/icons/mailEmployer.svg";

export const EmployerDetailsPageLayout: React.FC = () => {
    const lang = useSelector(selectLanguage);
    const employerData = {
        "phone":{
            'ru': 'Номер телефона',
            'kz': 'Телефон номері',
            'en': 'Phone'
        },
        "email": {
            'ru': 'Почта',
            'kz': 'Пошта',
            'en': 'Email'
        },
        "address": {
            'ru': 'Распололжение',
            'kz': 'Мекен жайы',
            'en': 'Location'
        },
    };
    const employerNumData = {
        "branches_amount": {
            'ru': 'Кол-во филиалов',
            'kz': 'Филиалдар саны',
            'en': 'Branches'
        },
        "vacancy_amount": {
            'ru': 'Открытых вакансий',
            'kz': 'Ашық вакансиялар',
            'en': 'Open positions'
        },
        "hired_amount": {
            "ru": "Нанято сотрудников",
            "kz": "Тағайындалған жұмысшылар",
            "en": "Hired employees"
        },
    };
    const data = {
        "phone": "+7 777 777 77 77",
        "email": "jasaim@gmail.com",
        "address": "Almaty, Kazakhstan",
        "branches_amount": 5,
        "vacancy_amount": 10,
        "hired_amount": 5,
        "description": "Компания JASAIM, основанная в Астане (Казахстан) в 2022 году, является разработчиком финансовых, образовательных технологических решений, которые помогают интегрировать Web3, Blockchain и искусственный интеллект для потребителей, продавцов, разработчиков и учреждений по всему миру"
    };

    const [showFull, setShowFull] = React.useState(false);

    const handleText = (text: string): string => {
        const matchesSm = useMediaQuery('(max-width:768px)');
        const trimLimit = matchesSm ? 85 : 115;
        return showFull ? text : text.substring(0, trimLimit) + "...";
    };

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' justifyItems='center'>
            <Box>
                <img src={exampleImage} alt="employer" 
                    style={{ width: '100%', height: '25rem', objectFit: 'cover'}}/>
            </Box>
            <Box width='100%' display='flex' 
                flexDirection='column' padding='1rem' 
                sx={{backgroundColor: 'white'}} 
            >
                <Box paddingY='0.5rem' paddingX='1rem'>
                    <img src={icon} alt="icon" style={{position:"absolute", top:"27rem"}}/>
                </Box>
                <Box display='flex' padding='1rem' justifyContent='space-between' alignItems="flex-start">
                    <Box>
                        <Box display="flex" alignItems='center'>
                            <Typography
                                fontWeight='600'
                                sx={{
                                    paddingBottom: '14px',
                                    fontSize: '24px',
                                    '@media (max-width: 778px)': {
                                        fontSize: '20px',
                                        width: '100%',
                                    },
                                }}
                            >
                                {"Ф.И Работодателя"}
                            </Typography>
                            <Box marginLeft='0.5rem' marginBottom='0.5rem'>
                                <SingleCheck fill="#3B82F6"/>    
                            </Box>
                        </Box>
                        <Box display='flex' width='65%' justifyContent='center' 
                            justifyItems='center' padding='0.1rem' 
                            sx={{backgroundColor:"#EBF2FE", borderRadius:'1rem'}}
                        >
                            <Typography sx={{fontSize: '14px', color: '#3B82F6'}}>
                                {"Сфера деятельности"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box display='flex' justifyContent="center" 
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{backgroundColor: '#F4F7FE', borderRadius: '50%'}}
                        >
                            <Mail/>
                        </Box>
                        <Box display='flex' justifyContent="center" 
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{backgroundColor: '#F4F7FE', borderRadius: '50%'}}
                        >
                            <Telegram/>
                        </Box>
                        <Box display='flex' justifyContent="center" 
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{backgroundColor: '#F4F7FE', borderRadius: '50%'}}
                        >
                            <Whatsapp/>
                        </Box>
                        <Box display='flex' justifyContent="center" 
                            alignItems='center' padding='0.7rem' marginX='0.5rem'
                            sx={{backgroundColor: '#F4F7FE', borderRadius: '50%'}}
                        >
                            <Linkedin/>
                        </Box>
                        <Box display='flex' justifyContent="center" 
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{backgroundColor: '#F4F7FE', borderRadius: '50%'}}
                        >
                            <Dots/>
                        </Box>
                    </Box>
                </Box>
                <Box padding='1rem'>
                    <Typography
                        fontWeight='600'
                        sx={{
                            paddingBottom: '14px',
                            fontSize: '24px',
                            '@media (max-width: 778px)': {
                                fontSize: '20px',
                                width: '100%',
                            },
                        }}
                    >
                        {"Данные организации"}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                        <Box>
                            {Object.keys(employerData).map((key: any, index) => {
                                if (data[key as keyof typeof data]){
                                    return (
                                        <Box key={index} display='flex' flexDirection='column' 
                                            justifyContent='center' justifyItems='center' marginY='0.5rem'
                                        >
                                            <Typography>
                                                <span style={{color: "#818181", fontSize: "16px"}}>
                                                    {employerData[key as keyof typeof employerData][lang]}:
                                                </span>{" "}
                                                <span style={{ fontWeight: '600', fontSize: "16px"}}>
                                                    {data[key as keyof typeof data]}
                                                </span>{" "}
                                            </Typography>
                                        </Box>
                                    );
                                }
                            })}
                        </Box>
                        <Box display='flex'>
                            {Object.keys(employerNumData).map((key: any, index) => {
                                if (data[key as keyof typeof data]){
                                    return (
                                        <Box key={index} 
                                            display='flex' flexDirection='column'
                                            justifyContent='center' marginX='0.5rem'
                                        >
                                            <Typography>
                                                <span style={{ fontWeight: '600', fontSize: "16px"}}>
                                                    {data[key as keyof typeof data]}
                                                </span>
                                            </Typography>
                                            <Typography>
                                                <span style={{color: "#818181", fontSize: "16px"}}>
                                                    {employerNumData[key as keyof typeof employerNumData][lang]}
                                                </span>
                                            </Typography>
                                        </Box>
                                    );
                                }
                            })}
                        </Box>
                    </Box>
                </Box>
                <Box padding='1rem' width="50%">
                    <Typography
                        fontWeight='600'
                        sx={{paddingBottom: '14px', fontSize: '24px',
                            '@media (max-width: 778px)': {
                                fontSize: '20px', width: '100%',
                            },
                        }}
                    >
                        {"О компании"}
                    </Typography>
                    <Typography color="#818181">
                      {handleText(data ? data.description : "")}
                    </Typography>
                    <Typography style={{cursor: "pointer"}} fontWeight='600' color='#629BF8'
                                sx={{paddingBottom: '20px'}}
                                onClick={():void => {setShowFull(!showFull);}}
                    >
                      {"Показать"} {!showFull ? "больше" : "меньше"}
                      <ExpandMore style={{marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : ""}}/>
                    </Typography>
                </Box>
                
            </Box>
        </Box>
    );
};