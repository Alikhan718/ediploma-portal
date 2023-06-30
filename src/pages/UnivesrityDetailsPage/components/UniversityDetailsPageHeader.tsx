import React from 'react';
import {Box, Card, CardMedia, Typography} from "@mui/material";
import exampleImage from "@src/assets/example/kbtu_back.jpg";
import exampleIcon from "@src/assets/example/kbtu_min.jpg";
import styles from "../UniversityDetailsPage.module.css";

export const UniversityDetailsPageHeader: React.FC = (props) => {
    return (
        <React.Fragment>
            <Box display='flex' sx={{position: "relative"}} width={'100%'} mb='3rem'>
                <img src={exampleImage}
                     className={styles.headerImg}
                     alt=""/>
                <Card elevation={6} className={styles.cardImgContainer}>
                    <CardMedia
                        component="img"
                        className={styles.cardImg}
                        image={exampleIcon}
                        alt="University Image"
                    />
                </Card>
            </Box>

        </React.Fragment>
    );
};
