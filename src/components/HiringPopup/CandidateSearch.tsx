import React, { useEffect } from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { Input } from '@src/components';
import { set } from 'react-ga';
import { SearchOutput } from './SearchOutput';
import { useSelector } from "react-redux";
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/components/HiringPopup/Generator';

interface CandidateSearchProps {
	jobDescription:string;
    setHaveDescription:any;
    setIsDataAlert: any;
    showAlert:any;
};

export const CandidateSearch: React.FC<CandidateSearchProps> = (props) => {
    const { jobDescription, setHaveDescription, setIsDataAlert, showAlert} = props;
    const lang = useSelector(selectLanguage);
    const [gotResponse, setGotResponse] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState('');

    const handleTextareaInput = (e: any): void => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    useEffect((): void => {
        const textarea = document.getElementById('chat') as HTMLInputElement;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

    }, [jobDescription]);

    const handleSubmit = async (): Promise<void> => {
        const textAreaValue = (document.getElementById("chat") as HTMLInputElement).value;
        if(textAreaValue === ''){
            showAlert(localization[lang].Alert.addDescription);
            return;
        }
        
        setGotResponse(true);
        setLoading(true);
        setIsDataAlert(false);

        console.log('Loading...');
        try{
            const response = await fetch('https://agile-search.onrender.com/search', {
                method: "POST",
                body: JSON.stringify({jobDescription: textAreaValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData.message);
            console.log(responseData.data);
            setLoading(false);
            setResponse(responseData.data);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div>
            {gotResponse ?(<SearchOutput response={response} loading={loading} setGotResponse={setGotResponse}/>):
            (<div>

                <h1 className={styles.popupHeading}>{localization[lang].CandidateSearch.title}</h1>
                <p className={styles.popupSmallHeading}>{localization[lang].CandidateSearch.findCandidate}</p>
                <Input
                    id="chat" 
                    rows={1}
                    placeholder={localization[lang].CandidateSearch.description}
                    inputSize="m"
                    // value={jobDescription}
                    defaultValue={jobDescription}
                    sx={{
                        height: 'auto',
                        paddingRight: 0,
                        width: '95%',
                        marginLeft: '2.5%',
                        marginBottom: '20px',
                    }}
                />
                <div className={styles.buttonContainer}>
                    <button 
                        type="button" 
                        onClick={(): void => {setHaveDescription(false); setIsDataAlert(false);}} 
                        className={styles.continueButton}
                    >{localization[lang].CandidateSearch.Buttons.back}
                    </button>
                    <button 
                        type="button"
                        onClick={handleSubmit}
                        className={styles.continueButton}
                    >{localization[lang].CandidateSearch.Buttons.search}
                    </button>
                </div>
            </div>)}
        </div>
    );
};