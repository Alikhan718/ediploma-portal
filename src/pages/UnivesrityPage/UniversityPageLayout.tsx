import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as StarIcon} from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/university.jpg";
import {UniversityPageHeader} from "@src/pages/UnivesrityPage/components/UniversityPageHeader";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";


export const UniversityPageLayout: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 2rem' pt='2rem'>
            <UniversityPageHeader/>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' gap='0 1rem' px='4rem' width='100%'>

                {[1].map((e) => (
                    <Card key={e} elevation={6} onClick={() => {
                        navigate(routes.universityDetails)
                    }} sx={{
                        display: 'flex',
                        cursor: "pointer",
                        width: "49%",
                        borderRadius: "10px",
                        marginBottom: "1.5rem"
                    }}>
                        <CardMedia
                            component="img"
                            sx={{width: "13rem"}}
                            image={exampleImage}
                            alt="University Image"
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography mb='.5rem' fontSize="1.25rem" fontWeight="600">
                                    Казахстанско-Британский
                                    Технический Университет
                                </Typography>
                                <Typography mb='.5rem' fontSize="1rem" fontWeight="600" color={"#2EC4B6"}>
                                    8 специальностей
                                </Typography>
                                <Box display='flex'>

                                    <Typography fontSize="0.875rem" mt='-.1rem' fontWeight="700">
                                        4.8
                                    </Typography>
                                    <StarIcon/>
                                    <StarIcon/>
                                    <StarIcon/>
                                    <StarIcon/>
                                    <StarIcon/>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                ))}
            </Box>

        </Box>

    );
};