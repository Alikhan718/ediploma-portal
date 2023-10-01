import {Box, Typography, LinearProgress, TextField, Button, IconButton, Grid} from "@mui/material";
import React, {useState, useRef} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import excel from "./../../assets/icons/File_check.svg";
import files from "./../../assets/icons/Excel.svg";
import archive from "@src/assets/icons/archive.svg";
import {ReactComponent as DownloadIcon} from "@src/assets/icons/download.svg";
import {handleLink} from "@src/utils/link";
import {useDispatch, useSelector} from "react-redux";
import {uploadDataParse} from "@src/store/generator/actionCreators";
import {selectArchiveLink} from "@src/store/generator/selectors";
import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";

const AddingGraduates: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [maxProgress, setMaxProgress] = useState(0);
    const archiveLink = useSelector(selectArchiveLink);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        const uploadedFile = event.target.files?.[0] || null;
        dispatch(uploadDataParse({file: uploadedFile}));
        setFile(uploadedFile);
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
        }
    };

    const handleChooseFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const steps = ["Загрузите Excel файл", "Проверьте данные на корректность", "Подписать с ЭЦП", "Результаты генерации"];
    const currentStep = progress;

    return (
        <Box sx={{}}>
            <Box sx={{
                textAlign: "center",
                backgroundColor: "#FAFBFF",
                width: '100%',
                padding: '40px',
                '@media (max-width: 998px)': {
                    padding: '15px',
                },
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
                            justifyContent: "center", backgroundColor: '#FAFBFF', paddingBottom: '15px', width: '90%'
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
                                        }}
                                    />
                                )}
                                <Box
                                    width="3rem"
                                    height="3rem"
                                    sx={{

                                        borderRadius: "50%",
                                        backgroundColor:
                                            index <= currentStep ? "#3B82F6" : "#F8F8F8",
                                        color: index <= currentStep ? "white" : "#A1A1A1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>

                                    <Typography
                                        textAlign="center"
                                    >
                                        {index + 1}
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
                            <IconButton onClick={goBack} color="primary"
                                        sx={{marginLeft: '50px', marginTop: '10px', marginBottom: '-70px'}}>
                                <ArrowBackIcon/>
                            </IconButton>
                        )}
                        {currentStep < steps.length - 1 && (
                            <IconButton onClick={goForward} color="primary"
                                        sx={{marginRight: '50px', marginTop: '10px', marginBottom: '-70px'}}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        )}
                    </Box>
                    {currentStep === 0 &&
                        (
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>

                                <Typography variant="h6" sx={{
                                    paddingTop: '20px',
                                    paddingBottom: '20px'
                                }}> {steps[currentStep]}</Typography>

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

                                <Button variant="contained" color="primary" sx={{marginTop: 2, borderRadius: '15px',}}
                                        onClick={
                                            () => {
                                                handleLink("http://generator.ediploma.kz/get-sample");
                                            }
                                        }
                                > Скачать шаблон</Button>
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

                        )}

                    {currentStep === 1 && file && (
                        <Box sx={{marginTop: 4, marginBottom: '20px'}}>
                            <Typography variant="h6" sx={{}}>{steps[currentStep]}</Typography>
                            <Box sx={{
                                width: '90%',
                                borderRadius: '50px',
                                height: '300px',
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
                                    <Typography variant="subtitle1" sx={{color: '#A1A1A1'}}>Название файла:</Typography>
                                    <Typography ml="auto" variant="subtitle1"
                                                sx={{color: '#A1A1A1'}}>Статус:</Typography>
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
                                                sx={{display: 'flex', alignItems: 'center'}}>
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
                                    onClick={() => goForward()}> Далее</Button>
                        </Box>
                    )}

                    {currentStep === 2 && file && (
                        <Box sx={{marginTop: 4, marginBottom: '20px'}}>
                            <Typography variant="h6" sx={{}}>{steps[currentStep]}</Typography>
                            <Box sx={{
                                width: '90%',
                                borderRadius: '50px',
                                height: '300px',
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
                                    <Typography variant="subtitle1" sx={{color: '#A1A1A1'}}>Название файла:</Typography>
                                    <Typography ml="auto" variant="subtitle1"
                                                sx={{color: '#A1A1A1'}}>Статус:</Typography>
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
                                                sx={{display: 'flex', alignItems: 'center'}}>
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
                                    onClick={() => goForward()}> Подписать</Button>
                        </Box>
                    )
                    }

                    {/* Upload Button */}
                    {
                        currentStep === 3 && file && (

                            <Box sx={{marginBottom: '20px'}}>

                                <Typography variant="h6" sx={{paddingTop: '15px'}}> {steps[currentStep]}</Typography>
                                <Box sx={{
                                    width: '90%',
                                    borderRadius: '50px',
                                    height: '300px',
                                    backgroundColor: '#FAFBFF',
                                    padding: '25px',
                                    marginTop: '16px',
                                    marginLeft: '70px',
                                }}>
                                    <Box>
                                        <Typography variant="h3"
                                                    sx={{textAlign: 'left', color: '#A1A1A1'}}>Адрес:</Typography>
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
                                            Ссылка на адрес
                                        </Typography>
                                        <Button variant="contained" color="primary" sx={{
                                            marginLeft: 'auto',
                                            height: '34px',
                                            borderRadius: '32px'
                                        }}> Cкопировать</Button>
                                    </Box>
                                    <Box>
                                        <Typography variant="h3"
                                                    sx={{textAlign: 'left', paddingTop: '20px', color: '#A1A1A1'}}>Смарт
                                            контакт:</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            backgroundColor: 'white',
                                            padding: '9px',
                                            marginTop: '6px', borderRadius: '50px', display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="body1" sx={{textAlign: 'left', fontSize: '16px'}}>
                                            Ссылка на смарт контакт
                                        </Typography>
                                        <Button variant="contained" color="primary" sx={{
                                            marginLeft: 'auto',
                                            height: '34px',
                                            borderRadius: '32px'
                                        }}> Cкопировать</Button>
                                    </Box>
                                </Box>
                                <Button variant="contained" color="primary"
                                        sx={{marginTop: 2, borderRadius: '15px'}}
                                        onClick={() => navigate(routes.universityDetails)}> Посмотреть все дипломы</Button>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default AddingGraduates;
