import React from 'react';
import { Box, Card, CardMedia, Typography } from "@mui/material";
import exampleImage from "@src/assets/example/kbtu_back.jpg";
import exampleIcon from "@src/assets/icons/Logo (2).svg";
import styles from "../UniversityDetailsPage.module.css";

export const UniversityDetailsPageHeader: React.FC = (props) => {
	return (
		<>
			<Box display='flex' sx={{
				position: "relative",
			}} width={'100%'} mb="1rem">
				<img src={exampleImage}
					className={styles.headerImg}
					alt="" style={{ borderRadius: '20px' }} />
				<Box className={styles.cardImgContainer}>
					<CardMedia
						component="img"
						className={styles.cardImg}
						image={exampleIcon}
						alt="University Image" style={{ marginBottom: '1rem', }}
					/>

				</Box>

			</Box >
		</>
	);
};

