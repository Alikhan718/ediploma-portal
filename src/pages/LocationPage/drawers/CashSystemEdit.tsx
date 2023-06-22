import React from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { OpenMode } from "../types";
import { CashSystemForms } from "../components";
import { editCashSystem, fetchCashSystem } from "@src/store/locations/reducer";

export const CashSystemEdit: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = (data: any): void => {
    data["resti_id"] = params.resti_id;
    dispatch(editCashSystem(data));
  };
  React.useEffect(() => {
    dispatch(fetchCashSystem(String(params.resti_id)));
  }, []);
  return (
    <CashSystemForms open={OpenMode.CREATE} onSubmit={onSubmit} />
  );
};