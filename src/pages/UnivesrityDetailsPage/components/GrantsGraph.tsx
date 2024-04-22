import React, { memo } from "react";
import {
	PieChart,
	Pie,
	Tooltip,
	Cell,
	ResponsiveContainer,
} from "recharts";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import grantsData from "./data/grants.json"; // Import the JSON data
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from '@src/store/generals/selectors';
import { localization } from "../generator";

// Define colors here
const COLORS = ["rgb(0,255,255,0.6)", "rgb(255,255,0,0.6)", "rgb(0,255,0,0.6)"];

// eslint-disable-next-line react/display-name
export const GrantsGraph: React.FC = memo(() => {
	// Use the imported grantsData for the pie chart data
	const data = grantsData;
	const lang = useSelector(selectLanguage);

	return (
		<Card
			elevation={6}
			sx={{
				width: "98%",
				marginRight: "2%",
				maxWidth: 352,
				padding: "20px 0",
				display: "flex",
				flexDirection: "column",
				borderRadius: '30px',
			}}
		>
			<Box display="flex" justifyContent={"space-between"} flexWrap={"nowrap"} margin={"0 20px"}>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					{localization[lang].Analytics.kbtu.grants}
				</Typography>
				<Box display="flex" flexDirection={"row"} alignItems={"center"}>
				</Box>
			</Box>
			<div style={{ margin: '20px' }}>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={80}
							fill="#8884d8"
							label
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
});
