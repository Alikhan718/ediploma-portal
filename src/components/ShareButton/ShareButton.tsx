import React from 'react'
import {
    Box,
} from '@mui/material';
import { Button } from '@src/components';
import {
    EmailShareButton,
    EmailIcon,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share"
import { localization } from './generator'

interface ShareButtonProps {
    currentUrl: string;
    lang: "kz" | "ru" | "en";
    smartContractAddress?: string;
    setAlertOpen: (value: boolean) => void;
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
    const { currentUrl, lang, smartContractAddress, setAlertOpen } = props

    const copyCurrentURLToClipboard = () => {
        const currentURL = window.location.href;
        const textArea = document.createElement('textarea');
        textArea.value = currentURL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setAlertOpen(true);
    };

    return (
        <Box
            sx={{
                backgroundColor: '#F8F8F8',
                borderRadius: '1rem',
                '@media (max-width: 778px)': {
                    margin: '0.9rem',
                    marginTop: '2rem',
                },
            }}
        >
            <Box sx={{
                fontSize: '20px', fontWeight: '600', paddingTop: '10px',
                '@media (max-width: 778px)': {
                    fontSize: '20px'
                },
                margin: "1rem"
            }}> 
                {localization[lang].share}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-around", flexWrap: 'wrap', paddingBottom: '1rem'}}>
                <Box>
                    <EmailShareButton
                        url={currentUrl}
                        subject={localization[lang].emailSubject}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </Box>
                <Box>
                        <a 
                            href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&issueYear=2023&issueMonth=7&certUrl=${currentUrl}&certId=${smartContractAddress ? smartContractAddress : "1234"}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <LinkedinIcon size={32} round />
                        </a>
                </Box>
                <Box>
                    <TelegramShareButton 
                        url={currentUrl}
                        title={localization[lang].tgTitle}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                </Box>
                <Box>
                    <WhatsappShareButton 
                        url={currentUrl}
                        title={localization[lang].wpTitle}
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </Box>
            </Box>
            <Box display='flex' alignItems="center" justifyContent='center'>
                <Button
                    buttonSize="s"
                    variant="outlined"
                    type="button"
                    sx={{
                        borderRadius: '25px',
                        marginBottom: '1rem',
                    }}
                    onClick={copyCurrentURLToClipboard}
                >
                    {localization[lang].copy}
                </Button>
            </Box>
        </Box>
    )
}