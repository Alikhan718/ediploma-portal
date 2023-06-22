import React from 'react';

import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';

import Edit from '@src/assets/icons/edit.svg';
import { Button, TableCellBody, TableCellHead } from '@src/components';
import { ReactComponent as ArrowDownIcon } from '@src/assets/icons/arrowDown.svg';
import { deleteLocation, switchLocationIntegration } from '@src/store/locations/reducer';
import { LocationTableItem } from './LocationTableItem';

interface LocationTableProps {
  tableHead: Array<{ id: number, field: string, content: React.ReactNode | string | null }>
  tableBody: Array<any>;
  editButtonClick: (restaurant_id: string) => void
  field: string,
  direction: number,
  handleClick: (field: string, direction: number) => void
  handleDeleteLocation: (resti_id: string) => void,
  handleIntegration: (payload: any) => void
};

export const LocationTable: React.FC<LocationTableProps> = (props) => {
  const { tableBody, tableHead, direction, handleClick, editButtonClick, handleDeleteLocation, handleIntegration } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableHead.map(th => (
            <TableCellHead key={th.id}>
              <Button
                endIcon={<ArrowDownIcon />}
                variant='contained'
                onClick={() => handleClick(th.field, direction ? direction * -1 : 1)}
                color='neutral'
                sx={{ '&:hover': { boxShadow: 'none', backgroundColor: '#DADADA' } }}
              >
                {th.content}
              </Button>
            </TableCellHead>
          ))}
        </TableRow>
      </TableHead>
      {/*  */}
      <TableBody>
        {tableBody?.map((tr, index) => (
          <LocationTableItem
            key={`${tr.id}*${index}`}
            tr={tr}
            handleIntegrarion={handleIntegration}
            handleDeleteLocation={handleDeleteLocation}
            editButtonClick={editButtonClick}
          />
        ))}
      </TableBody>
    </Table>
  );
};