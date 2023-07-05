import React, {useEffect} from 'react';

import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {useNavigate} from "react-router-dom";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import styles from "./DiplomaPage.module.css";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";

export const DiplomaPageLayout: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const diplomaList = useSelector(selectDiplomaList);
    useEffect(() => {
        dispatch(fetchDiplomas());
    }, []);

    const handleCardClick = (counter: number) => {
        navigate(`/app/diploma/${counter}/details`);
    };

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="0 2rem" pt="2rem">
            <DiplomaPageHeader/>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap="0 1rem"
                 className={styles.diplomasContainer} width="100%">
                {diplomaList ? (
                    diplomaList.map((e: any) => (
                        <Card
                            key={e.counter}
                            elevation={6}
                            onClick={() => handleCardClick(e.counter!)}
                            className={styles.diplomaItem}
                            sx={{
                                display: 'flex',
                                width: "49%",
                                cursor: "pointer",
                                borderRadius: "10px",
                                marginBottom: "1.5rem"
                            }}
                        > <CardMedia
                            component="img"
                            className={styles.diplomaImg}
                            sx={{width: "13rem", padding: "1.5rem"}}
                            image={diplomaTemplate}
                            alt="University Image"
                        />

                            <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                                <CardContent
                                    sx={{flex: '1 0 auto', display: "flex", flexDirection: "column", width: "100%"}}>
                                    <Typography mb='.5rem' fontSize="1.25rem" className={styles.mobText}
                                                fontWeight="600">
                                        {e.name_ru}
                                    </Typography>
                                    <Typography mb='.5rem' fontSize="1rem" className={styles.mobTextSm}>
                                        {e.qualification_kz?.substring(0, e.qualification_kz.search("»") + 1)}
                                    </Typography>
                                    <Box display='flex' mt='auto' width='100%'>
                                        <Typography fontSize="0.875rem" mr='auto'>
                                        </Typography>
                                        {/*<Typography fontSize="0.875rem" ml='auto' mr='1rem'>*/}
                                        {/*    {humanReadableToLocalTime(e.protocol_en, "/")}*/}
                                        {/*</Typography>*/}
                                    </Box>
                                </CardContent>
                            </Box>
                        </Card>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </Box>
        </Box>
    );
};