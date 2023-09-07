import React from 'react';

import { Box, Divider, Typography, Container, TextField, Grid } from '@mui/material';
import { ReactComponent as SearchIcon } from '@src/assets/icons/search-icon.svg';

import { Button, Input } from '@src/components';
import { FooterSection } from "@src/pages/MainPage/components/FooterSection";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "@src/shared/routes";
import styles from "./MainPage.module.css";
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import ReactGA from "react-ga";
import back1 from "./../../assets/dashboard/Content.png"
import img1 from "./../../assets/dashboard/Illustration.png"
import download from "./../../assets/icons/downloadMain.svg"

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
			<Container sx={{ paddingTop: '80px', width: '1500px', }}>
				<FooterSection />
			</Container>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
				<Box><Typography sx={{ fontSize: '48px' }}>
					Принципы работы
				</Typography>
				</Box>
				<Box style={{ textAlign: 'center', marginTop: '15px', marginBottom: '10px', }}>
					Проверьте диплом и найдите себе лучших <br />
					выпускников в компанию
				</Box>
				<Box sx={{ display: 'flex', gap: '10px' }}>
					<Box sx={{ backgroundColor: '#F8F8F8', padding: '38px 48px', width: '645px', display: 'flex', textAlign: 'left', flexDirection: 'column' }}>
						<Box sx={{ paddingBottom: '20px' }}>
							<img src={download} style={{ width: '80px' }} />
						</Box>
						<Box sx={{ paddingBottom: '20px', fontWeight: '800', fontSize: '24px' }}>Загрузите данные о выпускниках</Box>
						<Box>
							Для генерации картинок дипломов и метаданных мы используем исходные данные в Excel формате. После регистрации перейдите в свой личный кабинет и начните процесс создания новой NFT коллекции дипломов.
						</Box>
					</Box>

					<Box sx={{ backgroundColor: '#F8F8F8', padding: '38px 48px', width: '645px', display: 'flex', textAlign: 'left', flexDirection: 'column' }}>
						<Box sx={{ paddingBottom: '20px' }}>
							<img src={download} style={{ width: '80px' }} />
						</Box>
						<Box sx={{ paddingBottom: '20px', fontWeight: '800', fontSize: '24px' }}>Загрузите данные о выпускниках</Box>
						<Box>
							Для генерации картинок дипломов и метаданных мы используем исходные данные в Excel формате. После регистрации перейдите в свой личный кабинет и начните процесс создания новой NFT коллекции дипломов.
						</Box>
					</Box>
				</Box>
			</Container>
			<Container sx={{ fontSize: '48px', overflowX: 'hidden' }}>

				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', fontSize: '48px' }}>Отзывы</Box>
			</Container>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflowX: 'auto', marginBottom: '16px' }}>


				<Box sx={{ display: 'flex', gap: '10px', }}>
					{[1, 2, 3, 4, 5, 6].map((el: any) => {
						return (<Box key={el} style={{ backgroundColor: '#F8F8F8', padding: '20px', width: '532px', }}>
							Загрузите данные о выпускниках
							<Typography>
								Для генерации картинок дипломов и метаданных мы используем исходные данные в Excel формате. После регистрации перейдите в свой личный кабинет и начните процесс создания новой NFT коллекции дипломов.
							</Typography>
						</Box>)
					})}
				</Box>
			</Box>
			<Container sx={{
				display: 'flex', flexDirection: 'row', paddingTop: '16px'
			}}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Typography sx={{ fontSize: '48px' }}>Контакты</Typography>
						<Typography>Введите свой адрес электронной<br /> почты и пароль для входа в систему!</Typography>
						<Typography sx={{ paddingTop: '30px' }}>#Location</Typography>
						<Typography sx={{ paddingTop: '100px' }}>info@jasaim.com</Typography>
						<Typography>+7(00)800-08-80</Typography>
						<Typography>facebook</Typography>
					</Grid>
					<Box sx={{}}><Grid item xs={12} md={6}>
						<Box sx={{ paddingTop: '16px' }}>Ваше имя</Box>
						<TextField label="Имя" variant="outlined" margin="normal" sx={{
							width: '420px',
							borderRadius: '15px',
							backgroundColor: '#F8F8F8',
						}} />
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Box sx={{ paddingTop: '16px' }}> Почта</Box>
							<TextField label="Email" variant="outlined" margin="normal" sx={{
								width: '420px',
								borderRadius: '15px',
								backgroundColor: '#F8F8F8',
							}} />
						</Box>
						<Box sx={{ paddingTop: '16px' }}> Сообщение</Box>
						<TextField label="Текст" variant="outlined" multiline rows={4} margin="normal" sx={{
							width: '420px',
							borderRadius: '15px',
							backgroundColor: '#F8F8F8',
						}} />
						<Box><Button variant="contained" color="primary" sx={{
							width: '420px',
							borderRadius: '15px',

						}} >
							Войти
						</Button></Box>
					</Grid>
					</Box>
				</Grid>
			</Container >
			<Grid container spacing={2} sx={{ paddingTop: '50px' }}>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-1</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>eDiploma</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography sx={{ color: '#F8F8F8' }}>Выпускникам</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Университетам</Typography>
				</Grid>

				{/* sfd */}
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 2-1</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Работодателям</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 2-3</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 2-4</Typography>
				</Grid>

				{/* sfd */}
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-1</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Выпускникам</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-3</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-4</Typography>
				</Grid>

				{/* sfd */}
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-1</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-2</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-3</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-4</Typography>
				</Grid>
				{/* sfd */}
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-1</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-2</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-3</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography>Footer Item 1-4</Typography>
				</Grid>
				{/* Repeat for Rows 3, 4, and 5 */}
			</Grid>
			<Container>
			</Container>

		</Box >
		//   <Box pt={'25px'}>
		//       <Box justifyContent="center" display="flex" mb="5rem">
		//           <Box className={styles.contentText} mt="2.75rem">
		//               <Typography fontSize="2rem" fontWeight="700" mb=".5rem">
		//                   Цифровой портал дипломов <br className={styles.dMobileNone}/> на блокчейне
		//               </Typography>
		//               <Typography variant="h5">
		//                   Проверьте диплом и найдите себе <br className={styles.dMobileNone}/> лучших выпускников в
		//                   компанию
		//               </Typography>
		//               <div style={{marginBottom: '1.5rem'}}/>
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
		//                               <SearchIcon style={{filter: 'brightness(250%) contrast(101%)'}}/>
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
