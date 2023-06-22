import React, { Fragment } from "react";

import { Box, FormControlLabel, Typography, Switch } from "@mui/material";

import styles from './DropDown.module.css';
import { ReactComponent as ArrowDown } from '@src/assets/icons/arrowDown.svg';
import { ReactComponent as EditIcon } from '@src/assets/icons/edit.svg';
import { Button } from "../Button/Button";
import { DropDownProps } from "./DropDown.props";


export const DropDown: React.FC<DropDownProps> = ({ aggregatorData, handleIntegrationChange, handleAddAggregator }) => {
  const ref: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [integrations, setIntegration] = React.useState(aggregatorData);

  const handleTitle = (): void => setOpen(prev => !prev);
  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleIntegrationChange({
      delivery_service: e.target.name,
      send_to_pos: e.target.checked
    });
    setIntegration(
      integrations.map((el: any) => {
        if (el.delivery_name === e.target.name) {
          return { delivery_name: e.target.name, is_integrated: e.target.checked };
        }
        return el;
      })
    );
  };
  React.useEffect(() => {
    function handleClickOutside(e: any): void {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  React.useEffect(() => {
    setIntegration(aggregatorData);
  }, [aggregatorData]);

  const aggregatorLength = aggregatorData ? aggregatorData.length : 0;
  return (
    <Box ref={ref} className={styles.dropDown}>
      <Box className={styles.title} onClick={handleTitle} style={{ background: open ? "#E8E8E9" : "#fff" }}>
        <Typography>{aggregatorLength} Integration</Typography>
        <Box sx={{ transition: "all .3s ease" }} className={open ? styles.arrowIcon : styles.arrowDown}><ArrowDown /></Box>
      </Box>
      {open ?
        <Fragment>
          <ul className={styles.ul} >
            {integrations ? integrations.map((el: any) => (
              <li key={el.delivery_name} className={styles.li}>
                <FormControlLabel
                  label={el.delivery_name}
                  control={
                    <Switch
                      name={el.delivery_name}
                      checked={el.is_integrated}
                      onChange={handleChangeSwitch} />
                  }
                />
                <EditIcon />
              </li>
            )) : null}
            <Button
              sx={{ fontSize: '13px' }}
              fullWidth
              variant="contained"
              color="success"
              buttonSize="m"
              onClick={handleAddAggregator}
            >
              + Добавить агрегатор
            </Button>

          </ul>

        </Fragment>
        : null}
    </Box>
  );
};