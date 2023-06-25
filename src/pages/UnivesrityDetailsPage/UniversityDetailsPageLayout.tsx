import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography} from '@mui/material';
import {ReactComponent as VerifiedIcon} from '@src/assets/icons/verified.svg';
import {ReactComponent as SmartContractIcon} from '@src/assets/icons/smartContract_black.svg';
import {ReactComponent as WebIcon} from '@src/assets/icons/web_black.svg';
import {ReactComponent as DiscordIcon} from '@src/assets/icons/discord_black.svg';
import {ReactComponent as TwitterIcon} from '@src/assets/icons/twitter_black.svg';
import {ReactComponent as FavouriteIcon} from '@src/assets/icons/star_dark.svg';
import {ReactComponent as ShareIcon} from '@src/assets/icons/share_dark.svg';
import {ReactComponent as MoreIcon} from '@src/assets/icons/more_horiz_dark.svg';
import {ReactComponent as ExpandMore} from '@src/assets/icons/expand_more.svg';
import exampleImage from "@src/assets/example/diploma.jpg";
import {ReactComponent as NeedAuthorizationPic} from "@src/assets/example/requireAuthorizationPic.svg";
import styles from "./UniversityDetailsPage.module.css";
import {UniversityPageHeader} from "@src/pages/UnivesrityPage/components/UniversityPageHeader";
import {UniversityDetailsPageHeader} from "@src/pages/UnivesrityDetailsPage/components/UniversityDetailsPageHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {isAuthenticated} from "@src/utils/userAuth";
import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";
import {Modal} from "@src/components";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const UniversityDetailsPageLayout: React.FC = () => {
    const [showFull, setShowFull] = React.useState(false);

    const handleText = (text: string): string => { // function to trim text to show less or more
        const trimLimit = 115; // amount of characters to be shown
        return showFull ? text : text.substring(0, trimLimit) + "...";
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box display='flex' flexWrap='wrap'>
            <Modal
                open={open}
                handleClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                    <NeedAuthorizationPic/>
                    <Typography textAlign='center' id="modal-modal-title" fontSize='1rem' fontWeight='600' variant="h6"
                                component="h2">
                        Для открытия этой опции требуется авторизация
                    </Typography>
                    <Button variant='contained' sx={{
                        marginTop: "1rem",
                        padding: "1rem",
                        width: "80%",
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: "2rem"
                    }} onClick={() => {
                        navigate(routes.login)
                    }}>Войти</Button>
                </Box>
            </Modal>
            <UniversityDetailsPageHeader/>
            <Box ml={'2rem'} width={"100%"}>

                <Box width="100%" display='flex' justifyContent='space-between'>
                    <Typography
                        width='50%'
                        fontSize='2rem'
                        fontWeight='600'
                    >
                        Казахстанско-Британский Технический
                        <VerifiedIcon style={{marginLeft: ".5rem"}}/>Университет
                    </Typography>
                    <Box display='flex' gap='2rem' height='100%' mr={'2rem'}>
                        <SmartContractIcon className={styles.social} onClick={() => {
                        }}/>
                        <WebIcon className={styles.social} onClick={() => {
                        }}/>
                        <DiscordIcon className={styles.social} onClick={() => {
                        }}/>
                        <TwitterIcon className={styles.social} onClick={() => {
                        }}/>

                        <Divider style={{height: "1.5rem"}} orientation='vertical'/>

                        <FavouriteIcon className={styles.social} onClick={() => {
                        }}/>
                        <ShareIcon className={styles.social} onClick={() => {
                        }}/>
                        <MoreIcon className={styles.social} onClick={() => {
                        }}/>

                    </Box>
                </Box>
                <Box width='100%' display='flex' flexDirection='column' gap='1rem' mt='1rem'>
                    <Box display='flex'>
                        <Typography>
                            Почта:
                        </Typography>
                        <Typography fontWeight='600' ml='.5rem'>info@kbtu.kz</Typography>
                    </Box>
                    <Box display='flex'>
                        <Typography>
                            Номер телефона:
                        </Typography>
                        <Typography fontWeight='600' ml='.5rem'>8 (7172) 74 23 52</Typography>
                    </Box>
                    <Box width='100%' display='flex' gap='1rem'>
                        <Box display='flex'>
                            <Typography>
                                Специальностей
                            </Typography>
                            <Typography fontWeight='600' color='#353840' ml='.5rem'>25</Typography>
                        </Box>
                        ·
                        <Box display='flex'>
                            <Typography>
                                Открыт
                            </Typography>
                            <Typography fontWeight='600' color='#353840' ml='.5rem'>Август 2001</Typography>
                        </Box>
                        ·
                        <Box display='flex'>
                            <Typography>
                                Кол-во студентов
                            </Typography>
                            <Typography fontWeight='600' color='#353840' ml='.5rem'>3564</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography color="#353840">
                            {handleText("Казахстанско-Британский технический университет - один из ведущих технических университетов региона. Мы работаем в партнерстве с мировым академическим сообществом, корпоративным и государственным секторами над фундаментальными ценностями качества, академической честности и открытости.")}
                        </Typography>
                        <Typography style={{cursor: "pointer"}} fontWeight='600' color='gray' onClick={() => {
                            setShowFull(!showFull);
                        }}>
                            Показать {!showFull ? "больше" : " меньше"}
                            <ExpandMore style={{marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : ""}}/>
                        </Typography>
                    </Box>
                    <Box display='flex' gap='3rem' mt='1rem'>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' fontWeight='600'>25</Typography>
                            <Typography fontSize='1rem' color='#707A83'>Рейтинг <br/>
                                университета</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' fontWeight='600'>10256</Typography>
                            <Typography fontSize='1rem' color='#707A83'>Количество <br/>
                                выпускников</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' fontWeight='600'>1245</Typography>
                            <Typography fontSize='1rem' color='#707A83'>Количество<br/>
                                с отличием</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' fontWeight='600'>3.2</Typography>
                            <Typography fontSize='1rem' color='#707A83'>Средний GPA</Typography>
                        </Box>
                    </Box>


                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Дипломы" {...a11yProps(0)} />
                                <Tab label="Аналитика" disabled={true} {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Box display='flex' width='100%' justifyContent='space-between' flexWrap='wrap' px='1rem'>
                                {[1, 2].map((e) => (
                                    <Card key={e} elevation={6}
                                          onClick={() => {
                                              if (isAuthenticated()) {
                                                  navigate(routes.diplomaDetails);
                                              } else {
                                                  handleOpen();
                                              }

                                          }}
                                          sx={{
                                              display: 'flex',
                                              width: "48%",
                                              cursor: "pointer",
                                              borderRadius: "10px",
                                              marginBottom: "1.5rem"
                                          }}>
                                        <CardMedia
                                            component="img"
                                            sx={{width: "13rem", padding: "1.5rem"}}
                                            image={exampleImage}
                                            alt="University Image"
                                        />
                                        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                                            <CardContent sx={{
                                                flex: '1 0 auto',
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "100%"
                                            }}>
                                                <Typography mb='.5rem' fontSize="1.25rem" fontWeight="600">
                                                    Сериков Сырым Сержанулы
                                                </Typography>
                                                <Typography mb='.5rem' fontSize="1rem">
                                                    Специальность
                                                </Typography>
                                                <Box display='flex' mt='auto' width='100%'>
                                                    <Typography fontSize="0.875rem" mr='auto'>
                                                        КБТУ
                                                    </Typography>
                                                    <Typography fontSize="0.875rem" ml='auto' mr='1rem'>
                                                        2023/24
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                ))}
                            </Box>

                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Box display='flex' flexWrap={"wrap"} flexBasis={"2"} gap='1rem 1rem'>
                            </Box>
                        </TabPanel>
                    </Box>

                </Box>


            </Box>
        </Box>

    );
};