import { RootState } from "../store";

export const selectNewOrders = (state: RootState) => state.callCenter.new_orders;
export const selectInProccessOrders = (state: RootState) => state.callCenter.in_proccess_orders;
export const selectCallCenterLocations = (state: RootState) => state.callCenter.locations;