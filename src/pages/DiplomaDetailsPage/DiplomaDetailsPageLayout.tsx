import React, {useState, useEffect} from 'react';
import {Alert, Box, Button, Card, CardMedia, Snackbar, Typography} from '@mui/material';
import {ReactComponent as CalendarIcon} from '@src/assets/icons/calendar.svg';
import {ReactComponent as FileCheckIcon} from '@src/assets/icons/Lesson.svg';
import {ReactComponent as CertificateIcon} from '@src/assets/icons/Cerificate.svg';
import {ReactComponent as DownloadIcon} from '@src/assets/icons/download.svg';
import {ReactComponent as ShareIcon} from '@src/assets/icons/share.svg';
import {ReactComponent as QRIcon} from '@src/assets/icons/qr-code.svg';
import exampleImage from "@src/assets/example/diplomaFullHD.jpg";
import {SwitchDetails} from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";
import QRCode from 'react-qr-code';
import {ethers} from 'ethers';
import {create, urlSource} from 'ipfs-http-client';
import * as http from "http";
import {Modal} from "@src/components";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {put} from "redux-saga/effects";
import {handleLink} from "@src/utils/link";
import {useDispatch, useSelector} from "react-redux";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import {useParams} from "react-router-dom";
import {humanReadableToLocalTime} from "@src/utils/functions";
import styles from "./DiplomaDetailsPage.module.css";

interface DiplomaData {
    name: string;
    description: string,
    image: string,
    degree: string;
    specialization: string;
    date: string;
    code: string;
    type: string;
}

export const DiplomaDetailsPageLayout: React.FC = (props) => {
        const {id} = useParams();
        const currentUrl = window.location.href;
        const [data, setData] = useState<any>();
        const [alertOpen, setAlertOpen] = useState(false);
        const [showQRCode, setShowQRCode] = useState(false);
        const dispatch = useDispatch();
        const handleQRCodeClose = () => {
            setShowQRCode(false);
        };
        const handleAlertClose = () => {
            setAlertOpen(false);
        };
        const handleQRCodeButtonClick = () => {
            setShowQRCode(true);
        };
        const diplomaList = useSelector(selectDiplomaList);

        React.useEffect(() => {
            dispatch(fetchDiplomas());
            setData(diplomaList.filter((diploma: any) => diploma.counter == id)[0]);
        }, [diplomaList]);
        return (
            <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 3rem' pt='3rem'>
                <Box className={styles.contentLeftContainer}>
                    <Card sx={{borderRadius: "1.4rem", background: "#CED4D3"}}>
                        <CardMedia
                            component="img"
                            sx={{padding: "1.4rem", borderRadius: "1.4rem"}}
                            image={data && data.image ? data.image : exampleImage}
                            alt="University Image"
                        >
                        </CardMedia>
                    </Card>
                    <Box className={styles.contentLeft}>
                        <Button defaultValue="download" startIcon={<DownloadIcon/>} variant='outlined'
                                onClick={() => {
                                    let link = data && data.image ? data.image : "";
                                    handleLink(link);
                                }}
                                sx={{borderColor: "#0A66C2", borderRadius: "18px"}}>
                            Скачать
                        </Button>
                        <Button startIcon={<ShareIcon/>} variant='outlined'
                                onClick={() => {
                                    navigator.clipboard.writeText(currentUrl);
                                    setAlertOpen(true);
                                }}
                                sx={{borderColor: "#0A66C2", borderRadius: "18px"}}>
                            Поделиться
                        </Button>
                        <Button startIcon={<QRIcon/>} variant='outlined'
                                onClick={handleQRCodeButtonClick}
                                sx={{borderColor: "#0A66C2", borderRadius: "18px"}}>
                            QR-код
                        </Button>
                    </Box>
                </Box>
                <Box className={styles.contentRightContainer}>
                    <Typography fontWeight='700' fontSize='1.4rem' className={styles.textMd}>
                        {data && data.name_kz ? data.name_kz : ''}
                    </Typography>
                    <Box>

                        <Box display='flex' mb='.5rem'>
                            <Typography className={styles.textSm} fontSize='1.4rem' mr='.5rem'>
                                Cтепень:
                            </Typography>
                            <Typography fontSize='1.4rem'
                                        className={styles.textSm}
                                        fontWeight='700'>{data && data.degree_ru ? data.degree_ru.replace("ПРИСУЖДЕНА СТЕПЕНЬ ", "").toLowerCase() : ""}</Typography>
                        </Box>

                        <Box display='flex' mb='.5rem'>
                            <Typography fontSize='1.4rem'
                                        className={styles.textSm} mr='.5rem'>Специальность:</Typography>
                            <Typography fontSize='1.4rem'
                                        className={styles.textSm}
                                        fontWeight='700'>{data && data.qualification_kz ? data.qualification_kz.substring(0, data.qualification_kz.search("»") + 1) : ""}</Typography>
                        </Box>

                        <Box display='flex' width='100%' gap='2rem' mb='.5rem' className={styles.infoContainer} >
                            <Box display='flex'>
                                <CalendarIcon className={styles.iconSm} style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                                <Typography className={styles.textSm} fontSize='1.4rem' mr='.5rem'
                                            color="#697B7A">{data && data.protocol_en ? humanReadableToLocalTime(data.protocol_en, ".") : "123"}</Typography>
                            </Box>
                            <Box display='flex'>
                                <FileCheckIcon className={styles.iconSm}
                                               style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                                <Typography className={styles.textSm} fontSize='1.4rem' mr='.5rem'
                                            color="#697B7A">{id}</Typography>
                            </Box>
                            <Box display='flex'>
                                <CertificateIcon className={styles.iconSm}
                                                 style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                                <Typography className={styles.textSm} fontSize='1.4rem' mr='.5rem'
                                            color="#697B7A">Оригинал</Typography>
                            </Box>
                        </Box>
                        <SwitchDetails/>
                    </Box>
                </Box>
                <Modal
                    open={showQRCode}
                    handleClose={handleQRCodeClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                        {showQRCode && (
                            <Box my="1rem" width="100%" display="flex" justifyContent="center">
                                <QRCode value={currentUrl}/>
                            </Box>
                        )}
                    </Box>
                </Modal>
                <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="success" sx={{width: '100%'}}>
                        Успешно скопировано!
                    </Alert>
                </Snackbar>
            </Box>

        );
    }
;