import React from 'react';
import {Box, Grid, CardContent, CardMedia, Typography} from '@mui/material';
import { SchoolPageHeader } from "@src/pages/SchoolPage/components/SchoolPageHeader";
import styles from "./SchoolPage.module.css";
import { useNavigate } from 'react-router-dom';
import exampleImage from "@src/assets/example/schoolExample.jpeg";
import mirasImage from "@src/assets/example/miras.jpg";
import { useSelector } from "react-redux";
import { selectLanguage } from "@src/store/generals/selectors";

export const SchoolPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const lang = useSelector(selectLanguage);
    const schoolsList: any = [
        {
            id: 1,
            name: {
                'kz': "НЗМ IB",
                'ru': "НИШ IB",
                'en': 'NIS IB'
            },
        },
        {
            id: 2,
            name: {
                'kz': 'Мирас',
                'ru': 'Мирас',
                'en': 'Miras'
            },
        }
    ];
    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer}
            pt='2rem'>
            <SchoolPageHeader/>
            <Grid container display="flex" rowSpacing={1} columnSpacing={1} flexWrap="wrap" 
                justifyContent="space-between" className={styles.schoolContainer} width='100%'
            >
                {schoolsList.map((school: any) => (
                    <Grid
                        key={school.id} item xs={12} sm={5.9} md={5.9}
                        lg={5.9}
                        onClick={() => {
                            navigate(`/school/${school.id}`);
                        }}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: "pointer",
                            borderRadius: "1.25rem",
                            marginBottom: "1.5rem", backgroundColor: 'white',
                            paddingTop: ".5rem !important",
                            paddingX: ".5rem !important",

                        }}
                    >
                        <CardMedia
                            component="img"
                            className={styles.schoolImg}
                            sx={{
                                width: "100%",
                                borderRadius: "10px",
                                height: "20rem"
                            }}
                            image={school.id == 1 ? exampleImage : mirasImage }
                            alt={school.name ? `${school.name}` : "School image"}
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                            <CardContent sx={{flex: '0 0 auto'}}>
                                <Typography mb='.5rem' fontSize="1.3rem" fontWeight="600" sx={{
                                    "@media (max-width: 778px)": {
                                        fontSize: '0.75rem'
                                    },
                                    "@media (max-width: 998px)": {
                                        fontSize: '1rem'
                                    },
                                }}>
                                    {school.name[lang]}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};