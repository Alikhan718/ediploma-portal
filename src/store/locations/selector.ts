import React from "react";
import { RootState } from "../store";

export const selectCurrentLocation = (state: RootState) => state.locations.currLocation;
export const selectAllLocations = (state: RootState) => state.locations.allLocations;
export const selectFetchAllLocations = (state: RootState) => state.locations.fetchLocation;

export const selectWoltStatusses = (state: RootState) => state.locations.wolt_statusses;
