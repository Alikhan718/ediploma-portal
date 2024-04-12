import React, {useState} from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  Divider,
  Menu,
  MenuItem,
  IconButton, Alert, Snackbar, Skeleton, Button as MuiButton
} from '@mui/material';
import {Button, Label} from '@src/components';
import {ReactComponent as ExpandMore} from '@src/assets/icons/expand_more.svg';
import {ReactComponent as DownloadIcon} from '@src/assets/icons/download.svg';
import {ReactComponent as ShareIcon} from '@src/assets/icons/share.svg';
import star from "./../../assets/icons/Star1.svg";
import dots from "./../../assets/icons/Dots.svg";
import pen from "./../../assets/icons/penSquare.svg";
import {ReactComponent as Eye} from "@src/assets/icons/eye.svg";
import {ReactComponent as Star} from "@src/assets/icons/star.svg";
import {ReactComponent as Check} from "@src/assets/icons/checkss.svg";
import {useNavigate, useParams} from "react-router-dom";
import {SwitchDetails} from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";
import styles from './StudentPage.module.css';
import userImg from "@src/assets/dashboard/Image.jpg";
import cn from "classnames";
import {routes} from "@src/shared/routes";
import {useDispatch, useSelector} from "react-redux";
import {fetchDiplomas, fetchGraduateDetails} from "@src/store/diplomas/actionCreators";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import {isAuthenticated} from "@src/utils/userAuth";
import {handleDownload, handleLink} from "@src/utils/link";
import {selectUserRole, selectUserState} from "@src/store/auth/selector";
import {fetchUserProfile} from '@src/store/auth/actionCreators';
import {selectLanguage} from "@src/store/generals/selectors";
import {localization, skillsList} from '@src/pages/StudentPage/generator';
import {RatingDisplay} from '@src/components/RatingDisplay/RatingDisplay';
import {ShareButton} from '@src/components/ShareButton/ShareButton';
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
import { ReactComponent as Link } from '@src/assets/icons/Link.svg';
import { ReactComponent as WhatsApp } from '@src/assets/icons/wpDiploma.svg';
import { ReactComponent as Email } from '@src/assets/icons/emailDiploma.svg';
import { ReactComponent as Qr } from '@src/assets/icons/qrDiploma.svg';
import { ReactComponent as PdfIcon } from '@src/assets/icons/pdfIcon.svg';
import { ReactComponent as DownloadResume } from '@src/assets/icons/downloadResume.svg';
import { ReactComponent as ChartResume } from '@src/assets/icons/chartResume.svg';
import { ReactComponent as AddDipoma } from '@src/assets/icons/addDiploma.svg';
import { ReactComponent as EditProfile } from '@src/assets/icons/editProfile.svg';
import { ReactComponent as ChartIcon } from '@src/assets/icons/Chart.svg';
import QRCode from "react-qr-code";

export const StudentPageLayout: React.FC = () => {
  const lang = useSelector(selectLanguage);
  const [showFull, setShowFull] = React.useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const role = useSelector(selectUserRole);
  const userState = useSelector(selectUserState);
  const [images, setImages] = React.useState<string[]>([]);
  const [showResumeGenerator, setShowResumeGenerator] = React.useState(true);
  const [showQR, setShowQR] = React.useState(false);
  const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

  const [data, setData] = React.useState<any>();

  let diplomaList = useSelector(selectDiplomaList);

  React.useEffect(() => {
    if (data && data.image) {
      let linksArray: string[] = data.image.split(',').map((link: string) => link.trim());
      setImages(linksArray);
    }
  }, [data]);

  React.useEffect(() => {
    if (id == undefined) {
      dispatch(fetchDiplomas());
    }
  }, [!diplomaList]);

  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  React.useEffect(() => {
    setData(userState);
  }, [userState]);

  React.useEffect(() => {
    if (isAuthenticated() && data && id != undefined) {
      dispatch(fetchGraduateDetails({ name: data.name_en }));
    } else if (data && data.name) {
      dispatch(fetchGraduateDetails({ name: data.name }));
      console.log(data);
    }
  }, [data]);

  const currentUrl = data && data.university_id ? `https://app.ediploma.kz/${data.university_id}/${generateHash(data.iin, 'hashotnursa')}` : `https://app.ediploma.kz/hr-bank`;
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleText = (text: string): string => {
    const matchesSm = window.innerWidth <= 768;
    const trimLimit = matchesSm ? 85 : 115;
    return showFull ? text : text.substring(0, trimLimit) + "...";
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const generateAccessToken = (): string => {
    const validityDuration = 24 * 60 * 60 * 1000; // 24 hours validity
    const expirationTime = Date.now() + validityDuration;
    return btoa(expirationTime.toString());
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
    1: `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&issueYear=2023&issueMonth=7&certUrl=${currentUrl}&certId=${"1234"}`,
    2: `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&issueYear=2023&certUrl=${currentUrl}&certId=${"1234"}`,
  };

  const defaultLink = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=NFT%20Diploma&organizationId=1337&certUrl=${currentUrl}&certId=${"1234"}`;

  function generateHash(text: string, key: string) {
    if (!text || !key) {
      return "";
    }

    let nHash = "";
    for (let i = 0; i < text.length; i++) {
      nHash += String.fromCharCode((((text.charCodeAt(i) - 48) + (key.charCodeAt(i % key.length) - 97)) % 26) + 97);
    }
    return nHash;
  }


  const extractSpeciality = (value: string) => {
    return value?.substring(value.search("«"), value.search("»") + 1);
  };

  const getSpecialityName = () => {
    let noData = "";
    if (lang === 'ru') {
      noData = "Недостаточно данных";
      return userState?.diploma_degree ? userState.speciality_ru : extractSpeciality(userState?.speciality_ru);
    }
    if (lang === 'kz') {
      noData = "Ақпарат жеткіліксіз";
      return userState?.diploma_degree ? userState.speciality_kz : extractSpeciality(userState?.speciality_kz);
    }
    if (lang === 'en') {
      noData = "No userState";
      return userState?.diploma_degree ? userState.speciality_en : extractSpeciality(userState?.speciality_en);
    }
    return noData;
  };

  interface MajorLocales {
    Bachelor: {
      ru: string;
      kz: string;
      en: string;
    };
    Master: {
      ru: string;
      kz: string;
      en: string;
    };
  }

  const majorLocales: MajorLocales = {
    "Bachelor": {
      'ru': "Бакалавр",
      'kz': "Бакалавр",
      'en': "Bachelor"
    },
    "Master": {
      'ru': "Магистр",
      'kz': "Маигстр",
      'en': "Master"
    }
  };
  const getMajorName = () => {
    let noData = "";

    if (lang === 'ru') {
      noData = "Недостаточно данных";
      return userState?.diploma_degree ? majorLocales[userState.diploma_degree as keyof typeof majorLocales][lang] : userState?.speciality_ru?.split("\n")[0];
    }
    if (lang === 'kz') {
      noData = "Ақпарат жеткіліксіз";
      return userState?.diploma_degree ? majorLocales[userState.diploma_degree as keyof typeof majorLocales][lang] : userState?.speciality_kz?.split("\n")[0];
    }
    if (lang === 'en') {
      noData = "No userState";
      return userState?.diploma_degree ? majorLocales[userState.diploma_degree as keyof typeof majorLocales][lang] : userState?.speciality_en?.split("\n")[0];
    }
    return noData;
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "center", width: "100%"}}>
      <Box
        display='flex'
        flexWrap='wrap'
        width='100%'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: "100%"
        }}
      >

        <Box sx={{
          width: '100%',
          marginX: "1.5rem",
          '@media (max-width: 778px)': {
            marginX: '0rem',
            margin: '0rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingX: '1.5rem'
          },
        }}>
          <Box display='flex' flexDirection='column' sx={{ backgroundColor: 'transparent', borderRadius: '15px', }}>
            <Box>
              <Box
                display="flex" alignItems="center"
                sx={{
                  width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '1.5rem', padding: '1.75rem',
                  '@media (max-width: 778px)': {
                    backgroundColor: 'white', borderRadius: '1rem', padding: '0.75rem',
                    margin: '0rem', flexDirection: 'column', position: 'relative',
                  }
                }}
              >
                <Box sx={{
                  display: 'none',
                  '@media (max-width: 778px)': { display: 'flex', cursor: 'pointer', position: 'absolute', right: '0.75rem', top: '0.75rem' }
                }} onClick={() => { navigate(routes.settings) }}
                >
                  <EditProfile />
                </Box>
                <CardMedia
                  component="img" image={userImg} className={cn(styles.img)}
                  sx={{
                    width: '10.25rem', height: '10.25rem',
                    borderRadius: '9rem', objectFit: 'cover', marginRight: '1.5rem',
                    '@media (max-width: 778px)': {
                      width: '6.25rem', height: '6.25rem', marginRight: '0',
                      borderRadius: '9rem', objectFit: 'cover', gap: 0,
                    },
                  }}
                />
                <Box
                  alignItems="center"
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    margin: "1rem",
                    '@media (max-width: 778px)': {
                      margin: '0rem',
                      alignItems: 'center',
                    },

                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                      '@media (max-width: 778px)': {
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        '@media (max-width: 778px)': {
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }
                      }}
                    >
                      <Box sx={{
                        display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem',
                        '@media (max-width: 778px)': { justifyContent: 'center', marginBottom: 0 },
                      }}>
                        <Typography
                          fontWeight='600'
                          sx={{
                            fontSize: '24px',
                            '@media (max-width: 778px)': {
                              textAlign: 'center',
                              fontSize: '22px',
                              paddingBottom: '0',
                            },
                          }}
                        >
                          {data && data.name_kz ? data.name_kz : userState.name ? userState.name : ""}
                        </Typography>
                        <Box sx={{
                          '@media (max-width: 778px)': { display: 'none' }, cursor: 'pointer',
                        }} onClick={() => { navigate(routes.settings) }}
                        >
                          <EditProfile />
                        </Box>

                      </Box>
                      <Typography
                        fontWeight='500'
                        sx={{
                          paddingBottom: '14px',
                          fontSize: '0.75rem',
                          display: 'none',
                          '@media (max-width: 778px)': {
                            display: 'block',
                          },
                        }}
                      >
                        {"Студент"}
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap', marginBottom: '1rem', gap: '1rem',
                        '@media (max-width: 778px)': {
                          flexWrap: 'nowrap',
                          display: 'flex',
                          gap: '1rem'
                        },
                      }}>
                        <Box>
                          <EmailShareButton
                            url={currentUrl}
                            subject={"Приглашение на платформу"}
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
                            <Email style={{width: '1.5rem', height: '1.5rem'}}/>
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
                            <Linkedin/>
                          </a>
                        </Box>
                        <Box>
                          <TelegramShareButton
                            url={currentUrl}
                            title={"Jasaim | Мой NFT диплом доступен к просмотру по данной ссылке: "}
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
                            <Telegram style={{width: '1.5rem', height: '1.5rem'}}/>
                          </TelegramShareButton>
                        </Box>
                        <Box>
                          <WhatsappShareButton
                            url={currentUrl}
                            title={"Jasaim | Мой NFT диплом доступен к просмотру по данной ссылке: "}
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
                            <WhatsApp style={{width: '1.5rem', height: '1.5rem'}}/>
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
                            onClick={() => { setShowQR(true) }}
                          >
                            <Qr style={{width: '1.5rem', height: '1.5rem'}}/>
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
                            <Link style={{width: '1.5rem', height: '1.5rem'}}/>
                          </IconButton>
                        </Box>
                      </Box>
                      {
                        userState && userState.resume_link ?
                          (<Box
                            sx={{
                              display: 'none',
                              '@media (max-width: 778px)': {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: "#F4F7FE",
                                width: '100%',
                              },
                            }}>
                            <Box
                              sx={{display: 'flex', flexDirection: 'flex-start', alignItems: 'center', gap: '0.5rem'}}>
                              <Box sx={{width: '2.25rem', height: '2.25rem', flexShrink: 0}}>
                                <PdfIcon/>
                              </Box>
                              <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: '0.25rem',
                                flex: '1 0 0',
                              }}>
                                <Typography sx={{fontSize: '0.75rem', color: '#9499AB'}}>
                                  Выше резюме
                                </Typography>
                                <Typography sx={{fontSize: '0.75rem', color: '#111C44'}}>
                                  {data && data.name_kz ? data.name_kz : userState.name ? userState.name : ""}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{cursor: "pointer",}} onClick={() => handleLink(userState.resume_link)}>
                              <DownloadResume/>
                            </Box>
                          </Box>) :
                          <Box
                            sx={{
                              display: 'none',
                              '@media (max-width: 778px)': {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: "#F4F7FE",
                                width: '100%',
                              },
                            }}>
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'flex-start',
                              alignItems: 'center',
                              gap: '1rem',
                              marginBottom: '0.75rem',
                              width: '100%'
                            }}>
                              <Box sx={{width: '4.125rem', height: '4.125rem'}}>
                                <ChartResume/>
                              </Box>
                              <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: '0.25rem',
                                flex: '1 0 0',
                              }}>
                                <Typography sx={{fontSize: '1.25rem', color: '#293357', fontWeight: 600}}>
                                  Мое резюме
                                </Typography>
                                <Typography sx={{fontSize: '0.75rem', color: '#58607C'}}>
                                  Создайте 2 строк
                                </Typography>
                              </Box>
                            </Box>
                            <MuiButton fullWidth
                              sx={{
                                borderRadius: "3rem", backgroundColor: "#3B82F6",
                                color: "white",
                                '&:hover': {
                                  backgroundColor: "#1565C0",
                                }
                              }}
                              onClick={() => { navigate(routes.resumeGenerator) }}>
                              Продолжить
                            </MuiButton>
                          </Box>
                      }
                    </Box>
                    {id != undefined &&
                        <Box marginBottom="15px"
                             sx={{
                               '@media (max-width: 778px)': {
                                 display: 'none'
                               }
                             }}
                        >
                            <img src={star} style={{marginRight: '5px'}}
                                 className={styles.desktopIcon}/>
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                className={styles.desktopIcon}
                            >
                                <img
                                    src={dots}
                                    style={{marginRight: '1.4rem', marginBottom: '0.6rem'}}
                                    className={styles.desktopIcon}
                                />
                            </Button>

                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {
                                  navigate(routes.main);
                                }}>
                                    <Eye style={{marginRight: '10px', verticalAlign: "center"}}/>
                                    <Typography>{localization[lang].Menu.goto}</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose}><Star
                                    style={{marginRight: '10px', verticalAlign: "center"}}/>
                                    <Typography>{localization[lang].Menu.favorite}</Typography></MenuItem>
                                <MenuItem onClick={handleClose}><ShareIcon
                                    style={{marginRight: '10px', verticalAlign: "center"}}/>
                                    <Typography>{localization[lang].Menu.share}</Typography></MenuItem>
                                <Divider style={{margin: "0 1rem"}}/>
                                <MenuItem onClick={handleClose}><Check
                                    style={{marginRight: '10px', verticalAlign: "center"}}/>
                                    <Typography>Etherscan</Typography></MenuItem>
                            </Menu>


                            <img src={pen} style={{marginLeft: '2rem', marginTop: '-4.5rem'}}
                                 className={styles.tabletIcon}/>
                        </Box>
                    }

                  </Box>
                  <Box
                    display="none"
                    alignItems="center"
                    sx={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                      '@media (max-width: 778px)': {
                        display: 'none'
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box marginRight="1rem">
                        <Box sx={{
                          "@media (max-width: 998px)": {
                            marginRight: "0rem",
                            marginBottom: "18px",

                          },
                        }}>
                          <Label label={localization[lang].MainInfo.nameUni}/>
                        </Box>
                        <Label label={localization[lang].MainInfo.major}/>
                        <Label label={localization[lang].MainInfo.degree}/>
                        <Label label={localization[lang].MainInfo.graduationYear}/>
                      </Box>
                      <Box marginLeft="0.2rem">
                        <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                    sx={{fontSize: '0.875em'}}>
                          {
                            userState ? ( // Check if userState is defined
                              userState.university_name
                                ? userState.university_name :
                                (userState.university_id && userState.university_id === 1
                                  ? localization[lang].MainInfo.kbtu
                                  : localization[lang].MainInfo.noData)
                            ) : localization[lang].MainInfo.noData // Handle case where data is undefined
                          }
                        </Typography>
                        <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                    sx={{fontSize: '0.875em'}}>
                          {getSpecialityName()}
                        </Typography>
                        <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                    sx={{fontSize: '0.875em'}}>
                          {getMajorName()}
                        </Typography>
                        <Typography className={styles.nameText} fontWeight='500' mb='3px'
                                    sx={{fontSize: '0.875em'}}>
                          {userState && userState.year ? userState.year : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="none" gap="1rem"
                    sx={{ '@media (max-width: 778px)': { display: 'none' } }}
                  >
                    {!userState?.first_name && <Button
                      buttonSize="s"
                      variant="contained"
                      type="button"
                      sx={{
                        borderRadius: '25px',
                        marginTop: '1rem',
                      }}
                      disabled>
                      {localization[lang].AddInfo.sendInvite}
                    </Button>
                    }
                    {/* {userState && userState.resume_link &&
                      <Button
                        buttonSize="s"
                        color={"success"}
                        variant="contained"
                        type="button"
                        sx={{
                          borderRadius: '25px',
                          marginTop: '1rem',
                        }}
                        onClick={() => handleLink(userState.resume_link)}
                      >
                        {localization[lang].AddInfo.downloadResume}
                      </Button>
                    } */}

                  </Box>

                </Box>
              </Box>
              <Box sx={{
                display: 'block',
                backgroundColor: 'white',
                padding: '1.75rem',
                borderRadius: '1.5rem',
                '@media (max-width: 778px)': {
                  display: "block",
                  borderRadius: '1rem',
                  padding: '1rem',
                },
                marginTop: '1rem',
                minWidth: '21rem',
                marginBottom: '1rem',
              }}>
                <Box sx={{
                  fontSize: '24px', fontWeight: '600', marginBottom: '1.25rem',
                  '@media (max-width: 778px)': {
                    fontSize: '20px',
                    paddingBottom: '10px'
                  },
                }}>
                  О Выпускнике
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    marginBottom: '1.25rem', '@media (max-width: 778px)': { marginBottom: '0.5rem', }
                  }}
                >
                  <Box
                    sx={{
                      width: '25%',
                      '@media (max-width: 778px)': {
                        width: '50%'
                      }
                    }}
                  >
                    <Typography sx={{
                      fontSize: '1rem', color: '#9499AB',
                      '@media (max-width: 778px)': { fontSize: '0.875rem', }
                    }}
                    >
                      Номер телефона
                    </Typography>
                    <Typography sx={{
                      fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', }
                    }}
                    >
                      {data && data.phone ? data.phone : "-"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%' } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Почта
                    </Typography>
                    <Typography sx={{
                      fontSize: '1rem', overflowWrap: 'break-word', wordBreak: 'break-all',
                      '@media (max-width: 778px)': { fontSize: '0.875rem', }
                    }}
                    >
                      {data && data.email ? data.email : "-"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { display: 'none' } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Дата рождения
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {data && data.diploma_date_of_birth ? data.diploma_date_of_birth : "-"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { display: 'none', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Национальность
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Казах
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'none', marginBottom: '0.5rem', '@media (max-width: 778px)': { display: 'flex', fontSize: '0.875rem', } }}>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Дата рождения
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {data && data.diploma_date_of_birth ? data.diploma_date_of_birth : "-"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Национальность
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Казах
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '1.25rem', '@media (max-width: 778px)': { marginBottom: '0.5rem', } }}>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Город
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {data && data.diploma_city ? data.diploma_city : "Алмата"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Регион
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {data && data.diploma_region ? data.diploma_region : "-"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { display: 'none', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Название вуза
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {
                        data && data.university_id && data.university_id == 1 ? 'КБТУ' :
                          data && data.university_id && data.university_id == 2 ? 'АГП' :
                            data && data.university_id && data.university_id == 3 ? 'Сатпаев Университет' :
                              '-'
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { display: 'none', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Степень
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {
                        data && data.diploma_degree ?
                          data.diploma_degree == 'Bachelor' ? lang == 'ru' ? 'Бакалавр' : lang == 'kz' ? 'Бакалавр' : 'Bachelor'
                            : data.diploma_degree : "-"
                      }
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'none', marginBottom: '0.5rem', '@media (max-width: 778px)': { display: 'flex', } }}>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Название вуза
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {
                        userState ? ( // Check if userState is defined
                          userState.university_name
                            ? userState.university_name :
                            (userState.university_id && userState.university_id === 1
                              ? localization[lang].MainInfo.kbtu
                              : localization[lang].MainInfo.noData)
                        ) : localization[lang].MainInfo.noData // Handle case where data is undefined
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '25%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Степень
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {
                        data && data.diploma_degree ? data.diploma_degree : "-"
                      }
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '1.25rem', '@media (max-width: 778px)': { marginBottom: '0.5rem', } }}>
                  <Box sx={{ width: '50%', '@media (max-width: 778px)': { width: '100%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Специальность
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {
                        data && lang === 'ru' && data.speciality_ru ? data.speciality_ru :
                          data && lang === 'kz' && data.speciality_kz ? data.speciality_kz :
                            data && lang === 'en' && data.speciality_en ? data.speciality_en :
                              '-'
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { display: 'none', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      GPA
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {
                        data && data.gpa ? data.gpa : "-"
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { display: 'none', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Дата окончания
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {data && data.year ? data.year : ""}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'none', marginBottom: '0.5rem', '@media (max-width: 778px)': { display: 'flex', } }}>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      GPA
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {
                        data && data.diploma_gpa ? data.diploma_gpa : "-"
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%', '@media (max-width: 778px)': { width: '50%', } }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Дата окончания
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      {data && data.year ? data.year : ""}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '1rem', color: '#9499AB', '@media (max-width: 778px)': { fontSize: '0.875rem', } }}>
                      Академический рейтинг
                    </Typography>
                    <Box display="flex" marginTop="0.25rem">
                      {data && data.rating ? <RatingDisplay academicRating={Number(data.rating)}/> : "-"}
                      <Box marginLeft='0.5rem'>{ data && data.rating }</Box>
                      <Box marginLeft="0.5rem"> {} </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'none', marginBottom: '0.5rem', '@media (max-width: 778px)': { display: 'flex', } }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      О себе
                    </Typography>
                    <Typography sx={{fontSize: '0.875rem'}}>
                      {data && data.description ? data.description : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{
                marginY: '2rem', backgroundColor: 'white', padding: '1.75rem', borderRadius: '1.5rem',
                '@media (max-width: 778px)': {
                  borderRadius: '1rem',
                  padding: '0.75rem',
                },
              }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box sx={{
                    fontSize: '24px', fontWeight: '600', paddingBottom: '10px',
                    '@media (max-width: 778px)': {
                      fontSize: '20px',
                      paddingBottom: '0rem',
                    },
                  }}> {localization[lang].AddInfo.certifications} </Box>
                  <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => { navigate(routes.settings) }}>
                    <AddDipoma />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {data && data.image &&
                    images.map((image, index) => {
                      return (
                        <Box width='25%' height='100%' key={index} sx={{
                          backgroundColor: "#F4F7FE",
                          borderRadius: "1rem",
                          padding: ".7rem",
                          marginTop: "1rem",
                          '@media (max-width: 778px)': {
                            width: '100%'
                          },
                        }}>

                          <Card
                            elevation={0}
                            sx={{
                              display: 'flex',
                              width: "100%", flexDirection: 'column', alignItems: 'center',
                              cursor: "pointer",
                              borderRadius: "10px",

                            }}
                          >
                            <CardMedia
                              component="img"
                              className={styles.diplomaImg}
                              sx={{
                                width: "100%",
                                position: "relative",
                                display: imageLoaded ? "block" : "none"
                              }}
                              image={image}
                              alt="University Image"
                              onLoad={handleImageLoad}
                            />
                            <Skeleton variant="rectangular" width={300} height={200}
                              sx={{ display: imageLoaded ? "none" : "block" }}
                              animation="wave" />

                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: "100%",
                              marginTop: "-3rem",
                              justifyContent: "space-between",
                              padding: "0 .5rem .5rem .5rem",
                              zIndex: "10"
                            }}>
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
                                  navigator.clipboard.writeText(currentUrl);
                                  setAlertOpen(true);
                                }}
                              >
                                <ShareIcon style={{ width: "20", filter: "brightness(10)" }} />
                              </IconButton>
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
                                  let link = data && data.image ? image : "";
                                  handleDownload(link, data && data.name_en ? data.name_en : "diploma");
                                }}
                              >

                                <DownloadIcon style={{ width: "20", filter: "brightness(10)" }} />
                              </IconButton>
                            </Box>
                          </Card>
                        </Box>
                      )
                    })
                  }
                </Box>

              </Box>
              <Box sx={{
                display: 'block',
                backgroundColor: 'white',
                borderRadius: '1.5rem',
                padding: '1.75rem',
                '@media (max-width: 778px)': {
                  borderRadius: '1rem',
                  padding: '1rem',
                },
                marginTop: '1rem',
                width: '100%'
              }}>
                <Box sx={{
                  '@media (max-width: 778px)': {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start'
                  }
                }}>
                  <Box sx={{
                    fontSize: '24px', fontWeight: '600', paddingBottom: '10px',
                    '@media (max-width: 778px)': {
                      fontSize: '20px',
                      marginBottom: '0.75rem',
                    },
                  }}> Навыки </Box>
                  <Box sx={{ display: 'none', '@media (max-width: 778px)': { display: 'flex', cursor: 'pointer' } }}
                    onClick={() => { navigate(routes.settings) }}
                  >
                    <EditProfile />
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignSelf: 'stretch', '@media (max-width: 778px)': { gap: '0.75rem' }
                }}>
                  {data && data.speciality_ru && skillsList.hasOwnProperty(data.speciality_ru) ? (skillsList[data.speciality_ru as keyof typeof skillsList][lang].slice(0, 10).map((skill: any, index: any) => {
                    return (
                      <Box key={index} sx={{
                        display: 'flex',
                        justifyContent: 'center', alignItems: 'center',
                        backgroundColor: '#F4F7FE', borderRadius: '0.5rem',
                        padding: '0.5rem 1rem', height: '2rem', gap: '0.25rem',
                        '@media (max-width: 778px)': {
                          backgroundColor: '#F4F7FE', borderRadius: '1.5rem', padding: '0.5rem', height: '1.5rem',
                        }
                      }}>
                        <Typography
                          color="black"
                          sx={{
                            marginLeft: '1rem',
                            marginRight: '1rem',
                            fontSize: '0.875rem',
                            "@media (max-width: 778px)": {
                              fontSize: '0.75rem',
                              marginLeft: '0.5rem',
                              marginRight: '0.5rem',
                            }
                          }}
                        >
                          {skill}
                        </Typography>
                      </Box>
                    )
                  })) : <></>}
                </Box>
              </Box>
              <Box display='none' margin="1rem" sx={{
                '@media (max-width: 778px)': {
                  margin: '0.9rem',
                  display: 'none'
                },
              }}>
                <SwitchDetails/>
              </Box>
              <Snackbar open={alertOpen} autoHideDuration={2000}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success"
                       sx={{width: '100%'}}>
                  {localization[lang].Alert.copied}
                </Alert>
              </Snackbar>
              <Box sx={{
                display: data && !data.resume_link && showResumeGenerator ? 'flex' : 'none', flexDirection: 'column', width: '33.3125rem', padding: '1.75rem',
                alginItems: 'flex-start', position: 'fixed', bottom: 0, left: 0, borderRadius: '1.5rem', backgroundColor: 'white',
                margin: '2rem', boxShadow: '0px 36px 48px 0px rgba(207, 215, 226, 0.60)', zIndex: 1000,
                '@media (max-width: 778px)': {
                  width: '100%', margin: 0, padding: '1rem'
                }
              }}>
                <IconButton
                  sx={{ position: 'absolute', width: '2.5rem', height: '2.5rem', top: '1rem', right: '1rem' }}
                  onClick={(): void => { setShowResumeGenerator(false); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.72212 3.72505C3.9662 3.48097 4.36193 3.48097 4.606 3.72505L9.99742 9.11647L15.3888 3.7251C15.6329 3.48102 16.0286 3.48102 16.2727 3.7251C16.5168 3.96918 16.5168 4.3649 16.2727 4.60898L10.8813 10.0004L16.2726 15.3917C16.5167 15.6357 16.5167 16.0315 16.2726 16.2756C16.0285 16.5196 15.6328 16.5196 15.3887 16.2756L9.99742 10.8842L4.60605 16.2756C4.36198 16.5197 3.96625 16.5197 3.72217 16.2756C3.47809 16.0315 3.47809 15.6358 3.72217 15.3917L9.11354 10.0004L3.72212 4.60893C3.47804 4.36486 3.47804 3.96913 3.72212 3.72505Z" fill="#CFD2D8" />
                  </svg>
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <Box marginRight='1.5rem'>
                    <ChartResume />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: '125%', marginBottom: '0.75rem' }}>
                      {'Генератор резюме'}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 400, lineHeight: '125%' }}>
                      {'Чтобы находить работу, проекты и задачи создайте резюме на портале и работадатели'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    buttonSize="s"
                    variant="contained"
                    type="button"
                    sx={{ borderRadius: '25px' }}
                  >
                    Начать
                  </Button>
                </Box>
              </Box>
              <Box sx={{
                display: showQR ? 'flex' : 'none', flexDirection: 'column', alginItems: 'center', position: 'fixed', 
                backgroundColor: 'white', boxShadow: '0px 36px 48px 0px rgba(207, 215, 226, 0.60)', zIndex: 1000,
                justifyContent: 'center', borderRadius: '1.25rem', padding: '1rem 2.25rem 1rem', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                '@media (max-width: 778px)': {
                  display: showQR ? 'flex' : 'none',
                  width: '100%', margin: 0,
                  borderRadius: '1.25rem 1.25rem 0rem 0rem',
                  padding: '1rem 2.25rem 1rem', height: '60%',
                  gap: '1.25rem', bottom: 0, left: 0,
                  transform: 'none', top: 'auto',
                }
              }}>
                <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, lineHeight: '125%', textAlign: 'center' }}>
                  Поделиться с дипломом с помощью QR
                </Typography>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%", padding: '1rem' }}
                  value={data && data.iin && data.university_id ? `https://app.ediploma.kz/${data.university_id}/${generateHash(data.iin, 'hashotnursa')}` : 'https://app.ediploma.kz/hr-bank'}
                />
                <Box>
                  <MuiButton fullWidth onClick={() => { setShowQR(false) }}
                    sx={{
                      borderRadius: "3rem", backgroundColor: "#EBF2FE",
                    }}
                  >
                    Закрыть
                  </MuiButton>
                </Box>
              </Box>
              <Box margin="2rem"></Box>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};
