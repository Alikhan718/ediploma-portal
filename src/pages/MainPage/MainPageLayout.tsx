import React from 'react';

import {Box, Divider, Typography} from '@mui/material';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';

import {Button, Input, Modal} from '@src/components';
import {FooterSection} from "@src/pages/MainPage/components/FooterSection";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";


export const MainPageLayout: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box pt={'25px'}>

            <Box justifyContent='center' display='flex' mb='5rem'>
                <Box width="60%" mt='2.75rem'>
                    <Typography
                        fontSize='2rem'
                        fontWeight='700'
                        mb='.5rem'
                    >
                        Цифровой портал дипломов <br/>
                        на блокчейне
                    </Typography>
                    <Typography
                        variant='h5'
                    >
                        Проверьте диплом и найдите себе <br/>
                        лучших выпускников в компанию
                    </Typography>
                    <div style={{marginBottom: '1.5rem'}}/>
                    <Box display='flex' gap='1rem' mb='1rem'>
                        <Button variant='contained' onClick={() => {navigate(routes.diploma)}}>
                            Дипломы
                        </Button>
                        <Button variant='contained' color='secondary' onClick={() => {navigate(routes.university)}}>
                            Университеты
                        </Button>
                    </Box>
                    <Box display='flex'>
                        <Input
                            placeholder='Найти по ФИО, специальности и номеру диплома'
                            fullWidth={true}
                            inputSize='m'
                            sx={{
                                paddingRight: 0,
                            }}
                            endAdornment={
                                <Button
                                    onClick={() => {
                                        // search function
                                    }}
                                    buttonSize='m'
                                    variant='contained'
                                    sx={{
                                        padding: "0",
                                    }}
                                >
                                    <SearchIcon style={{filter: "brightness(250%) contrast(101%)"}}/>
                                </Button>
                            }
                            onChange={() => {
                                // search function
                            }}
                        />

                    </Box>
                </Box>
            </Box>
            <Divider/>
            <FooterSection/>
        </Box>

    );
};