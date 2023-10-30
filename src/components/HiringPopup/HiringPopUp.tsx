import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { TextGenerator } from './TextGenerator';
import { CareerPlanGenerator } from './CareerPlanGenerator';
import { StudentOrRecruiter } from '@src/components';
import Alert from '@mui/material/Alert';
import { useSelector } from "react-redux";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from './generator';

interface HiringPopUpProps {
	setShowPopup:any;
};

export const HiringPopUp: React.FC<HiringPopUpProps>= (props) => {
    const lang = useSelector(selectLanguage);
    const {setShowPopup} = props;
    const [isStudent, setIsStudent] = React.useState(true);
    const [isClicked, setIsClicked] = React.useState(true);
    const [isDataAlert, setIsDataAlert] = React.useState(false);
    const [alertText, setAlertText] = React.useState(localization[lang].Alert.addData);

    const showAlert = (alertText:string):void => {
        setAlertText(alertText);
        setIsDataAlert(true);
    };

    return (
        <>
        <div className={styles.popupContainer}>
        
            <div className={styles.popupBody}>
                <button type="button" onClick={(): void => {setShowPopup(false);}} className={styles.closePopupButton} data-modal-hide="medium-modal">
                    <svg className={styles.closeIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className={styles.srOnly}>Close modal</span>
                </button>
                {isClicked? 
                    (<StudentOrRecruiter setIsStudent={setIsStudent} setIsClicked={setIsClicked}/>):
                    (
                        <div>
                            {isStudent ? (<CareerPlanGenerator setIsClicked={setIsClicked} setIsDataAlert={setIsDataAlert} showAlert={showAlert}/>):(<TextGenerator setIsClicked={setIsClicked} setIsDataAlert={setIsDataAlert} showAlert={showAlert}/>)}
                        </div>
                    )
                }
                {isDataAlert ? (<Alert sx={{borderRadius:'10rem'}}severity="warning">{alertText}</Alert>):(<></>)}
            </div>
        </div>
        </>
    );
};