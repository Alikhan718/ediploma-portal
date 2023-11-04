import React, { memo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
	Box,
	Card,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import { ReactComponent as DotIcon } from "@src/assets/icons/Dots.svg";
Chart.register(...registerables);

// eslint-disable-next-line react/display-name
export const GrantsGraph: React.FC = memo(() => {
	return (
		<Card
			elevation={6}
			sx={{
				width: "98%",
				marginRight: "2%",
				maxWidth: 352,
				padding: "20px 0",
				display: "flex",
				flexDirection: "column", borderRadius: '30px'
			}}
		>
			<Box display="flex" justifyContent={"space-between"} flexWrap={"nowrap"} margin={"0 20px"}>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					Статистика по грантам
				</Typography>
				<Box display="flex" flexDirection={"row"} alignItems={"center"}>

				</Box>
			</Box>
			<div style={{ margin: '20px' }}>
				<Pie
					data={{
						labels: [
							'Грант покредитно',
							'Договор кредитный',
							'Договор фиксированный',
						],
						datasets: [
							{
								label: 'Аналитика по количеству грантов',
								data: [452, 68, 34],
								backgroundColor: [
									'rgb(0, 255, 255, 0.6)',
									'rgb(255, 255, 0, 0.6)',
									'rgb(0, 255, 0, 0.6)',
								],
							},
						],
					}}
					options={{
						maintainAspectRatio: false,
						plugins: {
							legend: {
								display: false,
								position: 'left',
							},
							tooltip: {
								callbacks: {
									label: (context) => {
										const labelIndex = context.dataIndex;
										const faculty = [
											'Грант покредитно',
											'Договор кредитный',
											'Договор фиксированный',
										];
										const studentCount = [452, 68, 34];
										const averageGPA = [3.13, 2.68, 2.99];
										return `${faculty[labelIndex]}: ${studentCount[labelIndex]} students, Avg. GPA: ${averageGPA[labelIndex]}`;
									},
								},
							},
						},
					}}
				/>
			</div>
		</Card>
	);
});
