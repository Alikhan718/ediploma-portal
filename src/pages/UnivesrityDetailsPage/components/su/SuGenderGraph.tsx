import React, { memo } from "react";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import datachart from './data/gender.json';

const dats = datachart.data;

// Sort data by the number of students in descending order
dats.sort((a, b) => b.Students_number - a.Students_number);

// Use the sorted data directly without creating an "Others" category
const combinedData = [...dats];

const COLORS = [
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 99, 132, 0.5)',
  // 'RGB(0, 128, 55)',
  // 'RGB(126, 217, 87)',
  // 'RGB(201, 226, 101)',
  // // Add more colors if needed to cover all data points
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          <p>Study mode: {data.Faculty}</p>
          <p>Number of students: {data.Students_number}</p>
          <p>Average GPA: {data.Avg_gpa}</p>
        </div>
      </div>
    );
  }

  return null;
};

// eslint-disable-next-line react/display-name
export const SuGenderGraph: React.FC = memo(() => {


	return (
		<Card
			elevation={6}
			sx={{
				width: "95%",
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
			  <ResponsiveContainer width="100%" height={400}>
					<PieChart>
          <Pie
            data={combinedData}
            dataKey="Students_number"
            nameKey="Faculty"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          >
            {combinedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
			</Box>
		</Card>
	);
});
