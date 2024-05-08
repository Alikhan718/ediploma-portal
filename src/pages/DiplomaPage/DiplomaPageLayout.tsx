import React, {useEffect, useState, useRef} from 'react';
import {
    Grid, useMediaQuery,
} from '@mui/material';
import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSearchText,selectDiplomaList} from "@src/store/diplomas/selectors";
import {fetchDiplomas,fetchSearch,} from "@src/store/diplomas/actionCreators";
import {FilterAttributes} from "@src/layout/Header/Header";

import {DiplomaPageHeader} from "@src/pages/DiplomaPage/components/DiplomaPageHeader";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import DiplomaPageContent from "@src/pages/DiplomaPage/components/DiplomaPageContent";
import BottomSheet from "@src/components/BottomSheet/BottomSheet";

import styles from "./DiplomaPage.module.css";

export const DiplomaPageLayout: React.FC = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);
    const isSmallerThanMd = useMediaQuery('(max-width:1200px)');

    const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
        text: searchText,
        specialities: '',
        region: '',
        university_id: 0,
        rating: 0,
        gpa: 0,
    });

    const triggerSearchFilters = (filterAttributesNew: any) => {
        dispatch(fetchSearch(filterAttributesNew));
        navigate(routes.hrBank);
        console.log(filterAttributesNew)
    };

    // For ModalSheet (Mobile, Tablet)
    const [openBottomSheet, setOpenBottomSheet] = useState(false);
    const toggleBottomSheet = () => {
        setOpenBottomSheet(!openBottomSheet);
    };

    return (
        <>
            <Grid container className={styles.mainContainer}>
                <Grid item xs={12}>
                    <DiplomaPageHeader />
                </Grid>

                <Grid item xs={12} sm={2.7}>
                    {!isSmallerThanMd && (
                        <FilterSection
                            triggerSearchFilters={triggerSearchFilters}
                            filterAttributes={filterAttributes}
                            setFilterAttributes={setFilterAttributes}
                        />
                    )}
                </Grid>

                <Grid item xs={12} sm={isSmallerThanMd ? 12 : 9} md={12} lg={9.3} paddingLeft={{xl:'40px',lg:'30px', }}>
                    <DiplomaPageContent toggleBottomSheet={toggleBottomSheet} />
                </Grid>

                {isSmallerThanMd && (
                    <BottomSheet openBottomSheet={openBottomSheet} setOpenBottomSheet={setOpenBottomSheet}>
                        <FilterSection
                            triggerSearchFilters={triggerSearchFilters}
                            filterAttributes={filterAttributes}
                            setFilterAttributes={setFilterAttributes}
                            toggleBottomSheet={toggleBottomSheet}
                        />
                    </BottomSheet>
                )}
            </Grid>
        </>
    );
};