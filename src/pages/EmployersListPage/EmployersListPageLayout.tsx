import React, {useState} from 'react';
import {
    Grid, useMediaQuery,
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import { routes } from "@src/shared/routes";
import {useSelector, useDispatch} from "react-redux";
import {fetchSearch} from "@src/store/diplomas/actionCreators";
import {FilterAttributes} from "@src/layout/Header/Header";
import {selectSearchText} from "@src/store/diplomas/selectors";

import { EmployerListPageHeader } from './components/EmployerListPageHeader';
import {EmployerPageListContent} from "@src/pages/EmployersListPage/components/EmployerPageListContent";
import {EmployerFilter} from "@src/layout/EmployerFilter/EmployerFilter";
import BottomSheet from "@src/components/BottomSheet/BottomSheet";

import styles from "./EmployersListPage.module.css";


export const EmployersListPageLayout: React.FC = () => {
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
        navigate(routes.employersList);
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
                    <EmployerListPageHeader/>
                </Grid>

                <Grid item xs={12} sm={2.7}>
                    {!isSmallerThanMd && (
                        <EmployerFilter
                            triggerSearchFilters={triggerSearchFilters}
                            filterAttributes={filterAttributes}
                            setFilterAttributes={setFilterAttributes}
                        />
                    )}
                </Grid>

                <Grid item xs={12} sm={isSmallerThanMd ? 12 : 9} md={12} lg={9.3} paddingLeft={{xl:'40px',lg:'30px', }}>
                    <EmployerPageListContent toggleBottomSheet={toggleBottomSheet} />
                </Grid>

                {isSmallerThanMd && (
                    <BottomSheet openBottomSheet={openBottomSheet} setOpenBottomSheet={setOpenBottomSheet}>
                        <EmployerFilter
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
}