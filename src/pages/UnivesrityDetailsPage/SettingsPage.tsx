import React, { useState, useRef, RefObject } from 'react';
import {
	Box, Container, Typography, FormControlLabel, FormControl, Switch, Select, MenuItem, InputLabel,
	FormHelperText, Grid
} from '@mui/material';
import { Button, Input, Label } from '@src/components';
import web from "@src/assets/icons/Website.svg";
import icon from "@src/assets/icons/Logo (2).svg";
import add from "@src/assets/icons/All.svg";
import { ReactComponent as PasswordIcon } from "@src/assets/icons/Password.svg";
import { ReactComponent as NotificatoinsIcon } from "@src/assets/icons/Notificationss.svg";
import { ReactComponent as SocialIcon } from "@src/assets/icons/Social.svg";
import { ReactComponent as TrashIcon } from "@src/assets/icons/Trash.svg";
import { ReactComponent as EmailIcon } from "@src/assets/icons/Letter.svg";
import FastIcon from '@src/components/FastIcon/FastIcon';

const SettingsPage: React.FC = () => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const mainInfoContainerRef = useRef<HTMLDivElement | null>(null);
	const scrollToMainInfo = () => {
		if (mainInfoContainerRef.current) {
			mainInfoContainerRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const emailBoxRef: RefObject<HTMLDivElement> = useRef(null);
	const passwordBoxRef: RefObject<HTMLDivElement> = useRef(null);
	const notificationBoxRef: RefObject<HTMLDivElement> = useRef(null);
	const deleteAccountBoxRef: RefObject<HTMLDivElement> = useRef(null);
	const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
		if (ref && ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};
	return (
		<Box
			display="flex"
			flexDirection="row"
			sx={{
				backgroundColor: '#FAFBFF',
				minHeight: "100vh",
				paddingRight: '10px',
				marginTop: "1rem",
				width: '100%'
			}}>

			<Container sx={{
				paddingLeft: '60px',
				margin: 'unset',
				width: 'unset',
				'@media (max-width: 778px)': {
					display: 'none',
				},
			}}>
				<Grid container>
					<Grid item xs={1}>
						<Box
							width={265}
							height={200}
							bgcolor="white"
							borderRadius={8}
							boxShadow={1}


							sx={{
								display: 'flex',
								padding: '1rem',
								flexDirection: 'column',
								justifyContent: 'flex-start',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									marginBottom: '0.5rem',
									cursor: 'pointer',
								}}
								onClick={scrollToMainInfo}
							>
								<EmailIcon color="primary" style={{ marginRight: '0.2rem' }} /> {/* Add an icon */}
								<Box sx={{ flex: 1, color: '#A28D8D', fontSize: '1rem' }}>Основная информация</Box>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => scrollToRef(emailBoxRef)}>
								<EmailIcon color="primary" style={{ marginRight: '0.2rem' }} />
								<Box sx={{ flex: 1, color: '#A28D8D' }}> Почта</Box>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => scrollToRef(passwordBoxRef)}>
								<PasswordIcon color="primary" style={{ marginRight: '0.2rem' }} />
								<Box sx={{ flex: 1, color: '#A28D8D' }}>Пароль</Box>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => scrollToRef(notificationBoxRef)}>
								<NotificatoinsIcon color="primary" style={{ marginRight: '0.2rem' }} />
								<Box sx={{ flex: 1, color: '#A28D8D' }}>Уведомление</Box>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => scrollToRef(notificationBoxRef)}>
								<SocialIcon color="primary" style={{ marginRight: '0.2rem' }} />
								<Box sx={{ flex: 1, color: '#A28D8D' }}>Социальные Сети</Box>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => scrollToRef(deleteAccountBoxRef)}>
								<FastIcon name={"trash"} color="primary" /> {/* Add an icon */}
								<Box sx={{ flex: 1, color: '#A28D8D' }}>Удалить аккаунт</Box>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
			<Box display="flex" flexDirection="column">
				<Container sx={{
					borderRadius: '30px',
					width: '55vw', maxWidth: '100%',
					paddingTop: '20px',
					backgroundColor: '#E8EBF1',
					height: '250px',
					marginBottom: '20px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					'@media (max-width: 778px)': {
						width: '90vw', marginLeft: '1rem'
					},
				}} ref={mainInfoContainerRef}>

					<Box sx={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'flex-end',
						marginTop: '130px',
					}}>
						<img src={icon} />
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'flex-end',
							marginTop: '-70px',
						}}
					>
						<img src={add} />
					</Box>
				</Container>

				<Container sx={{
					backgroundColor: 'white',
					borderRadius: '30px',
					paddingTop: '20px',
					marginLeft: 'unset',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					width: '55vw', maxWidth: '100%', '@media (max-width: 778px)': {
						width: '90vw', marginLeft: '1rem'
					},
				}} ref={emailBoxRef}>
					<Typography variant="h6">Основная информация</Typography>
					<Box>
						<Label label="Название университета" />
						<Input
							type="text"
							name="email"
							placeholder="Введите полное название университета"
						/>
					</Box>
					<Box sx={{
						display: 'flex', gap: '16px', marginBottom: '16px',
						'@media (max-width: 778px)': {
							display: 'flex', flexDirection: 'column'
						},
					}}>
						{/* Telephone Input */}
						<Box sx={{ width: '100%' }}>
							<Label label="Номер телефона" />
							<Input
								type="text"
								name="telephone"
								placeholder="+7"
							/>
						</Box>

						{/* Name Input */}
						<Box sx={{ width: '100%' }}>
							<Label label="Имя*" />
							<Input
								type="text"
								name="name"
								placeholder="Ваше имя"
							/>
						</Box>
					</Box>
					<Box sx={{
						display: 'flex', gap: '16px', marginBottom: '16px',
						'@media (max-width: 778px)': {
							display: 'flex', flexDirection: 'column'
						},
					}}>

						<Box sx={{ width: '100%' }}>
							<Label label="Телефон*" />
							<Input
								type="text"
								name="telephone"
								placeholder="Номер телефона"
							/>
						</Box>
						<Box sx={{ width: '340px' }}>
							<Label label="Имя*" />
							<Input
								type="text"
								name="name"
								placeholder="Ваше имя"
							/>
						</Box>
						<Box sx={{ width: '340px' }}>
							<Label label="Имя*" />
							<Input
								type="text"
								name="name"
								placeholder="Ваше имя"
							/>
						</Box>

					</Box>
					<Box sx={{ height: '170px' }}>
						<Label label="Почта*" />
						<Input
							type="text"
							name="email"
							placeholder="" sx={{ height: '172px', borderRadius: '24px' }}
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '36px' }}>
						<Button sx={{ marginRight: '16px' }}>Отменить</Button>
						<Button sx={{}} variant="contained" borderRadius="3rem">Сохранить изменения</Button>
					</Box>
				</Container>


				<Container sx={{
					backgroundColor: 'white',
					borderRadius: '30px',
					paddingTop: '20px',
					marginTop: '20px',
					marginRight: '10px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					width: '55vw', maxWidth: '100%',
					'@media (max-width: 778px)': {
						width: '90vw', marginLeft: '1rem'
					},
				}} ref={passwordBoxRef}>
					<Typography variant="h6">Почта</Typography>
					<Typography sx={{ fontSize: '16px', paddingBottom: '15px' }}> Ваш текущий email это
						simple@exmaple.com</Typography>
					<Box>
						<Label label="Новый адрес*" />
						<Input
							type="text"
							name="email"
							placeholder="Логин или Email"
						/>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '36px' }}>
							<Button sx={{ marginRight: '16px' }}>Отменить</Button>
							<Button sx={{}} variant="contained" borderRadius="3rem">Сохранить изменения</Button>
						</Box>
					</Box>
				</Container>

				<Container sx={{
					backgroundColor: 'white',
					borderRadius: '30px',
					width: '55vw', maxWidth: '100%',
					paddingTop: '20px',
					marginTop: '20px',
					marginRight: '10px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start', '@media (max-width: 778px)': {
						width: '90vw', marginLeft: '1rem'
					},
				}}>
					<Typography variant="h6" sx={{ paddingTop: '15px' }}>Измените свой пароль</Typography>
					<Box>
						<Label label="Новый адрес*" />
						<Input
							type="text"
							name="email"
							placeholder="Логин или Email"
						/>
					</Box>
					<Box sx={{
						display: 'flex', gap: '16px', marginBottom: '16px',
						'@media (max-width: 778px)': {
							display: 'flex', flexDirection: 'column'
						},
					}}>
						<Box sx={{ width: '100%' }}>
							<Label label="Телефон*" />
							<Input
								type="text"
								name="telephone"
								placeholder="Номер телефона"
							/>
						</Box>
						<Box sx={{ width: '100%' }}>
							<Label label="Имя*" />
							<Input
								type="text"
								name="name"
								placeholder="Ваше имя"
							/>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '36px' }}>
						<Button sx={{ marginRight: '16px' }}>Отменить</Button>
						<Button sx={{}} variant="contained" borderRadius="3rem">Сохранить изменения</Button>
					</Box>
				</Container>

				<Container sx={{
					backgroundColor: 'white',
					borderRadius: '30px',
					width: '55vw', maxWidth: '100%',
					paddingTop: '20px',
					marginTop: '20px',
					marginRight: '10px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start', '@media (max-width: 778px)': {
						width: '90vw', marginLeft: '1rem'
					},
				}} ref={notificationBoxRef}>
					<Typography variant="h6">Уведомление</Typography>
					<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '20px' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography variant="body1" sx={{ color: '#B6B6B6' }}>Тип</Typography>
							<Typography variant="body1" sx={{
								paddingTop: '10px', color: '#B6B6B6', '@media (max-width: 778px)': {
									fontSize: '1rem'
								},
							}}>Новости</Typography>
							<Typography variant="body1" sx={{
								paddingTop: '10px', color: '#B6B6B6',
								'@media (max-width: 778px)': {
									fontSize: '1rem'
								},
							}}>Изменения
								аккаунта</Typography>
							<Typography variant="body1" sx={{
								paddingTop: '10px', color: '#B6B6B6',
								'@media (max-width: 778px)': {
									fontSize: '1rem'
								},
							}}>Подключение
								устройство</Typography>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography variant="body1" sx={{ color: '#B6B6B6' }}>Почта</Typography>
							<FormControlLabel control={<Switch defaultChecked />} label="" />
							<FormControlLabel control={<Switch defaultChecked />} label="" />
							<FormControlLabel control={<Switch defaultChecked />} label="" />
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography variant="body1" sx={{ color: '#B6B6B6' }}>Браузер</Typography>
							<FormControlLabel control={<Switch defaultChecked />} label="" />
							<FormControlLabel control={<Switch defaultChecked />} label="" />
							<FormControlLabel control={<Switch defaultChecked />} label="" />
						</Box>
					</Box>

					<Typography variant="body1" sx={{
						paddingTop: '10px',
						'@media (max-width: 778px)': {
							display: 'none'
						}, color: '#B6B6B6', paddingBottom: '15px'
					}}>Когда
						отправлять вам уведомление?</Typography>
					<Box>
						<FormControl sx={{
							width: '35%', backgroundColor: '#F8F8F8', borderRadius: '30px',
							'@media (max-width: 778px)': {
								display: 'none'
							},
						}}>
							<InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								sx={{ borderRadius: '30px', border: 'none' }}
								label="Age"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							sx={{
								width: '25%', marginLeft: '30px', backgroundColor: '#F8F8F8',
								'@media (max-width: 778px)': {
									display: 'none'
								}, borderRadius: '30px',
							}}>
							<InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								sx={{ borderRadius: '30px', border: 'none' }}
								label="Age"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							sx={{
								width: '25%', marginLeft: '30px', backgroundColor: '#F8F8F8',
								'@media (max-width: 778px)': {
									display: 'none'
								}, borderRadius: '30px',
							}}>
							<InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"

								sx={{ borderRadius: '30px', border: 'none' }}
								label="Age"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '36px' }}>
						<Button sx={{ marginRight: '16px' }}>Отменить</Button>
						<Button sx={{}} variant="contained" borderRadius="3rem">Сохранить изменения</Button>
					</Box>
				</Container>

				<Container sx={{
					backgroundColor: 'white',
					borderRadius: '30px',
					width: '55vw', maxWidth: '100%',
					paddingTop: '20px',
					marginTop: '20px',
					marginRight: '10px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start', '@media (max-width: 778px)': {
						width: '90vw', marginLeft: '1rem'
					},
				}} ref={deleteAccountBoxRef}>
					<Typography variant="h6">Социальные сети</Typography>
					<Typography sx={{ fontSize: '16px', paddingBottom: '15px' }}> Ваш текущий email это
						simple@exmaple.com</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
						<Box sx={{ width: '30px', height: '30px', marginRight: '15px' }}>
							<img src={web} />
						</Box>
						<Box sx={{ marginTop: '10px' }}>
							<Typography variant="body1" sx={{ fontSize: '16px' }}>Сайт:</Typography>
							<Typography variant="body1" sx={{
								'@media (max-width: 778px)': {
									display: 'none'
								},
							}}>
								{/* Add your URL here */}
								<a href="https://www.example.com" target="_blank"
									rel="noopener noreferrer">https://www.example.com</a>
							</Typography>
						</Box>
						<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', borderRadius: '30px' }}>
							{/* Add your button text here */}
							Кнопка
						</Button>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
						<Box sx={{ width: '30px', height: '30px', marginRight: '15px' }}>
							<img src={web} />
						</Box>
						<Box sx={{ marginTop: '10px' }}>
							<Typography variant="body1" sx={{ fontSize: '16px' }}>Сайт:</Typography>
							<Typography variant="body1" sx={{
								'@media (max-width: 778px)': {
									display: 'none'
								},
							}}>
								<a href="https://www.example.com" target="_blank"
									rel="noopener noreferrer">https://www.example.com</a>
							</Typography>
						</Box>
						<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', borderRadius: '30px' }}>
							{/* Add your button text here */}
							Кнопка
						</Button>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
						<Box sx={{ width: '30px', height: '30px', marginRight: '15px' }}>
							<img src={web} />
						</Box>
						<Box sx={{ marginTop: '10px' }}>
							<Typography variant="body1" sx={{ fontSize: '16px' }}>Сайт:</Typography>
							<Typography variant="body1" sx={{
								'@media (max-width: 778px)': {
									display: 'none'
								},
							}}>
								<a href="https://www.example.com" target="_blank"
									rel="noopener noreferrer">https://www.example.com</a>
							</Typography>
						</Box>
						<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', borderRadius: '30px' }}>
							{/* Add your button text here */}
							Кнопка
						</Button>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
						<Box sx={{ width: '30px', height: '30px', marginRight: '15px' }}>
							<img src={web} />
						</Box>
						<Box sx={{ marginTop: '10px' }}>
							<Typography variant="body1" sx={{ fontSize: '16px' }}>Сайт:</Typography>
							<Typography variant="body1" sx={{
								'@media (max-width: 778px)': {
									display: 'none'
								},
							}}>
								<a href="https://www.example.com" target="_blank"
									rel="noopener noreferrer">https://www.example.com</a>
							</Typography>
						</Box>
						<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', borderRadius: '30px' }}>
							{/* Add your button text here */}
							Кнопка
						</Button>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
						<Box sx={{ width: '30px', height: '30px', marginRight: '15px' }}>
							<img src={web} />
						</Box>
						<Box sx={{ marginTop: '10px' }}>
							<Typography variant="body1" sx={{ fontSize: '16px' }}>Сайт:</Typography>
							<Typography variant="body1" sx={{
								'@media (max-width: 778px)': {
									display: 'none'
								},
							}}>
								<a href="https://www.example.com" target="_blank"
									rel="noopener noreferrer">https://www.example.com</a>
							</Typography>
						</Box>
						<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', borderRadius: '30px' }}>
							{/* Add your button text here */}
							Кнопка
						</Button>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
						<Box sx={{ width: '30px', height: '30px', marginRight: '15px' }}>
							<img src={web} />
						</Box>
						<Box sx={{ marginTop: '10px' }}>
							<Typography variant="body1" sx={{ fontSize: '16px' }}>Сайт:</Typography>
							<Typography variant="body1" sx={{
								'@media (max-width: 778px)': {
									display: 'none'
								},
							}}>
								<a href="https://www.example.com" target="_blank"
									rel="noopener noreferrer">https://www.example.com</a>
							</Typography>
						</Box>
						<Button variant="contained" color="primary" sx={{ marginLeft: 'auto', borderRadius: '30px' }}>
							{/* Add your button text here */}
							Кнопка
						</Button>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '36px' }}>
						<Button sx={{ marginRight: '16px' }}>Отменить</Button>
						<Button sx={{}} variant="contained" borderRadius="3rem">Сохранить изменения</Button>
					</Box>
				</Container>
				<br />
				<br />
			</Box>


		</Box>

	)

}


export default SettingsPage;