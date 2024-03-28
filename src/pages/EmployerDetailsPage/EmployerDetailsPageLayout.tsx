import React from 'react';
import { Box, Pagination, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployerDetails } from '@src/store/auth/actionCreators';
import { selectEmployerDetails, selectUserState } from '@src/store/auth/selector';
import { selectLanguage } from '@src/store/generals/selectors';
import {Button, Input} from "@src/components";
import { AnalyticsCard } from "@src/pages/UnivesrityDetailsPage/components/AnalyticsCard";
import { FacultyGraph } from "@src/pages/UnivesrityDetailsPage/components/FacultyGraph";
import { AnalyticsGraph } from "@src/pages/UnivesrityDetailsPage/components/AnalyticsGraph";
import { GenderGraph } from "@src/pages/UnivesrityDetailsPage/components/GenderGraph";
import { CitiesGraph } from "@src/pages/UnivesrityDetailsPage/components/CitiesGraph";
import { CitiesGrantsGraph } from "@src/pages/UnivesrityDetailsPage/components/CitiesGrantsGraph";
import { GrantsGraph } from "@src/pages/UnivesrityDetailsPage/components/GrantsGraph";
import { fetchFavoriteDiplomas } from "@src/store/diplomas/actionCreators";
import { selectFavoriteDiplomas } from "@src/store/diplomas/selectors";


// Importing SVG components
import { ReactComponent as SingleCheck } from "@src/assets/icons/single check.svg";
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import { ReactComponent as Telegram } from "@src/assets/icons/tgEmployer.svg";
import { ReactComponent as Linkedin } from "@src/assets/icons/inEmployer.svg";
import { ReactComponent as Instagram } from "@src/assets/icons/igEmployer.svg";
import { ReactComponent as Facebook } from "@src/assets/icons/fbEmployer.svg";
import { ReactComponent as Youtube } from "@src/assets/icons/ytEmployer.svg";
import {ReactComponent as SearchIcon} from "@src/assets/icons/search.svg";
import icon from "@src/assets/icons/Logo (2).svg";

// Importing generator data
import { employerData, employerNumData, titles } from './generator';
import { localization } from "@src/pages/EmployerPage/generator";

// Importing CSS styles
import styles from "./EmployerDetailsPage.module.css";


export const EmployerDetailsPageLayout: React.FC = () => {
    // Redux state and dispatch
    const lang = useSelector(selectLanguage);
    const dispatch = useDispatch();

    // Router params
    const { id } = useParams<{ id: string }>();

    // Selectors for employer details and user state
    const employerDetails = useSelector(selectEmployerDetails);
    const userState = useSelector(selectUserState);

    // Base URL from environment variables
    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

    // Media query for mobile view
    const isMobile = useMediaQuery('(max-width:998px)');

    // State for showing full text
    const [showFull, setShowFull] = React.useState(false);

    // Function to handle text trimming based on media query
    const handleText = (text: string): string => {
        const matchesSm = useMediaQuery('(max-width:768px)');
        const trimLimit = matchesSm ? 85 : 115;
        return showFull ? text : text.substring(0, trimLimit) + "...";
    };

    // Function to handle social media links
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

    // Component for tab panel
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box pr={3} pt={2} sx={{paddingRight: 'unset'}}>
                        <Typography>{children}</Typography>

                    </Box>
                )}
            </div>
        );
    }

    // Navigation hook
    const navigate = useNavigate();

    // Selectors and state for pagination of favorite diplomas
    const favoriteDiplomas = useSelector(selectFavoriteDiplomas);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [value, setValue] = React.useState(0);
    const [links, setLinks] = React.useState<any[]>([]);

    const diplomasPerPage = 10;
    const startIndex = (currentPage - 1) * diplomasPerPage;
    const endIndex = startIndex + diplomasPerPage;
    const totalDiplomas = favoriteDiplomas.length;
    const totalPages = Math.ceil(totalDiplomas / diplomasPerPage);
    const currentFavoriteDiplomaPage = favoriteDiplomas.slice(startIndex, endIndex);

    // Effect to fetch favorite diplomas
    React.useEffect(() => {
        dispatch(fetchFavoriteDiplomas());
    }, [!favoriteDiplomas]);


    // Effect to fetch employer details
    React.useEffect(() => {
        dispatch(fetchEmployerDetails({ id: id }));
    }, []);

    console.log(favoriteDiplomas)
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' justifyItems='center'>
            <Box display='flex' flexWrap='wrap' justifyContent="center" className={styles.mainContainer}>
                <Box width='100%' display='flex' flexDirection='column' gap='24px'
                     sx={{
                         marginTop: '2.5rem',
                         backgroundColor: 'white',
                         borderRadius: '15px',
                         padding: '1.88rem',
                         '@media (max-width: 778px)': {
                             padding: '1rem',
                             marginTop: '2rem',
                         },
                     }}>

                    <Box display='flex' justifyContent='space-between' alignItems="flex-start"
                         sx={{
                             backgroundColor: 'white',
                             '@media (max-width: 778px)': {
                                 flexDirection: 'column',
                                 justifyContent: 'space-around',
                             },
                         }}
                    >
                            <Box display="flex" alignItems='start' sx={{ gap: '1.5rem' }}>
                                <Box>
                                    <img src={icon} alt="icon" style={{
                                        width: isMobile ? '80px' : '144px',
                                        height: 'auto',
                                    }} />
                                </Box>
                                <Box>
                                    <Typography fontWeight='600' sx={{ paddingBottom: '14px', fontSize: '2rem', whiteSpace: 'nowrap', '@media (max-width: 778px)': { fontSize: '20px', width: '100%', }, }}>
                                        {employerDetails && employerDetails.name ? employerDetails.name : "Ф.И Работодателя"}
                                    </Typography>
                                    <Box display='flex' justify-content='center'  >
                                        <Typography sx={{ backgroundColor: "#EBF2FE", borderRadius: '1.25rem', fontSize: '0.85rem', color: '#3B82F6', paddingX: '0.75rem', paddingY: '0.5rem', '@media (max-width: 778px)': { fontSize: '0.85rem', maxWidth: '200px', textAlign: 'center' }, }}>
                                            {employerDetails && employerDetails.field ? employerDetails.field : "Сфера деятельности | Отрасль"}
                                        </Typography>
                                    </Box>

                                </Box>

                            </Box>


                        {/* Social media icons*/}
                        <Box display="flex" alignItems="center">
                            {[
                                {link: employerDetails?.instagram_link, icon: <Instagram/>},
                                {link: employerDetails?.telegram_link, icon: <Telegram/>},
                                {link: employerDetails?.whatsapp_link, icon: <Youtube/>},
                                {link: employerDetails?.linkedin_link, icon: <Linkedin/>},
                                {link: employerDetails?.facebook_link, icon: <Facebook/>},
                            ].map(({link, icon}, index) => (
                                <Box
                                    key={index}
                                    display='flex'
                                    justifyContent="center"
                                    alignItems='center'
                                    padding='0.5rem'
                                    marginX='0.5rem'
                                    sx={{
                                        backgroundColor: '#F4F7FE',
                                        borderRadius: '50%',
                                        cursor:'pointer',
                                        ...(link && {
                                            '&:hover': {
                                                backgroundColor: '#E2E8F0',
                                                cursor: 'pointer',
                                            },
                                        })
                                    }}
                                    onClick={() => link && handleLink(link)}
                                >
                                    {icon}
                                </Box>

                            ))}
                            <Box display='flex' justifyContent="center" alignItems='center'
                                padding='0.5rem'
                                 marginX='0.5rem'
                                sx={{borderRadius: '50%',backgroundColor:'#EBF2FE',cursor:'pointer', backdropFilter:'blur(2.5px)'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M11.9426 1.25L13.5 1.25C13.9142 1.25 14.25 1.58579 14.25 2C14.25 2.41421 13.9142 2.75 13.5 2.75H12C9.62177 2.75 7.91356 2.75159 6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09825 18.6648 3.42514 19.4355 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.5749 19.4355 20.9018 18.6648 21.0736 17.3864C21.2484 16.0864 21.25 14.3782 21.25 12V10.5C21.25 10.0858 21.5858 9.75 22 9.75C22.4142 9.75 22.75 10.0858 22.75 10.5V12.0574C22.75 14.3658 22.75 16.1748 22.5603 17.5863C22.366 19.031 21.9607 20.1711 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.03933 20.1711 1.63399 19.031 1.43975 17.5863C1.24998 16.1748 1.24999 14.3658 1.25 12.0574V11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25ZM16.7705 2.27592C18.1384 0.908029 20.3562 0.908029 21.7241 2.27592C23.092 3.6438 23.092 5.86158 21.7241 7.22947L15.076 13.8776C14.7047 14.2489 14.4721 14.4815 14.2126 14.684C13.9069 14.9224 13.5761 15.1268 13.2261 15.2936C12.929 15.4352 12.6169 15.5392 12.1188 15.7052L9.21426 16.6734C8.67801 16.8521 8.0868 16.7126 7.68711 16.3129C7.28742 15.9132 7.14785 15.322 7.3266 14.7857L8.29477 11.8812C8.46079 11.3831 8.56479 11.071 8.7064 10.7739C8.87319 10.4239 9.07761 10.0931 9.31605 9.78742C9.51849 9.52787 9.7511 9.29529 10.1224 8.924L16.7705 2.27592ZM20.6634 3.33658C19.8813 2.55448 18.6133 2.55448 17.8312 3.33658L17.4546 3.7132C17.4773 3.80906 17.509 3.92327 17.5532 4.05066C17.6965 4.46372 17.9677 5.00771 18.48 5.51999C18.9923 6.03227 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.1909 6.52273 20.2868 6.54543L20.6634 6.16881C21.4455 5.38671 21.4455 4.11867 20.6634 3.33658ZM19.1051 7.72709C18.5892 7.50519 17.9882 7.14946 17.4193 6.58065C16.8505 6.01185 16.4948 5.41082 16.2729 4.89486L11.2175 9.95026C10.801 10.3668 10.6376 10.532 10.4988 10.7099C10.3274 10.9297 10.1804 11.1676 10.0605 11.4192C9.96337 11.623 9.88868 11.8429 9.7024 12.4017L9.27051 13.6974L10.3026 14.7295L11.5983 14.2976C12.1571 14.1113 12.377 14.0366 12.5808 13.9395C12.8324 13.8196 13.0703 13.6726 13.2901 13.5012C13.468 13.3624 13.6332 13.199 14.0497 12.7825L19.1051 7.72709Z"
                                          fill="#3B82F6"/>
                                </svg>
                            </Box>

                        </Box>
                    </Box>

                    {/*Данные организации */}
                    <Box>
                        <Typography
                            fontWeight='600'
                            sx={{
                                fontSize: '24px',
                                '@media (max-width: 778px)': {
                                    fontSize: '20px',
                                    width: '100%',
                                },
                            }}
                        >
                            {titles[lang].data}
                        </Typography>
                        <Box display='flex' alignItems='flex-start' align-content='flex-start' gap='6.25rem'
                             flex-wrap='wrap'>
                            {Object.keys(employerData).map((key: any, index) => {
                                if (employerDetails[key as keyof typeof employerDetails]) {
                                    return (
                                        <Box key={index} display='flex' flexDirection='row' justifyContent='center'
                                             justifyItems='center' marginY='0.5rem'>
                                            <Typography>
                                                <span style={{color: "#818181", fontSize: "16px", display: 'flex'}}>
                                                    {employerData[key as keyof typeof employerData][lang]}:
                                                </span>{" "}
                                                <span style={{fontWeight: '600', fontSize: "16px"}}>
                                                    {employerDetails[key as keyof typeof employerDetails]}
                                                </span>{" "}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                     viewBox="0 0 20 20" fill="none" style={{ verticalAlign: 'middle', margin:'0.75rem',}}>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M12.5 1.04102H9.11965C7.58819 1.041 6.37516 1.04099 5.42582 1.16863C4.4488 1.29999 3.65801 1.57675 3.03437 2.20039C2.41073 2.82402 2.13397 3.61481 2.00261 4.59183C1.87498 5.54117 1.87499 6.7542 1.875 8.28566V13.3327C1.875 14.8929 3.01838 16.186 4.51293 16.4199C4.6279 17.0566 4.84794 17.6 5.29029 18.0424C5.79189 18.544 6.42345 18.7597 7.17354 18.8606C7.89602 18.9577 8.81462 18.9577 9.95428 18.9577H12.5457C13.6854 18.9577 14.604 18.9577 15.3265 18.8606C16.0766 18.7597 16.7081 18.544 17.2097 18.0424C17.7113 17.5408 17.9271 16.9092 18.0279 16.1591C18.125 15.4367 18.125 14.5181 18.125 13.3784V9.12029C18.125 7.98063 18.125 7.06203 18.0279 6.33956C17.9271 5.58947 17.7113 4.95791 17.2097 4.45631C16.7674 4.01396 16.2239 3.79392 15.5873 3.67894C15.3534 2.18439 14.0602 1.04102 12.5 1.04102ZM14.2744 3.55866C14.0221 2.82121 13.323 2.29102 12.5 2.29102H9.16667C7.57765 2.29102 6.44876 2.29234 5.59238 2.40748C4.75397 2.5202 4.27093 2.73159 3.91825 3.08427C3.56558 3.43694 3.35419 3.91998 3.24147 4.75839C3.12633 5.61478 3.125 6.74367 3.125 8.33268V13.3327C3.125 14.1556 3.6552 14.8548 4.39264 15.1071C4.37498 14.5988 4.37499 14.0241 4.375 13.3784V9.12029C4.37498 7.98063 4.37497 7.06203 4.4721 6.33956C4.57295 5.58947 4.7887 4.95791 5.29029 4.45631C5.79189 3.95471 6.42345 3.73897 7.17354 3.63812C7.89601 3.54098 8.81461 3.541 9.95427 3.54102H12.5457C13.1914 3.54101 13.7661 3.541 14.2744 3.55866ZM6.17418 5.34019C6.40481 5.10956 6.72862 4.95918 7.3401 4.87697C7.96956 4.79234 8.80382 4.79102 10 4.79102H12.5C13.6962 4.79102 14.5304 4.79234 15.1599 4.87697C15.7714 4.95918 16.0952 5.10956 16.3258 5.34019C16.5565 5.57083 16.7068 5.89464 16.789 6.50612C16.8737 7.13558 16.875 7.96984 16.875 9.16602V13.3327C16.875 14.5289 16.8737 15.3631 16.789 15.9926C16.7068 16.6041 16.5565 16.9279 16.3258 17.1585C16.0952 17.3891 15.7714 17.5395 15.1599 17.6217C14.5304 17.7064 13.6962 17.7077 12.5 17.7077H10C8.80382 17.7077 7.96956 17.7064 7.3401 17.6217C6.72862 17.5395 6.40481 17.3891 6.17418 17.1585C5.94354 16.9279 5.79317 16.6041 5.71096 15.9926C5.62633 15.3631 5.625 14.5289 5.625 13.3327V9.16602C5.625 7.96984 5.62633 7.13558 5.71096 6.50612C5.79317 5.89464 5.94354 5.57083 6.17418 5.34019Z"
                                                          fill="#3B82F6"/>
                                                </svg>
                                            </Typography>

                                        </Box>
                                    );
                                }
                            })}
                        </Box>
                    </Box>

                    {/* О компании */}
                    <Box display='flex'  justifyContent='space-between'  width="100%" gap='30px' sx={{
                        '@media (max-width: 778px)': {
                            width: '100%'
                        },
                    }}>
                        <Box maxWidth='50%'>
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
                                {employerDetails && employerDetails.description ? employerDetails.description : ""}
                            </Typography>

                        </Box>

                        <Box display='flex' >
                            {Object.keys(employerNumData).map((key: any, index) => {
                                return (
                                    <Box key={index}
                                         display='flex' flexDirection='column'
                                         justifyContent='center' padding='20px'
                                         sx={{
                                             '@media (max-width: 778px)': {
                                                 marginX: '0rem',
                                                 mr: '0.5rem'
                                             },
                                         }}
                                    >
                                        <Typography>
                                                <span style={{fontWeight: '600', fontSize: "16px"}}>
                                                    {employerDetails && employerDetails[key as keyof typeof employerDetails] ? employerDetails[key as keyof typeof employerDetails] : '-'}
                                                </span>
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'nowrap' }}>
                                                <span style={{color: "#818181", fontSize: "16px"}}>
                                                    {employerNumData[key as keyof typeof employerNumData][lang]}
                                                </span>
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>


                {/*Избранные*/}

                <Box sx={{width: '100%'}}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        marginTop='24px'
                        sx={{backgroundColor: 'white', borderRadius: '15px 15px 0 0', width: '100%',}}
                        className={styles.diplomasContainer}
                    >
                        <Typography
                            sx={{
                                fontWeight: '800',
                                fontSize: '25px',
                                padding: '20px'
                            }}>{localization[lang].studentsPanel.favorite}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: '20px',
                            marginLeft: '20px',
                        }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <Button
                                        sx={{
                                            width: '140px',
                                            borderRadius: '32px',
                                            border: '1px solid #3B82F6',
                                            display: 'flex',
                                            padding: '9px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        <Box>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 16 16" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M12.1666 4.66602C12.1666 6.04673 11.0473 7.16602 9.66658 7.16602C8.28587 7.16602 7.16658 6.04673 7.16658 4.66602C7.16658 3.2853 8.28587 2.16602 9.66658 2.16602C11.0473 2.16602 12.1666 3.2853 12.1666 4.66602ZM9.66658 6.16602C10.495 6.16602 11.1666 5.49444 11.1666 4.66602C11.1666 3.83759 10.495 3.16602 9.66658 3.16602C8.83816 3.16602 8.16658 3.83759 8.16658 4.66602C8.16658 5.49444 8.83816 6.16602 9.66658 6.16602Z"
                                                      fill="#3B82F6"/>
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M3.83325 11.3327C3.83325 12.7134 4.95254 13.8327 6.33325 13.8327C7.71396 13.8327 8.83325 12.7134 8.83325 11.3327C8.83325 9.95197 7.71396 8.83268 6.33325 8.83268C4.95254 8.83268 3.83325 9.95197 3.83325 11.3327ZM6.33325 12.8327C5.50483 12.8327 4.83325 12.1611 4.83325 11.3327C4.83325 10.5043 5.50482 9.83268 6.33325 9.83268C7.16168 9.83268 7.83325 10.5043 7.83325 11.3327C7.83325 12.1611 7.16168 12.8327 6.33325 12.8327Z"
                                                      fill="#3B82F6"/>
                                                <path
                                                    d="M9.49992 11.305C9.49992 11.0289 9.72378 10.805 9.99992 10.805H14.6666C14.9427 10.805 15.1666 11.0289 15.1666 11.305C15.1666 11.5812 14.9427 11.805 14.6666 11.805H9.99992C9.72378 11.805 9.49992 11.5812 9.49992 11.305Z"
                                                    fill="#3B82F6"/>
                                                <path
                                                    d="M5.99992 4.13836C6.27606 4.13836 6.49992 4.36222 6.49992 4.63836C6.49992 4.9145 6.27606 5.13836 5.99992 5.13836L1.33325 5.13836C1.05711 5.13836 0.833252 4.9145 0.833252 4.63836C0.833252 4.36222 1.05711 4.13836 1.33325 4.13836L5.99992 4.13836Z"
                                                    fill="#3B82F6"/>
                                                <path
                                                    d="M0.833252 11.305C0.833252 11.0289 1.05711 10.805 1.33325 10.805H2.66659C2.94273 10.805 3.16659 11.0289 3.16659 11.305C3.16659 11.5812 2.94273 11.805 2.66659 11.805H1.33325C1.05711 11.805 0.833252 11.5812 0.833252 11.305Z"
                                                    fill="#3B82F6"/>
                                                <path
                                                    d="M14.6666 4.13836C14.9427 4.13836 15.1666 4.36222 15.1666 4.63836C15.1666 4.9145 14.9427 5.13836 14.6666 5.13836H13.3333C13.0571 5.13836 12.8333 4.9145 12.8333 4.63836C12.8333 4.36222 13.0571 4.13836 13.3333 4.13836H14.6666Z"
                                                    fill="#3B82F6"/>
                                            </svg>
                                        </Box>
                                        <Typography
                                            sx={{justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}
                                        >
                                            {localization[lang].studentsPanel.filter}
                                        </Typography>
                                    </Button>

                                    <Box position='relative' style={{width: '554px'}}>
                                        <Input
                                            inputSize={"l"}
                                            type="text"
                                            name="email"
                                            placeholder={localization[lang].studentsPanel.search}
                                            style={{
                                                marginLeft: '1rem',
                                                width: '100%',
                                                padding: '3px',
                                                textAlign: 'center', // выравниваем текст по центру
                                                paddingLeft: '12px' // смещаем плейсхолдер вправо на 2px
                                            }}
                                        />

                                        <SearchIcon style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            right: '10px',
                                            cursor: "pointer"
                                        }}/>
                                    </Box>

                                </Box>

                        </Box>

                    </Box>
                    <TabPanel value={value} index={0}>
                        {totalDiplomas != 0 ?
                            (<Box display="flex"
                                  flexDirection="row"
                                  alignItems="start"
                                  sx={{
                                      width: '100%',
                                      borderRadius: '15px',
                                      padding: '10px',
                                      display: 'grid',
                                      gridTemplateColumns: '4fr 2fr 1fr 2fr',
                                      gap: '36px',
                                      paddingLeft: '20px',
                                      '@media (max-width: 768px)': {
                                          width: '100%',
                                          gridTemplateColumns: '4fr 0fr 0fr 4fr',

                                      },
                                  }}
                            >
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography
                                        fontSize="14px"
                                        mb='.5rem' sx={{color: '#818181'}}
                                        className={styles.mobText}
                                    >{localization[lang].studentsPanel.Student.name}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    '@media (max-width: 768px)': {display: 'none',}
                                }}>
                                    <Typography
                                        fontSize="14px"
                                        mb='.5rem' sx={{color: '#818181'}}
                                        className={styles.mobText}
                                    >{localization[lang].studentsPanel.Student.major}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    '@media (max-width: 768px)': {display: 'none',}
                                }}>
                                    <Typography
                                        fontSize="14px"
                                        mb='.5rem' sx={{color: '#818181'}}
                                        className={styles.mobText}
                                    >{localization[lang].studentsPanel.Student.graduationYear}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    '@media (max-width: 768px)': {
                                        marginLeft: "11rem"
                                    }
                                }}>
                                    <Typography
                                        fontSize="14px"
                                        mb='.5rem' sx={{color: '#818181'}}
                                        className={styles.mobText}
                                    >GPA
                                    </Typography>
                                </Box>
                            </Box>) : (<></>)}

                        <Box
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            alignItems="start"
                            sx={{
                                backgroundColor: 'white', borderRadius: '0 0 15px 15px', padding: '10px',
                                '@media (max-width: 768px)': {width: '100%',},
                            }}
                        >

                            {currentFavoriteDiplomaPage.map((e: any) => (
                                <Box
                                    key={e.id}
                                    onClick={() => {
                                        navigate(`/diploma/${e.id!}`);
                                    }}
                                    className={styles.diplomaItem}
                                    sx={{
                                        width: '100%',
                                        cursor: 'pointer',
                                        borderRadius: '10px',
                                        marginBottom: '1.5rem', display: 'flex',
                                        flexDirection: 'row', // Default layout for larger screens
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: 'white',
                                            width: "100%",
                                            display: 'grid',
                                            gridTemplateColumns: '7fr 1fr 1fr 1fr',
                                            gap: '36px',
                                            marginTop: '20px',
                                            paddingLeft: '20px',
                                            '@media (max-width: 768px)': {gridTemplateColumns: '12fr 1fr 0fr'}
                                        }}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            '@media (max-width: 768px)': {flexDirection: 'column'}
                                        }}>
                                            <Typography
                                                fontSize="20px"
                                                fontWeight="600"
                                                mb='.5rem'
                                                className={styles.mobText}
                                                sx={{width: '50%', '@media (max-width: 768px)': {width: '100%'}}}
                                            >
                                                {lang === 'en' ? e.name_en : e.name_ru}
                                            </Typography>
                                            <Typography fontSize="1rem" marginX="2rem" className={styles.mobTextSm}
                                                        sx={{
                                                            width: '70%',
                                                            '@media (max-width: 768px)': {
                                                                marginX: '0',
                                                                width: '100%'
                                                            }
                                                        }}>
                                                {e.qualification_kz ? e.qualification_kz.substring(0, e.qualification_kz.search("»") + 1) : ""}
                                            </Typography>
                                        </Box>

                                        {/* Specialty

                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginX: '1rem',
                                            '@media (max-width: 768px)': {display: 'none',}
                                        }}>
                                            {lang === 'en' ? e.speciality_en : e.speciality_ru}
                                        </Box>*/}



                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginX: '1rem',
                                            '@media (max-width: 768px)': {display: 'none',}
                                        }}>
                                            {e.year ? e.year : ""}
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                marginX: '1rem',
                                                flexDirection: 'column'
                                            }} // Adjust spacing as needed
                                        >
                                            <Typography fontSize="0.875rem">
                                                {e.gpa ? e.gpa : ""}
                                            </Typography>
                                        </Box>
                                        {/*<Box sx={{marginLeft: 'auto', marginRight: "3rem"}}>*/}
                                        {/*    <TwitterIcon/>*/}
                                        {/*</Box>*/}
                                        <Box alignItems='center' sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginLeft: '1rem',
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 viewBox="0 0 20 20" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M17.5 9.24728V13.4084C17.5 15.9889 17.5 17.2792 16.8882 17.8429C16.5965 18.1118 16.2282 18.2807 15.8359 18.3256C15.0133 18.4198 14.0527 17.5701 12.1315 15.8709C11.2823 15.1198 10.8577 14.7442 10.3664 14.6452C10.1245 14.5965 9.87548 14.5965 9.63356 14.6452C9.14229 14.7442 8.71768 15.1198 7.86847 15.8709C5.94728 17.5701 4.98668 18.4198 4.1641 18.3256C3.77179 18.2807 3.40351 18.1118 3.11176 17.8429C2.5 17.2792 2.5 15.9889 2.5 13.4084V9.24728C2.5 5.67344 2.5 3.88652 3.59835 2.77627C4.6967 1.66602 6.46447 1.66602 10 1.66602C13.5355 1.66602 15.3033 1.66602 16.4016 2.77627C17.5 3.88652 17.5 5.67344 17.5 9.24728ZM6.875 4.99935C6.875 4.65417 7.15482 4.37435 7.5 4.37435H12.5C12.8452 4.37435 13.125 4.65417 13.125 4.99935C13.125 5.34453 12.8452 5.62435 12.5 5.62435H7.5C7.15482 5.62435 6.875 5.34453 6.875 4.99935Z"
                                                      fill="#3B82F6"/>
                                            </svg>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                            }

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: "2rem"
                            }}>
                                {totalDiplomas != 0 ?
                                    (<Box style={{
                                        flex: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Pagination
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={(event, page) => setCurrentPage(page)}
                                            shape="rounded"
                                            color="primary"
                                            size="large"
                                        />
                                    </Box>) :
                                    (<Typography
                                        sx={{
                                            fontWeight: '800',
                                            fontSize: '25px',
                                            padding: '20px'
                                        }}>{localization[lang].studentsPanel.noFavorites}
                                    </Typography>)
                                }
                            </Box>
                        </Box>
                    </TabPanel>

                </Box>
            </Box>
        </Box>
    );
};