import React from 'react'
import {
    Box,
} from '@mui/material';
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
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
    const { currentUrl, lang, smartContractAddress } = props

    return (
        <Box
            margin="1rem"
            sx={{
                backgroundColor: '#3B82F6',
                borderRadius: '1rem',
                width: '48%',
                marginY: '2rem',
                '@media (max-width: 778px)': {
                    margin: '0.9rem',
                    marginTop: '2rem',
                },
            }}
        >
            <Box sx={{
                fontSize: '24px', fontWeight: '600', color: 'white', paddingTop: '10px',
                '@media (max-width: 778px)': {
                    fontSize: '20px'
                },
                margin: "1rem"
            }}> {localization[lang].share}
            </Box>
            <Box sx={{
                fontSize: '20px', fontWeight: '300', color: 'white',
                '@media (max-width: 778px)': {
                    fontSize: '20px'
                },
                margin: "1rem",
                width: "80%"
            }}> {localization[lang].shareText}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-around", flexWrap: 'wrap'}}>
                <Box sx={{ margin: "1rem" }}>
                    <EmailShareButton
                        url={currentUrl}
                        subject={localization[lang].emailSubject}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </Box>
                <Box sx={{ margin: "1rem" }}>
                        <a 
                            href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&issueYear=2023&issueMonth=7&certUrl=${currentUrl}&certId=${smartContractAddress ? smartContractAddress : "1234"}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <LinkedinIcon size={32} round />
                        </a>
                </Box>
                <Box sx={{ margin: "1rem" }}>
                    <TelegramShareButton 
                        url={currentUrl}
                        title={localization[lang].tgTitle}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                </Box>
                <Box sx={{ margin: "1rem" }}>
                    <WhatsappShareButton 
                        url={currentUrl}
                        title={localization[lang].wpTitle}
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </Box>
            </Box>
        </Box>
    )
}