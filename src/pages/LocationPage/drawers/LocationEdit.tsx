import { cleanLocationForm, editLocationData, fetchCities, fetchLocationById } from "@src/store/locations/reducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LocationForms } from "../components";


export const LocationEdit: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const onSubmitForm = (form: any): void => {


    const payload = {
      navigate,
      restaurant_id: String(params.resti_id),
      form: {
        name: form.name,
        address: {
          city: { name: form.city, timezone: form.timezone },
          street: form.street
        },
        currency: form.currency,
        language_code: form.language,
      }
    };
    dispatch(editLocationData(payload));
  };

  React.useEffect(() => {

    dispatch(fetchCities());
    dispatch(fetchLocationById(String(params.resti_id)));

    return () => {
      dispatch(cleanLocationForm());
    };
  }, []);
  return (
    <LocationForms formType="EDIT" onSubmit={onSubmitForm} />
  );
};