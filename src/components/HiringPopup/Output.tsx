import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { CircularProgress } from '@mui/material';

interface OutputProps{
    response:string;
    loading:any;
    setGotResponse:any;
    setHaveDescription:any;
    haveSearch: any;
    isStudent: any;
    setJobDescription:any;
}

export const Output: React.FC<OutputProps> = (props) => {
    const {response, loading, setGotResponse, setHaveDescription, haveSearch, isStudent, setJobDescription } = props;
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = (): void => {
        const textToCopy = response.split('\n').join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

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
                
                {isStudent ?
                (<h1 className={styles.popupHeading}>Ваш план</h1>):
                (<h1 className={styles.popupHeading}>Описание работы</h1>)}
                
                <div className={styles.outputContainer} >
                    {isStudent ? null :
                    (<div className={styles.outputButtonsContainer}>
                        <button
                            className={styles.outputButton}
                            type="button"
                            onClick={(): void => {setHaveDescription(true);}}
                        >Поиск
                        </button>
                        <button
                            className={styles.outputButton}
                            type="button"
                            onClick={handleCopy}
                        >{isCopied ? 'Скопировано' : 'Копировать'}
                        </button>
                    </div>)}
                    <p>{response.split('\n').map((paragraph, index) => (
                    <span key={index}>
                        {paragraph}
                        {index < response.split('\n').length - 1 && <br />}
                    </span>
                        ))}
                    </p>
                </div>
                <div className={styles.buttonContainer}>
                <button 
                    type="button" 
                    onClick={(): void => {setGotResponse(false);}} 
                    className={styles.continueButton}
                >Назад
                </button>
                {haveSearch ? 
                (<button
                    type="button"
                    onClick={(): void => {setHaveDescription(true); setJobDescription('');}}
                    className={styles.continueButton}
                >Поиск
                </button>):
                null}
            </div>
                </div>
                )}
        </div>
    );
};