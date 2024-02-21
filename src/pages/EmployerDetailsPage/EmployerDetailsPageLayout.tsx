import React from 'react';
import {
    Box, Typography, useMediaQuery
} from '@mui/material';
import exampleImage from '@src/assets/example/employerDetails.jpeg';
import { ReactComponent as SingleCheck } from "@src/assets/icons/single check.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployerDetails } from '@src/store/auth/actionCreators';
import { selectEmployerDetails } from '@src/store/auth/selector';
import { selectLanguage } from '@src/store/generals/selectors';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import icon from "@src/assets/icons/Logo (2).svg";
import { ReactComponent as Telegram } from "@src/assets/icons/tgEmployer.svg";
import { ReactComponent as Linkedin } from "@src/assets/icons/inEmployer.svg";
import { ReactComponent as Instagram } from "@src/assets/icons/igEmployer.svg";
import { ReactComponent as Facebook } from "@src/assets/icons/fbEmployer.svg";
import { ReactComponent as Youtube } from "@src/assets/icons/ytEmployer.svg";
import { useParams } from 'react-router';
import { employerData, employerNumData, titles } from './generator';

export const EmployerDetailsPageLayout: React.FC = () => {
    const lang = useSelector(selectLanguage);
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const employerDetails = useSelector(selectEmployerDetails);
    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
    const isMobile = useMediaQuery('(max-width:998px)');

    React.useEffect(() => {
        dispatch(fetchEmployerDetails({ id: id }));
    }, []);

    const [showFull, setShowFull] = React.useState(false);

    const handleText = (text: string): string => {
        const matchesSm = useMediaQuery('(max-width:768px)');
        const trimLimit = matchesSm ? 85 : 115;
        return showFull ? text : text.substring(0, trimLimit) + "...";
    };
    const handleLink = (socialmedia: string): void => {
        switch (socialmedia) {
            case "instagram":
                if (employerDetails && employerDetails.instagram_link)
                    window.open(employerDetails.instagram_link, "_blank");
                break;
            case "telegram":
                if (employerDetails && employerDetails.telegram_link)
                    window.open(employerDetails.telegram_link, "_blank");
                break;
            case "youtube":
                if (employerDetails && employerDetails.youtube_link)
                    window.open(employerDetails.youtube_link, "_blank");
                break;
            case "linkedin":
                if (employerDetails && employerDetails.linkedin_link)
                    window.open(employerDetails.linkedin_link, "_blank");
                break;
            case "facebook":
                if (employerDetails && employerDetails.facebook_link)
                    window.open(employerDetails.facebook_link, "_blank");
                break;
        }
    };

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' justifyItems='center'>
            <Box display='none' sx={{
                width: '100%', height: '25rem', display: 'flex', justifyContent: 'center',
                alignItems: 'center', position: 'relative', backgroundColor: 'white',
                '@media (max-width: 778px)': {
                    top: '2rem',
                    height: '15rem'
                },
            }}>
                <img src={employerDetails && employerDetails.avatar ? `${baseURL}/${employerDetails.avatar}` : exampleImage} alt="employer"
                    style={{
                        padding: isMobile ? '1rem' : '0rem', objectFit: 'cover', width: '100%', height: '100%',
                        borderRadius: isMobile ? '2rem' : '0rem'
                    }}
                />
            </Box>
            <Box width='100%' display='flex' flexDirection='column' padding='1rem'
                sx={{
                    backgroundColor: 'white',
                    padding: '3.75rem',
                    '@media (max-width: 778px)': {
                        padding: '1rem',
                        marginTop: '2rem',
                    },
                }}>
                <Box paddingY='0.5rem' sx={{
                    position: "absolute", top: "26rem",
                    '@media (max-width: 778px)': {
                        top: "15rem",
                        paddingLeft: "0.60rem"
                    },
                }}
                >
                    <img src={icon} alt="icon" style={{
                        width: isMobile ? '3rem' : 'auto',
                        height: 'auto',
                    }} />
                </Box>
                <Box display='flex' justifyContent='space-between' alignItems="flex-start"
                    sx={{
                        '@media (max-width: 778px)': {
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                        },
                    }}
                >
                    <Box sx={{
                        width: '30%',
                        '@media (max-width: 778px)': {
                            marginBottom: '1.5rem',
                            width: '45%',
                        },
                    }}>
                        <Box display="flex" alignItems='center'>
                            <Typography
                                fontWeight='600'
                                sx={{
                                    paddingBottom: '14px',
                                    fontSize: '2rem',
                                    '@media (max-width: 778px)': {
                                        fontSize: '20px',
                                        width: '100%',
                                    },
                                }}
                            >
                                {employerDetails && employerDetails.name ? employerDetails.name : "Ф.И Работодателя"}
                            </Typography>
                            <Box marginLeft='1rem' marginBottom='0.5rem'>
                                <SingleCheck fill="#3B82F6" />
                            </Box>
                        </Box>
                        <Box display='flex' width='65%' justifyContent='center'
                            justifyItems='center'
                            sx={{
                                backgroundColor: "#EBF2FE", borderRadius: '1.25rem',
                                '@media (max-width: 778px)': {
                                    width: '100%',
                                },
                            }}
                        >
                            <Typography sx={{
                                fontSize: '0.85rem', color: '#3B82F6', paddingX: '0.75rem', paddingY: '0.5rem',
                                '@media (max-width: 778px)': {
                                    fontSize: '0.85rem',
                                },
                            }}>
                                {employerDetails && employerDetails.field ? employerDetails.field : "Сфера деятельности"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{}}>
                        <Box display='flex' justifyContent="center"
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{
                                backgroundColor: '#F4F7FE', borderRadius: '50%',
                                '@media (max-width: 778px)': {
                                    marginX: '0rem',
                                    mr: '0.5rem'
                                },
                                ...(employerDetails && employerDetails.instagram_link && {
                                    '&:hover': {
                                        backgroundColor: '#E2E8F0',
                                        cursor: 'pointer',
                                    },
                                })
                            }}
                            onClick={(): void => { handleLink("instagram"); }}
                        >
                            <Instagram />
                        </Box>
                        <Box display='flex' justifyContent="center"
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{
                                backgroundColor: '#F4F7FE', borderRadius: '50%',
                                ...(employerDetails && employerDetails.telegram_link && {
                                    '&:hover': {
                                        backgroundColor: '#E2E8F0',
                                        cursor: 'pointer',
                                    },
                                })
                            }}
                            onClick={(): void => { handleLink("telegram"); }}
                        >
                            <Telegram />
                        </Box>
                        <Box display='flex' justifyContent="center"
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{
                                backgroundColor: '#F4F7FE', borderRadius: '50%',
                                ...(employerDetails && employerDetails.whatsapp_link && {
                                    '&:hover': {
                                        backgroundColor: '#E2E8F0',
                                        cursor: 'pointer',
                                    },
                                })
                            }}
                            onClick={(): void => { handleLink("youtube"); }}
                        >
                            <Youtube />
                        </Box>
                        <Box display='flex' justifyContent="center"
                            alignItems='center' padding='0.7rem' marginX='0.5rem'
                            sx={{
                                backgroundColor: '#F4F7FE', borderRadius: '50%',
                                ...(employerDetails && employerDetails.linkedin_link && {
                                    '&:hover': {
                                        backgroundColor: '#E2E8F0',
                                        cursor: 'pointer',
                                    },
                                })
                            }}
                            onClick={(): void => { handleLink("linkedin"); }}
                        >
                            <Linkedin />
                        </Box>
                        <Box display='flex' justifyContent="center"
                            alignItems='center' padding='0.5rem' marginX='0.5rem'
                            sx={{
                                backgroundColor: '#F4F7FE', borderRadius: '50%',
                                ...(employerDetails && employerDetails.facebook_link && {
                                    '&:hover': {
                                        backgroundColor: '#E2E8F0',
                                        cursor: 'pointer',
                                    },
                                })
                            }}
                            onClick={(): void => { handleLink("facebook"); }}
                        >
                            <Facebook />
                        </Box>
                    </Box>
                </Box>
                <Box paddingY="1.88rem">
                    <Typography
                        fontWeight='600'
                        sx={{
                            paddingBottom: '14px',
                            fontSize: '24px',
                            '@media (max-width: 778px)': {
                                fontSize: '20px',
                                width: '100%',
                            },
                        }}
                    >
                        {titles[lang].data}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end"
                        sx={{
                            '@media (max-width: 778px)': {
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'flex-start',
                            },
                        }}
                    >
                        <Box sx={{
                            '@media (max-width: 778px)': {
                                marginBottom: '1rem'
                            },
                        }}>
                            {Object.keys(employerData).map((key: any, index) => {
                                if (employerDetails[key as keyof typeof employerDetails]) {
                                    return (
                                        <Box key={index} display='flex' flexDirection='column'
                                            justifyContent='center' justifyItems='center' marginY='0.5rem'
                                        >
                                            <Typography>
                                                <span style={{ color: "#818181", fontSize: "16px" }}>
                                                    {employerData[key as keyof typeof employerData][lang]}:
                                                </span>{" "}
                                                <span style={{ fontWeight: '600', fontSize: "16px" }}>
                                                    {employerDetails[key as keyof typeof employerDetails]}
                                                </span>{" "}
                                            </Typography>
                                        </Box>
                                    );
                                }
                            })}
                        </Box>
                        <Box display='flex'>
                            {Object.keys(employerNumData).map((key: any, index) => {
                                return (
                                    <Box key={index}
                                        display='flex' flexDirection='column'
                                        justifyContent='center' marginX='0.5rem'
                                        sx={{
                                            '@media (max-width: 778px)': {
                                                marginX: '0rem',
                                                mr: '0.5rem'
                                            },
                                        }}
                                    >
                                        <Typography>
                                            <span style={{ fontWeight: '600', fontSize: "16px" }}>
                                                {employerDetails && employerDetails[key as keyof typeof employerDetails] ? employerDetails[key as keyof typeof employerDetails] : '-'}
                                            </span>
                                        </Typography>
                                        <Typography>
                                            <span style={{ color: "#818181", fontSize: "16px" }}>
                                                {employerNumData[key as keyof typeof employerNumData][lang]}
                                            </span>
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
                <Box width="50%" sx={{
                    '@media (max-width: 778px)': {
                        width: '100%'
                    },
                }}>
                    <Typography
                        fontWeight='600'
                        sx={{
                            paddingBottom: '14px', fontSize: '24px',
                            '@media (max-width: 778px)': {
                                fontSize: '20px', width: '100%',
                            },
                        }}
                    >
                        {titles[lang].about}
                    </Typography>
                    <Typography color="#818181">
                        {handleText(employerDetails && employerDetails.description ? employerDetails.description : "")}
                    </Typography>
                    <Typography style={{ cursor: "pointer" }} fontWeight='600' color='#629BF8'
                        sx={{ paddingBottom: '20px' }}
                        onClick={(): void => { setShowFull(!showFull); }}
                    >
                        {"Показать"} {!showFull ? "больше" : "меньше"}
                        <ExpandMore style={{ marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : "" }} />
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};