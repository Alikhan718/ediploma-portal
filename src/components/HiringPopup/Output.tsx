import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { CircularProgress } from '@mui/material';
import { useSelector } from "react-redux";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from './generator';

interface OutputProps{
    response:string;
    loading:any;
    setGotResponse:any;
    setHaveDescription:any;
    haveSearch: any;
    isStudent: any;
    setJobDescription:any;
    sessionId: any;
    setResponse: any;
}

export const Output: React.FC<OutputProps> = (props) => {
    const lang = useSelector(selectLanguage);
    const {response, loading, setGotResponse, setHaveDescription, haveSearch, isStudent, setJobDescription, sessionId, setResponse } = props;
    const [isCopied, setIsCopied] = React.useState(false);
    const urlRegex:RegExp = /(https?:\/\/[^\s\)]+)/g;

    const handleCopy = (): void => {
        const textToCopy = response.split('\n').join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

    React.useEffect(()=>{
        let endpoint:string = '';

        if(isStudent){
            endpoint = `https://agile-job-student.onrender.com/student-action-plan/stream-text?sessionId=${sessionId}`;
        }
        else{
            endpoint = `https://agile-job-desc-denerator.onrender.com/stream-text?sessionId=${sessionId}`;
        }

        const eventSource = new EventSource(endpoint);

        eventSource.addEventListener('newEntry', e=> {
            setResponse((prevResponse:string) => prevResponse + e.data);
        });

        eventSource.addEventListener('close', () => {
            eventSource.close();
        });

        return (() => {
            eventSource.close();
        });

    }, [sessionId]);

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
                
                {isStudent ?
                (<h1 className={styles.popupHeading}>{localization[lang].Output.yourPlan}</h1>):
                (<h1 className={styles.popupHeading}>{localization[lang].Output.jobDescription}</h1>)}
                
                <div className={styles.outputContainer} >
                    {isStudent ? null :
                    (<div className={styles.outputButtonsContainer}>
                        <button
                            className={styles.outputButton}
                            type="button"
                            onClick={(): void => {setHaveDescription(true);}}
                        >{localization[lang].Output.Buttons.search}
                        </button>
                        <button
                            className={styles.outputButton}
                            type="button"
                            onClick={handleCopy}
                        >{isCopied ? localization[lang].Output.Buttons.copied : localization[lang].Output.Buttons.copy }
                        </button>
                    </div>)}
                    <p>{response.split('<br>').map((paragraph, index) => (
                        <span key={index}>
                            {paragraph.split(urlRegex).map((part, idx) => {
                                if (urlRegex.test(part)) {
                                    return (
                                        <a key={idx} href={part} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                            {part}
                                        </a>
                                    );
                                }
                                return (
                                    <span key={index}>
                                    {part}
                                    </span>
                                );
                            })}
                            {index < response.split('<br>').length - 1 && <br />}
                        </span>
                        ))}
                    </p>
                </div>
                <div className={styles.buttonContainer}>
                <button 
                    type="button" 
                    onClick={(): void => {setGotResponse(false);}} 
                    className={styles.continueButton}
                >{localization[lang].Output.Buttons.back}
                </button>
                {haveSearch ? 
                (<button
                    type="button"
                    onClick={(): void => {setHaveDescription(true); setJobDescription('');}}
                    className={styles.continueButton}
                >{localization[lang].Output.Buttons.search}
                </button>):
                null}
            </div>
                </div>
                )}
        </div>
    );
};