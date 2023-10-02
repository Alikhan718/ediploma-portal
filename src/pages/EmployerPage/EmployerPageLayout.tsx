import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Typography, Pagination, useMediaQuery, CardContent } from '@mui/material';
import { Button, Label, Input } from '@src/components';
import styles from './EmployerPage.module.css';
import { ReactComponent as SmartContractIcon } from '@src/assets/icons/smartContract_black.svg';
import { ReactComponent as WebIcon } from '@src/assets/icons/web_black.svg';
import { ReactComponent as DiscordIcon } from '@src/assets/icons/discord_black.svg';
import { ReactComponent as TwitterIcon } from '@src/assets/icons/twitter_black.svg';
import { ReactComponent as Filter } from '@src/assets/icons/Tuning 2.svg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomas } from "@src/store/diplomas/actionCreators";
import { selectDiplomaList } from "@src/store/diplomas/selectors";
import { AnalyticsCard } from '@src/pages/UnivesrityDetailsPage/components/AnalyticsCard';
import { FacultyGraph } from '@src/pages/UnivesrityDetailsPage/components/FacultyGraph';
import { AnalyticsGraph } from '@src/pages/UnivesrityDetailsPage/components/AnalyticsGraph';
import { CitiesGraph } from '@src/pages/UnivesrityDetailsPage/components/CitiesGraph';
import { GenderGraph } from '@src/pages/UnivesrityDetailsPage/components/GenderGraph';
import { CitiesGrantsGraph } from '@src/pages/UnivesrityDetailsPage/components/CitiesGrantsGraph';
import { GrantsGraph } from '@src/pages/UnivesrityDetailsPage/components/GrantsGraph';
import univ from './../../assets/icons/FilterUn.svg';
import star from "./../../assets/icons/Star1.svg";
import share from "./../../assets/icons/share.svg";
import dots from "./../../assets/icons/Dots.svg";
import employreImg from "@src/assets/dashboard/employerImg.png";
import placeholdereImg from "@src/assets/dashboard/Image.jpg";
import cn from "classnames";
import icon from "@src/assets/icons/Logo (2).svg";

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

export const EmployerPageLayout: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const diplomaList = useSelector(selectDiplomaList);
    const diplomasPerPage = 10;
    const startIndex = (currentPage - 1) * diplomasPerPage;
	const endIndex = startIndex + diplomasPerPage;
    const totalDiplomas = diplomaList.length;
	const totalPages = Math.ceil(totalDiplomas / diplomasPerPage);
    const currentDiplomaPage = diplomaList.slice(startIndex, endIndex);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
		dispatch(fetchDiplomas());
	}, []);

    const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	}

    const [value, setValue] = React.useState(0);

    const nextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

    return(
        <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FAFBFF' }}>
			<Box display='flex' flexWrap='wrap'>

				<Box display="flex" justifyContent="space-between" ml={'2rem'} width={"100%"}>

                    <Box display='flex' flexDirection='column' margin="1rem" sx={{ backgroundColor: 'white', borderRadius: '15px', }}>
                        <Box px="2rem">
                            <Box sx={{
                                backgroundColor: '#3B82F6',
                                width: '450px',
                                height: '144px',
                                borderRadius: '20px',
                                marginBoottom: '10px',
                                marginTop: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent:'flex-start',
                                alignItems: 'center',
                                backgroundImage: `url(${employreImg})`,
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center center',
                                }}>
                                <img src={icon} style={{marginTop: "100px"}}/>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="center" margin="2rem">
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    margin: '1rem'}}>
                                <Typography
                                    className={styles.nameText}
                                    fontWeight='600'
                                    sx={{
                                        fontSize: '20px'
                                    }}>
                                    Ф.И. Работодателя
                                </Typography>
                                <Label label="Должность"/>
                                <Box display="flex" justifyContent="center" margin="1rem">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            marginX: '0.5rem'}}>
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                fontSize: '20px'
                                            }}>
                                            25
                                        </Typography>
                                        <Label label="Кол-во филлиалов"/>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            marginX: '0.5rem'}}>
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                fontSize: '20px'
                                            }}>
                                            12
                                        </Typography>
                                        <Label label="Открытых ваканскии"/>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            marginX: '0.5rem'}}>
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                fontSize: '20px'
                                            }}>
                                            124
                                        </Typography>
                                        <Label label="Нанято сотрудников"/>
                                    </Box>
                                </Box>
                             </Box>
                        </Box>
                    </Box>

                    <Box display='flex' flexDirection='column' margin="1rem" sx={{ backgroundColor: 'white', borderRadius: '15px', }}>
                        <Box margin="1rem" px="2rem">
                            <Box display="flex" justifyContent="space-between">
                                <Box sx={{ fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px' }} > Оcновная информация </Box>
                                <Box marginBottom="15px">
                                        <img src={star} style={{marginRight: '15px'}}/>
                                        <img src={share} style={{marginRight: '20px'}}/>
                                        <img src={dots} style={{marginRight: '10px'}}/>
                                </Box>
                            </Box>
                            <Box marginTop="0.5rem" marginBottom="0.5rem" display="flex" alignItems="center">
									<Box marginRight="25px"><DiscordIcon /></Box>
									<Box marginRight="25px"><TwitterIcon /></Box>
									<Box marginRight="25px"><SmartContractIcon /></Box>
									<Box marginRight="25px"><WebIcon /></Box>
							</Box>
							<Typography 
                                className={styles.textSm} 
                                color="#818181"
                                sx={{ fontSize: '14px' }}>
								eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов. Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы проверки и подтверждения квалификации выпускников.
							</Typography>
                        </Box>
                        <Box display="flex" margin="0.5rem" px="2rem">
                            <CardMedia
                                component="img"
                                image={employreImg}
                                className={cn(styles.img)}
                                sx={{ width: '25%', height: '80%', margin: "0.5rem"}}
                            />
                            <CardMedia
                                component="img"
                                image={employreImg}
                                className={cn(styles.img)}
                                sx={{ width: '30%', height: '80%', margin: "0.5rem"}}
                            />
                            <CardMedia
                                component="img"
                                image={employreImg}
                                className={cn(styles.img)}
                                sx={{ width: '30%', height: '80%', margin: "0.5rem"}}
                            />
                            <CardMedia
                                component="img"
                                image={placeholdereImg}
                                className={cn(styles.imgPlaceholder)}
                                sx={{ width: '15%', height: '80%', margin: "0.5rem"}}
                            />
                        </Box>
                    </Box>
                </Box>


                <Box className={styles.contentContainer}>
						<Box sx={{ marginLeft: "3rem", width: '95%' }}>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="start"
								sx={{ backgroundColor: 'white', borderRadius: '15px'}}
								className={styles.diplomasContainer}
							>
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
										display: 'flex',
										justifyContent: 'space-between',
										flexDirection: 'row',
										alignItems: 'center',
										width: '100%',
										marginBottom: "2rem"
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
    )
};