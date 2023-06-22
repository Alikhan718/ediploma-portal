import React from "react";
import { RootState } from "../store";

export const selectTime = (state: RootState) => state.settings.pickupTime;
