import React from "react";

import { useDispatch } from "react-redux";

import { Select } from "../Select/Select";
import { Input } from '@src/components/Input/Input';
import { Box, CircularProgress, MenuItem, SelectChangeEvent } from "@mui/material";
import { fetchAttributeGroup } from "@src/store/attributes/actionCreators";


export interface step1props {
  menu_id: string
  name?: any;
  handleChange(val: any): void;
  attributesGroupList: any[];
  isFetching: boolean;
  attributeId: string,
  setAttributeId: (id: string) => void
}

export const Step1: React.FC<step1props> = (props) => {
  const dispatch = useDispatch();
  const { name, menu_id, handleChange, isFetching, attributesGroupList, attributeId, setAttributeId, } = props;

  const loader = React.useRef(null);
  const [page, setPage] = React.useState(1);

  // const handleObserver = React.useCallback((entires: any) => {
  //   const target = entires[0];
  //   if (target.isIntersecting) {
  //     setPage(prev => prev + 1);
  //   }
  // }, []);

  const handleAttributeSelect = (e: SelectChangeEvent<any>): void => {
    setAttributeId(e.target.value);
  };

  // React.useEffect(() => {

  //   const option = {
  //     root: null,
  //     rootMargin: "20px",
  //     threshold: 0
  //   };

  //   const observer = new IntersectionObserver(handleObserver, option);
  //   if (loader.current) observer.observe(loader.current);

  // }, [handleObserver]);

  React.useEffect(() => {
    dispatch(fetchAttributeGroup(menu_id));
  }, [page]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <p>Введите название группы аттрибутов</p>
      <Input fullWidth={true} value={name} onChange={(e) => handleChange(e.target.value)} />
      <Box mt="10px">
        {isFetching
          ? <CircularProgress />
          : (attributesGroupList)
            ? <Select fullWidth value={attributeId} onChange={handleAttributeSelect}>
              <MenuItem value="0">Выбрать из уже созданных</MenuItem>
              {attributesGroupList.map((attribute: any, index: number) => (

                <MenuItem key={attribute.ext_id} value={attribute.ext_id}>{attribute.name}</MenuItem>


              ))}
            </Select>
            : null
        }

      </Box>
    </div>
  );
};
