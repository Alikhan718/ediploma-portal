import React, {useState, useEffect} from 'react';
import {
    Box, Button, Rating, Typography, useMediaQuery, Pagination,
    InputAdornment, Alert, Snackbar
} from '@mui/material';
import {ReactComponent as HeaderSearchIcon} from '@src/assets/icons/search.svg';
import {ReactComponent as DiscordIcon} from '@src/assets/icons/discord_black.svg';
import {ReactComponent as Web} from '@src/assets/icons/web_black.svg';
import {ReactComponent as Instagram} from '@src/assets/icons/instragram.svg';
import {ReactComponent as Telegram} from '@src/assets/icons/telegram.svg';
import {ReactComponent as Linkedin} from '@src/assets/icons/linkedin.svg';
import {ReactComponent as Facebook} from '@src/assets/icons/facebook.svg';
import {ReactComponent as Youtube} from '@src/assets/icons/youtube.svg';
import {ReactComponent as Filter} from '@src/assets/icons/Tuning 2.svg';
import {SwitchDetailsUniversity} from '../UniversityProfile/components/SwitchDetailsunivesiyt';
import {Input} from './../../components';
import {ReactComponent as ExpandMore} from '@src/assets/icons/expand_more.svg';
import styles from "./SchoolDetailsPage.module.css";
import {SchoolDetailsHeader} from "@src/pages/SchoolDetailsPage/components/SchoolDetailsHeader";
import share from "./../../assets/icons/share.svg";
import dots from "./../../assets/icons/Dots.svg";
import {useNavigate, useParams} from "react-router-dom";
import {handleLink} from "@src/utils/link";
import {selectDiplomaList, selectSearchText} from "@src/store/diplomas/selectors";
import {useDispatch, useSelector} from "react-redux";
import {fetchDiplomas, fetchSearch} from "@src/store/diplomas/actionCreators";
import {fetchUniversitiesList} from '@src/store/auth/actionCreators';
import cn from "classnames";
import {selectUniversitiesList, selectUserRole} from '@src/store/auth/selector';
import {selectLanguage} from "@src/store/generals/selectors";
import {localization, schools} from "@src/pages/SchoolDetailsPage/generator";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import {FilterAttributes} from "@src/layout/Header/Header";
import ReactGA from 'react-ga';
import diplomaTemplate from "@src/assets/example/diploma_template.svg";

const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

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
        <Box pr={3} pt={2} sx={{paddingRight: 'unset'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const SchoolDetailsPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const userRole = useSelector(selectUserRole);
    const lang = useSelector(selectLanguage);
    const diplomaList = useSelector(selectDiplomaList);
    const searchText = useSelector(selectSearchText);
    const {id} = useParams();
  
    const [isDataAlert, setIsDataAlert] = React.useState(false);
    const [showFull, setShowFull] = React.useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
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
        gpa:0,
        rating:0,
    });
  
    const diplomasPerPage = 10; // Change this number as needed
    const totalDiplomas = diplomaList.length;
    const totalPages = Math.ceil(totalDiplomas / diplomasPerPage);
    const startIndex = (currentPage - 1) * diplomasPerPage;
    const endIndex = startIndex + diplomasPerPage;
    const currentDiplomaPage = diplomaList.slice(startIndex, endIndex);
    
    const schoolSample = {
        id: 1,
        banner: "",
        name: "NIS",
        phone: "8 777 777 77 77",
        student_amount: 1000,
        graduate_amount: 1000,
        highlighting_amount: 1000,
        average_gpa: 3.5,
        description: "Nazarbayev Intellectual School of Physics and Mathematics in Almaty is a school that provides a high level of education. The school is located in Almaty, Kazakhstan. Nazarbayev Intellectual School of Physics and Mathematics in Almaty is a school that provides a high level of education. The school is located in Almaty, Kazakhstan",
    };

    const school = schools[Number(id) as keyof typeof schools] || schoolSample;
  
    const handleText = (text: string): string => {
      const matchesSm = useMediaQuery('(max-width:768px)');
      const trimLimit = matchesSm ? 85 : 115;
      return showFull ? text : text.substring(0, trimLimit) + "...";
    };
  
    const triggerSearchFilters = ( filterAttributesNew:any ) => {
      dispatch(fetchSearch(filterAttributesNew));
      navigate(`/university/${id}`);
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
            return <Linkedin cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('facebook')) {
            return <Facebook cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('instagram')) {
            return <Instagram cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('telegram')) {
            return <Telegram cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('youtube')) {
            return <Youtube cursor="pointer"className={styles.social} onClick={onClick}/>;
        }
        if (name.includes('discord')) {
            return <DiscordIcon cursor="pointer" className={styles.social} onClick={onClick}/>;
        }
        return <Web cursor="pointer" className={styles.social} onClick={onClick}/>;
    };
  
    const handleCardClick = (counter: number) => {
        if (userRole === 'Student' && counter != school.id) {
            setAlertOpen(true);
            return;
        }
  
        navigate(`/diploma/${counter}/1`);
    };

    useEffect(() => {
      if (school && school.university_id){
        dispatch(fetchDiplomas({university_id: school.university_id}));
        return;
      }    
  
      dispatch(fetchDiplomas({university_id: -1}));
    }, [totalDiplomas, school]);
  
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

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer} pt='2rem'>
          <Box display='flex' flexWrap='wrap' justifyContent="center" className={styles.mainContainer}>
    
            <Box className={styles.upperContainer}>
              <Box display='flex' flexDirection='row'>
    
                <Box display='flex' flexDirection='column' sx={{borderRadius: '15px',}}>
                  <SchoolDetailsHeader school={school ? school : null}/>
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                        '@media (max-width: 768px)': {position: 'relative',}
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
                        {school ? school.name[lang] : ""}
                      </Typography>
                      <Box marginBottom="25px" sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        '@media (max-width: 768px)': {display: 'none'}
                      }}>
                        <img src={share} style={{
                          marginRight: '10px',
                          marginLeft: '10px',
                          width: '25px',
                          height: '25px',
                          cursor: 'pointer',
                        }} onClick={copyCurrentURLToClipboard}/>
                      </Box>
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        display: 'none',
                        justifyContent: 'space-between',
                        '@media (max-width: 768px)': {display: 'flex'}
                      }}>
                        <img src={dots} style={{
                          width: '15px',
                          height: '15px',
                          transform: 'rotate(90deg)'
                        }}/>
                      </Box>
                    </Box>
        
                    <Box display='flex' flexDirection='column'>
                      <Typography className={styles.textSm}>
                        {localization[lang].MainCard.phone}: <span
                        style={{fontWeight: 'bold', fontSize: '18px'}}>{school ? school.phone : ""}</span>
                      </Typography>
                      <Typography className={styles.textSm} fontWeight='600' ml='.5rem'></Typography>
                    </Box>
                    <Box className={styles.contentContainer}>
                      <Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex' sx={{paddingBottom: '20px'}}>
                        <Box flex='1' sx={{marginRight: '50px', '@media (max-width: 768px)': {marginRight: '5px'}}}>
                          <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                                      sx={{'@media (max-width: 768px)': {fontSize: '20px'}}}>{school ? school.student_amount : ""}</Typography>
                          <Typography sx={{'@media (max-width: 768px)': {fontSize: '15px'}}}>
                            {localization[lang].MainCard.numStudents}
                          </Typography>
                        </Box>
                        <Box flex='1' sx={{marginRight: '50px', '@media (max-width: 768px)': {marginRight: '10px'}}}>
                          <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                                      sx={{'@media (max-width: 768px)': {fontSize: '20px'}}}>{school ? school.graduate_amount : ""}</Typography>
                          <Typography sx={{'@media (max-width: 768px)': {fontSize: '15px'}}}>
                            {localization[lang].MainCard.numAlumnies}
                          </Typography>
                        </Box>
                        <Box flex='1' sx={{marginRight: '50px', '@media (max-width: 768px)': {marginRight: '5px'}}}>
                          <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                                      sx={{'@media (max-width: 768px)': {fontSize: '20px'}}}>{school ? school.highlighting_amount : ""}</Typography>
                          <Typography sx={{'@media (max-width: 768px)': {fontSize: '15px'}}}>
                            {localization[lang].MainCard.numExtra}                      </Typography>
                        </Box>
                        <Box flex='5' sx={{
                          '@media (max-width: 768px)': {
                            display: 'none',
                          }
                        }}>
    
                          <Typography fontWeight='1000' color='#353840' ml='.1rem'
                                      fontSize={'30px'}>{school ? school.average_gpa : ""}</Typography>
                          <Typography className={styles.textSm}>
                            {localization[lang].MainCard.gpa}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center">
                        {links.map((link: any, index: number) => (
                          <Box key={link["name"] + "Box"} marginRight="1rem">
                            {getIconForLink(link["name"], link["value"])}
                          </Box>
                        ))}
                      </Box>
                      <Box>
                        <Box sx={{
                          fontSize: '24px',
                          fontWeight: '600',
                          color: '#4D4D4D',
                          paddingBottom: '10px'
                        }}> {localization[lang].MainCard.mainInfo} </Box>
                        <Typography className={styles.textSm} color="#818181">
                          {handleText(school ? school.description[lang as keyof typeof school.description] : "")}
                        </Typography>
                        <Typography style={{cursor: "pointer"}} className={styles.textSm} fontWeight='600' color='#629BF8'
                                    sx={{paddingBottom: '20px'}}
                                    onClick={() => {
                                      setShowFull(!showFull);
                                    }}>
                          {localization[lang].MainCard.show} {!showFull ? localization[lang].MainCard.more : localization[lang].MainCard.less}
                          <ExpandMore style={{marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : ""}}/>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box display='flex' flexDirection='column' sx={{
                  marginLeft: '20px',
                  '@media (max-width: 978px)': {
                    display: 'none',
                  },
                }}>
                  { galleryImages.length != 0 ? 
                    galleryImages.map(image => (
                    <img key={image} src={`${baseURL}/${image}`} style={{marginBottom: '10px', borderRadius: '1rem', width: "20vw"}}/>
                  )) : <img src={diplomaTemplate} style={{marginBottom: '10px', borderRadius: '1rem', width: "20vw"}}/>
                }
                </Box>
              </Box>
            </Box>
            <SwitchDetailsUniversity/>
            <Box className={styles.contentContainer}>
              <Box sx={{width: '100%'}}>
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
                        <Filter style={{marginRight: '10px',}}/>
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
                                  ReactGA.event({category: 'User', action: 'Search', label: searchQuery,});
                                }}
                              />
                            </InputAdornment>
                          }
                          onChange={(e) => {
                            const query = e.target.value;
                            setFilterAttributes({...filterAttributes, text: query});
                            setSearchQuery(query);
                          }}
                        />
                      </Box>
                      <Box>
                      </Box>
    
                    </Box>
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
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                      <Typography
                        fontSize="14px"
                        mb='.5rem' sx={{color: '#818181'}}
                        className={styles.mobText}
                      >{localization[lang].Students.fullname}
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      '@media (max-width: 768px)': {display: 'none',}
                    }}>
                      <Typography
                        fontSize="14px"
                        mb='.5rem' sx={{color: '#818181'}}
                        className={styles.mobText}
                      >{localization[lang].Students.major}
                      </Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      '@media (max-width: 768px)': {display: 'none',}
                    }}>
                      <Typography
                        fontSize="14px"
                        mb='.5rem' sx={{color: '#818181'}}
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
                        mb='.5rem' sx={{color: '#818181'}}
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
                      '@media (max-width: 768px)': {width: '100%',},
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
                            '@media (max-width: 768px)': {gridTemplateColumns: '12fr 1fr 0fr'}
                          }}
                        >
                          <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            '@media (max-width: 768px)': {flexDirection: 'column'}
                          }}>
                            <Typography
                              fontSize="20px"
                              fontWeight="600"
                              mb='.5rem'
                              className={styles.mobText}
                              sx={{width: '50%', '@media (max-width: 768px)': {width: '100%'}}}
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
                            '@media (max-width: 768px)': {display: 'none',}
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
          {isDataAlert ?
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
            (<></>)}
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
        </Box>
    );
};