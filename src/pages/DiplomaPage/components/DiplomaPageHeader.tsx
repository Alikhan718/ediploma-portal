import React from 'react';
import {Box, Typography, useMediaQuery,} from "@mui/material";
import styles from "../DiplomaPage.module.css";
import {localization} from "src/pages/DiplomaPage/generator";
import {Button, HiringPopUp, Input, Modal} from '@src/components';
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as BotIcon} from '@src/assets/icons/AIBot.svg';
import {selectLanguage} from "@src/store/generals/selectors";


export const DiplomaPageHeader: React.FC = (props) => {
    const lang = useSelector(selectLanguage);
    const dispatch = useDispatch();

    const [showPopup, setShowPopup] = React.useState(false);
    const isTablet  = useMediaQuery('(max-width:998px)');


    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <React.Fragment>
            <Box width="100%" >
                <Box display="flex"
                     flexDirection="row"
                     justifyContent="space-between"
                alignItems="baseline">
                    <Typography fontWeight='700' fontSize='2.5rem'>
                        HR Bank
                    </Typography>
                    {!isTablet && (
                        <Button
                            className={styles.popupButton}
                            buttonSize="m"
                            variant="contained"
                            sx={{
                                paddingY: '1.25rem',
                                borderRadius: '48px',
                                gap: '8px',
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
        </React.Fragment>
    );
};
