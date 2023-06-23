import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";

export const DiplomaDetailsPageHeader: React.FC = (props) => {
    return (
        <React.Fragment>
            <Box width='90%' mb='2rem'>
                <Typography fontWeight='700' fontSize='2rem'>
                    Дипломы
                </Typography>
            </Box>
        </React.Fragment>
    );
};
