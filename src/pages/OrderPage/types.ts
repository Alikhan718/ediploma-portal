import { Order } from '@src/store/orders/types';
import React from 'react';
import { Params, URLSearchParamsInit } from 'react-router-dom';
import { tableHeadType } from './generator';


export interface OrderPageLayoutProps {
  params: URLSearchParams
  setParams: (n: URLSearchParamsInit) => void
}

export interface OrderTableProps {
  tableHead: Array<tableHeadType>
  tableBody: Order[];
  field: null | string,
  direction: null | number,
  onTableHeadCellClick: (field: string, direction: number) => void
}

export interface ModalFilterProps {
  onClose: () => void;
  params: URLSearchParams;
  setParams: (n: URLSearchParamsInit) => void;
}