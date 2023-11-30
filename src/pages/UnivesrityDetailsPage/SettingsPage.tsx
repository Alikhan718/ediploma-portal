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
import {fetchUpdateUserProfile, fetchUserProfile} from "@src/store/auth/actionCreators";
import {content, navigation} from "@src/pages/UnivesrityDetailsPage/generator";
import {selectLanguage} from "@src/store/generals/selectors";

const SettingsPage: React.FC = () => {

    const lang = useSelector(selectLanguage);

    const mainInfoContainerRef = useRef<HTMLDivElement | null>(null);
    const emailBoxRef: RefObject<HTMLDivElement> = useRef(null);
    const passwordBoxRef: RefObject<HTMLDivElement> = useRef(null);
    const deleteAccountBoxRef: RefObject<HTMLDivElement> = useRef(null);
    const notificationBoxRef: RefObject<HTMLDivElement> = useRef(null);

    type ContentKey = keyof typeof content[typeof lang];

    const role: ContentKey = useSelector(selectUserRole).toLowerCase();
    const langContent = content[lang];
    const [requiredForm, setRequiredForm] = React.useState<any>(langContent[role]);

    const userState = useSelector(selectUserState);
    const dispatch = useDispatch();
    const [state, setState] = React.useState<Record<string, any>>({});
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value});
        console.log(state);
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

    React.useEffect(() => {
        setRequiredForm(langContent[role]);
        console.log(requiredForm);
    }, [requiredForm, lang]);

    React.useEffect(() => {
        dispatch(fetchUserProfile());
    }, [!userState]);

    React.useEffect(() => {
        setState(userState);
    }, [userState]);

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
                            {navigation[lang].map((item, index) => (
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

                {[requiredForm, ...content[lang]['*']].map((item, index) => {
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
                                    <Typography variant="h6" fontWeight="600">{item.title}</Typography>
                                    <Typography sx={{
                                        fontSize: '16px',
                                        paddingBottom: '15px'
                                    }}> {(item.additionalText ? item.additionalText : "") + " " + (userState[item.name] ? userState[item.name] : "")}</Typography>
                                    <Grid
                                        container
                                        spacing={[3, 2]}
                                    >
                                        {item.forms.map((el: any, index2: number) => (
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
                                                    disabled={el!.disabled ?? false}
                                                    value={state[el.name] || ''}
                                                    placeholder={el.placeholder}
                                                    onChange={handleChange}
                                                    // errorText={'Some error message'}
                                                />
                                            </Grid>
                                            //
                                        ))}
                                    </Grid>
                                    {item.forms.length && (
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '36px'}}>
                                            <Button sx={{marginRight: '16px'}}>Отменить</Button>
                                            <Button sx={{}} variant="contained" borderRadius="3rem"
                                                    onClick={handleSubmit}>Сохранить</Button>
                                        </Box>
                                    )}
                                </Container>
                            );
                        }
                        return null;

                    }
                )}
            </Box>


        </Box>

    );

};


export default SettingsPage;