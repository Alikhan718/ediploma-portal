import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { StudentCard } from './StudentCard';
import { Box, CircularProgress } from '@mui/material';

interface SearchOutputProps{
    response:any;
    loading:any;
    setGotResponse:any;
}

export const SearchOutput: React.FC<SearchOutputProps> = (props) => {
    const {response, loading, setGotResponse} = props;

    return(
        <div>
            {loading ? 
                (<div>
                    <h1 className={styles.popupHeading}>Секундочку...</h1>
                    <div className={styles.loadingContainer}>
                        <CircularProgress/>
                    </div>
                </div>):
                (<div>
                    <h1 className={styles.popupHeading}>Подходящие кандидаты</h1>
                    <div className={styles.searchOutputContainer}>
                        {response.map((student: any) => (
                            <div key={student.id}>
                                <Box sx={{ marginTop: '20px', }}></Box>
                                <StudentCard student={student} />
                                <Box sx={{ marginBottom: '20px', }}></Box>
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button 
                            type="button" 
                            onClick={(): void => {setGotResponse(false);}} 
                            className={styles.continueButton}
                        >Назад
                        </button>
                    </div>
                </div>)}
        </div>
    );
};