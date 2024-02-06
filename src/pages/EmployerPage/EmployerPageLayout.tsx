import React, {useEffect, useState} from 'react';
import {Box, Card, CardMedia, Typography, Pagination} from '@mui/material';
import {Button, Label, Input} from '@src/components';
import styles from './EmployerPage.module.css';
import {ReactComponent as SmartContractIcon} from '@src/assets/icons/smartContract_black.svg';
import {ReactComponent as Web} from '@src/assets/icons/web_black.svg';
import {ReactComponent as DiscordIcon} from '@src/assets/icons/discord_black.svg';
import {ReactComponent as TwitterIcon} from '@src/assets/icons/twitter_black.svg';
import {ReactComponent as Filter} from '@src/assets/icons/Tuning 2.svg';
import {ReactComponent as Instagram} from '@src/assets/icons/instragram.svg';
import {ReactComponent as Telegram} from '@src/assets/icons/telegram.svg';
import {ReactComponent as Linkedin} from '@src/assets/icons/linkedin.svg';
import {ReactComponent as Facebook} from '@src/assets/icons/facebook.svg';
import {ReactComponent as Youtube} from '@src/assets/icons/youtube.svg';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchFavoriteDiplomas} from "@src/store/diplomas/actionCreators";
import {selectFavoriteDiplomas} from "@src/store/diplomas/selectors";
import {AnalyticsCard} from '@src/pages/UnivesrityDetailsPage/components/AnalyticsCard';
import {FacultyGraph} from '@src/pages/UnivesrityDetailsPage/components/FacultyGraph';
import {AnalyticsGraph} from '@src/pages/UnivesrityDetailsPage/components/AnalyticsGraph';
import {CitiesGraph} from '@src/pages/UnivesrityDetailsPage/components/CitiesGraph';
import {GenderGraph} from '@src/pages/UnivesrityDetailsPage/components/GenderGraph';
import {CitiesGrantsGraph} from '@src/pages/UnivesrityDetailsPage/components/CitiesGrantsGraph';
import {GrantsGraph} from '@src/pages/UnivesrityDetailsPage/components/GrantsGraph';
import univ from './../../assets/icons/FilterUn.svg';
import star from "./../../assets/icons/Star1.svg";
import share from "./../../assets/icons/share.svg";
import dots from "./../../assets/icons/Dots.svg";
import employreImg from "@src/assets/dashboard/employerImg.png";
import placeholdereImg from "@src/assets/dashboard/Image.jpg";
import cn from "classnames";
import icon from "@src/assets/icons/jasaim_icon.png";
import {handleLink} from "@src/utils/link";
import {selectLanguage} from "@src/store/generals/selectors";
import {localization} from '@src/pages/EmployerPage/generator';
import {selectUserState} from "@src/store/auth/selector";
import {fetchUserProfile} from "@src/store/auth/actionCreators";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

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

export const EmployerPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const lang = useSelector(selectLanguage);
    const userState = useSelector(selectUserState);
    const favoriteDiplomas = useSelector(selectFavoriteDiplomas);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [value, setValue] = React.useState(0);
    const [links, setLinks] = React.useState<any[]>([]);

    const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
    const diplomasPerPage = 10;
    const startIndex = (currentPage - 1) * diplomasPerPage;
    const endIndex = startIndex + diplomasPerPage;
    const totalDiplomas = favoriteDiplomas.length;
    const totalPages = Math.ceil(totalDiplomas / diplomasPerPage);
    const currentFavoriteDiplomaPage = favoriteDiplomas.slice(startIndex, endIndex);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const copyCurrentURLToClipboard = () => {
        console.log(userState)
        const currentURL = window.location.href;
        const textArea = document.createElement('textarea');
        textArea.value = currentURL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    const getIconForLink = (name: any, link: any): React.ReactNode => {
        const onClick = () => {
            handleLink(link);
        };
        if (name.includes('linkedin')) {
            return <Linkedin cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('facebook')) {
            return <Facebook cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('instagram')) {
            return <Instagram cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('telegram')) {
            return <Telegram cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('youtube')) {
            return <Youtube cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('discord')) {
            return <DiscordIcon cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        return <Web cursor="pointer" className={styles.social} onClick={onClick}/>;
    };

    React.useEffect(() => {
        dispatch(fetchFavoriteDiplomas());
    }, [!favoriteDiplomas]);

    React.useEffect(() => {
        dispatch(fetchFavoriteDiplomas());
    }, [!favoriteDiplomas]);

    React.useEffect(() => {
        let temp: any[] = [];
        for (let key in userState) {

            let value = userState[key];
            if (key.includes('link') && value) {
                temp.push({name: key, value: value});
            }
        }
        setLinks(temp);
    }, [userState, !links]);

    React.useEffect(() => {

        dispatch(fetchUserProfile());
        console.log(userState)
    }, [!userState]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box display='flex' flexWrap='wrap' justifyContent="center" className={styles.mainContainer}>

                <Box className={styles.upperContainer}>

                    <Box display='flex' flexDirection='column' sx={{backgroundColor: 'white', borderRadius: '15px',}}>
                        <Box display='flex' justifyContent='center'>
                            <Box sx={{
                                backgroundColor: '#3B82F6',
                                width: '100%',
                                marginX: "1rem",
                                height: '13rem',
                                borderRadius: '20px',
                                marginBoottom: '10px',
                                marginTop: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundImage: userState && userState.avatar ? `url(${baseURL}/${userState.avatar})` : `url(https://www.coinspot.com.au/public/img/learn/blockchain-applications-supply-chains.png)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                            }}>
                                <Box sx={{
                                    marginTop: "45%",
                                    backgroundColor: "white",
                                    padding: "1.25rem",
                                    borderRadius: "50%",
                                    border: "1px solid rgb(18, 33, 74, .7)"
                                }}>
                                    <img src={icon} style={{width: "2rem"}}/>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="center" margin="2rem">
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                <Typography
                                    className={styles.nameText}
                                    fontWeight='600'
                                    sx={{
                                        fontSize: '20px',
                                        padding: '1rem',
                                    }}>
                                    {userState ? userState.name : localization[lang].mainInfo.name}
                                </Typography>
                                <Label label={userState ? userState.position : localization[lang].mainInfo.position}/>
                                <Box display="flex" justifyContent="center" margin="1rem">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            marginX: '0.5rem'
                                        }}>
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                fontSize: '20px'
                                            }}>
                                            {userState ? userState.branches_amount : 1}
                                        </Typography>
                                        <Label label={localization[lang].mainInfo.places}/>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            marginX: '0.5rem'
                                        }}>
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                fontSize: '20px'
                                            }}>
                                            {userState ? userState.vacancy_amount : 12}
                                        </Typography>
                                        <Label label={localization[lang].mainInfo.vacancies}/>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            marginX: '0.5rem'
                                        }}>
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                fontSize: '20px'
                                            }}>
                                            {userState ? userState.hired_amount : 8}
                                        </Typography>
                                        <Label label={localization[lang].mainInfo.hired}/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box display='flex' flexDirection='column'
                         sx={{
                             backgroundColor: 'white',
                             borderRadius: '15px',
                             marginLeft: '1rem',
                             '@media (max-width: 768px)': {marginLeft: '0rem', marginTop: '1rem'}
                         }}>
                        <Box className={styles.mobP2}>
                            <Box display="flex" justifyContent="space-between">
                                <Box sx={{
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    color: '#4D4D4D',
                                    paddingBottom: '10px',
                                    '@media (max-width: 768px)': {margin: '0.5rem', fontSize: '20px'}
                                }}> {localization[lang].additionalInfo.mainInfo} </Box>
                                <Box marginBottom="15px" sx={{'@media (max-width: 768px)': {display: 'none'}}}>
                                    {/* <img src={star} style={{marginRight: '15px'}}/>  */}
                                    <img src={share}
                                         style={{
                                             marginRight: '10px',
                                             marginLeft: '10px',
                                             width: '25px',
                                             height: '25px', cursor: 'pointer'
                                         }}
                                         onClick={copyCurrentURLToClipboard}
                                         alt="Share Icon"/>
                                    {/* <img src={dots} style={{marginRight: '10px'}}/> */}
                                </Box>
                                <Box marginBottom="15px"
                                     sx={{display: 'none', '@media (max-width: 768px)': {display: 'flex'}}}>
                                    <img src={dots} style={{
                                        marginRight: '1rem',
                                        marginTop: '0.5rem',
                                        transform: 'rotate(90deg)'
                                    }}/>
                                </Box>
                            </Box>
                            <Box marginTop="0.5rem" marginBottom="0.5rem" display="flex" alignItems="center">
                                {links.map((link: any, index: number) => (
                                    <Box key={link["name"] + "Box"} marginRight="1rem">
                                        {getIconForLink(link["name"], link["value"])}
                                    </Box>
                                ))}
                            </Box>
                            <Typography
                                className={styles.textSm}
                                color="#818181"
                                sx={{fontSize: '14px', '@media (max-width: 768px)': {marginLeft: '0.5rem'}}}>
                                {userState ? userState.description : localization[lang].additionalInfo.description}
                            </Typography>
                        </Box>
                        <Box display="flex" className={styles.mobP15} style={{overflowX: "scroll", marginTop: "auto"}}
                             overflow="hidden">
                            {[
                                {"image": "https://jasaim.kz/wp-content/uploads/2023/05/Syrym-CEO.webp"},
                                {"image": "https://jasaim.kz/wp-content/uploads/2023/05/Alikhan-CTO.webp"},
                                {"image": "https://jasaim.kz/wp-content/uploads/2023/05/Alisher-techlead.webp"},
                                {"image": "https://jasaim.kz/wp-content/uploads/2023/05/5.webp"},
                                {"image": "https://jasaim.kz/wp-content/uploads/2023/05/Kunya-CFO.webp"}
                            ].map((el, index) =>
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={el.image}
                                    className={cn(styles.img)}
                                    sx={{width: '25%', margin: "0.5rem"}}
                                />
                            )}

                        </Box>
                    </Box>
                </Box>


                <Box className={styles.contentContainer}>
                    <Box sx={{width: '100%'}}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="start"
                            sx={{backgroundColor: 'white', borderRadius: '15px', width: '100%',}}
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
                                <Box display="flex" alignItems="center">
                                    <Box display="flex" alignItems="center">
                                        <Input
                                            type="text"
                                            name="email"
                                            placeholder={localization[lang].studentsPanel.search}
                                            className={styles.input}
                                        />
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
                                          gridTemplateColumns: '4fr 4fr 1fr 1fr',
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
                                    backgroundColor: 'white', borderRadius: '15px', padding: '10px',
                                    '@media (max-width: 768px)': {width: '100%',},
                                }}
                            >

                                {currentFavoriteDiplomaPage.map((e: any) => (
                                    <Box
                                        key={e.id}
                                        onClick={() => {
                                            navigate(`/diploma/${e.id!}/1`);
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
                                                width: "100%",
                                                display: 'grid',
                                                gridTemplateColumns: '8fr 1fr 1fr',
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
                        <TabPanel value={value} index={1}>
                            <Box display='flex' flexWrap={"wrap"} flexBasis={"2"} gap='1rem 1rem'>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: "24px",
                                    marginBottom: '35px',
                                    '@media (max-width: 1335px)': {
                                        '& > div': {
                                            width: '48%'
                                        },
                                        justifyContent: 'space-between',
                                        marginRight: '2%'
                                    },
                                    '@media (max-width: 700px)': {
                                        '& > div': {
                                            width: '98%'
                                        },
                                        marginRight: 0
                                    },
                                }}>
                                    <AnalyticsCard text="Количество выпускников" number={705}/>
                                    <AnalyticsCard text="Выпускники бакалавриата" number={554}/>
                                    <AnalyticsCard text="Выпускники магистратуры" number={151}/>
                                    <AnalyticsCard text="Средний гпа" number={3.07}/>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    marginBottom: "32px",
                                    '@media (max-width: 1335px)': {
                                        flexDirection: "column",
                                        gap: "32px"
                                    }
                                }}>
                                    <Box sx={{
                                        flex: 3,
                                        display: "flex",
                                        gap: "32px",
                                        flexDirection: "column"
                                    }}>
                                        <FacultyGraph/>
                                        <AnalyticsGraph/>
                                        <GenderGraph/>
                                    </Box>
                                    <Box sx={{
                                        flex: 1,
                                        display: "flex",
                                        gap: "32px",
                                        flexDirection: "column",
                                        '@media (max-width: 1335px)': {
                                            flexDirection: "row"
                                        },
                                        '@media (max-width: 700px)': {
                                            flexDirection: "column",
                                            width: "100%",
                                            '& > div': {
                                                maxWidth: "100%"
                                            }
                                        }
                                    }}>
                                        <CitiesGraph/>
                                        <CitiesGrantsGraph/>
                                        <GrantsGraph/>
                                    </Box>
                                </Box>

                            </Box>
                        </TabPanel>
                    </Box>

                </Box>


            </Box>
        </Box>
    )
};
