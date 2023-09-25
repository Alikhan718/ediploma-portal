import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search-icon.svg';
import { Box, Card, CardContent, CardMedia, TextField, Button, Divider, MenuItem, Select, SelectChangeEvent, Typography, useMediaQuery, Pagination, Stack, PaginationItem } from '@mui/material';
import { ReactComponent as SmartContractIcon } from '@src/assets/icons/smartContract_black.svg';
import { ReactComponent as WebIcon } from '@src/assets/icons/web_black.svg';
import { ReactComponent as DiscordIcon } from '@src/assets/icons/discord_black.svg';
import { ReactComponent as TwitterIcon } from '@src/assets/icons/twitter_black.svg';
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import univ from './../../assets/icons/FilterUn.svg';
import { Input, Label } from './../../components';
import { ReactComponent as FavouriteIcon } from '@src/assets/icons/star_dark.svg';
import { ReactComponent as ShareIcon } from '@src/assets/icons/share_dark.svg';
import { ReactComponent as MoreIcon } from '@src/assets/icons/more_horiz_dark.svg';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import styles from "./UniversityDetailsPage.module.css";
import { UniversityDetailsPageHeader } from "@src/pages/UnivesrityDetailsPage/components/UniversityDetailsPageHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import star from "./../../assets/icons/Star1.svg";
import share from "./../../assets/icons/Share.svg";
import dots from "./../../assets/icons/Dots.svg";
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

import Rating from '@mui/material/Rating';

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
export const UniversityDetailsPageLayout: React.FC = () => {
	const [showFull, setShowFull] = React.useState(false);
	const [page, setPage] = useState(0);
	const diplomaList = useSelector(selectDiplomaList);
	const nextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};
	const [currentPage, setCurrentPage] = useState(1);

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
		<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FAFBFF' }}>
			{/*<Box sx={{ width: '300px' }}>Sidebar</Box>*/}
			<Box display='flex' flexWrap='wrap'>

				<Box ml={'2rem'} width={"95%"}>
					<Box display='flex' flexDirection='column' sx={{ backgroundColor: 'white', borderRadius: '15px', }}>
						<UniversityDetailsPageHeader />
						<Box sx={{ paddingLeft: '18px' }}>
							<Box
								display="flex"
								alignItems="center"
								sx={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '100%',
									alignItems: 'center',
								}}
							>
								<Typography
									className={styles.nameText}
									fontWeight='600'
									sx={{
										paddingBottom: '14px',
										fontSize: '34px',
										'@media (max-width: 998px)': {
											fontSize: '24px',

										},
										'@media (max-width: 768px)': {
											fontSize: '24px',
										},
									}}
								>
									Казахстанско-Британский Технический Университет
								</Typography>
								<Box marginBottom="15px">
									<img src={star} style={{
										marginRight: '15px',

									}} />
									<img src={share} style={{
										marginRight: '20px',

									}} />
									<img src={dots} style={{
										marginRight: '10px',
									}} />
								</Box>
							</Box>


							<Box display="flex"
								alignItems="center"
								sx={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '100%',
									alignItems: 'center',
								}}>
								<Typography className={styles.textSm} sx={{ paddingBottom: '16px', marginRight: '16px' }}>
									Почта: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>info@kbtu.kz</span>
								</Typography>

								{/* Star ratings */}
								<Typography className={styles.textSm} sx={{ display: 'flex', alignItems: 'center', }}>
									4.5 <Rating defaultValue={5} /> (25 отзывов)
								</Typography>
							</Box>

							<Box display='flex' flexDirection='column'>
								<Typography className={styles.textSm}>
									Номер телефона: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>8 (7273) 57 42 51</span>
								</Typography>
								<Typography className={styles.textSm} fontWeight='600' ml='.5rem'></Typography>
							</Box>
							<Box className={styles.contentContainer}>
								<Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex' sx={{ paddingBottom: '20px' }}>
									<Box flex='1' sx={{ marginRight: '50px' }}>
										<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>10256</Typography>
										<Typography >
											Кол-во студентов
										</Typography>
									</Box>
									<Box flex='1' sx={{ marginRight: '50px' }}>
										<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>12450</Typography>
										<Typography >
											Кол-во <br /> выпускников
										</Typography>
									</Box>
									<Box flex='1 ' sx={{ marginRight: '50px' }}>
										<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>8045</Typography>
										<Typography className={styles.textSm}>
											Количество<br /> с отличием
										</Typography>
									</Box>
									<Box flex='5' sx={{
										'@media (max-width: 768px)': {
											display: 'none', // Show on mobile screens (768px and below)
										}
									}}>

										<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>5.1</Typography>
										<Typography className={styles.textSm}>
											Средний GPA
										</Typography>
									</Box>
								</Box>
								<Box display="flex" alignItems="center">
									<Box marginRight="25px">
										<DiscordIcon />
									</Box>
									<Box marginRight="25px"><TwitterIcon /></Box>
									<Box marginRight="25px"><SmartContractIcon /></Box>
									<Box ><WebIcon className={styles.social} onClick={() => {
										handleLink("https://kbtu.edu.kz/ru/");
									}} /></Box>
								</Box>
								{/* */}

								<Box>
									<Box sx={{ fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px' }} > Основная Информация </Box>
									<Typography className={styles.textSm} color="#818181">
										{handleText("eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов. Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы проверки и подтверждения квалификации выпускников.")}
									</Typography>
									<Typography style={{ cursor: "pointer" }} className={styles.textSm} fontWeight='600' color='#629BF8' sx={{ paddingBottom: '20px' }}
										onClick={() => {
											setShowFull(!showFull);
										}}>
										Показать {!showFull ? "больше" : " меньше"}
										<ExpandMore style={{ marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : "" }} />
									</Typography>
								</Box>
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
							{/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
									<Tab label="Дипломы" {...a11yProps(0)} />
									<Tab label="Аналитика" disabled={userRole !== 'university admission'} {...a11yProps(1)} />
								</Tabs> 
							</Box> */}
							<Box display="flex"
								flexDirection="column"
								alignItems="start"
								sx={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', }}
								className={styles.diplomasContainer}>
								<Typography sx={{ fontWeight: '800', fontSize: '25px', padding: '20px' }}>Дипломы выпускников</Typography>
								<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '20px' }}>
									<Box display="flex" alignItems="center"  >
										<Button variant="outlined" sx={{ borderRadius: '20px', padding: '5px', width: '150px', color: '#3B82F6', marginLeft: '20px', marginRight: '15px' }}>
											<Filter style={{ marginRight: '10px', }} />
											Фильтр
										</Button>
										<Box display="flex" alignItems="center">

											<Input
												type="text"
												name="email"
												placeholder="Найти"
												sx={{ width: '200%', paddingLeft: '10px' }}
											/>
										</Box>
										<Box>
										</Box>

									</Box>
									<Box>	<img src={univ} style={{ marginRight: '15px' }} />
										<img src={univ} style={{ marginRight: '5px' }} /></Box>
								</Box>

							</Box>
							{/* <CardMedia
								component="img"
								className={styles.diplomaImg}
								sx={{ width: "50%", padding: "1.5rem" }}
								image={diplomaTemplate}
								alt="University Image"
							/> */}

							<TabPanel value={value} index={0}>
								<Box display="flex"
									flexDirection="row"
									width="100%"
									alignItems="start"
									sx={{
										borderRadius: '15px', padding: '10px', display: 'grid', gridTemplateColumns: '4fr 4fr 2fr 0fr 0fr', gap: '36px',
										paddingLeft: '20px'
									}}>
									<Box sx={{ display: 'flex', flexDirection: 'row' }}>
										<Typography
											fontSize="14px"
											mb='.5rem' sx={{ color: '#818181' }}
											className={styles.mobText}
										>Ф.И.О
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', flexDirection: 'row' }}>
										<Typography
											fontSize="14px"
											mb='.5rem' sx={{ color: '#818181' }}
											className={styles.mobText}
										>Специальность
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', flexDirection: 'row' }}>
										<Typography
											fontSize="14px"
											mb='.5rem' sx={{ color: '#818181' }}
											className={styles.mobText}
										>Год выпуска
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', flexDirection: 'row' }}>
										<Typography
											fontSize="14px"
											mb='.5rem' sx={{ color: '#818181' }}
											className={styles.mobText}
										>GPA
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', flexDirection: 'row' }}>
										<Typography
											fontSize="14px"
											mb='.5rem' sx={{ color: '#818181' }}
											className={styles.mobText}
										>Действие
										</Typography>
									</Box>
								</Box>

								<Box
									display="flex"
									flexDirection="column"
									width="100%"
									alignItems="start"
									sx={{
										backgroundColor: 'white', borderRadius: '15px', padding: '10px',
									}}
									className={styles.diplomasContainer}

								>

									{currentDiplomaPage.map((e: any) => (

										<Box
											key={e.counter}
											onClick={() => {
												navigate(`/app/diploma/${e.counter!}/details`);
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
													display: 'grid', gridTemplateColumns: '4fr 4fr 2fr 1fr 0fr', gap: '36px', marginTop: '20px',
													paddingLeft: '20px'
												}}
											>
												<Box sx={{ display: 'flex', flexDirection: 'column' }}>
													<Typography
														fontSize="20px"
														fontWeight="600"
														mb='.5rem'
														className={styles.mobText}
													>
														{e.name_ru}
													</Typography>
												</Box>

												<Box sx={{ display: 'flex', flexDirection: 'column' }}>
													<Typography fontSize="1rem" className={styles.mobTextSm}>
														{e.qualification_kz ? e.qualification_kz.substring(0, e.qualification_kz.search("»") + 1) : ""}
													</Typography>

												</Box>

												<Box sx={{ display: 'flex', flexDirection: 'column' }}>
													2023
												</Box>

												<Box
													sx={{ display: 'flex', flexDirection: 'column' }} // Adjust spacing as needed
												>
													<Typography fontSize="0.875rem">
														3.0
													</Typography>
												</Box>
												<TwitterIcon />
											</Box>
										</Box>
									))
									}

									<Box sx={{
										display: 'flex', justifyContent: 'space-between',
										flexDirection: 'row',
										alignItems: 'center', width: '100%'
									}}>
										<Button onClick={prevPage} disabled={currentPage === 1}>
											Previous Page
										</Button>
										<Box style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
											<Pagination
												count={totalPages}
												page={currentPage}
												onChange={(event, page) => setCurrentPage(page)}
												shape="rounded"
												color="primary"
												size="large"
											/>
										</Box>
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