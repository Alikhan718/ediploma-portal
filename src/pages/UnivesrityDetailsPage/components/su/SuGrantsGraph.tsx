import React from "react";
import {
	PieChart,
	Pie,
	Tooltip,
	Cell,
	ResponsiveContainer,
	Legend
} from "recharts";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import datachart from './data/study.json';
import { localization } from '@src/pages/UnivesrityDetailsPage/generator';
import { selectLanguage } from '@src/store/generals/selectors';
import { useSelector } from "react-redux";

const dats = datachart.data;

const COLORS = [
  'rgb(0, 255, 255, 0.6)',
  'rgb(255, 255, 0, 0.6)',
  'rgb(0, 255, 0, 0.6)',
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip:React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          <p>Study mode: {data.Study_mode}</p>
          <p>Number of students: {data.Number}</p>
          <p>Average GPA:{data.Avg_GPA} </p>
        </div>
      </div>
    );
  }

  return null;
};


// eslint-disable-next-line react/display-name
export const SuGrantsGraph: React.FC = () => {
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
				height: 500
			}}
		>
			<Box display="flex" justifyContent={"space-between"} flexWrap={"nowrap"} margin={"0 20px"}>
				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
					{localization[lang].Analytics.grants}
				</Typography>
				<Box display="flex" flexDirection={"row"} alignItems={"center"}>
				</Box>
			</Box>
			<div style={{ margin: '20px' }}>
				<ResponsiveContainer width="100%" height={250}>
				  <PieChart>
					<Pie
					  data={dats} // Use dats as the data source
					  dataKey="Number" // Use "Number" as the dataKey
					  nameKey="Study_mode" // Use "Study_mode" as the nameKey
					  cx="50%"
					  cy="50%"
					  outerRadius={60}
					  fill="#8884d8"
					>
					  {dats.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index]} />
					  ))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
					<Legend verticalAlign="bottom" height={36}  />
				  </PieChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
};
