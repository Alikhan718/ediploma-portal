import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  Divider,
  Menu,
  MenuItem,
  IconButton, Alert, Snackbar, Skeleton
} from '@mui/material';
import { Button, Label } from '@src/components';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import { ReactComponent as DownloadIcon } from '@src/assets/icons/download.svg';
import { ReactComponent as ShareIcon } from '@src/assets/icons/share.svg';
import star from "./../../assets/icons/Star1.svg";
import dots from "./../../assets/icons/Dots.svg";
import pen from "./../../assets/icons/penSquare.svg";
import { ReactComponent as Eye } from "@src/assets/icons/eye.svg";
import { ReactComponent as Star } from "@src/assets/icons/star.svg";
import { ReactComponent as Check } from "@src/assets/icons/checkss.svg";
import { useNavigate, useParams } from "react-router-dom";
import { SwitchDetails } from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";
import styles from './StudentPage.module.css';
import userImg from "@src/assets/dashboard/Image.jpg";
import cn from "classnames";
import { routes } from "@src/shared/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomas, fetchGraduateDetails } from "@src/store/diplomas/actionCreators";
import { selectDiplomaList } from "@src/store/diplomas/selectors";
import { isAuthenticated } from "@src/utils/userAuth";
import { handleDownload, handleLink } from "@src/utils/link";
import { selectUserRole, selectUserState } from "@src/store/auth/selector";
import { fetchUserProfile } from '@src/store/auth/actionCreators';
import { selectLanguage } from "@src/store/generals/selectors";
import { localization, skillsList } from '@src/pages/StudentPage/generator';
import { RatingDisplay } from '@src/components/RatingDisplay/RatingDisplay';
import { ShareButton } from '@src/components/ShareButton/ShareButton';
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

export const StudentPageLayout: React.FC = () => {
  const lang = useSelector(selectLanguage);
  const [showFull, setShowFull] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const role = useSelector(selectUserRole);
  const userState = useSelector(selectUserState);

  const [data, setData] = React.useState<any>();

  let diplomaList = useSelector(selectDiplomaList);

  React.useEffect(() => {
    if (id != undefined) {
      dispatch(fetchDiplomas());
    }
    console.log(5);

  }, [!diplomaList]);

  React.useEffect(() => {
    if (id != undefined) {
      setData(diplomaList.filter((diploma: any) => diploma.id == id)[0]);
    } else {
      dispatch(fetchUserProfile());
    }
    console.log(4);

  }, [isAuthenticated(), diplomaList]);

  React.useEffect(() => {
    setData(userState);
    console.log(3);
  }, [userState && !data]);

  React.useEffect(() => {
    if (isAuthenticated() && data && id != undefined) {
      dispatch(fetchGraduateDetails({ name: data.name_en }));
    } else if (data && data.name) {
      dispatch(fetchGraduateDetails({ name: data.name }));
      console.log(data);
    }
  }, [data]);

  const currentUrl = window.location.href;
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


  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
      <Box
        display='flex'
        flexWrap='wrap'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
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
          <Box
            display='flex'
            flexDirection='column'
            sx={{
              backgroundColor: 'white',
              borderRadius: '15px',
              '@media (max-width: 778px)': {
                backgroundColor: '#F4F7FE',
              }
            }}>
            <Box px="1rem" sx={{
              '@media (max-width: 778px)': {
                padding: '0'
              },
            }}>
              <Box
                display="flex"
                alignItems="center"
                margin="1rem"
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  '@media (max-width: 778px)': {
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '0.75rem',
                    margin: '0rem',
                    flexDirection: 'column',
                  },
                }}
              // className={styles.contentLeftContainer}
              >
                <CardMedia
                  component="img"
                  image={userImg}
                  className={cn(styles.img)}
                  sx={{
                    width: '25%', height: '25%',
                    borderRadius: '2rem', objectFit: 'cover',
                    '@media (max-width: 778px)': {
                      width: '6.25rem', height: '6.25rem', marginRight: '0',
                      borderRadius: '9rem', objectFit: 'cover',
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
                        '@media (max-width: 778px)': {
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          
                        }
                      }}
                    >
                      <Typography
                        fontWeight='600'
                        sx={{
                          paddingBottom: '14px',
                          fontSize: '24px',
                          '@media (max-width: 778px)': {
                            fontSize: '22px',
                            paddingBottom: '0',
                          },
                        }}
                      >
                        {data && data.name_kz ? data.name_kz : userState.name ? userState.name : ""}
                      </Typography>
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
                        display: 'none',
                        justifyContent: "space-around",
                        flexWrap: 'wrap', marginBottom: '1rem',
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
                            <Telegram style={{ width: '1.5rem', height: '1.5rem' }} />
                          </TelegramShareButton>
                        </Box>
                        <Box>
                          <WhatsappShareButton
                            url={getURL()}
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
                            <Link style={{ width: '1.5rem', height: '1.5rem' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    {id != undefined &&
                      <Box marginBottom="15px"
                        sx={{
                          '@media (max-width: 778px)': {
                            display: 'none'
                          }
                        }}
                      >
                        <img src={star} style={{ marginRight: '5px' }}
                          className={styles.desktopIcon} />
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                          className={styles.desktopIcon}
                        >
                          <img
                            src={dots}
                            style={{ marginRight: '1.4rem', marginBottom: '0.6rem' }}
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
                            <Eye style={{ marginRight: '10px', verticalAlign: "center" }} />
                            <Typography>{localization[lang].Menu.goto}</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleClose}><Star
                            style={{ marginRight: '10px', verticalAlign: "center" }} />
                            <Typography>{localization[lang].Menu.favorite}</Typography></MenuItem>
                          <MenuItem onClick={handleClose}><ShareIcon
                            style={{ marginRight: '10px', verticalAlign: "center" }} />
                            <Typography>{localization[lang].Menu.share}</Typography></MenuItem>
                          <Divider style={{ margin: "0 1rem" }} />
                          <MenuItem onClick={handleClose}><Check
                            style={{ marginRight: '10px', verticalAlign: "center" }} />
                            <Typography>Etherscan</Typography></MenuItem>
                        </Menu>


                        <img src={pen} style={{ marginLeft: '2rem', marginTop: '-4.5rem' }}
                          className={styles.tabletIcon} />
                      </Box>
                    }

                  </Box>
                  <Box
                    display="flex"
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
                          <Label label={localization[lang].MainInfo.nameUni} />
                        </Box>
                        <Label label={localization[lang].MainInfo.major} />
                        <Label label={localization[lang].MainInfo.degree} />
                        <Label label={localization[lang].MainInfo.graduationYear} />
                      </Box>
                      <Box marginLeft="0.2rem">
                        <Typography className={styles.textSm} fontWeight='500' mb='3px'
                          sx={{ fontSize: '0.875em' }}>
                          {data && data.university_id && data.university_id == 1 ? localization[lang].MainInfo.kbtu : localization[lang].MainInfo.noData}
                        </Typography>
                        <Typography className={styles.textSm} fontWeight='500' mb='3px'
                          sx={{ fontSize: '0.875em' }}>
                          {data && data.speciality_ru ? data.speciality_ru?.substring(data.speciality_ru.search("«"), data.speciality_ru.search("»") + 1) : localization[lang].MainInfo.noData}
                        </Typography>
                        <Typography className={styles.textSm} fontWeight='500' mb='3px'
                          sx={{ fontSize: '0.875em' }}>
                          {data && data.speciality_ru ? data.speciality_ru.split("\n")[0] : localization[lang].MainInfo.noData}
                        </Typography>
                        <Typography className={styles.nameText} fontWeight='500' mb='3px'
                          sx={{ fontSize: '0.875em' }}>
                          {data && data.year ? data.year : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" gap="1rem"
                    sx={{ '@media (max-width: 778px)': { display: 'none' } }}
                  >
                    <Button
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
                display: 'none',
                '@media (max-width: 778px)': {
                  display: "block",
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                },
                marginTop: '1rem',
                minWidth: '21rem',
                marginBottom: '1rem',
              }}>
                <Box sx={{
                  fontSize: '24px', fontWeight: '600', paddingBottom: '10px',
                  '@media (max-width: 778px)': {
                    fontSize: '20px'
                  },
                }}>
                  О Выпускнике
                </Box>

                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB', }}>
                      Номер телефона
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {data && data.phone ? data.phone : "-"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB', }}>
                      Почта
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                      {data && data.email ? data.email : "-"}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Дата рождения
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {data && data.date_of_birth ? data.date_of_birth : "-"}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Национальность
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      Казах
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Город
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      Алмата
                    </Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Регион
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {"-"}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Название вуза
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {
                        data && data.university_id && data.university_id == 1 ? 'КБТУ' :
                          data && data.university_id && data.university_id == 2 ? 'АГП' :
                            data && data.university_id && data.university_id == 3 ? 'Сатпаев Университет' :
                              '-'
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Степень
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {
                        data && data.university_id == 2 ? "" :
                          data && lang === 'ru' && data.speciality_ru ? data.speciality_ru.split("\n")[0] :
                            data && lang === 'en' && data.speciality_en ? data.speciality_en.split("\n")[0] :
                              data && lang === 'kz' && data.speciality_kz ? data.speciality_kz.split("\n")[0] :
                                '-'
                      }
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Специальность
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {
                        data && lang === 'ru' && data.speciality_ru ? data.speciality_ru?.substring(data.speciality_ru.search("«"), data.speciality_ru.search("»") + 1) :
                          data && lang === 'kz' && data.speciality_kz ? data.speciality_kz?.substring(data.speciality_kz.search("«"), data.speciality_kz.search("»") + 1) :
                            data && lang === 'en' && data.speciality_en ? data.speciality_en?.substring(data.speciality_en.search("«"), data.speciality_en.search("»") + 1) :
                              '-'
                      }
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      GPA
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {
                        data && data.diploma_gpa ? data.diploma_gpa : "-"
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Дата окончания
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {data && data.year ? data.year : ""}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      Академический рейтинг
                    </Typography>
                    <Box display="flex" marginTop="0.25rem">
                      {data && data.rating ? <RatingDisplay academicRating={Number(data.rating)} /> : "-"}
                      <Box marginLeft="0.5rem"> { } </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#9499AB' }}>
                      О себе
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      {data && data.description ? data.description : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box margin="1rem" sx={{
                marginY: '2rem',
                '@media (max-width: 778px)': {
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '0.75rem',
                  margin: '0rem',
                },
              }}>
                <Box sx={{
                  fontSize: '24px', fontWeight: '600', paddingBottom: '10px',
                  '@media (max-width: 778px)': {
                    fontSize: '20px'
                  },
                }}> {localization[lang].AddInfo.certifications} </Box>

                {data && data.image &&
                  <Box width="25%" sx={{
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
                        image={data.image}
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
                            let link = data && data.image ? data.image : "";
                            handleDownload(link, data && data.name_en ? data.name_en : "diploma");
                          }}
                        >

                          <DownloadIcon style={{ width: "20", filter: "brightness(10)" }} />
                        </IconButton>
                      </Box>
                    </Card>
                  </Box>

                }

              </Box>
              <Box sx={{
                display: 'none',
                '@media (max-width: 778px)': {
                  display: "block",
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                },
                marginTop: '1rem',
                width: '100%'
              }}>
                <Box sx={{
                  fontSize: '24px', fontWeight: '600', paddingBottom: '10px',
                  marginBottom: '1rem',
                  '@media (max-width: 778px)': {
                    fontSize: '20px',
                    marginBottom: '0.75rem',
                  },
                }}>
                  Навыки
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  alignSelf: 'stretch',
                }}>
                  {data && data.speciality_ru ? (skillsList[data.speciality_ru as keyof typeof skillsList][lang].slice(0, 10).map((skill: any, index: any) => {
                    return (
                      <Box key={index} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F8F8F8',
                        borderRadius: '1.5rem',
                        padding: '0.5rem',
                        height: '1.5rem',
                        '@media (max-width: 778px)': { backgroundColor: '#F4F7FE' }
                      }}>
                        <Typography
                          color="black"
                          sx={{
                            marginLeft: '1rem',
                            marginRight: '1rem',
                            fontSize: '16px',
                            "@media (max-width: 778px)": {
                              fontSize: '14px',
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
              <Box margin="1rem" sx={{
                '@media (max-width: 778px)': {
                  margin: '0.9rem',
                  display: 'none'
                },
              }}>
                <SwitchDetails />
              </Box>
              <Snackbar open={alertOpen} autoHideDuration={2000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success"
                  sx={{ width: '100%' }}>
                  {localization[lang].Alert.copied}
                </Alert>
              </Snackbar>
              <Box margin="2rem"></Box>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};
