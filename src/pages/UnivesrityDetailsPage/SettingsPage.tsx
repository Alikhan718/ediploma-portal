import React, {useState, useRef, RefObject} from 'react';
import {
  Box, Container, Typography, FormControlLabel, FormControl, Switch, Select, MenuItem, InputLabel,
  FormHelperText, Grid
} from '@mui/material';
import {Button, Input, Label} from '@src/components';
import web from "@src/assets/icons/Website.svg";
import icon from "@src/assets/icons/Logo (2).svg";
import add from "@src/assets/icons/All.svg";
import {ReactComponent as PasswordIcon} from "@src/assets/icons/Password.svg";
import {ReactComponent as NotificatoinsIcon} from "@src/assets/icons/Notificationss.svg";
import {ReactComponent as SocialIcon} from "@src/assets/icons/Social.svg";
import {ReactComponent as TrashIcon} from "@src/assets/icons/Trash.svg";
import {ReactComponent as EmailIcon} from "@src/assets/icons/Letter.svg";
import FastIcon from '@src/components/FastIcon/FastIcon';
import {useDispatch, useSelector} from "react-redux";
import {selectImageLink, selectUserRole, selectUserState} from '@src/store/auth/selector';
import {
  fetchUpdateUserProfile,
  fetchUploadFile,
  fetchUserProfile
} from "@src/store/auth/actionCreators";
import {content, navigation} from "@src/pages/UnivesrityDetailsPage/generator";
import {selectLanguage} from "@src/store/generals/selectors";
import {uploadDataParse} from "@src/store/generator/actionCreators";

const SettingsPage: React.FC = () => {

  const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
  const lang = useSelector(selectLanguage);

  const mainInfoContainerRef = useRef<HTMLDivElement | null>(null);
  const emailBoxRef: RefObject<HTMLDivElement> = useRef(null);
  const passwordBoxRef: RefObject<HTMLDivElement> = useRef(null);
  const deleteAccountBoxRef: RefObject<HTMLDivElement> = useRef(null);
  const notificationBoxRef: RefObject<HTMLDivElement> = useRef(null);

  type ContentKey = keyof typeof content;

  const role: ContentKey = useSelector(selectUserRole).toLowerCase();
  const [requiredForm, setRequiredForm] = React.useState<any>(content[role]);

  const userState = useSelector(selectUserState);
  const dispatch = useDispatch();
  const [state, setState] = React.useState<Record<string, any>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.value.trim().length) {
    setState({...state, [e.target.name]: e.target.value});
    // }
    // else {
    //     setState({...state, [e.target.name]: null});
    // }
  };

  const scrollToMainInfo = () => {
    if (mainInfoContainerRef.current) {
      mainInfoContainerRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  const getRefById = (id: number): RefObject<HTMLDivElement> => {
    switch (id) {
      case 0:
        return mainInfoContainerRef;
      case 1:
        return emailBoxRef;
      case 2:
        return passwordBoxRef;
      case 3:
        return deleteAccountBoxRef;
      case 4:
        return notificationBoxRef;
      default:
        return mainInfoContainerRef;
    }
  };
  const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleSubmit = () => {
    const payload = {"attributes": state};
    dispatch(fetchUpdateUserProfile(payload));
  };
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
  const uploadGalleryImage = () => {
    const payload = {
      "attributes": {
        "gallery": JSON.stringify(galleryImages)
      }
    };
    dispatch(fetchUpdateUserProfile(payload));
  };
  const handleImageClick = (val: string) => {
    setGalleryImages(galleryImages.filter(v => v !== val));
    uploadGalleryImage();
  };


  React.useEffect(() => {
    setRequiredForm(content[role]);
  }, [requiredForm, lang]);

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
      uploadGalleryImage();
    }
  }, [imageLink, galleryUpload]);


  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        minHeight: "100vh",
        marginTop: "1rem",
      }}>

      <Container sx={{
        paddingLeft: '60px',
        margin: 'unset',
        width: 'unset',
        '@media (max-width: 778px)': {
          display: 'none',
        },
      }}>
        <Grid container>
          <Grid item xs={0}>
            <Box
              width={265}
              bgcolor="white"
              borderRadius={5}
              boxShadow={2}
              sx={{
                display: 'flex',
                paddingX: '1rem',
                paddingY: '1rem',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              {navigation.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (!item.reference) {
                      scrollToMainInfo();
                    } else {
                      scrollToRef(getRefById(item.reference));
                    }
                  }}
                >
                  {item.icon}
                  <Box sx={{flex: 1, color: 'gray', fontSize: '1rem'}}>
                    {item.title[lang] ?? ""}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box display="flex" flexDirection="column">
        <Container sx={{
          borderRadius: '30px',
          maxWidth: '100vw',
          paddingTop: '20px',
          backgroundColor: '#E8EBF1',
          backgroundImage: userState.banner ? `url(${baseURL}/${userState.banner})` : "",
          height: '250px',
          marginX: "0",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          '@media (max-width: 778px)': {
            width: '92vw',
            marginLeft: '1rem'
          },
        }}>

          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginTop: '130px',
          }}>
            <img src={icon}/>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: '-70px',
          }}>

            <img src={add}
                 onClick={() => handleChooseFileClick("banner")}
                 style={{
                   cursor: 'pointer',
                 }}
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png, .svg, .webp`"
              onChange={handleBannerUpload}
              style={{
                display: "none",
              }}
              ref={fileInputRef}
            />

          </Box>
        </Container>

        {[requiredForm, ...content['*']].map((item, index) => {
          if (item) {
            return (
              <Container
                key={index}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '30px',
                  paddingTop: '20px',
                  marginTop: '20px',
                  paddingBottom: "1rem",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: '55vw', maxWidth: '100%',
                  '@media (max-width: 778px)': {
                    width: '92vw', marginLeft: '1rem'
                  },
                }}
                ref={getRefById(item.reference)}
              >
                <Typography variant="h6" fontWeight="600">
                  {item.title ? item.title[lang] : ""}
                </Typography>
                <Typography sx={{
                  fontSize: '16px',
                  paddingBottom: '15px'
                }}>
                  {(item.additionalText ? item.additionalText[lang] : "") + " " + (userState[item.name] ? userState[item.name] : "")}
                </Typography>
                <Grid
                  container
                  justifyContent="center"
                  spacing={[3, 2]}
                >
                  {item.forms.map((el: any, index2: number) => {
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
                  item.forms.length && (
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '36px'}}>
                      <Button sx={{marginRight: '16px'}}>Отменить</Button>
                      <Button sx={{}} variant="contained" borderRadius="3rem"
                              onClick={handleSubmit}>Сохранить</Button>
                    </Box>
                  )
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


export default SettingsPage;