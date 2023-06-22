import React from 'react';

import { Box, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

import { Button, Input } from '@src/components';
import { ReactComponent as EditIcon } from '@src/assets/icons/edit.svg';

interface AttributeItemProps {
  attribute: any
  onDelete: (id: string) => void;
  onSubmit: (id: string, name: string, isDefault: boolean) => void
}

export const AttributeItem: React.FC<AttributeItemProps> = ({ attribute, onDelete, onSubmit }) => {
  const [name, setName] = React.useState(attribute.name);
  const [isDefaultAttribute, setIsDefaultAttribute] = React.useState(() => attribute.Default);
  const [editMode, setEditMode] = React.useState(false);

  const handleDelete = (): void => {
    onDelete(attribute.ext_id);
  };
  const handleClick = (): void => {
    setEditMode(true);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const handleSwitchAttribute = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.value === "true" ? setIsDefaultAttribute(true) : setIsDefaultAttribute(false);

  };
  const handleSubmit = (): void => {
    setEditMode(false);
    onSubmit(attribute.ext_id, name, isDefaultAttribute);
  };

  return (
    <Box >
      {editMode ?
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb="10px">
          <Input value={name} onChange={handleChangeName} label="Название аттрибута" />
          <FormControl sx={{ display: "flex" }}>
            <Typography fontSize="15px" color="#656665">Сделать обязательным аттрибутом</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={isDefaultAttribute}
              onChange={handleSwitchAttribute}

            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="success" onClick={handleSubmit}>Save</Button>
        </Box>
        :
        <Box display="flex">
          <Chip
            label={attribute.Default ? "Yes" : "No"}
            sx={{ borderTopRightRadius: "0", borderBottomRightRadius: "0", marginRight: "1px" }} />
          <Chip
            sx={{ marginBottom: "5px", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
            label={attribute.name}
            icon={<EditIcon />}
            onDelete={handleDelete}
            onClick={handleClick} />
        </Box>
      }
    </Box>
  );
};