import React from 'react';
import {Box, Typography, useMediaQuery} from "@mui/material";
import styles from "../DiplomaPage.module.css";
import cn from "classnames";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import {Input} from '@src/components';
import {fetchSearch} from "@src/store/diplomas/actionCreators";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSearchText} from "@src/store/diplomas/selectors";
import {FilterAttributes} from "@src/layout/Header/Header";
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {ReactComponent as FilterIcon} from '@src/assets/icons/Filter-icon.svg';
import ReactGA from 'react-ga';

export const DiplomaPageHeader: React.FC = (props) => {
    const dispatch = useDispatch();
    const matchesSm = useMediaQuery('(max-width:768px)');

    const [showFilter, setShowFilter] = React.useState(false);

    const navigate = useNavigate();
    const searchText = useSelector(selectSearchText);
    const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
        text: searchText,
        specialities: '',
        region: '',
        year: 0,
        gpaL: 0,
        gpaR: 0,
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterAttributes({...filterAttributes, text: e.target.value.trim()});
        if (e.target.value.trim().length >= 2) {
            triggerSearchFilters();
            // Track search input change with the search query
            ReactGA.event({
                category: 'User',
                action: 'Search Input Change',
                label: e.target.value.trim(),
            });
        }
    };

    const triggerSearchFilters = () => {
        dispatch(fetchSearch(filterAttributes));
    };

    return (
        <React.Fragment>
            <Box width="90%" mb="2rem" className={styles.mobMb1}>
                <Typography fontWeight="700" className={cn(styles.mobPx1, styles.mobMb1, styles.mobTextL)}
                            fontSize="2rem">
                    Дипломы
                </Typography>
                {matchesSm && (
                    <Input
                        placeholder="Найти по ФИО"
                        inputSize="s"
                        value={filterAttributes.text}
                        sx={{mx: '.8rem', backgroundColor: 'white'}}
                        onChange={handleSearch}
                        startAdornment={<SearchIcon/>}
                        endAdornment={
                            <FilterIcon
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    setShowFilter(!showFilter);
                                }}
                            />
                        }
                    />
                )}
                <FilterSection
                    triggerSearchFilters={triggerSearchFilters}
                    filterAttributes={filterAttributes}
                    setFilterAttributes={setFilterAttributes}
                    open={showFilter}
                    setOpen={setShowFilter}
                />
            </Box>
        </React.Fragment>
    );
};
