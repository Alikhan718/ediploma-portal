import React from 'react';

import { Box } from '@mui/material';

import { AttributeGroupItem } from './AttributeGroupItem';
import { MenuDrawMode } from "@src/pages/ConfigureMenuPage/types";

interface AttributeGroupProps {
  tableHead: Array<{ id: number, field: string, content: React.ReactNode | string | null }>
  tableBody: Array<any>;
  // editButtonClick: (restaurant_id: string) => void
  field: string,
  direction: number,
  handleClick: (field: string, direction: number) => void
  handleDeleteAttributeGroup: (resti_id: string) => void,
  setDrawer: (val: MenuDrawMode) => void;
};

export const AttributeGroupTable: React.FC<AttributeGroupProps> = (props) => {
  const { tableBody, handleDeleteAttributeGroup, setDrawer } = props;
  return (
    <Box mt="100px">
      <Box>
        {tableBody?.map((tr, index) => (
          <AttributeGroupItem
            key={`${tr.id}*${index}`}
            tr={tr}
            setDrawer={setDrawer}
            handleDeleteAttributeGroup={handleDeleteAttributeGroup}
          />
        ))}
      </Box>
    </Box>
  );
};
