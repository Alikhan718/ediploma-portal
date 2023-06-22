import React from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { OpenMode } from "../types";
import { AggregatorForms } from "../components";
import { createGlovo, createWolt } from "@src/store/locations/reducer";

export const AggregatorsCreate: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = (data: any, storeIds: Array<{ name: string }>): void => {

    const payload: any = {
      store_id: storeIds.map(el => el.name),
      menu_url: data.webURL,
      restaurant_id: String(params.resti_id),
      payment_types: {
        "CASH": {
          "iiko_payment_type_id": data.payment_type_cash.id,
          "iiko_payment_type_kind": data.payment_type_cash.paymentTypeKind
        },
        "DELAYED": {
          "iiko_payment_type_id": data.payment_type_delayed.id,
          "iiko_payment_type_kind": data.payment_type_delayed.paymentTypeKind
        }
      },
      is_marketplace: data.is_marketplace,
      price_source: data.price_source,
      send_to_pos: true
    };

    // WOLT 
    if (data.aggregator === 3) {
      payload["api_key"] = data.api_key;
      payload["menu_username"] = data.menu_username;
      payload["menu_password"] = data.menu_password;
      if (data.iiko_wolt_statuses.length > 1) payload['iiko_wolt_statuses'] = data.iiko_wolt_statuses;
      dispatch(createWolt({ data: payload }));

    } else {
      // GLOVO
      dispatch(createGlovo({ data: payload }));
    }
  };
  return (
    <AggregatorForms open={OpenMode.EDIT} onSubmit={onSubmit} />
  );
};