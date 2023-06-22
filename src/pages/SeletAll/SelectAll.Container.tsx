import React from "react";
import { SelectAllLayout } from "./SelectAll.Layout";
import { useDispatch } from "react-redux";
import { fetchProductLocations } from "@src/store/selectAll/types/actionCreators";
import { useParams } from "react-router-dom";

export const SelectAllContainer: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProductLocations(String(params.menuId)));
  }, []);
  return (
    <SelectAllLayout />
  );
};