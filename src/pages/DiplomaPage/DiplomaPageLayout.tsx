import React, {useEffect} from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as StarIcon} from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/diploma.jpg";
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {Route, Routes, useNavigate} from "react-router-dom";
import {diploma_routes, routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";
import {Modal} from "@src/components";
import {ReactComponent as NeedAuthorizationPic} from "@src/assets/example/requireAuthorizationPic.svg";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import {humanReadableToLocalTime} from "@src/utils/functions";
import {DiplomaDetailsPage} from "@src/pages";

export const DiplomaPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const diplomaList = useSelector(selectDiplomaList);

    React.useEffect(() => {
        dispatch(fetchDiplomas());
    }, [diplomaList]);
    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 2rem' pt='2rem'>
            <Modal
                open={open}
                handleClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                    <NeedAuthorizationPic/>
                    <Typography textAlign='center' id="modal-modal-title" fontSize='1rem' fontWeight='600' variant="h6"
                                component="h2">
                        Для открытия этой опции требуется авторизация
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
                    }}>Войти</Button>
                </Box>
            </Modal>
            <DiplomaPageHeader/>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' gap='0 1rem' px='4rem' width='100%'>

                {diplomaList.map((e: any) => (
                    <Card key={e.counter} elevation={6}
                          onClick={() => {
                              if (isAuthenticated()) {
                                  navigate(`/app/diploma/${e.counter!}/details`);
                              } else {
                                  handleOpen();
                              }

                          }}
                          sx={{
                              display: 'flex',
                              width: "49%",
                              cursor: "pointer",
                              borderRadius: "10px",
                              marginBottom: "1.5rem"
                          }}>
                        <CardMedia
                            component="img"
                            sx={{width: "13rem", padding: "1.5rem"}}
                            image={e.image}
                            alt="University Image"
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                            <CardContent
                                sx={{flex: '1 0 auto', display: "flex", flexDirection: "column", width: "100%"}}>
                                <Typography mb='.5rem' fontSize="1.25rem" fontWeight="600">
                                    {e.name_kz}
                                </Typography>
                                <Typography mb='.5rem' fontSize="1rem">
                                    {e.qualification_kz.substring(0, e.qualification_kz.search("»") + 1)}
                                </Typography>
                                <Box display='flex' mt='auto' width='100%'>
                                    <Typography fontSize="0.875rem" mr='auto'>
                                        {/*КБТУ*/}
                                    </Typography>
                                    <Typography fontSize="0.875rem" ml='auto' mr='1rem'>
                                        {humanReadableToLocalTime(e.protocol_en, "/")}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>

                ))}
            </Box>
        </Box>

    );
};