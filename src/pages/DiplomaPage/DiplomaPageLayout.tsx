import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as StarIcon} from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/diploma.jpg";
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";


export const DiplomaPageLayout: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 2rem' pt='1rem'>
            <DiplomaPageHeader/>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => (
                <Card key={e} elevation={6}
                      onClick={()=> {navigate(routes.diplomaDetails)}}
                      sx={{display: 'flex', width: "45%",cursor: "pointer", borderRadius: "10px", marginBottom: "1.5rem"}}>
                    <CardMedia
                        component="img"
                        sx={{width: "13rem", padding: "1.5rem"}}
                        image={exampleImage}
                        alt="University Image"
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                        <CardContent sx={{flex: '1 0 auto', display: "flex", flexDirection: "column", width: "100%"}}>
                            <Typography mb='.5rem' fontSize="1.25rem" fontWeight="600">
                                Сериков Сырым Сержанулы
                            </Typography>
                            <Typography mb='.5rem' fontSize="1rem">
                                Специальность
                            </Typography>
                            <Box display='flex' mt='auto' width='100%'>
                                <Typography fontSize="0.875rem" mr='auto'>
                                    КБТУ
                                </Typography>
                                <Typography fontSize="0.875rem" ml='auto' mr='1rem'>
                                    2023/24
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            ))}
        </Box>

    );
};