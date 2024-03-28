import React, {useEffect, useState} from 'react';
import {Box, Card, CardMedia, Typography, Pagination, useMediaQuery} from '@mui/material';
import {Button, Label, Input} from '@src/components';
import styles from './EmployerPage.module.css';
import {ReactComponent as SmartContractIcon} from '@src/assets/icons/smartContract_black.svg';
import {ReactComponent as Web} from '@src/assets/icons/web_black.svg';
import {ReactComponent as DiscordIcon} from '@src/assets/icons/discord_black.svg';
import {ReactComponent as TwitterIcon} from '@src/assets/icons/twitter_black.svg';
import {ReactComponent as Filter} from '@src/assets/icons/Tuning 2.svg';
import { ReactComponent as Telegram } from "@src/assets/icons/tgEmployer.svg";
import { ReactComponent as Linkedin } from "@src/assets/icons/inEmployer.svg";
import { ReactComponent as Instagram } from "@src/assets/icons/igEmployer.svg";
import { ReactComponent as Facebook } from "@src/assets/icons/fbEmployer.svg";
import { ReactComponent as Youtube } from "@src/assets/icons/ytEmployer.svg";
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
import icon from "@src/assets/icons/Logo (2).svg";
import {handleLink} from "@src/utils/link";
import {selectLanguage} from "@src/store/generals/selectors";
import {localization, employerData, employerNumData, titles} from '@src/pages/EmployerPage/generator';
import {selectUserState} from "@src/store/auth/selector";
import {fetchUserProfile} from "@src/store/auth/actionCreators";
import { ReactComponent as SingleCheck } from "@src/assets/icons/single check.svg";
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import exampleImage from '@src/assets/example/employerDetails.jpeg';

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

  const [showFull, setShowFull] = React.useState(false);

  const handleText = (text: string): string => {
      const matchesSm = useMediaQuery('(max-width:768px)');
      const trimLimit = matchesSm ? 85 : 115;
      return showFull ? text : text.substring(0, trimLimit) + "...";
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <Box display='flex' flexWrap='wrap' justifyContent="center" className={styles.mainContainer}>

        <Box sx={{display:'flex', flexDirection: 'column', justifyContent:"space-between", width:"100%"}}>

          <Box display='none' sx={{
              width: '100%', height: '25rem', display: 'flex', justifyContent: 'center',
              alignItems: 'center', position: 'relative', marginBottom: '1.88rem',
              '@media (max-width: 778px)': {
                  top: '2rem',
                  height: '15rem'
              },
          }}>
              <img src={userState && userState.avatar ? `${baseURL}/${userState.avatar}` : exampleImage} alt="employer"
                  style={{
                      objectFit: 'cover', width: '100%', height: '100%', borderRadius: '1.5rem'
                  }}
              />
          </Box>

          <Box display='flex' flexDirection='column' padding='1.88rem'
               sx={{
                 backgroundColor: 'white', borderRadius: '15px',
                 '@media (max-width: 768px)': {marginLeft: '0rem', marginTop: '1rem'}
               }}
          >
            <Box paddingY='0.5rem' sx={{
                position: "absolute", top: "26rem",
                '@media (max-width: 778px)': {
                    top: "15rem",
                    paddingLeft: "0.60rem"
                },
            }}
            >
                <img src={icon} alt="icon" style={{
                    width: '4rem',
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
                            {userState && userState.name ? userState.name : "Ф.И Работодателя"}
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
                            {userState && userState.field ? userState.field : "Сфера деятельности"}
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
                            ...(userState && userState.instagram_link && {
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
                            ...(userState && userState.telegram_link && {
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
                            ...(userState && userState.whatsapp_link && {
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
                            ...(userState && userState.linkedin_link && {
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
                            ...(userState && userState.facebook_link && {
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
                            if (userState[key as keyof typeof userState]) {
                                return (
                                    <Box key={index} display='flex' flexDirection='column'
                                        justifyContent='center' justifyItems='center' marginY='0.5rem'
                                    >
                                        <Typography>
                                            <span style={{ color: "#818181", fontSize: "16px" }}>
                                                {employerData[key as keyof typeof employerData][lang]}:
                                            </span>{" "}
                                            <span style={{ fontWeight: '600', fontSize: "16px" }}>
                                                {userState[key as keyof typeof userState]}
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
                                            {userState && userState[key as keyof typeof userState] ? userState[key as keyof typeof userState] : '-'}
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
                    {handleText(userState && userState.description ? userState.description : "")}
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
