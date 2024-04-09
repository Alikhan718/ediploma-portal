import React, {useEffect, useState} from 'react';
import {
    Box, Accordion, AccordionSummary, AccordionDetails,Autocomplete, TextField,IconButton, MenuItem, Slider, InputLabel, FormControl, Select, SelectChangeEvent, Grid, Typography, Pagination, useMediaQuery,useTheme, Alert, Snackbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {useNavigate} from "react-router-dom";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import { selectUserRole, selectUserState } from "@src/store/auth/selector";
import styles from "./DiplomaPage.module.css";
import diplomaTemplate from "@src/assets/example/diploma_template.svg";
import {Button, Modal,Input} from "@src/components";
import {isAuthenticated} from "@src/utils/userAuth";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import {localization, unis, uniRatings} from "src/pages/DiplomaPage/generator";
import {selectLanguage} from "@src/store/generals/selectors";
import {routes} from "@src/shared/routes";
import { RatingDisplay } from '@src/components/RatingDisplay/RatingDisplay';
import {FilterSection} from "@src/layout/Filter/FilterSection";
import DiplomaCard from "@src/pages/DiplomaPage/components/DiplomaCard";
import {ReactComponent as SearchIcon} from '@src/assets/icons/search.svg';
import {ReactComponent as ListIcon} from '@src/assets/icons/list.svg';
import {ReactComponent as WidgetIcon} from '@src/assets/icons/widget.svg';


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

    const isMobile = useMediaQuery('(max-width:998px)');
    const isSmallScreen = useMediaQuery('(max-width:1280px)');
    const isMediumScreen = useMediaQuery('(min-width: 768px) and (max-width: 1280px)');

    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertClose = () => {
		setAlertOpen(false);
	};

    const handleCardClick = (counter: number) => {
        if (role === 'Student' && counter != data.id) {
            setAlertOpen(true);
            return;
        }

        isAuthenticated() ? navigate(`/diploma/${counter}/1`) : setOpen(true);
    };

    const diplomasPerPage: number = 15;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(diplomaList.length / diplomasPerPage);


    const [open, setOpen] = React.useState(false);
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

    const role = useSelector(selectUserRole);
	const userState = useSelector(selectUserState);
	const [data, setData] = useState<any>();

	useEffect(() => {
		setData(userState);
		console.log(userState);
	}, [userState]);

    const startDiplomaIndex = (currentPage - 1) * diplomasPerPage;
    const endDiplomaIndex = currentPage * diplomasPerPage;
    const displayedDiplomas = diplomaList.slice(startDiplomaIndex, endDiplomaIndex);
    useEffect(() => {
        dispatch(fetchDiplomas());
    }, [currentPage]);




    return (
        <Box display="flex" justifyContent="center" className={styles.mainContainer} pt="2.5rem">
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

            <Grid container sx={{ height: '100%', alignItems: isSmallScreen ? 'stretch' : 'flex-start' }}>
                {/* Фильтр */}
                {!isSmallScreen && (
                    <Grid item xs={12} md={3} sx={{ backgroundColor:'white', padding:'.75rem 1rem', }} className={styles.diplomasContainer}>
                        <FilterSection
                        open={false}
                        setOpen={() => {}}
                        filterAttributes={{}}
                        setFilterAttributes={() => {}}
                        triggerSearchFilters={() => {}}
                        />
                    </Grid>
                )}

                {/* Контент с карточками */}
                <Grid item xs={12} md={isSmallScreen ? 12 : 9} >
                    <Box display='flex' justifyContent='space-between' >
                        <Box
                            sx={{
                                position: 'relative',
                                paddingBottom: '2rem',
                                marginLeft: isSmallScreen ? '0px' : '30px',
                                ...(isSmallScreen ? {} : { marginLeft: '40px' }),
                                display: 'flex',
                                alignItems: 'center',
                                flexGrow: '1',

                            }}
                        >
                            <Input
                                placeholder="Название организации"
                                inputSize="s"
                                sx={{  backgroundColor: 'white', flex: '1', padding: "4px 4px 4px 16px", }}
                            />
                            <Button
                                variant='contained'
                                sx={{
                                    position: 'absolute',
                                    right: '5px',
                                    top: '3px',
                                    padding: '.5rem 1rem ',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    borderRadius: '2.5rem',
                                }}
                                endIcon={<SearchIcon />}
                            >
                                {localization[lang].Header.searchButton}
                            </Button>
                        </Box>

                        <Box>
                            <IconButton  sx={{padding: '14px', backgroundColor:"white", borderRadius:'24px',margin: "0px 20px 0px 40px",
                            }}>
                                <ListIcon />
                            </IconButton>
                            <IconButton  sx={{padding: '14px', backgroundColor:"#3B82F6", borderRadius:'24px',}}>
                                <WidgetIcon />
                            </IconButton>
                        </Box>
                    </Box>



                    <Box sx={{ ...(isSmallScreen ? {} : { marginLeft: '40px' }) }}>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            className={styles.diplomasContainer}
                        >
                            {diplomaList ? (
                                displayedDiplomas.map((e: any) => (
                                    <Box
                                        key={e.id}
                                        sx={{
                                            width: isSmallScreen ? '100%' : isMediumScreen ? 'calc(50% - 15px)' : 'calc(33.33% - 15px)',
                                            marginBottom: '25px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            padding: '.5rem',
                                            backgroundColor: 'white',
                                            borderRadius: '1rem',
                                        }}
                                        onClick={() => handleCardClick(e.id)}
                                    >
                                        <DiplomaCard diploma={e} lang={lang} handleCardClick={handleCardClick} />
                                    </Box>
                                ))
                            ) : (
                                <div>Loading...</div>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginBottom: "2rem"
            }}>
                <Box style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        shape="rounded"
                        color="primary"
                        size={isMobile ? "medium" : "large"}
                    />
                </Box>
            </Box>
            <Snackbar
                open={alertOpen} autoHideDuration={2000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleAlertClose}>
                <Alert
                    onClose={handleAlertClose}
                    severity="error"
                    sx={{ width: '100%' }}>
                    Просмотр данного диплома вам не доступен!
                </Alert>
            </Snackbar>
        </Box>





    );
};

