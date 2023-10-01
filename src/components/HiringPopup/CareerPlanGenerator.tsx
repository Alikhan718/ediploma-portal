import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import fileIcon from "src/assets/icons/fileIcon.svg";

interface CareerPlanGeneratorProps{
    setIsClicked: any;
}

export const CareerPlanGenerator: React.FC<CareerPlanGeneratorProps> = (props) => {
    const {setIsClicked} = props;

    const [formData, setFormData] = React.useState({
        major: '',
        yearOfStudy: '',
        dreamJob: '',
        dreamProject: '',
        careerGoal: '',
    });
    const [selectedFileName, setSelectedFileName] = React.useState('');
    const [response, setResponse] = React.useState('');

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: any) => {
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

    const handleSubmit = async () => {
        const input: any = document.getElementById('cv');
        if (!input.files[0]){
            return;
        }
        if(Object.values(formData).includes('')){
            return;
        }
        
        console.log("Loading...");

        const formDataToSend = new FormData();

        formDataToSend.append('major', formData.major);
        formDataToSend.append('yearOfStudy', formData.yearOfStudy);
        formDataToSend.append('dreamJob', formData.dreamJob);
        formDataToSend.append('dreamProject', formData.dreamProject);
        formDataToSend.append('careerGoal', formData.careerGoal);
        
        formDataToSend.append('cv', input.files[0]);

        try {
            const response = await fetch('http://localhost:3003/student-action-plan/generate-plan', {
                method: "POST",
                body: formDataToSend,
            });

            const responseData = await response.json();
            console.log(responseData);
        }catch(error){
            console.log(error);
        }
    };

    return(
        <div>
            <h1 className={styles.popupHeading}>Сгенерировать карьерный план</h1>
            <div>
                <div className={styles.studentPlanDiv}>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>Ваша специальность</p>
                        <textarea
                            id="major"
                            name="major"
                            onChange={handleInputChange}
                            value={formData.major}
                            className={styles.studentSmallTextArea}
                            placeholder="Напишите" 
                        ></textarea>
                    </div>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>На каком вы курсе?</p>
                        <textarea
                            id="yearOfStudy" 
                            name="yearOfStudy"
                            onChange={handleInputChange}
                            value={formData.yearOfStudy}
                            className={styles.studentSmallTextArea}
                            placeholder="Напишите" 
                        />
                    </div>
                </div>
                <div className={styles.studentPlanDiv}>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>Работа мечты</p>
                        <textarea
                            id="dreamJob"
                            name="dreamJob"
                            onChange={handleInputChange}
                            value={formData.dreamJob}
                            className={styles.studentSmallTextArea}
                            placeholder="Напишите" 
                        />
                    </div>
                    <div className={styles.smallTextAreaContainer}>
                        <p className={styles.popupSmallHeading}>Проект мечты</p>
                        <textarea
                            id="dreamProject" 
                            name="dreamProject"
                            onChange={handleInputChange}
                            value={formData.dreamProject}
                            className={styles.studentSmallTextArea}
                            placeholder="Напишите" 
                        />
                    </div>
                </div>
                <p className={styles.popupSmallHeading}>Какова ваша главная карьерная цель?</p>
                <textarea 
                    id="careerGoal"
                    name="careerGoal"
                    onChange={handleInputChange}
                    value={formData.careerGoal}
                    className={styles.textArea}
                    placeholder="Описание работы" 
                    >
                </textarea>
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
                    <button type="button" onClick={()=>{setIsClicked(true)}} className={styles.continueButton}>Назад</button>
                    <button type="button" onClick={handleSubmit} className={styles.continueButton}>Продолжить</button>
                </div>
            </div>
        </div>
    )
};