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
            role: 'system',
            content: 'Hello, I am a chatbot. How can I help you? I can help you with the generating the job description, finding the right candidates.',
        },
    ]);
    const boxRef = useRef(null);
    const [sessionId, setSessionId] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const urlRegex:RegExp = /(https?:\/\/[^\s\)]+)/g;

    useEffect(() => {
        if (boxRef.current) {
            (boxRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [messages]);

    const handleButtonClick = async (): Promise<void> => {
        if (inputText.trim() === ''){
            return;
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                role: 'user',
                content: inputText,
            },
        ]);
    
        setInputText('');
        setResponse('');
        setIsLoading(true);

        const newMessages = [
            ...messages,
            {
                role: 'user',
                content: inputText,
            },
        ];

        const last10messages = newMessages.slice(-10)

        const endpoint:string = `https://agile-job-desc-denerator.onrender.com/chat`;
        // const endpoint:string = `http://localhost:3001/chat`;

        try {
            const response = await fetch(endpoint,{
                method: "POST",
                body: JSON.stringify({messages: last10messages}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            setSessionId(responseData.sessionId);
        } catch(error) {
            console.log(error);
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                role: 'system',
                content: '',
            },
        ]);
    };

    useEffect(()=>{
        const endpoint:string = `https://agile-job-desc-denerator.onrender.com/chat-stream?sessionId=${sessionId}`;
        // const endpoint:string = `http://localhost:3001/chat-stream?sessionId=${sessionId}`;

        const eventSource = new EventSource(endpoint);

        eventSource.addEventListener('newEntry', e=> {
            setResponse((prevResponse:string) => prevResponse + e.data);
        });

        eventSource.addEventListener('close', () => {
            console.log('Connection closed');
            setIsLoading(false);
            eventSource.close();
        });

        return (() => {
            eventSource.close();
        });

    }, [sessionId]);

    useEffect(()=>{
        if (response === ''){
            return;
        }

        const lastMessage = messages.pop();
        if(!lastMessage){
            return;
        }

        lastMessage.content = response;

        setMessages((prevMessages) => [
            ...prevMessages,
            lastMessage,
        ]);

    }, [response]);

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
                                sx={{ alignSelf: el.role === 'system' ? 'flex-start' : 'flex-end' }}
                            >
                                <Typography 
                                    fontSize="1rem"
                                    color="white"
                                    textAlign={el.role==='system' ? 'left' : 'right'} 
                                    className={styles.mobTextMd}
                                >
                                    {el.content.split('<br>').map((paragraph: string, index: number) => (
                                        <span key={index}>
                                            {paragraph.split(urlRegex).map((part:string, idx:number) => {
                                                if (urlRegex.test(part)) {
                                                    return (
                                                        <a key={idx} href={part} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                                            {part}
                                                        </a>
                                                    );
                                                }
                                                return (
                                                    <span key={index}>
                                                    {part}
                                                    </span>
                                                );
                                            })}
                                            {index < el.content.split('<br>').length - 1 && <br />}
                                        </span>
                                    ))}
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
                            disabled={inputText.trim() === '' || isLoading}
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