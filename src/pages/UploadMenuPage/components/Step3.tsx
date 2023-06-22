import React from "react";

import { Box, Typography } from "@mui/material";

import { Input } from "@src/components";
import { Step3Props } from "../types";

export const Step3: React.FC<Step3Props> = ({ state, handleChange }) => {
  return (
    <div style={{ margin: "auto 0", justifyContent: "center", flexDirection: "column" }}>
      <Typography fontSize="24px" fontWeight="600">Укажите название
        меню</Typography>
      <Box marginTop="20px" />
      <Box>
        <Input name="menuName" label="Название меню в системе Kwaaka" value={state.menuName}
          onChange={handleChange}
          fullWidth />
      </Box>
    </div>
  );
}; 