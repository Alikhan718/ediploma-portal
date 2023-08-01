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
export const FacultyGraph: React.FC = memo(() => {
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
      }}
    >
      <Box display="flex" justifyContent={"space-between"} flexWrap={"wrap"}>
        <Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
          Аналитика по факультетам
        </Typography>
        <Box display="flex" flexDirection={"row"} alignItems={"center"}>
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
        </Box>
      </Box>
      <Box sx={{maxWidth: 974, width: "100%", margin: "0 auto"}}>
        <Bar
          data={{
            labels: ["БШ", "КМА", "МШЭ", "ШГ", "ШИТИ", "ШПМ", "ШХИ", "ШЭНИ"],
            datasets: [
              {
                label: "test",
                data: [3.03, 2.72, 2.88, 3.0, 3.13, 3.11, 3.28, 3.03],
                backgroundColor: [
                  "rgb(234, 85, 69,0.7)",
                  "rgb(244, 106, 155,0.7)",
                  "rgb(239, 155, 32,0.7)",
                  "rgb(237, 191, 51,0.7)",
                  "rgb(237, 225, 91,0.7)",
                  "rgb(189, 207, 50,0.7)",
                  "rgb(135, 188, 69,0.7)",
                  "rgb(39, 174, 239,0.7)",
                ],
                borderColor: [
                  "rgb(234, 105, 69)",
                  "rgb(244, 126, 155)",
                  "rgb(239, 175, 32)",
                  "rgb(237, 211, 51)",
                  "rgb(237, 245, 91)",
                  "rgb(189, 227, 50)",
                  "rgb(135, 208, 69)",
                  "rgb(39, 194, 239)",
                ],
                borderWidth: 1,
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
                    const faculty = [
                      "Бизнес Школа",
                      "Казахстанская морская академия",
                      "Международная школа экономики",
                      "Школа геологии",
                      "Школа информационных технологий и инженерии",
                      "Школа прикладной математики",
                      "Школа химической инженерии",
                      "Школа энергетики и нефтегазовой индустрии",
                    ];
                    const studentCount = [78, 23, 42, 18, 239, 28, 34, 92];
                    const averageGPA = [
                      3.03, 2.72, 2.88, 3.00,
                      3.13, 3.11, 3.28, 3.03,
                    ];
                    return `${faculty[labelIndex]}: ${studentCount[labelIndex]} students, Avg. GPA: ${averageGPA[labelIndex]}`;
                  },
                },
              },
            },
          }}
        />
      </Box>
    </Card>
  );
});
