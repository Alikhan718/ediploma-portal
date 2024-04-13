import React, {useEffect, useState} from 'react';
import {
    Box,IconButton, Grid, Typography, Pagination, useMediaQuery, Alert, Snackbar
} from '@mui/material';
import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {useNavigate} from "react-router-dom";
import {fetchDiplomas,fetchSearch,} from "@src/store/diplomas/actionCreators";
import {selectSearchText,selectDiplomaList} from "@src/store/diplomas/selectors";
import {useDispatch, useSelector} from "react-redux";
import { selectUserRole, selectUserState } from "@src/store/auth/selector";
import styles from "./DiplomaPage.module.css";
import {Button, Modal,Input} from "@src/components";
import {isAuthenticated} from "@src/utils/userAuth";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import {localization, unis, uniRatings} from "src/pages/DiplomaPage/generator";
import {selectLanguage} from "@src/store/generals/selectors";
import {routes} from "@src/shared/routes";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import DiplomaCard from "@src/pages/DiplomaPage/components/DiplomaCard";
import {ReactComponent as SearchIcon} from '@src/assets/icons/search.svg';
import {ReactComponent as ListIcon} from '@src/assets/icons/list.svg';
import {ReactComponent as WidgetIcon} from '@src/assets/icons/widget.svg';

import ReactGA from 'react-ga';
import {FilterAttributes} from "@src/layout/Header/Header";

export const DiplomaPageLayout: React.FC = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showFilter, setShowFilter] = React.useState(false);

    const [showPopup, setShowPopup] = React.useState(false);


    const diplomaList = useSelector(selectDiplomaList);

    const searchText = useSelector(selectSearchText);

    const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
        text: searchText,
        specialities: '',
        region: '',
        degree: '',
        year: 0,
        gpa: 0,
        university_id: 0,
        rating: 0,
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const diplomasPerPage: number = 15;
    const totalPages = Math.ceil(diplomaList.length / diplomasPerPage);

    const [searchQuery, setSearchQuery] = React.useState('');
    useEffect(() => {
        dispatch(fetchDiplomas(searchQuery));
    }, [currentPage,searchQuery]);

    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    const lang = useSelector(selectLanguage);

    const isMobile = useMediaQuery('(max-width:998px)');
    const isSmallScreen = useMediaQuery('(max-width:1280px)');
    const isMediumScreen = useMediaQuery('(min-width: 768px) and (max-width: 1280px)');
    const isSmallerThanMd = useMediaQuery('(max-width:1380px)');


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
	}, [userState]);

    const startDiplomaIndex = (currentPage - 1) * diplomasPerPage;
    const endDiplomaIndex = currentPage * diplomasPerPage;
    const displayedDiplomas = diplomaList.slice(startDiplomaIndex, endDiplomaIndex);



    const triggerSearchFilters = (filterAttributesNew: any) => {
        dispatch(fetchSearch(filterAttributesNew));
        debugger
        navigate(routes.hrBank);
    };

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

            <Grid container spacing={5}>
                {/* Filter Section */}
                {!isSmallerThanMd && (
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ width: '100%', backgroundColor:'white', padding:'.75rem 1rem', }} className={styles.diplomasContainer}>
                            <FilterSection
                                triggerSearchFilters={triggerSearchFilters}
                                filterAttributes={filterAttributes}
                                setFilterAttributes={setFilterAttributes}
                                open={showFilter}
                                setOpen={setShowFilter}
                            />
                        </Box>
                    </Grid>
                )}

                {/* Content */}
                <Grid item xs={12} sm={isSmallerThanMd ? 12 : 9}>
                    {/* SearchBar */}
                    <Box display='flex' justifyContent='space-between' >
                        <Box
                            sx={{
                                position: 'relative',
                                paddingBottom: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                flexGrow: '1',

                            }}
                        >
                            <Input
                                placeholder="Название организации"
                                inputSize="s"
                                sx={{  backgroundColor: 'white', flex: '1', padding: "4px 4px 4px 16px", }}
                                onChange={(e) => {
                                    const query = e.target.value;
                                    setFilterAttributes({...filterAttributes, text: query});
                                    setSearchQuery(query);
                                }}
                            />
                            <Button
                                onClick={() => {
                                    triggerSearchFilters(filterAttributes);
                                    ReactGA.event({
                                        category: 'User',
                                        action: 'Search',
                                        label: searchQuery,
                                    });
                                }}
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
                    {/* Cards */}
                    <Grid container rowGap={3} columnGap={3}  direction="row" marginBottom='25px'
                          justifyContent="space-between">
                        {/* Карточки */}
                        {diplomaList && displayedDiplomas.map((e: any) => (
                            <Grid key={e.id} item xs={12} sm={12} md={5.8} lg={3.77} className={styles.diplomasContainer} sx={{backgroundColor:'white',cursor: 'pointer',}}>
                                <DiplomaCard
                                    diploma={e}
                                    lang={lang}
                                    handleCardClick={() => handleCardClick(e.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {/* Pagination */}
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
                </Grid>

            </Grid>


        </Box>
    );
};

