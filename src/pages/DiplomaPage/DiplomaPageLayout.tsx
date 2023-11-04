import React, {useEffect, useState} from 'react';
import {
    Box, Card, CardContent, Button, Pagination,
    CardMedia, Grid, Typography, useMediaQuery
} from '@mui/material';
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {useNavigate} from "react-router-dom";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import styles from "./DiplomaPage.module.css";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";
import {extractYearFromHumanReadable} from "@src/utils/functions";
import {selectLanguage} from "@src/store/generals/selectors";


export const DiplomaPageLayout: React.FC = () => {
    const lang = useSelector(selectLanguage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const diplomaList = useSelector(selectDiplomaList);
    const diplomasPerPage = 16;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(diplomaList.length / diplomasPerPage);
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const startDiplomaIndex = (currentPage - 1) * diplomasPerPage;
    const endDiplomaIndex = currentPage * diplomasPerPage;
    const displayedDiplomas = diplomaList.slice(startDiplomaIndex, endDiplomaIndex);

    const handleCardClick = (counter: number) => {
        navigate(`/app/diploma/${counter}`);
    };

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={styles.mainContainer} pt="2rem">
            <DiplomaPageHeader/>
            <Grid container display="flex" rowSpacing={2} columnSpacing={1} flexWrap="wrap"
                  sx={{
                      margin: "0 !important"
                  }}
                  justifyContent="space-between"
                  className={styles.diplomasContainer} width="100%">
                {displayedDiplomas ? (
                    displayedDiplomas.map((e: any) => (
                        <Grid key={e.id} item xs={12} sm={5.9} md={3.9} lg={2.9}
                              onClick={() => handleCardClick(e.id!)}
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column', alignItems: 'center',
                                  cursor: "pointer",
                                  padding: "1rem 1rem 0 1rem !important",
                                  backgroundColor: "white",
                                  borderRadius: "1.25rem",
                                  marginBottom: "1.5rem"
                              }}
                        >
                            <CardMedia
                                key={e.id + "img"}
                                component="img"
                                className={styles.diplomaImg}
                                sx={{width: "100%",}}
                                image={diplomaTemplate}
                                alt="University Image"
                            />


                            <Box sx={{display: 'flex', flexDirection: 'row', width: "100%"}}>
                                <CardContent
                                    key={e.id + "content"}
                                    sx={{flex: '1', display: "flex", flexDirection: "column", width: "100%"}}>
                                    <Box display='flex' justifyContent='space-between' alignItems='center'>

                                        <Typography sx={{fontWeight: '600', fontSize: '16px'}}> КБТУ</Typography>
                                        <Typography fontSize="1rem" color="#818181">
                                            {e.year}
                                        </Typography>
                                    </Box>
                                    <Typography mb='.5rem' mt='0.5rem' fontSize="1.25rem" className={styles.mobText}
                                                fontWeight="600">
                                        {lang === 'en' ? e.name_en : lang === 'ru' ? e.name_ru : e.name_kz}
                                    </Typography>
                                    <Typography fontSize=".8rem" mt="0" color="#818181" className={styles.mobTextSm}>
                                        {
                                            lang === 'ru' ? e.speciality_ru?.substring(e.speciality_ru.search("«"), e.speciality_ru.search("»") + 1) :
                                            lang === 'en' ? e.speciality_en?.substring(e.speciality_en.search("«"), e.speciality_en.search("»") + 1) :
                                            lang === 'kz' ? e.speciality_kz?.substring(e.speciality_kz.search("«"), e.speciality_kz.search("»") + 1) :
                                            undefined
                                        }
                                    </Typography>
                                    {/* <Box display='flex' mt='auto' width='100%'> */}
                                    {/* <Typography fontSize="0.875rem" mr='auto'>
										</Typography> */}
                                    {/* <Typography fontSize="0.875rem" ml='auto' mr='1rem'>
												  {humanReadableToLocalTime(e.protocol_en, "/")}
                                        </Typography> */}
                                    {/* </Box> */}
                                </CardContent>
                            </Box>

                        </Grid>

                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </Grid>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginBottom: "2rem"
            }}>
                {/*<Button onClick={prevPage} disabled={currentPage === 1}>*/}
                {/*    Previous Page*/}
                {/*</Button>*/}
                <Box style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        shape="rounded"
                        color="primary"
                        size="large"
                    />
                </Box>
                {/*<Button onClick={nextPage} disabled={endDiplomaIndex >= diplomaList.length}>*/}
                {/*    Next Page*/}
                {/*</Button>*/}
            </Box>
        </Box>
    );
};
