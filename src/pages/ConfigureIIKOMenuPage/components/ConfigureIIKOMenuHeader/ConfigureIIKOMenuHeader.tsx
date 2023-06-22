import React from "react";

import { Box } from "@mui/material";

import { HeaderTitle , Input } from "@src/components";
import { ReactComponent as SearchIcon } from '@src/assets/icons/search.svg';
import { routes } from "@src/shared/routes";
import { IConfigureMenuHeader  } from "../../types";
import styles from './ConfigureMenuHeader.module.css';
import cn from "classnames";

export const ConfigureIIKOMenuHeader: React.FC<IConfigureMenuHeader> = (props) => {
  const { onSearch } = props;


  const handleSearch = (event: any): void => {
    let search_name: string = event.target.value.trim();
    if (search_name.length > 3) {
      onSearch(1, search_name);
    } else if (!search_name.length) {
      onSearch(1, '');
    }
  };

  return (
    <Box className={styles.header}>
      <Box className={styles.headerInner}>
        <HeaderTitle
          title="Главное меню"
          backTo={routes.menu}
        />
      </Box>
      <Box className={styles.items}>
        <Box className={cn(styles.searchContainer, styles.item)}>
          <Input placeholder='Поиск' inputSize='m' onChange={handleSearch} endAdornment={<SearchIcon />} />
        </Box>
      </Box>
    </Box>
  );
};
