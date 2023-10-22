import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import fileIcon from "src/assets/icons/fileIcon.svg";
import { Input } from '@src/components';
import { Output } from './Output';

interface CareerPlanGeneratorProps{
    setIsClicked: any;
    setIsDataAlert: any;
    showAlert: any;
}

export const CareerPlanGenerator: React.FC<CareerPlanGeneratorProps> = (props) => {
    const {setIsClicked, setIsDataAlert, showAlert} = props;

    const [formData, setFormData] = React.useState({
        major: '',
        yearOfStudy: '',
        dreamJob: '',
        dreamProject: '',
        careerGoal: '',
    });
    const [selectedFileName, setSelectedFileName] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [gotResponse, setGotResponse] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [haveSearch, setHaveSearch] = React.useState(false);
    

    const handleInputChange = (e: any): void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: any): void => {
        const input: any = document.getElementById('cv');
        const inputFile: File = input.files[0];
        console.log(inputFile);

        if (inputFile) {
            setSelectedFileName(inputFile.name);
        }
        else {
            setSelectedFileName('');
        }
    };

    const handleSubmit = async (): Promise<void> => {
        const input: any = document.getElementById('cv');
        if (!input.files[0]){
            setGotResponse(false);
            setLoading(false);
            showAlert('Загрузите ваше резюме');
            return;
        }
        if(Object.values(formData).includes('')){
            console.log(formData);
            setGotResponse(false);
            setLoading(false);
            showAlert('Введите свои личные данные');
            return;
        }

        setGotResponse(true);
        setLoading(true);
        
        console.log("Loading...");
        setIsDataAlert(false);

        const formDataToSend = new FormData();

        formDataToSend.append('major', formData.major);
        formDataToSend.append('yearOfStudy', formData.yearOfStudy);
        formDataToSend.append('dreamJob', formData.dreamJob);
        formDataToSend.append('dreamProject', formData.dreamProject);
        formDataToSend.append('careerGoal', formData.careerGoal);
        
        formDataToSend.append('cv', input.files[0]);

        try {
            const response = await fetch('https://agile-job-student.onrender.com/student-action-plan/generate-plan', {
                method: "POST",
                body: formDataToSend,
            });

            const responseData = await response.json();
            setResponse(responseData.data);
            setLoading(false);
            console.log(responseData);

            setFormData({
                major: '',
                yearOfStudy: '',
                dreamJob: '',
                dreamProject: '',
                careerGoal: '',
            });
            
            setSelectedFileName('');
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    };

    return(
        <div>
            {gotResponse ? 
            (<Output response={response} loading={loading} setGotResponse={setGotResponse} setHaveDescription={setGotResponse} haveSearch={haveSearch} isStudent={true} setJobDescription={null}/>):
            (<div>

            <h1 className={styles.popupHeading}>Сгенерировать карьерный план</h1>
            <div>
                <div className={styles.studentPlanDiv}>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>Ваша специальность</p>
                        <Input
                            id="major"
                            name="major"
                            placeholder="Напишите"
                            inputSize="s"
                            onChange={handleInputChange}
                            value={formData.major}
                            sx={{
                                paddingRight: 0,
                                width: '95%',
                                marginLeft: '2.5%',
                            }}
                        />
                    </div>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>На каком вы курсе?</p>
                        <Input
                            id="yearOfStudy" 
                            name="yearOfStudy"
                            placeholder="Напишите"
                            inputSize="s"
                            onChange={handleInputChange}
                            value={formData.yearOfStudy}
                            sx={{
                                paddingRight: 0,
                                width: '95%',
                                marginLeft: '2.5%',
                            }}
                        />
                    </div>
                </div>
                <div className={styles.studentPlanDiv}>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>Работа мечты</p>
                        <Input
                            placeholder="Напишите"
                            inputSize="s"
                            id="dreamJob"
                            name="dreamJob"
                            onChange={handleInputChange}
                            value={formData.dreamJob}
                            sx={{
                                paddingRight: 0,
                                width: '95%',
                                marginLeft: '2.5%',
                            }}
                        />
                    </div>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>Проект мечты</p>
                        <Input
                            placeholder="Напишите"
                            inputSize="s"
                            id="dreamProject" 
                            name="dreamProject"
                            onChange={handleInputChange}
                            value={formData.dreamProject}
                            sx={{
                                paddingRight: 0,
                                width: '95%',
                                marginLeft: '2.5%',
                            }}
                        />
                    </div>
                </div>
                <p className={styles.popupSmallHeading}>Какова ваша главная карьерная цель?</p>
                <Input
                    placeholder="Напишите"
                    inputSize="s"
                    id="careerGoal"
                    name="careerGoal"
                    onChange={handleInputChange}
                    value={formData.careerGoal}
                    sx={{
                        paddingRight: 0,
                        width: '95%',
                        marginLeft: '2.5%',
                        marginBottom: '20px',
                    }}
                />
                <div className={styles.fileContainer}>
                    <label htmlFor="cv" className={styles.fileContainerDiv}>
                        <div className={styles.insideFileContainer}>
                            <img src={fileIcon} className={styles.icon}/>
                            <p className={styles.fileText}>
                                {selectedFileName ? (<span>{selectedFileName}</span>) : ( <span>Нажмите или перетащите чтобы загрузить PDF файл</span>)}
                            </p>
                        </div>
                        <input type="file"
                            id="cv"
                            accept=".pdf"
                            onChange={handleFileChange} 
                            className={styles.inputFile}
                        />
                    </label>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="button" onClick={(): void =>{setIsClicked(true); setIsDataAlert(false);}} className={styles.continueButton}>Назад</button>
                    <button type="button" onClick={handleSubmit} className={styles.continueButton}>Продолжить</button>
                </div>
            </div>

            </div>)}
        </div>
    );
};