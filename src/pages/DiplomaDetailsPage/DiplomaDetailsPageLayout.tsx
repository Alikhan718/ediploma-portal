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
    IconButton, Alert, Snackbar, Skeleton
} from '@mui/material';
import {Button, Label, Modal} from '@src/components';
import {ReactComponent as ExpandMore} from '@src/assets/icons/expand_more.svg';
import {ReactComponent as DownloadIcon} from '@src/assets/icons/download.svg';
import {ReactComponent as ShareIcon} from '@src/assets/icons/share.svg';
import star from "./../../assets/icons/Star1.svg";
import {ReactComponent as Dots} from "@src/assets/icons/Dots.svg";
import pen from "./../../assets/icons/penSquare.svg";
import {ReactComponent as Eye} from "@src/assets/icons/eye.svg";
import {ReactComponent as Star} from "@src/assets/icons/star.svg";
import {ReactComponent as StarPressed} from "@src/assets/icons/StarPressed.svg";
import {ReactComponent as Check} from "@src/assets/icons/checkss.svg";
import {useNavigate, useParams} from "react-router-dom";
import {SwitchDetails} from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";
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
import {handleDownload} from "@src/utils/link";
import {selectUserRole, selectUserState} from "@src/store/auth/selector";
import {fetchUserProfile} from '@src/store/auth/actionCreators';
import {selectLanguage} from "@src/store/generals/selectors";
import {localization, skills, skillsList } from '@src/pages/DiplomaDetailsPage/generator';
import { put } from "redux-saga/effects";
import { setSnackbar } from '@src/store/generals/actionCreators';
import { ShareButton } from '@src/components/ShareButton/ShareButton';

export const DiplomaDetailsPageLayout: React.FC = () => {
    const lang = useSelector(selectLanguage);
    const [showFull, setShowFull] = React.useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    const role = useSelector(selectUserRole);
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [numSkills, setNumSkills] = React.useState(5);

    const [data, setData] = React.useState<any>();

    let diplomaList = useSelector(selectDiplomaList);

    const graduateAttributes = useSelector(selectGraduateAttributes);

    React.useEffect(() => {
        if (!graduateAttributes) {
            console.log("no graduate attributes");
            return;
        }
        else {
            console.log(graduateAttributes);
            console.log(data);
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
        setData(diplomaList.filter((diploma: any) => diploma.id == id)[0]);
    }, [isAuthenticated(), diplomaList]);
    React.useEffect(() => {
        if (data) {
            dispatch(fetchGraduateDetails(data.id));
        }
        console.log(data)
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

    const copyCurrentURLToClipboard = () => {
        const currentURL = window.location.href;
        const textArea = document.createElement('textarea');
        textArea.value = currentURL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setAlertOpen(true);
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
            <Box display='flex' flexWrap='wrap'>

                <Box minWidth="80vw" sx={{
                    width: '80vw',
                    marginX: "1.5rem",
                    '@media (max-width: 778px)': {
                        margin: '0.1rem',
                        marginTop: "3rem",
                        width: '100vw',
                    },
                }}>
                    <Box display='flex' flexDirection='column' sx={{backgroundColor: 'white', borderRadius: '15px',}}>
                        <Box px="1rem" sx={{
                            '@media (max-width: 778px)': {
                                padding: '0'
                            },
                        }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                margin="1rem"
                                className={styles.contentLeftContainer}
                            >
                                <CardMedia
                                    component="img"
                                    image={userImg}
                                    className={cn(styles.img)}
                                    sx={{
                                        width: '25%', height: '25%', '@media (max-width: 778px)': {
                                            width: '85%', height: '65%', marginRight: '3rem'
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
                                            margin: '0.5rem',
                                        },

                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                paddingBottom: '14px',
                                                fontSize: '24px',
                                                '@media (max-width: 778px)': {
                                                    fontSize: '22px',
                                                },
                                            }}
                                        >
                                            {data && lang === "kz" ? data.name_kz : data && lang === "ru" ? data.name_ru : data && lang === "en" ? data.name_en : ""}
                                        </Typography>
                                        {id != undefined &&
                                            <Box marginBottom="15px">
                                                <IconButton
                                                    sx={{width: "2.5rem"}}
                                                    onClick={handleToogleFavoriteDiplomas}>
                                                    {isFavorite ? <StarPressed/> : <Star/>}
                                                </IconButton>
                                                <IconButton
                                                    sx={{width: "2.5rem", height: "2.5rem"}}
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                    className={styles.desktopIcon}
                                                >
                                                    <Dots className={styles.desktopIcon}/>
                                                </IconButton>

                                                <Menu
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem 
                                                        onClick={()=>{
                                                            handleClose();
                                                            copyCurrentURLToClipboard();
                                                        }}>
                                                        <ShareIcon style={{marginRight: '10px', verticalAlign: "center"}}/>
                                                        <Typography>{localization[lang].StudentPage.Menu.share}</Typography>
                                                    </MenuItem>
                                                    <Divider style={{margin: "0 1rem"}}/>
                                                    <MenuItem 
                                                        onClick={()=>{
                                                            handleClose();
                                                            console.log(graduateAttributes);
                                                            if (graduateAttributes && graduateAttributes.smart_contract_link){
                                                                window.open(graduateAttributes.smart_contract_link, '_blank');
                                                                return;
                                                            }
                                                            put(setSnackbar({visible: true, message: "Link cannot be accessed", status: "error"}));

                                                        }}>
                                                        <Check style={{marginRight: '10px', verticalAlign: "center"}}/>
                                                        <Typography>Etherscan</Typography>
                                                    </MenuItem>
                                                </Menu>


                                                <img src={pen} style={{marginLeft: '2rem', marginTop: '-4.5rem'}}
                                                     className={styles.tabletIcon}/>
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
                                        <Box display="flex" alignItems="center">
                                            <Box marginRight="1rem">
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
                                    </Box>

                                    <Button
                                        buttonSize="s"
                                        variant="contained"
                                        type="button"
                                        disabled={!hasValidEmail()}
                                        sx={{
                                            borderRadius: '25px',
                                            marginTop: '1rem',
                                        }}
                                        onClick={() => {
                                            const subject = `Приглашение для ${data.name_ru} в компанию`;
                                            window.location.href = `mailto:${getEmail()}?subject=${encodeURIComponent(subject)}`;
                                        }}
                                    >
                                        {localization[lang].StudentPage.AddInfo.sendInvite}
                                    </Button>
                                </Box>
                            </Box>
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

                            <Box margin="1rem" sx={{
                                marginY: '2rem',
                                '@media (max-width: 778px)': {
                                    margin: '0.9rem',
                                    marginTop: '2rem',
                                },
                            }}>
                                <Box sx={{
                                    fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px',
                                    '@media (max-width: 778px)': {
                                        fontSize: '20px'
                                    },
                                }}> {localization[lang].StudentPage.AddInfo.certifications} </Box>
                                {data && data.image &&
                                    <Box width="40vh" sx={{
                                        backgroundColor: "rgba(7,117,255,0.11)",
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
                                                onClick={handlePreviewOpen}
                                            />
                                            <Skeleton variant="rectangular" width={300} height={200}
                                                      sx={{display: imageLoaded ? "none" : "block"}}
                                                      animation="wave"/>
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
                                                    <ShareIcon style={{width: "20", filter: "brightness(10)"}}/>
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

                                                    <DownloadIcon style={{width: "20", filter: "brightness(10)"}}/>
                                                </IconButton>
                                            </Box>
                                        </Card>
                                        <Modal
                                            open={isPreviewOpen}
                                            handleClose={handlePreviewClose}
                                            width="100vh"
                                            maxWidth="100vh"
                                        >
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        height: "100%",
                                                        position: "relative"
                                                    }}
                                                    image={data.image}
                                                    alt="University Image"/>
                                        </Modal>
                                    </Box>

                                }

                            </Box>
                            
                            {/* skills */}
                            <Box margin="1rem" sx={{
                                '@media (max-width: 778px)': {
                                    margin: '0.9rem',
                                },
                                width: '70%'
                            }}>
                                <Box sx={{
                                    fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px',
                                    '@media (max-width: 778px)': {
                                        fontSize: '20px'
                                    },
                                }}> {localization[lang].StudentPage.AddInfo.skills} 
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start', margin: '1rem', flexWrap: 'wrap'}}>
                                    { graduateAttributes.speciality_ru ? (skillsList[graduateAttributes.speciality_ru as keyof typeof skillsList][lang].slice(0, numSkills).map((skill: any, index: any) => {
                                        return (
                                            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(7,117,255,0.11)', borderRadius: '1rem', margin: '1rem', padding: '0.5rem'}}>
                                                <Typography className={styles.textMd} color="black" sx={{marginLeft: '1rem', marginRight: '1rem'}}>
                                                    {skill}
                                                </Typography>
                                            </Box>
                                        )
                                    }) ) : <></>}
                                </Box>
                            </Box>

                            <Box margin="1rem" sx={{
                                '@media (max-width: 778px)': {
                                    margin: '0.9rem',
                                },
                            }}>
                                <SwitchDetails/>
                            </Box>
                            <ShareButton currentUrl={currentUrl} lang={lang} smartContractAddress={graduateAttributes && graduateAttributes.smart_contract_link + "#code"}/>
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
