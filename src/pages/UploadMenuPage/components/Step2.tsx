import React from "react";

import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

import { MenuType } from "../generator";
import { Step2Props } from "../types";

export const Step2: React.FC<Step2Props> = ({ handleChange, state }) => {
  return (
    <div style={{
      margin: "auto 0",
      width: "100%",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <Typography fontSize="24px" fontWeight="600">Выберите тип меню</Typography>
      <Box marginTop="20px" />
      <RadioGroup
        name="menuType"
        onChange={handleChange}
        value={state.menuType}
      >
        <FormControlLabel value={MenuType.GLOVO} control={<Radio />} label={MenuType.GLOVO} />
        <FormControlLabel value={MenuType.WOLT} control={<Radio />} label={MenuType.WOLT} />
        <FormControlLabel value={MenuType.YANDEX} control={<Radio />} label={MenuType.YANDEX} />
      </RadioGroup>
    </div>
  );
};