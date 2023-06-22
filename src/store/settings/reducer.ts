import {
	FETCH_PICKUP_TIME,
	FETCH_PICKUP_TIME_SUCCESS,
	FETCH_PICKUP_TIME_ERROR, UPDATE_PICKUP_TIME, UPDATE_PICKUP_TIME_SUCCESS, UPDATE_PICKUP_TIME_ERROR,
} from "./types/actionTypes";
import exp from "constants";

const initialState = {
	pickupTime: 0,
	currLocation: localStorage.getItem("currLocation") || '',
	loading: false,
};

const settingsReducer = (state = initialState, action: any): any => {
	switch (action.type) {
		case FETCH_PICKUP_TIME:
			return {
				...state,
				loading: true
			};
		case FETCH_PICKUP_TIME_SUCCESS:
			return {
				...state,
				pickupTime: action.payload.data,
				loading: false
			};
		case FETCH_PICKUP_TIME_ERROR:
			return {
				...state,
				loading: false
			};
		case UPDATE_PICKUP_TIME:
			return {
				...state,
				loading: true
			};
		case UPDATE_PICKUP_TIME_SUCCESS:
			return {
				...state,
				loading: false
			};
		case UPDATE_PICKUP_TIME_ERROR:
			return {
				...state,
				loading: false
			};

		default:
			return state;
	}

};

export default settingsReducer;

export const fetchTime = (resti_id: string) => ({
	type: FETCH_PICKUP_TIME,
	payload: resti_id
});

export const updatePickupTime = (resti_id: string, time: number) => ({
	type: UPDATE_PICKUP_TIME,
	payload: { resti_id, time }
});

