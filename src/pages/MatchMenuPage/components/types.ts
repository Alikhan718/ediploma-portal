export interface MatchMenuProps {
  product: any,
  posProducts: Array<any>,
  section: string,
  matchAggregatorPos: (aggregator_product_id: string, pos_product_id: string, available: boolean, section: string) => void
  handleDelete: (menu_id: string, is_deleted: boolean) => void
}