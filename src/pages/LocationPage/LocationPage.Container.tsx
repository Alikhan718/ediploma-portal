import React from "react";

import { useDispatch } from "react-redux";

import { useTypedSelector } from "@src/hooks/useTypedSelector";
import { fetchLocations } from "@src/store/locations/reducer";
import { LocationPageLayout } from "./LocationPage.Layout";

const LocationPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { locations, loading, page_count, page, order, field, direction } = useTypedSelector(state => state.locations);
  React.useEffect(() => {
    dispatch(fetchLocations(1));
  }, []);
  return (
    <LocationPageLayout
      order={order}
      page={page}
      locations={locations}
      loading={loading}
      field={field}
      direction={direction}
      page_count={page_count}
    />
  );
};

export default LocationPageContainer;