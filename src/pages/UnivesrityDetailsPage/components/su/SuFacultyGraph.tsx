import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import datachart from "./data/faculty.json";
import './chart.css';
interface Data {
  ShortName: string;
  Faculty: string;
  Male: number;
  Female: number;
  Male_GPA: number;
  Female_GPA: number;
  TotalStudents: number;
}
import { localization } from '@src/pages/UnivesrityDetailsPage/generator';
import { selectLanguage } from '@src/store/generals/selectors';
import { useSelector } from "react-redux";

const getShortName = (facultyName: string) => {
    return facultyName.split(' ').map(word => word[0]).join('').toUpperCase();
};

const dats: Data[] = datachart.data.map(item => ({
    ...item,
    ShortName: getShortName(item.Faculty), // Adding a short name field
    TotalStudents: item.Male + item.Female,
}));

let sortedData: Data[] = dats
  .map((item) => ({ ...item, TotalStudents: item.Male + item.Female }))
  .sort((a, b) => b.TotalStudents - a.TotalStudents);

let top10Data = sortedData.slice(0, 10);

let others: Data = sortedData.slice(10).reduce<Data>(
  (acc, curr) => ({
      ShortName: "Others",
    Faculty: "Others",
    Male: acc.Male + curr.Male,
    Female: acc.Female + curr.Female,
    Male_GPA: +(
      (acc.Male_GPA * acc.Male + curr.Male_GPA * curr.Male) /
      (acc.Male + curr.Male)
    ).toFixed(2),
    Female_GPA: +(
      (acc.Female_GPA * acc.Female + curr.Female_GPA * curr.Female) /
      (acc.Female + curr.Female)
    ).toFixed(2),
    TotalStudents: acc.TotalStudents + curr.TotalStudents,
  }),
  {
      ShortName: 'Others',
    Faculty: "Others",
    Male: 0,
    Female: 0,
    Male_GPA: 0,
    Female_GPA: 0,
    TotalStudents: 0,
  },
);

if (sortedData.length > 10) {
  top10Data.push(others);
}

const COLORS = ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: Data }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          <p>Speciality: {data.Faculty}</p>
          <p>Number of male students: {data.Male}</p>
          <p>Average GPA: {data.Male_GPA}</p>
          <p>Number of female students: {data.Female}</p>
          <p>Average GPA: {data.Female_GPA}</p>
        </div>
      </div>
    );
  }

  return null;
};

export const SuFacultyGraph: React.FC = () => {
  const lang = useSelector(selectLanguage);
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
                height: 500
  			}}
  		>
  			<Box display="flex" justifyContent={"space-between"} flexWrap={"wrap"}>
  				<Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
                    {localization[lang].Analytics.kbtu.gender}
  				</Typography>
  			</Box>
  			<Box sx={{ maxWidth: 974, width: "100%", margin: "0 auto" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart width={700} height={300} data={top10Data}>
              <XAxis dataKey="ShortName" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Male_GPA" fill={COLORS[0]}></Bar>
              <Bar dataKey="Female_GPA" fill={COLORS[1]}></Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>
  );
};
