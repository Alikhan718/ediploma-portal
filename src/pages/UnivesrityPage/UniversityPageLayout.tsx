import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { ReactComponent as StarIcon } from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/universityKBTU.jpg";
import secondImage from "@src/assets/example/university STU.jpg";
import { UniversityPageHeader } from "@src/pages/UnivesrityPage/components/UniversityPageHeader";
import { useNavigate } from "react-router-dom";
import { routes } from "@src/shared/routes";
import styles from "./UniversityPage.module.css";

export const UniversityPageLayout: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer} pt='2rem'>
			<UniversityPageHeader />
			<Grid container display="flex" rowSpacing={1} columnSpacing={1} flexWrap="wrap" justifyContent="space-between" className={styles.universitiesContainer} width='100%'>
				{[exampleImage, secondImage].map((image, index) => (
					<Grid
						key={index} item xs={12} sm={6} md={6} lg={5.5} // Use 6 columns to fit 2 cards in a row
						onClick={() => {
							navigate(routes.universityProfile);
						}}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							cursor: "pointer",
							borderRadius: "1.25rem",
							marginBottom: "1.5rem", backgroundColor: 'white',

						}}
					>
						<CardMedia
							component="img"
							className={styles.universityImg}
							sx={{
								width: "95%",
								borderRadius: "10px",

							}}
							image={image}
							alt="University Image"
						/>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '0 0 auto' }}>
								<Typography mb='.5rem' fontSize="1.3rem" fontWeight="600" sx={{
									"@media (max-width: 778px)": {
										fontSize: '0.75rem'
									},
									"@media (max-width: 998px)": {
										fontSize: '1rem'
									},
								}}>
									{index % 2 === 0 ? "Казахстанско-Британский Технический Университет" :
										"Сатпаев Университет (НУ)"}
									{index === 0 ? "Казахстанско-Британский Технический Университет (КБТУ)" :
										"Казахский национальный исследовательский технический университет имени К. И. Сатпаева (КазНИТУ)"}
								</Typography>
								<Box display='flex'>
									<Typography className={styles.textSm} sx={{
										display: 'flex',
										alignItems: 'center',
									}}>
										4.5 <Rating
											name="text-feedback"
											value={4.5} // Set the rating value
											readOnly
											emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
										/> (25 отзывов)
									</Typography>
								</Box>
								<Typography mt="0.2rem" fontSize="1rem" fontWeight="600" color={"#818181"}>
									Специальностей {index === 0 ? 24 : 12}
								</Typography>
							</CardContent>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
