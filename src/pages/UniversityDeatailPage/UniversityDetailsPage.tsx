import React, { RefObject, useEffect, useState } from 'react';
import {
  Box, Button, Rating, Typography, useMediaQuery, Pagination,
  InputAdornment, Grid, Container, Alert, Snackbar
} from '@mui/material';
import { Button as ButtonAlt } from '@src/components';
import { ReactComponent as HeaderSearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as SmartContractIcon } from '@src/assets/icons/smartContract_black.svg';
import { ReactComponent as DiscordIcon } from '@src/assets/icons/discord_black.svg';
import { ReactComponent as Web } from '@src/assets/icons/web_black.svg';
import { ReactComponent as Instagram } from '@src/assets/icons/igEmployer.svg';
import { ReactComponent as Telegram } from '@src/assets/icons/tgEmployer.svg';
import { ReactComponent as Linkedin } from '@src/assets/icons/inEmployer.svg';
import { ReactComponent as Facebook } from '@src/assets/icons/fbEmployer.svg';
import { ReactComponent as Youtube } from '@src/assets/icons/ytEmployer.svg';
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import { SwitchDetailsUniversity } from '../UniversityProfile/components/SwitchDetailsunivesiyt';
import univ from './../../assets/icons/FilterUn.svg';
import { Input } from './../../components';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import styles from "./UniversityDeatailPage.module.css";
import { UniversityDetailsHeader } from "@src/pages/UniversityDeatailPage/components/UniversityDetailsHeader";
import star from "./../../assets/icons/Star1.svg";
import share from "./../../assets/icons/share.svg";
import dots from "./../../assets/icons/Dots.svg";
import { useNavigate, useParams } from "react-router-dom";
import { handleLink } from "@src/utils/link";
import imageU from "@src/assets/example/universityKBTU.jpg"
import { selectDiplomaList, selectSearchText } from "@src/store/diplomas/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomas, fetchSearch } from "@src/store/diplomas/actionCreators";
import { fetchUniversitiesList } from '@src/store/auth/actionCreators';
import cn from "classnames";
import { selectUniversitiesList, selectUserRole } from '@src/store/auth/selector';
import StarIcon from '@mui/icons-material/Star';
import { ReactComponent as GoldStar } from '@src/assets/icons/goldStar.svg';
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/pages/UnivesrityDetailsPage/generator';
import { FilterSection } from "@src/layout/Filter/FilterSection";
import { FilterAttributes } from "@src/layout/Header/Header";
import exampleImage from "@src/assets/example/UnivSTU.jpg";
import ReactGA, { set } from 'react-ga';
import diplomaTemplate from "@src/assets/example/diploma_template.svg";
import { isAuthenticated } from "@src/utils/userAuth";
import { ReactComponent as Cap } from '@src/assets/icons/academicCap.svg';
import { ReactComponent as PieChart } from '@src/assets/icons/pieChart.svg';
import { ReactComponent as PlusMinus } from '@src/assets/icons/plusMinus.svg';
import { ReactComponent as Graph } from '@src/assets/icons/graph.svg';
import proudStudentEx from '@src/assets/example/proudStudentEx.png';
import proudStuEx from '@src/assets/example/proudStuEx.png';
import { ReactComponent as ArrowLeft } from '@src/assets/icons/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '@src/assets/icons/arrowRight.svg';
import historyEx from '@src/assets/example/historyEx.png';
import { ReactComponent as Dot } from '@src/assets/icons/dot.svg';

const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}

      {...other}
    >
      {value === index && (
        <Box pr={3} pt={2} sx={{ paddingRight: 'unset' }}>
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

export const UniversityDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useSelector(selectUserRole);
  const lang = useSelector(selectLanguage);
  const diplomaList = useSelector(selectDiplomaList);
  const searchText = useSelector(selectSearchText);
  const { id } = useParams();
  const universityList = useSelector(selectUniversitiesList);
  const defaultS = 3.5;

  const [isDataAlert, setIsDataAlert] = React.useState(false);
  const [showFull, setShowFull] = React.useState(false);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilter, setShowFilter] = React.useState(false);
  const [data, setData] = useState<any>();
  const [value, setValue] = React.useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [links, setLinks] = React.useState<any[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
    text: searchText,
    specialities: '',
    region: '',
    degree: '',
    year: 0,
    gpaL: 0,
    gpaR: 0,
  });

  const diplomasPerPage = 10; // Change this number as needed
  const totalDiplomas = diplomaList.length;
  const totalPages = Math.ceil(totalDiplomas / diplomasPerPage);
  const startIndex = (currentPage - 1) * diplomasPerPage;
  const endIndex = startIndex + diplomasPerPage;
  const currentDiplomaPage = diplomaList.slice(startIndex, endIndex);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleText = (text: string): string => {
    const matchesSm = useMediaQuery('(max-width:768px)');
    const trimLimit = matchesSm ? 85 : 115;
    return showFull ? text : text.substring(0, trimLimit) + "...";
  };

  const triggerSearchFilters = (filterAttributesNew: any) => {
    dispatch(fetchSearch(filterAttributesNew));
    navigate(`/university/${id}`);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const copyCurrentURLToClipboard = () => {
    const currentURL = window.location.href;
    const textArea = document.createElement('textarea');
    textArea.value = currentURL;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setIsDataAlert(true);
  };

  const getIconForLink = (name: any, link: any): React.ReactNode => {
    const onClick = () => {
      handleLink(link);
    };
    if (name.includes('linkedin')) {
      return <Linkedin cursor="pointer" className={styles.social} onClick={onClick} />;
    }
    if (name.includes('facebook')) {
      return <Facebook cursor="pointer" className={styles.social} onClick={onClick} />;
    }
    if (name.includes('instagram')) {
      return <Instagram cursor="pointer" className={styles.social} onClick={onClick} />;
    }
    if (name.includes('telegram')) {
      return <Telegram cursor="pointer" className={styles.social} onClick={onClick} />;
    }
    if (name.includes('youtube')) {
      return <Youtube cursor="pointer" className={styles.social} onClick={onClick} />;
    }
    if (name.includes('discord')) {
      return <DiscordIcon cursor="pointer" className={styles.social} onClick={onClick} />;
    }
    return <Web cursor="pointer" className={styles.social} onClick={onClick} />;
  };

  const handleCardClick = (counter: number) => {
    if (userRole === 'Student' && counter != data.id) {
      setAlertOpen(true);
      return;
    }

    navigate(`/diploma/${counter}/1`);
  };

  React.useEffect(() => {
    let temp: any[] = [];
    for (let key in data) {

      let value = data[key];
      if (key.includes('link') && value) {
        temp.push({ name: key, value: value });
      }
    }
    setLinks(temp);
  }, [data, !links]);

  React.useEffect(() => {
    dispatch(fetchUniversitiesList());
  }, []);

  React.useEffect(() => {
    const universityData = universityList.filter((university: any) => university.id == id)[0];
    setData(universityData);
    if (universityData && universityData.gallery) {
      let images = JSON.parse(universityData.gallery);
      setGalleryImages(images);
    }
  }, [universityList]);

  useEffect(() => {
    if (data && data.university_id) {
      dispatch(fetchDiplomas({ university_id: data.university_id }));
      return;
    }

    dispatch(fetchDiplomas({ university_id: -1 }));
  }, [totalDiplomas, data]);

  useEffect(() => {
    const handleScroll = () => {
      setIsDataAlert(false);
    };

    if (isDataAlert) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDataAlert]);

  const historyFirstRef: RefObject<HTMLDivElement> = React.useRef(null);
  const historySecondRef: RefObject<HTMLDivElement> = React.useRef(null);
  const historyThirdRef: RefObject<HTMLDivElement> = React.useRef(null);
  const historyFourthRef: RefObject<HTMLDivElement> = React.useRef(null);
  const historyFifthRef: RefObject<HTMLDivElement> = React.useRef(null);

  const [currentHistory, setCurrentHistory] = React.useState(0);

  const getRefById = (id: number): RefObject<HTMLDivElement> => {
    switch (id) {
      case 0:
        return historyFirstRef;
      case 1:
        return historySecondRef;
      case 2:
        return historyThirdRef;
      case 3:
        return historyFourthRef;
      case 4:
        return historyFifthRef;
      default:
        return historyFirstRef;
    }
  };

  const scrollToRef = (direction: string) => {
    const ref = getRefById(direction === 'next' ? currentHistory + 1 : currentHistory - 1);
    if (direction === 'next' && currentHistory < 4) {
      setCurrentHistory(currentHistory + 1);
    }
    else if (direction === 'prev' && currentHistory > 0) {
      setCurrentHistory(currentHistory - 1);
    } else {
      return;
    }

    if (ref && ref.current) {
      const container = ref.current.parentElement;
      if (container) {
        const targetOffsetLeft = ref.current.offsetLeft;
        const scrollLeft = Math.max(0, targetOffsetLeft - 90);
        container.scrollLeft = scrollLeft;
      }
    }
  };

  useEffect(() => {
    const refs = [
      historyFirstRef,
      historySecondRef,
      historyThirdRef,
      historyFourthRef,
      historyFifthRef,
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetRef = refs.find(ref => ref.current === entry.target);
            if (targetRef) {
              setCurrentHistory(refs.indexOf(targetRef));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (historyFirstRef.current) observer.observe(historyFirstRef.current);
    if (historySecondRef.current) observer.observe(historySecondRef.current);
    if (historyThirdRef.current) observer.observe(historyThirdRef.current);
    if (historyFourthRef.current) observer.observe(historyFourthRef.current);
    if (historyFifthRef.current) observer.observe(historyFifthRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const stars = [1, 2, 3, 4, 5];
  const mission = 'eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов.'
  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer} pt='2rem'
      sx={{ backgroundColor: 'white' }}
    >
      <Box display='flex' flexWrap='wrap' justifyContent="center" className={styles.mainContainer}>

        <Box className={styles.upperContainer}>
          <Box display='flex' flexDirection='column'>

            <Box display='flex' flexDirection='column' sx={{ borderRadius: '15px', }}>
              <Box display='flex' flexDirection='row'>
                <UniversityDetailsHeader banner={data ? data.banner : ""} />
                <Box display='flex' flexDirection='column' sx={{ marginLeft: '20px', '@media (max-width: 978px)': { display: 'none', }, }}>
                  {galleryImages.length != 0 ? galleryImages.map(image => (
                    <img key={image} src={`${baseURL}/${image}`} style={{ marginBottom: '10px', borderRadius: '1rem', width: "20vw" }} />
                  )) : <img src={diplomaTemplate} style={{ marginBottom: '10px', borderRadius: '1rem', width: "20vw" }} />
                  }
                </Box>
              </Box>
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    '@media (max-width: 768px)': { position: 'relative', }
                  }}
                >
                  <Typography
                    className={styles.nameText}
                    fontWeight='600'
                    sx={{
                      width: '70%',
                      paddingBottom: '14px',
                      fontSize: '28px',
                      '@media (max-width: 998px)': {
                        fontSize: '24px',

                      },
                      '@media (max-width: 768px)': {
                        fontSize: '24px',
                        width: '100%',
                      },
                    }}
                  >
                    {/* {localization[lang].MainCard.uniNames} */}
                    {data ? data.name : ""}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {links.map((link: any, index: number) => (
                      <Box key={link["name"] + "Box"} display='flex' justifyContent="center"
                        alignItems='center' padding={link["name"].includes('linkedin') ? '0.7rem' : '0.5rem'} marginX='0.5rem'
                        sx={{
                          backgroundColor: '#F4F7FE', borderRadius: '50%',
                          '&:hover': { backgroundColor: '#E2E8F0', cursor: 'pointer', },
                        }}
                        onClick={(): void => { handleLink("facebook"); }}
                      >
                        {getIconForLink(link["name"], link["value"])}
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box display='flex' flexDirection='row' alignItems='center'>
                  <Box display='flex' marginRight='0.5rem' paddingX='0.75rem' paddingY='0.25rem'
                    alignItems='center' justifyContent='center'
                    sx={{ backgroundColor: '#FEFCE8', borderRadius: '1.25rem', }}
                  >
                    {stars.map((star, index) => {
                      return (
                        <Box key={index} marginX="0.25rem">
                          <GoldStar />
                        </Box>
                      )
                    })}
                    <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: '#DE9703' }} marginX='0.25rem'>4,5</Typography>
                  </Box>
                  <Typography className={styles.textSm} marginX='0.5rem'>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{data ? data.phone : ""}</span>
                  </Typography>
                  <Typography className={styles.textSm} marginX='0.5rem'>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{data ? data.email : ""}</span>
                  </Typography>
                </Box>

                <Box className={styles.contentContainer}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Box width='55%' marginRight='3rem'>
                      <Box sx={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#4D4D4D',
                        paddingBottom: '10px'
                      }}>
                        {"Миссия университета"}
                      </Box>
                      <Typography className={styles.textSm} color="#818181">
                        {mission}
                      </Typography>
                    </Box>
                    <Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex' sx={{ paddingBottom: '20px' }}>
                      <Box flex='1' sx={{ marginRight: '1.25rem', '@media (max-width: 768px)': { marginRight: '1.25rem' } }}>
                        <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                          sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>{data ? data.student_amount : ""}</Typography>
                        <Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
                          {localization[lang].MainCard.numStudents}
                        </Typography>
                      </Box>
                      <Box flex='1' sx={{ marginRight: '1.25rem', '@media (max-width: 768px)': { marginRight: '1.25rem' } }}>
                        <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                          sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>{data ? data.graduate_amount : ""}</Typography>
                        <Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
                          {localization[lang].MainCard.numAlumnies}
                        </Typography>
                      </Box>
                      <Box flex='1' sx={{ marginRight: '1.25rem', '@media (max-width: 768px)': { marginRight: '1.25rem' } }}>
                        <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                          sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>{data ? data.highlighting_amount : ""}</Typography>
                        <Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
                          {localization[lang].MainCard.numExtra}                      </Typography>
                      </Box>
                      <Box flex='5' sx={{
                        '@media (max-width: 768px)': {
                          display: 'none',
                        }
                      }}>
                        <Typography fontWeight='1000' color='#353840' ml='.1rem'
                          fontSize={'30px'}>{data ? data.average_gpa : ""}</Typography>
                        <Typography className={styles.textSm}>
                          {localization[lang].MainCard.gpa}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* <Box>
                    <Box sx={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#4D4D4D',
                      paddingBottom: '10px'
                    }}> {localization[lang].MainCard.mainInfo} </Box>
                    <Typography className={styles.textSm} color="#818181">
                      {handleText(data ? data.description : "")}
                    </Typography>
                    <Typography style={{ cursor: "pointer" }} className={styles.textSm} fontWeight='600' color='#629BF8'
                      sx={{ paddingBottom: '20px' }}
                      onClick={() => {
                        setShowFull(!showFull);
                      }}>
                      {localization[lang].MainCard.show} {!showFull ? localization[lang].MainCard.more : localization[lang].MainCard.less}
                      <ExpandMore style={{ marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : "" }} />
                    </Typography>
                  </Box> */}
                  <Box sx={{ display: 'flex', marginTop: '1.25rem' }}>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem', marginRight: '1.88rem'
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <Cap />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {'Программы двойных дипломов в сотрудничестве с LSE,Geneva Business School , University of Northampton, IFP Energies Nouvelles'}
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem', marginRight: '1.88rem'
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <PlusMinus />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {'На протяжение 9 лет держал звание лучшего технического вуза Казахстана по Генеральному рейтингу НКАОКО'}
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem', marginRight: '1.88rem'
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <Graph />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {'Лучшие в Казахстане программы Нефтегазовое дело, Химическая инженерия, Информационные технологии'}
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem',
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <PieChart />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {'КазМунайГаз, Казатомпром, Казахстан Темир Жолы, Air Astana, Казахтелеком, Самрук-Энерго, Казкоммерцбанк и Халык Банк являются основными работодателями для выпускников КБТУ.'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', borderRadius: '1.5rem', marginTop: '1.25rem' }}>
                    <Box sx={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#4D4D4D',
                      paddingBottom: '10px'
                    }}>
                      {"История университета"}
                    </Box>

                    <Box sx={{
                      display: 'flex', overflow: 'auto', maxWidth: '92vw',
                      '-ms-overflow-style': 'none', 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' },
                      scrollBehavior: 'smooth'
                    }}
                    >
                      <Box sx={{ position: 'absolute', width: '61.4375rem', height: '23.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{
                          cursor: 'pointer', width: '2.75rem', height: '2.75rem', backgroundColor: '#FFF',
                          borderRadius: '3.5rem', boxShadow: '0px 36px 48px 0px rgba(207, 215, 226, 0.60)',
                          display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '1.75rem'
                        }} onClick={() => scrollToRef('prev')}
                        >
                          <ArrowLeft />
                        </Box>
                        <Box sx={{
                          cursor: 'pointer', width: '2.75rem', height: '2.75rem', backgroundColor: '#FFF',
                          borderRadius: '3.5rem', boxShadow: '0px 36px 48px 0px rgba(207, 215, 226, 0.60)',
                          display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1.75rem'
                        }} onClick={() => scrollToRef('next')}
                        >
                          <ArrowRight />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historyFirstRef}>
                        <Box sx={{ width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem' }}>
                          <img src={historyEx} style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {"2000 - Начало международного сотрудничества в образовании и науке"}
                        </Box>
                        <Typography className={styles.textSm} color="#818181">
                          {"В ходе официального визита Президента в Великобританию в ноябре 2000 года достигнуты соглашения в области образования и науки."}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historySecondRef}>
                        <Box sx={{ width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem' }}>
                          <img src={historyEx} style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {"2001 - Основание Казахстанско-Британского технического университета"}
                        </Box>
                        <Typography className={styles.textSm} color="#818181">
                          {"Основан в 2001 году после соглашений, достигнутых между Казахстаном и Великобританией в области образования и науки."}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historyThirdRef}>
                        <Box sx={{ width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem' }}>
                          <img src={historyEx} style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {"2003 - Развитие образовательной инфраструктуры"}
                        </Box>
                        <Typography className={styles.textSm} color="#818181">
                          {"Создание образовательного центра ТОО «Институт инжиниринга и информационных технологий КБТУ» для переподготовки и повышения квалификации кадров."}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historyFourthRef}>
                        <Box sx={{ width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem' }}>
                          <img src={historyEx} style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {"2005 - Программа двойного диплома, Новый уровень академического обмена"}
                        </Box>
                        <Typography className={styles.textSm} color="#818181">
                          {"Запуск образовательной программы двойного диплома с Лондонской школой экономики и политических наук."}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }} ref={historyFifthRef}>
                        <Box sx={{ width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem' }}>
                          <img src={historyEx} style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {"2011 - КБТУ присоединяется к AACSB"}
                        </Box>
                        <Typography className={styles.textSm} color="#818181">
                          {"Стремясь к дальнейшей интеграции в мировое образовательное пространство, КБТУ вступил в члены Американской ассоциации AACSB (Associationto Advance Collegiate Schools of Business)"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ width: '61.4375rem', height: '23.75rem' }}>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                      <Dot />
                      <svg xmlns="http://www.w3.org/2000/svg" width="270" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke={currentHistory > 0 ? "#3B82F6" : "#D8E6FD"} strokeWidth="2" />
                      </svg>
                      <Dot />
                      <svg xmlns="http://www.w3.org/2000/svg" width="270" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke={currentHistory > 1 ? "#3B82F6" : "#D8E6FD"} strokeWidth="2" />
                      </svg>
                      <Dot />
                      <svg xmlns="http://www.w3.org/2000/svg" width="270" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke={currentHistory > 2 ? "#3B82F6" : "#D8E6FD"} strokeWidth="2" />
                      </svg>
                      <Dot />
                      <svg xmlns="http://www.w3.org/2000/svg" width="270" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke={currentHistory > 3 ? "#3B82F6" : "#D8E6FD"} strokeWidth="2" />
                      </svg>
                      <Dot />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.75rem' }}>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{'2000'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{'2001'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{'2003'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{'2005'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{'2011'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{
                    display: 'flex', flexDirection: 'column', backgroundColor: '#FAFBFF',
                    padding: '1.75rem', borderRadius: '1.5rem', marginTop: '1.25rem'
                  }}
                  >
                    <Typography
                      className={styles.nameText} fontWeight='600' sx={{
                        width: '70%', marginBottom: '1.5rem', fontSize: '2rem',
                        '@media (max-width: 998px)': {
                          fontSize: '24px',
                        },
                        '@media (max-width: 768px)': {
                          fontSize: '24px',
                          width: '100%',
                        },
                      }}
                    >
                      {'Лучшие выпускники'}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{
                        width: '19rem', height: '22.25rem', marginRight: '1rem', borderRadius: '1rem',
                        backgroundColor: 'var(--color-light-dark-200, #F4F7FE)',
                        bacground: 'linear-gradient(180deg, rgba(41, 51, 87, 0.00) 62.06%, rgba(41, 51, 87, 0.70) 85.58%, #293357 100%',
                      }}>
                        <Box sx={{
                          position: 'absolute', width: '19rem', height: '22.25rem', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.75rem', width: '100%' }}>
                            <Box sx={{
                              display: 'flex', justifyContent: 'center', alignItems: 'center',
                              width: '2.5rem', height: '2.5rem', backgroundColor: 'transparent', borderRadius: '1.5rem',
                              border: '1px solid var(--color-light-dark-600, #58607C)', cursor: 'pointer',
                            }}>
                              <Linkedin />
                            </Box>
                          </Box>
                          <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {'Имя фамилия Отчество выпускника/ученика'}
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {'Специализация выпускника/ученика'}
                            </Typography>
                          </Box>
                        </Box>
                        <img src={proudStuEx} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
                      </Box>
                      <Box sx={{
                        width: '19rem', height: '22.25rem', marginRight: '1rem', borderRadius: '1rem',
                        backgroundColor: 'var(--color-light-dark-200, #F4F7FE)',
                        bacground: 'linear-gradient(180deg, rgba(41, 51, 87, 0.00) 62.06%, rgba(41, 51, 87, 0.70) 85.58%, #293357 100%',
                      }}>
                        <Box sx={{
                          position: 'absolute', width: '19rem', height: '22.25rem', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.75rem', width: '100%' }}>
                            <Box sx={{
                              display: 'flex', justifyContent: 'center', alignItems: 'center',
                              width: '2.5rem', height: '2.5rem', backgroundColor: 'transparent', borderRadius: '1.5rem',
                              border: '1px solid var(--color-light-dark-600, #58607C)', cursor: 'pointer',
                            }}>
                              <Linkedin />
                            </Box>
                          </Box>
                          <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {'Имя фамилия Отчество выпускника/ученика'}
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {'Специализация выпускника/ученика'}
                            </Typography>
                          </Box>
                        </Box>
                        <img src={proudStuEx} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
                      </Box>
                      <Box sx={{
                        width: '19rem', height: '22.25rem', marginRight: '1rem', borderRadius: '1rem',
                        backgroundColor: 'var(--color-light-dark-200, #F4F7FE)',
                        bacground: 'linear-gradient(180deg, rgba(41, 51, 87, 0.00) 62.06%, rgba(41, 51, 87, 0.70) 85.58%, #293357 100%',
                      }}>
                        <Box sx={{
                          position: 'absolute', width: '19rem', height: '22.25rem', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.75rem', width: '100%' }}>
                            <Box sx={{
                              display: 'flex', justifyContent: 'center', alignItems: 'center',
                              width: '2.5rem', height: '2.5rem', backgroundColor: 'transparent', borderRadius: '1.5rem',
                              border: '1px solid var(--color-light-dark-600, #58607C)', cursor: 'pointer',
                            }}>
                              <Linkedin />
                            </Box>
                          </Box>
                          <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {'Имя фамилия Отчество выпускника/ученика'}
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {'Специализация выпускника/ученика'}
                            </Typography>
                          </Box>
                        </Box>
                        <img src={proudStuEx} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
                      </Box>
                    </Box>
                  </Box>

                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <SwitchDetailsUniversity /> */}
        <Box className={styles.contentContainer}>
          <Box sx={{ width: '100%' }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              sx={{
                backgroundColor: '#FAFBFF', borderRadius: '15px',
                width: '100%', paddingX: ".5rem",
              }}
            >
              <Box sx={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#4D4D4D',
                paddingTop: '1.75rem',
                paddingLeft: '1.75rem',
              }}>
                {"Резерв кадров"}
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '1rem',
                marginBottom: '2rem',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '20px', padding: '5px', width: '150px',
                      color: '#3B82F6', marginLeft: '20px', marginRight: '15px'
                    }}
                    onClick={() => {
                      setShowFilter(true);
                    }}
                  >
                    <Filter style={{ marginRight: '10px', }} />
                    {localization[lang].Students.filter}
                  </Button>
                  <Box display="flex" alignItems="center">

                    <Input
                      type="text"
                      name="email"
                      placeholder={localization[lang].Students.searchBar}
                      sx={{
                        marginRight: '1rem', flex: '1',

                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <HeaderSearchIcon
                            cursor="pointer"
                            onClick={() => {
                              triggerSearchFilters(filterAttributes);
                              ReactGA.event({ category: 'User', action: 'Search', label: searchQuery, });
                            }}
                          />
                        </InputAdornment>
                      }
                      onChange={(e) => {
                        const query = e.target.value;
                        setFilterAttributes({ ...filterAttributes, text: query });
                        setSearchQuery(query);
                      }}
                    />
                  </Box>
                  <Box>
                  </Box>

                </Box>
                {/* <Box>	<img src={univ} style={{ marginRight: '15px' }} />
									<img src={univ} style={{ marginRight: '5px' }} /></Box> */}
              </Box>

            </Box>
            <TabPanel value={value} index={0}>
              <Box display="flex"
                flexDirection="row"
                alignItems="start"
                sx={{
                  width: '100%',
                  padding: '10px',
                  display: 'grid',
                  backgroundColor: '#F4F7FE',
                  gridTemplateColumns: '4fr 4fr 1fr 1fr',
                  gap: '36px',
                  paddingLeft: '20px',
                  marginTop: '-2rem',
                  '@media (max-width: 768px)': {
                    width: '100%',
                    gridTemplateColumns: '4fr 0fr 0fr 4fr',

                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    fontSize="14px"
                    mb='.5rem' sx={{ color: '#818181' }}
                    className={styles.mobText}
                  >{localization[lang].Students.fullname}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  '@media (max-width: 768px)': { display: 'none', }
                }}>
                  <Typography
                    fontSize="14px"
                    mb='.5rem' sx={{ color: '#818181' }}
                    className={styles.mobText}
                  >{localization[lang].Students.major}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  '@media (max-width: 768px)': { display: 'none', }
                }}>
                  <Typography
                    fontSize="14px"
                    mb='.5rem' sx={{ color: '#818181' }}
                    className={styles.mobText}
                  >{localization[lang].Students.graduationYear}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  '@media (max-width: 768px)': {
                    marginLeft: "11rem"
                  }
                }}>
                  <Typography
                    fontSize="14px"
                    mb='.5rem' sx={{ color: '#818181' }}
                    className={styles.mobText}
                  >GPA
                  </Typography>
                </Box>

              </Box>

              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                alignItems="start"
                sx={{

                  backgroundColor: '#FAFBFF', borderRadius: '15px', padding: '10px',
                  '@media (max-width: 768px)': { width: '100%', },
                }}
              >

                {currentDiplomaPage.map((e: any) => (

                  <Box
                    key={e.id}
                    onClick={() => {
                      handleCardClick(e.id!)
                    }}
                    className={styles.diplomaItem}
                    sx={{
                      width: '100%',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      marginBottom: '1.5rem', display: 'flex',
                      flexDirection: 'row', // Default layout for larger screens
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: 'grid',
                        gridTemplateColumns: '8fr 1fr 1fr',
                        gap: '36px',
                        marginTop: '20px',
                        paddingLeft: '20px',
                        '@media (max-width: 768px)': { gridTemplateColumns: '12fr 1fr 0fr' }
                      }}
                    >
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        '@media (max-width: 768px)': { flexDirection: 'column' }
                      }}>
                        <Typography
                          fontSize="20px"
                          fontWeight="600"
                          mb='.5rem'
                          className={styles.mobText}
                          sx={{ width: '50%', '@media (max-width: 768px)': { width: '100%' } }}
                        >
                          {e.name_ru}
                        </Typography>
                        <Typography fontSize="1rem" marginX="2rem" className={styles.mobTextSm}
                          sx={{
                            width: '70%',
                            '@media (max-width: 768px)': {
                              marginX: '0',
                              width: '100%'
                            }
                          }}>
                          {e.qualification_kz ? e.qualification_kz.substring(0, e.qualification_kz.search("»") + 1) : ""}
                        </Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginX: '1rem',
                        '@media (max-width: 768px)': { display: 'none', }
                      }}>
                        {e.year ? e.year : ""}
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          marginX: '1rem',
                          flexDirection: 'column'
                        }} // Adjust spacing as needed
                      >
                        <Typography fontSize="0.875rem">
                          {e.gpa ? e.gpa : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))
                }

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: "2rem"
                }}>
                  <Box style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, page) => setCurrentPage(page)}
                      shape="rounded"
                      color="primary"
                      size="large"
                      siblingCount={window.innerWidth < 600 ? 0 : 1}
                      boundaryCount={window.innerWidth < 600 ? 1 : 2}
                    />
                  </Box>
                </Box>

              </Box>
            </TabPanel>

          </Box>

        </Box>
      </Box>
      {
        isDataAlert ?
          (<Alert
            sx={{
              borderRadius: '10rem',
              position: 'fixed',
              bottom: '2rem',
              left: '2rem',
            }}
            severity="success"
          >
            {localization[lang].Alerts.copied}
          </Alert>) :
          (<></>)
      }
      <Snackbar
        open={alertOpen} autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: '100%' }}>
          Просмотр данного диплома вам не доступен!
        </Alert>
      </Snackbar>
      <FilterSection
        triggerSearchFilters={triggerSearchFilters}
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        open={showFilter}
        setOpen={setShowFilter}
      />
    </Box >
  );
};