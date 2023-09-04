import React from 'react';
import { Box, Card, CardMedia, Typography } from "@mui/material";
import exampleImage from "@src/assets/example/kbtu_back.jpg";
import exampleIcon from "@src/assets/example/kbtu_min.jpg";
import styles from "../UniversityDetailsPage.module.css";

export const UniversityDetailsPageHeader: React.FC = (props) => {
	return (
		<React.Fragment>
			<Box
				display='flex'
				sx={{
					position: 'relative',
					borderRadius: '15px',
					height: '450px',
					overflow: 'hidden',
				}}
				width={'100%'}
				mb='3rem'
			>
				<img
					src={exampleImage}
					className={styles.headerImg}
					alt=""
					style={{
						objectFit: 'fill',
						width: '100%',
						height: '140%',
					}}
				/>
				<Card elevation={4} className={styles.cardImgContainer} sx={{
				}}>
					<CardMedia
						component="img"
						className={styles.cardImg}
						image={exampleIcon}
						alt="University Image"
					/>
				</Card>
			</Box>
		</React.Fragment>
	);
};

