import React from 'react';
import { Input } from '@src/components';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css"
import { Output } from './Output';

interface JobDescriptionGeneratorProps {
    setHaveDescription:any;
    setIsClicked:any;
};

export const JobDescriptionGenerator: React.FC<JobDescriptionGeneratorProps> = (props) => {
    const {setHaveDescription, setIsClicked} = props;

    const [selectedRadio, setSelectedRadio] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [isTask, setIsTask] = React.useState(true);
    const [gotResponse, setGotResponse] = React.useState(false); //change to false
    const [loading, setLoading] = React.useState(false);
    const [haveSearch, setHaveSearch] = React.useState(true);

    const handleOnChange = (event: any) => {
        setSelectedRadio(event.target.value);
    };

    const handleTextareaInput = (e: any) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleButtonSubmit = () => {
        handleSubmit(selectedRadio === '1');
    };

    const handleSubmit = async (isTask: boolean) => {
        console.log(isTask);
        setGotResponse(true);
        setLoading(true);

        const textAreaValue: string = (document.getElementById("chat") as HTMLInputElement).value;
        console.log(textAreaValue);
        let apiLink: string = '';

        if(isTask){
            apiLink = 'http://localhost:3001/generate-from-task';
        }
        else{
            apiLink = 'http://localhost:3001/generate-from-project';
        }

        try {
            const response = await fetch(apiLink,{
                method: "POST",
                body: JSON.stringify({prompt: textAreaValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            setResponse(responseData.data);
            setLoading(false);
        } catch(error) {
            console.log(error);
        }
    };

    return(
        <div>
            {gotResponse ? 
            (<Output response={response} loading={loading} setGotResponse={setGotResponse} setHaveDescription={setHaveDescription} haveSearch={haveSearch}/>): //change to loading state
            (<div>

            
            <h1 className={styles.popupHeading}>Сгенерировать описание работы</h1>
            <p className={styles.popupSmallHeading}>Я хочу сгенерировать описание работы с помощью</p>
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
                        Задача
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
                        Проект
                        <span className={styles.innerCircle2}></span>
                    </label>
                </div>
            </div>
            <p className={styles.popupSmallHeading}>Задача/проект</p>
            <Input
                id="chat" 
                rows={1}
                placeholder="Опишите вашу задачу/проект"
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
                    onClick={()=>{setIsClicked(true)}} 
                    className={styles.continueButton}
                >Назад
                </button>
                <button
                    type="button"
                    onClick={handleButtonSubmit}
                    className={styles.continueButton}
                >Продолжить
                </button>
                <button
                    type="button"
                    onClick={()=>{setHaveDescription(true)}}
                    className={styles.continueButton}
                >Поиск
                </button>
            </div>

            </div>)}
        </div>
    )
};