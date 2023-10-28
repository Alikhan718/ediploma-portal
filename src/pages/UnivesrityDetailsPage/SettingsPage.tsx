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
import {selectUserRole, selectUserState} from '@src/store/auth/selector';
import {fetchUserProfile} from "@src/store/auth/actionCreators";
import {content, navigation} from "@src/pages/UnivesrityDetailsPage/generator";

const SettingsPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const mainInfoContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollToMainInfo = () => {
        if (mainInfoContainerRef.current) {
            mainInfoContainerRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };
    const emailBoxRef: RefObject<HTMLDivElement> = useRef(null);
    const passwordBoxRef: RefObject<HTMLDivElement> = useRef(null);
    const deleteAccountBoxRef: RefObject<HTMLDivElement> = useRef(null);

    const notificationBoxRef: RefObject<HTMLDivElement> = useRef(null);

    type ContentKey = keyof typeof content;
    const role: ContentKey = useSelector(selectUserRole).toLowerCase();
    const [requiredForm, setRequiredForm] = React.useState<any>(content[role]);
    React.useEffect(() => {
        setRequiredForm(content[role]);
        console.log(requiredForm);
    }, [requiredForm]);
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

    const userState = useSelector(selectUserState);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchUserProfile());
    }, [!userState]);
    console.log(userState);

    const [state, setState] = React.useState({});
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
                                    <Box sx={{flex: 1, color: 'gray', fontSize: '1rem'}}>{item.title}</Box>
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginTop: '-70px',
                        }}
                    >
                        <img src={add}/>
                    </Box>
                </Container>


                {requiredForm && requiredForm.forms && (
                    <Container
                        sx={{
                            marginTop: "1rem",
                            backgroundColor: 'white',
                            borderRadius: '30px',
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
                        ref={getRefById(requiredForm.reference)}
                    >
                        <Typography variant="h6" fontWeight="600">{requiredForm.title}</Typography>
                        <Typography sx={{
                            fontSize: '16px',
                            paddingBottom: '15px'
                        }}> {(requiredForm.additionalText ? requiredForm.additionalText : "") + " " + (userState[requiredForm.name] ? userState[requiredForm.name] : "")}</Typography>
                        <Grid
                            container
                            spacing={[3, 2]}
                        >
                            {requiredForm.forms && requiredForm.forms.map((el: any, index2: number) => (
                                <Grid item
                                      xs={el.multiline ? 12 : getGridSize("xs", index2)}
                                      sm={el.multiline ? 12 : getGridSize("sm", index2)}
                                      md={el.multiline ? 12 : getGridSize("md", index2)}
                                      lg={el.multiline ? 12 : getGridSize("lg", index2)}
                                      key={index2}>
                                    <Label label={el.label}/>
                                    <Input
                                        type={el.type}
                                        name={el.name}
                                        sx={{
                                            borderRadius: el.multiline ? '1.5rem' : '30px',
                                            padding: el.multiline ? '0' : '',
                                        }}
                                        placeholder={el.placeholder}
                                        multiline={el.multiline}
                                        minRows={el.rows}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        {requiredForm.forms && (
                            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '36px'}}>
                                <Button sx={{marginRight: '16px'}}>Отменить</Button>
                                <Button sx={{}} variant="contained" borderRadius="3rem">Сохранить</Button>
                            </Box>
                        )}
                    </Container>
                )}

                {content['*'].map((item, index) => (
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
                        <Typography variant="h6" fontWeight="600">{item.title}</Typography>
                        <Typography sx={{
                            fontSize: '16px',
                            paddingBottom: '15px'
                        }}> {(item.additionalText ? item.additionalText : "") + " " + (userState[item.name] ? userState[item.name] : "")}</Typography>
                        <Grid
                            container
                            spacing={[3, 2]}
                        >
                            {item.forms.map((el, index2) => (
                                <Grid item
                                      xs={getGridSize("xs", index2)}
                                      sm={getGridSize("sm", index2)}
                                      md={getGridSize("md", index2)}
                                      lg={getGridSize("lg", index2)}
                                      key={index2}>
                                    <Label label={el.label}/>
                                    <Input
                                        type={el.type}
                                        name={el.name}
                                        placeholder={el.placeholder}
                                    />
                                </Grid>

                            ))}
                        </Grid>
                        {item.forms.length && (
                            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '36px'}}>
                                <Button sx={{marginRight: '16px'}}>Отменить</Button>
                                <Button sx={{}} variant="contained" borderRadius="3rem">Сохранить</Button>
                            </Box>
                        )}
                    </Container>
                ))}
            </Box>


        </Box>

    );

};


export default SettingsPage;