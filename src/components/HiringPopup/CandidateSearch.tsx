import React, { useEffect } from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css"

interface CandidateSearchProps {
	jobDescription:string;
    setHaveDescription:any;
};

export const CandidateSearch: React.FC<CandidateSearchProps> = (props) => {
    const { jobDescription, setHaveDescription } = props;

    const handleTextareaInput = (e: any) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    useEffect(() => {
        const textarea = document.getElementById('chat') as HTMLInputElement;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

    }, [jobDescription]);

    const handleSubmit = async () => {
        const textAreaValue = (document.getElementById("chat") as HTMLInputElement).value;
        if(textAreaValue === ''){
            return;
        }
        
        console.log('Loading...')
        try{
            const response = await fetch('http://localhost:3002/search', {
                method: "POST",
                body: JSON.stringify({jobDescription: textAreaValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData.message);
            console.log(responseData.data);
        }catch(error){
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className={styles.popupHeading}>Поиск кандидатов</h1>
            <p className={styles.popupSmallHeading}>Найти подходящих кандидатов по описанию работу</p>
            <div>
                <textarea 
                    id="chat" 
                    rows={1} 
                    className={styles.textArea}
                    placeholder="Описание работы" 
                    defaultValue={jobDescription}
                    onChange={handleTextareaInput}>
                </textarea>
                <div className={styles.buttonContainer}>
                    <button 
                        type="button" 
                        onClick={()=>{setHaveDescription(false)}} 
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
        </div>
    )
}