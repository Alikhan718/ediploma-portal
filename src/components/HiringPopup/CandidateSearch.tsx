import React, { useEffect } from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { Input } from '@src/components';
import { set } from 'react-ga';
import { SearchOutput } from './SearchOutput';

interface CandidateSearchProps {
	jobDescription:string;
    setHaveDescription:any;
};

export const CandidateSearch: React.FC<CandidateSearchProps> = (props) => {
    const { jobDescription, setHaveDescription } = props;

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
        setGotResponse(true);
        setLoading(true);

        const textAreaValue = (document.getElementById("chat") as HTMLInputElement).value;
        if(textAreaValue === ''){
            return;
        }
        
        console.log('Loading...');
        try{
            const response = await fetch('https://agile-job-search.onrender.com/search', {
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

            <h1 className={styles.popupHeading}>Поиск кандидатов</h1>
            <p className={styles.popupSmallHeading}>Найти подходящих кандидатов по описанию работу</p>
            <div>
                <Input
                id="chat" 
                rows={1}
                placeholder="Описание работы"
                inputSize="m"
                defaultValue={jobDescription}
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
                        onClick={(): void => {setHaveDescription(false);}} 
                        className={styles.continueButton}
                    >Назад
                    </button>
                    <button 
                        type="button"
                        onClick={handleSubmit}
                        className={styles.continueButton}
                    >Продолжить
                    </button>
                </div>
            </div>

            </div>)}
        </div>
    );
};