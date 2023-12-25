import React, { useRef, useState, FormEvent } from 'react';
import { Box, Typography, Grid, CardMedia, Card, Skeleton, IconButton } from '@mui/material';
import { Button, Modal, Input, Label } from "@src/components"
import styles from "./MyDiplomasPage.module.css";
import { localization } from './generator';
import noDiplomas from "@src/assets/dashboard/noDiplomas.png"
import diplomaTemplate from "@src/assets/example/diplomaFullHD.jpg";
import { ReactComponent as PlusIcon } from "@src/assets/dashboard/plus.svg";
import { ReactComponent as ShareIcon } from '@src/assets/icons/share.svg';
import { ReactComponent as DownloadIcon } from '@src/assets/icons/download.svg';
import { selectLanguage } from "@src/store/generals/selectors";
import { useSelector } from "react-redux";

export const MyDiplomasPageLayout: React.FC = () => {
    const boxRef = useRef(null);
    const currentUrl = window.location.href;
    const form = useRef<HTMLFormElement>(null);

    const lang = useSelector(selectLanguage);

    const [diplomas, setDiplomas] = useState([
        {id: 1, name: 'Diploma 1'},
        {id: 2, name: 'Diploma 2'},
        {id: 3, name: 'Diploma 3'},
        {id: 4, name: 'Diploma 4'},
        {id: 5, name: 'Diploma 5'},
    ]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isPreviewOpen, setPreviewOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [generatePressed, setGeneratePressed] = useState(false);

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handlePreviewOpen = () => {
        setPreviewOpen(true);
    };

    const handlePreviewClose = () => {
        setPreviewOpen(false);
    };

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        console.log('send form')
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
            <Box 
                className={styles.mainContainer} 
                sx={{
                    backgroundColor: "white",
                    borderRadius: "2rem",
                    width: '95.5%',
                    margin: '1rem',
                    height: '70vh',
                    overflowY: 'auto',
                }}
                ref={boxRef}
            >
                <Box 
                    display='flex' alignItems='center' justifyContent='space-between' 
                    sx={{fontSize: '1.2rem', fontWeight: '600', margin: '1rem'}}
                >
                    {!generatePressed ? localization[lang].title : localization[lang].form.title}
                    <Button 
                        variant="contained" 
                        sx={{ borderRadius: '2rem' }}
                        onClick={() => setGeneratePressed(!generatePressed)}
                    >
                        {generatePressed ? localization[lang].form.back : localization[lang].noDiplomas.generateDiplomas}
                        {!generatePressed && <PlusIcon className={styles.btnIcon}/>}
                    </Button>
                </Box>
                {generatePressed ? (
                    <form ref={form} onSubmit={sendEmail}>
                        <Box marginLeft='1rem' display="flex" width="60%" flexDirection="column" justifyContent="space-between">
                            <Box mb="1rem">
                                <Label label={localization[lang].form.name} className={styles.mobTextSm} />
                                <Input
                                    type="text"
                                    name="from_name"
                                    placeholder={localization[lang].form.namePlaceholder}
                                    required
                                    inputProps={{ pattern: "^[A-Za-zА-Яа-я\\s]+$" }}
                                />
                            </Box>
                            <Box mb="1rem" display='flex' alignItems='center' justifyContent='space-between'>
                                <Box width='49%'>
                                    <Label label={localization[lang].form.specialty} className={styles.mobTextSm} />
                                    <Input
                                        type="text"
                                        name="from_specialty"
                                        placeholder={localization[lang].form.specialtyPlaceholder}
                                        required
                                    />
                                </Box>
                                <Box width='49%'>
                                    <Label label={localization[lang].form.degree} className={styles.mobTextSm} />
                                    <Input
                                        type="text"
                                        name="from_degree"
                                        placeholder={localization[lang].form.degreePlaceholder}
                                        required
                                    />
                                </Box>
                            </Box>
                            <Box mb="1rem" display='flex' alignItems='center' justifyContent='space-between'>
                                <Box width='49%'>
                                    <Label label={localization[lang].form.iin} className={styles.mobTextSm} />
                                    <Input
                                        type="iin"
                                        name="from_iin"
                                        placeholder={localization[lang].form.iinPlaceholder}
                                        required
                                    />
                                </Box>
                                <Box width='49%'>
                                    <Label label={localization[lang].form.phoneNumber} className={styles.mobTextSm} />
                                    <Input
                                        type="phoneNumber"
                                        name="from_phone_number"
                                        placeholder="+7 (XXX) XXX XX XX"
                                        required
                                    />
                                </Box>
                            </Box>
                            <Box mb="1rem" display='flex' alignItems='center' justifyContent='space-between'>
                                <Box width='49%'>
                                    <Label label={localization[lang].form.email} className={styles.mobTextSm} />
                                    <Input
                                        type="email"
                                        name="from_email"
                                        placeholder="example@jasaim.kz"
                                        required
                                    />
                                </Box>
                                <Box width='24%'>
                                    <Label label="GPA" className={styles.mobTextSm} />
                                    <Input
                                        type="gpa"
                                        name="from_gpa"
                                        placeholder="3.0"
                                        required
                                    />
                                </Box>
                                <Box width='24%'>
                                    <Label label={localization[lang].form.gender} className={styles.mobTextSm} />
                                    <Input
                                        type="text"
                                        name="from_gender"
                                        placeholder={localization[lang].form.genderPlaceholder}
                                        required
                                    />
                                </Box>
                            </Box>
                            <Box mb="1rem">
                                <Label label={localization[lang].form.residence} className={styles.mobTextSm} />
                                <Input
                                    type="text"
                                    name="from_residence"
                                    placeholder={localization[lang].form.residencePlaceholder}
                                    required
                                />
                            </Box>
                            <Box textAlign='right'>
                                <Button sx={{width: '30%'}} variant="contained" borderRadius="3rem" type="submit">
                                    {localization[lang].form.continue}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                ):(
                    !diplomas || !diplomas.length ? (
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
                            <img
                                src={noDiplomas}
                                alt="Centered Image"
                            />
                            <Typography variant="h5" style={{ fontWeight: 'bolder', color: '#3B82F6' }}>
                                {localization[lang].noDiplomas.dontHave}
                            </Typography>
                            <Typography variant="h5" style={{ fontSize: '1rem', color: '#818181' }}>
                                {localization[lang].noDiplomas.toAdd}
                            </Typography>
                        </Box>
                    ):(
                        <Grid container display="flex" rowSpacing={2} columnSpacing={1} flexWrap="wrap"
                            sx={{
                                margin: "0 !important"
                            }}
                            justifyContent="space-between"
                            className={styles.diplomasContainer} width="100%"
                        >
                            {diplomas.map((e: any) => (
                                <Grid key={e.id} item xs={12} sm={5.9} md={3.9} lg={2.9}
                                    onClick={() => console.log('click')}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column', alignItems: 'center',
                                        cursor: "pointer",
                                        padding: ".5rem .5rem 0 .5rem !important",
                                        backgroundColor: "white",
                                        borderRadius: "1.25rem",
                                        marginBottom: "1.5rem"
                                    }}
                                >
                                    <Box width="30vh" sx={{
                                            backgroundColor: "rgba(7,117,255,0.11)",
                                            borderRadius: "1rem",
                                            padding: ".7rem",
                                            marginTop: "1rem",
                                            '@media (max-width: 778px)': {
                                                width: '100%'
                                            },
                                        }}
                                    >
                                        <Card
                                            elevation={0}
                                            sx={{
                                                display: 'flex',
                                                width: "100%", flexDirection: 'column', alignItems: 'center',
                                                cursor: "pointer",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                className={styles.diplomaImg}
                                                sx={{
                                                    width: "100%",
                                                    position: "relative",
                                                    display: imageLoaded ? "block" : "none"
                                                }}
                                                image={diplomaTemplate}
                                                alt="University Image"
                                                onLoad={handleImageLoad}
                                                onClick={handlePreviewOpen}
                                            />
                                            <Skeleton variant="rectangular" width={300} height={200}
                                                sx={{display: imageLoaded ? "none" : "block"}}
                                                animation="wave"
                                            />
                                            <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    width: "100%",
                                                    marginTop: "-3rem",
                                                    justifyContent: "space-between",
                                                    padding: "0 .5rem .5rem .5rem",
                                                    zIndex: "10"
                                                }}
                                            >
                                                <IconButton
                                                    color="primary"
                                                    sx={{
                                                        backgroundColor: "rgba(59,130,246,0.78)",
                                                        '&:hover': {
                                                        backgroundColor: "rgb(59,130,246)",
                                                        color: "white"
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(currentUrl);                                                    setAlertOpen(true);
                                                    }}
                                                >
                                                    <ShareIcon style={{width: "20", filter: "brightness(10)"}}/>
                                                </IconButton>
                                                <IconButton
                                                    color="primary"
                                                    sx={{
                                                        backgroundColor: "rgba(59,130,246,0.78)",
                                                        '&:hover': {
                                                        backgroundColor: "rgb(59,130,246)",
                                                            color: "white"
                                                        }
                                                    }}
                                                    onClick={() => {
                                                    console.log('click')  
                                                    }}
                                                >
                                                <DownloadIcon style={{width: "20", filter: "brightness(10)"}}/>
                                                </IconButton>
                                            </Box>
                                        </Card>
                                        <Modal
                                            open={isPreviewOpen}
                                            handleClose={handlePreviewClose}
                                            width="100vh"
                                            maxWidth="100vh"
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    height: "100%",
                                                    position: "relative"
                                                }}
                                                image={diplomaTemplate}
                                                alt="University Image"
                                            />
                                        </Modal>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )
                )}
            </Box>
        </Box>
    );
};