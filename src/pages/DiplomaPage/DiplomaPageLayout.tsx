import React, {useEffect, useState} from 'react';
import {
    Box, CardContent, CardMedia, Grid, Typography,
    Skeleton
} from '@mui/material';
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {useNavigate} from "react-router-dom";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import styles from "./DiplomaPage.module.css";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";
import {Button, Modal} from "@src/components";
import {isAuthenticated} from "@src/utils/userAuth";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";

import {localization} from "src/pages/DiplomaPage/generator";
import {selectLanguage} from "@src/store/generals/selectors";
import {routes} from "@src/shared/routes";

export const DiplomaPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const diplomaList = useSelector(selectDiplomaList);
    useEffect(() => {
        dispatch(fetchDiplomas());
    }, []);
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    const lang = useSelector(selectLanguage);


    const handleCardClick = (counter: number) => {
        isAuthenticated() ? navigate(`/app/diploma/${counter}`) : setOpen(true);
    };
    const [open, setOpen] = React.useState(false);

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={styles.mainContainer} pt="2rem">
            <DiplomaPageHeader/>
            <Modal
                open={open}
                handleClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                    <img src={NeedAuthorizationPic} alt=""/>
                    <Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'
                                fontWeight='600'
                                variant="h6"
                                component="h2">
                        {localization[lang].Modal.needAuth}
                    </Typography>
                    <Button variant='contained' sx={{
                        marginTop: "1rem",
                        padding: "1rem",
                        width: "80%",
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: "2rem"
                    }} onClick={() => {
                        navigate(routes.login);
                    }}>{localization[lang].Modal.authButton}</Button>
                </Box>
            </Modal>
            <Grid container display="flex" rowSpacing={2} columnSpacing={1} flexWrap="wrap"
                  sx={{
                      margin: "0 !important"
                  }}
                  justifyContent="space-between"
                  className={styles.diplomasContainer} width="100%">
                {diplomaList ? (
                    diplomaList.map((e: any) => (
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
                                sx={{width: "100%", display: imageLoaded ? "block" : "none"}}
                                image={diplomaTemplate}
                                alt="University Image"
                                onLoad={handleImageLoad}
                            />
                            <Skeleton variant="rectangular" width={300} height={128}
                                      sx={{display: imageLoaded ? "none" : "block"}}
                                      animation="wave"/>


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
                                        {e.name_ru}
                                    </Typography>
                                    <Typography fontSize=".8rem" mt="0" color="#818181" className={styles.mobTextSm}>
                                        {e.speciality_ru?.substring(e.speciality_ru.search("«"), e.speciality_ru.search("»") + 1)}
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
        </Box>
    );
};
