import React, { memo } from "react";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import { ReactComponent as DotIcon } from "@src/assets/icons/Dots.svg";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
} from "recharts";
import genderData from "./data/gender.json"; // Import the JSON data

// eslint-disable-next-line react/display-name
export const GenderGraph: React.FC = memo(() => {

	const data = genderData;

	return (
		<Card
			elevation={6}
			sx={{
				width: "98%",
				marginRight: "2%",
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				borderRadius: "30px",
			}}
		>
			<Box display="flex" justifyContent={"space-between"} flexWrap={"wrap"}>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					Межгендерная аналитика по факультетам
				</Typography>
			</Box>
			<Box sx={{ width: "100%", margin: "0 auto" }}>
				<BarChart
					width={1000}
					height={300}
					data={data}
					margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="male" fill="rgba(54, 162, 235, 0.5)" name="Male" />
					<Bar dataKey="female" fill="rgba(255, 99, 132, 0.5)" name="Female" />
				</BarChart>
			</Box>
		</Card>
	);
});
