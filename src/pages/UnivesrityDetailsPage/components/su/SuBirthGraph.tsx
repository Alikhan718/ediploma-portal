import React from "react";
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
import datachart from './data/birth.json';

const dats = datachart.data;

dats.sort((a, b) => b.Number - a.Number);

const top4Data = dats.slice(0, 3);
const othersData = dats.slice(3);

const othersTotal = othersData.reduce((sum, data) => sum + data.Number, 0);
// Correcting the average GPA calculation for "Others"
const average_gpa = othersData.reduce((sum, data) => sum + data.Avg_GPA * data.Number, 0) / othersTotal;

const othersPoint = {
  Nation: 'Others',
  Number: othersTotal,
  Avg_GPA: average_gpa.toFixed(2), // Assuming Avg_GPA is the correct key in your JSON data
};

// Combine the top 4 data points with "Others"
const combinedData = [...top4Data, othersPoint];

const COLORS = [
  'RGB(255, 22, 22)',
  'RGB(255, 87, 87)',
  'RGB(255, 102, 196)',
  'RGB(203, 108, 230)',
  'RGB(140, 82, 255)',
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip:React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>Birth: {data.Birth}</p>
          <p>Number of students: {data.Number}</p>
          <p>Average GPA: {data.Avg_GPA}</p>
        </div>
      );
  }

  return null;
};


// eslint-disable-next-line react/display-name
export const SuBirthGraph: React.FC = () => {
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
					Статистика по дате рождения
				</Typography>
				<Box display="flex" flexDirection={"row"} alignItems={"center"}>
				</Box>
			</Box>
			<div style={{ margin: '20px' }}>
  			<ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={combinedData}
              dataKey="Number" // Corrected from Students_number to Number
              nameKey="BirthYear"
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
			</div>
		</Card>
	);
};
