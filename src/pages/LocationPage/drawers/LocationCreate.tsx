import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LocationForms } from "../components";
import { addLocation, fetchCities } from "@src/store/locations/reducer";


export const LocationCreate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm = (form: any): void => {
    const payload = {
      name: form.name,
      address: {
        city: {
          name: form.city,
          timezone: form.timezone
        },
        street: form.street
      },
      currency: form.currency,
      language_code: form.language,
      navigate,
    };
    dispatch(addLocation(payload));

  };

  React.useEffect(() => {
    dispatch(fetchCities());
  }, []);
  return (
    <LocationForms formType="" onSubmit={onSubmitForm} />
  );
};