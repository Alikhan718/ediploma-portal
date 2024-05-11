import React, {useRef, useState} from 'react';
import {Backdrop, Box, CircularProgress, Grid, IconButton, MenuItem, Typography} from '@mui/material';
import {Button, Input, Label} from '@src/components';
import {ReactComponent as TrashIcon} from "@src/assets/icons/alternate_trash.svg";
import {useDispatch, useSelector} from "react-redux";
import {
  selectAvatarIsLoading,
  selectImageLink,
  selectResumeLoading,
  selectUserState
} from '@src/store/auth/selector';
import {
  fetchGenerateResume,
  fetchUpdateUserProfile,
  fetchUploadFile,
  fetchUserProfile
} from "@src/store/auth/actionCreators";
import {selectLanguage} from "@src/store/generals/selectors";
import {ReactComponent as ArrowIcon} from '@src/assets/icons/arrowIcon.svg';
import {useNavigate} from "react-router";
import styles from "./ResumeGeneratorPage.module.css";
import {content, desktopContent, experienceForms, localization, skillsList} from "./generator";
import {Select} from '@src/components/Select/Select';
import {ReactComponent as AccountCircleIcon} from '@src/assets/icons/profileIcon.svg';
import {ReactComponent as AddOutlineIcon} from '@src/assets/icons/add_outlined.svg';
import {ReactComponent as UploadIconFile} from '@src/assets/icons/upload_file.svg';
import {ReactComponent as DownloadIcon} from '@src/assets/icons/Upload.svg';
import {ReactComponent as PDFIcon} from '@src/assets/icons/PDF.svg';
import {ReactComponent as HeaderSearchIcon} from '@src/assets/icons/search.svg';
import {ReactComponent as Trash} from '@src/assets/icons/Trash.svg';

import {MultiSelect} from "@src/components/MultiSelect/MuiltiSelect";
import Checkbox from "@mui/material/Checkbox";
import {handleLink} from '@src/utils/link';
import {Image} from "@mui/icons-material";

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
    const isLoading = useSelector(selectAvatarIsLoading);
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
      dispatch(fetchUploadFile({file: uploadedFile}));
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAvatarUpload(false);
      const uploadedFile = event.target.files?.[0] || null;
      setFileUpload(true);
      dispatch(fetchUploadFile({file: uploadedFile}));
    };
    const handleChange = (e: any) => {
      let value = e.target.value;
      let name = e.target.name;
      if (name.includes('work_experience')) {
        let names = name.split('.');
        if (name.includes('experience_still_working')) {
          value = e.target.checked ?? value;
        }
        let temp2: { [key: string]: any } = value; // Type assertion
        for (let i = names.length - 1; i > 0; i--) {
          temp2 = {[names[i]]: temp2};
        }
        let prevState = state[names[0]];
        temp2 = {...prevState, ...temp2};
        if (prevState !== undefined && prevState != null && prevState[names[1]] !== undefined) {
          prevState = prevState[names[1]];
          temp2[names[1]] = {...prevState, ...temp2[names[1]]};
        }
        setState({...state, [names[0]]: temp2});
        return;
      } else if (Array.isArray(value)) {
        value = JSON.stringify(value);
      } else if (!value.trim().length) {
        value = null;
      }
      setState({...state, [name]: value});
    };
    // console.log('work_experience', state['work_experience']);
    const handleSubmit = () => {
      const payload = {"attributes": state};
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
      handleSubmit();
    };
    const nextStep = () => {
      if (step + 1 <= contentForms.length) {
        setStep(step + 1);
      }
      if (step == contentForms.length - 1) {
        dispatch(fetchGenerateResume());
      }
      handleSubmit();
    };
    const getValue = (name: string) => {
      let names = null;
      if (name.includes(".") && !name.includes('skills')) {
        names = name.split('.');
      }
      let value = state[name] ?? null;
      if (names && names.length > 1 && !name.includes('skills')) {
        value = state;
        for (let i = 0; i < names.length; i++) {
          let key: string = names[i];
          if (value === null || value === undefined || value[key] == null || typeof value !== 'object' || !(key in value)) {
            return null;
          }
          value = value[key];
        }
      }
      return value;
    };
    const getInputComponent = (el: any, index2: number) => {
      if (el.ifNotInput && getValue(el.ifNotInput)) {
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

            <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
            <Select
              type={el.type}
              name={el.name}
              disabled={el.disabled}
              value={(el.name == 'major' ? (state['diploma_degree'] || '') : (state[el.name] || '')).toLowerCase()}
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
                xs={12}
                sm={8}
                md={8}
                lg={8}
                key={index2}>

            <MultiSelect
              type={el.type}
              name={el.name}
              fullWidth={true}
              IconComponent={HeaderSearchIcon}
              defaultValues={JSON.parse(getValue(el.name)) ?? []}
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
                position="relative"
                style={{
                  cursor: 'pointer',
                }}
              >
                {userState && userState.avatar ?
                  <Box sx={{
                    width: "25vh",
                    height: "25vh",
                    position: "relative",
                    opacity: isLoading ? "30%" : "100%",
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
                      <AccountCircleIcon width="100%" height="100%"/>
                    </Box>
                    <img style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "1",
                      objectFit: "cover",
                      borderRadius: "50%"
                    }}
                         src={`${baseURL}/${state[el.name]}`} alt=""/>
                  </Box>
                  :
                  <AccountCircleIcon
                    style={{
                      alignSelf: "center",
                      width: "2.5rem",
                      height: "2.5rem"
                    }}/>
                }
                {isLoading &&
                    <Box position="absolute" top="0" left="0">
                        <CircularProgress sx={{opacity: ".5"}} thickness={2} size={187}/>
                    </Box>
                }
              </Box>
              {state && !state[el.name] &&
                  <Box display={"flex"}>
                      <Typography fontSize="1rem"
                                  style={{alignSelf: "center"}}>
                        {el.label ? (el.label[lang] ?? el.label) : ""}
                      </Typography>
                      <AddOutlineIcon style={{alignSelf: "center"}}/>
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
            <Label label={el.label ? (el.label[lang] ?? el.label) : ""}/>
            <Box key={index2} sx={{
              display: "flex",
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
                                      }}/>
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
                                 accept=".png, .jpg, .jpeg"
                                 onChange={handleImageUpload}
                                 style={{display: "none"}}
                                 ref={fileInputRef}/>
                      </Box>
                  </label>
              }
              {state && state.certificates &&
                  <Box sx={{
                    backgroundColor: "#F4F7FE",
                    width: "30%",
                    display: "flex",
                    padding: ".5rem .5rem",
                    gap: ".5rem",
                    borderRadius: "1rem",
                    '@media (max-width: 778px)': {
                      width: "100%",

                    }
                  }}>
                      <img style={{
                        width: "8rem",
                        objectFit: "cover",
                        borderRadius: "5%"
                      }}
                           src={`${baseURL}/${state.certificates}`} alt=""/>
                      <IconButton style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginLeft: "auto",
                        width: "3rem",
                        height: "3rem",
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
                          }}/>
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
              defaultChecked={getValue(el.name)}
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
                        flexDirection: "column",
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
              {!isResumeLoading &&
                  <iframe
                      src={state ? state.resume_link : ""}
                      width="100%"
                      height="600px"
                      loading="lazy"
                      title="PDF-file"
                  />
              }
            </Box>
          </Grid>);
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
            value={getValue(el.name) || ""}
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
    };
    const duplicateWorkExperienceForm = (flag = false) => {
      if (!requiredForm.name.includes('work_experience')) return;
      let repeatMax = 1;
      if (state['work_experience']) {
        repeatMax = Object.keys(state['work_experience']).length;
      }
      repeatMax = (flag ? 2 : repeatMax);
      let forms = requiredForm.forms;
      let counter = 1;

      // Find the maximum counter value in existing forms
      for (let i = 0; i < forms.length; i++) {
        let names = forms[i].name.split('.');
        if (names && names.length > 1) {
          counter = Math.max(parseInt(names[1]), counter);
        }
      }
      console.log(flag, repeatMax, counter);
      if (counter >= repeatMax && !flag) return;
      for (let i = 1; i < repeatMax; i++) {
        // Create copies of existing forms with adjusted names
        let newForms = experienceForms.map((form: any) => {
          let names = form.name.split('.');
          names[1] = `${counter + 1}`;
          let newName = names.join('.');
          let newForm = {...form, name: newName};
          if (newForm['ifNotInput']) {
            let names2 = form.ifNotInput.split('.');
            names2[1] = `${counter + 1}`;
            newForm['ifNotInput'] = names2.join('.');
          }

          return newForm;
        });

        // Concatenate original and new forms arrays
        forms = forms.concat(newForms);
        counter++;
      }


      // Update state with the new forms array
      setRequiredForm({...requiredForm, forms: forms});
    };
    const removeLastWorkExperience = () => {
      if (Object.keys(state['work_experience']).length < 2) {
        return;
      }
      const objArray = Object.entries(state['work_experience']); // Convert object to array of key-value pairs
      const filteredArray = objArray.slice(0, -1); // Filter out the last element
      const filteredObj = Object.fromEntries(filteredArray); // Convert array back to object
      // console.log(filteredObj);
      state['work_experience'] = filteredObj;
      // console.log(state);
      setState(state);
      handleSubmit();

      if (!requiredForm.name.includes('work_experience')) return;
      let forms = requiredForm.forms;
      const filteredForms = forms.slice(0, -experienceForms.length);
      setRequiredForm({...requiredForm, forms: filteredForms});
    };

    React.useEffect(() => {
      setRequiredForm(contentForms[step - 1]);
    }, [step]);

    React.useEffect(() => {
      dispatch(fetchUserProfile());
    }, [!userState]);

    React.useEffect(() => {
      setState(userState);
      duplicateWorkExperienceForm();
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
            <UploadIconFile style={{width: "4rem", height: "4rem"}}/>
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
            <IconButton style={{alignSelf: "center"}} sx={{'&:hover': {backgroundColor: 'transparent'}}}>
              <ArrowIcon/>
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
                }}/>)}
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
                            {requiredForm.forms.map((el: any, index2: number) => getInputComponent(el, index2))}
                            {requiredForm.multiple && (<Button sx={{
                              paddingX: ".5rem",
                              marginLeft: "1rem",
                              marginTop: "1rem",
                              borderRadius: ".5rem",
                            }}
                                                               onClick={() => {
                                                                 duplicateWorkExperienceForm(true);
                                                               }}
                            >
                              <Box display="flex" gap=".5rem">
                                <AddOutlineIcon style={{alignSelf: "center"}}/>
                                <Typography color="#629BF8">Добавить опыт работы</Typography>
                              </Box>
                            </Button>)}
                            {requiredForm.multiple && state && state['work_experience'] && Object.keys(state['work_experience']).length > 1 && (
                              <Button sx={{
                                paddingX: ".5rem",
                                marginLeft: "1rem",
                                marginTop: "1rem",
                                borderRadius: ".5rem",
                              }}
                                      color="error"
                                      onClick={() => {
                                        removeLastWorkExperience();
                                      }}
                              >
                                <Box display="flex" gap=".5rem">
                                  <Trash style={{alignSelf: "center"}}/>
                                  <Typography color="#ff7f7f">Убрать опыт работы</Typography>
                                </Box>
                              </Button>)}
                          </Grid>
                      </Box>
                    {
                      // prev next buttons
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
                            style={{display: step == contentForms.length ? "none" : 'block'}}
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
