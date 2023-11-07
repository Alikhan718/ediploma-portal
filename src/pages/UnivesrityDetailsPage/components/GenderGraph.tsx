import React, { memo } from "react";
import { Bar } from "react-chartjs-2";
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
export const GenderGraph: React.FC = memo(() => {
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
				flexDirection: "column", borderRadius: '30px'
			}}
		>
			<Box display="flex" justifyContent={"space-between"} flexWrap={"wrap"} margin={"0 20px"}>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					Межгендерная аналитика по факультетам
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
				<Bar
					data={{
						labels: ['БШ', 'КМА', 'МШЭ', 'ШГ', 'ШИТИ',
							'ШПМ', 'ШХИ', 'ШЭНИ'],
						datasets: [
							{
								label: 'Male',
								data: [3.01,
									2.69,
									2.84,
									2.99,
									3.08,
									3.02,
									3.26,
									2.94,
								], // Update with the respective male counts for each faculty
								backgroundColor: 'rgba(54, 162, 235, 0.5)',
								borderColor: 'rgba(54, 162, 235, 1)',
								borderWidth: 1,
							},
							{
								label: 'Female',
								data: [3.04,
									2.83,
									2.9,
									3.07,
									3.21,
									3.18,
									3.29,
									3.27,],
								backgroundColor: 'rgba(255, 99, 132, 0.5)',
								borderColor: 'rgba(255, 99, 132, 1)',
								borderWidth: 1,
							}],
					}}
					height={300}
					width={50}
					options={{
						maintainAspectRatio: false,
						scales: {
							x: {
								grid: {
									display: false,
								},
							},
						},
					}}
				/>
			</Box>
		</Card>
	);
});
