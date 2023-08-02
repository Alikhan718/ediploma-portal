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
      }}
    >
      <Box display="flex" justifyContent={"space-between"} flexWrap={"wrap"}margin={"0 20px"}>
        <Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
          Аналитика дипломных оценок
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
                data = {{
                    labels:['50-60','60-70','70-80','80-90','90-100'],
                    datasets: [{
                        label:'Diploma grade',
                        data:[2.72,
                            2.77,
                            2.85,
                            2.96,
                            3.21,
                            ],
                            backgroundColor:[
                                'rgb(255, 165, 0,0.5)',
                                'rgb(128, 128, 128,0.5)',
                                'rgb(0, 255, 255,0.5)',
                                'rgb(0, 255, 0,0.5)',
                                'rgb(255, 0, 0,0.5)'
                            ],
                            borderColor:[
                                'rgb(255, 160, 0,1)',
                                'rgb(128, 143, 128,1)',
                                'rgb(0, 240, 255,1)',
                                'rgb(0, 240, 0,1)',
                                'rgb(255, 15, 0,1)'
                            ],
                            borderWidth: 1,
                    }],
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
                            const faculty = ['50-60','60-70','70-80','80-90','90-100'];
                            const averageGPA = [2.72,
                                2.77,
                                2.85,
                                2.96,
                                3.21,
                                ];
                            const count = [
                              13,
                              51,
                              92,
                              402,
                              303,                             
                            ]
                            return `${faculty[labelIndex]}:  Avg. GPA: ${averageGPA[labelIndex]}, number of students: ${count[labelIndex]}`;
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
