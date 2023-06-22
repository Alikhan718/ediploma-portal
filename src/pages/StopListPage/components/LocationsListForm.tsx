import React from "react";

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

import { LocationsListFormProps } from "../types";
import { ReactComponent as LocationIcon } from '@src/assets/icons/LocationIcon.svg';
import { ReactComponent as EmptyBox } from '@src/assets/icons/emptyBox.svg';
import styles from './LocationsListForm.module.css';
import { aggregator_positions } from "./data";


export const LocationsListForm: React.FC<LocationsListFormProps> = ({ productStores, state, setState }) => {


  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked && productStores) {

      const obj: { [key: string]: Set<string> } = {};

      for (const item of productStores) {
        obj[item.restaurant_id] = new Set(item?.aggregators?.map((el: any) => el.delivery_name));
      }

      setState(obj);

    } else {
      setState({});
    }

  };

  const handleSelectAllDelivery = (e: React.ChangeEvent<HTMLInputElement>, delivery_name: string): void => {
    if (e.target.checked && productStores) {

      const obj: { [key: string]: Set<string> } = { ...state };
      for (const item of productStores) {

        if (item?.aggregators.some((el: any) => el.delivery_name === delivery_name)) {

          obj[item?.restaurant_id] = new Set([delivery_name, ...Array.from(state[item?.restaurant_id] || [])]);
        }
      }

      setState(obj);

    } else {
      const obj = { ...state };
      for (const item of productStores ?? []) {

        const copy_set = obj[item?.restaurant_id] || new Set();
        if (copy_set.has(delivery_name)) {
          copy_set.delete(delivery_name);
        }
        obj[item.restaurant_id] = copy_set;

      }

      setState(obj);
    }
  };

  // 

  const handleSelectDelivery = (e: React.ChangeEvent<HTMLInputElement>, resti_id: string, delivery_name: string): void => {
    if (e.target.checked) {

      const set = state[resti_id] || new Set();
      set.add(delivery_name);
      setState({
        ...state,
        [resti_id]: set
      });
    } else {
      const set = state[resti_id];
      set.delete(delivery_name);
      setState({
        ...state,
        [resti_id]: set
      });
    }

  };

  return (
    <React.Fragment>
      {/* LOCATIONS */}
      <Box mt="40px" width="100%">
        <table width="100%" style={{ textAlign: "left" }}>
          <thead>
            <tr>
              <td><FormControlLabel control={<Checkbox onChange={handleSelectAll} />} label="Выбрать Все" /></td>
              <td className={styles.td}><FormControlLabel control={<Checkbox onChange={(e): void => handleSelectAllDelivery(e, "glovo")} />} label="Glovo Все" /></td>
              <td className={styles.td}><FormControlLabel control={<Checkbox onChange={(e): void => handleSelectAllDelivery(e, "wolt")} />} label="Wolt Все" /></td>
              <td className={styles.td}><FormControlLabel control={<Checkbox onChange={(e): void => handleSelectAllDelivery(e, "yandex")} />} label="Yandex Все" /></td>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {productStores?.map((resti, i) => <tr key={i} className={styles.tr}>

              <td className={styles.img} >
                <LocationIcon />
                <label style={{ marginLeft: "10px" }}>{resti.street}</label>
              </td>

              {['glovo', 'wolt', 'yandex'].map((delivery_name: string, index: number) => {

                if (resti?.aggregators?.some((el: any) => el.delivery_name === aggregator_positions[index])) {
                  return <td key={delivery_name}>

                    <div>
                      <Checkbox
                        value={delivery_name}
                        checked={state[resti.restaurant_id]?.has(delivery_name) || false}
                        onChange={(e): void => handleSelectDelivery(e, resti.restaurant_id, delivery_name)}
                      />
                      {delivery_name}
                    </div>

                  </td>;
                }
                return <td key={index} >
                  <Box ml='12px'>
                    <EmptyBox />
                  </Box>
                </td>;
              })}
            </tr>)}
          </tbody>
        </table>
      </Box>
    </React.Fragment>
  );
};


/*
{
  resti_id (56dvfhdsdk45elk): ["GLOVO","WOLT"],
  
}
*/