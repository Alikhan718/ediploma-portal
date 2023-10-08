import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css";
import { CandidateSearch } from './CandidateSearch';
import { JobDescriptionGenerator } from './JobDescriptionGenerator';

interface GeneratorProps{
    setIsClicked:any;
}

export const Generator: React.FC<GeneratorProps> = (props) => {
    const {setIsClicked} = props;
    const [haveDescription, setHaveDescription] = React.useState(false);
    const [jobDescription, setJobDescription] = React.useState('');

    return(
        <div>
            {haveDescription? 
                (<CandidateSearch jobDescription={jobDescription} setHaveDescription={setHaveDescription}/>):
                (<JobDescriptionGenerator setHaveDescription={setHaveDescription} setIsClicked={setIsClicked} setJobDescription={setJobDescription}/>)
            }
        </div>
    );
};