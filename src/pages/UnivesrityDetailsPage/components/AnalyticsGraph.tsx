import React, { memo } from "react";
import { Line } from "react-chartjs-2";
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
export const AnalyticsGraph: React.FC = memo(() => {
	const [facultyFilter, setFacultyFilter] = React.useState("");

	const handleFacultyChange = (event: SelectChangeEvent) => {
		setFacultyFilter(event.target.value);
	};

	return (
		<Card
			elevation={6}
			sx={{
				width: "98%",
				marginRight: "2%",
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				borderRadius: '30px'
			}}
		>
			<Box display="flex" justifyContent={"space-between"} flexWrap={"wrap"} margin={"0 20px"}>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					Аналитика
				</Typography>
				{/* <Box display="flex" flexDirection={"row"} alignItems={"center"}>
          <Typography color={"#475569"} fontSize={"1.25rem"}>
            Сортировать по:
          </Typography>
          <Select
            value={facultyFilter}
            sx={{
              height: 20,
              width: 110,
              ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            onChange={handleFacultyChange}
          >
            <MenuItem value="" selected>
              Годам
            </MenuItem>
            <MenuItem value={1}>Гпа</MenuItem>
          </Select>
          <DotIcon />
        </Box> */}
			</Box>
			<Box sx={{ maxWidth: 974, width: "100%", margin: "0 auto" }}>
				<Line
					data={{
						labels: ["БШ", "КМА", "МШЭ", "ШГ", "ШИТИ", "ШПМ", "ШХИ", "ШЭНИ"],
						datasets: [{
							label: 'Средний GPA:3.1',
							data: [2.12, 2.74, 2.37, 2.81, 2.85, 2.60, 2.96, 2.54, 2.9, 3.5, 2.2, 3.08, 3.21
							],
							backgroundColor: [
								'rgb(0,0,255,0.2)',
								'rgb(128, 128, 128,0.5)',
							],
							borderColor: [
								'rgb(50, 111, 209)',
								'rgb(128, 143, 128,1)',
							],
							borderWidth: 1, tension: 0.4,
							pointRadius: 0,
							fill: true,
						},
						{
							label: 'Diploma grade rate:3.8', // Label for the new dataset
							data: [3.4, 2.8, 3.2, 3.6, 3.5, 2.9, 2.8, 3.7, 3.8], // Your GPA data here
							borderColor: 'rgb(245, 118, 134)', // Color for the GPA line
							borderWidth: 2,
							tension: 0.4,
							pointRadius: 0,
							fill: true,
							backgroundColor: 'rgba(255, 0, 0, 0.2)',
						},
						],
					}}
					height={300}
					width={50}
					options={{
						maintainAspectRatio: false,
						plugins: {
							tooltip: {
								callbacks: {
									label: (context) => {
										const labelIndex = context.dataIndex;
										const faculty = ['50-60', '60-70', '70-80', '80-90', '90-100'];
										const averageGPA = [2.72, 2.74, 2.77, 2.81, 2.85, 2.90, 2.96, 2.54, 2.9, 3.5, 2.2, 3.08, 3.21];
										const count = [
											13,
											51,
											92,
											402,
											303,
										]
										const gpaData = [3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8];
										return `${faculty[labelIndex]}:  Avg. GPA: ${averageGPA[labelIndex]},  Avg. Diplom GPA: ${gpaData[labelIndex]},number of students: ${count[labelIndex]}`;
									},
								},
							},
						},
						scales: {
							x: {
								grid: {
									display: false, // Remove vertical grid lines
								},
							},
						},
					}}
				/>
			</Box>
		</Card>
	);
});
