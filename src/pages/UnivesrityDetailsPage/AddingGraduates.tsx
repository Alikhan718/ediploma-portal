import {Box, Typography, LinearProgress, TextField, Button, IconButton, Grid, CircularProgress} from "@mui/material";
import React, {useState, useEffect, useRef} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import excel from "./../../assets/icons/File_check.svg";
import files from "./../../assets/icons/Excel.svg";
import * as NcaLayer from '@src/utils/functions';
import {useDispatch, useSelector} from "react-redux";
import {fetchGetDiplomaCid, fetchSaveXmlRequest, fetchUserProfile} from "@src/store/auth/actionCreators";
import {handleLink} from "@src/utils/link";
import {ReactComponent as DownloadIcon} from "@src/assets/icons/download.svg";
import {ReactComponent as ExcelType} from "@src/assets/icons/excel_type.svg";
import {ReactComponent as ApiType} from "@src/assets/icons/api_type.svg";
import archive from "@src/assets/icons/archive.svg";
import {selectArchiveLink, selectIsUploaded} from "@src/store/generator/selectors";
import {uploadDataParse} from "@src/store/generator/actionCreators";
import {selectIpfsLink, selectSmartContractLink, selectUserState, selectXmlSigned} from "@src/store/auth/selector";
import {fetchMetadataCid} from "@src/store/auth/saga";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";
import {localization} from '@src/pages/UnivesrityDetailsPage/generator';
import {selectLanguage} from "@src/store/generals/selectors";
import { set } from "react-ga";

const AddingGraduates: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const lang = useSelector(selectLanguage);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const archiveLink = useSelector(selectArchiveLink);
  const isUploaded = useSelector(selectIsUploaded);
  const xmlSigned = useSelector(selectXmlSigned);
  const navigate = useNavigate();
  const [ncaLayerFound, setNcaLayerFound] = useState(false);
  const userState = useSelector(selectUserState);
  const [type, setType] = React.useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!ncaLayerFound && type == 'excel') {
      alert("Подключите NCALayer");
      return;
    }
    dispatch(fetchUserProfile());

    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
    dispatch(uploadDataParse({file: uploadedFile}));

  };

  React.useEffect(() => {
    if (isUploaded && archiveLink) {
      goForward();
    }
  }, [isUploaded]);

  const dispatch = useDispatch();

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    if (type == "api") {
      setSteps([
        {title: "Проверьте данные", id: 2},
        {title: "Подпись данных через ЭЦП", id: 3},
        {title: "Результаты генерации", id: 4}
      ]);
      setShortSteps([
        localization[lang].AddingGratuates.check,
        localization[lang].AddingGratuates.sign,
        localization[lang].AddingGratuates.results
      ]);
      setStepId(steps[progress - 1].id);
    }
  }, [type]);

  const setTypeApi = () => {
    setType("api");
  };

  const signXmlWithDS = (res: any) => {
    if (res['code'] === "500") {
      alert(res['message']);
    } else if (res['code'] === "200") {
      res = res['responseObject'];
      dispatch(fetchSaveXmlRequest({xml: res, signed_by: userState.name}));
      setTimeout(() => {
      }, 2000);
    }
  };
  const ncaLayerXml = () => {
    NcaLayer.signXml(userState.university_id, signXmlWithDS);
  };

  React.useEffect(() => {
    if (xmlSigned == true) {
      if (stepId != 4) {
        const payload = {"university_id": userState.university_id};
        dispatch(fetchGetDiplomaCid(payload));
      }
      goForward();
    }
  }, [xmlSigned]);

  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, [!userState]);

  const resetInitialState = ():void => {
    window.location.reload();
  };

  const [shortSteps, setShortSteps] = React.useState([
    localization[lang].AddingGratuates.download,
    localization[lang].AddingGratuates.check,
    localization[lang].AddingGratuates.sign,
    localization[lang].AddingGratuates.results
  ]);
  const [steps, setSteps] = React.useState([
    {title: localization[lang].AddingGratuates.steps.excel.upload, id: 1},
    {title: localization[lang].AddingGratuates.steps.excel.check, id: 2},
    {title: localization[lang].AddingGratuates.steps.excel.sign, id: 3},
    {title: localization[lang].AddingGratuates.steps.excel.result, id: 4}
  ]);
  const [stepId, setStepId] = React.useState(0);
  const ipfsLink = useSelector(selectIpfsLink);
  const smartContractLink = useSelector(selectSmartContractLink);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileOrTablet = () => {
    return window.innerWidth <= 990;
  };
  const goBack = () => {
    if (progress > 0) {
      setStepId(progress - 1 == 0 ? 0 : steps[progress - 1].id);
      console.log("new id back", steps[progress - 1].id);

      setProgress(progress - 1);
    }
  };
  const fileSizeInKB = file?.size ? Math.round(file.size / 1024) : 0;
  const goForward = () => {
    // if (type == 'api') {
    //   setSteps([
    //     {title: "Проверьте данные", id: 2},
    //     {title: "Подпись данных через ЭЦП", id: 3},
    //     {title: "Результаты генерации", id: 4}
    //   ]);
    //   setShortSteps([
    //     localization[lang].AddingGratuates.check,
    //     localization[lang].AddingGratuates.sign,
    //     localization[lang].AddingGratuates.results
    //   ]);
    // }
    if (progress < steps.length) {
      if (stepId === 3 && !xmlSigned) {
        alert("Подпишите с помощью ЭЦП");
        return;
      }
      if (stepId == 1 && !file) {
        console.log("FILE NOT FOUND");
        return;
      }
      setStepId(steps[progress].id);
      setProgress(progress + 1);
    }
  };
  console.log(`step id ${stepId}`);
  NcaLayer.enableWebSocket(setNcaLayerFound);


  useEffect(() => {
    setIsMobile(isMobileOrTablet());
  }, []);

  useEffect(() => {
    switch (type) {
      case "excel":
        setSteps([
          {title: localization[lang].AddingGratuates.steps.excel.upload, id: 1},
          {title: localization[lang].AddingGratuates.steps.excel.check, id: 2},
          {title: localization[lang].AddingGratuates.steps.excel.sign, id: 3},
          {title: localization[lang].AddingGratuates.steps.excel.result, id: 4}
        ]);
        setShortSteps([
          localization[lang].AddingGratuates.download,
          localization[lang].AddingGratuates.check,
          localization[lang].AddingGratuates.sign,
          localization[lang].AddingGratuates.results
        ]);
        break;
      case "api":
        setSteps([
          {title: "Проверьте данные", id: 2},
          {title: "Подпись данных через ЭЦП", id: 3},
          {title: "Результаты генерации", id: 4}
        ]);
        setShortSteps([
          localization[lang].AddingGratuates.check,
          localization[lang].AddingGratuates.sign,
          localization[lang].AddingGratuates.results
        ]);
        break;
      case "":
        setSteps([
          {title: localization[lang].AddingGratuates.steps.excel.upload, id: 1},
          {title: localization[lang].AddingGratuates.steps.excel.check, id: 2},
          {title: localization[lang].AddingGratuates.steps.excel.sign, id: 3},
          {title: localization[lang].AddingGratuates.steps.excel.result, id: 4}
        ]);
        setShortSteps([
          localization[lang].AddingGratuates.download,
          localization[lang].AddingGratuates.check,
          localization[lang].AddingGratuates.sign,
          localization[lang].AddingGratuates.results
        ]);
        break;
    }
  }, [lang]);

  if (isMobile) {
    navigate(routes.main);
    return null;
  }

  return (

    <Box sx={{}}>
      <Box sx={{
        textAlign: "center",
        backgroundColor: "#FAFBFF",
        width: '95%',
        borderRadius: '30px',
        marginLeft: '2rem',
        padding: '40px', '@media (max-width: 998px)': {padding: '15px', marginLeft: '1rem'},
      }}>
        {stepId === 0 && <Typography variant="h6" fontWeight={600} textAlign="start" sx={{
          paddingBottom: '20px',
          '@media (max-width: 998px)': {
            fontSize: '1.2rem'
          },
        }}> {lang === 'ru' ? 'Выпустить дипломы' : lang === 'kz' ? 'Диплом тапсыру' : 'Issue Diplomas'}</Typography>
        }
        <IconButton 
          onClick={()=>{resetInitialState()}} 
          color="primary" sx={{
            display: stepId === 0 ? "none" : "block",
            width: "3.1rem !important",
            height: "3rem !important",
            '@media (max-width: 998px)': {},
            }}
        >
          <ArrowBackIcon/>
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: '100%'
          }}
        >
          {progress > 0 &&
              <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", backgroundColor: '#FAFBFF', paddingBottom: '2rem', width: '90%'
                  }}
              >
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Box
                        sx={{
                          width: "300px",
                          height: "2px",
                          backgroundColor:
                            index < progress ? "#3B82F6" : "#F8F8F8",
                          '@media (max-width: 998px)': {
                            width: '15vw',
                          },
                        }}

                      />
                    )}
                    <Box
                      sx={{
                        width: "3.1rem !important",
                        height: "3rem !important",
                        borderRadius: "50%",
                        backgroundColor:
                          index < progress ? "#3B82F6" : "#F8F8F8",
                        color: index < progress ? "white" : "#A1A1A1",
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        justifyContent: "center",

                      }}
                    >
                      <Typography position="absolute" textAlign="center">
                        {index + 1}
                      </Typography>
                      <Typography position="absolute" fontSize="0.75rem" whiteSpace="nowrap"
                                  color="#2D2D2D" top="3.3rem" textAlign="center">
                        {shortSteps[index]}
                      </Typography>
                    </Box>
                  </React.Fragment>
                ))}
              </Box>
          }


        </Box>

        {/* File Input */}
        <Box sx={{
          backgroundColor: 'white', paddingBottom: '10px', borderRadius: '30px'
        }}>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: stepId === 1 ? "flex-end" : "space-between",
              width: "100%",
            }}
          >
            {progress > 1 && (
              <IconButton onClick={goBack} color="primary" sx={{
                marginLeft: '50px',
                marginTop: '10px',
                width: "3.1rem !important",
                height: "3rem !important",
                marginBottom: '-70px',
                '@media (max-width: 998px)': {
                  marginLeft: '10px',
                  marginTop: '10px',
                  marginBottom: '-70px',
                },
              }}>
                <ArrowBackIcon/>
              </IconButton>
            )}
            {progress <= steps.length && progress > 0 && (
              <IconButton
                onClick={() => {
                  if (stepId === 1 && !file) {
                  } else {
                    goForward();
                  }
                }}
                color="primary"
                sx={{
                  marginRight: '50px',
                  marginTop: '10px',
                  marginBottom: '-70px',
                  width: "3.1rem !important",
                  height: "3rem !important",
                  '@media (max-width: 998px)': {
                    marginRight: '10px',
                    marginTop: '10px',
                    marginBottom: '-70px',
                  },
                }}
              >
                <ArrowForwardIcon/>
              </IconButton>
            )}
          </Box>
          {stepId === 0 && (
            <Box sx={{
              display: "flex",
              minHeight: "50vh",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              padding: "1rem",
              gap: "1rem",
            }}
            >
              <Box onClick={() => {
                setType("excel");

                goForward();
              }}>
                <Box sx={{
                  backgroundColor: "#F4F7FE",
                  width: "13rem",
                  height: "13rem",
                  borderRadius: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}>
                  <Box my={"auto"}>
                    <ExcelType/>
                  </Box>
                </Box>
                <Typography
                  mt=".5rem">{lang == 'ru' ? "Через Excel" : lang == 'kz' ? "Excel арқылы" : lang == 'en' ? "With Excel" : ""}</Typography>
              </Box>
              <Box onClick={() => {
                setTypeApi();
                setSteps([
                  {title: "Проверьте данные", id: 2},
                  {title: "Подпись данных через ЭЦП", id: 3},
                  {title: "Результаты генерации", id: 4}
                ]);
                setShortSteps([
                  localization[lang].AddingGratuates.check,
                  localization[lang].AddingGratuates.sign,
                  localization[lang].AddingGratuates.results
                ]);
                goForward();
              }}>
                <Box sx={{
                  backgroundColor: "#F4F7FE",
                  width: "13rem",
                  height: "13rem",
                  borderRadius: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}>
                  <Box my={"auto"}>
                    <ApiType/>
                  </Box>
                </Box>
                <Typography
                  mt=".5rem">{lang == 'ru' ? "Через API" : lang == 'kz' ? "API арқылы" : lang == 'en' ? "With API" : ""}</Typography>
              </Box>

            </Box>)
          }
          {stepId === 1 && (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            >

              <Typography variant="h6" sx={{
                paddingTop: '20px', paddingBottom: '20px',
                '@media (max-width: 998px)': {
                  fontSize: '1.2rem'
                },
              }}>
                {localization[lang].AddingGratuates.download}
              </Typography>

              <label
                htmlFor="file-input"
                style={{
                  width: "90%",
                  height: "400px",
                  marginTop: 2,
                  borderRadius: "15px",
                  border: "2px dashed #3B82F6",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img src={excel} style={{width: '38px', paddingBottom: '15px'}}/>
                {localization[lang].AddingGratuates.file}{" "}
                <span style={{textDecoration: "underline", cursor: "pointer"}}
                      onClick={handleChooseFileClick}>
									{localization[lang].AddingGratuates.file2}
								</span>
                <input
                  type="file"
                  id="file-input"
                  accept=".xls, .xlsx"
                  onChange={handleFileUpload}
                  style={{
                    display: "none",
                  }}
                  ref={fileInputRef}
                />
              </label>

              <Button variant="contained" color="primary"
                      sx={{marginTop: 2, borderRadius: '15px',}} onClick={() => {
                handleLink("https://generator.ediploma.kz/get-sample")
              }}> {localization[lang].AddingGratuates.template}</Button>
              <Box sx={{
                backgroundColor: '#FAFBFF',
                width: '90%',
                paddingTop: '20px',
                marginTop: '20px',
                marginBottom: '20px',
                textAlign: 'left',
                padding: '20px',
                borderRadius: '48px'
              }}>
                <Box sx={{color: '#3B82F6',}}>{localization[lang].AddingGratuates.note}</Box>
                <Box sx={{
                  marginTop: '10px',
                  color: '#A1A1A1'
                }}>{localization[lang].AddingGratuates.notes}</Box>
              </Box>
            </Box>)
          }

          {stepId === 2 && (file || type == 'api') && (
            <Box sx={{marginTop: 4, marginBottom: '20px'}}>
              <Typography variant="h6" sx={{
                '@media (max-width: 998px)': {
                  fontSize: '1.4rem'
                },
              }}>{localization[lang].AddingGratuates.check}</Typography>
              <Box sx={{
                width: '90%',
                borderRadius: '50px',
                height: '300px',
                backgroundColor: '#FAFBFF', padding: '25px', marginTop: '16px', marginLeft: '70px',
                '@media (max-width: 998px)': {
                  width: '95%', padding: '1px', marginLeft: '10px'
                },
              }}>
                <Box sx={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '16px',
                  whiteSpace: 'nowrap', textAlign: 'left', padding: '28px 28px 0 28px'
                }}>
                  <Typography variant="subtitle1" sx={{
                    color: '#A1A1A1',
                    '@media (max-width: 998px)': {
                      fontSize: '1rem', marginRight: '10px'
                    },
                  }}>{localization[lang].AddingGratuates.nameFile}:</Typography>
                  <Typography ml="auto" variant="subtitle1" sx={{
                    color: '#A1A1A1',
                    '@media (max-width: 998px)': {
                      fontSize: '1rem',
                    },
                  }}>{localization[lang].AddingGratuates.status}:</Typography>
                </Box>
                <Box sx={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '16px',
                  whiteSpace: 'nowrap', textAlign: 'left', padding: '28px 28px 0 28px'
                }}>
                  <Typography variant="body1"
                              sx={{
                                display: 'flex', alignItems: 'center', color: '#A1A1A1',
                                '@media (max-width: 998px)': {
                                  fontSize: '1rem', marginRight: '10px'
                                },
                              }}>
                    <img src={archive} alt=""
                         style={{marginRight: '8px', filter: "brightness(2.5)"}}
                    />
                    Архив с дипломами</Typography>
                  <Box ml="auto">
                    {archiveLink.trim() != "" || type == "api" ?
                      <Button variant="contained" color="primary"
                              sx={{borderRadius: '1rem', padding: ".75rem"}}
                              onClick={() => {
                                handleLink(type == "api" ? "https://generator.ediploma.kz/get-file/archives/3.zip" : archiveLink);
                              }}><DownloadIcon style={{filter: "brightness(20)"}}/></Button>
                      : <CircularProgress style={{marginLeft: "auto"}}/>
                    }
                  </Box>
                </Box>
              </Box>
              <Button variant="contained" color="primary"
                      sx={{marginTop: 2, borderRadius: '15px'}}
                      onClick={() => goForward()}> {localization[lang].AddingGratuates.next}</Button>
            </Box>
          )}

          {stepId === 3 && (file || type == "api") && (
            <Box sx={{marginTop: 4, marginBottom: '20px'}}>
              <Typography variant="h6" sx={{
                '@media (max-width: 998px)': {
                  fontSize: '1.3rem'
                },
              }}>{localization[lang].AddingGratuates.sign}</Typography>
              <Box sx={{
                width: '90%',
                borderRadius: '50px',
                height: '300px',
                '@media (max-width: 998px)': {
                  width: '95%',
                  padding: '1px',
                  marginLeft: '10px'
                },
                backgroundColor: '#FAFBFF',
                padding: '25px',
                marginTop: '16px',
                marginLeft: '70px',


              }}>
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  marginBottom: '16px',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  padding: '28px 28px 0 28px'
                }}>
                  <Typography variant="subtitle1" sx={{
                    color: '#A1A1A1',
                    '@media (max-width: 998px)': {
                      fontSize: '1rem', marginRight: '10px'
                    },
                  }}>{localization[lang].AddingGratuates.nameFile}:</Typography>
                  <Typography ml="auto" variant="subtitle1" sx={{
                    color: '#A1A1A1',
                    '@media (max-width: 998px)': {
                      display: 'none'
                    },
                  }}>{localization[lang].AddingGratuates.status}:</Typography>
                </Box>
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  marginBottom: '16px',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  padding: '28px'
                }}>
                  <Typography variant="body1"
                              sx={{
                                display: 'flex', alignItems: 'center',
                                '@media (max-width: 998px)': {
                                  marginLeft: '1rem'
                                },
                              }}>
                    <img src={archive} alt=""
                         style={{marginRight: '8px', filter: "brightness(2.5)"}}/>
                    Архив с дипломами
                  </Typography>
                  <Button variant="contained" color="primary"
                          sx={{marginLeft: "auto", borderRadius: '1rem', padding: ".75rem"}}
                          onClick={() => {
                            handleLink(archiveLink);
                          }}><DownloadIcon style={{filter: "brightness(20)"}}/></Button>
                </Box>
              </Box>
              <Button variant="contained" color="primary"
                      sx={{marginTop: 2, borderRadius: '15px'}}
                      onClick={() => {
                        ncaLayerXml();
                      }}> {localization[lang].AddingGratuates.signButton}</Button>
            </Box>
          )}

          {/* Upload Button */}
          {
            stepId === 4 && (file || type == "api") && (

              <Box sx={{marginBottom: '20px'}}>

                <Typography variant="h6" sx={{
                  paddingTop: '15px',
                  '@media (max-width: 998px)': {
                    fontSize: '1.4rem'
                  },
                }}> {localization[lang].AddingGratuates.results}</Typography>
                <Box sx={{
                  width: '90%', borderRadius: '50px',
                  height: '300px',
                  '@media (max-width: 998px)': {
                    width: '95%', padding: '1px', marginLeft: '10px',
                  }, backgroundColor: '#FAFBFF', padding: '25px', marginTop: '16px', marginLeft: '70px',
                }}>
                  <Box>
                    <Typography variant="h3"
                                sx={{
                                  textAlign: 'left', color: '#A1A1A1',
                                  '@media (max-width: 998px)': {
                                    width: '95%',
                                    padding: '1px',
                                    marginTop: '1.5rem',
                                    marginLeft: '1rem'
                                  },
                                }}>{localization[lang].AddingGratuates.adress}:</Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      padding: '9px',
                      marginTop: '6px',
                      borderRadius: '50px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body1" sx={{fontSize: '16px'}}>
                      {localization[lang].AddingGratuates.addressLink}
                    </Typography>
                    {ipfsLink == "" ?
                      <CircularProgress style={{marginLeft: "auto",}}/> :
                      <Button variant="contained" color="primary" sx={{
                        marginLeft: 'auto',
                        height: '34px',
                        borderRadius: '32px'
                      }}
                              onClick={() => {
                                setSnackbar({
                                  visible: true,
                                  message: "Скопировано!",
                                  status: "success"
                                })
                                navigator.clipboard.writeText(`https://ipfs.io/ipfs/${ipfsLink}`);
                              }}
                      > Cкопировать</Button>
                    }
                  </Box>
                  <Box>

                    <Typography variant="h3"
                                sx={{
                                  textAlign: 'left', paddingTop: '20px', color: '#A1A1A1',
                                  '@media (max-width: 998px)': {
                                    width: '95%',
                                    padding: '1px',
                                    marginTop: '1.5rem',
                                    marginLeft: '1rem'
                                  },
                                }}>{localization[lang].AddingGratuates.smart}:</Typography>

                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      padding: '9px',
                      marginTop: '6px', borderRadius: '50px', display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body1" sx={{
                      textAlign: 'left',
                      fontSize: '16px'
                    }}>
                      {localization[lang].AddingGratuates.smartlink}
                    </Typography>
                    {smartContractLink == "" ?
                      <CircularProgress style={{marginLeft: "auto",}}/> :
                      <Button variant="contained" color="primary" sx={{
                        marginLeft: 'auto',
                        height: '34px',
                        borderRadius: '32px'
                      }}
                              onClick={() => {
                                setSnackbar({
                                  visible: true,
                                  message: "Скопировано!",
                                  status: "success"
                                })
                                navigator.clipboard.writeText(smartContractLink);
                              }}
                      > Cкопировать</Button>
                    }
                  </Box>
                </Box>
                <Button variant="contained" color="primary"
                        sx={{marginTop: 2, borderRadius: '15px'}}
                        onClick={() => navigate(routes.hrBank)}> {localization[lang].AddingGratuates.finish} </Button>
              </Box>
            )
          }
        </Box>
      </Box>
    </Box>
  );
};

export default AddingGraduates;
