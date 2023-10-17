import React from 'react';

import { Box, Divider, ImageListItem, ImageList, Typography, CardMedia, TextareaAutosize } from '@mui/material';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "@src/shared/routes";
import styles from "./AboutUsPage.module.css";
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import ReactGA from "react-ga";
import imgTopLeft from "@src/assets/aboutUs/about_us_1.png";
import imgTopRight from "@src/assets/aboutUs/about_us_2.png";
import imgMiddle from "@src/assets/aboutUs/about_us_middle.png";
import { advantages } from "./generator";
import { ReactComponent as Advantages1 } from "@src/assets/aboutUs/advantages_1.svg";
import { ReactComponent as Advantages2 } from "@src/assets/aboutUs/advantages_2.svg";
import { ReactComponent as Advantages3 } from "@src/assets/aboutUs/advantages_3.svg";
import { Button, Input, Label } from '@src/components';
import cn from "classnames";

export const AboutUsPageLayout: React.FC = () => {
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
			<Box className={styles.container} sx={{backgroundColor: "white",}}>

				<Box className={styles.hero}>
					<CardMedia
						component="img"
						image={imgTopLeft}
						className={cn(styles.img, styles.imgHeroLeft)}
					/>
					<CardMedia
						component="img"
						image={imgTopRight}
						className={cn(styles.img, styles.imgHeroRight)}
					/>
				</Box>

				<Box className={styles.whoAreWeContainer}>
					<Box width="100%">
						<Typography className={styles.textLg}>
							Кто мы такие
						</Typography>
					</Box>
					<Box display="flex" flexDirection="column" gap="1rem">
						<Typography className={styles.textMd}>
							eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет
							оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что
							позволяет
							исключить возможность подделки документов.
						</Typography>
						<Typography className={styles.textMd}>
							Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации
							университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы
							проверки и подтверждения квалификации выпускников.
						</Typography>
					</Box>


				</Box>

				<Box className={styles.descriptionContainer}>
					<Box className={styles.description}>
						<Typography className={cn(styles.textLg, styles.textBlue)}>
							eDiploma
						</Typography>
						<Box className={cn(styles.flexColumn, styles.mt1)}>
							<Typography className={styles.textMd}>
								eDiploma - это онлайн-платформа, разрабатываемая командой JASAIM, которая предоставляет
								оцифровку бумажных дипломов выпускников в формате NFT (невзаимозаменяемые токены), что
								позволяет исключить возможность подделки документов.
							</Typography>
							<Typography className={styles.textMd}>
								Портал eDiploma предоставляет возможность выпускникам, работодателям и администрации
								университетов взаимодействовать с дипломами через личные кабинеты, облегчая процессы
								проверки и подтверждения квалификации выпускников.
							</Typography>
						</Box>

					</Box>
					<Box className={styles.descriptionImgRight}>
						<CardMedia
							component="img"
							height="100%"
							image={imgMiddle}
							className={cn(styles.img, styles.w100)}
						/>
					</Box>

				</Box>

				<Box className={styles.goalContainer}>
					<Typography textAlign="center" className={styles.textLg}>
						К чему мы стремимся
					</Typography>
					<Typography textAlign="center" className={cn(styles.textMd, styles.textGray)}>
						{"Проверьте диплом и найдите себе лучших выпускников \n в компанию"}
					</Typography>

					<Box className={styles.goalItemsContainer}>
						{advantages.map((item) => (
							<Box key={item.title} display="flex" justifyContent="center" flexDirection="column">
								<item.image style={{ alignSelf: "center", width: "100%", height: "100%" }} />
								<Typography textAlign="center" fontSize="1.5rem" fontWeight="600" color="#242331">
									{item.title}
								</Typography>
								<Box mt="1rem" />
								<Typography textAlign="center" fontSize="1rem" color="#818181" whiteSpace="pre-line">
									{item.subtitle}
								</Typography>
							</Box>
						))}

					</Box>
				</Box>
			</Box>

			<Box className={styles.contactUsContainer}>
				<Box className={styles.item} display="flex" flexDirection="column" width="45%"
					justifyContent="space-between">
					<Box>
						<Typography fontSize="2.5rem" fontWeight="600" mb=".5rem" color="#2D2D2D"
							className={styles.mobTextL}>
							Контакты
						</Typography>
						<Typography fontSize=".9rem" color="#818181" whiteSpace="pre-line" className={styles.mobTextSm}>
							{"Введите свой адрес электронной\n почты для того чтобы мы могли вам ответить!"}
						</Typography>

						<Typography fontSize=".9rem" mt="2rem" color="#818181" whiteSpace="pre-line"
							className={styles.mobTextSm}>
							#Location
						</Typography>
					</Box>
					<Box>
						<Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
							className={styles.mobTextMd}>
							info@jasaim.com
						</Typography>
						<Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
							className={styles.mobTextMd}>
							+7(00)800-08-80
						</Typography>

						<Box mt="2rem" display="flex" gap="1rem" flexDirection="row">
							<Typography textAlign="center" fontSize=".9rem" color="#818181"
								className={styles.mobTextSm}>
								facebook
							</Typography>
							<Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
								twitter
							</Typography>
							<Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
								instagram
							</Typography>
							<Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
								linkedin
							</Typography>

						</Box>
					</Box>

				</Box>
				<Box className={styles.item} display="flex" flexDirection="column" width="45%"
					justifyContent="space-between">
					<Box mb="1rem">
						<Label label="Ваше имя" className={styles.mobTextSm} />
						<Input type="text" name="name"
							placeholder="ФИО" />
					</Box>
					<Box mb="1rem">
						<Label label="Почта" className={styles.mobTextSm} />
						<Input type="text" name="email"
							placeholder="example@mail.com" />
					</Box>
					<Box mb="2rem">
						<Label label="Сообщение" className={styles.mobTextSm} />
						<Input type="text" multiline={true} reducePadding={true} minRows={4} name="message"
							placeholder="Введите ваше сообщение" />
					</Box>
					<Button fullWidth={true} variant="contained" borderRadius="3rem"
						type="submit">
						Отправить
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
