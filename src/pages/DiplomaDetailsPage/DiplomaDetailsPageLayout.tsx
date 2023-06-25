import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as CalendarIcon} from '@src/assets/icons/calendar.svg';
import {ReactComponent as FileCheckIcon} from '@src/assets/icons/Lesson.svg';
import {ReactComponent as CertificateIcon} from '@src/assets/icons/Cerificate.svg';
import {ReactComponent as DownloadIcon} from '@src/assets/icons/download.svg';
import {ReactComponent as ShareIcon} from '@src/assets/icons/share.svg';
import {ReactComponent as QRIcon} from '@src/assets/icons/qr-code.svg';
import exampleImage from "@src/assets/example/diplomaFullHD.jpg";
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {SwitchDetails} from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";


export const DiplomaDetailsPageLayout: React.FC = () => {

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 3rem' pt='3rem'>
            <Box width='32%' display='flex' flexDirection="column">
                <Card sx={{borderRadius: "1.4rem", background: "#CED4D3"}}>
                    <CardMedia
                        component="img"
                        sx={{padding: "1.4rem", borderRadius: "1.4rem"}}
                        image={exampleImage}
                        alt="University Image"
                    >
                    </CardMedia>
                </Card>
                <Box display='flex' mt={"2rem"} width={"100%"} mx='auto' justifyContent='space-between'>
                    <Button startIcon={<DownloadIcon/>}  variant='outlined' sx={{borderColor: "#0A66C2", borderRadius:"18px"}}>
                         Скачать
                    </Button>
                    <Button startIcon={<ShareIcon/>} variant='outlined' sx={{borderColor: "#0A66C2", borderRadius:"18px" }}>
                        Поделиться
                    </Button>
                    <Button startIcon={<QRIcon/>} variant='outlined' sx={{borderColor: "#0A66C2", borderRadius:"18px"}}>
                         QR-код
                    </Button>
                </Box>
            </Box>
            <Box width='45%' display='flex' flexDirection='column' gap='1rem' pt='1.5rem'>
                <Typography fontWeight='700' fontSize='1.4rem'>
                    Сериков Сырым Сержанулы
                </Typography>
                <Box>

                    <Box display='flex' mb='.5rem'>
                        <Typography fontSize='1.4rem' mr='.5rem'>
                            Cтепень:
                        </Typography>
                        <Typography fontSize='1.4rem' fontWeight='700'>Бакалавр</Typography>
                    </Box>

                    <Box display='flex' mb='.5rem'>
                        <Typography fontSize='1.4rem' mr='.5rem'>Специальность:</Typography>
                        <Typography fontSize='1.4rem' fontWeight='700'>«6B07201 Нефтегазовое дело»</Typography>
                    </Box>

                    <Box display='flex' width='100%' gap='2rem' mb='.5rem'>
                        <Box display='flex'>
                            <CalendarIcon style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                            <Typography fontSize='1.4rem' mr='.5rem' color="#697B7A">23.07.2002</Typography>
                        </Box>
                        <Box display='flex'>
                            <FileCheckIcon style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                            <Typography fontSize='1.4rem' mr='.5rem' color="#697B7A">55 555 66667</Typography>
                        </Box>
                        <Box display='flex'>
                            <CertificateIcon style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                            <Typography fontSize='1.4rem' mr='.5rem' color="#697B7A">Оригинал</Typography>
                        </Box>
                    </Box>
                    <SwitchDetails/>
                </Box>
            </Box>
        </Box>

    );
};