import React from 'react';
import { Input } from '@src/components';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { Output } from './Output';
import { useSelector } from "react-redux";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/components/HiringPopup/Generator';

interface JobDescriptionGeneratorProps {
    setHaveDescription:any;
    setIsClicked:any;
    setJobDescription:any;
    setIsDataAlert: any;
    showAlert:any;
};

export const JobDescriptionGenerator: React.FC<JobDescriptionGeneratorProps> = (props) => {
    const lang = useSelector(selectLanguage);
    const {setHaveDescription, setIsClicked, setJobDescription, setIsDataAlert, showAlert} = props;
    const [selectedRadio, setSelectedRadio] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [isTask, setIsTask] = React.useState(true);
    const [gotResponse, setGotResponse] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [haveSearch, setHaveSearch] = React.useState(true);
    const [sessionId, setSessionId] = React.useState('');

    const handleOnChange = (event: any): void => {
        setSelectedRadio(event.target.value);
    };

    const handleTextareaInput = (e: any): void => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleButtonSubmit = (): void => {
        handleSubmit();
    };

    const handleSubmit = async (): Promise<void> => {
        if((document.getElementById("chat") as HTMLInputElement).value === ''){
            showAlert(localization[lang].Alert.writeTask)
            return;
        }

        setIsDataAlert(false);
        setGotResponse(true);
        setLoading(true);
        setResponse('');

        const textAreaValue: string = (document.getElementById("chat") as HTMLInputElement).value;
        console.log(textAreaValue);

        try {
            const response = await fetch('https://agile-job-desc-denerator.onrender.com/generate-from-task',{
                method: "POST",
                body: JSON.stringify({prompt: textAreaValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            setSessionId(responseData.sessionId);
            setLoading(false);
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    };

    return(
        <div>
            {gotResponse ? 
            (<Output response={response} loading={loading} setGotResponse={setGotResponse} setHaveDescription={setHaveDescription} haveSearch={haveSearch} isStudent={false} setJobDescription={setJobDescription} sessionId={sessionId} setResponse={setResponse}/>):
            (<div>

            
            <h1 className={styles.popupHeading}>{localization[lang].JobDescription.title}</h1>
            <p className={styles.popupSmallHeading}>{localization[lang].JobDescription.wantGenerate}</p>
            <div className={styles.radioButtons}>
                <div className={styles.radioButtonContainer}>
                    <input 
                        checked={selectedRadio === '1'}
                        onChange={handleOnChange}
                        id="bordered-radio-1" 
                        type="radio" 
                        value="1" 
                        name="bordered-radio" 
                    />
                    <label htmlFor="bordered-radio-1">
                        {localization[lang].JobDescription.task}
                        <span className={styles.innerCircle1}></span>
                    </label>

                </div>
                <div className={styles.radioButtonContainer}>
                    <input
                        checked={selectedRadio === '2'}
                        onChange={handleOnChange}
                        id="bordered-radio-2" 
                        type="radio" 
                        value="2" 
                        name="bordered-radio" 
                    />
                    <label htmlFor="bordered-radio-2">
                        {localization[lang].JobDescription.project}
                        <span className={styles.innerCircle2}></span>
                    </label>
                </div>
            </div>
            <p className={styles.popupSmallHeading}>{localization[lang].JobDescription.task}/{localization[lang].JobDescription.project}</p>
            <Input
                id="chat" 
                rows={1}
                placeholder={localization[lang].JobDescription.describe}
                inputSize="m"
                sx={{
                    paddingRight: 0,
                    width: '95%',
                    marginLeft: '2.5%',
                    marginBottom: '20px',
                }}
            />
            <div className={styles.buttonContainer}>
                <button 
                    type="button" 
                    onClick={(): void => {setIsClicked(true); setIsDataAlert(false);}} 
                    className={styles.continueButton}
                >{localization[lang].JobDescription.Buttons.back}
                </button>
                <button
                    type="button"
                    onClick={handleButtonSubmit}
                    className={styles.continueButton}
                >{localization[lang].JobDescription.Buttons.continue}
                </button>
                <button
                    type="button"
                    onClick={():void => {setHaveDescription(true); setJobDescription('');}}
                    className={styles.continueButton}
                >{localization[lang].JobDescription.Buttons.search}
                </button>
            </div>

            </div>)}
        </div>
    );
};