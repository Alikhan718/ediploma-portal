import React from 'react';
import {Box, Typography, useMediaQuery, Grid} from "@mui/material";
import {localization} from "src/pages/DiplomaPage/generator";
import {Button, HiringPopUp,} from '@src/components';
import {useSelector} from "react-redux";
import {ReactComponent as BotIcon} from '@src/assets/icons/AIBot.svg';
import {selectLanguage} from "@src/store/generals/selectors";

import styles from "../DiplomaPage.module.css";
export const DiplomaPageHeader: React.FC = (props) => {
    const lang = useSelector(selectLanguage);
    const [showPopup, setShowPopup] = React.useState(false);
    const isTablet  = useMediaQuery('(max-width:998px)');


    return (
        <>
            <Box width="100%" >
                <Box display="flex" flexDirection="row"
                     justifyContent="space-between" alignItems="baseline"
                         margin={{
                             xs: '48px 0 20px',
                             sm:'48px 0 24px',
                             md:'24px 0',
                             lg: '36px 0 30px',
                             xl: '40px 0 32px',
                     }}

                >
                    <Typography fontWeight='700' fontSize={{
                        xs: '1.375rem',
                        sm:'2rem',
                        lg: '2.5rem',
                        xl: '3rem',
                    }}>
                        HR Bank
                    </Typography>
                    {!isTablet && (
                        <Button
                            className={styles.popupButton}
                            buttonSize="m"
                            variant="contained"
                            sx={{
                                paddingX: '1.25rem',
                                borderRadius: '48px',
                                fontSize: "1rem"
                            }}
                            type="button"
                            onClick={() => {
                                setShowPopup(true);
                            }}
                            startIcon={<BotIcon style={{ filter: 'brightness(250%) contrast(101%)' }} />}
                        >
                            {localization[lang].Header.aiHiring}
                        </Button>
                    )}
                </Box>
            </Box>
            {showPopup && (
                <Box display="flex" flexDirection="column" className={styles.diplomasContainer}>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <Box display="flex" width="100%" flexWrap="wrap" flexDirection="row" gap="1rem" alignItems="center">
                                <Box display="flex" gap="1rem" ml="auto" alignContent="flex-end">
                                    {/* <img src={secuniv}/>
                        <img src={univ}/> */}
                                </Box>
                            </Box>
                        </Box>
                    {showPopup ? <HiringPopUp setShowPopup={setShowPopup}/> : null}
                </Box>
            )}
        </>
    );
};
