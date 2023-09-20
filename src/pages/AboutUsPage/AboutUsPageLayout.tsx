import React from 'react';

import {Box, Divider, Typography} from '@mui/material';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';

import {Button, Input} from '@src/components';
import {FooterSection} from "@src/pages/AboutUsPage/components/FooterSection";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import styles from "./AboutUsPage.module.css";
import {fetchSearch} from "@src/store/diplomas/actionCreators";
import ReactGA from "react-ga";

export const AboutUsPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterAttributes, setFilterAttributes] = React.useState({
        text: '',
        specialities: '',
        region: '',
        year: 0,
        gpaL: 0,
        gpaR: 0,
    });
    const [searchQuery, setSearchQuery] = React.useState('');

    const triggerSearchFilters = () => {
        dispatch(fetchSearch(filterAttributes));
        navigate(routes.diploma);
    };

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (filterAttributes.text.trim().length > 1) {
                triggerSearchFilters();
            }
        }, 2000);

        return () => clearTimeout(delayDebounceFn);
    }, [filterAttributes]);

    React.useEffect(() => {
        ReactGA.initialize('G-H12GFWB4FY');
        ReactGA.event({
            category: 'User',
            action: 'Search',
            label: "searchText",
        });
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <Box>
            <Box justifyContent="center" display="flex" mb="5rem">
            </Box>
        </Box>
    );
};
