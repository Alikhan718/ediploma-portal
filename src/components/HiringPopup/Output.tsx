import React from 'react';
import styles from "src/pages/DiplomaPage/DiplomaPage.module.css"

interface OutputProps{
    response:string;
    loading:any;
}

export const Output: React.FC<OutputProps> = (props) => {
    const {response, loading} = props;
    return(
        <div>
            {loading ? 
                (<div>Loading...</div>):
                (<div>
                    <p>{response.split('\n').map((paragraph, index) => (
                    <span key={index}>
                        {paragraph}
                        {index < response.split('\n').length - 1 && <br />}
                    </span>
                        ))}
                    </p>
                </div>)}
        </div>
    )
};