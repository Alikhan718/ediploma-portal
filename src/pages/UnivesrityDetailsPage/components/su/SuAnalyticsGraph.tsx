import React, {memo} from "react";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import datachart from './data/diploma.json';
import './chart.css';

const dats = datachart.data;

const COLORS = [
    'rgb(255, 165, 0,0.5)',
    'rgb(128, 128, 128,0.5)',
    'rgb(0, 255, 255,0.5)',
    'rgb(0, 255, 0,0.5)',
    'rgb(255, 0, 0,0.5)'
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
            <p>Study mode: {data.Diploma_grade}</p>
            <p>Number of students: {data.Students_number}</p>
            <p>Average GPA: {data.Avg_GPA}</p>
          </div>
        </div>
      );
    }

    return null;
};

// eslint-disable-next-line react/display-name
export const SuAnalyticsGraph: React.FC = memo(() => {
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
			 <ResponsiveContainer width="100%" height={400}>
				<BarChart
				  width={500}
          height={300}
          data={dats}
        >
          <XAxis dataKey="Faculty"  />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Avg_GPA" fill={COLORS[0]}>
            {dats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
        </ResponsiveContainer>
			</Box>
		</Card>
	);
});
