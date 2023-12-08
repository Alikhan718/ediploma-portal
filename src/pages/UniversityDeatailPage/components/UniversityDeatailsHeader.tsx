import React from 'react';
import { Box, Card, CardMedia, Typography } from "@mui/material";
import exampleImage from "@src/assets/example/UnivSTU.jpg";
import exampleIcon from "@src/assets/icons/Logo (2).svg";
import styles from "../UniversityDeatailPage.module.css";

interface UniversityDeatailsHeaderProps {
	banner:string;
};

export const UniversityDeatailsHeader: React.FC<UniversityDeatailsHeaderProps> = (props) => {
	const { banner } = props;
	const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

	return (
		<>
			<Box display='flex' sx={{ position: "relative", width: '100%', height: '100%', '@media (max-width: 768px)': { height: '200%' } }} mb="1rem">
				<img src={banner ? `${baseURL}/${banner}` : exampleImage}
					className={styles.headerImg}
					alt="" style={{ borderRadius: '20px' }} />
			</Box >
		</>
	);
};

