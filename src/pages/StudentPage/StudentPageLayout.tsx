import React from 'react';
import { Box, Card, CardMedia, Typography, useMediaQuery, Divider, CardContent, Menu, MenuItem } from '@mui/material';
import { Button, Label } from '@src/components';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import { ReactComponent as DownloadIcon } from '@src/assets/icons/download.svg';
import { ReactComponent as ShareIcon } from '@src/assets/icons/share.svg';
import star from "./../../assets/icons/Star1.svg";
import dots from "./../../assets/icons/Dots.svg";
import pen from "./../../assets/icons/penSquare.svg";
import { ReactComponent as Eye } from "@src/assets/icons/eye.svg";
import { ReactComponent as Star } from "@src/assets/icons/star.svg";
import { ReactComponent as Check } from "@src/assets/icons/checkss.svg";
import { useNavigate } from "react-router-dom";
import { SwitchDetails } from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";
import styles from './StudentPage.module.css';
import userImg from "@src/assets/dashboard/Image.jpg";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";
import cn from "classnames";
import { routes } from "@src/shared/routes";

export const StudentPageLayout: React.FC = () => {
	const [showFull, setShowFull] = React.useState(false);
	const navigate = useNavigate();

	const handleText = (text: string): string => {
		const matchesSm = useMediaQuery('(max-width:768px)');
		const trimLimit = matchesSm ? 85 : 115;
		return showFull ? text : text.substring(0, trimLimit) + "...";
	};

	const handleCardClick = (counter: number) => {
		navigate(`/app/diploma/${counter}/details`);
	};
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const isMobile = useMediaQuery('(max-width:998px)');

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FAFBFF' }}>
			<Box display='flex' flexWrap='wrap'>

				<Box ml={'2rem'} width={"100%"} sx={{
					'@media (max-width: 778px)': {
						margin: '0.1rem'
					},
				}}>
					<Box display='flex' flexDirection='column' sx={{ backgroundColor: 'white', borderRadius: '15px', }}>
						<Box px="1rem" sx={{
							'@media (max-width: 778px)': {
								padding: '0'
							},
						}}>
							<Box
								display="flex"
								alignItems="center"
								margin="1rem"
								className={styles.contentLeftContainer}
							>
								<CardMedia
									component="img"
									image={userImg}
									className={cn(styles.img)}
									sx={{
										width: '25%', height: '25%', '@media (max-width: 778px)': {
											width: '85%', height: '65%', marginRight: '3rem'
										},
									}}
								/>
								<Box
									alignItems="center"
									sx={{
										width: '100%',
										alignItems: 'center',
										margin: "1rem",
										'@media (max-width: 778px)': {
											margin: '0.5rem',
										},

									}}
								>
									<Box display="flex" justifyContent="space-between">
										<Typography
											className={styles.nameText}
											fontWeight='600'
											sx={{
												paddingBottom: '14px',
												fontSize: '24px',
												'@media (max-width: 778px)': {
													fontSize: '22px',
												},
											}}
										>
											Сериков Сырым Сержанулы
										</Typography>
										<Box marginBottom="15px">
											<img src={star} style={{ marginRight: '5px' }} className={styles.desktopIcon} />
											<Button
												aria-controls="simple-menu"
												aria-haspopup="true"
												onClick={handleClick}
												className={styles.desktopIcon}
											>
												<img
													src={dots}
													style={{ marginRight: '1.4rem', marginBottom: '0.6rem' }}
													className={styles.desktopIcon}
												/>
											</Button>
											<Menu
												anchorEl={anchorEl}
												keepMounted
												open={Boolean(anchorEl)}
												onClose={handleClose}
											>
												<MenuItem onClick={() => {
													navigate(routes.main);
												}}>
													<Eye style={{ marginRight: '10px', verticalAlign: "center" }} />
													<Typography>Перейти на сайт</Typography>
												</MenuItem>
												<MenuItem onClick={handleClose}><Star style={{ marginRight: '10px', verticalAlign: "center" }} />
													<Typography>В Избранное</Typography></MenuItem>
												<MenuItem onClick={handleClose}><ShareIcon style={{ marginRight: '10px', verticalAlign: "center" }} />
													<Typography>Поделиться</Typography></MenuItem>
												<Divider style={{ margin: "0 1rem" }} />
												<MenuItem onClick={handleClose}><Check style={{ marginRight: '10px', verticalAlign: "center" }} />
													<Typography>Etherscan</Typography></MenuItem>
											</Menu>
											<img src={pen} style={{ marginLeft: '2rem', marginTop: '-4.5rem' }} className={styles.tabletIcon} />
										</Box>
									</Box>
									<Box
										display="flex"
										alignItems="center"
										sx={{
											flexDirection: 'row',
											ustifyContent: 'space-between',
											width: '110%',
											alignItems: 'center',
										}}
									>
										<Box display="flex" alignItems="center">
											<Box marginRight="1rem">
												<Box sx={{
													"@media (max-width: 998px)": {

														marginBottom: "18px",

													},
												}}>
													<Label label="Название вуза: " /></Box>
												<Label label="Cпециальность: " />
												<Label label="Степень: " />
												<Label label="Год окончания: " />
											</Box>
											<Box marginLeft="0.2rem">
												<Typography className={styles.textSm} fontWeight='500' mb='3px' sx={{ fontSize: '0.875em' }}>
													Казахстанско-Британский
													Технический Университет
												</Typography>
												<Typography className={styles.textSm} fontWeight='500' mb='3px' sx={{ fontSize: '0.875em' }}>
													«6B07201 Нефтегазовое дело»
												</Typography>
												<Typography className={styles.textSm} fontWeight='500' mb='3px' sx={{ fontSize: '0.875em' }}>
													Бакалавр
												</Typography>
												<Typography className={styles.nameText} fontWeight='500' mb='3px' sx={{ fontSize: '0.875em' }}>
													28.08.2023
												</Typography>
											</Box>
										</Box>
									</Box>

									<Button
										buttonSize="s"
										variant="contained"
										type="button"
										sx={{
											borderRadius: '25px',
											marginTop: '1rem',
										}}>
										Отправить приглашение
									</Button>
								</Box>
							</Box>
							<Box margin="1rem" sx={{
								marginTop: '1.5rem',
								'@media (max-width: 778px)': {
									margin: '0.9rem',
								},
							}}>
								<Box sx={{ fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px' }} > О выпускнике </Box>
								<Typography className={styles.textMd} color="#818181">
									{handleText("eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что позволяет исключить возможность подделки документов. Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы проверки и подтверждения квалификации выпускников.")}
								</Typography>
								<Typography style={{ cursor: "pointer" }} className={styles.textMd} fontWeight='600' color='#629BF8' sx={{ paddingBottom: '20px' }}
									onClick={() => {
										setShowFull(!showFull);
									}}>
									Показать {!showFull ? "больше" : " меньше"}
									<ExpandMore style={{ marginLeft: ".2rem", transform: showFull ? "rotate(180deg)" : "" }} />
								</Typography>
							</Box>
							<Box margin="1rem" sx={{
								'@media (max-width: 778px)': {
									margin: '0.9rem',
									marginTop: '1.5rem'
								},
							}}>
								<Box sx={{
									fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px',
									'@media (max-width: 778px)': {
										fontSize: '20px', marginTop: '-2rem'
									},
								}} > Дипломы и сертификаты </Box>
								<Card
									onClick={() => handleCardClick(1)}
									sx={{
										display: 'flex',
										width: "32%", flexDirection: 'column', alignItems: 'center',
										cursor: "pointer",
										borderRadius: "10px",
										marginBottom: "1.5rem",
										'@media (max-width: 778px)': {
											width: '100%'
										},
									}}
								>
									<CardMedia
										component="img"
										className={styles.diplomaImg}
										sx={{ width: "100%", }}
										image={diplomaTemplate}
										alt="University Image" />
									<Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
										<CardContent
											sx={{ flex: '1', display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
											<ShareIcon className={styles.iconMobile} />
											<DownloadIcon className={styles.iconMobile} />

										</CardContent>
									</Box>
								</Card>
							</Box>
							<Box margin="1rem" sx={{
								'@media (max-width: 778px)': {
									margin: '0.9rem',
								},
							}}>
								<SwitchDetails />
							</Box>
							<Box margin="2rem"></Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box >
	)
};