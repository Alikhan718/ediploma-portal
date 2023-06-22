import React from "react";
import style from './ScrollBox.module.css';
import { ScrollBoxProps } from "./ScrollBox.props";

export const ScrollBox: React.FC<ScrollBoxProps> = (props) => {

  return (
    <div className={style.mediaScroller}>
      {props.children}
    </div>

  );
};