import React from 'react';
import { Box, Divider, Typography, Container, TextField, Grid, Rating } from '@mui/material';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search-icon.svg';
import { Button, Input } from '@src/components';
import { FooterSection } from "@src/pages/MainPage/components/FooterSection";
import { AuthBasePageLayout } from "./../AuthPage/AuthBaseLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "@src/shared/routes";
import styles from "./MainPage.module.css";
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import ReactGA from "react-ga";
import back1 from "./../../assets/dashboard/Content.png"
import img1 from "./../../assets/dashboard/Illustration.png"
import download from "./../../assets/icons/downloadMain.svg";
import file from "./../../assets/icons/Avatar.svg";
import profile from "./../../assets/icons/profile.svg"

import AppLogo from '@src/assets/icons/app-logo.svg';

export const MainPageLayout: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [filterAttributes, setFilterAttributes] = React.useState({
		text: '',
		specialities: '',
		region: '',
		year: 0,
		gpaL: 0,
		gpaR: 0,
	});
	const [searchQuery, setSearchQuery] = React.useState('');

	const triggerSearchFilters = () => {
		dispatch(fetchSearch(filterAttributes));
		navigate(routes.diploma);
	};
	const textItemStyle = {
		padding: '10px',
	};
	React.useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (filterAttributes.text.trim().length > 1) {
				triggerSearchFilters();
			}
		}, 2000);

		return () => clearTimeout(delayDebounceFn);
	}, [filterAttributes]);

	React.useEffect(() => {
		ReactGA.initialize('G-H12GFWB4FY');
		ReactGA.event({
			category: 'User',
			action: 'Search',
			label: "searchText",
		});
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	return (
		<Box>
			<Container sx={{
				marginTop: '16px',
				width: '1500px',
				padding: '50px',
				display: 'flex', flexDirection: 'column', background: `url(${back1}) no-repeat`, objectFit: 'contain', backgroundSize: "contain", height: '740px', alignItems: 'center', textAlign: 'center'
			}}>
				<Box
					sx={{ fontSize: '48px', fontWeight: 'bold' }}>
					Цифровой портал
					<br />
					<span style={{ color: '#3B82F6', fontSize: '48px' }}>дипломов</span> на блокчейне
				</Box ><Box style={{
					textAlign: 'center', paddingTop: '21px', paddingBottom: '31px', marginBottom: '10px'
				}}>
					Проверьте диплом и найдите себе лучших <br />
					выпускников в компанию
				</Box>
				<Box display="flex">
					<Input
						placeholder="Фамилия Имя, название вуза"
						fullWidth={true}
						inputSize="m"
						sx={{
							paddingRight: 0,
							width: '500px'
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
								buttonSize="m"
								variant="contained"
								sx={{
									padding: '16px 32px',
									borderRadius: '48px',
									margin: '4px'
								}}
							>
								<SearchIcon style={{ filter: 'brightness(250%) contrast(101%)', width: '72px', marginRight: '12px' }} />
								Найти
							</Button>
						}
						onChange={(e) => {
							const query = e.target.value;
							setFilterAttributes({ ...filterAttributes, text: query });
							setSearchQuery(query);
						}}
					/>
				</Box>
				<Box><img src={img1} style={{ width: '100%', marginBottom: '-150px' }} /></Box>
			</Container >
			<Container sx={{ paddingTop: '150px', width: '1500px', }}>
				<FooterSection />
			</Container>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
				<Box><Typography sx={{ fontSize: '48px', }}>
					Принципы работы
				</Typography>
				</Box>
				<Box style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '30px', }}>
					Проверьте диплом и найдите себе лучших <br />
					выпускников в компанию
				</Box>
				<Box sx={{ display: 'flex', gap: '24px' }}>
					<Box sx={{ backgroundColor: '#F8F8F8', padding: '38px 48px', width: '645px', display: 'flex', textAlign: 'left', flexDirection: 'column', borderRadius: '24px' }}>
						<Box sx={{ paddingBottom: '20px' }}>
							<img src={download} style={{ width: '80px' }} />
						</Box>
						<Box sx={{ paddingBottom: '20px', fontWeight: '800', fontSize: '28px' }}>Загрузите данные о выпускниках</Box>
						<Box sx={{ color: '#818181', fontSize: '16px' }}>
							Для генерации картинок дипломов и метаданных мы используем исходные данные в Excel формате. После регистрации перейдите в свой личный кабинет и начните процесс создания новой NFT коллекции дипломов.
						</Box>
					</Box>

					<Box sx={{ backgroundColor: '#F8F8F8', padding: '38px 48px', width: '645px', display: 'flex', textAlign: 'left', flexDirection: 'column', borderRadius: '24px' }}>
						<Box sx={{ paddingBottom: '20px' }}>
							<img src={file} style={{ width: '80px' }} />
						</Box>
						<Box sx={{ paddingBottom: '20px', fontWeight: '800', fontSize: '28px' }}>Выберите шаблон диплома</Box>
						<Box sx={{ color: '#818181', fontSize: '16px' }}>
							Загрузите шаблон дизайна вашего диплома и определите в каких местах должна находиться определенная информация. После этого будет запущен процесс генерации заданного количества дипломов с данными.
						</Box>
					</Box>
				</Box>
			</Container>
			<Container sx={{ fontSize: '48px', overflowX: 'hidden' }}>

				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', fontSize: '48px', paddingTop: '100px', paddingBottom: '55px' }}>Отзывы</Box>
			</Container>
			<Box sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				textAlign: 'center',
				paddingX: '11rem',
				overflowX: 'auto',
				marginBottom: '16px' }}>
				<Box sx={{ display: 'flex', gap: '10px', }}>
					{[1, 2, 3, 4, 5, 6].map((el: any) => {
						return (<Box key={el} style={{ backgroundColor: '#F8F8F8', padding: '20px', width: '532px', height: '276px', borderRadius: '24px' }}>
							<img src={profile} style={{ width: '56px' }} />
							<Box sx={{ paddingTop: '15px', paddingBottom: '25px', fontSize: '17px' }}>Имя Фамилия</Box>
							<Box sx={{ paddingBottom: '25px', fontSize: '17px' }}>
								Проверьте диплом и найдите себе лучших выпускников в компанию
							</Box>
							<Box><Rating
								name={`rating-${el}`}
								value={5}
								max={5}
								readOnly
								size="large"
								sx={{ color: '#3B82F6', paddingBottom: '32px' }}
							/></Box>
						</Box>)
					})}
				</Box>
			</Box>
			<Container sx={{
				display: 'flex', flexDirection: 'row', paddingTop: '180px'
			}}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={5}>
						<Typography sx={{ fontSize: '48px', fontWeight: '800' }}>Контакты</Typography>
						<Typography sx={{ color: '#818181' }}>Введите свой адрес электронной<br /> почты и пароль для входа в систему!</Typography>
						<Typography sx={{ paddingTop: '24px' }}>#Location</Typography>
						<Typography sx={{ marginTop: '110px', paddintBottom: '120px', fontSize: '22px' }}>info@jasaim.com</Typography>
						<Box sx={{ paddingTop: '20px', fontSize: '22px' }}>+7(00)800-08-80</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', paddingTop: '40px', fontSize: '12px', color: '#818181' }}>
							<Box sx={{ marginRight: '25px' }}>facebook</Box>
							<Box sx={{ marginRight: '25px' }}>instagram</Box>
							<Box sx={{ marginRight: '25px' }}>twitter</Box>
							<Box>linkedin</Box>
						</Box>

					</Grid>
					<Box sx={{ paddingLeft: '251px' }}><Grid item xs={12} md={6}>
						<Box sx={{ paddingTop: '16px' }}>Ваше имя</Box>
						<TextField variant="outlined" margin="normal" sx={{
							width: '420px',
							borderRadius: '15px',
							backgroundColor: '#F8F8F8',
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									border: 'none',
								},
							},
						}
						}
							InputLabelProps={{
								shrink: true,
							}}
							placeholder="Нурлан Сабуров" />
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Box sx={{ paddingTop: '16px' }}> Почта</Box>
							<TextField variant="outlined" margin="normal" sx={{
								width: '420px',
								borderRadius: '15px',
								backgroundColor: '#F8F8F8',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none',
									},
								},
							}}
								InputLabelProps={{
									shrink: true,
								}}
								placeholder="mail@simmmple.com" />
						</Box>
						<Box sx={{ paddingTop: '16px' }}> Сообщение</Box>
						<TextField variant="outlined" multiline rows={4} margin="normal" sx={{
							width: '420px',
							borderRadius: '15px',
							backgroundColor: '#F8F8F8',
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									border: 'none',
								},
							},
						}}
							InputLabelProps={{
								shrink: true,
							}}
							placeholder="Введите ваше сообщение" />
						<Box sx={{ paddingTop: '32px' }}><Button variant="contained" color="primary" sx={{
							width: '420px',
							borderRadius: '15px',

						}} >
							Войти
						</Button></Box>
					</Grid>
					</Box>
				</Grid>
			</Container >
			<Box>
				<Grid container spacing={2} sx={{ paddingTop: '115px', paddingLeft: '90px', paddingBottom: '30px' }}>
					<Grid container spacing={10}>
						<Grid item xs={12} md={2}>
							<img src={AppLogo} style={{ width: '206px', paddingBottom: '10px' }} />
							<Typography style={textItemStyle}>#Location</Typography>
							<Typography style={textItemStyle}>#mail</Typography>
							<Typography style={textItemStyle}>#phone</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography sx={{ color: '#3B82F6' }} style={textItemStyle}>eDiploma</Typography>
							<Typography style={textItemStyle}> О нас</Typography>
							<Typography style={textItemStyle}> Новости</Typography>
							<Typography style={textItemStyle}>Вакансии</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography sx={{ color: '#3B82F6' }} style={textItemStyle}>Работодателям</Typography>
							<Typography style={textItemStyle}>Выпускники</Typography>
							<Typography style={textItemStyle}>Университеты</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography sx={{ color: '#3B82F6' }} style={textItemStyle}>Выпуск</Typography>
							<Typography style={textItemStyle}>Резюме</Typography>
							<Typography style={textItemStyle}>Профиль</Typography>
							<Typography style={textItemStyle}>Работа</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography sx={{ color: '#3B82F6' }} style={textItemStyle}>Университетам</Typography>
							<Typography style={textItemStyle}>Дипломы</Typography>
							<Typography style={textItemStyle}>Университеты</Typography>
							<Typography style={textItemStyle}>Сотрудничество</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Box>
			<Container>
			</Container>

		</Box >
		//   <Box pt={'25px'}>
		//       <Box justifyContent="center" display="flex" mb="5rem">
		//           <Box className={styles.contentText} mt="2.75rem">
		//               <Typography fontSize="2rem" fontWeight="700" mb=".5rem">
		//                   Цифровой портал дипломов <br className={styles.dMobileNone} /> на блокчейне
		//               </Typography>
		//               <Typography variant="h5">
		//                   Проверьте диплом и найдите себе <br className={styles.dMobileNone} /> лучших выпускников в
		//                   компанию
		//               </Typography>
		//               <div style={{ marginBottom: '1.5rem' }} />
		//               <Box display="flex" gap="1rem" mb="1rem">
		//                   <Button className={styles.btn} variant="contained" onClick={() => navigate(routes.diploma)}>
		//                       Дипломы
		//                   </Button>
		//                   <Button
		//                       className={styles.btn}
		//                       variant="contained"
		//                       color="secondary"
		//                       onClick={() => navigate(routes.university)}
		//                   >
		//                       Университеты
		//                   </Button>
		//               </Box>
		//               <Box display="flex">
		//                   <Input
		//                       placeholder="Найти по ФИО"
		//                       fullWidth={true}
		//                       inputSize="m"
		//                       sx={{
		//                           paddingRight: 0,
		//                       }}
		//                       endAdornment={
		//                           <Button
		//                               onClick={() => {
		//                                   triggerSearchFilters();
		//                                   // Track search button click with the search query
		//                                   ReactGA.event({
		//                                       category: 'User',
		//                                       action: 'Search',
		//                                       label: searchQuery,
		//                                   });
		//                               }}
		//                               buttonSize="m"
		//                               variant="contained"
		//                               sx={{
		//                                   padding: '0',
		//                               }}
		//                           >
		//                               <SearchIcon style={{ filter: 'brightness(250%) contrast(101%)' }} />
		//                           </Button>
		//                       }
		//                       onChange={(e) => {
		//                           const query = e.target.value;
		//                           setFilterAttributes({...filterAttributes, text: query});
		//                           setSearchQuery(query);
		//                       }}
		//                   />
		//               </Box>
		//           </Box>
		//       </Box>
		//       <Divider/>
		//       <FooterSection/>
		//   </Box>
	);
};
