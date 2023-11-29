import React from 'react';
import { Box, Card, CardMedia, Typography } from "@mui/material";
import exampleImage from "@src/assets/example/qlabMain.jpg";
import styles from "../QLabPage.module.css";

export const QLabHeader: React.FC = (props) => {
	return (
		<>
			<Box display='flex' sx={{ position: "relative", width: '100%', height: '100%', '@media (max-width: 768px)': { height: '200%' } }} mb="1rem">
				<img src={exampleImage}
					className={styles.headerImg}
					alt="" style={{ borderRadius: '20px' }} />
			</Box >
		</>
	);
};