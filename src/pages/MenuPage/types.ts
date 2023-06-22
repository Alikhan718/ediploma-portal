import { Menu, PublicationBody } from '@src/store/menulist/types';

export interface IMenuPageLayout {
  menuList: Menu[],
  restaurant_id: string,
  page: number,
  page_count: number,
  showUpdateModal: boolean,
  handlePage: (page: number) => void;
  handleSort: (sortName: string) => void;
  available_uploads: any[] | null;
}

export interface PublicationCountItemProps {
  item: PublicationBody
}