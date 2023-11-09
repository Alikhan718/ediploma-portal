import React, { memo } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import cityData from "./data/city.json";

const colors = [
	'RGB(255, 22, 22)',
	'RGB(255, 87, 87)',
	'RGB(255, 102, 196)',
	'RGB(203, 108, 230)',
	'RGB(140, 82, 255)',
	'RGB(94, 23, 235)',
	'RGB(3, 152, 158)',
	'RGB(0, 194, 203)',
	'RGB(92, 225, 230)',
	'RGB(56, 182, 255)',
	'RGB(82, 113, 255)',
	'RGB(0, 74, 173)',
	'RGB(0, 128, 55)',
	'RGB(126, 217, 87)',
	'RGB(201, 226, 101)',
	'RGB(255, 222, 89)',
	'RGB(255, 189, 89)',
	'rgb(124,252,0)',
	'RGB(255, 145, 77)'
];

export const CitiesGrantsGraph: React.FC = memo(() => {
	const totalValue = cityData.reduce((total, city) => total + city.value, 0);

	const sortedData = [...cityData].sort((a, b) => b.value - a.value);
	const topCities = sortedData.slice(0, 5);
	const otherValue = sortedData.slice(5).reduce((total, city) => total + city.value, 0);
	const modifiedData = [...topCities, { name: "Other", value: otherValue }];

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
				borderRadius: "30px",
			}}
		>
			<Box
				display="flex"
				justifyContent={"space-between"}
				flexWrap={"nowrap"}
				margin={"0 20px"}
			>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					Статистика по городам
				</Typography>
			</Box>
			<div style={{ margin: '20px', height: '450px' }}>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={modifiedData}
							dataKey="value"
							nameKey="name"
							innerRadius={60}
							outerRadius={80}
							paddingAngle={5}
						>
							{cityData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
							))}
						</Pie>
						<Tooltip formatter={(value) => `${value} (${((value as number / totalValue) * 100).toFixed(2)}%)`} />
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
				{topCities.map((city, index) => (
					<div key={`legend-${index}`} style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
						<div style={{ width: "12px", height: "12px", backgroundColor: colors[index] }} />
						<Typography style={{ marginLeft: "5px" }}>{city.name}</Typography>
					</div>
				))}
				<div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
					<div style={{ width: "12px", height: "12px", backgroundColor: "gray" }} />
					<Typography style={{ marginLeft: "5px" }}>Other</Typography>
				</div>
			</div>
		</Card>
	);
});

CitiesGrantsGraph.displayName = "CitiesGrantsGraph";
