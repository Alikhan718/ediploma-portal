import React from "react";
import { Checkbox } from "@mui/material";
import { TableCellBody } from "@src/components";
import { TableHoverRow } from "@src/components/TableRow/TableRow";

interface IPublicationMenuTableBody {
  tr: any
}
export const PublicationMenuTableBody: React.FC<IPublicationMenuTableBody> = ({ tr }) => {

  return (
    <TableHoverRow>
      <TableCellBody>Test chanell</TableCellBody>
      <TableCellBody>Farch Burger </TableCellBody>
      <TableCellBody>Glovo </TableCellBody>
      <TableCellBody>Test </TableCellBody>
      <TableCellBody><Checkbox /></TableCellBody>
    </TableHoverRow>
  );
};