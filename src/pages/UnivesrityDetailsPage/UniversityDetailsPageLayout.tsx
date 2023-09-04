import React, { useEffect, useState } from 'react';

import { Box, Card, CardContent, CardMedia, Button, Divider, MenuItem, Select, SelectChangeEvent, Typography, useMediaQuery } from '@mui/material';
import { ReactComponent as SmartContractIcon } from '@src/assets/icons/smartContract_black.svg';
import { ReactComponent as WebIcon } from '@src/assets/icons/web_black.svg';
import { ReactComponent as DiscordIcon } from '@src/assets/icons/discord_black.svg';
import { ReactComponent as TwitterIcon } from '@src/assets/icons/twitter_black.svg';
import { ReactComponent as FavouriteIcon } from '@src/assets/icons/star_dark.svg';
import { ReactComponent as ShareIcon } from '@src/assets/icons/share_dark.svg';
import { ReactComponent as MoreIcon } from '@src/assets/icons/more_horiz_dark.svg';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import styles from "./UniversityDetailsPage.module.css";
import { UniversityDetailsPageHeader } from "@src/pages/UnivesrityDetailsPage/components/UniversityDetailsPageHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavigateNext, NavigateBefore } from '@mui/icons-material';

import { useNavigate } from "react-router-dom";
import { handleLink } from "@src/utils/link";
import { selectDiplomaList } from "@src/store/diplomas/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomas } from "@src/store/diplomas/actionCreators";
import cn from "classnames";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";
import { AnalyticsCard } from './components/AnalyticsCard';
import { FacultyGraph } from './components/FacultyGraph';
import { AnalyticsGraph } from './components/AnalyticsGraph';
import { CitiesGraph } from './components/CitiesGraph';
import { GenderGraph } from './components/GenderGraph';
import { CitiesGrantsGraph } from './components/CitiesGrantsGraph';
import { GrantsGraph } from './components/GrantsGraph';
import { selectUserRole } from '@src/store/auth/selector';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}
const diplomasPerPage = 8;

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
				<Box pr={3} pt={2}>
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
	const [page, setPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	const diplomaList = useSelector(selectDiplomaList);
	const startIndex = (currentPage - 1) * diplomasPerPage;
	const endIndex = startIndex + diplomasPerPage;
	const currentDiplomaPage = diplomaList.slice(startIndex, endIndex);
	const nextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

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
		const trimLimit = matchesSm ? 45 : 115;
		return showFull ? text : text.substring(0, trimLimit) + "...";
	};

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	useEffect(() => {
		dispatch(fetchDiplomas());
	}, []);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#dddada' }}>
			{/*<Box sx={{ width: '300px' }}>Sidebar</Box>*/}
			<Box display='flex' flexWrap='wrap'>

				<Box ml={'2rem'} width={"100%"}>
					<Box width="100%" display='flex' flexDirection='column' sx={{ backgroundColor: 'white', borderRadius: '15px' }} className={styles.contentContainer}>
						<UniversityDetailsPageHeader />
						<Typography
							className={styles.nameText}
							fontSize='2rem'
							fontWeight='600'
						>
							Казахстанско-Британский Технический Университет
						</Typography>
						<Box display='flex' flexDirection='column'>
							<Typography className={styles.textSm}>
								Почта: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>info@kbtu.kz</span>
							</Typography>
						</Box>

						<Box display='flex' flexDirection='column'>
							<Typography className={styles.textSm}>
								Номер телефона: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>8 (7273) 57 42 51</span>
							</Typography>
							<Typography className={styles.textSm} fontWeight='600' ml='.5rem'></Typography>
						</Box>
						<Box className={styles.contentContainer}>
							<Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex'>
								<Box flex='1'>
									<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>73</Typography>
									<Typography >
										Специальностей
									</Typography>
								</Box>
								<Box flex='1' sx={{ marginRight: '0' }}>
									<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>2001</Typography>
									<Typography >
										Открыт
									</Typography>
								</Box>
								<Box flex='1'>
									<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>5279</Typography>
									<Typography className={styles.textSm}>
										Кол-во студентов
									</Typography>
								</Box>
								<Box flex='5'>

									<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>5.1</Typography>
									<Typography className={styles.textSm}>
										Средний GPA
									</Typography>
								</Box>
							</Box>
							<Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex'>
								<Box flex='0'>
									<SmartContractIcon className={styles.social} onClick={() => {
										handleLink("https://etherscan.io/address/0xbac7239d8c4313a00ae1bcde567c1d78bfac84d7");
									}} />
								</Box>
								<Box flex='1'><WebIcon className={styles.social} onClick={() => {
									handleLink("https://kbtu.edu.kz/ru/");
								}} /></Box>


							</Box>
							{/* */}

							<Box>
								<Typography className={styles.textSm} color="#353840">
									{handleText("eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов. Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы проверки и подтверждения квалификации выпускников.")}
								</Typography>
								<Typography style={{ cursor: "pointer" }} className={styles.textSm} fontWeight='600' color='gray'
									onClick={() => {
										setShowFull(!showFull);
									}}>
									Показать {!showFull ? "больше" : " меньше"}
									<ExpandMore style={{ marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : "" }} />
								</Typography>
							</Box>
						</Box>
					</Box>

					<Box className={styles.contentContainer}>

						{/* <Box display='flex' gap='3rem' className={styles.gap1} mt='1rem'>
								<Box display='flex' flexDirection='column'>
									<Typography fontSize='1.5rem' className={styles.textMd} fontWeight='600'>Top
										34%</Typography>
									<Typography fontSize='1rem' className={styles.textXs} color='#707A83'>Рейтинг <br />
										QS Asia 2023</Typography>
								</Box>
								<Box display='flex' flexDirection='column'>
									<Typography fontSize='1.5rem' className={styles.textMd} fontWeight='600'>9333</Typography>
									<Typography fontSize='1rem' className={styles.textXs} color='#707A83'>Количество <br />
										выпускников</Typography>
								</Box>
								<Box display='flex' flexDirection='column'>
									<Typography fontSize='1.5rem' className={styles.textMd} fontWeight='600'>769</Typography>
									<Typography fontSize='1rem' className={styles.textXs} color='#707A83'>Количество<br />
										с отличием</Typography>
								</Box>
							
							</Box> */}

						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								{/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
									<Tab label="Дипломы" {...a11yProps(0)} />
									<Tab label="Аналитика" disabled={userRole !== 'university admission'} {...a11yProps(1)} />
								</Tabs> */}
							</Box>
							<TabPanel value={value} index={0}>
								<Box display="flex"
									flexDirection="column"
									alignItems="start"
									sx={{ backgroundColor: 'white', borderRadius: '15px', padding: '10px', marginBottom: '20px' }}
									className={styles.diplomasContainer}>
									<Typography sx={{ fontWeight: '800', fontSize: '25px' }}>Дипломы выпускников</Typography>
								</Box>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="start"
									sx={{ backgroundColor: 'white', borderRadius: '15px', padding: '10px' }}
									className={styles.diplomasContainer}
								>
									{currentDiplomaPage.map((e: any) => (
										<Card
											key={e.counter}
											elevation={6}
											onClick={() => {
												navigate(`/app/diploma/${e.counter!}/details`);
											}}
											className={styles.diplomaItem}
											sx={{
												width: '100%',
												cursor: 'pointer',
												borderRadius: '10px',
												marginBottom: '1.5rem'
											}}
										>
											{/* <CardMedia
												component="img"
												className={styles.diplomaImg}
												sx={{ width: "13rem", padding: "1.5rem" }}
												image={diplomaTemplate}
												alt="University Image"
											/> */}
											<Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
												<CardContent
													sx={{
														flex: '1 0 auto',
														display: "flex",
														flexDirection: "column",
														width: "100%"
													}}>
													<Typography mb='.5rem' fontSize="1.25rem" className={styles.mobText}
														fontWeight="600">
														{e.name_ru}
													</Typography>
													<Typography mb='.5rem' fontSize="1rem" className={styles.mobTextSm}>
														{e.qualification_kz ? e.qualification_kz.substring(0, e.qualification_kz.search("»") + 1) : ""}
													</Typography>
													<Box display='flex' mt='auto' width='100%'>
														<Typography fontSize="0.875rem" mr='auto'>
															2023
														</Typography>
														{/* <Typography fontSize="0.875rem" ml='auto' mr='1rem'>
															{humanReadableToLocalTime(e.protocol_en, "/")}
														</Typography> */}
													</Box>
												</CardContent>
											</Box>
										</Card>
									))
									}
									<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<Button onClick={prevPage} disabled={currentPage === 1}>
											Previous Page
										</Button>
										<div style={{
											display: 'flex',
											gap: '10px',
											alignItems: 'center',
											flexWrap: 'wrap',
											justifyContent: 'center',
											flex: 1,
										}}>
											{Array.from({ length: Math.ceil(diplomaList.length / diplomasPerPage) }, (_, index) => {
												if (index < 6 || index >= Math.ceil(diplomaList.length / diplomasPerPage) - 5) {
													// Show the first 6 page numbers and the last 5 page numbers
													return (
														<Button
															key={index}
															onClick={() => setCurrentPage(index + 1)}
															variant={currentPage === index + 1 ? 'contained' : 'outlined'}
															color="primary"
														>
															{index + 1}
														</Button>
													);
												} else if (index === 6) {
													return <span key="ellipsis">...</span>;
												}
												return null;
											})}
										</div>
										<Button onClick={nextPage} disabled={currentDiplomaPage.length < diplomasPerPage}>
											Next Page
										</Button>
									</Box>
								</Box>


							</TabPanel>
							<TabPanel value={value} index={1}>
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
										<AnalyticsCard text="Количество выпускников" number={705} />
										<AnalyticsCard text="Выпускники бакалавриата" number={554} />
										<AnalyticsCard text="Выпускники магистратуры" number={151} />
										<AnalyticsCard text="Средний гпа" number={3.07} />
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
											<FacultyGraph />
											<AnalyticsGraph />
											<GenderGraph />
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
											<CitiesGraph />
											<CitiesGrantsGraph />
											<GrantsGraph />
										</Box>
									</Box>

								</Box>
							</TabPanel>
						</Box>

					</Box>


				</Box>
			</Box>
		</Box >
	);
};