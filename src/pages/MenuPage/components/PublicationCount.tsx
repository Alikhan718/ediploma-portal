import React from "react";

import { useSelector } from "react-redux";

import { selectPublicationCount } from "@src/store/menulist/selector";
import { PublicationCountItem } from "./PublicationCountItem";

export const PublicationCount: React.FC = () => {
  const available_uploads = useSelector(selectPublicationCount);

  return (
    <React.Fragment>
      {available_uploads?.map((item, index) => (
        <PublicationCountItem key={`${item.aggregator_name}_${index}`} item={item} />
      ))}
    </React.Fragment>
  );
};