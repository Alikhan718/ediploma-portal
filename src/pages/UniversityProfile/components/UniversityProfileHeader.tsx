import React from 'react';
import {Box, Card, CardMedia, Typography} from "@mui/material";
import exampleImage from "@src/assets/example/universityKBTU.jpg";
import exampleIcon from "@src/assets/icons/Logo (2).svg";
import styles from "../UniversityProfile.module.css";

export interface UniversityHeaderProps {
    image?: string | null;
}

export const UniversityProfileHeader: React.FC<UniversityHeaderProps> = (props) => {
    const {image} = props;
    return (
        <>
            <Box display='flex' sx={{
                position: "relative",
                width: '100%',
                height: '100%',
                '@media (max-width: 768px)': {height: '200%'}
            }} mb="1rem">
                <Box sx={{
                    backgroundColor: '#E8EBF1',
                    backgroundImage: image ? `url(${image})` : ``,
                    borderRadius: '20px'
                }}
                     className={styles.headerImg}>
                </Box>
            </Box>
        </>
    );
};

