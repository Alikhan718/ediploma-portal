import React from 'react';
import {Box, Typography, useMediaQuery,} from "@mui/material";
import {ReactComponent as Filter} from '@src/assets/icons/Tuning 2.svg';
import styles from "../DiplomaPage.module.css";
import cn from "classnames";
import {localization} from "src/pages/DiplomaPage/generator";
import {FilterSection,} from "@src/layout/Filter/FilterSection";
import {Button, HiringPopUp, Input, Modal} from '@src/components';
import {fetchSearch} from "@src/store/diplomas/actionCreators";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSearchText} from "@src/store/diplomas/selectors";
import {FilterAttributes} from "@src/layout/Header/Header";
import {ReactComponent as HiringIcon} from '@src/assets/icons/refresh.svg';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search.svg';
import {selectLanguage} from "@src/store/generals/selectors";

import ReactGA from 'react-ga';
import {routes} from "@src/shared/routes";

export const DiplomaPageHeader: React.FC = (props) => {
    const lang = useSelector(selectLanguage);
    const dispatch = useDispatch();

    const [showFilter, setShowFilter] = React.useState(false);

    const [showPopup, setShowPopup] = React.useState(false);

    const navigate = useNavigate();
    const searchText = useSelector(selectSearchText);
    const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
        text: searchText,
        specialities: '',
        region: '',
        degree: '',
        year: 0,
        gpaL: 0,
        gpaR: 0,
        university_id: 0,
        ratingL: 0,
        ratingR: 0,
    });


    // const triggerSearchFilters = (filterAttributes: any) => {
    // 	console.log(filterAttributes);
    // 	dispatch(fetchSearch(filterAttributes));
    // };
    const triggerSearchFilters = (filterAttributesNew: any) => {
        dispatch(fetchSearch(filterAttributesNew));
        navigate(routes.hrBank);
    };

    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <React.Fragment>
            <Box width="100%" mb="2rem" className={styles.mobMb1}>

                <Box display="flex"
                     flexDirection="column"
                     alignItems="start"
                     className={styles.diplomasContainer}>
                    <Typography fontWeight='700' mb="1rem" className={cn(styles.mobPl1, styles.mobTextL)}
                                fontSize='2.5rem'>
                        HR Bank
                    </Typography>
                </Box>
                <Box display="flex"
                     flexDirection="column"
                     className={styles.diplomasContainer}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                    }}>
                        <Box display="flex" width="100%" flexWrap="wrap" flexDirection="row" gap="1rem"
                             alignItems="center">
                            <Button
                                onClick={() => {
                                    setShowFilter(true);
                                }}
                                variant="outlined"
                                sx={{borderRadius: '48px', paddingX: "3rem", color: '#3B82F6',}}
                                startIcon={<Filter/>}
                            >
                                {localization[lang].Header.filter}
                            </Button>
                            <Box display="flex" gap="1rem" ml="auto" alignContent="flex-end">
                                {/* <img src={secuniv}/>
                                <img src={univ}/> */}
                            </Box>
                            <Box display="flex">

                                <Input
                                    placeholder={localization[lang].Header.searchBar}
                                    fullWidth
                                    inputSize="m"
                                    autoFocus
                                    sx={{
                                        paddingRight: 0,
                                    }}
                                    endAdornment={
                                        <Button
                                            onClick={() => {
                                                triggerSearchFilters(filterAttributes);
                                                ReactGA.event({
                                                    category: 'User',
                                                    action: 'Search',
                                                    label: searchQuery,
                                                });
                                            }}
                                            buttonSize="m"
                                            variant="contained"
                                            sx={{
                                                padding: '16px 32px',
                                                borderRadius: '48px',
                                                margin: '4px'
                                            }}
                                        >
                                            {localization[lang].Header.searchButton}
                                            <SearchIcon style={{
                                                filter: 'brightness(250)',
                                                width: '82px',
                                                marginLeft: '12px'
                                            }}/>
                                        </Button>
                                    }
                                    onChange={(e) => {
                                        const query = e.target.value;
                                        setFilterAttributes({...filterAttributes, text: query});
                                        setSearchQuery(query);
                                    }}
                                />
                            </Box>


                            <Button
                                className={styles.popupButton}
                                buttonSize="m"
                                variant="contained"
                                sx={{
                                    paddingY: '1.8rem',
                                    borderRadius: '48px',
                                    margin: '4px',
                                    fontSize: "1.2rem"
                                }}
                                type="button"
                                onClick={() => {
                                    setShowPopup(true);
                                }}
                                endIcon={<HiringIcon style={{
                                    filter: 'brightness(250%) contrast(101%)',
                                }}/>}
                            >
                                {localization[lang].Header.aiHiring}
                            </Button>

                        </Box>

                    </Box>

                </Box>
                {showPopup ? (<HiringPopUp setShowPopup={setShowPopup}/>) : (<div></div>)}
            </Box>
            <FilterSection
                triggerSearchFilters={triggerSearchFilters}
                filterAttributes={filterAttributes}
                setFilterAttributes={setFilterAttributes}
                open={showFilter}
                setOpen={setShowFilter}
            />
        </React.Fragment>
    );
};
