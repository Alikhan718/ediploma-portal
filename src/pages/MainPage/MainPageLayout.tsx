import React from 'react';
import {Box, Divider, Typography, Container, TextField, Grid, Rating} from '@mui/material';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {Button, Input, Label} from '@src/components';
import {FooterSection} from "@src/pages/MainPage/components/FooterSection";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import styles from "./MainPage.module.css";
import {fetchSearch} from "@src/store/diplomas/actionCreators";
import ReactGA from "react-ga";
import back1 from "./../../assets/dashboard/Content.png"
import img1 from "./../../assets/dashboard/Illustration.png"
import download from "./../../assets/icons/downloadMain.svg";
import file from "./../../assets/icons/Avatar.svg";
import profile from "./../../assets/icons/profileIcon.svg"

import AppLogo from '@src/assets/icons/app-logo.svg';
import cn from "classnames";

export const MainPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterAttributes, setFilterAttributes] = React.useState({
        text: '',
        specialities: '',
        region: '',
        year: 0,
        gpaL: 0,
        gpaR: 0,
    });
    const [searchQuery, setSearchQuery] = React.useState('');

    const triggerSearchFilters = () => {
        dispatch(fetchSearch(filterAttributes));
        navigate(routes.hr_bank);
    };
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (filterAttributes.text.trim().length > 1) {
                triggerSearchFilters();
            }
        }, 2000);

        return () => clearTimeout(delayDebounceFn);
    }, [filterAttributes]);

    React.useEffect(() => {
        ReactGA.initialize('G-H12GFWB4FY');
        ReactGA.event({
            category: 'User',
            action: 'Search',
            label: "searchText",
        });
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <Box className={styles.mainContainer} sx={{backgroundColor: "white",}}>
            <Box sx={{
                marginTop: '1rem',
                width: '100%',
                paddingTop: '5%',
                paddingX: '3%',
                display: 'flex',
                gap: '2vh',
                flexDirection: 'column',
                background: `url(${back1}) no-repeat`,
                objectFit: 'cover',
                borderRadius: "2rem",
                backgroundSize: "100% 85%",
                alignItems: 'center',
                textAlign: 'center',
                '@media (max-width: 778px)': { 
                    marginTop: "2rem",
                }
            }}>
                <Typography fontSize='48px' fontWeight='600' className={styles.mobTextL}>
                    Цифровой портал
                    <br/>
                    <span style={{color: '#3B82F6', fontSize: '48px'}} className={styles.mobTextL}>дипломов</span> на
                    блокчейне
                </Typography>
                <Typography textAlign='center' className={styles.mobTextMd}>
                    {'Проверьте диплом и найдите себе лучших \nвыпускников в компанию'}
                </Typography>
                <Box display="flex" width="80%">
                    <Input
                        placeholder="Фамилия Имя, название вуза"
                        fullWidth={true}
                        inputSize="m"
                        sx={{
                            paddingRight: 0,
                            width: '100%'
                        }}
                        className={styles.mobTextMd}
                        endAdornment={
                            <Button
                                onClick={() => {
                                    triggerSearchFilters();
                                    ReactGA.event({
                                        category: 'User',
                                        action: 'Search',
                                        label: searchQuery,
                                    });
                                }}
                                buttonSize="m"
                                variant="contained"
                                sx={{
                                    borderRadius: '48px',
                                    margin: '5px'
                                }}
                                className={cn(styles.btn, styles.mobTextNone)}
                            >
                                Найти
                                <SearchIcon className={styles.btnIcon}/>
                            </Button>
                        }
                        onChange={(e) => {
                            const query = e.target.value;
                            setFilterAttributes({...filterAttributes, text: query});
                            setSearchQuery(query);
                        }}
                    />
                </Box>
                <Box mt="2.5rem"><img src={img1} style={{width: '75%'}}/></Box>
            </Box>
            <FooterSection/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <Typography sx={{fontSize: '48px',}} className={styles.mobTextL}>
                    Принципы работы
                </Typography>
                <Box style={{
                    textAlign: 'center',
                    paddingTop: '20px',
                    paddingBottom: '30px',
                }} className={styles.mobTextSm}>
                    Проверьте диплом и найдите себе лучших <br/>
                    выпускников в компанию
                </Box>
                <Box flexWrap="wrap" className={styles.container}>
                    <Box sx={{
                        backgroundColor: '#F8F8F8',
                        padding: '38px 48px',
                        flexDirection: 'column',
                        borderRadius: '24px'
                    }}
                         className={styles.item}
                    >
                        <Box sx={{paddingBottom: '20px'}}>
                            <img src={download} style={{width: '80px'}}/>
                        </Box>
                        <Box sx={{paddingBottom: '20px', fontWeight: '800', fontSize: '28px'}}
                             className={styles.mobTextMd}>Загрузите данные о
                            выпускниках</Box>
                        <Box sx={{color: '#818181', fontSize: '16px'}} className={styles.mobTextSm}>
                            Для генерации картинок дипломов и метаданных мы используем исходные данные в Excel формате.
                            После регистрации перейдите в свой личный кабинет и начните процесс создания новой NFT
                            коллекции дипломов.
                        </Box>
                    </Box>

                    <Box sx={{
                        backgroundColor: '#F8F8F8',
                        padding: '38px 48px',
                        flexDirection: 'column',
                        borderRadius: '24px'
                    }}
                         className={styles.item}

                    >
                        <Box sx={{paddingBottom: '20px'}}>
                            <img src={file} style={{width: '80px'}}/>
                        </Box>
                        <Box sx={{paddingBottom: '20px', fontWeight: '800', fontSize: '28px'}}
                             className={styles.mobTextMd}>Выберите шаблон
                            диплома</Box>
                        <Box sx={{color: '#818181', fontSize: '16px'}} className={styles.mobTextSm}>
                            Загрузите шаблон дизайна вашего диплома и определите в каких местах должна находиться
                            определенная информация. После этого будет запущен процесс генерации заданного количества
                            дипломов с данными.
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography mb="3.5rem" fontSize='48px' textAlign='center' className={styles.mobTextL}>
                    Отзывы
                </Typography>
                <Box sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    overflow: 'scroll',
                    marginBottom: '16px',
                    '::-webkit-scrollbar': {
                        height: '5px',
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: '#3B82F6',
                        borderRadius: '10px',
                        scrollbarWidth: 'thin',
                    },
                }} className={styles.container}
                     justifyContent="start">
                    {[1, 2, 3, 4, 5, 6].map((el: any) => {
                        return (<Box key={el} className={styles.cardItem}>
                            <img src={profile} style={{width: '3.5rem', alignSelf: "center"}}/>
                            <Typography fontSize=".9rem" fontWeight="500" color="#2D2D2D" className={styles.mobTextSm}>
                                Имя Фамилия
                            </Typography>
                            <Typography fontSize="1rem" color="#2D2D2D" className={styles.mobTextMd}>
                                Проверьте диплом и найдите себе лучших выпускников в компанию
                            </Typography>
                            <Box><Rating
                                name={`rating-${el}`}
                                value={5}
                                max={5}
                                readOnly
                                size="large"
                                sx={{color: '#3B82F6', paddingBottom: '32px'}}
                            /></Box>
                        </Box>)
                    })}
                </Box>
            </Box>

            <Box className={styles.contactUsContainer}>
                <Box className={styles.item} display="flex" flexDirection="column" width="45%"
                     justifyContent="space-between">
                    <Box>
                        <Typography fontSize="2.5rem" fontWeight="600" mb=".5rem" color="#2D2D2D"
                                    className={styles.mobTextL}>
                            Контакты
                        </Typography>
                        <Typography fontSize=".9rem" color="#818181" whiteSpace="pre-line" className={styles.mobTextSm}>
                            {"Введите свой адрес электронной\n почты для того чтобы мы могли вам ответить!"}
                        </Typography>

                        <Typography fontSize=".9rem" mt="2rem" color="#818181" whiteSpace="pre-line"
                                    className={styles.mobTextSm}>
                            #Location
                        </Typography>
                    </Box>
                    <Box>
                        <Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
                                    className={styles.mobTextMd}>
                            info@jasaim.com
                        </Typography>
                        <Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
                                    className={styles.mobTextMd}>
                            +7(00)800-08-80
                        </Typography>

                        <Box mt="2rem" display="flex" gap="1rem" flexDirection="row">
                            <Typography textAlign="center" fontSize=".9rem" color="#818181"
                                        className={styles.mobTextSm}>
                                facebook
                            </Typography>
                            <Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
                                twitter
                            </Typography>
                            <Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
                                instagram
                            </Typography>
                            <Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
                                linkedin
                            </Typography>

                        </Box>
                    </Box>

                </Box>
                <Box className={styles.item} display="flex" flexDirection="column" width="45%"
                     justifyContent="space-between">
                    <Box mb="1rem">
                        <Label label="Ваше имя" className={styles.mobTextSm}/>
                        <Input type="text" name="name"
                               placeholder="ФИО"/>
                    </Box>
                    <Box mb="1rem">
                        <Label label="Почта" className={styles.mobTextSm}/>
                        <Input type="text" name="email"
                               placeholder="example@mail.com"/>
                    </Box>
                    <Box mb="2rem">
                        <Label label="Сообщение" className={styles.mobTextSm}/>
                        <Input type="text" multiline={true} reducePadding={true} minRows={4} name="message"
                               placeholder="Введите ваше сообщение"/>
                    </Box>
                    <Button fullWidth={true} variant="contained" borderRadius="3rem"
                            type="submit">
                        Отправить
                    </Button>
                </Box>
            </Box>

            <Grid container>
                <Grid container lg={4} md={12} spacing={1} mb="2.5rem">
                    <Grid item lg={12} md={3} sm={12} mr="auto">
                        <img className={styles.applogo} src={AppLogo}/>
                    </Grid>
                    <Grid item lg={12} md={2} xs={12}>
                        <Typography className={styles.mobTextMd}>г. Астана</Typography>
                    </Grid>
                    <Grid item lg={12} md={2} xs={12}>
                        <Typography className={styles.mobTextMd}>info@jasaim.kz</Typography>
                    </Grid>
                    {/*<Grid item lg={12} md={2} xs={12}>*/}
                    {/*    <Typography className={styles.mobTextMd}>#phone</Typography>*/}
                    {/*</Grid>*/}

                </Grid>
                <Grid container spacing={5} lg={8} md={12}>

                    <Grid item xs={6} md={4}>
                        <Box display="flex" flexDirection="column" gap="1rem">
                            <Typography color='#3B82F6' fontWeight="600"
                                        className={styles.mobTextMd}>eDiploma</Typography>
                            <Typography className={styles.mobTextMd}>О нас</Typography>
                            {/*<Typography className={styles.mobTextMd}>Новости</Typography>*/}
                            {/*<Typography className={styles.mobTextMd}>Вакансии</Typography>*/}
                            <Typography className={styles.mobTextMd}>Контакты</Typography>
                        </Box>
                    </Grid>
                    {/*<Grid item xs={6} md={3} spacing={1}>*/}
                    {/*    <Box display="flex" flexDirection="column" gap="1rem">*/}
                    {/*        <Typography color='#3B82F6' fontWeight="600"*/}
                    {/*                    className={styles.mobTextMd}>Работодателям</Typography>*/}
                    {/*        <Typography className={styles.mobTextMd}>Выпускники</Typography>*/}
                    {/*        <Typography className={styles.mobTextMd}>Университеты</Typography>*/}
                    {/*    </Box>*/}
                    {/*</Grid>*/}
                    <Grid item xs={6} md={4} columnSpacing={1}>
                        <Box display="flex" flexDirection="column" gap="1rem">
                            <Typography color='#3B82F6' fontWeight="600"
                                        className={styles.mobTextMd}>Выпуск</Typography>
                            {/*<Typography className={styles.mobTextMd}>Резюме</Typography>*/}
                            <Typography className={styles.mobTextMd}>Профиль</Typography>
                            {/*<Typography className={styles.mobTextMd}>Работа</Typography>*/}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Box display="flex" flexDirection="column" gap="1rem">
                            <Typography color='#3B82F6' fontWeight="600"
                                        className={styles.mobTextMd}>Университетам</Typography>
                            <Typography className={styles.mobTextMd}>Дипломы</Typography>
                            <Typography className={styles.mobTextMd}>Сотрудничество</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid md={0} xs={12}><br/></Grid>
            </Grid>


        </Box>

    );
};
