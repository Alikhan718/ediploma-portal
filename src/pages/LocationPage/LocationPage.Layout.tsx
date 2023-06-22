import React from "react";

import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Box, Drawer, MenuItem, Typography } from "@mui/material";

import { tableHead } from "./generator";
import { ReactComponent as EditIcon } from "@src/assets/icons/edit.svg";
import { Input, Pagination, Select, Button } from "@src/components";
import { deleteLocation, fetchLocations, patchIntegration } from "@src/store/locations/reducer";
import { LocationHeader, LocationTable, LocationForms, CashSystemForms, AggregatorForms } from "./components";
import { LocationPageLayoutProps, OpenMode } from "./types";
import { LocationCreate } from "./drawers/LocationCreate";
import { LocationEdit } from "./drawers/LocationEdit";
import { CashSystemCreate } from "./drawers/CashSystemCreate";
import { AggregatorsCreate } from "./drawers/AggregatorsCreate";
import { CashSystemEdit } from "./drawers/CashSystemEdit";

export const LocationPageLayout: React.FC<LocationPageLayoutProps> = ({ locations, page_count, page, order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = React.useState<OpenMode>(OpenMode.CLOSE);

  const [field, setField] = React.useState('');
  const [direction, setDirection] = React.useState(1);
  const [searchText, setSearchText] = React.useState('');

  const handleCloseDrawer = (): void => {
    navigate("/app/location");
    setOpen(OpenMode.CLOSE);
  };
  const handleOpenDrawer = (): void => {
    navigate("create-location");
    setOpen(OpenMode.CREATE);
  };
  const handlePageChange = (page: number): void => {
    dispatch(fetchLocations(page));
  };
  const editButtonClick = (restaurant_id: string): void => {
    setOpen(OpenMode.EDIT);
    navigate(`edit-location/${restaurant_id}`);
  };
  const handleDeleteLocation = (resti_id: string): void => {
    dispatch(deleteLocation({ resti_id, page }));
  };
  const onTableHeadCellClick = (newField: string, newDirection: number): void => {
    dispatch(fetchLocations(page, newField, newDirection, searchText));
    setField(newField);
    setDirection(newDirection);
  };
  const searchLocations = (text: string): void => {
    setSearchText(text);
    dispatch(fetchLocations(page, field, direction, searchText));
  };
  const handleIntegrarion = (payload: any): void => {
    dispatch(patchIntegration(payload));
  };
  React.useEffect(() => {
    if (params['*'] === 'create-location' || params['*'] === 'integration-cash-system' || params['*']) {
      const url = params['*']?.split("/")[0];
      url === 'edit-location' ? setOpen(OpenMode.EDIT) : setOpen(OpenMode.CREATE);
      navigate(params["*"]);
    } else if (!params["*"]) {
      setOpen(OpenMode.CLOSE);
    }
  }, [params["*"]]);

  return (
    <React.Fragment>
      <Drawer variant="temporary" anchor="right" open={OpenMode.CREATE === open || open === OpenMode.EDIT} onClose={handleCloseDrawer}>
        <Box p="40px" width="800px" height="100%" position="relative">
          <Routes>

            <Route path="create-location" element={<LocationCreate />} />
            <Route path="integration-cash-system/:resti_id" element={<CashSystemCreate />} />
            <Route path="create-agregators/:resti_id" element={<AggregatorsCreate />} />

            <Route path="edit-location/:resti_id" element={<LocationEdit />} />
            <Route path="edit-cash-system/:resti_id" element={<CashSystemEdit />} />

          </Routes>
        </Box>
      </Drawer>
      <LocationHeader handleOpenDrawer={handleOpenDrawer} handleSearch={searchLocations} />
      <div style={{ marginBottom: "40px" }} />
      <LocationTable
        tableHead={tableHead}
        tableBody={locations}
        field={field}
        direction={direction}
        handleIntegration={handleIntegrarion}
        handleClick={onTableHeadCellClick}
        editButtonClick={editButtonClick}
        handleDeleteLocation={handleDeleteLocation}
      />
      <div style={{ marginBottom: "40px" }} />
      {
        locations ? <Pagination currentPage={page} maxPage={page_count} onChange={handlePageChange} /> : null
      }


    </React.Fragment>
  );
};