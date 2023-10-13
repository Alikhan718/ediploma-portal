import React, { useEffect } from 'react';

import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material';
import { ReactComponent as StarIcon } from '@src/assets/icons/star.svg';
import exampleImage from "@src/assets/example/universityKBTU.jpg";
import secondImage from "@src/assets/example/universityNU.jpg";
import { UniversityPageHeader } from "@src/pages/UnivesrityPage/components/UniversityPageHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from '@mui/material/Rating';
import { selectDiplomaList } from "@src/store/diplomas/selectors";
import { fetchDiplomas } from "@src/store/diplomas/actionCreators";
import { routes } from "@src/shared/routes";
import styles from "./UniversityPage.module.css";

export const UniversityPageLayout: React.FC = () => {
	const navigate = useNavigate();
	const defaultS = 4;
	return (
		<Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 1rem' className={styles.mainContainer} pt='2rem'>
			<UniversityPageHeader />
			<Grid container display="flex" rowSpacing={1} columnSpacing={1} flexWrap="wrap"
				justifyContent="space-between"
				className={styles.universitiesContainer} width='100%'>
				{Array.from({ length: 6 }).map((_, index) => (
					<Grid
						key={index} item xs={12} sm={6} md={4} lg={3}
						onClick={() => {
							navigate(routes.universityDetails);
						}}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							cursor: "pointer",
							borderRadius: "1.25rem",
							marginBottom: "1.5rem",
						}}
					>
						<CardMedia
							component="img"
							className={styles.universityImg}
							sx={{
								width: "100%",
								borderRadius: "10px",
							}}
							image={index % 2 === 0 ? exampleImage : secondImage}
							alt="University Image"
						/>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '0 0 auto' }}>
								<Typography mb='.5rem' fontSize="1.3rem" fontWeight="600" sx={{
									"@media (max-width: 778px)": {
										fontSize: '0.75rem'
									}, "@media (max-width: 998px)": {
										fontSize: '1rem'
									},
								}}>
									{index % 2 === 0 ? "Казахстанско-Британский Технический Университет" : "Назарбаев Университет (НУ)"}
								</Typography>
								<Box display='flex'>
									<Typography className={styles.textSm} sx={{
										display: 'flex', alignItems: 'center',

									}}>
										4.5 <Rating
											name="text-feedback"
											value={defaultS}
											readOnly
											emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
										/> (25 отзывов)
									</Typography>
								</Box>
								<Typography mt="0.2rem" fontSize="1rem" fontWeight="600" color={"#818181"}>
									Специальностей {index % 2 === 0 ? 24 : 12}
								</Typography>
							</CardContent>
						</Box>
					</Grid>
				))}
			</Grid>


		</Box>

	);
};