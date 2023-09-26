import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css"
import student from "src/assets/example/student.jpg";
import recruiter from "src/assets/example/recruiter.jpg";

interface StudentOrRecruiterProps {
	setIsStudent:any;
    setIsClicked:any;
};
export const StudentOrRecruiter: React.FC<StudentOrRecruiterProps> = (props) => {
    const {setIsStudent, setIsClicked} = props;

    const handleClick = (isStudent: boolean) => {
        setIsStudent(isStudent);
        setIsClicked(false);
    };

    return(
        <div>
            <p className={styles.popupHeading}>Ваша роль</p>
            <div className={styles.studentOrRecruiter}>
                <div>
                    <div className={styles.imageContainer} onClick={()=>{handleClick(true)}}>
                        <img src={student} className={styles.img}/>
                    </div>
                    <p className={styles.imgText}>Я студент</p>
                </div>
                <div>
                    <div className={styles.imageContainer} onClick={()=>{handleClick(false)}}>
                        <img src={recruiter} className={styles.img}/>
                    </div>
                    <p className={styles.imgText}>Я рекрутер</p>
                </div>
            </div>
        </div>
    )
};