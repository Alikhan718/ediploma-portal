import React from "react";

import { useSelector } from "react-redux";
import { Box, Checkbox, Typography } from "@mui/material";

import { tableRows } from "./generator";
import styles from './SelectAll.module.css';
import { Button, Pagination } from "@src/components";
import { selectSelectAllLoading, selectSelectAllLocations, selectSelectAllNewProduct, selectSelectAllOldProduct } from "@src/store/selectAll/selector";

export const SelectAllLayout: React.FC = () => {
  const locations = useSelector(selectSelectAllLocations);
  const isLoading = useSelector(selectSelectAllLoading);
  const oldProduct = useSelector(selectSelectAllOldProduct);
  const newProduct = useSelector(selectSelectAllNewProduct);

  console.log(oldProduct);
  console.log(newProduct);

  return (
    <Box>
      <Typography fontSize="25px" fontWeight="600">Применить изменение позиции на следующих точках:</Typography>

      <Typography m="35px 0" fontSize="18px" fontWeight="400">Выберите точки, в которых вы хотите сделать изменения.</Typography>

      {/* LOCATIONS LIST */}
      <Box>
        <table style={{ marginBottom: "30px" }}>
          <thead>
            <tr >
              <th style={{ textAlign: "start" }}><Checkbox /> Выбрать все</th>
              <th><Checkbox /> Glovo all</th>
              <th><Checkbox /> Wolt all</th>
              <th><Checkbox />Yandex all</th>
            </tr>
          </thead>

          <tbody>
            {[0, 0, 0, 0].map((el, index) => (
              <tr key={index}>
                <td>FARSH ул.Кабанбай батыра 34</td>
                <td><Checkbox />Glovo</td>
                <td><Checkbox />Wolt</td>
                <td><Checkbox />Yandex</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button variant="contained" color="success">Далее</Button>
      </Box>

      {/* INFO */}

      <Box display="flex" gap="10px" m="45px 0">
        <Box >
          <Box display="flex" alignItems="center" gap="7px" mb="20px">
            <Typography fontSize="20px" fontWeight="600">Ресторан:</Typography>
            <Typography fontSize="18px" fontWeight="400">Farsh меню</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="7px">
            <Typography fontSize="20px" fontWeight="600">Адрес:</Typography>
            <Typography fontSize="18px" fontWeight="400">Almaty Abu Dhabi Plaza </Typography>
          </Box>
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap="7px" mb="20px">
            <Typography fontSize="20px" fontWeight="600">Дата публикации меню:</Typography>
            <Typography fontSize="18px" fontWeight="400">13/03/2022</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="7px">
            <Typography fontSize="20px" fontWeight="600">Тип меню:</Typography>
            <Typography fontSize="18px" fontWeight="400">Glovo</Typography>
          </Box>
        </Box>
      </Box>



      {/*  PRPDUCT  */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ borderLeftColor: "#FFF" }}></th>
            <th style={{ textAlign: 'start' }}>
              <Typography fontSize="25px" fontWeight="600" color="#FCAF58">Было</Typography>
            </th>
            <th style={{ textAlign: 'start', borderRightColor: "#FFF" }}>
              <Typography fontSize="25px" fontWeight="600" color="#1AB759">Стало</Typography>
            </th>
          </tr>
        </thead>
        <tbody style={{ width: "100%" }}>
          {/* IMAGES */}
          <tr  >
            <td style={{ width: "30%", borderLeftColor: "#FFF" }}>Изображение:</td>
            <td style={{ width: "35%" }}>
              <img src={oldProduct.images[0]} width={80} height={80} alt="" style={{ borderRadius: 10 }} />
            </td>
            <td style={{ width: "35%", borderRightColor: "#FFF" }}>
              <img src={newProduct.images[0]} width={80} height={80} alt="" style={{ borderRadius: 10 }} />
            </td>
          </tr>
          {/* IMAGE URL */}
          <tr  >
            <td style={{ width: "30%", borderLeftColor: "#FFF" }}>Ссылка на изображение:</td>
            <td style={{ width: "35%" }}>{oldProduct.images[0]}</td>
            <td style={{ width: "35%", borderRightColor: "#FFF" }}>{newProduct.images[0]}</td>
          </tr>
          {/* NAME */}
          <tr  >
            <td style={{ width: "30%", borderLeftColor: "#FFF" }}>Название позиции в агрегаторе:</td>
            <td style={{ width: "35%" }}>{oldProduct.name[0].Value}</td>
            <td style={{ width: "35%", borderRightColor: "#FFF" }}>{newProduct.name[0].Value}</td>
          </tr>
          {/* PRICE */}
          <tr  >
            <td style={{ width: "30%", borderLeftColor: "#FFF" }}>Цена за единицу:</td>
            <td style={{ width: "35%" }}>{oldProduct.price[0].Value}</td>
            <td style={{ width: "35%", borderRightColor: "#FFF" }}>{newProduct.price[0].Value}</td>
          </tr>
          {/* DESCRIPTION */}
          <tr  >
            <td style={{ width: "30%", borderLeftColor: "#FFF" }}>Описание:</td>
            <td style={{ width: "35%" }}>{oldProduct.description[0].Value}</td>
            <td style={{ width: "35%", borderRightColor: "#FFF" }}>{newProduct.description[0].Value}</td>
          </tr>
          {/* ID */}
          <tr  >
            <td style={{ width: "30%", borderLeftColor: "#FFF" }}>ID товара в POS:</td>
            <td style={{ width: "35%" }}>{oldProduct.id}</td>
            <td style={{ width: "35%", borderRightColor: "#FFF" }}>{newProduct.id}</td>
          </tr>
          {/*  CATEGORY */}
          <tr  >
            <td style={{ width: "30%", borderLeftColor: "#FFF" }}>Категория Товара:</td>
            <td style={{ width: "35%" }}>{oldProduct.section}</td>
            <td style={{ width: "35%", borderRightColor: "#FFF" }}>{newProduct.section}</td>
          </tr>

        </tbody>
      </table>
      <Box mt="40px" width="100%" display="flex" justifyContent="space-between" alignItems="center">
        <Button color="success" variant="contained">Сохранить</Button>
        <Pagination currentPage={1} maxPage={5} onChange={() => { }} />
      </Box>

    </Box>
  );
};