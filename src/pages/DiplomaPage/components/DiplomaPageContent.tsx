import React, {useEffect, useState} from 'react';
import {
    Box, IconButton, Grid, Typography, Pagination, useMediaQuery, Alert, Snackbar,
} from '@mui/material';
import {Button, Input, Modal} from "@src/components";
import {routes} from "@src/shared/routes";
import {localization} from "@src/pages/DiplomaPage/generator";
import ReactGA from "react-ga";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLanguage} from "@src/store/generals/selectors";
import {selectDiplomaList, selectSearchText} from "@src/store/diplomas/selectors";
import {fetchDiplomas, fetchSearch} from "@src/store/diplomas/actionCreators";
import {isAuthenticated} from "@src/utils/userAuth";
import {selectUserRole, selectUserState} from "@src/store/auth/selector";
import {FilterAttributes} from "@src/layout/Header/Header";

import DiplomaCard from "@src/pages/DiplomaPage/components/DiplomaCard";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import {ReactComponent as SearchIcon} from '@src/assets/icons/search.svg';
import {ReactComponent as ListIcon} from '@src/assets/icons/list.svg';
import {ReactComponent as WidgetIcon} from '@src/assets/icons/widget.svg';
import { ReactComponent as FilterIcon } from '@src/assets/icons/Tuning 2.svg';

import styles from "@src/pages/DiplomaPage/DiplomaPage.module.css";

interface DiplomaPageContentProps {
    toggleBottomSheet: () => void;
}

const DiplomaPageContent: React.FC<DiplomaPageContentProps> = ({ toggleBottomSheet }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const diplomaList = useSelector(selectDiplomaList);

    const searchText = useSelector(selectSearchText);

    const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
        text: searchText,
        specialities: '',
        region: '',
        university_id: 0,
        rating: 0,
        gpa: 0,
    });

    const isTablet  = useMediaQuery('(max-width:998px)');
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isSmallerThanMd = useMediaQuery('(max-width:1200px)');

    const [alertOpen, setAlertOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    let diplomasPerPage: number;

    if (isMobile) {
        diplomasPerPage = 6;
    } else if (isTablet) {
        diplomasPerPage = 12;
    } else if (isSmallerThanMd) {
        diplomasPerPage = 15;
    } else {
        diplomasPerPage = 15;
    }

    const totalPages = Math.ceil(diplomaList.length / diplomasPerPage);

    const [searchQuery, setSearchQuery] = React.useState('');
    useEffect(() => {
        dispatch(fetchDiplomas(searchQuery));
    }, [currentPage,searchQuery]);

    const lang = useSelector(selectLanguage);


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
        navigate(routes.hrBank);
    };


    const [isWidgetActive, setIsWidgetActive] = useState(true);

    const handleListClick = () => {
        setIsWidgetActive(false);
    };

    const handleWidgetClick = () => {
        setIsWidgetActive(true);
    };

    const lgValue = isWidgetActive ? 3.75 : 12; // Меняю значение для Grid

    return (
        <>
            <Grid >
                {/* SearchBar */}
                <Box display='flex' justifyContent='space-between' alignItems='baseline' marginBottom={{xl:'32px',lg:'30px',md:'24px',sm:'24px',xs:'20px',}}>
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'baseline',
                            flexGrow: '1',
                        }}
                    >
                        <Input
                            placeholder={localization[lang].Header.searchBar}
                            inputSize="s"
                            sx={{backgroundColor: 'white', flex: '1', padding: "4px 4px 4px 16px",}}
                            onChange={(e) => {
                                const query = e.target.value;
                                setFilterAttributes({...filterAttributes, text: query});
                                setSearchQuery(query);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    triggerSearchFilters(filterAttributes);
                                    ReactGA.event({
                                        category: 'User',
                                        action: 'Search',
                                        label: searchQuery,
                                    });
                                }
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
                            buttonSize='m'
                            sx={{
                                position: 'absolute',
                                right: '5px',
                                top: '7.5px',
                                padding: '.5rem 1rem ',
                                fontSize: '1rem',
                                fontWeight: '500',
                                borderRadius: '2.5rem',
                            }}
                            endIcon={!isMobile && <SearchIcon/>}
                        >
                            {localization[lang].Header.searchButton}
                        </Button>
                    </Box>

                    <Box>
                        {!isSmallerThanMd ? (
                            <Box>
                                <IconButton
                                    onClick={handleListClick}
                                    sx={{
                                        padding: '14px',
                                        backgroundColor: isWidgetActive ? 'white' : '#3B82F6',
                                        fill: isWidgetActive ? '#A1A1A1' : 'white',
                                        borderRadius: '24px',
                                        margin: '0px 20px 0px 40px',
                                    }}
                                >
                                    <ListIcon />
                                </IconButton>
                                <IconButton
                                    onClick={handleWidgetClick}
                                    sx={{
                                        padding: '14px',
                                        backgroundColor: isWidgetActive ? '#3B82F6' : 'white',
                                        fill: isWidgetActive ? 'white' : '#A1A1A1',
                                        borderRadius: '24px',
                                    }}
                                >
                                    <WidgetIcon/>
                                </IconButton>
                            </Box>
                        ) : (
                            <Box display="flex" width="100%" flexWrap="wrap" flexDirection="row"
                                 paddingLeft="1.25rem"
                                 alignItems="center">
                                <Button
                                    onClick={toggleBottomSheet}
                                    variant="contained"
                                    buttonSize='m'
                                    sx={{
                                        borderRadius: '48px',
                                        padding: isMobile ? '0' : '1rem',
                                        color: '#293357',
                                        backgroundColor: 'white',
                                        gap: '8px',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        }
                                    }}
                                >
                                    <FilterIcon/>
                                    {!isMobile && localization[lang].Header.filter}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Grid>

            {/* Cards */}
            <Grid container  direction="row" marginBottom={{xs: '20px', sm:'24px', md:'24px', lg: '20px', xl: '32px',}}
                  justifyContent="space-between" gap={{xl: '25px',lg: '20px',md: '24px',sm: '24px',xs: '0.75rem',}}>
                {/* Карточки */}
                {diplomaList && displayedDiplomas.map((e: any) => (
                    <Grid key={e.id} item xs={12} sm={5.71} md={5.8} lg={lgValue}
                          className={styles.diplomasContainer}
                          sx={{backgroundColor: 'white', cursor: 'pointer',}}>
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
                <Box style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom: isTablet ? '4rem' : '0',}}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        shape="rounded"
                        color="primary"
                        size={isTablet ? "medium" : "large"}
                    />
                </Box>
            </Box>
            <Snackbar
                open={alertOpen} autoHideDuration={2000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                onClose={handleAlertClose}>
                <Alert
                    onClose={handleAlertClose}
                    severity="error"
                    sx={{width: '100%'}}>
                    Просмотр данного диплома вам не доступен!
                </Alert>
            </Snackbar>

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
        </>
    );
};

export default DiplomaPageContent;