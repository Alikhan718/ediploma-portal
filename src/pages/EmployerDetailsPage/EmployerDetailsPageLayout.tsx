import React from 'react';
import {
    Box, Typography, useMediaQuery, Button
} from '@mui/material';
import exampleImage from '@src/assets/example/EmployerExLogo.svg';
import { ReactComponent as SingleCheck } from "@src/assets/icons/single check.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployerDetails } from '@src/store/auth/actionCreators';
import { selectEmployerDetails, selectUserRole } from '@src/store/auth/selector';
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
import { fetchApply } from '@src/store/vacancy/actionCreators';
import { ReactComponent as CopyIcon } from '@src/assets/icons/copyEmployerIcon.svg';

export const EmployerDetailsPageLayout: React.FC = () => {
    const lang = useSelector(selectLanguage);
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const employerDetails = useSelector(selectEmployerDetails);
    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
    const isMobile = useMediaQuery('(max-width:998px)');
    const role = useSelector(selectUserRole).toLowerCase();

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

    const handleApply = async (employer: any) => {
        if (role != 'student') return;

        dispatch(fetchApply({ employer: employer }));
        console.log('applied');
    };

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' justifyItems='center'
            sx={{
                paddingY: '1.75rem', paddingX: '2rem',
                '@media (max-width: 778px)': {paddingX: '1rem', paddingY: '0.5rem', gap: '1.25rem'}
            }}
        >
            <Box width='100%' display='none' flexDirection='column' padding='1rem'
                sx={{
                    backgroundColor: 'white',
                    padding: '3.75rem',
                    borderRadius: '1.5rem',
                    '@media (max-width: 778px)': {
                        display: 'flex',
                        padding: '1rem',
                        // marginTop: '2rem',
                    },
                }}
            >
                <Box display='none' justifyContent='space-between' alignItems="flex-start"
                    sx={{
                        '@media (max-width: 778px)': {
                            display: 'flex', gap: '1.25rem',
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Box sx={{
                        '@media (max-width: 778px)': {
                            width: '100%',
                        },
                    }}>
                        <Box sx={{display: 'flex', gap: '1.5rem', justifyContent: 'flex-start', alignItems: 'center', '@media (max-width: 778px)': {gap: '0.75rem'}}}>
                            <Box sx={{width: '9rem', height: '9rem', borderRadius: '50%', '@media (max-width: 778px)': {width: '3rem', height: 'auto'}}}>
                                <img 
                                    // src={employerDetails && employerDetails.avatar ? `${baseURL}/${employerDetails.avatar}` : exampleImage} 
                                    src={exampleImage} 
                                    alt="employer"
                                    style={{
                                        objectFit: 'cover', width: '100%', height: '100%',
                                        borderRadius: '50%'
                                    }}
                                />
                            </Box>
                            <Box>
                                <Box display="flex" alignItems='center'>
                                    <Typography
                                        fontWeight='600'
                                        sx={{
                                            // paddingBottom: '14px',
                                            fontSize: '2rem',
                                            '@media (max-width: 778px)': {
                                                fontSize: '1.25rem',
                                                width: '100%',
                                            },
                                        }}
                                    >
                                        {employerDetails && employerDetails.name ? employerDetails.name : "Ф.И Работодателя"}
                                    </Typography>
                                    <Box marginLeft='1rem'>
                                        <SingleCheck fill="#3B82F6" />
                                    </Box>
                                </Box>
                                <Box display='flex' justifyContent='center'
                                    justifyItems='center'
                                    sx={{
                                        backgroundColor: "#EBF2FE", borderRadius: '1.25rem', paddingX: '1rem', paddingY: '0.5rem',
                                        width: 'fit-content', marginBottom: '0.5rem',
                                        '@media (max-width: 778px)': {
                                            alignItems: 'center', height: '1.5rem', paddingY: '0.5rem', paddingX: '0.75rem'
                                        },
                                    }}
                                >
                                    <Typography sx={{
                                        fontSize: '0.85rem', color: '#3B82F6',
                                        '@media (max-width: 778px)': {
                                            fontSize: '0.75rem',
                                        },
                                    }}>
                                        {employerDetails && employerDetails.field ? employerDetails.field : "Сфера деятельности"}
                                    </Typography>
                                </Box>
                            </Box>
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
                    <Button 
                        variant='contained'
                        sx={{
                            borderRadius: '1.5rem', boxShadow: 'none', fontSize: '0.85rem', padding: '0.4rem 1.5rem',
                            '&:hover': {boxShadow: 'none'},
                        }}
                        onClick={() => { employerDetails && employerDetails.id ? handleApply(employerDetails.id) : console.log('123') }}
                        disabled={role != 'student'}
                    >
                        {titles[lang].apply}
                    </Button>
                </Box>
            </Box>
            <Box width='100%' display='flex' flexDirection='column' padding='1rem'
                sx={{
                    backgroundColor: 'white',
                    padding: '3.75rem',
                    borderRadius: '1.5rem',
                    '@media (max-width: 778px)': {
                        padding: '1rem',
                        // marginTop: '2rem',
                    },
                }}>
                {/* <Box paddingY='0.5rem' sx={{
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
                </Box> */}
                <Box display='flex' justifyContent='space-between' alignItems="flex-start"
                    sx={{
                        '@media (max-width: 778px)': {
                            display: 'none'
                        },
                    }}
                >
                    <Box sx={{
                        // width: '100%',
                        '@media (max-width: 778px)': {
                            marginBottom: '1.5rem',
                            width: '100%',
                        },
                    }}>
                        <Box sx={{display: 'flex', gap: '1.5rem', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Box sx={{width: '9rem', height: '9rem', borderRadius: '5rem', '@media (max-width: 778px)': {width: '7rem', height: '7rem'}}}>
                                <img 
                                    // src={employerDetails && employerDetails.avatar ? `${baseURL}/${employerDetails.avatar}` : exampleImage} 
                                    src={exampleImage} 
                                    alt="employer"
                                    style={{
                                        objectFit: 'cover', width: '100%', height: '100%',
                                        borderRadius: isMobile ? '6rem' : '5rem'
                                    }}
                                />
                            </Box>
                            <Box>
                                <Box display="flex" alignItems='center'>
                                    <Typography
                                        fontWeight='600'
                                        sx={{
                                            // paddingBottom: '14px',
                                            fontSize: '2rem',
                                            '@media (max-width: 778px)': {
                                                fontSize: '20px',
                                                width: '100%',
                                            },
                                        }}
                                    >
                                        {employerDetails && employerDetails.name ? employerDetails.name : "Ф.И Работодателя"}
                                    </Typography>
                                    <Box marginLeft='1rem'>
                                        <SingleCheck fill="#3B82F6" />
                                    </Box>
                                </Box>
                                <Box display='flex' justifyContent='center'
                                    justifyItems='center'
                                    sx={{
                                        backgroundColor: "#EBF2FE", borderRadius: '1.25rem', paddingX: '1rem', paddingY: '0.5rem',
                                        width: 'fit-content', marginBottom: '0.5rem',
                                        '@media (max-width: 778px)': {
                                            paddingX: '0.75rem', paddingY: '0.5rem'
                                        },
                                    }}
                                >
                                    <Typography sx={{
                                        fontSize: '0.85rem', color: '#3B82F6',
                                        '@media (max-width: 778px)': {
                                            fontSize: '0.85rem',
                                        },
                                    }}>
                                        {employerDetails && employerDetails.field ? employerDetails.field : "Сфера деятельности"}
                                    </Typography>
                                </Box>
                                <Button 
                                    variant='contained'
                                    sx={{
                                        borderRadius: '1.5rem', boxShadow: 'none', fontSize: '0.85rem', padding: '0.4rem 1.5rem',
                                        '&:hover': {boxShadow: 'none'},
                                    }}
                                    onClick={() => { employerDetails && employerDetails.id ? handleApply(employerDetails.id) : console.log('123') }}
                                    disabled={role != 'student'}
                                >
                                    {titles[lang].apply}
                                </Button>
                            </Box>
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
                <Box paddingY="1.88rem" sx={{
                    '@media (max-width: 778px)': {
                        paddingY: 0,
                    }
                }}>
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
                    <Box sx={{
                            display: 'flex', justifyContent: 'space-between', gap: '1.25rem', width: '100%',
                            '@media (max-width: 778px)': {
                                flexWrap: 'wrap',
                            },
                        }}
                    >
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.5rem', '@media (max-width: 778px)': {gap: '0.4rem', width: '40%'}}}>
                            <Typography sx={{fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                {titles[lang].phone}
                            </Typography>
                            <Box display='flex' alignItems='center' gap={isMobile ? '0.5rem' : '0.75rem'}>
                                <Typography sx={{fontSizee: '1rem', color: '#293357', overflowWrap: 'break-word', wordBreak: 'break-all', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                    {employerDetails && employerDetails.phone ? employerDetails.phone : "-"}
                                </Typography>
                                <Box sx={{cursor: 'pointer', justifyContent: 'center', alignItems: 'center'}} onClick={()=>{navigator.clipboard.writeText(employerDetails && employerDetails.phone ? employerDetails.phone : "-")}}>
                                    <CopyIcon/>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.5rem', '@media (max-width: 778px)': {gap: '0.4rem', width: '40%'}}}>
                            <Typography sx={{fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                {titles[lang].email}
                            </Typography>
                            <Box display='flex' alignItems='center' gap={isMobile ? '0.5rem' : '0.75rem'} >
                                <Typography sx={{fontSizee: '1rem', color: '#293357', overflowWrap: 'break-word', wordBreak: 'break-all', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                    {employerDetails && employerDetails.email ? employerDetails.email : "-"}
                                </Typography>
                                <Box sx={{cursor: 'pointer', justifyContent: 'center', alignItems: 'center'}} onClick={()=>{navigator.clipboard.writeText(employerDetails && employerDetails.email ? employerDetails.email : "-")}}>
                                    <CopyIcon/>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.5rem', '@media (max-width: 778px)': {gap: '0.4rem', width: '40%'}}}>
                            <Typography sx={{fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                {titles[lang].address}
                            </Typography>
                            <Typography sx={{fontSizee: '1rem', color: '#293357', overflowWrap: 'break-word', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                {employerDetails && employerDetails.address ? employerDetails.address : "-"}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.5rem', '@media (max-width: 778px)': {gap: '0.4rem', width: '40%'}}}>
                            <Typography sx={{fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                {titles[lang].website}
                            </Typography>
                            <Typography sx={{fontSizee: '1rem', color: '#293357', overflowWrap: 'break-word', '@media (max-width: 778px)':{fontSize: '0.875rem'}}}>
                                {employerDetails && employerDetails.website ? employerDetails.website : "-"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box width="100%" sx={{
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
                    <Box sx={{
                            display: 'flex', gap: '1.85rem', justifyContent: 'space-between', width: '100%',
                            '@media (max-width: 778px)': {
                                flexDirection: 'column',
                                gap: '1rem',
                            },
                        }}
                    >
                        <Box sx={{
                            width: '50%',
                            '@media (max-width: 778px)': {
                                width: '100%',
                            },
                        }}>
                            <Typography color="#818181">
                                {employerDetails && employerDetails.description ? employerDetails.description : ""}
                            </Typography>
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
            </Box>
        </Box>
    );
};