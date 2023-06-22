import React from "react";

import { useDispatch } from "react-redux";
import { Box, Drawer } from "@mui/material";
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import { menu_routes } from "@src/shared/routes";
import { useTypedSelector } from "@src/hooks/useTypedSelector";
import { AttributeGroupPageLayout } from "./AttributeGroupPage.Layout";
import { fetchAttributeGroup } from "@src/store/attributes/actionCreators";
import { MenuDrawMode } from "@src/pages/ConfigureMenuPage/types";
import { EditProduct } from "@src/pages/ConfigureMenuPage/components/EditProduct";
import { EditAttribute } from "@src/pages/ConfigureMenuPage/components/EditAttribute";

const AttributeGroupPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [drawer, setDrawer] = React.useState<MenuDrawMode>(MenuDrawMode.CLOSE);

  const { attribute_group_list } = useTypedSelector(state => state.attributes);

  const onClose = (): void => {
    setDrawer(MenuDrawMode.CLOSE);
    navigate(`/app/menu/configure/${params.menu_id!}/attribute-group`);
  };

  React.useEffect(() => {
    dispatch(fetchAttributeGroup(params.menu_id!));

    const domain = params['*']?.split("/")[1];
    if (domain === 'edit-product' || domain === "edit-attribute-group") {

      setDrawer(MenuDrawMode.OPEN);
    }
  }, []);

  React.useEffect(() => {
    if (!params["*"]) {
      setDrawer(MenuDrawMode.CLOSE);
    }
  }, [params]);
  const handleSearch = (text: string) => {
    if (text.trim().length > 3) {
      dispatch(fetchAttributeGroup(params.menu_id!,text));
    }
    else if (!text.trim().length) {
      dispatch(fetchAttributeGroup(params.menu_id!));
    }
  };

  return (
    <React.Fragment>
      <AttributeGroupPageLayout
        attribute_group_list={attribute_group_list}
        setDrawer={setDrawer}
       searchAttributeGroups={handleSearch}/>
      <Drawer open={drawer === MenuDrawMode.OPEN} onClose={onClose} anchor="right">
        <Box p="20px" width="800px" height="100%" position="relative">
          <Routes>
            <Route path=":attribute_group_id/edit-product/:product_id" element={<EditProduct open={true} menuID={params.menu_id!} navigate={navigate} />} />
            <Route path={`:attribute_group_id/edit-attribute-group`} element={<EditAttribute menuID={params.menu_id!} />} />
          </Routes>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default AttributeGroupPageContainer;
