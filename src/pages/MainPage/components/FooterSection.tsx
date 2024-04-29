import React from 'react';
import nuLogo from "@src/assets/icons/nu_logo.png";
import hubLogo from "@src/assets/icons/astanahub_logo.png";
import ritLogo from "@src/assets/icons/ritlogo.png";
import kbtuLogo from "@src/assets/icons/KBTU_logo.png";
import {Box, Typography} from "@mui/material";
import styles from "../MainPage.module.css";
import muitLogo from '@src/assets/icons/muitLogo.jpg';
import suLogo from '@src/assets/icons/suMainLogo.png';
import agpLogo from '@src/assets/icons/agpMainLogo.jpeg';

export const FooterSection: React.FC = () => {

    return (
        <Box
            className={styles.sliderMobile}
            justifyContent='space-between'
        >
            <img src={kbtuLogo} alt="KBTU Logo"/>
            <img src={ritLogo} alt="RIT Logo"/>
            <img src={hubLogo} alt="Astana Hub Logo"/>
            <img src={nuLogo} alt="Nazarbaev University Logo"/>
            <img src={suLogo} alt="SU Logo"/>
            <img src={agpLogo} alt="AGP Logo"/>
            <img src={muitLogo} alt="MUIT Logo"/>
        </Box>
    );
};
