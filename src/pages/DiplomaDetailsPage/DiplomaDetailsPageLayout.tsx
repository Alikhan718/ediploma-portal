import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as CalendarIcon} from '@src/assets/icons/calendar.svg';
import {ReactComponent as FileCheckIcon} from '@src/assets/icons/Lesson.svg';
import {ReactComponent as CertificateIcon} from '@src/assets/icons/Certificate.svg';
import exampleImage from "@src/assets/example/diplomaFullHD.jpg";
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";


export const DiplomaDetailsPageLayout: React.FC = () => {

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 3rem' pt='1rem'>
            <Box width='32%'>

                <Card sx={{borderRadius: "1.5rem", background: "#CED4D3"}}>
                    <CardMedia
                        component="img"
                        sx={{padding: "1.5rem", borderRadius: "1.5rem"}}
                        image={exampleImage}
                        alt="University Image"
                    >

                    </CardMedia>
                </Card>
            </Box>
            <Box width='45%' display='flex' flexDirection='column' gap='2rem' pt='.3rem'>
                <Typography fontWeight='700' fontSize='1.5rem'>
                    Сериков Сырым Сержанулы
                </Typography>
                <Box>

                    <Box display='flex' mb='.5rem'>
                        <Typography fontSize='1.5rem' mr='.5rem'>
                            Cтепень:
                        </Typography>
                        <Typography fontSize='1.5rem' fontWeight='700'>Бакалавр</Typography>
                    </Box>

                    <Box display='flex' mb='.5rem'>
                        <Typography fontSize='1.5rem' mr='.5rem'>Специальность:</Typography>
                        <Typography fontSize='1.5rem' fontWeight='700'>«6B07201 Нефтегазовое дело»</Typography>
                    </Box>

                    <Box display='flex' width='100%' gap='2rem' mb='.5rem'>
                        <Box display='flex'>
                            <CalendarIcon style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                            <Typography fontSize='1.5rem' mr='.5rem' color="#697B7A">23.07.2002</Typography>
                        </Box>
                        <Box display='flex'>
                            <Typography fontSize='1.5rem' mr='.5rem' color="#697B7A">55 555 66667</Typography>
                        </Box>
                        <Box display='flex'>
                            <Typography fontSize='1.5rem' mr='.5rem' color="#697B7A">Оригинал</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};