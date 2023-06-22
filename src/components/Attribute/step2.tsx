import React, { useState } from "react";
import { Input } from '@src/components/Input/Input';

export interface step2props {
  min?: number;
  max?: number;
  handleChange: any;
}

export const Step2: React.FC<step2props> = (props) => {
  const { min, max, handleChange } = props;
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <p style={{ textAlign: "center" }}>Укажите, какое минимальное и максимальное количество товаров может выбрать
        пользователь в этой группе</p>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row" }}>
        <Input name="min" style={{ width: "5em" }} label={"Минимум"} inputProps={{ min: 0 }} type={"number"} value={min}
          onChange={handleChange} />
        <Input name="max" style={{ width: "5em" }} label={"Максимум"} inputProps={{ min: 1 }} type={"number"} value={max}
          onChange={handleChange} />
      </div>
      <p style={{ textAlign: "center" }}>Например: минимум 1, максимум 2. Это значит, что пользователь должен выбрать
        минимум 1 атрибут для заказа и максимум 2 атрибута</p>

    </div>
  );
};
