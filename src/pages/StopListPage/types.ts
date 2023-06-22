import React from 'react';

export interface StopListPageLayoutProps {
  handleOpenDrawer: (open: boolean) => void
}

export interface LocationsListFormProps {
  productStores?: Array<any> | null;
  state: { [key: string]: Set<string> };
  setState: (obj: { [key: string]: Set<string> }) => void
}

export interface DisableProductFormProps {
  productStores?: Array<any> | null;
  state: { [key: string]: Set<string> };
  setState: (obj: { [key: string]: Set<string> }) => void
  handleOpen: () => void

}