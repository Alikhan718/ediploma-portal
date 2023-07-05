import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import styles from "../DiplomaPage.module.css";
import cn from "classnames";
export const DiplomaPageHeader: React.FC = (props) => {
    return (
        <React.Fragment>
            <Box width='90%' mb='2rem' className={styles.mobMb1}>
                <Typography fontWeight='700' className={cn(styles.mobPl1, styles.mobTextL)} fontSize='2rem'>
                    Дипломы
                </Typography>
            </Box>
        </React.Fragment>
    );
};
