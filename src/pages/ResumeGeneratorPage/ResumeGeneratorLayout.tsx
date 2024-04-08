import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton, MenuItem, Backdrop, CircularProgress
} from '@mui/material';
import { Button, Input, Label, Modal } from '@src/components';
import { ReactComponent as TrashIcon } from "@src/assets/icons/alternate_trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectImageLink, selectResumeLoading, selectUserRole, selectUserState } from '@src/store/auth/selector';
import {
  fetchGenerateResume,
  fetchUpdateUserProfile,
  fetchUploadFile,
  fetchUserProfile
} from "@src/store/auth/actionCreators";
import { selectLanguage } from "@src/store/generals/selectors";
import { ReactComponent as ArrowIcon } from '@src/assets/icons/arrowIcon.svg';
import { useNavigate } from "react-router";
import styles from "./ResumeGeneratorPage.module.css";
import { localization, content, desktopContent, skillsList } from "./generator";
import { Select } from '@src/components/Select/Select';
import { ReactComponent as AccountCircleIcon } from '@src/assets/icons/profileIcon.svg';
import { ReactComponent as AddOutlineIcon } from '@src/assets/icons/add_outlined.svg';
import { ReactComponent as UploadIconFile } from '@src/assets/icons/upload_file.svg';
import { ReactComponent as DownloadIcon } from '@src/assets/icons/Upload.svg';
import { ReactComponent as PDFIcon } from '@src/assets/icons/PDF.svg';
import { ReactComponent as HeaderSearchIcon } from '@src/assets/icons/search.svg';

import { MultiSelect } from "@src/components/MultiSelect/MuiltiSelect";
import Checkbox from "@mui/material/Checkbox";
import { handleLink } from '@src/utils/link';

export const ResumeGeneratorLayout: React.FC = () => {
  const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
  const lang = useSelector(selectLanguage);
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const imageLink = useSelector(selectImageLink);
  const contentForms = isMobile ? content : desktopContent;
  const [requiredForm, setRequiredForm] = React.useState<any>(contentForms[0]);
  const [state, setState] = React.useState<Record<string, any>>({});
  const [avatarUpload, setAvatarUpload] = useState<boolean>(false);
  const [fileUpload, setFileUpload] = useState<boolean>(false);
  const [file, setFile] = useState<string | null>(state && state.certificates ? state.certificates : null);
  const [step, setStep] = React.useState(1);
  const [backropOpen, setBackropOpen] = React.useState(false);

  const isResumeLoading = useSelector(selectResumeLoading);
  const handleChooseFileClick = (type = "file") => {
    if (type === "file") {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      if (avatarInputRef.current) {
        avatarInputRef.current.click();
      }
    }

  };
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileUpload(false);
    const uploadedFile = event.target.files?.[0] || null;
    setAvatarUpload(true);
    dispatch(fetchUploadFile({ file: uploadedFile }));
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarUpload(false);
    const uploadedFile = event.target.files?.[0] || null;
    setFileUpload(true);
    dispatch(fetchUploadFile({ file: uploadedFile }));
  };
  const handleChange = (e: any) => {
    let item = e.target.value;
    if (e.target.name == 'experience_still_working') {
      item = e.target.checked ?? e.target.value;
    } else if (Array.isArray(item)) {
      item = JSON.stringify(item);
    } else if (!item.trim().length) {
      item = null;
    }

    setState({ ...state, [e.target.name]: item });
  };
  const handleSubmit = () => {
    const payload = { "attributes": state };
    dispatch(fetchUpdateUserProfile(payload));
  };
  const getGridSize = (elType: string, maxRows: number) => {
    let n = 12;
    switch (elType) {
      case "lg":
        n = 12 / maxRows;
        break;
      case "md":
        n = 12 / Math.min(Math.ceil((-1 + Math.sqrt(1 + 8 + 1)) / 2), 3);
        break;
      default:
        n = 12;
    }
    return n;
    //xs={12} sm={12} md={6} lg={3,4,6}
  };
  const uploadCertificate = (file: any) => {
    const payload = {
      "attributes": {
        "certificates": file
      }
    };
    dispatch(fetchUpdateUserProfile(payload));
  };
  const handleFileDelete = () => {
    setFile(null);
    uploadCertificate(null);
  };
  const previousStep = () => {
    if (step - 1 > 0) {
      setStep(step - 1);
    }
  };
  const nextStep = () => {
    if (step + 1 <= contentForms.length) {
      setStep(step + 1);
    }
    if (step == contentForms.length - 1) {
      console.log(123);
      dispatch(fetchGenerateResume());
    }
    handleSubmit();
  };

  React.useEffect(() => {
    setRequiredForm(contentForms[step - 1]);
  }, [requiredForm, step]);

  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, [!userState]);

  React.useEffect(() => {
    setState(userState);
  }, [userState]);

  React.useEffect(() => {
    if (imageLink && avatarUpload) {
      const payload = {
        "attributes": {
          "avatar": imageLink
        }
      };
      dispatch(fetchUpdateUserProfile(payload));
    }
  }, [imageLink, avatarUpload]);

  React.useEffect(() => {
    if (imageLink && fileUpload) {
      setFile(imageLink);
      uploadCertificate(imageLink);
    }
  }, [imageLink, fileUpload]);
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        paddingX: "2rem",
        width: "100%",
        minHeight: "100vh",
        marginTop: "1rem",
        '@media (max-width: 778px)': {
          width: '100%',
          paddingX: ".5rem",
        },
      }}>
      <Backdrop
        sx={{
          color: '#fff',
          backgroundColor: 'rgb(59,130,246, 0.2)',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={backropOpen}
        onClick={() => {
          setBackropOpen(false);
        }}
      >
        <label
          htmlFor={"file-input"}
          style={{
            width: "20rem",
            height: "20rem",
            marginTop: "1rem",
            borderRadius: "15px",
            backgroundColor: "#ffffff",
            backgroundImage: "",
            border: "2px dashed #3B82F6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",

          }}
        >
          <UploadIconFile style={{ width: "4rem", height: "4rem" }} />
          <Typography
            color="black"
            fontWeight="600"
            fontSize="1.1rem"
            style={{
              cursor: "pointer"
            }}
            onClick={() => handleChooseFileClick("gallery")}>
            Загрузите вашу фотографию
          </Typography>
          <Typography
            align="center"
            color="black"
            fontSize="1rem"
            paddingX="1rem"
            style={{
              cursor: "pointer"
            }}
            onClick={() => handleChooseFileClick("gallery")}>
            Фотография должна быть в формате png jpg неболее 5 мб
          </Typography>
          <input
            type="file"
            id={"file-input"}
            ref={avatarInputRef}
            accept=".jpeg, .jpg, .png,.svg, .webp"
            onChange={handleAvatarUpload}
            style={{
              display: "none",
            }}
          />
        </label>
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          flexDirection: "column",
          '@media (max-width: 778px)': {},
        }}>
        <Box mb="1rem" display="flex" onClick={() => {
          navigate(-1);
        }}>
          <IconButton style={{ alignSelf: "center" }} sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
            <ArrowIcon />
          </IconButton>
          <Typography className={styles.textMd} marginLeft=".5rem" align="center" fontWeight='600'
            color='#3B82F6'
            fontSize={"1rem"}>
            {localization[lang].StudentPage.Menu.back}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "start",
            '@media (max-width: 778px)': {},
          }}
        >
          {isMobile && contentForms.map((value: any, formIndex) =>
            <Box
              key={formIndex}
              sx={{
                border: "solid 1rem #D8E6F",
                borderTopLeftRadius: formIndex == 0 ? "2rem" : "0",
                borderTopRightRadius: formIndex == contentForms.length - 1 ? "2rem" : "0",
                width: `calc(100%/${contentForms.length})`,
                height: "1rem",
                transition: "background .2s ease-in-out",
                backgroundColor: step >= formIndex + 1 ? "#3B82F6" : "#d8eaff"
              }} />)}
        </Box>
        {requiredForm &&
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '30px',
              borderTopRightRadius: isMobile ? "0" : "",
              borderTopLeftRadius: isMobile ? "0" : "",
              minHeight: "78vh",
              paddingTop: '20px',
              padding: "1rem",
              display: 'flex',
              paddingX: "2rem",
              justifyContent: 'flex-start',
              width: '100%',
              flexDirection: 'column',
              '@media (max-width: 778px)': {
                marginX: "0",
                paddingX: "1rem",
              },
            }}
          >
            {!isMobile &&
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingY: '1.5rem',
                    width: '90%'
                  }}
                >
                  {contentForms.map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <Box
                          sx={{
                            width: `calc(100% / (${contentForms.length} * 1.2))`,
                            height: "2px",
                            alignSelf: "center",
                            marginBottom: "2rem",
                            transition: "background .2s ease-in-out",
                            backgroundColor:
                              index <= step - 1 ? "#3B82F6" : "#F8F8F8",
                          }}

                        />
                      )}
                      <Box
                        sx={{
                          width: "3rem !important",
                          height: "3rem !important",
                          marginBottom: "2rem",
                          borderRadius: "2rem",
                          backgroundColor:
                            index <= step - 1 ? "#3B82F6" : "#F8F8F8",
                          color: index <= step - 1 ? "white" : "#A1A1A1",
                          display: "flex",
                          transition: "background .3s ease-in-out",
                          alignItems: "center",
                          position: "relative",
                          justifyContent: "center",

                        }}
                      >
                        <Typography
                          position="absolute"
                          textAlign="center"
                          sx={{
                            transition: "color .3s ease-in-out",
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <Typography
                          position="absolute"
                          fontSize="0.75rem"
                          whiteSpace="normal"
                          color="#2D2D2D"
                          top="3.3rem"
                          textAlign="center"
                          sx={{
                            transition: "color .3s ease-in-out",
                            color: step >= index + 1 ? "#1c60cc" : "#2D2D2D"
                          }}
                        >
                          {item.title[lang]}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            }
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%',
                '@media (max-width: 778px)': {
                  flexDirection: 'column',
                  marginX: "0",
                  paddingX: "1rem",
                },
              }}
            >
              <Box sx={{
                width: "70%",
                '@media (max-width: 778px)': {
                  width: "100%",
                },
              }}
              >
                <Typography variant="h6" fontWeight="600">
                  {requiredForm.title ? requiredForm.title[lang] : ""}
                </Typography>
                <Box sx={{
                  display: "flex",
                  justifyItems: "space-between",
                  justifyContent: "space-between",
                  '@media (max-width: 778px)': {},
                }}>
                  <Typography sx={{
                    fontSize: '16px',
                    paddingBottom: '15px'
                  }}>
                    {(requiredForm.additionalText ? requiredForm.additionalText[lang] : "")}
                  </Typography>

                </Box>
                <Grid

                  container
                  md={12}
                  lg={11}
                  justifyContent="start"
                  spacing={[2, isMobile ? 2 : 2]}
                //todo may be change
                >
                  {requiredForm.forms.map((el: any, index2: number) => {
                    if (el.ifNotInput && state[el.ifNotInput]) {
                      return null;
                    }
                    if (el.type == "select") {
                      return (
                        <Grid item
                          xs={el.multiline ? 12 : getGridSize("xs", el.maxRows)}
                          sm={el.multiline ? 12 : getGridSize("sm", el.maxRows)}
                          md={el.multiline ? 12 : getGridSize("md", el.maxRows)}
                          lg={el.multiline ? 12 : getGridSize("lg", el.maxRows)}
                          key={index2}>

                          <Label label={el.label ? (el.label[lang] ?? el.label) : ""} />
                          <Select
                            type={el.type}
                            name={el.name}
                            value={state[el.name] || ''}
                            fullWidth={true}
                            onChange={handleChange}
                          >

                            {el.values && el.values.map((val: any) => (
                              <MenuItem

                                key={val.value}
                                value={val.value}
                              >
                                {val.label[lang]}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>);
                    }
                    if (el.type == "multi-select") {
                      return (
                        <Grid item
                          xs={el.multiline ? 12 : getGridSize("xs", el.maxRows)}
                          sm={el.multiline ? 12 : getGridSize("sm", el.maxRows)}
                          md={el.multiline ? 12 : getGridSize("md", el.maxRows)}
                          lg={el.multiline ? 12 : getGridSize("lg", el.maxRows)}
                          key={index2}>

                          <MultiSelect
                            type={el.type}
                            name={el.name}
                            fullWidth={true}
                            IconComponent={HeaderSearchIcon}
                            defaultValues={JSON.parse(state[el.name]) ?? []}
                            handleChange={handleChange}
                            options={skillsList[state.speciality_ru as keyof typeof skillsList] ? skillsList[state.speciality_ru as keyof typeof skillsList][lang] : []}
                            innerLabel={"Выберите Навыки"}
                          >
                          </MultiSelect>
                        </Grid>);
                    }
                    if (el.type == 'avatar') {
                      return (
                        <Grid item
                          xs={el.multiline ? 12 : getGridSize("xs", el.maxRows)}
                          sm={el.multiline ? 12 : getGridSize("sm", el.maxRows)}
                          md={el.multiline ? 12 : getGridSize("md", el.maxRows)}
                          lg={el.multiline ? 12 : getGridSize("lg", el.maxRows)}
                          key={index2}>
                          <Box key={index2} sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            alignItems: "start",
                            gap: ".5rem"
                          }}
                            onClick={() => {
                              setBackropOpen(true);
                            }}
                          >

                            <Box
                              style={{
                                cursor: 'pointer',
                              }}
                            >

                              {userState && userState.avatar ?
                                <Box sx={{
                                  width: "25vh",
                                  height: "25vh",
                                  position: "relative",
                                  '@media (max-width: 778px)': {
                                    width: "100%",
                                    height: "100%",
                                  },
                                }}>
                                  <Box sx={{
                                    width: "25.5vh",
                                    height: "25.5vh",
                                    opacity: '0',
                                    position: "absolute",
                                    transition: "opacity .2s ease-in-out",
                                    left: "-1%",
                                    top: "-1%",
                                    '&:hover': {
                                      opacity: "80%",
                                      transition: "opacity .2s ease-in-out"
                                    },
                                  }}>
                                    <AccountCircleIcon width="100%" height="100%" />
                                  </Box>
                                  <img style={{
                                    width: "100%",
                                    height: "100%",
                                    aspectRatio: "1",
                                    objectFit: "cover",
                                    borderRadius: "50%"
                                  }}
                                    src={`${baseURL}/${state[el.name]}`} alt="" />
                                </Box>
                                :
                                <AccountCircleIcon
                                  style={{
                                    alignSelf: "center",
                                    width: "2.5rem",
                                    height: "2.5rem"
                                  }} />}
                            </Box>
                            {state && !state[el.name] &&
                              <Box display={"flex"}>
                                <Typography fontSize="1rem"
                                  style={{ alignSelf: "center" }}>
                                  {el.label ? (el.label[lang] ?? el.label) : ""}
                                </Typography>
                                <AddOutlineIcon style={{ alignSelf: "center" }} />
                              </Box>

                            }
                          </Box>
                        </Grid>
                      )
                        ;
                    }
                    if (el.type == 'file') {
                      return (
                        <Grid item
                          xs={el.multiline ? 12 : getGridSize("xs", el.maxRows)}
                          sm={el.multiline ? 12 : getGridSize("sm", el.maxRows)}
                          md={el.multiline ? 12 : getGridSize("md", el.maxRows)}
                          lg={el.multiline ? 12 : getGridSize("lg", el.maxRows)}
                          key={index2}>
                          <Label label={el.label ? (el.label[lang] ?? el.label) : ""} />
                          <Box key={index2} sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "start",
                            gap: "1rem",
                            flexDirection: "column",
                            '@media (max-width: 778px)': {
                              flexDirection: "row",
                            },
                          }}>
                            {state && !state.certificates &&
                              <label
                                htmlFor={"file-input" + index2}
                                style={{
                                  width: "100%",
                                  marginTop: "1rem",
                                  padding: ".75rem 1rem",
                                  borderRadius: "15px",
                                  backgroundColor: "transparent",
                                  border: "2px dashed #3B82F6",
                                  display: "flex",
                                  cursor: "pointer",
                                }}
                              >
                                <Box sx={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  '@media (max-width: 778px)': {
                                    justifyContent: "center",
                                    flexDirection: "column",
                                  },
                                }}>
                                  <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    '@media (max-width: 778px)': {
                                      flexDirection: "row",
                                      justifyContent: "start",
                                      alignSelf: "start",
                                    }
                                  }}>
                                    <Box display="flex" alignSelf="flex-start"
                                      justifyContent="start">
                                      <UploadIconFile
                                        style={{
                                          width: "3rem",
                                          height: "3rem",
                                          alignSelf: "center"
                                        }} />
                                      <Box ml=".5rem" display="flex"
                                        flexDirection="column"
                                        justifyContent="center">
                                        <Typography fontSize="0.875rem"
                                          fontWeight="600">
                                          Загрузите сертификат
                                        </Typography>
                                        <Typography fontSize="0.75rem"
                                          color="#818181"
                                          fontWeight="400">
                                          {el.placeholder}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                  {!isMobile &&
                                    <Typography fontSize="0.75rem" ml={"20%"}
                                      color="#818181"
                                      textAlign="center"
                                      fontWeight="600">
                                      не более 5 мб
                                    </Typography>}
                                  <Box
                                    sx={{
                                      margin: ".5rem 0",
                                      width: "25%",
                                      backgroundColor: "#3B82F6",
                                      borderRadius: "3rem",
                                      padding: "1rem",
                                      display: "flex",
                                      justifyContent: "center",
                                      height: "3rem",
                                      '@media (max-width: 778px)': {
                                        width: "100%",
                                      },
                                    }}
                                  >
                                    <Typography color="white" fontSize="1rem"
                                      textAlign="center"
                                      alignSelf="center">
                                      Выбрать
                                    </Typography>
                                  </Box>
                                  {isMobile &&
                                    <Typography fontSize="0.75rem" color="#818181"
                                      textAlign="center"
                                      fontWeight="400">
                                      не более 5 мб
                                    </Typography>}
                                  <input type="file" id={"file-input" + index2}
                                    accept=".pdf, .png,"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                    ref={fileInputRef} />
                                </Box>
                              </label>
                            }
                            {state && state.certificates &&
                              <Box sx={{
                                backgroundColor: "#F4F7FE",
                                width: "100%",
                                display: "flex",
                                padding: ".75rem 1rem",
                                borderRadius: "1rem",
                              }}>
                                <PDFIcon />
                                <Box display="flex" flexDirection="column" ml="1rem"
                                  justifyContent="center">
                                  <Typography>
                                    Сертификат
                                  </Typography>
                                </Box>
                                <IconButton style={{
                                  marginLeft: "auto",
                                  cursor: "pointer",
                                }}
                                  onClick={() => {
                                    handleFileDelete();
                                  }}
                                >
                                  <TrashIcon style={{
                                    alignSelf: "center",
                                    width: "1.5rem",
                                    height: "1.5rem",
                                  }} />
                                </IconButton>
                              </Box>
                            }
                          </Box>
                        </Grid>);
                    }
                    if (el.type == "checkbox") {
                      return (
                        <Grid item
                          display={"flex"}
                          xs={el.multiline ? 12 : getGridSize("xs", el.maxRows)}
                          sm={el.multiline ? 12 : getGridSize("sm", el.maxRows)}
                          md={el.multiline ? 12 : getGridSize("md", el.maxRows)}
                          lg={el.multiline ? 12 : getGridSize("lg", el.maxRows)}
                          key={index2}>

                          <Checkbox
                            name={el.name}
                            disabled={el!.disabled ?? false}
                            defaultChecked={state[el.name]}
                            onChange={handleChange}
                          // placeholder={el.placeholder ? (el.placeholder[lang] ?? el.placeholder) : ""}
                          // errorText={'Some error message'}
                          />
                          <Typography fontSize="1rem"
                            alignSelf="center">{el.label ? (el.label[lang] ?? el.label) : ""}</Typography>

                                  </Grid>
                                );
                              }
                              if (el.type == 'pdf') {
                                return (
                                  <Grid item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        key={index2}>
                                    <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
                                    <Box key={index2} sx={{
                                      display: "flex",
                                      width: "100%",
                                      alignItems: "start",
                                      gap: "1rem",
                                      flexDirection: "column",
                                      '@media (max-width: 778px)': {
                                        flexDirection: "row",
                                      },
                                    }}>
                                      {isResumeLoading &&
                                          <label
                                              htmlFor={"file-input" + index2}
                                              style={{
                                                width: "100%",
                                                marginTop: "1rem",
                                                padding: ".75rem 1rem",
                                                borderRadius: "15px",
                                                backgroundColor: "transparent",
                                                border: "2px dashed #3B82F6",
                                                display: "flex",
                                                cursor: "pointer",
                                              }}
                                          >
                                              <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                paddingY: "2rem",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                '@media (max-width: 778px)': {
                                                  justifyContent: "center",
                                                  flexDirection: "column",
                                                },
                                              }}>
                                                  <CircularProgress color="success"/>
                                              </Box>
                                          </label>
                                      }
                                      {!isResumeLoading &&
                                          <Box sx={{
                                            backgroundColor: "#F4F7FE",
                                            width: "100%",
                                            display: "flex",
                                            padding: ".75rem 1rem",
                                            borderRadius: "1rem",
                                          }}>
                                              <IconButton style={{
                                                cursor: "pointer",
                                              }}
                                              >
                                                  <PDFIcon style={{
                                                    alignSelf: "center",
                                                    width: "2rem",
                                                    height: "2rem",
                                                  }}/>
                                              </IconButton>
                                              <Box display="flex" flexDirection="column" ml="1rem"
                                                   justifyContent="center">
                                                  <Typography sx={{}}>
                                                    {state ? state.resume_link ? state.resume_link.split("uploads/")[1].split("_").join(" ") : "" : ""}
                                                  </Typography>
                                              </Box>
                                              <IconButton style={{
                                                marginLeft: "auto",
                                                cursor: "pointer",
                                              }}
                                                          onClick={() => {
                                                            handleLink(state ? state.resume_link : "");
                                                          }}
                                              >
                                                  <DownloadIcon style={{
                                                    alignSelf: "center",
                                                    width: "1.5rem",
                                                    height: "1.5rem",
                                                  }}/>
                                              </IconButton>
                                          </Box>
                                      }
                                    </Box>
                                  </Grid>);
                              }
                              if (el.name == 'desired_job_position') {
                                console.log(state);
                                console.log('LOG:', state[el.name]);
                              }
                              return (
                                <Grid item
                                      xs={el.multiline ? 12 : getGridSize("xs", el.maxRows)}
                                      sm={el.multiline ? 12 : getGridSize("sm", el.maxRows)}
                                      md={el.multiline ? 12 : getGridSize("md", el.maxRows)}
                                      lg={el.multiline ? 12 : getGridSize("lg", el.maxRows)}
                                      key={index2}>

                                  <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
                                  <Input
                                    type={el.type}
                                    name={el.name}
                                    disabled={el!.disabled ?? false}
                                    value={state[el.name] || ""}
                                    inputProps={{min: el.min, max: el.max}}
                                    minRows={el.rows ?? 1}
                                    reducePadding={(el.multiline ?? false) && el.rows > 1}
                                    multiline={(el.multiline ?? false) && el.rows > 1}
                                    placeholder={el.placeholder ? (el.placeholder[lang] ?? el.placeholder) : ""}
                                    onChange={handleChange}
                                    // errorText={'Some error message'}
                                  />
                                </Grid>
                              );
                  })}

                </Grid>

              </Box>
              {
                requiredForm.forms.length ? (
                  <Box sx={{
                    display: 'flex',
                    width: "30%",
                    justifyContent: 'flex-end',
                    flexDirection: "column",
                    gap: ".5rem",
                    marginLeft: "auto",
                    marginBottom: 'auto',
                    marginTop: ".5rem",
                    '@media (max-width: 778px)': {
                      width: "100%",
                      marginTop: '36px',
                      marginBottom: '',
                    },
                  }}
                  >
                    <Button
                      style={{ display: step == contentForms.length ? "none" : 'block' }}
                      variant="contained"
                      borderRadius="3rem"
                      onClick={nextStep}>
                      Продолжить
                    </Button>
                    <Button
                      variant="outlined"
                      borderRadius="3rem"
                      onClick={previousStep}>
                      Назад
                    </Button>
                  </Box>
                ) : null
              }
            </Box>
          </Box>
        }
      </Box>

    </Box>

  )
    ;

}
  ;
