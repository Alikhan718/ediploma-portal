import { createIIKO } from "@src/store/locations/reducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CashSystemForms } from "../components";
import { OpenMode } from "../types";

export const CashSystemCreate: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data: any): void => {
    dispatch(createIIKO({ ...data, resti_id: params.resti_id, navigate }));
  };

  return (
    <CashSystemForms open={OpenMode.EDIT} onSubmit={onSubmit} />
  );
};