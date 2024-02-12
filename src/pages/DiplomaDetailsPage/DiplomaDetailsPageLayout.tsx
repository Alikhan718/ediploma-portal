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
  Link,
  Chip,
  IconButton, Alert, Snackbar, Skeleton
} from '@mui/material';
import {Button, Label, Modal} from '@src/components';
import {ReactComponent as SingleCheck} from "@src/assets/icons/single check.svg";
import {ReactComponent as ExpandMore} from '@src/assets/icons/expand_more.svg';
import {ReactComponent as DownloadIcon} from '@src/assets/icons/download.svg';
import {ReactComponent as ShareIcon} from '@src/assets/icons/share.svg';
import {ReactComponent as GoldStar} from '@src/assets/icons/goldStar.svg';
import {ReactComponent as Star} from "@src/assets/icons/star.svg";
import {ReactComponent as StarPressed} from "@src/assets/icons/StarPressed.svg";
import {ReactComponent as ArrowIcon} from '@src/assets/icons/arrowIcon.svg';
import {RatingDisplay} from '@src/components/RatingDisplay/RatingDisplay';
import {ReactComponent as FavoriteDiploma} from '@src/assets/icons/favoriteDiploma.svg';
import {ReactComponent as CopyIcon} from '@src/assets/icons/copyIcon.svg';
import {useNavigate, useParams} from "react-router-dom";
import {ReactComponent as CloseIcon} from "@src/assets/icons/close.svg";
import styles from '@src/pages/StudentPage/StudentPage.module.css';
import userImg from "@src/assets/dashboard/Image.jpg";
import cn from "classnames";
import {routes} from "@src/shared/routes";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchDiplomas,
  fetchGraduateDetails,
  fetchToogleFavoriteDiplomas,
  fetchFavoriteDiplomas
} from "@src/store/diplomas/actionCreators";
import {
  selectDiplomaList,
  selectToogleFavoriteDiplomas,
  selectFavoriteDiplomas,
  selectGraduateAttributes
} from "@src/store/diplomas/selectors";
import {isAuthenticated} from "@src/utils/userAuth";
import {handleDownload, handleLink} from "@src/utils/link";
import {selectUserRole, selectUserState} from "@src/store/auth/selector";
import {fetchUserProfile} from '@src/store/auth/actionCreators';
import {selectLanguage} from "@src/store/generals/selectors";
import {ibfields, fieldLocalizations, localization, skillsList, uniRatings} from '@src/pages/DiplomaDetailsPage/generator';
import {ShareButton} from '@src/components/ShareButton/ShareButton';
import LoadingIcon from '@src/assets/icons/loading.gif';
import SignedDsIcon from '@src/assets/icons/file_checked.svg';
import UploadedIcon from '@src/assets/icons/checklist.svg';
import OwnerVerifiedIcon from '@src/assets/icons/verified_check.svg';

export const DiplomaDetailsPageLayout: React.FC = () => {
  const lang = useSelector(selectLanguage);
  const [showFull, setShowFull] = React.useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {token} = useParams<{ token: string }>();
  const dispatch = useDispatch();
  const role = useSelector(selectUserRole);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [numSkills, setNumSkills] = React.useState(5);
  const [academicRating, setAcademicRating] = React.useState(100);
  const [data, setData] = React.useState<any>();
  const [value, setValue] = React.useState(0);
  const [cModalOpen, setCModalOpen] = React.useState(false);
  const [dsIcon, setDsIcon] = React.useState(false);
  const [uploadedIcon, setUploadedIcon] = React.useState(false);
  const [ownerIcon, setOwnerIcon] = React.useState(false);
  const img = new Image();

  let diplomaList = useSelector(selectDiplomaList);

  const graduateAttributes = useSelector(selectGraduateAttributes);

  React.useEffect(() => {
    if (!graduateAttributes) {
      console.log("no graduate attributes");
      return;
    }

    const gpa: number = parseFloat(graduateAttributes.diploma_gpa);
    const uniRating = uniRatings[graduateAttributes.university_id as keyof typeof uniRatings];

    const rating = ((gpa / 4) * 0.7) + ((1 - uniRating / 89) * 0.3);
    setAcademicRating(Math.round(rating * 5));
  }, [graduateAttributes]);

  const starsArray = Array.from({length: academicRating}, (_, index) => index);

  React.useEffect(() => {
    if (!graduateAttributes) {
      console.log("no graduate attributes");
      return;
    }

    const gpa: number = parseFloat(graduateAttributes.diploma_gpa);

    switch (true) {
      case gpa >= 3.5 && gpa <= 4:
        setNumSkills(10);
        break;
      case gpa >= 3.2 && gpa < 3.5:
        setNumSkills(9);
        break;
      case gpa >= 3.0 && gpa < 3.2:
        setNumSkills(8);
        break;
      case gpa < 3.0:
        setNumSkills(7);
        break;
    }
  }, [graduateAttributes]);

  React.useEffect(() => {
    dispatch(fetchDiplomas());
  }, []);

  React.useEffect(() => {
    if (isAuthenticated()) {
      return;
    }
    if (token) {
      try {
        const decodedToken = atob(token);
        const expirationTime = parseInt(decodedToken);

        if (isNaN(expirationTime) || expirationTime < Date.now()) {
          navigate(routes.notFound);
          console.log("Token is expired");
        }
      } catch (e) {
        navigate(routes.notFound);
        console.log("Invalid token");

      }
    }
  }, []);

  const getRandomDelay = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const signedDsIconChange = () => {
    setDsIcon(true);
  };
  const uploadedIconChange = () => {
    setUploadedIcon(true);
  };
  const ownerIconChange = () => {
    setOwnerIcon(true);
  };

  const waitForRandomTimeAndPerformAction = () => {
    // Set your desired range for the random delay (in milliseconds).
    const minDelay = 2000; // 1 second
    const maxDelay = 3000; // 5 seconds

    setTimeout(() => {
      signedDsIconChange();
      console.log('signedDsIconChange');
    }, getRandomDelay(minDelay, minDelay));

    setTimeout(() => {
      uploadedIconChange();
      console.log('uploadedIconChange');
    }, getRandomDelay(minDelay + 1000, maxDelay));

    setTimeout(() => {
      ownerIconChange();
      console.log('ownerIconChange');
    }, getRandomDelay(minDelay, minDelay));
  };

  React.useEffect(() => {
    waitForRandomTimeAndPerformAction();
  }, [cModalOpen]);

  React.useEffect(() => {
    setData(diplomaList.filter((diploma: any) => diploma.id == id)[0]);
  }, [isAuthenticated(), diplomaList]);

  const isMobile = window.innerWidth <= 768;
  const [altImg, setAltImg] = React.useState(false);
  React.useEffect(() => {
    if (data) {
      img.src = data.image;
      if (img.height / img.width > 1 && !isMobile) {
        setAltImg(true);
        console.log(altImg);
      }

      dispatch(fetchGraduateDetails(data.id));
    }
  }, [data]);

  const currentUrl = window.location.href;
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleText = (text: string): string => {
    const matchesSm = useMediaQuery('(max-width:768px)');
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
  // const isMobile = useMediaQuery('(max-width:998px)');
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const handleCModalClose = () => {
    setCModalOpen(false);
  };

  const initialFavDiplomas = useSelector(selectFavoriteDiplomas);
  React.useEffect(() => {
    dispatch(fetchFavoriteDiplomas());

    if (initialFavDiplomas) {
      setIsFavorite(initialFavDiplomas.some((item: { id: number }) => item.id === Number(id)));
    }
  }, [])


  const favoriteDiplomas = useSelector(selectToogleFavoriteDiplomas);
  React.useEffect(() => {
    if (favoriteDiplomas) {
      setIsFavorite(favoriteDiplomas.some((item: { id: number }) => item.id === Number(id)));
    }
  }, [favoriteDiplomas]);

  const handleToogleFavoriteDiplomas = async () => {
    dispatch(fetchToogleFavoriteDiplomas({diploma_id: id}));
  };

  const hasValidEmail = (): boolean => {
    if (graduateAttributes) {
      if (graduateAttributes.diploma_email) {
        console.log(graduateAttributes.diploma_email, graduateAttributes.diploma_email.length);
      }
    }

    return (graduateAttributes && graduateAttributes.diploma_email != undefined && graduateAttributes.diploma_email.length > 0);

  };

  const getEmail = (): string => {
    if (graduateAttributes && graduateAttributes.diploma_email != undefined && graduateAttributes.diploma_email.length > 0) {
      return graduateAttributes.diploma_email;
    }
    return '';
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue == 1 && !isAuthenticated()) {
      // setOpenModal(true);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box width="100%" sx={{display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
      <Box display='flex' flexWrap='wrap' width="100%">

        <Box sx={{
          // width: '90vw',
          width: '100%',
          marginX: "1.5rem",
          '@media (max-width: 778px)': {
            margin: '0.1rem',
            marginTop: "3rem",
            width: '100vw',
          },
        }}>
          <IconButton onClick={() => {
            navigate(-1);
          }} sx={{'&:hover': {backgroundColor: 'transparent'}}}>
            <ArrowIcon/>
            <Typography className={styles.textMd} marginLeft="1rem" fontWeight='600' color='#3B82F6'
                        fontSize={"1rem"}>
              {localization[lang].StudentPage.Menu.back}
            </Typography>
          </IconButton>
          <Box display='flex' flexDirection='column' sx={{backgroundColor: 'white', borderRadius: '15px'}}>
            <Box width="50%" display="flex" flex="row" p=".275rem " sx={{
              backgroundColor: "#F8F8F8", borderRadius: "3rem",
              marginTop: "0.5rem",
              display: 'none',
              '@media (max-width: 778px)': {
                width: '100%',
                display: 'flex',
              },
            }}>
              <Button fullWidth={true} variant="contained"
                      color={value === 0 ? "primary" : "secondary"} borderRadius="3rem"
                      onClick={(e) => handleChange(e, 0)}>
                Диплом
              </Button>
              <Button fullWidth={true} color={value === 1 ? "primary" : "secondary"}
                      variant="contained" borderRadius="3rem" onClick={(e) => handleChange(e, 1)}>
                Рекзвезиты
              </Button>
              <Button fullWidth={true} color={value === 2 ? "primary" : "secondary"}
                      variant="contained" borderRadius="3rem" onClick={(e) => handleChange(e, 2)}>
                Профиль
              </Button>
            </Box>

            <Box px="1rem" sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              justifyItems: 'center',
              width: '100%',
              '@media (max-width: 778px)': {
                padding: '0'
              },
            }}>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{
                  "@media (max-width: 778px)": {
                    display: value !== 0 ? "none" : "flex"
                  }
                }}
              >
                {data && data.image &&
                    <Box width="60vh" sx={{
                      backgroundColor: "rgba(7,117,255,0.11)",
                      borderRadius: "1rem",
                      padding: ".7rem",
                      marginTop: "1rem",
                      '@media (max-width: 778px)': {
                        width: '95%'
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
                                  height: altImg ? "16rem" : "",
                                  objectPosition: "top",
                                  position: "relative",
                                  display: imageLoaded ? "block" : "none"

                                }}
                                image={data.image}
                                alt="University Image"
                                onLoad={handleImageLoad}
                                onClick={handlePreviewOpen}
                            />
                            <Skeleton variant="rectangular" width={300} height={200}
                                      sx={{display: imageLoaded ? "none" : "block"}}
                                      animation="wave"/>
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'row-reverse',
                              width: "100%",
                              marginTop: "-3rem",
                              justifyContent: "space-between",
                              padding: "0 .5rem .5rem .5rem",
                              zIndex: "10"
                            }}>
                                <Box
                                    sx={{
                                      display: 'flex',
                                      "@media (max-width: 778px)": {
                                        display: 'none'
                                      }
                                    }}
                                >
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
                                        <ShareIcon style={{width: "20", filter: "brightness(10)"}}/>
                                    </IconButton>
                                </Box>
                                <Box
                                    sx={{
                                      display: 'none',
                                      "@media (max-width: 778px)": {
                                        display: 'flex'
                                      }
                                    }}
                                >
                                    <IconButton
                                        color="primary"
                                        sx={{
                                          width: "2.5rem",
                                          height: "2.5rem",
                                          backgroundColor: "#D8E6FD",
                                        }}
                                        onClick={handleToogleFavoriteDiplomas}>
                                      {/* {isFavorite ? <StarPressed/> : <Star/>} */}
                                        <FavoriteDiploma fill={isFavorite ? "#3B82F6" : "white"}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Card>
                        <Modal
                            open={isPreviewOpen}
                            handleClose={handlePreviewClose}
                            width={altImg ? "50%" : "auto"}
                            maxWidth={altImg ? "50%" : "auto"}
                            maxHeight="100%"

                        >
                            <Box display="flex" justifyContent="center">
                                <CardMedia
                                    component="img"
                                    sx={{
                                      width: altImg ? "30vw" : "100%",
                                      height: altImg ? "90%" : "100%",
                                      position: "relative",
                                      objectPosition: "top",
                                      objectFit: "cover",
                                    }}
                                    image={data.image}
                                    alt="University Image"/>
                            </Box>
                        </Modal>
                    </Box>
                }
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                alignContent="center"
                margin="1rem"
                className={styles.contentLeftContainer}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    '@media (max-width: 778px)': {
                      flexDirection: 'column',
                      alignItems: 'center',
                    },
                  }}
                >
                  <Box
                    alignItems="center"
                    sx={{
                      width: '70%',
                      alignItems: 'center',
                      margin: "1rem",
                      '@media (max-width: 778px)': {
                        width: '100%',
                        margin: "0rem",
                      },

                    }}
                  >
                    <Box sx={{
                      '@media (max-width: 778px)': {
                        display: value !== 1 ? "none" : "flex",
                        flexDirection: 'column',
                        width: '100%',
                      },
                    }}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          className={styles.nameText}
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
                          {data && lang === "kz" ? data.name_kz : data && lang === "ru" ? data.name_ru : data && lang === "en" ? data.name_en : ""}
                        </Typography>
                        {id != undefined &&
                            <Box marginBottom="15px">
                                <IconButton
                                    sx={{
                                      width: "2.5rem",
                                      height: "2.5rem",
                                      backgroundColor: "#D8E6FD",
                                      "@media (max-width: 778px)": {
                                        display: 'none'
                                      }
                                    }}
                                    onClick={handleToogleFavoriteDiplomas}>
                                  {/* {isFavorite ? <StarPressed/> : <Star/>} */}
                                    <FavoriteDiploma fill={isFavorite ? "#3B82F6" : "white"}/>
                                </IconButton>
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
                        }}
                      >
                        <Box
                          display="none"
                          alignItems="center"

                          sx={{
                            '@media (max-width: 778px)': {
                              display: 'none',
                            },
                          }}
                        >
                          <Box marginRight="1rem" fontSize="16px">
                            <Box sx={{
                              "@media (max-width: 998px)": {
                                marginBottom: "18px",
                              },
                            }}>
                              <Label label={localization[lang].StudentPage.MainInfo.nameUni}/>
                            </Box>
                            <Label label={localization[lang].StudentPage.MainInfo.major}/>
                            <Label label={localization[lang].StudentPage.MainInfo.degree}/>
                            <Label label={localization[lang].StudentPage.MainInfo.graduationYear}/>
                          </Box>
                          <Box marginLeft="0.2rem">
                            {/* hi */}
                            <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                        sx={{fontSize: '0.875em'}}>
                              {data && data.university_id && data.university_id == 1 ? localization[lang].StudentPage.MainInfo.kbtu : localization[lang].StudentPage.MainInfo.noData}
                            </Typography>
                            <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                        sx={{fontSize: '0.875em'}}>
                              {
                                data && lang === 'ru' && data.speciality_ru ? data.speciality_ru?.substring(data.speciality_ru.search("«"), data.speciality_ru.search("»") + 1) :
                                  data && lang === 'kz' && data.speciality_kz ? data.speciality_kz?.substring(data.speciality_kz.search("«"), data.speciality_kz.search("»") + 1) :
                                    data && lang === 'en' && data.speciality_en ? data.speciality_en?.substring(data.speciality_en.search("«"), data.speciality_en.search("»") + 1) :
                                      localization[lang].StudentPage.MainInfo.noData
                              }
                            </Typography>
                            <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                        sx={{fontSize: '0.875em'}}>
                              {
                                data && lang === 'ru' && data.speciality_ru ? data.speciality_ru.split("\n")[0] :
                                  data && lang === 'en' && data.speciality_en ? data.speciality_en.split("\n")[0] :
                                    data && lang === 'kz' && data.speciality_kz ? data.speciality_kz.split("\n")[0] :
                                      localization[lang].StudentPage.MainInfo.noData
                              }
                            </Typography>
                            <Typography className={styles.nameText} fontWeight='500' mb='3px'
                                        sx={{fontSize: '0.875em'}}>
                              {data && data.year ? data.year : ""}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="start"
                          width="100%"
                          sx={{
                            '@media (max-width: 778px)': {
                              display: 'block',
                            },
                          }}
                        >
                          <Box display="flex">
                            <Box marginRight='1rem'>
                              <Label label={localization[lang].StudentPage.MainInfo.nameUni}/>
                            </Box>
                            <Box>
                              <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                          sx={{fontSize: '0.875em'}}>
                                {
                                  data && data.university_id && data.university_id == 1 ? localization[lang].StudentPage.MainInfo.kbtu :
                                    data && data.university_id && data.university_id == 2 ? localization[lang].StudentPage.MainInfo.agp :
                                      localization[lang].StudentPage.MainInfo.noData
                                }
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex">
                            <Box marginRight='0.6rem'>
                              <Label label={localization[lang].StudentPage.MainInfo.major}/>
                            </Box>
                            <Box>
                              <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                          sx={{fontSize: '0.875em'}}>
                                {
                                  data && data.university_id == 2 ? localization[lang].StudentPage.MainInfo.agpMajor :
                                    data && lang === 'ru' && data.speciality_ru ? data.speciality_ru?.substring(data.speciality_ru.search("«"), data.speciality_ru.search("»") + 1) :
                                      data && lang === 'kz' && data.speciality_kz ? data.speciality_kz?.substring(data.speciality_kz.search("«"), data.speciality_kz.search("»") + 1) :
                                        data && lang === 'en' && data.speciality_en ? data.speciality_en?.substring(data.speciality_en.search("«"), data.speciality_en.search("»") + 1) :
                                          localization[lang].StudentPage.MainInfo.noData
                                }
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex">
                            <Box marginRight='4rem'>
                              <Label label={localization[lang].StudentPage.MainInfo.degree}/>
                            </Box>
                            <Box>
                              <Typography className={styles.textSm} fontWeight='500' mb='3px'
                                          sx={{fontSize: '0.875em'}}>
                                {
                                  data && data.university_id == 2 ? "" :
                                    data && lang === 'ru' && data.speciality_ru ? data.speciality_ru.split("\n")[0] :
                                      data && lang === 'en' && data.speciality_en ? data.speciality_en.split("\n")[0] :
                                        data && lang === 'kz' && data.speciality_kz ? data.speciality_kz.split("\n")[0] :
                                          localization[lang].StudentPage.MainInfo.noData
                                }
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex">
                            <Box marginRight='1rem'>
                              <Label label={localization[lang].StudentPage.MainInfo.graduationYear}/>
                            </Box>
                            <Box>
                              <Typography className={styles.nameText} fontWeight='500' mb='3px'
                                          sx={{fontSize: '0.875em'}}>
                                {data && data.year ? data.year : ""}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Button
                        buttonSize="s"
                        variant="contained"
                        type="button"
                        disabled={!hasValidEmail()}
                        sx={{
                          borderRadius: '25px',
                          marginTop: '1rem',
                          "@media (max-width: 778px)": {
                            marginLeft: '2.5rem',
                          }
                        }}
                        onClick={() => {
                          const subject = `Приглашение для ${data.name_ru} в компанию`;
                          window.location.href = `mailto:${getEmail()}?subject=${encodeURIComponent(subject)}`;
                        }}
                      >
                        {localization[lang].StudentPage.AddInfo.sendInvite}
                      </Button>

                      {data && data.description &&
                          <Box margin="1rem" sx={{
                            marginTop: '1.5rem',
                            '@media (max-width: 778px)': {
                              margin: '0.9rem',
                            },
                          }}
                          >
                              <Box sx={{
                                fontSize: '24px',
                                fontWeight: '600',
                                color: '#4D4D4D',
                                paddingBottom: '10px'
                              }}> {localization[lang].StudentPage.AddInfo.about} </Box>
                              <Typography className={styles.textMd} color="#818181">
                                {handleText(data && data.description ? data.description : "")}
                              </Typography>
                              <Typography style={{cursor: "pointer"}} className={styles.textMd}
                                          fontWeight='600'
                                          color='#629BF8' sx={{paddingBottom: '20px'}}
                                          onClick={() => {
                                            setShowFull(!showFull);
                                          }}>
                                {localization[lang].StudentPage.AddInfo.show} {!showFull ? localization[lang].StudentPage.AddInfo.more : localization[lang].StudentPage.AddInfo.less}
                                  <ExpandMore
                                      style={{
                                        marginLeft: ".2rem",
                                        transform: showFull ? "rotate(180deg)" : ""
                                      }}/>
                              </Typography>
                          </Box>
                      }
                    </Box>
                    <Box sx={{
                      "@media (max-width: 778px)": {
                        display: 'flex',
                        flexDirection: 'column-reverse',
                      }
                    }}>
                      <Box sx={{
                        '@media (max-width: 778px)': {
                          display: value !== 2 ? "none" : "block"
                        },
                        marginTop: '1rem',
                        width: '100%'
                      }}>
                        <Box sx={{
                          fontSize: '24px', fontWeight: '600', paddingBottom: '10px',
                          '@media (max-width: 778px)': {
                            fontSize: '20px'
                          },
                        }}>
                          {localization[lang].StudentPage.AddInfo.skills}
                        </Box>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignContent: 'flex-start',
                          flexWrap: 'wrap'
                        }}>
                          {graduateAttributes.speciality_ru ? (skillsList[graduateAttributes.speciality_ru as keyof typeof skillsList][lang].slice(0, 10).map((skill: any, index: any) => {
                            return (
                              <Box key={index} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: '#F8F8F8',
                                borderRadius: '1rem',
                                margin: '0.5rem',
                                padding: '0.5rem'
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

                      <Box mt="1rem" mb="1rem" sx={{
                        '@media (max-width: 778px)': {
                          display: value !== 2 ? "none" : "block"
                        },
                      }}>
                        <Box sx={{
                          fontSize: '24px', fontWeight: '600', paddingBottom: '10px',
                          '@media (max-width: 778px)': {
                            fontSize: '20px'
                          },
                        }}>
                          {localization[lang].StudentPage.AddInfo.studentData}
                        </Box>
                        {graduateAttributes
                          ?
                          Object.keys(graduateAttributes).map((key: any) => {
                              if (fieldLocalizations[key] !== undefined && graduateAttributes[key] != undefined && graduateAttributes[key] != '') {
                                return (
                                  <Box key={key} display='flex' justifyContent="space-between">
                                    <Typography
                                      key={key}
                                      sx={{
                                        marginBottom: "1rem",
                                        display: "block",
                                      }}
                                    >
                                      {ibfields[key] && <span style={{
                                        color: "#818181",
                                        fontSize: "16px"
                                      }}>{ibfields[key][lang] ?? fieldLocalizations[key][lang]}:</span>}{" "}
                                      <span style={{
                                        fontWeight: '600',
                                        fontSize: "16px"
                                      }}>{graduateAttributes[key]}</span>{" "}
                                    </Typography>
                                    <IconButton
                                      sx={{
                                        display: 'none',
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        "@media (max-width: 778px)": {
                                          display: key == 'diploma_email' || key == 'diploma_phone' ? 'flex' : 'none',
                                        }
                                      }}
                                      onClick={() => {
                                        navigator.clipboard.writeText(graduateAttributes[key]);
                                        setAlertOpen(true);
                                      }}>
                                      <CopyIcon/>
                                    </IconButton>
                                  </Box>
                                );
                              }
                            }
                          )
                          : null}
                        <Box display='flex'>
                          <Typography>
                                                        <span style={{
                                                          color: "#818181",
                                                          fontSize: "16px"
                                                        }}>{localization[lang].StudentPage.MainInfo.rating}</span>
                          </Typography>
                          <Box display="flex" marginLeft="0.5rem" marginTop="0.25rem">
                            {graduateAttributes.rating &&
                                <RatingDisplay academicRating={Number(graduateAttributes.rating)}/>}
                            <Box marginLeft="0.5rem"> {graduateAttributes.rating && graduateAttributes.rating} </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                  </Box>

                  <Box sx={{
                    marginRight: "2.5rem",
                    width: '30%',
                    "@media (max-width: 778px)": {
                      marginRight: "0rem",
                      marginLeft: "1.75rem",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column-reverse',
                      width: '100%',
                    }
                  }}>
                    <ShareButton
                      currentUrl={currentUrl}
                      lang={lang}
                      smartContractAddress={graduateAttributes && graduateAttributes.smart_contract_link + "#code"}
                      setAlertOpen={setAlertOpen}
                      value={value}
                      data={data}
                    />
                    <Box
                      sx={{
                        backgroundColor: '#F8F8F8',
                        borderRadius: '1rem',
                        padding: "1rem",
                        marginTop: "1rem",
                        '@media (max-width: 778px)': {
                          display: value !== 1 ? "none" : "block",
                          width: '100%',
                        },
                      }}
                    >
                      <Box display='flex' justifyContent="space-between">
                        <Typography color="#818181" fontWeight='600' fontSize="1rem" mb="1rem">
                          {localization[lang].switchDetails.status}
                        </Typography>
                        <Chip
                          sx={{
                            width: '50%', backgroundColor: '#E9F9EF', border: 'none', borderRadius: '20px',
                            '@media (max-width: 778px)': {
                              width: '70%'
                            },
                          }}
                          className={cn(styles.MobMt0, styles.mt02)}
                          label={
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <Typography fontSize="1rem" sx={{
                                marginRight: '.5rem',
                                color: '#22C55E', fontWeight: '600', paddingTop: '0.9rem', paddingBottom: '0.9rem'
                              }}>
                                {localization[lang].switchDetails.confirmed}
                              </Typography>
                              <SingleCheck fill="#22C55E"/>
                            </div>
                          }
                        />
                      </Box>

                      <Box display='flex' flexDirection="column" mt='1rem'>
                        <Link href={graduateAttributes && graduateAttributes.smart_contract_link}
                              sx={{textDecoration: "none"}} target={'_blank'}>
                          <Box display='flex'>
                            <Typography className={styles.textMd} fontWeight='600' mb="1rem" color='#3B82F6'
                                        fontSize={"1rem"}>
                              {localization[lang].switchDetails.seeEtherscan}
                            </Typography>
                          </Box>
                        </Link>
                        <Link href={graduateAttributes && graduateAttributes.smart_contract_link + "#code"}
                              sx={{textDecoration: "none"}} target={'_blank'} mt='0.2rem'>
                          <Box display='flex'>
                            <Typography className={styles.textMd} fontWeight='600' color='#3B82F6' fontSize={"1rem"}>
                              {localization[lang].switchDetails.seeSmartContract}
                            </Typography>
                          </Box>
                        </Link>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: '#F8F8F8',
                        borderRadius: '1rem',
                        marginTop: "1rem",
                        '@media (max-width: 778px)': {
                          display: value !== 0 ? "none" : "flex",
                          flexDirection: 'column',
                          width: '100%',
                          marginBottom: "1rem",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" padding="1rem">
                        <Box sx={{
                          fontSize: '20px', fontWeight: '600',
                          '@media (max-width: 778px)': {
                            fontSize: '20px'
                          },
                          marginRight: "0.5rem"
                        }}>
                          {localization[lang].switchDetails.diplomaConfirmation}
                        </Box>
                        <SingleCheck fill="#3B82F6"/>
                      </Box>

                      <Box paddingLeft="1rem" paddingRight="1rem" paddingBottom="1rem">
                        <Typography fontSize="16px" color="#818181">
                          {localization[lang].switchDetails.acreditation}
                        </Typography>
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
                          onClick={() => {
                            setCModalOpen(true)
                          }}
                        >
                          {localization[lang].switchDetails.confirm}
                        </Button>
                      </Box>
                    </Box>
                  </Box>


                </Box>
              </Box>
              <Modal
                open={cModalOpen}
                handleClose={handleCModalClose}
                width="100vh"
                maxWidth="100vh"
              >

                <Box display="flex" position="absolute"
                     p="1rem"
                     style={{right: "1rem", top: "1rem", cursor: "pointer"}}
                     onClick={() => handleCModalClose()}
                >
                  <CloseIcon width="1rem" height="1rem"/>
                </Box>
                <Box display="flex" gap="1rem" flexDirection="column">
                  {graduateAttributes && graduateAttributes.signed_by &&
                      <Box display="flex" flexDirection="row">
                          <Box display="flex" justifyContent="center" alignItems="center"
                               pr="2rem">
                              <img width={25} src={dsIcon ? SignedDsIcon : LoadingIcon}/>
                          </Box>
                          <Box display="flex" flexDirection="column"
                               justifyContent="space-around">

                              <Typography
                                  fontWeight="600"
                                  fontSize="1.2rem"
                              >
                                {localization[lang].StudentPage.Confirmation.signedWithDS}
                              </Typography>

                              <Typography
                                  fontWeight="400"
                                  color="#818181"
                                  fontSize="1rem"
                              >
                                {graduateAttributes && graduateAttributes.signed_by ? graduateAttributes.signed_by : null}
                              </Typography>
                              <Box display="flex">
                                  <Typography
                                      fontWeight="400"
                                      color="#818181"
                                      fontSize="1rem"
                                      pr=".5rem"
                                  >
                                    {localization[lang].StudentPage.Confirmation.date}
                                  </Typography>
                                  <Typography
                                      fontWeight="400"
                                      fontSize="1rem"
                                  >
                                    {graduateAttributes && graduateAttributes.created_at ? graduateAttributes.created_at : null}
                                  </Typography>

                              </Box>
                          </Box>
                      </Box>}
                  {graduateAttributes && graduateAttributes.signed_by &&
                      <Divider/>
                  }
                  <Box display="flex" flexDirection="row">
                    <Box display="flex" justifyContent="center" alignItems="center" pr="2rem">
                      <img width={25} src={uploadedIcon ? UploadedIcon : LoadingIcon}/>
                    </Box>
                    <Box display="flex" flexDirection="column" justifyContent="space-around">

                      <Typography
                        fontWeight="600"
                        fontSize="1.2rem"
                      >
                        {localization[lang].StudentPage.Confirmation.deployedToBlockchain}
                      </Typography>

                      <Typography
                        fontWeight="600"
                        color="#818181"
                        fontSize="1rem"
                        style={{cursor: "pointer", userSelect: "none"}}
                        onClick={() => {
                          if (uploadedIcon) {
                            handleLink(graduateAttributes && graduateAttributes.smart_contract_link)
                          }
                        }}
                      >
                        {localization[lang].StudentPage.Confirmation.smartContractAddress}
                      </Typography>

                      <Box display="flex">
                        <Typography
                          fontWeight="400"
                          color="#818181"
                          fontSize="1rem"
                          pr=".5rem"
                        >
                          {localization[lang].StudentPage.Confirmation.date}
                        </Typography>
                        <Typography
                          fontWeight="400"
                          fontSize="1rem"
                        >
                          {graduateAttributes && graduateAttributes.signed_at ? graduateAttributes.signed_at : null}
                        </Typography>

                      </Box>
                    </Box>
                  </Box>
                  <Divider/>
                  <Box display="flex" flexDirection="row">
                    <Box display="flex" justifyContent="center" alignItems="center" pr="2rem">
                      <img width={25} src={ownerIcon ? OwnerVerifiedIcon : LoadingIcon}/>
                    </Box>
                    <Box display="flex" flexDirection="column" justifyContent="space-around">

                      <Typography
                        fontWeight="600"
                        fontSize="1.2rem"
                      >
                        {localization[lang].StudentPage.Confirmation.owner}

                      </Typography>

                      <Typography
                        fontWeight="400"
                        color="#818181"
                        fontSize="1rem"
                      >
                        {graduateAttributes.name_ru}
                      </Typography>

                    </Box>
                  </Box>

                </Box>


              </Modal>
              <Snackbar open={alertOpen} autoHideDuration={2000}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success"
                       sx={{width: '100%'}}>
                  Успешно скопировано!
                </Alert>
              </Snackbar>
              <Box margin="2rem"></Box>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  )
};
