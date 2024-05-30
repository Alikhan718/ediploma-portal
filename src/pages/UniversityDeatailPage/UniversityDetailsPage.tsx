import React, { RefObject, useEffect, useState } from 'react';
import {
  Box, Button, Typography, useMediaQuery, Pagination,
  InputAdornment, Alert, Snackbar
} from '@mui/material';
import { ReactComponent as HeaderSearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as DiscordIcon } from '@src/assets/icons/discord_black.svg';
import { ReactComponent as Web } from '@src/assets/icons/web_black.svg';
import { ReactComponent as Instagram } from '@src/assets/icons/igEmployer.svg';
import { ReactComponent as Telegram } from '@src/assets/icons/tgEmployer.svg';
import { ReactComponent as Linkedin } from '@src/assets/icons/inEmployer.svg';
import { ReactComponent as Facebook } from '@src/assets/icons/fbEmployer.svg';
import { ReactComponent as Youtube } from '@src/assets/icons/ytEmployer.svg';
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import { Input } from './../../components';
import styles from "./UniversityDeatailPage.module.css";
import { UniversityDetailsHeader } from "@src/pages/UniversityDeatailPage/components/UniversityDetailsHeader";
import { useNavigate, useParams } from "react-router-dom";
import { handleLink } from "@src/utils/link";
import { selectDiplomaList, selectSearchText } from "@src/store/diplomas/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomas, fetchSearch } from "@src/store/diplomas/actionCreators";
import { fetchUniversitiesList } from '@src/store/auth/actionCreators';
import cn from "classnames";
import { selectUniversitiesList, selectUserRole } from '@src/store/auth/selector';
import { ReactComponent as GoldStar } from '@src/assets/icons/goldStar.svg';
import { selectLanguage } from "@src/store/generals/selectors";
import { localization, universityName, univerityMission, universityFacts, universityBestGraduates, universityHistory } from '@src/pages/UnivesrityDetailsPage/generator';
import { FilterSection } from "@src/layout/Filter/FilterSection";
import { FilterAttributes } from "@src/layout/Header/Header";
import ReactGA, { set } from 'react-ga';
import { ReactComponent as Cap } from '@src/assets/icons/academicCap.svg';
import { ReactComponent as PieChart } from '@src/assets/icons/pieChart.svg';
import { ReactComponent as PlusMinus } from '@src/assets/icons/plusMinus.svg';
import { ReactComponent as Graph } from '@src/assets/icons/graph.svg';
import proudStuEx from '@src/assets/example/proudStuEx.png';
import { ReactComponent as ArrowLeft } from '@src/assets/icons/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '@src/assets/icons/arrowRight.svg';
import historyEx from '@src/assets/example/historyEx.png';
import { ReactComponent as Dot } from '@src/assets/icons/dot.svg';
import suHist1 from '@src/assets/example/suHist1.jpeg';
import suHist2 from '@src/assets/example/suHist2.jpeg';
import suHist3 from '@src/assets/example/suHist3.jpeg';
import suHist4 from '@src/assets/example/suHist4.png';
import suHist5 from '@src/assets/example/suHist5.jpeg';
import suProud1 from '@src/assets/example/suProud1.png';
import suProud2 from '@src/assets/example/suProud2.png';
import suProud3 from '@src/assets/example/suProud3.png';
import suProud4 from '@src/assets/example/suProud4.png';
import kbtuHist1 from '@src/assets/example/kbtuHist1.jpg';
import kbtuHist2 from '@src/assets/example/kbtuHist2.jpg';
import kbtuHist3 from '@src/assets/example/kbtuHist3.jpg';
import kbtuHist4 from '@src/assets/example/kbtuHist4.jpg';

const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): any {
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

function a11yProps(index: number): any {
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

  const prevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePrevPage = (): void => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleText = (text: string): string => {
    const matchesSm = useMediaQuery('(max-width:768px)');
    const trimLimit = matchesSm ? 85 : 115;
    return showFull ? text : text.substring(0, trimLimit) + "...";
  };

  const triggerSearchFilters = (filterAttributesNew: any): void => {
    dispatch(fetchSearch(filterAttributesNew));
    navigate(`/university/${id}`);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  const nextPage = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleAlertClose = (): void => {
    setAlertOpen(false);
  };

  const copyCurrentURLToClipboard = (): void => {
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
    const onClick = (): void => {
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

  const handleCardClick = (counter: number): void => {
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
    const handleScroll = (): void => {
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

  const scrollToRef = (direction: string): void => {
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
  const mission = 'eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов.';
  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer} pt='2rem'
      sx={{ backgroundColor: 'white' }}
    >
      <Box display='flex' flexWrap='wrap' justifyContent="center" className={styles.mainContainer}>

        <Box className={styles.upperContainer}>
          <Box display='flex' flexDirection='column'>

            <Box display='flex' flexDirection='column' sx={{ borderRadius: '15px', }}>
              <Box display='flex' flexDirection='row' sx={{ '@medi (max-width: 768px)': { maxWidth: '96vw'} }}>
                <UniversityDetailsHeader banner={data ? data.banner : ""} />
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ marginLeft: '20px', '@media (max-width: 978px)': { display: 'none', }, }}>
                  {/* {galleryImages.length != 0 ? galleryImages.map(image => (
                    <img key={image} src={`${baseURL}/${image}`} style={{ marginBottom: '10px', borderRadius: '1rem', width: "20vw" }} />
                  )) : <img src={diplomaTemplate} style={{ marginBottom: '10px', borderRadius: '1rem', width: "20vw" }} />
                  } */}

                  <img src={`${baseURL}/${galleryImages[0]}`} style={{ marginBottom: '10px', borderRadius: '1rem', width: "20vw" }} />
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
                    '@media (max-width: 768px)': {
                      position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                      maxWidth: '96vw', padding: '0 0.5rem'
                    }
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
                    {data && universityName[data.university_id as keyof typeof universityName] ? universityName[data.university_id as keyof typeof universityName][lang] : ""}
                  </Typography>
                  <Box display="flex" alignItems="center" sx={{ '@media (max-width: 768px)': { marginBottom: '1rem' } }}>
                    {links.map((link: any) => (
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
                      );
                    })}
                    <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: '#DE9703' }} marginX='0.25rem'>4,5</Typography>
                  </Box>
                  <Typography className={styles.textSm} marginX='0.5rem' sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{data ? data.phone : ""}</span>
                  </Typography>
                  <Typography className={styles.textSm} marginX='0.5rem' sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{data ? data.email : ""}</span>
                  </Typography>
                </Box>

                <Box className={styles.contentContainer}>
                  <Box sx={{
                    display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center',
                    '@media (max-width: 768px)': { flexDirection: 'column', justifyContent: 'flext-start', alignItems: 'flex-start', maxWidth: '96vw', padding: '0 0.5rem' }
                  }}
                  >
                    <Box marginRight='3rem' sx={{
                      width: data && data.university_id && data.university_id != 2 ? '55%' : '90%', '@media (max-width: 768px)': { width: '100%', marginRight: '0' }
                    }}>
                      <Box sx={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#4D4D4D',
                        paddingBottom: '10px'
                      }}>
                        {data && data.university_id && data.university_id != 2 ? localization[lang].MainCard.mission : localization[lang].MainCard.missionShort }
                      </Box>
                      <Typography className={styles.textSm} color="#818181">
                        {
                          data && data.university_id ? 
                            univerityMission[data.university_id as keyof typeof univerityMission][lang] : ""
                        }
                      </Typography>
                    </Box>
                    {data && data.university_id != 2 ? 
                      (<Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex' sx={{ paddingBottom: '20px' }}>
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
                      </Box>) : 
                    null }
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
                  <Box sx={{
                    display: data && data.university_id == 2 ? 'none' : 'flex', marginTop: '1.25rem',
                    '@media (max-width: 768px)': {
                      overflow: 'auto', scrollBehavior: 'smooth', flexWrap: 'nowrap',
                      '&::-webkit-scrollbar': { display: 'none' }, maxWidth: '96vw',
                      paddingLeft: '0.5rem',
                    }
                  }}
                  >
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem', marginRight: '1.88rem',
                      '@media (max-width: 768px)': {
                        width: '19.4375rem', padding: '0.75rem', marginRight: '1rem', flexShrink: 0,
                      }
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <Cap />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {
                          data && data.university_id && universityFacts[data.university_id as keyof typeof universityFacts] ?
                            universityFacts[data.university_id as keyof typeof universityFacts][lang][0] : ''
                        }
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem', marginRight: '1.88rem',
                      '@media (max-width: 768px)': {
                        width: '19.4375rem', padding: '0.75rem', marginRight: '1rem', flexShrink: 0,
                      }
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <PlusMinus />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {
                          data && data.university_id && universityFacts[data.university_id as keyof typeof universityFacts] ?
                            universityFacts[data.university_id as keyof typeof universityFacts][lang][1] : ''
                        }
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem', marginRight: '1.88rem',
                      '@media (max-width: 768px)': {
                        width: '19.4375rem', padding: '0.75rem', marginRight: '1rem', flexShrink: 0,
                      }
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <Graph />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {
                          data && data.university_id && universityFacts[data.university_id as keyof typeof universityFacts] ?
                            universityFacts[data.university_id as keyof typeof universityFacts][lang][2] : ''
                        }
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', backgroundColor: '#F4F7FE',
                      borderRadius: '1rem', width: '19.25rem', padding: '1.25rem',
                      '@media (max-width: 768px)': {
                        width: '19.4375rem', padding: '0.75rem', flexShrink: 0,
                      }
                    }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'flex-start', marginBottom: '0.5rem' }}>
                        <PieChart />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: '#58607C' }}>
                        {
                          data && data.university_id && universityFacts[data.university_id as keyof typeof universityFacts] ?
                            universityFacts[data.university_id as keyof typeof universityFacts][lang][3] : ''
                        }
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: data && data.university_id == 2 ? 'none' : 'flex', flexDirection: 'column', borderRadius: '1.5rem', marginTop: '1.25rem', position: 'relative',
                    '@media (max-width: 768px)': { paddingLeft: '0.5rem' }
                   }}>
                    <Box sx={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#4D4D4D',
                      paddingBottom: '10px'
                    }}>
                      {localization[lang].MainCard.history}
                    </Box>

                    <Box sx={{
                      display: 'flex', overflow: 'auto', maxWidth: '92vw',
                      '-ms-overflow-style': 'none', 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' },
                      scrollBehavior: 'smooth', '@media (max-width: 768px)': { maxWidth: '96vw' }
                    }}
                    >
                      <Box sx={{
                        position: 'absolute', width: '61.4375rem', height: '23.75rem', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', '@media (max-width: 768px)': { display: 'none' },
                      }}>
                        <Box sx={{
                          cursor: 'pointer', width: '2.75rem', height: '2.75rem', backgroundColor: '#FFF',
                          borderRadius: '3.5rem', boxShadow: '0px 36px 48px 0px rgba(207, 215, 226, 0.60)',
                          display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '1.75rem',
                        }} onClick={(): void => scrollToRef('prev')}
                        >
                          <ArrowLeft />
                        </Box>
                        <Box sx={{
                          cursor: 'pointer', width: '2.75rem', height: '2.75rem', backgroundColor: '#FFF',
                          borderRadius: '3.5rem', boxShadow: '0px 36px 48px 0px rgba(207, 215, 226, 0.60)',
                          display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1.75rem'
                        }} onClick={(): void => scrollToRef('next')}
                        >
                          <ArrowRight />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historyFirstRef}>
                        <Box sx={{
                          width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem',
                          '@media (max-width: 768px)': { width: '19.4375rem', height: '12.5rem' },
                        }}>
                          <img 
                            src={
                              data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                              universityHistory[data.university_id as keyof typeof universityHistory][lang][0].image :
                              historyEx
                            }
                            style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} 
                          />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][0].title : ''
                          }
                        </Box>
                        <Typography className={styles.textSm} color="#818181" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][0].text : ''
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historySecondRef}>
                        <Box sx={{
                          width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem',
                          '@media (max-width: 768px)': { width: '19.4375rem', height: '12.5rem' },
                        }}>
                          <img 
                            src={
                              data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                              universityHistory[data.university_id as keyof typeof universityHistory][lang][1].image :
                              historyEx
                            }
                            style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} 
                          />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][1].title : ''
                          }
                        </Box>
                        <Typography className={styles.textSm} color="#818181" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][1].text : ''
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historyThirdRef}>
                        <Box sx={{
                          width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem',
                          '@media (max-width: 768px)': { width: '19.4375rem', height: '12.5rem' },
                        }}>
                          <img 
                            src={
                              data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                              universityHistory[data.university_id as keyof typeof universityHistory][lang][2].image :
                              historyEx
                            }
                            style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} 
                          />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][2].title : ''
                          }
                        </Box>
                        <Typography className={styles.textSm} color="#818181" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][2].text : ''
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '1.88rem' }} ref={historyFourthRef}>
                        <Box sx={{
                          width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem',
                          '@media (max-width: 768px)': { width: '19.4375rem', height: '12.5rem' },
                        }}>
                          <img 
                            src={
                              data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                              universityHistory[data.university_id as keyof typeof universityHistory][lang][3].image :
                              historyEx
                            }
                            style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} 
                          />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][3].title : ''
                          }
                        </Box>
                        <Typography className={styles.textSm} color="#818181" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][3].text : ''
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }} ref={historyFifthRef}>
                        <Box sx={{
                          width: '61.4375rem', height: '23.75rem', backgroundColor: '#F4F7FE', borderRadius: '1.5rem',
                          '@media (max-width: 768px)': { width: '19.4375rem', height: '12.5rem' },
                        }}>
                          <img 
                            src={
                              data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                              universityHistory[data.university_id as keyof typeof universityHistory][lang][4].image :
                              historyEx
                            }
                            style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }} 
                          />
                        </Box>
                        <Box sx={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px',
                          marginTop: '1rem'
                        }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][4].title : ''
                          }
                        </Box>
                        <Typography className={styles.textSm} color="#818181" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                          {
                            data && data.university_id && universityHistory[data.university_id as keyof typeof universityHistory] ?
                            universityHistory[data.university_id as keyof typeof universityHistory][lang][4].text : ''
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ width: '61.4375rem', height: '23.75rem', '@media (max-width: 768px)': { width: '19.4375rem', height: '12.5rem' } }}>
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
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{data && data.university_id == 1 ? '2000' : '1933'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{data && data.university_id == 1 ? '2001' : '1938'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{data && data.university_id == 1 ? '2003' : '1970'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{data && data.university_id == 1 ? '2005' : '1999'}</Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="253" height="2" viewBox="0 0 270 2" fill="none">
                        <path d="M270 1.00002L0 1" stroke='transparent' strokeWidth="2" />
                      </svg>
                      <Typography sx={{ color: '#3B82F6', fontSize: '0.75rem' }}>{data && data.university_id == 1 ? '2011' : '2017'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{
                    display: data && data.university_id != 3 ? 'none' : 'flex', flexDirection: 'column', backgroundColor: '#FAFBFF',
                    padding: '1.75rem', borderRadius: '1.5rem', marginTop: '1.25rem', '@media (max-width: 768px)': { maxWidth: '96vw' },
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
                      {localization[lang].MainCard.best}
                    </Typography>
                    <Box sx={{ display: 'flex', '@media (max-width: 998px)': { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' } }}>
                      <Box sx={{
                        width: '19rem', height: '22.25rem', marginRight: '1rem', borderRadius: '1rem',
                        backgroundColor: 'var(--color-light-dark-200, #F4F7FE)',
                        background: 'linear-gradient(180deg, rgba(41, 51, 87, 0.00) 62.06%, rgba(41, 51, 87, 0.70) 85.58%, #293357 100%',
                        '@media (max-width: 768px)': {
                          marginRight: '0rem', marginBottom: '1rem',
                        },
                      }}>
                        <Box sx={{
                          position: 'absolute', width: '19rem', height: '22.25rem', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.75rem', width: '100%' }}>
                            <Box sx={{
                              display: data && data.university_id == 1 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center',
                              width: '2.5rem', height: '2.5rem', backgroundColor: 'transparent', borderRadius: '1.5rem',
                              border: '1px solid var(--color-light-dark-600, #58607C)', cursor: 'pointer',
                            }}>
                              <Linkedin />
                            </Box>
                          </Box>
                          <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][0].name :
                                  'Имя фамилия Отчество выпускника/ученика'
                              }
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][0].description :
                                  'Специализация выпускника/ученика'
                              }
                            </Typography>
                          </Box>
                        </Box>
                        <img 
                          src={
                              data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                              universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][0].image :
                              proudStuEx
                          }
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} 
                        />
                      </Box>
                      <Box sx={{
                        width: '19rem', height: '22.25rem', marginRight: '1rem', borderRadius: '1rem',
                        backgroundColor: 'var(--color-light-dark-200, #F4F7FE)',
                        background: 'linear-gradient(180deg, rgba(41, 51, 87, 0.00) 62.06%, rgba(41, 51, 87, 0.70) 85.58%, #293357 100%',
                        '@media (max-width: 768px)': {
                          marginRight: '0rem', marginBottom: '1rem',
                        },
                      }}>
                        <Box sx={{
                          position: 'absolute', width: '19rem', height: '22.25rem', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.75rem', width: '100%' }}>
                            <Box sx={{
                              display: data && data.university_id == 1 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center',
                              width: '2.5rem', height: '2.5rem', backgroundColor: 'transparent', borderRadius: '1.5rem',
                              border: '1px solid var(--color-light-dark-600, #58607C)', cursor: 'pointer',
                            }}>
                              <Linkedin />
                            </Box>
                          </Box>
                          <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][1].name :
                                  'Имя фамилия Отчество выпускника/ученика'
                              }
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][1].description :
                                  'Специализация выпускника/ученика'
                              }
                            </Typography>
                          </Box>
                        </Box>
                        <img 
                          src={
                              data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                              universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][1].image :
                              proudStuEx
                          }
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} 
                        />
                      </Box>
                      <Box sx={{
                        width: '19rem', height: '22.25rem', marginRight: '1rem', borderRadius: '1rem',
                        backgroundColor: 'var(--color-light-dark-200, #F4F7FE)',
                        background: 'linear-gradient(180deg, rgba(41, 51, 87, 0.00) 62.06%, rgba(41, 51, 87, 0.70) 85.58%, #293357 100%',
                        '@media (max-width: 768px)': {
                          marginRight: '0rem', marginBottom: '1rem',
                        },
                      }}>
                        <Box sx={{
                          position: 'absolute', width: '19rem', height: '22.25rem', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.75rem', width: '100%' }}>
                            <Box sx={{
                              display: data && data.university_id == 1 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center',
                              width: '2.5rem', height: '2.5rem', backgroundColor: 'transparent', borderRadius: '1.5rem',
                              border: '1px solid var(--color-light-dark-600, #58607C)', cursor: 'pointer',
                            }}>
                              <Linkedin />
                            </Box>
                          </Box>
                          <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][2].name :
                                  'Имя фамилия Отчество выпускника/ученика'
                              }
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][2].description :
                                  'Специализация выпускника/ученика'
                              }
                            </Typography>
                          </Box>
                        </Box>
                        <img 
                          src={
                              data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                              universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][2].image :
                              proudStuEx
                          }
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} 
                        />
                      </Box>
                      <Box sx={{
                        width: '19rem', height: '22.25rem', marginRight: '1rem', borderRadius: '1rem',
                        backgroundColor: 'var(--color-light-dark-200, #F4F7FE)',
                        background: 'linear-gradient(180deg, rgba(41, 51, 87, 0.00) 62.06%, rgba(41, 51, 87, 0.70) 85.58%, #293357 100%',
                        '@media (max-width: 768px)': {
                          marginRight: '0rem', marginBottom: '1rem',
                        },
                      }}>
                        <Box sx={{
                          position: 'absolute', width: '19rem', height: '22.25rem', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1.75rem', width: '100%' }}>
                            <Box sx={{
                              display: data && data.university_id == 1 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center',
                              width: '2.5rem', height: '2.5rem', backgroundColor: 'transparent', borderRadius: '1.5rem',
                              border: '1px solid var(--color-light-dark-600, #58607C)', cursor: 'pointer',
                            }}>
                              <Linkedin />
                            </Box>
                          </Box>
                          <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: '600', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][3].name :
                                  'Имя фамилия Отчество выпускника/ученика'
                              }
                            </Typography>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--Color-Neutral-50, #FFF)' }}>
                              {
                                data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                                  universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][3].description :
                                  'Специализация выпускника/ученика'
                              }
                            </Typography>
                          </Box>
                        </Box>
                        <img 
                          src={
                              data && data.university_id && universityBestGraduates[data.university_id as keyof typeof universityBestGraduates] ?
                              universityBestGraduates[data.university_id as keyof typeof universityBestGraduates][lang][3].image :
                              proudStuEx
                          }
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} 
                        />
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
          <Box sx={{ width: '100%', '@media (max-width: 768px)': { maxWidth: '96vw' } }}>
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
                {localization[lang].MainCard.reserve}
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
                    onClick={(): void => {
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
                            onClick={(): void => {
                              triggerSearchFilters(filterAttributes);
                              ReactGA.event({ category: 'User', action: 'Search', label: searchQuery, });
                            }}
                          />
                        </InputAdornment>
                      }
                      onChange={(e): void => {
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
                  >{''}
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
                    onClick={(): void => {
                      handleCardClick(e.id!);
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
                          {lang === 'ru' ? e.name_ru : lang === 'kz' ? e.name_kz : lang === 'en' ? e.name_en : e.name_ru}
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
                      onChange={(event, page): void => setCurrentPage(page)}
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
        toggleBottomSheet={null}
      />
    </Box >
  );
};
