import React, { useRef, useEffect, useState } from 'react';
import {Box, Typography, Grid, Rating, MobileStepper} from '@mui/material';
import {Button, Input, Label} from '@src/components';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import styles from "./AIChatPage.module.css";
import cn from "classnames";

export const AIChatLayout: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([
        {
            text: 'Hello, I am a chatbot. How can I help you? I can help you with the generating the job description, finding the right candidates.',
            type: 'bot'
        },
        {
            text: 'Hello, can you help me with the job description? I need job description for the position of a software engineer.',
            type: 'user'
        },
        {
            text: `Description:
            A software engineer is responsible for designing, developing, and maintaining software applications. They collaborate with cross-functional teams to analyze user needs and design software solutions that meet those requirements. Software engineers also test and debug software to ensure its functionality and performance.
            
            Responsibilities:
            - Designing, coding, and debugging software applications based on user requirements
            - Collaborating with cross-functional teams to analyze user needs and develop software solutions
            - Conducting system testing and debugging to ensure software functionality and performance
            - Writing and maintaining technical documentation for software applications
            - Troubleshooting and resolving software defects and issues
            - Keeping up-to-date with the latest software development trends and technologies
            
            Requirements:
            - Bachelor's degree in computer science, software engineering, or a related field
            - Proven experience in software development, preferably in a similar role
            - Proficiency in programming languages such as Java, C++, or Python
            - Strong problem-solving and analytical skills
            - Knowledge of software development methodologies and best practices
            - Familiarity with software testing and debugging techniques
            - Excellent communication and collaboration skills
            - Ability to work independently and in a team environment
            - Attention to detail and strong organizational skills
            
            Note: This job description is a general overview and may include other responsibilities and requirements as needed.
            `,
            type: 'bot'
        },
    ]);
    const boxRef = useRef(null);

    useEffect(() => {
        if (boxRef.current) {
            (boxRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [messages]);

    const handleButtonClick = () => {
        if (inputText.trim() !== '') {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: inputText,
              type: 'user',
            },
          ]);
    
          setInputText('');
        }
      };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
            <Box 
                className={styles.mainContainer} 
                sx={{
                    backgroundColor: "white",
                    borderRadius: "2rem",
                    width: '97%',
                    margin: '1rem',
                    height: '70vh',
                    overflowY: 'auto',
                }}
                ref={boxRef}
            >
                {messages.map((el: any) => {
                        return (
                            <Box 
                                key={el}
                                className={styles.cardItem}
                                sx={{ alignSelf: el.type === 'bot' ? 'flex-start' : 'flex-end' }}
                            >
                                <Typography 
                                    fontSize="1rem"
                                    color="white"
                                    textAlign={el.type==='bot' ? 'left' : 'right'} 
                                    className={styles.mobTextMd}
                                >
                                    {el.text}
                                </Typography>
                            </Box>
                        );
                })}
            </Box>
            <Box display="flex" width="80%">
                <Input
                    placeholder="Ask a question"
                    fullWidth={true}
                    inputSize="m"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    sx={{
                        paddingRight: 0,
                        width: '100%'
                    }}
                    className={styles.mobTextMd}
                    endAdornment={
                        <Button
                            onClick={handleButtonClick}
                            buttonSize="m"
                            variant="contained"
                            sx={{
                                borderRadius: '48px',
                                margin: '5px'
                            }}
                            className={cn(styles.btn, styles.mobTextNone)}
                        >
                            <SearchIcon className={styles.btnIcon}/>
                        </Button>
                    }
                />
            </Box>
        </Box>
    )
}