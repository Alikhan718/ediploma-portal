import React from "react";

import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { HeaderTitle } from "@src/components/HeaderTitle/HeaderTitle";
import { ReactComponent as MenuDoneIcon } from "@src/assets/icons/MenuDoneIcon.svg";

const CreateMenuSuccessPage: React.FC = () => {
  return (
    <React.Fragment>
      <HeaderTitle
        title="Glovo Menu"
        backTo="/app/createMenu/match-menu"
      />
      <Box
        width="100%"
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Box textAlign="center">
          <MenuDoneIcon />
          <Box m="80px 0">
            <Typography fontSize="24px" fontWeight="600">Поздравляем! Вы успешно привязали меню</Typography>
            <Typography color="#656665" fontSize="16px" fontWeight="500">Если хотите посмотреть блюда,  перейдите в раздел «Меню» </Typography>
          </Box>
          <Link to="/app/menu">
            <Button variant="contained" fullWidth>
              Перейти в меню
            </Button>
          </Link>

        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CreateMenuSuccessPage;