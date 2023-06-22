import React from "react";

import { tableHead } from "./generator";
import { AttributeGroupHeader, AttributeGroupTable } from "./components";
import { AttributeGroupPageLayoutProps } from "./types";
import {useDispatch} from "react-redux";
import {fetchAttributeGroup} from "@src/store/attributes/actionCreators";

export const AttributeGroupPageLayout: React.FC<AttributeGroupPageLayoutProps> = ({ attribute_group_list, setDrawer, searchAttributeGroups }) => {

  const [field, setField] = React.useState('');
  const [direction, setDirection] = React.useState(1);

  const handleDeleteAttributeGroup = (resti_id: string): void => {
  };
  const onTableHeadCellClick = (newField: string, newDirection: number): void => {
    setField(newField);
    setDirection(newDirection);
  };


  return (
    <React.Fragment>
      <AttributeGroupHeader handleSearch={searchAttributeGroups} />
      <div style={{ marginBottom: "40px" }} />
      <AttributeGroupTable
        tableHead={tableHead}
        tableBody={attribute_group_list}
        field={field}
        direction={direction}
        handleClick={onTableHeadCellClick}
        setDrawer={setDrawer}
        handleDeleteAttributeGroup={handleDeleteAttributeGroup}
      />
      <div style={{ marginBottom: "40px" }} />
      {/*<Pagination currentPage={page} maxPage={page_count} onChange={handlePageChange} />*/}

    </React.Fragment>
  );
};
