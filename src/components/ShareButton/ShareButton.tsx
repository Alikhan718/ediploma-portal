import React from 'react'
import {
    Box, IconButton, Button as MuiButton
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
import { ReactComponent as Telegram } from '@src/assets/icons/tgEmployer.svg';
import { ReactComponent as Linkedin } from '@src/assets/icons/inEmployer.svg';
import { localization } from './generator'
import { ReactComponent as DownloadIcon } from '@src/assets/icons/downloadDiploma.svg';
import { ReactComponent as WhatsApp } from '@src/assets/icons/wpDiploma.svg';
import { ReactComponent as Email } from '@src/assets/icons/emailDiploma.svg';
import { ReactComponent as Qr } from '@src/assets/icons/qrDiploma.svg';
import { handleDownload } from "@src/utils/link";

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
    const generateAccessToken = (): string => {
        const validityDuration = 24 * 60 * 60 * 1000; // 24 hours validity
        const expirationTime = Date.now() + validityDuration;
        return btoa(expirationTime.toString());
    };

    const copyCurrentURLToClipboard = () => {
        const accessToken = generateAccessToken();

        const currentURL = new URL(window.location.href);
        const pathnameSegments = currentURL.pathname.split('/')
        pathnameSegments.pop();
        pathnameSegments.push(accessToken);
        const newURL = currentURL.origin + pathnameSegments.join('/');
        // const currentURL = window.location.href;
        const textArea = document.createElement('textarea');
        textArea.value = newURL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setAlertOpen(true);
    };

    const getURL = () => {
        const accessToken = generateAccessToken();

        const currentURL = new URL(window.location.href);
        const pathnameSegments = currentURL.pathname.split('/')
        pathnameSegments.pop();
        pathnameSegments.push(accessToken);
        const newURL = currentURL.origin + pathnameSegments.join('/');
        return newURL;
    };

    const linkedinUrl = {
        1: `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&issueYear=2023&issueMonth=7&certUrl=${currentUrl}&certId=${smartContractAddress ? smartContractAddress : "1234"}`,
        2: `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&issueYear=2023&certUrl=${currentUrl}&certId=${smartContractAddress ? smartContractAddress : "1234"}`,
    };

    const defaultLink = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&certUrl=${currentUrl}&certId=${smartContractAddress ? smartContractAddress : "1234"}`;

    return (
        <Box
            sx={{
                backgroundColor: '#F8F8F8',
                borderRadius: '1.25rem',
                padding: '1rem',
                marginBottom: '1rem',
                '@media (max-width: 778px)': {
                    display: value !== 0 ? "none" : "flex",
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor: 'white',
                    marginBottom: 0,
                },
            }}
        >
            <Box sx={{
                fontSize: '20px', fontWeight: '600',
                marginBottom: '1rem',
                '@media (max-width: 778px)': {
                    fontSize: '20px'
                },
            }}>
                {localization[lang].share}
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: "space-around",
                flexWrap: 'wrap', marginBottom: '1rem',
                '@media (max-width: 778px)': {
                    flexWrap: 'nowrap',
                },
            }}>
                <Box>
                    <EmailShareButton
                        url={currentUrl}
                        subject={localization[lang].emailSubject}
                        style={{
                            backgroundColor: "#FAFBFF",
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Email style={{ width: '1.5rem', height: '1.5rem' }} />
                    </EmailShareButton>
                </Box>
                <Box sx={{
                    backgroundColor: "#FAFBFF",
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundColor: "#FAFBFF",
                        color: "white"
                    }
                }}
                >
                    <a
                        href={data && data.university_id ? linkedinUrl[data.university_id as keyof typeof linkedinUrl] : defaultLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin />
                    </a>
                </Box>
                <Box>
                    <TelegramShareButton
                        url={getURL()}
                        title={localization[lang].tgTitle}
                        style={{
                            backgroundColor: "#FAFBFF",
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Telegram style={{ width: '1.5rem', height: '1.5rem' }} />
                    </TelegramShareButton>
                </Box>
                <Box>
                    <WhatsappShareButton
                        url={getURL()}
                        title={localization[lang].wpTitle}
                        style={{
                            backgroundColor: "#FAFBFF",
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <WhatsApp style={{ width: '1.5rem', height: '1.5rem' }} />
                    </WhatsappShareButton>
                </Box>
                <Box>
                    <IconButton
                        color="primary"
                        sx={{
                            backgroundColor: "#FAFBFF",
                            width: '2.5rem',
                            height: '2.5rem',
                            '&:hover': {
                                backgroundColor: "#FAFBFF",
                                color: "white"
                            }
                        }}
                        onClick={() => {
                            let link = data && data.image ? data.image : "";
                            handleDownload(link, data && data.name_en ? data.name_en : "diploma");
                        }}
                    >
                        <Qr style={{ width: '1.5rem', height: '1.5rem' }} />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton
                        color="primary"
                        sx={{
                            backgroundColor: "#FAFBFF",
                            width: '2.5rem',
                            height: '2.5rem',
                            '&:hover': {
                                backgroundColor: "#FAFBFF",
                                color: "white"
                            }
                        }}
                        onClick={() => {
                            let link = data && data.image ? data.image : "";
                            handleDownload(link, data && data.name_en ? data.name_en : "diploma");
                        }}
                    >
                        <DownloadIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                    </IconButton>
                </Box>
            </Box>
            <Box display='flex' alignItems="center" justifyContent='center' width='100%'>
                <MuiButton
                    fullWidth
                    sx={{
                        borderRadius: '25px',
                        backgroundColor: '#EBF2FE',
                    }}
                    onClick={copyCurrentURLToClipboard}
                >
                    {localization[lang].copy}
                </MuiButton>
            </Box>
        </Box>
    )
}