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
					height: '450px', // Adjust the desired height here
					overflow: 'hidden', // Hide any overflow content
				}}
				width={'100%'}
				mb='3rem'
			>
				<img
					src={exampleImage}
					className={styles.headerImg}
					alt=""
					style={{
						objectFit: 'fill', // Scale and crop the image to cover the container
						width: '100%', // Make sure the image takes the full width
						height: '140%', // Make sure the image takes the full height
					}}
				/>
				<Card elevation={4} className={styles.cardImgContainer} sx={{
					// Change position to absolute
					// Adjust the top position to move the card higher
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

