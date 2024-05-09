import React, {useEffect, useState} from 'react';
import {
    Box,
    Grid,
    Pagination,
    useMediaQuery,
    IconButton,
} from '@mui/material';
import {Button, Input} from "@src/components"
import {useNavigate} from "react-router-dom";
import {selectLanguage} from "@src/store/generals/selectors";
import {selectEmployersList, selectUserRole, selectUserState} from '@src/store/auth/selector';
import {useSelector, useDispatch} from "react-redux";
import {localization} from '@src/pages/EmployersListPage/generator';
import { routes } from "@src/shared/routes";
import ReactGA from "react-ga";
import EmployerCard from "@src/pages/EmployersListPage/components/EmployerCard";
import {EmployerFilterAttributes} from "@src/layout/Header/Header";
import { fetchEmployersSearch,fetchEmployersList } from '@src/store/auth/actionCreators';
import {isAuthenticated} from "@src/utils/userAuth";

import {ReactComponent as SearchIcon} from '@src/assets/icons/search.svg';
import {ReactComponent as ListIcon} from '@src/assets/icons/list.svg';
import {ReactComponent as WidgetIcon} from '@src/assets/icons/widget.svg';
import {ReactComponent as FilterIcon } from '@src/assets/icons/Tuning 2.svg';

import styles from "../EmployersListPage.module.css";

interface EmployerPageListContentProps {
    toggleBottomSheet: () => void;
}

export const EmployerPageListContent: React.FC<EmployerPageListContentProps> = ({ toggleBottomSheet }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector(selectUserRole);
    const userState = useSelector(selectUserState);
    const [data, setData] = useState<any>()

    const lang = useSelector(selectLanguage);
    const employersList = useSelector(selectEmployersList);
    const isTablet  = useMediaQuery('(max-width:998px)');
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isSmallerThanMd = useMediaQuery('(max-width:1200px)');

    useEffect(() => {
        setData(userState);
    }, [userState]);

    let employerPerPage: number;

    if (isMobile) {
        employerPerPage = 4;
    } else if (isTablet) {
        employerPerPage = 10;
    } else if (isSmallerThanMd) {
        employerPerPage = 10;
    } else {
        employerPerPage = 10;
    }

    const totalPages = Math.ceil(employersList.length / employerPerPage);

    React.useEffect(() => {
        dispatch(fetchEmployersList());
    }, []);


    const [currentPage, setCurrentPage] = React.useState(1);

    const startEmployerIndexIndex = (currentPage - 1) * employerPerPage;
    const endEmployerIndexIndex = currentPage * employerPerPage;

    const displayedEmployersList = employersList.slice(startEmployerIndexIndex, endEmployerIndexIndex);



    const [isWidgetActive, setIsWidgetActive] = useState(true);

    const handleListClick = () => {
        setIsWidgetActive(false);
    };

    const handleWidgetClick = () => {
        setIsWidgetActive(true);
    };

    const lgValue = isWidgetActive ? 5.82 : 12; // Меняю значение для Grid


    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterAttributes, setFilterAttributes] = React.useState<EmployerFilterAttributes>({field: '', text: ''});

    const triggerSearchFilters = (filterAttributesNew: any) => {
        dispatch(fetchEmployersSearch(filterAttributesNew));
        navigate(routes.employersList);
    };
    const [alertOpen, setAlertOpen] = useState(false);
    const [open, setOpen] = React.useState(false);


    const handleCardClick = (counter: number) => {
        if (role === 'Student' && counter != data.id) {
            setAlertOpen(true);
            return;
        }
        isAuthenticated() ? navigate(`/diploma/${counter}/1`) : setOpen(true);
    };

    const [selectedButton, setSelectedButton] = useState<'Employer' | 'MyApplications'>('Employer');
    const handleButtonClick = (buttonName: 'Employer' | 'MyApplications') => {
        setSelectedButton(buttonName);
    };

    return (
        <>
            <Grid>
                {role === 'Student' && isSmallerThanMd && (
                    <Box mb="1rem" display="flex" flexDirection="row" p=".175rem .25rem" style={{ backgroundColor: "white", borderRadius: "3rem" }}>
                        <Button
                            fullWidth={true}
                            color={selectedButton === 'Employer' ? "primary" : 'secondary'}
                            className={styles.textMd}
                            variant="contained"
                            borderRadius="2.5rem"
                            onClick={() => handleButtonClick('Employer')}
                        >
                            Работодатели
                        </Button>
                        <Button
                            fullWidth={true}
                            color={selectedButton === 'MyApplications' ? "primary" : 'secondary'}
                            variant="contained"
                            className={styles.textMd}
                            sx={{ '@media (max-width: 1000px)': { paddingX: '2rem !important' } }}
                            borderRadius="2.5rem"
                            onClick={() => handleButtonClick('MyApplications')}
                        >
                            Мои отклики
                        </Button>
                    </Box>
                )}


                {/* SearchBar */}
                <Box display='flex' justifyContent='space-between' marginBottom={{xl:'32px',lg:'30px',md:'24px',sm:'24px',xs:'20px',}}>
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
                                    sx={{
                                        borderRadius: '48px',
                                        paddingX: isMobile ? '0' : '1rem',
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
                {employersList && displayedEmployersList.map((e: any) => (
                    <Grid key={e.id} item xs={12} sm={5.71} md={5.8} lg={lgValue}
                          sx={{ backgroundColor: 'white', cursor: 'pointer' }}
                          onClick={() => { navigate(`/employer/${e.id}`); }}
                          className={styles.employerContainer}>
                        <EmployerCard
                            employer={e}
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
        </>

    );
}