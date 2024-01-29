import React, {useState, useRef} from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton, MenuItem
} from '@mui/material';
import {Button, Input, Label} from '@src/components';
import {ReactComponent as TrashIcon} from "@src/assets/icons/Trash.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectImageLink, selectUserRole, selectUserState} from '@src/store/auth/selector';
import {
  fetchUpdateUserProfile,
  fetchUploadFile,
  fetchUserProfile,
  fetchVisibility,
} from "@src/store/auth/actionCreators";
import {selectLanguage} from "@src/store/generals/selectors";
import {ReactComponent as ArrowIcon} from '@src/assets/icons/arrowIcon.svg';
import {useNavigate} from "react-router";
import styles from "./ResumeGeneratorPage.module.css";
import {localization, content} from "./generator";
import { Select } from '@src/components/Select/Select';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
export const ResumeGeneratorLayout: React.FC = () => {

  const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
  const lang = useSelector(selectLanguage);

  type ContentKey = keyof typeof content;

  const role: ContentKey = useSelector(selectUserRole).toLowerCase();
  const [requiredForm, setRequiredForm] = React.useState<any>(content[0]);

  const userState = useSelector(selectUserState);
  const dispatch = useDispatch();
  const [state, setState] = React.useState<Record<string, any>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUpload, setFileUpload] = useState<boolean>(false);
  const [galleryUpload, setGalleryUpload] = useState<boolean>(false);
  const imageLink = useSelector(selectImageLink);

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const handleChooseFileClick = (type = "banner") => {
    if (type === "banner") {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      if (galleryInputRef.current) {
        galleryInputRef.current.click();
      }
    }

  };
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGalleryUpload(false);
    const uploadedFile = event.target.files?.[0] || null;
    setFileUpload(true);
    dispatch(fetchUploadFile({file: uploadedFile}));

  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (galleryImages.length >= 3) {
      return;
    }
    setFileUpload(false);
    const uploadedFile = event.target.files?.[0] || null;
    setGalleryUpload(true);
    dispatch(fetchUploadFile({file: uploadedFile}));
  };
  const handleChange = (e: any) => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    const payload = {"attributes": state};
    dispatch(fetchUpdateUserProfile(payload));
  };
  const navigate = useNavigate();
  const getGridSize = (elType: string, index: number) => {
    index = index + 1;
    let n = 12;
    switch (elType) {
      case "lg":
      case "md":
        n = 12 / Math.min(Math.ceil((-1 + Math.sqrt(1 + 8 * index)) / 2), 3);
        break;
      default:
        n = 12;
    }
    return n;
    //xs={12} sm={12} md={6} lg={3,4,6}
  };
  const uploadGalleryImage = (galleryImages: any) => {
    const payload = {
      "attributes": {
        "gallery": JSON.stringify(galleryImages)
      }
    };
    dispatch(fetchUpdateUserProfile(payload));
  };
  const handleImageClick = (val: string) => {
    setGalleryImages(galleryImages.filter(v => v !== val));
    uploadGalleryImage(galleryImages.filter(v => v !== val));
  };
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    setRequiredForm(content[step - 1]);
  }, [requiredForm, step]);

  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, [!userState]);

  React.useEffect(() => {
    setState(userState);
    if (userState.gallery) {
      let images = JSON.parse(userState.gallery);
      setGalleryImages(images);
    }

  }, [userState]);

  React.useEffect(() => {
    if (userState && userState.role === 'Employer' && imageLink && fileUpload) {
      const payload = {
        "attributes": {
          "avatar": imageLink
        }
      };
      dispatch(fetchUpdateUserProfile(payload));
      return;
    }

    if (imageLink && fileUpload) {
      const payload = {
        "attributes": {
          "banner": imageLink
        }
      };
      dispatch(fetchUpdateUserProfile(payload));
    }
  }, [imageLink, fileUpload]);

  React.useEffect(() => {
    if (imageLink && galleryUpload) {
      if (!galleryImages.includes(imageLink)) {
        galleryImages.push(imageLink);
      }
      uploadGalleryImage(galleryImages);
    }
  }, [imageLink, galleryUpload]);

  const previousStep = () => {
    if (step - 1 > 0) {
      setStep(step - 1);
    }
  };
  const nextStep = () => {
    if (step + 1 <= 7) {
      setStep(step + 1);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        minHeight: "100vh",
        marginTop: "1rem",
      }}>

      <Box display="flex" flexDirection="column">
        <Box width="100%" marginLeft=".5rem" mb="1rem">
          <IconButton onClick={() => {
            navigate(-1);
          }} sx={{'&:hover': {backgroundColor: 'transparent'}}}>
            <ArrowIcon/>
            <Typography className={styles.textMd} marginLeft="1rem" fontWeight='600' color='#3B82F6'
                        fontSize={"1rem"}>
              {localization[lang].StudentPage.Menu.back}
            </Typography>
          </IconButton>
        </Box>
        <Box display="flex" width="100%" justifyContent="center" ml=".5rem">
          {[1, 2, 3, 4, 5, 6, 7].map((value: number) =>
            <Box
              key={value}
              style={{
                border: "solid 1rem #D8E6F",
                borderTopLeftRadius: value == 1 ? "2rem" : "0",
                borderTopRightRadius: value == 7 ? "2rem" : "0",
                width: "calc(97.5%/7)",
                height: "1rem",
                backgroundColor: step > value ? "#3B82F6" : "#d8eaff"
              }}></Box>)}
        </Box>
        {/*<Container sx={{*/}
        {/*  borderRadius: '30px',*/}
        {/*  maxWidth: '100vw',*/}
        {/*  paddingTop: '20px',*/}
        {/*  backgroundColor: '#E8EBF1',*/}
        {/*  backgroundImage: userState && userState.avatar ? `url(${baseURL}/${userState.avatar})` : "",*/}
        {/*  backgroundSize: "cover",*/}
        {/*  backgroundPosition: "0 50%",*/}
        {/*  backgroundRepeat: "no-repeat",*/}
        {/*  height: '250px',*/}
        {/*  marginX: "0",*/}
        {/*  display: 'flex',*/}
        {/*  flexDirection: 'column',*/}
        {/*  justifyContent: 'flex-start',*/}
        {/*  '@media (max-width: 778px)': {*/}
        {/*    width: '92vw',*/}
        {/*    marginLeft: '1rem'*/}
        {/*  },*/}
        {/*}}>*/}


        {/*  <Box sx={{*/}
        {/*    display: 'flex',*/}
        {/*    justifyContent: 'flex-start',*/}
        {/*    alignItems: 'flex-end',*/}
        {/*    marginTop: '130px',*/}
        {/*  }}>*/}
        {/*    <img src={icon}/>*/}
        {/*  </Box>*/}
        {/*  <Box sx={{*/}
        {/*    display: 'flex',*/}
        {/*    justifyContent: 'flex-end',*/}
        {/*    alignItems: 'flex-end',*/}
        {/*    marginTop: '-70px',*/}
        {/*  }}>*/}

        {/*    <img src={add}*/}
        {/*         onClick={() => handleChooseFileClick("banner")}*/}
        {/*         style={{*/}
        {/*           cursor: 'pointer',*/}
        {/*         }}*/}
        {/*    />*/}
        {/*    <input*/}
        {/*      type="file"*/}
        {/*      accept=".jpg,.jpeg,.png, .svg, .webp`"*/}
        {/*      onChange={handleBannerUpload}*/}
        {/*      style={{*/}
        {/*        display: "none",*/}
        {/*      }}*/}
        {/*      ref={fileInputRef}*/}
        {/*    />*/}

        {/*  </Box>*/}
        {/*</Container>*/}

        {[requiredForm].map((item, index) => {
          console.log(item);
          if (item) {
            return (
              <Container
                key={index}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '30px',
                  borderTopRightRadius: "0",
                  borderTopLeftRadius: "0",
                  paddingTop: '20px',
                  paddingBottom: "1rem",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: '55vw', maxWidth: '100%',
                  '@media (max-width: 778px)': {
                    width: '92vw', marginLeft: '1rem'
                  },
                }}
              >
                <Typography variant="h6" fontWeight="600">
                  {item.title ? item.title[lang] : ""}
                </Typography>
                <Box sx={{
                  display: "flex",
                  justifyItems: "space-between",
                  justifyContent: "space-between"
                }}>
                  <Typography sx={{
                    fontSize: '16px',
                    paddingBottom: '15px'
                  }}>
                    {(item.additionalText ? item.additionalText[lang] : "") + " " + (userState[item.name] ? userState[item.name] : "")}
                  </Typography>

                </Box>
                <Grid
                  container
                  justifyContent="center"
                  spacing={[3, 2]}
                >
                  {item.forms.map((el: any, index2: number) => {
                    if (el.type == "date_month_year") {
                      return (
                        <LocalizationProvider key={index2} dateAdapter={AdapterDayjs}>
                        <DateCalendar key={index2} views={['year', 'month']} onChange={handleChange}/>
                        </LocalizationProvider>
                      );
                    }
                    if (el.type == "select") {
                      return (
                        <Grid item
                              xs={el.multiline ? 12 : getGridSize("xs", index2)}
                              sm={el.multiline ? 12 : getGridSize("sm", index2)}
                              md={el.multiline ? 12 : getGridSize("md", index2)}
                              lg={el.multiline ? 12 : getGridSize("lg", index2)}
                              key={index2}>

                          <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
                          <Select
                            type={el.type}
                            name={el.name}
                            fullWidth={true}
                            onChange={handleChange}
                          >
                            {el.values && el.values.map((val: any) => (
                              <MenuItem

                                key={val.value}
                                value={val.value}
                                // onClick={() => {
                                //   handleChange(speciality.name, selectedSpecialities, setSelectedSpecialities, "speciality");
                                // }}
                              >
                                {val.label[lang]}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>);
                    }
                    if (el.type == 'file') {
                      return (
                        <Grid item
                              xs={el.multiline ? 12 : getGridSize("xs", index2)}
                              sm={el.multiline ? 12 : getGridSize("sm", index2)}
                              md={el.multiline ? 12 : getGridSize("md", index2)}
                              lg={el.multiline ? 12 : getGridSize("lg", index2)}
                              key={index2}>
                          <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
                          <Box key={index2} sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "start",
                            gap: "1rem"
                          }}>
                            <label
                              htmlFor={"file-input" + index2}
                              style={{
                                width: "10rem",
                                height: "10rem",
                                marginTop: "1rem",
                                borderRadius: "15px",
                                backgroundColor: galleryImages.length >= 3 ? "#cacaca" : "",
                                border: galleryImages.length >= 3 ? "2px dashed red" : "2px dashed #3B82F6",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              <span
                                style={{
                                  color: galleryImages.length >= 3 ? "#979797" : "",
                                  textDecoration: "underline",
                                  cursor: "pointer"
                                }}
                                onClick={() => handleChooseFileClick("gallery")}>
                              Загрузить
                              </span>
                              <input
                                type="file"
                                id={"file-input" + index2}
                                accept=".jpeg, .jpg, .png,.svg, .webp"
                                onChange={handleImageUpload}
                                style={{
                                  display: "none",
                                }}
                                ref={galleryInputRef}
                              />
                            </label>
                            {galleryImages.length > 0 && galleryImages.map((image, index3) => {
                              return (
                                <Box
                                  key={index3}
                                  onClick={() => handleImageClick(image)}
                                  sx={{
                                    width: "10rem",
                                    height: "10rem",
                                    marginTop: "1rem",
                                    borderRadius: "15px",
                                    backgroundImage: `url(${baseURL}/${image})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    display: "flex"
                                  }}>
                                  <Box
                                    sx={{
                                      width: "10rem",
                                      height: "10rem",
                                      opacity: "0",
                                      display: "flex",
                                      borderRadius: "15px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      transition: 'opacity 0.3s ease', // Add a smooth transition
                                      ":hover": {
                                        opacity: "1",
                                        cursor: "pointer",
                                        backgroundColor: "rgba(255,0,0,0.47)",
                                      }
                                    }}>
                                    <TrashIcon style={{
                                      filter: "brightness(6)",
                                      width: "5rem",
                                      height: "5rem",
                                    }}/>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        </Grid>);
                    }
                    if (el.type == 'avatar') {
                      return (
                        <Grid item
                              xs={el.multiline ? 12 : getGridSize("xs", index2)}
                              sm={el.multiline ? 12 : getGridSize("sm", index2)}
                              md={el.multiline ? 12 : getGridSize("md", index2)}
                              lg={el.multiline ? 12 : getGridSize("lg", index2)}
                              key={index2}>
                          <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
                          <Box key={index2} sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "start",
                            gap: "1rem"
                          }}>
                            <label
                              htmlFor={"file-input" + index2}
                              style={{
                                width: "10rem",
                                height: "10rem",
                                marginTop: "1rem",
                                borderRadius: "15px",
                                backgroundColor: galleryImages.length >= 3 ? "#cacaca" : "",
                                border: galleryImages.length >= 3 ? "2px dashed red" : "2px dashed #3B82F6",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              <span
                                style={{
                                  color: galleryImages.length >= 3 ? "#979797" : "",
                                  textDecoration: "underline",
                                  cursor: "pointer"
                                }}
                                onClick={() => handleChooseFileClick("gallery")}>
                              Загрузить
                              </span>
                              <input
                                type="file"
                                id={"file-input" + index2}
                                accept=".jpeg, .jpg, .png,.svg, .webp"
                                onChange={handleImageUpload}
                                style={{
                                  display: "none",
                                }}
                                ref={galleryInputRef}
                              />
                            </label>
                            {galleryImages.length > 0 && galleryImages.map((image, index3) => {
                              return (
                                <Box
                                  key={index3}
                                  onClick={() => handleImageClick(image)}
                                  sx={{
                                    width: "10rem",
                                    height: "10rem",
                                    marginTop: "1rem",
                                    borderRadius: "15px",
                                    backgroundImage: `url(${baseURL}/${image})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    display: "flex"
                                  }}>
                                  <Box
                                    sx={{
                                      width: "10rem",
                                      height: "10rem",
                                      opacity: "0",
                                      display: "flex",
                                      borderRadius: "15px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      transition: 'opacity 0.3s ease', // Add a smooth transition
                                      ":hover": {
                                        opacity: "1",
                                        cursor: "pointer",
                                        backgroundColor: "rgba(255,0,0,0.47)",
                                      }
                                    }}>
                                    <TrashIcon style={{
                                      filter: "brightness(6)",
                                      width: "5rem",
                                      height: "5rem",
                                    }}/>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        </Grid>);
                    }
                    return (
                      <Grid item
                            xs={el.multiline ? 12 : getGridSize("xs", index2)}
                            sm={el.multiline ? 12 : getGridSize("sm", index2)}
                            md={el.multiline ? 12 : getGridSize("md", index2)}
                            lg={el.multiline ? 12 : getGridSize("lg", index2)}
                            key={index2}>

                        <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
                        <Input
                          type={el.type}
                          name={el.name}
                          disabled={el!.disabled ?? false}
                          value={state[el.name] || ''}
                          minRows={el.rows ?? 1}
                          reducePadding={(el.multiline ?? false) && el.rows > 1}
                          multiline={(el.multiline ?? false) && el.rows > 1}
                          placeholder={el.placeholder ? (el.placeholder[lang] ?? el.placeholder) : ""}
                          onChange={handleChange}
                          // errorText={'Some error message'}
                        />
                      </Grid>);

                  })}
                </Grid>
                {
                  item.forms.length ? (
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      flexDirection: "column",
                      gap: ".5rem",
                      marginTop: '36px'
                    }}>
                      <Button
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
              </Container>
            )
              ;
          }
          return null;
        })}
      </Box>


    </Box>

  );

};
