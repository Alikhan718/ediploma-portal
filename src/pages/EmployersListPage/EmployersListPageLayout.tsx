import React from 'react';
import { Box, Grid, CardContent, CardMedia, Typography, Pagination, useMediaQuery, Button as MuiButton } from '@mui/material';
import exampleImage from "@src/assets/example/universityKBTU.jpg";
import { EmployerListPageHeader } from './components/EmployerListPageHeader';
import { useNavigate } from "react-router-dom";
import styles from "./EmployersListPage.module.css";
import { selectLanguage } from "@src/store/generals/selectors";
import { selectEmployersList, selectUserRole } from '@src/store/auth/selector';
import { fetchEmployersList, fetchEmployersSearch } from '@src/store/auth/actionCreators';
import { useSelector, useDispatch } from "react-redux";
import { localization } from '@src/pages/EmployersListPage/generator';
import exEmployer from "@src/assets/example/exEmployer.png";
import { fetchApply } from '@src/store/vacancy/actionCreators';
import { EmployerFilter } from '@src/layout/EmployerFilter/EmployerFilter';
import { routes } from "@src/shared/routes";
import {EmployerFilterAttributes} from "@src/layout/Header/Header";

export const EmployersListPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lang = useSelector(selectLanguage);
    const employersList = useSelector(selectEmployersList);
    const isMobile = useMediaQuery('(max-width:998px)');
    const role = useSelector(selectUserRole).toLowerCase();

    const [currentPage, setCurrentPage] = React.useState(1);
    const employersPerPage: number = 8;
    const totalPages = Math.ceil(employersList.length / employersPerPage);
    const startEmployerIndex = (currentPage - 1) * employersPerPage;
    const endEmployerIndex = currentPage * employersPerPage;
    const [listView, setListView] = React.useState(true);

    const displayedEmployersList = employersList.slice(startEmployerIndex, endEmployerIndex);
    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
    const [filterAttributes, setFilterAttributes] = React.useState<EmployerFilterAttributes>({field: '', text: ''});

    React.useEffect(() => {
        dispatch(fetchEmployersList());
    }, []);

    const handleApply = async (employer: any) => {
        if (role != 'student') return;

        dispatch(fetchApply({ employer: employer }));
        console.log('applied');
    };

    const triggerSearchFilters = (filterAttributesNew: any) => {
		dispatch(fetchEmployersSearch(filterAttributesNew));
		navigate(routes.employersList);
	};

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer}
            pt='2rem'>
            <EmployerListPageHeader listView={listView} setListView={setListView}/>
            <Box sx={{
                display: 'none',
                '@media (max-width: 778px)': {
                    display: 'flex', width: '100%', padding: '0.25rem',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '3rem', background: '#FFF', marginBottom: '1rem'
                },
            }}>
                <MuiButton fullWidth sx={{
                    backgroundColor: "#3B82F6", color: "white", borderRadius: '3rem',
                    '&:hover': { backgroundColor: "#1565C0", },
                }}>
                    Работадатели
                </MuiButton>
                <MuiButton
                    fullWidth
                    sx={{
                        backgroundColor: "#white", color: "#293357", borderRadius: '3rem',
                        '&:hover': { backgroundColor: "#f0f0f0", },
                    }}
                    onClick={() => navigate('/applications')}
                >
                    Мои отклики
                </MuiButton>
            </Box>
            <Box sx={{
                display: 'flex', gap: '1rem', justifyContent: 'space-between',
            }}>
                <Box sx={{'@media (max-width: 778px)': {display: 'none'}}}>
                    <EmployerFilter
                        triggerSearchFilters={triggerSearchFilters}
                        filterAttributes={filterAttributes}
                        setFilterAttributes={setFilterAttributes}
                        open={true}
                        setOpen={null}
                        toggleBottomSheet={null}
                    />
                </Box>
                <Grid container display="flex" rowSpacing={2} columnSpacing={1} flexWrap="wrap"
                    sx={{ margin: "0 !important" }}
                    justifyContent="start" className={styles.schoolContainer} width='80%'
                >
                    {employersList ? (displayedEmployersList.map((employer: any) => (
                        <Grid
                            key={employer.id} item xs={12} sm={'auto'} md={'auto'}
                            lg={listView ? 11.9 : 5.8}
                            // onClick={() => {
                            //     navigate(`/employer/${employer.id}`);
                            // }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // cursor: "pointer",
                                borderRadius: "1.25rem",
                                marginBottom: "1.5rem", backgroundColor: 'white',
                                marginRight: "0.5rem",
                                "@media (max-width: 778px)": {
                                    alignItems: 'flex-start',
                                    paddingX: ".5rem",
                                    paddingTop: ".5rem",
                                    gap: 'var(--pixel-rem-spacing-075-rem, 0.75rem)',
                                    // padding: '1rem',
                                    marginBottom: "0.75rem",
                                    borderRadius: "0.875rem",
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                className={styles.schoolImg}
                                sx={{
                                    display: 'none',
                                    width: "100%",
                                    height: "10rem",
                                    borderRadius: "10px",
                                    "@media (max-width: 778px)": {
                                        display: 'none',
                                    }
                                }}
                                image={employer.avatar ? `${baseURL}/${employer.avatar}` : exEmployer}
                                alt={employer.name ? `${employer.name}` : "employer image"}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                <CardContent sx={{ "@media (max-width: 778px)": { gap: 0, paddingX: '1rem', paddingY: 0 } }}>
                                    <Typography fontWeight="600" sx={{
                                        fontSize: '1.25rem',
                                        marginBottom: '0.3rem',
                                        cursor: 'pointer',
                                        "@media (max-width: 778px)": {
                                            fontSize: '0.75rem',
                                            marginBottom: '0.5rem',
                                            // marginBottom: '0.5rem',
                                        },
                                        "@media (max-width: 998px)": {
                                            fontSize: '1rem'
                                        },
                                    }}
                                    onClick={() => { window.open(`/employer/${employer.id}`, '_blank'); }}
                                    >
                                        {employer.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: 'none',
                                            "@media (max-width: 778px)": {
                                                display: 'block',
                                                color: 'var(--color-light-dark-600, #58607C)',
                                                fontSize: '0.875rem',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '125%',
                                                marginBottom: '0.5rem',
                                            },
                                        }}
                                    >
                                        {"Специальность"}
                                    </Typography>
                                    <Typography fontSize="1rem" color="#818181" className={styles.mobTextSm}
                                        sx={{
                                            marginBottom: '0.75rem',
                                            "@media (max-width: 778px)": {
                                                color: 'var(--color-light-dark-600, #58607C)',
                                                fontSize: '0.875rem',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '125%',
                                                marginBottom: '1rem',
                                            },
                                        }}
                                    >
                                        {employer.field ? employer.field : "Область"}
                                    </Typography>
                                    <MuiButton
                                        sx={{
                                            display: 'flex',
                                            borderRadius: "0.5rem", backgroundColor: "#3B82F6",
                                            color: "white", height: '2rem', padding: '1.25rem 1.25rem',
                                            marginBottom: '0.5rem',
                                            '&:hover': {
                                                backgroundColor: "#1565C0",
                                            },
                                            "@media (max-width: 778px)": {
                                                padding: '0.5rem 0.75rem',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                borderRadius: '0.5rem',
                                                marginBottom:0,
                                            },
                                        }}
                                        onClick={() => { employer && employer.id ? handleApply(employer.id) : console.log('123') }}>
                                        {localization[lang].Header.apply}
                                    </MuiButton>
                                </CardContent>
                            </Box>
                        </Grid>
                    ))) : null}
                </Grid>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginBottom: "2rem"
            }}>
                <Box style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        </Box>
    );
}