import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { CandidateSearch } from './CandidateSearch';
import { JobDescriptionGenerator } from './JobDescriptionGenerator';

interface GeneratorProps{
    setIsClicked:any;
    setIsDataAlert: any;
    showAlert: any;
}

export const TextGenerator: React.FC<GeneratorProps> = (props) => {
    const {setIsClicked, setIsDataAlert, showAlert} = props;
    const [haveDescription, setHaveDescription] = React.useState(false);
    const [jobDescription, setJobDescription] = React.useState('');

    return(
        <div>
            {haveDescription? 
                (<CandidateSearch jobDescription={jobDescription} setHaveDescription={setHaveDescription} setIsDataAlert={setIsDataAlert} showAlert={showAlert}/>):
                (<JobDescriptionGenerator setHaveDescription={setHaveDescription} setIsClicked={setIsClicked} setJobDescription={setJobDescription} setIsDataAlert={setIsDataAlert} showAlert={showAlert}/>)
            }
        </div>
    );
};