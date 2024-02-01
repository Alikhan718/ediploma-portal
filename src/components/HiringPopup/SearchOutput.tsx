import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { StudentCard } from './StudentCard';
import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/components/HiringPopup/Generator';
import { selectDiplomaList } from '@src/store/diplomas/selectors';
import { fetchDiplomas } from '@src/store/diplomas/actionCreators';

interface SearchOutputProps{
    response:any;
    loading:any;
    setGotResponse:any;
}

export const SearchOutput: React.FC<SearchOutputProps> = (props) => {
    const {response, loading, setGotResponse} = props;
    const lang = useSelector(selectLanguage);
    const diplomaList = useSelector(selectDiplomaList);
    const dispatch = useDispatch();
    const [matchedStudents, setMatchedStudents] = React.useState<any[]>([]);
    const addedStudentIds = new Set<number>();
    const [alertOpen, setAlertOpen] = React.useState(false);

    const handleAlertClose = () => {
		setAlertOpen(false);
	};
    
    React.useEffect(() => {
        dispatch(fetchDiplomas());
    },[]);

    React.useEffect(() => {
        if (!response){return;}
        
        const newMatchedStudents: any[] = [];

        response.forEach((student: { name: any; }) => {
            const matchedDiplomaStudent = diplomaList.find((diplomaStudent: { name_ru: any; }) => diplomaStudent.name_ru === student.name);
            if (matchedDiplomaStudent && !addedStudentIds.has(matchedDiplomaStudent.id)) {
                newMatchedStudents.push(matchedDiplomaStudent);
                addedStudentIds.add(matchedDiplomaStudent.id);
            }
        });

        console.log(matchedStudents);
        setMatchedStudents(newMatchedStudents);
    },[diplomaList, response]);

    return(
        <div>
            {loading ? 
                (<div>
                    <h1 className={styles.popupHeading}>{localization[lang].Output.seconds}</h1>
                    <div className={styles.loadingContainer}>
                        <CircularProgress/>
                    </div>
                </div>):
                (<div>
                    <h1 className={styles.popupHeading}>{localization[lang].Output.suitableCandidates}</h1>
                    <div className={styles.searchOutputContainer}>
                        { matchedStudents && matchedStudents.map((student: any) => (
                                <div key={student.id}>
                                    <Box sx={{ marginTop: '20px', }}></Box>
                                    <StudentCard student={student} setAlertOpen={setAlertOpen} />
                                    <Box sx={{ marginBottom: '20px', }}></Box>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.buttonContainer}>
                        <button 
                            type="button" 
                            onClick={(): void => {setGotResponse(false);}} 
                            className={styles.continueButton}
                        >{localization[lang].Output.Buttons.back}
                        </button>
                    </div>
                </div>)}
                <Snackbar 
                    open={alertOpen} autoHideDuration={2000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    onClose={handleAlertClose}>
                    <Alert 
                        onClose={handleAlertClose} 
                        severity="error"
                        sx={{ width: '100%' }}>
                            Просмотр данного диплома вам не доступен!
                    </Alert>
			    </Snackbar>
        </div>
        
    );
};