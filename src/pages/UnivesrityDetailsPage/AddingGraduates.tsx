import {Box, Typography, LinearProgress, TextField, Button, IconButton, Grid, CircularProgress} from "@mui/material";
import React, {useState, useRef} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import excel from "./../../assets/icons/File_check.svg";
import files from "./../../assets/icons/Excel.svg";
import * as NcaLayer from '@src/utils/functions';
import {useDispatch, useSelector} from "react-redux";
import {fetchGetDiplomaCid, fetchSaveXmlRequest} from "@src/store/auth/actionCreators";
import {handleLink} from "@src/utils/link";
import {ReactComponent as DownloadIcon} from "@src/assets/icons/download.svg";
import archive from "@src/assets/icons/archive.svg";
import {selectArchiveLink} from "@src/store/generator/selectors";
import {uploadDataParse} from "@src/store/generator/actionCreators";
import {selectIpfsLink, selectSmartContractLink, selectXmlSigned} from "@src/store/auth/selector";
import {fetchMetadataCid} from "@src/store/auth/saga";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";

const AddingGraduates: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const archiveLink = useSelector(selectArchiveLink);
    const xmlSigned = useSelector(selectXmlSigned);
    const navigate = useNavigate();
    NcaLayer.enableWebSocket();
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        const uploadedFile = event.target.files?.[0] || null;
        setFile(uploadedFile);
        dispatch(uploadDataParse({file: uploadedFile}));
        setProgress(1);
    };
    const goBack = () => {
        if (currentStep > 0) {
            setProgress(currentStep - 1);
        }
    };
    const fileSizeInKB = file?.size ? Math.round(file.size / 1024) : 0;
    const goForward = () => {
        if (currentStep < steps.length - 1) {
            setProgress(currentStep + 1);
            if ((currentStep === 0 && file) || currentStep > 0) {
                setProgress(currentStep + 1);
            } else {
                console.log("error");
            }
        }
    };
    const dispatch = useDispatch();

    const handleChooseFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const signXmlWithDS = (res: any) => {
        if (res['code'] === "500") {
            alert(res['message']);
        } else if (res['code'] === "200") {
            res = res['responseObject'];
            dispatch(fetchSaveXmlRequest({xml: res}));
            setTimeout(() => {
            }, 2000);
        }
    };
    const ncaLayerXml = () => {
        NcaLayer.signXml(1, signXmlWithDS);
    };
    React.useEffect(() => {
        if (xmlSigned == true) {
            if (progress != 3) {
                const payload = {"university_id": 1};
                dispatch(fetchGetDiplomaCid(payload));
            }
            setProgress(3);
        }
    }, [xmlSigned]);
    const shortSteps = ["Загрузка фалов", "Проверка", "Подпись ЭЦП", "Результаты"];
    const steps = ["Загрузка файлов", "Проверьте данные", "Подпись данных через ЭЦП", "Результаты генерации"];
    const currentStep = progress;

    const ipfsLink = useSelector(selectIpfsLink);
    const smartContractLink = useSelector(selectSmartContractLink);

    return (
        <Box sx={{}}>
            <Box sx={{
                textAlign: "center",
                backgroundColor: "#FAFBFF",
                width: '100%',
                padding: '40px', '@media (max-width: 998px)': {padding: '15px',},
            }}>
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
                                                index <= currentStep ? "#3B82F6" : "#F8F8F8",
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
                                            index <= currentStep ? "#3B82F6" : "#F8F8F8",
                                        color: index <= currentStep ? "white" : "#A1A1A1",
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
                </Box>

                {/* File Input */}
                <Box sx={{
                    backgroundColor: 'white', paddingBottom: '10px', borderRadius: '30px'
                }}>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: "flex",
                            justifyContent: currentStep === 0 ? "flex-end" : "space-between",
                            width: "100%",
                        }}
                    >
                        {currentStep > 0 && (
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
                        {currentStep < steps.length - 1 && (
                            <IconButton
                                onClick={() => {
                                    if (currentStep === 0 && !file) {
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
                    {currentStep === 0 && (

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>


                            <Typography variant="h6" sx={{
                                paddingTop: '20px', paddingBottom: '20px',
                                '@media (max-width: 998px)': {
                                    fontSize: '1.2rem'
                                },
                            }}> {steps[progress]}</Typography>

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
                                Перетащите ваш Excel файл сюда или{" "}
                                <span style={{textDecoration: "underline", cursor: "pointer"}}
                                      onClick={handleChooseFileClick}>
									выберите с компьютера
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
                            }}> Скачать шаблон</Button>
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
                                <Box sx={{color: '#3B82F6',}}>Примечание</Box>
                                <Box sx={{marginTop: '10px', color: '#A1A1A1'}}> Описание примечание</Box>
                            </Box>
                        </Box>

                    )
                    }

                    {currentStep === 1 && file && (
                        <Box sx={{marginTop: 4, marginBottom: '20px'}}>
                            <Typography variant="h6" sx={{
                                '@media (max-width: 998px)': {
                                    fontSize: '1.4rem'
                                },
                            }}>{steps[currentStep]}</Typography>
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
                                    }}>Название файла:</Typography>
                                    <Typography ml="auto" variant="subtitle1" sx={{
                                        color: '#A1A1A1',
                                        '@media (max-width: 998px)': {
                                            fontSize: '1rem',
                                        },
                                    }}>Статус:</Typography>
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
                                        {archiveLink.trim() != "" ?
                                            <Button variant="contained" color="primary"
                                                    sx={{borderRadius: '1rem', padding: ".75rem"}}
                                                    onClick={() => {
                                                        handleLink(archiveLink);
                                                        console.log(archiveLink);
                                                    }}><DownloadIcon style={{filter: "brightness(20)"}}/></Button>
                                            : <CircularProgress style={{marginLeft: "auto"}}/>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Button variant="contained" color="primary"
                                    sx={{marginTop: 2, borderRadius: '15px'}}
                                    onClick={() => goForward()}> Далее</Button>
                        </Box>
                    )}

                    {currentStep === 2 && file && (
                        <Box sx={{marginTop: 4, marginBottom: '20px'}}>
                            <Typography variant="h6" sx={{
                                '@media (max-width: 998px)': {
                                    fontSize: '1.3rem'
                                },
                            }}>{steps[currentStep]}</Typography>
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
                                    }}>Название файла:</Typography>
                                    <Typography ml="auto" variant="subtitle1" sx={{
                                        color: '#A1A1A1',
                                        '@media (max-width: 998px)': {
                                            display: 'none'
                                        },
                                    }}>Статус:</Typography>
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
                                                console.log(archiveLink);
                                            }}><DownloadIcon style={{filter: "brightness(20)"}}/></Button>
                                </Box>
                            </Box>
                            <Button variant="contained" color="primary"
                                    sx={{marginTop: 2, borderRadius: '15px'}}
                                    onClick={() => {
                                        ncaLayerXml()
                                    }}> Подписать через ЭЦП</Button>
                        </Box>
                    )}

                    {/* Upload Button */}
                    {
                        currentStep === 3 && file && (

                            <Box sx={{marginBottom: '20px'}}>

                                <Typography variant="h6" sx={{
                                    paddingTop: '15px',
                                    '@media (max-width: 998px)': {
                                        fontSize: '1.4rem'
                                    },
                                }}> {steps[progress]}</Typography>
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
                                                    }}>Адрес:</Typography>
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
                                            Ссылка на адрес IPFS
                                        </Typography>
                                        {ipfsLink == "" ?
                                            <CircularProgress style={{marginLeft: "auto", height: "1.5rem"}}/> :
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
                                                    }}>Смарт контакт:</Typography>

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
                                            Ссылка на смарт контакт
                                        </Typography>
                                        {smartContractLink == "" ?
                                            <CircularProgress style={{marginLeft: "auto", height: "1.5rem"}}/> :
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
                                        sx={{marginTop: 2, borderRadius: '15px'}} onClick={()=> navigate(routes.main)}> Завершить </Button>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default AddingGraduates;

