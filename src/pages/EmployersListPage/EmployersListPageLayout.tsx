import React from 'react';
import {Box, Grid, CardContent, CardMedia, Typography, Pagination, useMediaQuery} from '@mui/material';
import exampleImage from "@src/assets/example/universityKBTU.jpg";
import { EmployerListPageHeader } from './components/EmployerListPageHeader';
import {useNavigate} from "react-router-dom";
import styles from "./EmployersListPage.module.css";
import {selectLanguage} from "@src/store/generals/selectors";
import {selectEmployersList} from '@src/store/auth/selector';
import {fetchEmployersList} from '@src/store/auth/actionCreators';
import {useSelector, useDispatch} from "react-redux";
import {localization} from '@src/pages/EmployersListPage/generator';
import exEmployer from "@src/assets/example/exEmployer.png";

export const EmployersListPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lang = useSelector(selectLanguage);
    const employersList = useSelector(selectEmployersList);
    const isMobile = useMediaQuery('(max-width:998px)');
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const employersPerPage: number = 8;
    const totalPages = Math.ceil(employersList.length / employersPerPage);
    const startEmployerIndex = (currentPage - 1) * employersPerPage;
    const endEmployerIndex = currentPage * employersPerPage;

    const displayedEmployersList = employersList.slice(startEmployerIndex, endEmployerIndex);
    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

    React.useEffect(() => {
        dispatch(fetchEmployersList());
    }, []);

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer}
            pt='2rem'>
            <EmployerListPageHeader/>
            <Grid container display="flex" rowSpacing={2} columnSpacing={1} flexWrap="wrap" 
                sx={{margin: "0 !important"}}
                justifyContent="start" className={styles.schoolContainer} width='100%'
                
            >
                {employersList ? (displayedEmployersList.map((employer: any) => (
                    <Grid
                        key={employer.id} item xs={12} sm={2.9} md={2.9}
                        lg={2.9}
                        onClick={() => {
                            navigate(`/employer/${employer.id}`);
                        }}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: "pointer",
                            borderRadius: "1.25rem",
                            marginBottom: "1.5rem", backgroundColor: 'white',
                            paddingTop: ".5rem !important",
                            paddingX: ".5rem !important",
                            marginRight: "0.5rem",
                        }}
                    >
                        <CardMedia
                            component="img"
                            className={styles.schoolImg}
                            sx={{
                                width: "100%",
                                height: "10rem",
                                borderRadius: "10px",
                            }}
                            image={employer.avatar ? `${baseURL}/${employer.avatar}` : exEmployer}
                            alt={employer.name ? `${employer.name}` : "employer image"}
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                            <CardContent sx={{flex: '0 0 auto'}}>
                                <Typography mb='.5rem' fontSize="1.3rem" fontWeight="600" sx={{
                                    "@media (max-width: 778px)": {
                                        fontSize: '0.75rem'
                                    },
                                    "@media (max-width: 998px)": {
                                        fontSize: '1rem'
                                    },
                                }}>
                                    {employer.name}
                                </Typography>
                                <Typography fontSize="1rem" mt="0" color="#818181" className={styles.mobTextSm}>
                                    {employer.field ? employer.field : ""}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Grid> 
                ))): null}
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
        </Box>
    );
}