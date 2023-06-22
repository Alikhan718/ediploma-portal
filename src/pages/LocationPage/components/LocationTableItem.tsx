import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, FormControlLabel, MenuItem, Select, TableRow } from "@mui/material";
import { Button, TableCellBody, Switch } from "@src/components";

import { ReactComponent as EditIcon } from '@src/assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@src/assets/icons/delete_outline.svg';
import { DropDown } from "@src/components/DropDown/DropDown";

interface LocationTableItemProps {
  tr: any,
  editButtonClick: (restaurant_id: string) => void
  handleDeleteLocation: (resti_id: string) => void,
  handleIntegrarion: (payload: any) => void
}

export const LocationTableItem: React.FC<LocationTableItemProps> = ({ tr, editButtonClick, handleDeleteLocation, handleIntegrarion }) => {
  const navigate = useNavigate();

  const handleEditButton = (): void => {
    editButtonClick(tr.id);
  };
  const handleDelete = (): void => {
    handleDeleteLocation(tr.id);
  };
  const handleIntegrationChange = (payload: any): void => {
    handleIntegrarion({ ...payload, restaurant_id: tr.id });
  };
  const handleAddAggregator = (): void => {
    navigate(`create-agregators/${tr.id}`);
  };

  return (
    <TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
      <TableCellBody>{tr.name}</TableCellBody>
      <TableCellBody>{tr.address.city}</TableCellBody>
      <TableCellBody>{tr.address.street}</TableCellBody>
      <TableCellBody>{new Date(tr.integration_date * 1000).toLocaleDateString()}</TableCellBody>
      <TableCellBody align='left'>
        <DropDown
          aggregatorData={tr.AggregatorData}
          handleIntegrationChange={handleIntegrationChange}
          handleAddAggregator={handleAddAggregator}
        />
      </TableCellBody>
      <TableCellBody align='right' sx={{ display: 'flex', flexDirection: 'row', border: 'none' }}>
        <Button
          sx={{ height: '50px', width: '70px' }}
          variant="text"
          color="onyx"
          onClick={handleEditButton}
          buttonSize='m'>
          <EditIcon />
        </Button>
        <Button
          sx={{ height: '50px', width: '50px' }}
          variant="text"
          color="onyx"
          onClick={handleDelete}
          buttonSize='m'>
            { React.cloneElement(<DeleteIcon />, { color: 'red' }) }
        </Button>
      </TableCellBody>
    </TableRow>
  );
};