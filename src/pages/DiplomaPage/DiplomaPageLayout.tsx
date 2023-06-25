import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as StarIcon} from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/diploma.jpg";
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";
import {Modal} from "@src/components";
import {ReactComponent as NeedAuthorizationPic } from "@src/assets/example/requireAuthorizationPic.svg";

export const DiplomaPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
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
                    <Typography textAlign='center' id="modal-modal-title" fontSize='1rem' fontWeight='600' variant="h6" component="h2">
                        Для открытия этой опции требуется авторизация
                    </Typography>
                    <Button variant='contained' sx={{marginTop: "1rem", padding: "1rem", width: "80%", fontSize: "1rem", fontWeight: "600", borderRadius: "2rem"}} onClick={() => {navigate(routes.login)}}>Войти</Button>
                </Box>
            </Modal>
            <DiplomaPageHeader/>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => (
                <Card key={e} elevation={6}
                      onClick={() => {
                          if (isAuthenticated()) {
                              navigate(routes.diplomaDetails)
                          } else {
                              handleOpen();
                          }

                      }}
                      sx={{
                          display: 'flex',
                          width: "45%",
                          cursor: "pointer",
                          borderRadius: "10px",
                          marginBottom: "1.5rem"
                      }}>
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