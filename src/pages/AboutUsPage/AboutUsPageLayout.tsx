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
		navigate(routes.hrBank);
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
			<Box className={styles.container} sx={{ backgroundColor: "white", }}>

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
						{"Исключение риска фальсификации дипломов и полная прозрачность \n их выпуска"}
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
							Адрес: <br />
							Astana, Mangilik el 55/14 C2.2
						</Typography>
					</Box>
					<Box>
						<Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
							className={styles.mobTextMd}>
							info@jasaim.com
						</Typography>
						<Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
							className={styles.mobTextMd}>
							Телефон: +7 777 646 32 46
						</Typography>

						<Box mt="2rem" display="flex" gap="1rem" flexDirection="row">
							<a href="https://t.me/jasaimhub" target="_blank" rel="noopener noreferrer">
								<Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
									Telegram
								</Typography>
							</a>
							<a href="https://www.instagram.com/jasaim_blockchain/" target="_blank" rel="noopener noreferrer">
								<Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
									Instagram
								</Typography>
							</a>
							<a href="https://www.linkedin.com/company/96461080/admin/feed/posts/" target="_blank" rel="noopener noreferrer">
								<Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
									Linkedin
								</Typography>
							</a>

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
