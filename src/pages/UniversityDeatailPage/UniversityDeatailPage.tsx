import React, { useEffect, useState } from 'react';
import {
	Box, Button, Rating, Typography, useMediaQuery, Pagination,
	InputAdornment, Grid, Container
} from '@mui/material';
import { ReactComponent as HeaderSearchIcon } from '@src/assets/icons/search.svg';
import { ReactComponent as SmartContractIcon } from '@src/assets/icons/smartContract_black.svg';
import { ReactComponent as WebIcon } from '@src/assets/icons/web_black.svg';
import { ReactComponent as DiscordIcon } from '@src/assets/icons/discord_black.svg';
import { ReactComponent as TwitterIcon } from '@src/assets/icons/twitter_black.svg';
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import { SwitchDetailsUniversity } from '../UniversityProfile/components/SwitchDetailsunivesiyt';
import univ from './../../assets/icons/FilterUn.svg';
import { Input } from './../../components';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import styles from "./UniversityDeatailPage.module.css";
import { UniversityDeatailsHeader } from "@src/pages/UniversityDeatailPage/components/UniversityDeatailsHeader";
import star from "./../../assets/icons/Star1.svg";
import share from "./../../assets/icons/share.svg";
import dots from "./../../assets/icons/Dots.svg";
import { useNavigate } from "react-router-dom";
import { handleLink } from "@src/utils/link";
import imageU from "@src/assets/example/universityKBTU.jpg"
import { selectDiplomaList } from "@src/store/diplomas/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomas } from "@src/store/diplomas/actionCreators";
import cn from "classnames";
import { selectUserRole } from '@src/store/auth/selector';
import StarIcon from '@mui/icons-material/Star';
import { selectLanguage } from "@src/store/generals/selectors";
import { localization } from '@src/pages/UnivesrityDetailsPage/generator';

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
export const UniversityDeatailPage: React.FC = () => {
	const lang = useSelector(selectLanguage);

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
	const defaultS = 3.5;
	const copyCurrentURLToClipboard = () => {
		const currentURL = window.location.href;
		const textArea = document.createElement('textarea');
		textArea.value = currentURL;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
	};
	return (
		<Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer} pt='2rem'>
			<Box display='flex' flexWrap='wrap' justifyContent="center" className={styles.mainContainer}>

				<Box className={styles.upperContainer}>
					<Box display='flex' flexDirection='row'>

						<Box display='flex' flexDirection='column' sx={{ borderRadius: '15px', }}>
							<UniversityDeatailsHeader />
							<Box >
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
										{localization[lang].MainCard.uniNames}								</Typography>
									<Box marginBottom="25px" sx={{ flexDirection: 'row', justifyContent: 'space-between', '@media (max-width: 768px)': { display: 'none' } }}>
										<img src={star} style={{
											marginRight: '10px',
											marginLeft: '10px',
											width: '25px',
											height: '25px',
										}} />
										<img src={share} style={{
											marginRight: '10px',
											marginLeft: '10px',
											width: '25px',
											height: '25px',
										}} onClick={copyCurrentURLToClipboard} />
										<img src={dots} style={{
											marginRight: '10px',
											marginLeft: '10px',
											width: '25px',
											height: '25px',
										}} />
									</Box>
									<Box sx={{ position: 'absolute', top: 0, right: 0, display: 'none', justifyContent: 'space-between', '@media (max-width: 768px)': { display: 'flex' } }}>
										<img src={dots} style={{
											width: '15px',
											height: '15px',
											transform: 'rotate(90deg)'
										}} />
									</Box>
								</Box>

								<Box sx={{ display: 'none', marginBottom: '1rem', flexDirection: 'column', '@media (max-width: 768px)': { display: 'flex ' } }}>
									<Typography className={styles.textSm} sx={{ display: 'flex', alignItems: 'center', }}>
										4.5 <Rating
											name="text-feedback"
											value={defaultS}
											readOnly
											emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
										/> (25 отзывов)
									</Typography>
									<Typography className={styles.textSm} fontWeight='600' ml='.5rem'></Typography>
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
										{localization[lang].MainCard.mail}: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>info@satbayev.university</span>
									</Typography>

									<Typography className={styles.textSm} sx={{ display: 'flex', alignItems: 'center', '@media (max-width: 768px)': { display: 'none' } }}>
										4.5 <Rating
											name="text-feedback"
											value={defaultS}
											readOnly
											emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
										/> (25 отзывов)
									</Typography>
								</Box>

								<Box display='flex' flexDirection='column'>
									<Typography className={styles.textSm}>
										{localization[lang].MainCard.phone}: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>8 (7273) 57 42 51</span>
									</Typography>
									<Typography className={styles.textSm} fontWeight='600' ml='.5rem'></Typography>
								</Box>
								<Box className={styles.contentContainer}>
									<Box className={cn(styles.mobMt1, styles.mobWrap)} display='flex' sx={{ paddingBottom: '20px' }}>
										<Box flex='1' sx={{ marginRight: '50px', '@media (max-width: 768px)': { marginRight: '5px' } }}>
											<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'} sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>15256</Typography>
											<Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
												{localization[lang].MainCard.numStudents}
											</Typography>
										</Box>
										<Box flex='1' sx={{ marginRight: '50px', '@media (max-width: 768px)': { marginRight: '10px' } }}>
											<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'} sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>12450</Typography>
											<Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
												{localization[lang].MainCard.numAlumnies}
											</Typography>
										</Box>
										<Box flex='1' sx={{ marginRight: '50px', '@media (max-width: 768px)': { marginRight: '5px' } }}>
											<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'} sx={{ '@media (max-width: 768px)': { fontSize: '20px' } }}>8045</Typography>
											<Typography sx={{ '@media (max-width: 768px)': { fontSize: '15px' } }}>
												{localization[lang].MainCard.numExtra}											</Typography>
										</Box>
										<Box flex='5' sx={{
											'@media (max-width: 768px)': {
												display: 'none',
											}
										}}>

											<Typography fontWeight='1000' color='#353840' ml='.1rem' fontSize={'30px'}>2.8</Typography>
											<Typography className={styles.textSm}>
												{localization[lang].MainCard.gpa}
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
									<Box>
										<Box sx={{ fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px' }} > {localization[lang].MainCard.mainInfo} </Box>
										<Typography className={styles.textSm} color="#818181">
											{handleText(localization[lang].MainCard.info2)}
										</Typography>
										<Typography style={{ cursor: "pointer" }} className={styles.textSm} fontWeight='600' color='#629BF8' sx={{ paddingBottom: '20px' }}
											onClick={() => {
												setShowFull(!showFull);
											}}>
											{localization[lang].MainCard.show} {!showFull ? localization[lang].MainCard.more : localization[lang].MainCard.less}
											<ExpandMore style={{ marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : "" }} />
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
							<img src={imageU} style={{ marginBottom: '10px', borderRadius: '1rem' }} />
							<img src={imageU} style={{ marginBottom: '10px', borderRadius: '1rem' }} />
							<img src={imageU} style={{ marginBottom: '10px', borderRadius: '1rem' }} />
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
								display: 'flex', flexDirection: 'row',
								marginTop: '1rem', marginBottom: '2rem', justifyContent: 'space-between', width: '100%', alignItems: 'center',
							}}>
								<Box display="flex" alignItems="center"  >
									<Button variant="outlined" sx={{
										borderRadius: '20px', padding: '5px',
										width: '150px', color: '#3B82F6', marginLeft: '20px', marginRight: '15px'
									}}>
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
													<HeaderSearchIcon />
												</InputAdornment>
											}
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
												2023
											</Box>

											<Box
												sx={{
													display: 'flex',
													marginX: '1rem',
													flexDirection: 'column'
												}} // Adjust spacing as needed
											>
												<Typography fontSize="0.875rem">
													3.0
												</Typography>
											</Box>
											{/*<Box sx={{marginLeft: 'auto', marginRight: "3rem"}}>*/}
											{/*    <TwitterIcon/>*/}
											{/*</Box>*/}
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
		</Box>
	);
};