import { styled, TextField } from "@mui/material";
import React from "react";
import { TexttFieldSelectProps } from "./TextFieldSelect.props";

const StyledTextField = styled(TextField)({
  backgroundColor: "#fff",
  borderRadius: "10px",
  outline: "none",
  border: 0,
  '& .MuiOutlinedInput-input': {
    padding: 5
  },
  '& .MuiInput-underline:after': {
    border: "none"
  },
  '& .MuiOutlinedInput-root': {
    fontWeight: 600,
    margin: 0,
    '& fieldset': {
      border: "none",

    },
    '&:hover fieldset': {
      border: "none"
    },
    '&.Mui-focused fieldset': {
      border: "none"
    },
  },
});

export const TextFieldSelect: React.FC<TexttFieldSelectProps> = (props) => {
  return (
    <StyledTextField {...props}>
      {props.children}
    </StyledTextField>
  );
};