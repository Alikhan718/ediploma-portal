import React from 'react';
import { Card, Box, Typography, LinearProgress } from "@mui/material";
import { ReactComponent as UserIcon } from "@src/assets/icons/ic32-user.svg";

interface AnalyticsCardProps {
	text: string;
	number: number;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ text, number }) => (
	<Card
		sx={{
			width: '20rem',
			padding: "20px",
			display: "flex",
			flexDirection: "column",
			borderRadius: '1.5rem'
		}}
		elevation={3}
	>
		<Box display="flex" flexDirection={"column"} gap="10px" marginBottom="0.6rem">
			<Typography fontSize="1rem" color="#A1A1A1">{text}</Typography>
		</Box>
		<Box display="flex" flexDirection={"column"} gap="10px" >
			<Typography fontSize="1.6rem" fontWeight="600">
				{number}
			</Typography>
			<LinearProgress variant="determinate" value={70} />
		</Box>
	</Card>
);
