import React from 'react';
import {Box, Card, CardMedia, Typography} from "@mui/material";
import styles from "../UniversityPage.module.css";
import cn from "classnames";
export const UniversityPageHeader: React.FC = (props) => {
    return (
        <React.Fragment>
            <Box width='90%' mb='2rem' className={styles.mobMb1}>
                <Typography fontWeight='700' className={cn(styles.mobPl1, styles.mobTextL)} fontSize='2rem'>
                    Университеты
                </Typography>
            </Box>
        </React.Fragment>
    );
};
