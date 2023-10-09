import React from 'react';
import { Box, Card, CardMedia, Typography, useMediaQuery, CardContent } from '@mui/material';
import { Button, Label } from '@src/components';
import { ReactComponent as ExpandMore } from '@src/assets/icons/expand_more.svg';
import { ReactComponent as DownloadIcon } from '@src/assets/icons/download.svg';
import { ReactComponent as ShareIcon } from '@src/assets/icons/share.svg';
import star from "./../../assets/icons/Star1.svg";
import dots from "./../../assets/icons/Dots.svg";
import { useNavigate } from "react-router-dom";
import { SwitchDetails } from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";
import styles from './StudentPage.module.css';
import userImg from "@src/assets/dashboard/Image.jpg";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";
import cn from "classnames";

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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FAFBFF' }}>
			<Box display='flex' flexWrap='wrap'>

				<Box ml={'2rem'} width={"100%"}>
                <Box display='flex' flexDirection='column' sx={{ backgroundColor: 'white', borderRadius: '15px', }}>
						<Box px="2rem">
							<Box
								display="flex"
								alignItems="center"
                                margin="1rem"
								sx={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '100%',
									alignItems: 'center',
								}}
							>
                                <CardMedia
                                    component="img"
                                    image={userImg}
                                    className={cn(styles.img)}
                                    sx={{ width: '25%', height: '25%' }}
                                />
                                <Box
                                    alignItems="center"
                                    sx={{
                                        width: '100%',
                                        alignItems: 'center',
                                        margin: "2rem"
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography
                                            className={styles.nameText}
                                            fontWeight='600'
                                            sx={{
                                                paddingBottom: '14px',
                                                fontSize: '24px',
                                            }}
                                        >
                                            Сериков Сырым Сержанулы
                                        </Typography>
                                        <Box marginBottom="15px">
                                            <img src={star} style={{marginRight: '15px'}}/>
                                            <img src={dots} style={{marginRight: '10px'}}/>
                                        </Box>
                                    </Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                            flexDirection: 'row',
                                            ustifyContent: 'space-between',
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Label label="Название вуза: "/>
                                            <Label label="Cпециальность: "/>
                                            <Label label="Степень: "/>
                                            <Label label="Год окончания: "/>
                                        </Box>
                                        <Box marginLeft="1rem" >
                                            <Typography
                                                className={styles.nameText}
                                                fontWeight='500'
                                                mb='3px'
                                                sx={{fontSize: '0.875em',}}
                                            >
                                                Казахстанско-Британский Технический Университет
                                            </Typography>
                                            <Typography
                                                className={styles.nameText}
                                                fontWeight='500'
                                                mb='3px'
                                                sx={{fontSize: '0.875em',}}
                                            >
                                                «6B07201 Нефтегазовое дело»
                                            </Typography>
                                            <Typography
                                                className={styles.nameText}
                                                fontWeight='500'
                                                mb='3px'
                                                sx={{fontSize: '0.875em',}}
                                            >
                                                Бакалавр
                                            </Typography>
                                            <Typography
                                                className={styles.nameText}
                                                fontWeight='500'
                                                mb='3px'
                                                sx={{fontSize: '0.875em',}}
                                            >
                                                28.08.2023
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/*<Button */}
                                    {/*    buttonSize="s" */}
                                    {/*    variant="contained" */}
                                    {/*    type="button" */}
                                    {/*    sx={{*/}
                                    {/*        borderRadius: '25px',*/}
                                    {/*        marginTop: '1rem',*/}
                                    {/*    }}>*/}
                                    {/*    Отправить приглашение*/}
                                    {/*</Button>*/}
                                </Box>
							</Box>
                            <Box margin="2rem">
								<Box sx={{ fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px' }} > О выпускнике </Box>
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
                            <Box margin="2rem">
                                <Box sx={{ fontSize: '24px', fontWeight: '600', color: '#4D4D4D', paddingBottom: '10px' }} > Дипломы и сертификаты </Box>
                                <Card
							        onClick={() => handleCardClick(1)}
							        sx={{
                                        display: 'flex',
                                        width: "32%", flexDirection: 'column', alignItems: 'center',
                                        cursor: "pointer",
                                        borderRadius: "10px",
                                        marginBottom: "1.5rem"}}
                                >
                                    <CardMedia
								    component="img"
								    className={styles.diplomaImg}
								    sx={{ width: "100%", }}
								    image={diplomaTemplate}
								    alt="University Image"/>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                                        <CardContent
                                            sx={{ flex: '1', display: "flex", flexDirection: "row", width: "100%", justifyContent:"space-between"}}>
                                            <ShareIcon className={styles.iconMobile} />
                                            <DownloadIcon className={styles.iconMobile} />
                                        </CardContent>
                                    </Box>
						        </Card>
                            </Box>
                            <Box margin="1rem">
                                <SwitchDetails />
                            </Box>
                            <Box margin="2rem"></Box>
						</Box>
					</Box>
                </Box>
            </Box>
        </Box>
    )
};