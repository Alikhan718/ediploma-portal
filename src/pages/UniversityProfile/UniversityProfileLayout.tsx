import React, { useEffect, useState } from 'react';
import {
  Box, Typography, useMediaQuery, Pagination, Alert
} from '@mui/material';
import ReactGA from "react-ga";
import { ReactComponent as HeaderSearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as SmartContractIcon } from '@src/assets/icons/smartContract_black.svg';
import { ReactComponent as DiscordIcon } from '@src/assets/icons/discord_black.svg';
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import { SwitchDetailsUniversity } from './components/SwitchDetailsunivesiyt';
import { Input, Button } from './../../components';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import { ReactComponent as Web } from '@src/assets/icons/web_black.svg';
import { ReactComponent as Instagram } from '@src/assets/icons/instragram.svg';
import { ReactComponent as Telegram } from '@src/assets/icons/telegram.svg';
import { ReactComponent as Linkedin } from '@src/assets/icons/linkedin.svg';
import { ReactComponent as Facebook } from '@src/assets/icons/facebook.svg';
import { ReactComponent as Youtube } from '@src/assets/icons/youtube.svg';
import styles from "./UniversityProfile.module.css";
import { UniversityProfileHeader } from "@src/pages/UniversityProfile/components/UniversityProfileHeader";
import star from "./../../assets/icons/Star1.svg";
import share from "./../../assets/icons/share.svg";
import dots from "./../../assets/icons/Dots.svg";
import { useNavigate } from "react-router-dom";
import { handleLink } from "@src/utils/link";
import imageU from "@src/assets/example/universityKBTU.jpg";
import { selectDiplomaList, selectSearchText } from "@src/store/diplomas/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomas, fetchSearch, cancelFilters } from "@src/store/diplomas/actionCreators";
import cn from "classnames";
import { selectUserRole, selectUserState } from '@src/store/auth/selector';
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/pages/UnivesrityDetailsPage/generator';
import { fetchUserProfile } from "@src/store/auth/actionCreators";
import { Simulate } from "react-dom/test-utils";
import keyUp = Simulate.keyUp;
import { FilterSection } from "@src/layout/Filter/FilterSection";
import { FilterAttributes } from "@src/layout/Header/Header";


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


export const UniversityProfileLayout: React.FC = () => {

  const lang = useSelector(selectLanguage);
  const [showFull, setShowFull] = React.useState(false);
  const [page, setPage] = useState(0);
  const diplomaList = useSelector(selectDiplomaList);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataAlert, setIsDataAlert] = React.useState(false);

  const diplomasPerPage = 10;
  const totalDiplomas = diplomaList.length;
  const totalPages = Math.ceil(totalDiplomas / diplomasPerPage);

  const startIndex = (currentPage - 1) * diplomasPerPage;
  const endIndex = startIndex + diplomasPerPage;
  const currentDiplomaPage = diplomaList.slice(startIndex, endIndex);

  const searchText = useSelector(selectSearchText);
  const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
    text: searchText,
    specialities: '',
    region: '',
    degree: '',
    year: 0,
    gpaL: 0,
    gpaR: 0,
    university_id: 0,
    ratingL: 0,
    ratingR: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const userState = useSelector(selectUserState);

  const [showFilter, setShowFilter] = React.useState(false);

  const triggerSearchFilters = (filterAttributesNew: any) => {
    dispatch(fetchSearch(filterAttributesNew));
    // ReactGA.event({
    //   category: 'User',
    //   action: 'Search',
    //   label: searchQuery,
    // });
  };

  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  React.useEffect(() => {
    if (userState && userState.gallery) {
      let images = JSON.parse(userState.gallery);
      setGalleryImages(images);
    }
  }, [userState]);

  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, [!userState]);
  //fetch user Profile

  useEffect(() => {
    dispatch(fetchDiplomas());
    console.log(diplomaList);
    console.log(userState);
  }, [!totalDiplomas]);
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const handleText = (text: string): string => {
    const matchesSm = useMediaQuery('(max-width:768px)');
    const trimLimit = matchesSm ? 85 : 115;
    return showFull ? text : text.substring(0, trimLimit) + "...";
  };

  const [value, setValue] = React.useState(0);


  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [links, setLinks] = React.useState<any[]>([]);
  React.useEffect(() => {
    let temp: any[] = [];
    for (let key in userState) {

      let value = userState[key];
      if (key.includes('link') && value) {
        temp.push({ name: key, value: value });
      }
    }
    setLinks(temp);
  }, [userState, !links]);
  const getIconForLink = (name: any, link: any): React.ReactNode => {
    const onClick = () => {
      handleLink(link);
    };
    if (name.includes('linkedin')) {
      return <Linkedin className={styles.social} onClick={onClick} />;
    }
    if (name.includes('facebook')) {
      return <Facebook className={styles.social} onClick={onClick} />;
    }
    if (name.includes('instagram')) {
      return <Instagram className={styles.social} onClick={onClick} />;
    }
    if (name.includes('telegram')) {
      return <Telegram className={styles.social} onClick={onClick} />;
    }
    if (name.includes('youtube')) {
      return <Youtube className={styles.social} onClick={onClick} />;
    }
    if (name.includes('discord')) {
      return <DiscordIcon className={styles.social} onClick={onClick} />;
    }
    return <Web className={styles.social} onClick={onClick} />;
  };

  useEffect(() => {
    dispatch(cancelFilters());
  }, []);

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

  const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem'>
      <Box display='flex' flexWrap='wrap' justifyContent="center"
        className={styles.mainContainer}>
        <Box className={styles.upperContainer} sx={{ borderRadius: '16px', backgroundColor: "white", marginBottom: '2rem' }}>
          <Box display='flex' flexDirection='row'>

            <Box display='flex' flexDirection='column' sx={{ borderRadius: '15px', }}>
              <UniversityProfileHeader image={userState.banner ? `${baseURL}/${userState.banner}` : ''} />
              <Box px="3%">
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    '@media (max-width: 768px)': {
                      position: 'relative',
                      width: '90%'
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
                    {userState.name ?? ''}
                  </Typography>
                  <Box marginBottom="25px" sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    '@media (max-width: 768px)': { display: 'none' }
                  }}>
                    {/* <img src={star} style={{
                      marginRight: '10px',
                      marginLeft: '10px',
                      width: '25px',
                      height: '25px',
                    }}/> */}
                    <img src={share} style={{
                      marginRight: '10px',
                      marginLeft: '10px',
                      width: '25px',
                      height: '25px', cursor: 'pointer'
                    }}
                      onClick={copyCurrentURLToClipboard}
                      alt="Share Icon" />
                    {/* <img src={dots} style={{
                      marginRight: '10px',
                      marginLeft: '10px',
                      width: '25px',
                      height: '25px',
                    }} onClick={handleClick}/> */}

                  </Box>
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    display: 'none',
                    justifyContent: 'space-between',
                    '@media (max-width: 768px)': { display: 'flex' }
                  }}>
                    <img src={dots} style={{
                      marginRight: '10px',
                      marginLeft: '10px',
                      width: '25px',
                      height: '25px',
                    }} onClick={handleClick} />
                  </Box>
                </Box>
                <Box display='flex' flexDirection='column'>
                  <Typography className={styles.textSm}>
                    {localization[lang].MainCard.phone}: <span
                      style={{ fontWeight: 'bold', fontSize: '18px' }}>{userState.phone ?? ''}</span>
                  </Typography>
                  <Typography className={styles.textSm} fontWeight='600' ml='.5rem'></Typography>
                </Box>
                <Box className={styles.contentContainer}>
                  <Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex'
                    sx={{ paddingBottom: '20px' }}>
                    <Box flex='1' sx={{
                      marginRight: '50px',
                      '@media (max-width: 768px)': { marginRight: '5px' }
                    }}>
                      <Typography
                        fontWeight='1000'
                        color='#353840'
                        ml='.1rem'
                        fontSize={'30px'}
                        sx={{
                          '@media (max-width: 768px)': { fontSize: '20px' }
                        }}>
                        {userState.student_amount ?? ''}
                      </Typography>
                      <Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
                        {localization[lang].MainCard.numStudents}
                      </Typography>
                    </Box>
                    <Box flex='1' sx={{
                      marginRight: '50px',
                      '@media (max-width: 768px)': { marginRight: '10px' }
                    }}>
                      <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                        sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>{userState.student_amount ?? ''}</Typography>
                      <Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
                        {localization[lang].MainCard.numAlumnies}
                      </Typography>
                    </Box>
                    <Box flex='1' sx={{
                      marginRight: '50px',
                      '@media (max-width: 768px)': { marginRight: '5px' }
                    }}>
                      <Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}
                        sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>{userState.highlighting_amount ?? ''}</Typography>
                      <Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
                        {localization[lang].MainCard.numExtra}
                      </Typography>
                    </Box>
                    <Box flex='5' sx={{
                      '@media (max-width: 768px)': {
                        display: 'none',
                      }
                    }}>

                      <Typography fontWeight='1000' color='#353840' ml='.1rem'
                        fontSize={'30px'}>{userState.average_gpa ?? ''}</Typography>
                      <Typography className={styles.textSm}>
                        {localization[lang].MainCard.gpa}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center">
                    {/*<SmartContractIcon/>*/}
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
                      {handleText(userState.description ?? '')}
                    </Typography>
                    <Typography style={{ cursor: "pointer" }} className={styles.textSm}
                      fontWeight='600' color='#629BF8' sx={{ paddingBottom: '20px' }}
                      onClick={() => {
                        setShowFull(!showFull);
                      }}>
                      {localization[lang].MainCard.show} {!showFull ? localization[lang].MainCard.more : localization[lang].MainCard.less}
                      <ExpandMore style={{
                        marginLeft: ".2rem",
                        transform: showFull ? "rotate(180deg)" : ""
                      }} />
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
              {galleryImages.map(image => (
                <img key={image} src={`${baseURL}/${image}`} style={{ marginBottom: '10px', borderRadius: '1rem', width: "20vw" }} />
              ))}
            </Box>
          </Box>
        </Box>
        <SwitchDetailsUniversity />
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
                display: 'flex',
                flexDirection: 'row',
                marginTop: '1rem',
                marginBottom: '2rem',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
                <Box display="flex" alignItems="center">
                  <Button variant="outlined" sx={{
                    borderRadius: '20px', padding: '5px',
                    width: '150px', color: '#3B82F6', marginLeft: '20px', marginRight: '15px'
                  }} onClick={() => {
                    setShowFilter(true)
                  }}>
                    <Filter style={{ marginRight: '10px', }} />
                    {localization[lang].Students.filter}
                  </Button>
                  <Box display="flex" alignItems="center">
                    <Input
                      placeholder={localization[lang].Students.searchBar}
                      fullWidth
                      inputSize="m"
                      sx={{
                        paddingRight: 0,
                      }}
                      endAdornment={

                        <HeaderSearchIcon
                          style={{ width: '82px', marginLeft: '12px' }}
                          cursor="pointer"
                          onClick={() => {
                            triggerSearchFilters(filterAttributes);
                            ReactGA.event({
                              category: 'User',
                              action: 'Search',
                              label: searchQuery,
                            });
                          }}
                        />

                      }
                      onChange={(e) => {
                        const query = e.target.value;
                        setFilterAttributes({ ...filterAttributes, text: query });
                        setSearchQuery(query);
                      }}
                    />

                    {/* <Input
											type="text"
											name="email"
											placeholder={localization[lang].Students.searchBar}
											sx={{
												marginRight: '1rem', flex: '1',

											}}
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

													sx={{
														borderRadius: '48px',
														margin: '5px'
													}}
												>
													<HeaderSearchIcon className={styles.btnIcon} />
												</Button>
											}
										/> */}
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

                {currentDiplomaPage.filter((diploma: any) => diploma.university_id == userState.university_id).map((e: any) => (

                  <Box
                    key={e.id}
                    onClick={() => {
                      navigate(`/diploma/${e.id!}/1`);
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
                        }}
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
            left: '16rem',
          }}
          severity="success"
        >
          {localization[lang].Alerts.copied}
        </Alert>) :
        (<></>)}
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
{/* <TabPanel value={value} index={1}>
<Box display='flex' flexWrap={"wrap"} flexBasis={"2"} gap='1rem 1rem'>
	<Box sx={{
		display: 'flex',
		flexWrap: 'wrap',
		gap: "24px",
		marginBottom: '35px',
		'@media (max-width: 1335px)': {
			'& > div': {
				width: '48%'
			},
			justifyContent: 'space-between',
			marginRight: '2%'
		},
		'@media (max-width: 700px)': {
			'& > div': {
				width: '98%'
			},
			marginRight: 0
		},
	}}>

	</Box>
	<Box sx={{
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "start",
		marginBottom: "32px",
		'@media (max-width: 1335px)': {
			flexDirection: "column",
			gap: "32px"
		}
	}}>
		<Box sx={{
			flex: 3,
			display: "flex",
			gap: "32px",
			flexDirection: "column"
		}}>

		</Box>
		<Box sx={{
			flex: 1,
			display: "flex",
			gap: "32px",
			flexDirection: "column",
			'@media (max-width: 1335px)': {
				flexDirection: "row"
			},
			'@media (max-width: 700px)': {
				flexDirection: "column",
				width: "100%",
				'& > div': {
					maxWidth: "100%"
				}
			}
		}}>

		</Box>
	</Box>

</Box>
</TabPanel> */
}