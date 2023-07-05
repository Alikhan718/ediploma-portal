import React, {useEffect} from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography, useMediaQuery} from '@mui/material';
import {ReactComponent as StarIcon} from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/diploma.jpg";
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {Route, Routes, useNavigate} from "react-router-dom";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import {humanReadableToLocalTime} from "@src/utils/functions";
import styles from "./DiplomaPage.module.css";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";

export const DiplomaPageLayout: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const diplomaList = useSelector(selectDiplomaList);

    React.useEffect(() => {
        console.log(diplomaList);
        dispatch(fetchDiplomas());
    }, [diplomaList]);
    const getQueryWidth = () => {
        const matchesLg = useMediaQuery('(min-width:1200px)');
        const matchesMd = useMediaQuery('(max-width:1180px)');
        const matchesSm = useMediaQuery('(max-width:768px)');
        const matchesXs = useMediaQuery('(max-width:576px)');
        if (matchesXs) return "80%";
        if (matchesSm) return "60%";
        if (matchesMd) return "40%";
        if (matchesLg) return "25%";
    };
    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 2rem' pt='2rem'>
            <DiplomaPageHeader/>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' gap='0 1rem'
                 className={styles.diplomasContainer} width='100%'>

                {diplomaList ? diplomaList.map((e: any) => (
                    <Card key={e.counter} elevation={6}
                          onClick={() => {
                              navigate(`/app/diploma/${e.counter!}/details`);
                          }}
                          className={styles.diplomaItem}
                          sx={{
                              display: 'flex',
                              width: "49%",
                              cursor: "pointer",
                              borderRadius: "10px",
                              marginBottom: "1.5rem"
                          }}>
                        <CardMedia
                            component="img"
                            className={styles.diplomaImg}
                            sx={{width: "13rem", padding: "1.5rem"}}
                            image={diplomaTemplate}
                            alt="University Image"
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                            <CardContent
                                sx={{flex: '1 0 auto', display: "flex", flexDirection: "column", width: "100%"}}>
                                <Typography mb='.5rem' fontSize="1.25rem" className={styles.mobText} fontWeight="600">
                                    {e.name_ru}
                                </Typography>
                                <Typography mb='.5rem' fontSize="1rem" className={styles.mobTextSm}>
                                    {e.qualification_kz.substring(0, e.qualification_kz.search("»") + 1)}
                                </Typography>
                                <Box display='flex' mt='auto' width='100%'>
                                    <Typography fontSize="0.875rem" mr='auto'>
                                        {/*КБТУ*/}
                                    </Typography>
                                    {/*<Typography fontSize="0.875rem" ml='auto' mr='1rem'>*/}
                                    {/*    {humanReadableToLocalTime(e.protocol_en, "/")}*/}
                                    {/*</Typography>*/}
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>

                )) : null}
            </Box>
        </Box>

    );
};