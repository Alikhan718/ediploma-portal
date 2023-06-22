import React from "react";

import { Table, TableBody as MuiTableBody, TableHead, TableRow } from "@mui/material";

import { Button, TableCellHead } from "@src/components";
import { tableHead } from "./generator";
import { PublicationMenuTableBody } from "./PublicationMenuTableBody";
import { ReactComponent as ArrowDownIcon } from '@src/assets/icons/arrowDown.svg';


export const PublicationMenuTable: React.FC = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableHead.map(th => (
            <TableCellHead align="left" key={th.id}>
              <Button
                size="small"
                variant="contained"
                color="neutral"
                endIcon={<ArrowDownIcon />}
              >
                {th.name}
              </Button>
            </TableCellHead>
          ))}
        </TableRow>
      </TableHead>

      <MuiTableBody>
        {[0, 0, 0, 0].map((_, i) => (
          <PublicationMenuTableBody key={i} tr={''} />
        ))}
      </MuiTableBody>
    </Table>
  )
};