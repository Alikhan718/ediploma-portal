import React from 'react';
import {Box, Typography} from "@mui/material";

export const UniversityPageHeader: React.FC = (props) => {
    return (
        <React.Fragment>
            <Box width='90%' mb='2rem'>
                <Typography fontWeight='700' fontSize='2rem'>
                    Университеты
                </Typography>
            </Box>
        </React.Fragment>
    );
};
