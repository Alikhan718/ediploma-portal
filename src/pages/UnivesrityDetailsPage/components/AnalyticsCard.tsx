import React from 'react';
import { Card, Box, Typography, LinearProgress } from "@mui/material";
import { ReactComponent as UserIcon } from "@src/assets/icons/ic32-user.svg";

interface AnalyticsCardProps {
  text: string;
  number: number;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ text, number }) =>  (
    <Card
      sx={{
        minWidth: 300,
        height: 118,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={3}
    >
      <Box display="flex" justifyContent={"space-between"}>
        <Typography fontSize="1.2rem" fontWeight="600">
          {number}
        </Typography>
        <UserIcon />
      </Box>
      <Box display="flex" flexDirection={"column"} gap="10px">
        <Typography fontSize="1rem">{text}</Typography>
        <LinearProgress variant="determinate" value={50} />
      </Box>
    </Card>
  );
