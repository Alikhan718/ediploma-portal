import React from 'react';
import {Box, Divider, Typography, Container, TextField, Grid, Rating} from '@mui/material';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {Button, Input, Label} from '@src/components';
import {FooterSection} from "@src/pages/MainPage/components/FooterSection";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import styles from "./MainPage.module.css";
import {fetchSearch} from "@src/store/diplomas/actionCreators";
import ReactGA from "react-ga";
import back1 from "./../../assets/dashboard/Content.png";
import img1 from "./../../assets/dashboard/Illustration.png";
import download from "./../../assets/icons/downloadMain.svg";
import file from "./../../assets/icons/Avatar.svg";
import profile from "./../../assets/icons/profileIcon.svg";
import {localization} from "./generator";
import AppLogo from '@src/assets/icons/app-logo.svg';
import cn from "classnames";
import {selectLanguage} from "@src/store/generals/selectors";

export const MainPageLayout: React.FC = () => {
    const lang = useSelector(selectLanguage);

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
        navigate(routes.hrBank);
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
                    {localization[lang].Hero.title}
                    <br/>
                    <span style={{color: '#3B82F6', fontSize: '48px'}}
                          className={styles.mobTextL}>{localization[lang].Hero.titleBlue}</span>
                    {localization[lang].Hero.titleEnd}
                </Typography>
                <Typography textAlign='center' className={styles.mobTextMd}>
                    {localization[lang].Hero.description}
                </Typography>
                <Box display="flex" width="80%">
                    <Input
                        placeholder={localization[lang].SearchField.placeholder}
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
                                {localization[lang].SearchField.search}
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
                    {localization[lang].WorkPrincipal.title}
                </Typography>
                <Box style={{
                    textAlign: 'center',
                    paddingTop: '20px',
                    paddingBottom: '30px',
                }} className={styles.mobTextSm}>
                    {localization[lang].WorkPrincipal.description}<br/>
                    {localization[lang].WorkPrincipal.description2}
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
                             className={styles.mobTextMd}>{localization[lang].Upload.title}</Box>
                        <Box sx={{color: '#818181', fontSize: '16px'}} className={styles.mobTextSm}>
                            {localization[lang].Upload.description}
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
                             className={styles.mobTextMd}>{localization[lang].Select.title}</Box>
                        <Box sx={{color: '#818181', fontSize: '16px'}} className={styles.mobTextSm}>
                            {localization[lang].Select.description}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography mb="3.5rem" fontSize='48px' textAlign='center' className={styles.mobTextL}>
                    {localization[lang].Reviews.title}
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
                    {localization[lang].Reviews.elements.map((el: any) => {
                        return (<Box key={el} className={styles.cardItem}>
                            <img src={el.avatar} style={{width: '3.5rem', borderRadius: "50%", alignSelf: "center"}}/>
                            <Typography fontSize=".9rem" fontWeight="500" color="#2D2D2D" className={styles.mobTextSm}>
                                {el.fullname}
                            </Typography>
                            <Typography fontSize="1rem" color="#2D2D2D" className={styles.mobTextMd}>
                                {el.text}
                            </Typography>
                            <Box><Rating
                                name={`rating-${el}`}
                                value={el.rate}
                                max={5}
                                readOnly
                                size="large"
                                sx={{color: '#3B82F6', paddingBottom: '32px'}}
                            /></Box>
                        </Box>);
                    })}
                </Box>
            </Box>

            <Box className={styles.contactUsContainer}>
                <Box className={styles.item} display="flex" flexDirection="column" width="45%"
                     justifyContent="space-between">
                    <Box>
                        <Typography fontSize="2.5rem" fontWeight="600" mb=".5rem" color="#2D2D2D"
                                    className={styles.mobTextL}>
                            {localization[lang].AboutUs.contactsTitle}
                        </Typography>
                        <Typography fontSize=".9rem" color="#818181" whiteSpace="pre-line" className={styles.mobTextSm}>
                            {localization[lang].AboutUs.description}
                        </Typography>

                        <Typography fontSize=".9rem" mt="2rem" color="#818181" whiteSpace="pre-line"
                                    className={styles.mobTextSm}>
                            {localization[lang].AboutUs.address.title} <br/>
                            {localization[lang].AboutUs.address.value}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
                                    className={styles.mobTextMd}>
                            {localization[lang].AboutUs.contacts.email}
                        </Typography>
                        <Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
                                    className={styles.mobTextMd}>
                            {localization[lang].AboutUs.contacts.phone}
                        </Typography>

                        <Box mt="2rem" display="flex" gap="1rem" flexDirection="row">
                            {localization[lang].AboutUs.links.map((el: any) =>
                                <a key={el.value} href={el.link} target="_blank" rel="noopener noreferrer">
                                    <Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
                                        {el.title}
                                    </Typography>
                                </a>
                            )}


                        </Box>
                    </Box>


                </Box>
                <Box className={styles.item} display="flex" flexDirection="column" width="45%"
                     justifyContent="space-between">
                    <Box mb="1rem">
                        <Label label={localization[lang].AboutUs.form.name.label} className={styles.mobTextSm}/>
                        <Input type="text" name="name"
                               placeholder={localization[lang].AboutUs.form.name.placeholder}/>
                    </Box>
                    <Box mb="1rem">
                        <Label label={localization[lang].AboutUs.form.email.label} className={styles.mobTextSm}/>
                        <Input type="text" name="email"
                               placeholder={localization[lang].AboutUs.form.email.placeholder}/>
                    </Box>
                    <Box mb="2rem">
                        <Label label={localization[lang].AboutUs.form.message.label} className={styles.mobTextSm}/>
                        <Input type="text" multiline={true} reducePadding={true} minRows={4} name="message"
                               placeholder={localization[lang].AboutUs.form.message.placeholder}/>
                    </Box>
                    <Button fullWidth={true} variant="contained" borderRadius="3rem"
                            type="submit">
                        {localization[lang].AboutUs.form.send}
                    </Button>
                </Box>
            </Box>

            <Grid container>
                <Grid container lg={4} md={12} spacing={1} mb="2.5rem">
                    <Grid item lg={12} md={3} sm={12} mr="auto">
                        <img className={styles.applogo} src={AppLogo}/>
                    </Grid>
                    <Grid item lg={12} md={2} xs={12}>
                        <Typography className={styles.mobTextMd}>{localization[lang].Footer.city}</Typography>
                    </Grid>
                    <Grid item lg={12} md={2} xs={12}>
                        <Typography
                            className={styles.mobTextMd}>{localization[lang].AboutUs.contacts.email}</Typography>
                    </Grid>

                </Grid>
                <Grid container spacing={5} lg={8} md={12}>

                    <Grid item xs={6} md={4}>
                        <Box display="flex" flexDirection="column" gap="1rem">
                            {localization[lang].Footer.links1.map((el: any, index: number) =>
                                <Typography
                                    key={el.link}
                                    color={index == 0 ? '#3B82F6' : ''}
                                    fontWeight={index == 0 ? "600" : ''}
                                    className={styles.mobTextMd}
                                    sx={{cursor: 'pointer'}}
                                    onClick={() => navigate(el.link)}>
                                    {el.title}

                                </Typography>)}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={4} columnSpacing={1}>
                        <Box display="flex" flexDirection="column" gap="1rem">
                            {localization[lang].Footer.links2.map((el: any, index: number) =>
                                <Typography
                                    key={el.link}
                                    color={index == 0 ? '#3B82F6' : ''}
                                    fontWeight={index == 0 ? "600" : ''}
                                    className={styles.mobTextMd}
                                    sx={{cursor: 'pointer'}}
                                    onClick={() => navigate(el.link)}>
                                    {el.title}

                                </Typography>)}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Box display="flex" flexDirection="column" gap="1rem">
                            {localization[lang].Footer.links3.map((el: any, index: number) =>
                                <Typography
                                    key={el.link}
                                    color={index == 0 ? '#3B82F6' : ''}
                                    fontWeight={index == 0 ? "600" : ''}
                                    className={styles.mobTextMd}
                                    sx={{cursor: 'pointer'}}
                                    onClick={() => navigate(el.link)}>
                                    {el.title}

                                </Typography>)}
                        </Box>
                    </Grid>
                </Grid>
                <Grid md={0} xs={12}><br/></Grid>
            </Grid>


        </Box>

    );
};
