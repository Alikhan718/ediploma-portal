import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

import { ReactComponent as DonedIcon } from '@src/assets/icons/done.svg';
import { ReactComponent as DownloadIcon } from '@src/assets/icons/downloadIcon.svg';
import { Step1Props } from "../types";



export const Step1: React.FC<Step1Props> = ({ state, uploadedMenu, uploadMenuLoader, handleChange }) => {
  return (
    <div style={{ margin: "auto 0", justifyContent: "center", flexDirection: "column" }}>
      <Typography fontSize="24px" fontWeight="600">Загрузите файл меню (Glovo, Wolt)</Typography>
      <Typography fontSize="16px" color="#656665">Инструкция по тому как найти этот файл</Typography>
      <Box marginTop="20px" />
      <Box width="100%" borderRadius={2} border="1px solid #333" justifyContent="center" alignContent="center">
        <label
          style={{
            cursor: "pointer",
            display: "flex",
            textAlign: 'center',
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem"
          }}
          htmlFor="upload-file">
          {state.file ? <DonedIcon /> : <DownloadIcon />}
          <Typography ml={2} fontSize="20px" fontWeight={600} display="flex" alignItems="center">
            {uploadedMenu.length ? "Файл загружен" : "Загрузить файл меню"}
            {uploadMenuLoader ? <CircularProgress /> : null}
          </Typography>
        </label>

        <input
          disabled={uploadMenuLoader}
          id="upload-file"
          style={{ display: "none", position: "absolute", left: 0 }}
          name="file"
          type="file"
          accept="application/JSON, .xlsx, .xls,"
          required
          onChange={handleChange}
        />
      </Box>

    </div>
  );
};