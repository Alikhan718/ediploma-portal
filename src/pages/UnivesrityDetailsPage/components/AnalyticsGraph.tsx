import React, { memo, useEffect, useState } from "react";
import {
	Box,
	Card,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import analyticsData from "./data/analytic.json";
// eslint-disable-next-line react/display-name
export const AnalyticsGraph: React.FC = memo(() => {
	const [facultyFilter, setFacultyFilter] = React.useState("");

	const handleFacultyChange = (event: SelectChangeEvent) => {
		setFacultyFilter(event.target.value);
	};

	const data = analyticsData;

	return (
		<Card
			elevation={6}
			sx={{
				width: "95%",
				marginRight: "2%",
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				borderRadius: "2rem"
			}}
		>
			<Box display="flex" justifyContent={"space-between"} flexWrap={"wrap"} margin={"0 20px"}>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					Аналитика дипломных оценок
				</Typography>
			</Box>
			<Box sx={{ maxWidth: 974, width: "100%", margin: "0 auto" }}>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<XAxis dataKey="name" />
						<YAxis />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip formatter={(value, name) => `${name}: Avg. GPA: ${value}`} />
						<Bar dataKey="averageGPA" name="Avg. GPA" fill="rgb(0, 240, 0, 0.5)" />
					</BarChart>
				</ResponsiveContainer>
			</Box>
		</Card>
	);
});
