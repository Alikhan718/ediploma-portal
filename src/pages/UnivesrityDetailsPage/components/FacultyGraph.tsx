import React, { memo } from "react";
import {
	Box,
	Card,
	Typography,
} from "@mui/material";
import { ReactComponent as DotIcon } from "@src/assets/icons/Dots.svg";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import facultyData from "./data/faculty.json";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from '@src/store/generals/selectors';
import { localization } from "../generator";

// eslint-disable-next-line react/display-name
export const FacultyGraph: React.FC = memo(() => {
	const lang = useSelector(selectLanguage);
	const data = facultyData;

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
					{localization[lang].Analytics.kbtu.faculty}
				</Typography>
			</Box>
			<Box sx={{ maxWidth: 974, width: "100%", margin: "0 auto" }}>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart

						data={data}
						margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="students" fill="rgb(234, 85, 69,0.7)" />
						<Bar dataKey="avgGPA" fill="rgb(244, 106, 155,0.7)" />
					</BarChart>
				</ResponsiveContainer>
			</Box>
		</Card >
	);
});

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