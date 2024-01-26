import React from 'react'
import {
    Box, IconButton
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
import {ReactComponent as DownloadIcon} from '@src/assets/icons/download.svg';
import {handleDownload} from "@src/utils/link";

interface ShareButtonProps {
    currentUrl: string;
    lang: "kz" | "ru" | "en";
    smartContractAddress?: string;
    setAlertOpen: (value: boolean) => void;
    value: number;
    data: any;
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
    const { currentUrl, lang, smartContractAddress, setAlertOpen, value, data } = props

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
                    display: value !== 0 ? "none" : "flex",
                    flexDirection: 'column',
                    width: '100%',
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
            <Box sx={{ 
                display: 'flex', 
                justifyContent: "space-around", 
                flexWrap: 'wrap', 
                paddingBottom: '1rem',
                '@media (max-width: 778px)': {
                    flexWrap: 'nowrap',
                },
            }}>
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
                <Box>
                    <IconButton
                        color="primary"
                        sx={{
                            backgroundColor: "rgba(59,130,246,0.78)",
                            '&:hover': {
                                backgroundColor: "rgb(59,130,246)",
                                color: "white"
                            }
                        }}
                        onClick={() => {
                            let link = data && data.image ? data.image : "";
                            handleDownload(link, data && data.name_en ? data.name_en : "diploma");
                        }}
                    >
                        <DownloadIcon style={{ width: 16, height: 16 }}/>
                    </IconButton>
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