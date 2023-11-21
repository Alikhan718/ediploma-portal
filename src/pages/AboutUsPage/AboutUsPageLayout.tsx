import React from 'react';

import { Box, Divider, ImageListItem, ImageList, Typography, CardMedia, TextareaAutosize } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "@src/shared/routes";
import styles from "./AboutUsPage.module.css";
import { fetchSearch } from "@src/store/diplomas/actionCreators";
import ReactGA from "react-ga";
import imgTopLeft from "@src/assets/aboutUs/about_us_1.png";
import imgTopRight from "@src/assets/aboutUs/about_us_2.png";
import imgMiddle from "@src/assets/aboutUs/about_us_middle.png";
import { advantages, localization } from "./generator";
import { Button, Input, Label } from '@src/components';
import cn from "classnames";
import { selectLanguage } from "@src/store/generals/selectors";

export const AboutUsPageLayout: React.FC = () => {
	const lang = useSelector(selectLanguage);

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
							{localization[lang].Info.title}
						</Typography>
					</Box>
					<Box display="flex" flexDirection="column" gap="1rem">
						<Typography className={styles.textMd}>
							{localization[lang].Info.description}
						</Typography>
					</Box>


				</Box>

				<Box className={styles.descriptionContainer}>
					<Box className={styles.description}>
						<Typography className={cn(styles.textLg, styles.textBlue)}>
							{localization[lang].Info2.title}
						</Typography>
						<Box className={cn(styles.flexColumn, styles.mt1)}>
							<Typography className={styles.textMd}>
								{localization[lang].Info2.description}
							</Typography>
							<Typography className={styles.textMd}>
								{localization[lang].Info2.description2}
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
						{localization[lang].Goal.title}
					</Typography>
					<Typography textAlign="center" className={cn(styles.textMd, styles.textGray)}>
						{localization[lang].Goal.description}
					</Typography>

					<Box className={styles.goalItemsContainer}>
						{localization[lang].Goal.elements.map((item) => (
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

				<Box className={styles.goalContainer}>
					<Typography textAlign="center" className={styles.textLg}>
						{localization[lang].Team.title}
					</Typography>
					<Typography textAlign="center" className={cn(styles.textMd, styles.textGray)}>
						{localization[lang].Team.description}
					</Typography>

					<Box className={styles.goalItemsContainer}>
						{localization[lang].Team.elements.map((item, index) => (
							<div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
								{typeof item.image === 'string' ? (
									<img src={item.image} alt={`Team Member ${index + 1}`} style={{ alignSelf: 'center', width: '100%', height: '100%', borderRadius: '1rem' }} />
								) : (
									React.createElement(item.image, { style: { alignSelf: 'center', width: '100%', height: '100%' } })
								)}
								<Box mt="1rem">
									<Typography variant="subtitle1" className={styles.textMd}>
										{item.subtitle}
									</Typography>
								</Box>
							</div>
						))}
					</Box>

				</Box>

			</Box>

			<Box className={styles.contactUsContainer} sx={{ paddingBottom: '8rem', paddingTop: '9rem' }}>
				<Box className={styles.item} display="flex" flexDirection="column" width="45%"
					justifyContent="space-between">
					<Box>
						<Typography fontSize="2.5rem" fontWeight="600" mb=".5rem" color="#2D2D2D"
							className={styles.mobTextL}>
							{localization[lang].AboutUs.contactsTitle}
						</Typography>
						<Typography fontSize=".9rem" color="#818181" whiteSpace="pre-line" className={styles.mobTextSm}>
							{localization[lang].AboutUs.description}
						</Typography>

						<Typography fontSize=".9rem" mt="2rem" color="#818181" whiteSpace="pre-line"
							className={styles.mobTextSm}>
							{localization[lang].AboutUs.address.title} <br />
							{localization[lang].AboutUs.address.value}
						</Typography>
					</Box>
					<Box>
						<Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
							className={styles.mobTextMd}>
							{localization[lang].AboutUs.contacts.email}
						</Typography>
						<Typography fontSize="1.2rem" color="#4D4D4D" whiteSpace="pre-line"
							className={styles.mobTextMd}>
							{localization[lang].AboutUs.contacts.phone}
						</Typography>

						<Box mt="2rem" display="flex" gap="1rem" flexDirection="row">
							{localization[lang].AboutUs.links.map((el: any) =>
								<a key={el.value} href={el.link} target="_blank" rel="noopener noreferrer">
									<Typography fontSize=".9rem" color="#818181" className={styles.mobTextSm}>
										{el.title}
									</Typography>
								</a>
							)}


						</Box>
					</Box>


				</Box>
				<Box className={styles.item} display="flex" flexDirection="column" width="45%"
					justifyContent="space-between">
					<Box mb="1rem">
						<Label label={localization[lang].AboutUs.form.name.label} className={styles.mobTextSm} />
						<Input type="text" name="name"
							placeholder={localization[lang].AboutUs.form.name.placeholder} />
					</Box>
					<Box mb="1rem">
						<Label label={localization[lang].AboutUs.form.email.label} className={styles.mobTextSm} />
						<Input type="text" name="email"
							placeholder={localization[lang].AboutUs.form.email.placeholder} />
					</Box>
					<Box mb="2rem">
						<Label label={localization[lang].AboutUs.form.message.label} className={styles.mobTextSm} />
						<Input type="text" multiline={true} reducePadding={true} minRows={4} name="message"
							placeholder={localization[lang].AboutUs.form.message.placeholder} />
					</Box>
					<Button fullWidth={true} variant="contained" borderRadius="3rem"
						type="submit">
						{localization[lang].AboutUs.form.send}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
