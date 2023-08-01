import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";
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
export const CitiesGrantsGraph: React.FC = memo(() => {
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
      }}
    >
      <Box display="flex" justifyContent={"space-between"}  flexWrap={"nowrap"} margin={"0 20px"}>
        <Typography fontWeight={600} color={"#475569"} fontSize={"1.25rem"}>
          Статистика по городам
        </Typography>
        <Box display="flex" flexDirection={"row"} alignItems={"center"}>
          <DotIcon />
        </Box>
      </Box>
      <div style={{margin: '20px'}}>
            <Doughnut
                data = {{
                    labels:['Не указано', 'Акмолинская', 'Актобе', 'Алматы', 'Астана', 'Атырау', 'Вос-Казахстана(не перечислененные ранее)', 'Жамбыл', 'Зап-Казахстана(не перечислененные ранее)',
                            "Караганда", "Костанай", "Кызылорда", "Мангыстау", "Павлодар","Тараз","Туркестан","Шымкент"],
                    datasets: [{
                        label:'Аналитика по городам',
                        data:[300,
                            2,
                            2,
                            5,
                            21,
                            157,
                            9,
                            16,
                            3,
                            2,
                            6,
                            4,
                            4,
                            2,
                            9,
                            4,
                            1,
                            1,
                            6
                            ],
                        backgroundColor: [
                                'RGB(255, 22, 22)',
                                'RGB(255, 87, 87)',
                                'RGB(255, 102, 196)',
                                'RGB(203, 108, 230)',
                                'RGB(140, 82, 255)',
                                'RGB(94, 23, 235)',
                                'RGB(3, 152, 158)',
                                'RGB(0, 194, 203)',
                                'RGB(92, 225, 230)',
                                'RGB(56, 182, 255)',
                                'RGB(82, 113, 255)',
                                'RGB(0, 74, 173)',
                                'RGB(0, 128, 55)',
                                'RGB(126, 217, 87)',
                                'RGB(201, 226, 101)',
                                'RGB(255, 222, 89)',
                                'RGB(255, 189, 89)',
                                'rgb(124,252,0)',
                                'RGB(255, 145, 77)'
                            ],
                    }],
                }}
                options={{
                    maintainAspectRatio:false,
                    plugins:{
                        legend:{
                            display:true,
                            position: 'left',
                        }
                    }
                }}
            />
           </div>
    </Card>
  );
});
