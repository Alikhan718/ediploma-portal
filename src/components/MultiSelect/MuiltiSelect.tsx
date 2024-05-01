import {
  Autocomplete,
  Box,
  Chip,
  TextField
}
  from "@mui/material";
import React from "react";
import {MuiltiSelectProps} from "./MuiltiSelect.props";
import {ReactComponent as CloseRedIcon} from "@src/assets/icons/close_red.svg";

export const MultiSelect: React.FC<MuiltiSelectProps> = (props) => {
    const {options, innerLabel, handleChange, defaultValues, additionalDelete, ...otherProps} = props;
    const [state, setState] = React.useState<Array<any>>(defaultValues ?? []);
    console.log(state);
    const [innerOptions, setOptions] = React.useState<Array<any>>(options ?? []);
    const onChange = (e: any): void => {
      // Your existing logic here
      const item = e.target.innerHTML;
      e.target.innerHTML = '';
      if (item.trim().length && !item.includes("path") && state.length < 15) {
        const newVal = state.indexOf(item) === -1 ? [item, ...state] : state;
        setState(newVal);
        handleChange({
          target: {
            value: newVal,
            name: props.name
          }
        });
      }
    };

    const onKeyDown = (e: any): void => {
      if (e.code == "Enter" && e.target.value.trim().length) {
        setOptions([...innerOptions, e.target.value]);
      }
    };

    const handleDelete = (item: any): void => {
      const newVal = state.filter((el) => el !== item);
      setState(newVal);
      handleChange({
        target: {
          value: newVal,
          name: props.name
        }
      });
      additionalDelete ? additionalDelete() : null;
    };

    return (
      <React.Fragment>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={innerOptions.filter((el) => !state.includes(el))}

          // sx={{borderRadius: "2.5rem !important", backgroundColor: "red"}}
          onChange={onChange}
          onKeyDown={onKeyDown}
          clearOnBlur
          multiple
          renderTags={() => null}
          renderInput={(params) => <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: "1rem",
              },
            }}
            {...params} label={innerLabel}
          />}
        />
        <Box mt=".5rem" display="flex" gap=".5rem" flexWrap="wrap">
          {state.length
            ? state.map((item) => (
              <Chip
                label={item}
                key={item}
                onClick={() => handleDelete(item)}
                onDelete={() => handleDelete(item)}
                draggable={true}
                deleteIcon={<CloseRedIcon
                  style={{marginLeft:"auto", width: "1.7rem", paddingRight:".5rem", height: "1.2rem"}}/>}
                style={{
                  width: "100%",
                  padding: "1.5rem 0rem",
                  backgroundColor: "#f1f1f1",
                  whiteSpace: "break-spaces"
                }}
                sx={{
                  ".MuiChip-label" : {
                    textAlign: "center",
                    width: "100%",
                  }
                }}
              />
            ))
            : null}
        </Box>
      </React.Fragment>
    );
  }
;
