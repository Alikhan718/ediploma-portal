import { Button, HeaderTitle, Select, Input } from "@src/components";
import { Loader } from "@src/components/Loader/Loader";
import { clearAttributeState, editAttributeGroup, fetchAttributeGroupDetail } from "@src/store/attributes/actionCreators";
import { selectAttributeGroupDetail, selectAttributeLoader } from "@src/store/attributes/selectors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditAttributeForm } from "./EditAttributeForm";

interface EditAttributeProps {
  menuID: string,

}

export const EditAttribute: React.FC<EditAttributeProps> = ({ menuID }) => {

  const params = useParams();
  const dispatch = useDispatch();
  const attribute_group = useSelector(selectAttributeGroupDetail);
  const isFetching = useSelector(selectAttributeLoader);


  const onSubmit = (body: any): void => {
    body["id"] = params.attribute_group_id;
    dispatch(editAttributeGroup(menuID, body));
  };

  React.useEffect(() => {
    const payload = {
      menu_id: params.menuId,
      product_id: params.product_id,
      attribute_group_id: params.attribute_group_id,
    };
    dispatch(fetchAttributeGroupDetail(payload));

    return () => {
      dispatch(clearAttributeState());
    };
  }, []);

  return (
    <React.Fragment>
      {isFetching ? <Loader /> : null}
      <React.Fragment>
        <HeaderTitle title="Редактирование группы аттрибутов" backTo={`/menu/configure/${params.menu_id}/edit-product/${params.product_id}`} />
        <EditAttributeForm
          attribute_group={attribute_group}
          onSubmit={onSubmit}
        />
      </React.Fragment>

    </React.Fragment>
  );
};