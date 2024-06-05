import React from 'react';
import {Box, Grid, CardContent, CardMedia, Typography} from '@mui/material';
import exampleImage from "@src/assets/example/universityKBTU.jpg";
import {UniversityPageHeader} from "@src/pages/UnivesrityPage/components/UniversityPageHeader";
import {useNavigate} from "react-router-dom";
import styles from "./UniversityPage.module.css";
import {selectLanguage} from "@src/store/generals/selectors";
import {selectUniversitiesList} from '@src/store/auth/selector';
import {fetchUniversitiesList} from '@src/store/auth/actionCreators';
import {useSelector, useDispatch} from "react-redux";
import {localization, universityNames, universityGraduatesCount, universityCity} from '@src/pages/UnivesrityPage/generator';


export const UniversityPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lang = useSelector(selectLanguage);
    const universitiesList = useSelector(selectUniversitiesList);
    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

    React.useEffect(() => {
        dispatch(fetchUniversitiesList());
        console.log(universitiesList);
    }, []);

    const excludedIds: string[] = ['4767', '4768', '4770', '19054'];

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer}
             pt='2rem'>
            <UniversityPageHeader/>
            <Grid container display="flex" rowSpacing={1} columnSpacing={1} flexWrap="wrap"
                  justifyContent="space-between"
                  className={styles.universitiesContainer} width='100%'>
                {universitiesList.filter((university: any): boolean => !excludedIds.includes(university.id)).map((university: any) => (
                    <Grid
                        key={university.id} item xs={12} sm={5.9} md={5.9}
                        lg={5.9}
                        onClick={() => {
                            navigate(`/university/${university.id}`);
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

                        }}
                    >
                        <CardMedia
                            component="img"
                            className={styles.universityImg}
                            sx={{
                                width: "100%",
                                height: '15rem',
                                borderRadius: "10px",
                                '@media (max-width: 778px)': {
                                    height: '10rem'
                                }
                            }}
                            image={university.banner ? `${baseURL}/${university.banner}` : exampleImage}
                            alt={university.name ? `${university.name}` : "University image"}
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
                                    {
                                        university && 
                                        university.name && 
                                        universityNames[university.name as keyof typeof universityNames] ? 
                                            universityNames[university.name as keyof typeof universityNames][lang] : 
                                            university.name ? university.name : ''
                                    }
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography mt="0.2rem" fontSize="1rem" fontWeight="600" color={"#818181"}>
                                        {localization[lang].UniCards.majors}: {universityGraduatesCount[university.university_id as keyof typeof universityGraduatesCount]}
                                    </Typography>
                                    <Typography mt="0.2rem" fontSize="1rem" fontWeight="600" color={"#818181"} textAlign='right'>
                                        {localization[lang].UniCards.city}: {university && university.university_id && universityCity[university.university_id as keyof typeof universityCity] ? universityCity[university.university_id as keyof typeof universityCity][lang]: ''}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
