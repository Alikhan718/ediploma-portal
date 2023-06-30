import React from 'react';

import {Box, Button, Card, CardContent, CardMedia, Divider, Paper, Typography, useMediaQuery} from '@mui/material';
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
import {handleLink} from "@src/utils/link";
import {humanReadableToLocalTime} from "@src/utils/functions";
import {selectDiplomaList} from "@src/store/diplomas/selectors";
import {useDispatch, useSelector} from "react-redux";
import {fetchDiplomas} from "@src/store/diplomas/actionCreators";
import cn from "classnames";


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
        const matchesSm = useMediaQuery('(max-width:768px)');
        const trimLimit = matchesSm ? 45 : 115; // amount of characters to be shown
        return showFull ? text : text.substring(0, trimLimit) + "...";
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const diplomaList = useSelector(selectDiplomaList);
    React.useEffect(() => {
        dispatch(fetchDiplomas());
    }, [diplomaList]);
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
                        navigate(routes.login);
                    }}>Войти</Button>
                </Box>
            </Modal>
            <UniversityDetailsPageHeader/>
            <Box ml={'2rem'} width={"100%"}>
                <Box width="100%" display='flex' justifyContent='space-between'>
                    <Typography
                        className={styles.nameText}
                        fontSize='2rem'
                        fontWeight='600'
                    >
                        Казахстанско-Британский Технический Университет
                    </Typography>
                    {/*<VerifiedIcon style={{marginTop: "1rem", marginLeft: ".5rem", marginRight: "auto", width: "3rem"}}/>*/}
                    <Box className={styles.socialContainer}>
                        <SmartContractIcon className={styles.social} onClick={() => {
                            handleLink("https://sepolia.etherscan.io/address/0xf96910fb6f6b4991072e37584d84fe33f77b8b28#code");
                        }}/>
                        <WebIcon className={styles.social} onClick={() => {
                            handleLink("https://kbtu.edu.kz/ru/");
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
                <Box className={styles.contentContainer}>
                    <Box display='flex'>
                        <Typography className={styles.textSm}>
                            Почта:
                        </Typography>
                        <Typography className={styles.textSm} fontWeight='600' ml='.5rem'>info@kbtu.kz</Typography>
                    </Box>
                    <Box display='flex'>
                        <Typography className={styles.textSm}>
                            Номер телефона:
                        </Typography>
                        <Typography className={styles.textSm} fontWeight='600' ml='.5rem'>8 (7172) 74 23 52</Typography>
                    </Box>
                    <Box className={cn(styles.mobMt1, styles.mobWrap)} width='100%' display='flex' gap='0 1rem'>
                        <Box display='flex'>
                            <Typography className={styles.textSm}>
                                Специальностей
                            </Typography>
                            <Typography className={styles.textSm} fontWeight='600' color='#353840'
                                        ml='.5rem'>25</Typography>
                        </Box>
                        ·
                        <Box display='flex'>
                            <Typography className={styles.textSm}>
                                Открыт
                            </Typography>
                            <Typography className={styles.textSm} fontWeight='600' color='#353840' ml='.5rem'>Август
                                2001</Typography>
                        </Box>
                        ·
                        <Box display='flex'>
                            <Typography className={styles.textSm}>
                                Кол-во студентов
                            </Typography>
                            <Typography className={styles.textSm} fontWeight='600' color='#353840'
                                        ml='.5rem'>3564</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography className={styles.textSm} color="#353840">
                            {handleText("Казахстанско-Британский технический университет - один из ведущих технических университетов региона. Мы работаем в партнерстве с мировым академическим сообществом, корпоративным и государственным секторами над фундаментальными ценностями качества, академической честности и открытости.")}
                        </Typography>
                        <Typography style={{cursor: "pointer"}} className={styles.textSm} fontWeight='600' color='gray'
                                    onClick={() => {
                                        setShowFull(!showFull);
                                    }}>
                            Показать {!showFull ? "больше" : " меньше"}
                            <ExpandMore style={{marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : ""}}/>
                        </Typography>
                    </Box>
                    <Box display='flex' gap='3rem' className={styles.gap1} mt='1rem'>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' className={styles.textMd} fontWeight='600'>25</Typography>
                            <Typography fontSize='1rem' className={styles.textXs} color='#707A83'>Рейтинг <br/>
                                университета</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' className={styles.textMd} fontWeight='600'>10256</Typography>
                            <Typography fontSize='1rem' className={styles.textXs} color='#707A83'>Количество <br/>
                                выпускников</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' className={styles.textMd} fontWeight='600'>1245</Typography>
                            <Typography fontSize='1rem' className={styles.textXs} color='#707A83'>Количество<br/>
                                с отличием</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <Typography fontSize='1.5rem' className={styles.textMd} fontWeight='600'>3.2</Typography>
                            <Typography fontSize='1rem' className={styles.textXs} color='#707A83'>Средний
                                GPA</Typography>
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
                            <Box display='flex' justifyContent='space-between' className={styles.diplomasContainer}
                                 flexWrap='wrap'>
                                {diplomaList.slice(0, 6).map((e: any) => (
                                    <Card key={e.counter} elevation={6}
                                          onClick={() => {
                                              if (isAuthenticated()) {
                                                  navigate(`/app/diploma/${e.counter!}/details`);
                                              } else {
                                                  handleOpen();
                                              }

                                          }}
                                          className={styles.diplomaItem}
                                          sx={{
                                              display: 'flex',
                                              width: "49%",
                                              cursor: "pointer",
                                              borderRadius: "10px",
                                              marginBottom: "1.5rem"
                                          }}>
                                        <CardMedia
                                            component="img"
                                            className={styles.diplomaImg}
                                            sx={{width: "13rem", padding: "1.5rem"}}
                                            image={e.image}
                                            alt="University Image"
                                        />
                                        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                                            <CardContent
                                                sx={{
                                                    flex: '1 0 auto',
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%"
                                                }}>
                                                <Typography mb='.5rem' fontSize="1.25rem" fontWeight="600">
                                                    {e.name_kz}
                                                </Typography>
                                                <Typography mb='.5rem' fontSize="1rem">
                                                    {e.qualification_kz.substring(0, e.qualification_kz.search("»") + 1)}
                                                </Typography>
                                                <Box display='flex' mt='auto' width='100%'>
                                                    <Typography fontSize="0.875rem" mr='auto'>
                                                        {/*КБТУ*/}
                                                    </Typography>
                                                    <Typography fontSize="0.875rem" ml='auto' mr='1rem'>
                                                        {humanReadableToLocalTime(e.protocol_en, "/")}
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