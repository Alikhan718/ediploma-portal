import {
  ADD_LOCATION_REQUEST_SAGA, CREATE_GLOVO_INTEGRATION, FETCH_CITIES, FETCH_CITIES_ERROR, FETCH_CITIES_SAGA,
  FETCH_CITIES_SUCCESS, FETCH_LOCATIONS_SAGA, FETCH_LOCATIONS_SUCCESS, FETCH_ORGANIZATIONS, FETCH_ORGANIZATIONS_ERROR,
  FETCH_ORGANIZATIONS_SUCCESS, FETCH_ORGANIZATION_SAGA, FETCH_PAYMENT_TYPES, FETCH_PAYMENT_TYPES_SAGA,
  FETCH_PAYMENT_TYPES_SUCCESS, SEND_IIKO_ORGANIZATIONS, SEND_IIKO_ORGANIZATIONS_ERROR, SEND_IIKO_ORGANIZATIONS_SAGA,
  SEND_IIKO_ORGANIZATIONS_SUCCESS, SEND_LOCATION_DATA, SEND_LOCATION_DATA_ERROR, SEND_LOCATION_DATA_SUCCESS,
  SET_CURR_LOCATION, SWITCH_LOCATION_INTEGRATION_MODE, FETCH_PAYMENT_TYPES_ERROR, GET_LOCATION_BY_ID_SUCCESS,
  GET_LOCATION_BY_ID_SAGA, EDIT_LOCATION_ITEM_SAGA, CLEAN_LOCATION_FORM, FETCH_ALL_LOCATIONS, FETCH_ALL_LOCATIONS_SUCCESS,
  FETCH_ALL_LOCATIONS_SAGA, FETCH_ALL_LOCATIONS_ERROR, SET_NEXT_IN_PROGRESS_LOADER, CREATE_GLOVO_INTEGRATION_SUCCESS, DELETE_LOCATION_SAGA, FETCH_CASH_SYSTEM_SUCCESS, FETCH_CASH_SYSTEM_SAGA, SET_LOCATION_DRAWER_LOADING, EDIT_CASH_SYSTEM_SAGA, PATCH_INTEGRATION_SAGA, GET_LANGUAGES_SUCCESS, GET_CURRENCIES_SUCCESS, GET_LANGUAGES_SAGA, GET_CURRENCIES_SAGA, CREATE_WOLT_INTEGRATION_SAGA,
  GET_WOLT_STATUSSES_SUCCESS,
  GET_WOLT_STATUSSES_SAGA
} from "./types/actionTypes";

const initialState = {
  locations: [],
  cities: [],
  languages: [],
  currencies: [],
  organizations: [],
  payment_types: [],

  allLocations: [],
  currLocation: localStorage.getItem("currLocation") || '',

  fetchLocation: true,
  loading: false,
  nextInProgress: false,
  drawerLoader: false,

  locationForms: {},
  agregatorsForms: {},
  cashSystemForms: {},

  page: 1,
  page_count: 0,
  total_count: 0,

  field: null,
  direction: null,
};

const locationsReducer = (state = initialState, action: any): any => {
  switch (action.type) {

    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload.data,
        page: action.payload.metadata.page,
        page_count: action.payload.metadata.page_count,
        total_count: action.payload.metadata.total_count,
        field: action.payload.metadata.field,
        direction: action.payload.metadata.direction
      };
    case SET_CURR_LOCATION:
      return {
        ...state,
        currLocation: action.payload
      };
    case FETCH_CITIES:
      return {
        ...state,
        loading: true
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload,
        loading: false
      };
    case FETCH_CITIES_ERROR:
      return {
        ...state,
        loading: false,
        drawerLoader: false
      };

    case SEND_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        nextInProgress: false,
        locationForms: action.payload
      };

    case FETCH_ORGANIZATIONS:
      return {
        ...state,
        loading: true
      };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload,
        loading: false
      };
    case FETCH_ORGANIZATIONS_ERROR:
      return {
        ...state,
        loading: false
      };
    case FETCH_PAYMENT_TYPES:
      return {
        ...state,
        loading: true
      };
    case FETCH_PAYMENT_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        payment_types: action.payload,
      };
    case FETCH_PAYMENT_TYPES_ERROR:
      return {
        ...state,
        loading: false,
        drawerLoader: false
      };

    case SEND_IIKO_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        nextInProgress: false,
        cashSystemForms: action.payload
      };
    case CREATE_GLOVO_INTEGRATION_SUCCESS: {
      return {
        ...state,
        cashSystemForms: action.payload,
        nextInProgress: false
      };
    }
    case GET_LOCATION_BY_ID_SUCCESS:
      return {
        ...state,
        locationForms: action.payload
      };
    case CLEAN_LOCATION_FORM:
      return {
        ...state,
        locationForms: {}
      };
    case FETCH_ALL_LOCATIONS:
      return {
        ...state,
        fetchLocation: true
      };
    case FETCH_ALL_LOCATIONS_SUCCESS:
      return {
        ...state,
        allLocations: action.payload.data,
        currLocation: action.payload.currLocation,
        fetchLocation: false
      };
    case FETCH_ALL_LOCATIONS_ERROR:
      return {
        ...state,
        fetchLocation: false,
        drawerLoader: false
      };
    case SET_NEXT_IN_PROGRESS_LOADER:
      return {
        ...state,
        nextInProgress: action.payload
      };
    case FETCH_CASH_SYSTEM_SUCCESS:
      return {
        ...state,
        cashSystemForms: action.payload
      };
    case SET_LOCATION_DRAWER_LOADING:
      return {
        ...state,
        drawerLoader: action.payload
      };
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.payload.data
      };
    case GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.payload
      };
    case GET_WOLT_STATUSSES_SUCCESS:
      return {
        ...state,
        wolt_statusses: action.payload,
      };
    default:
      return state;
  }

};

export default locationsReducer;

export const fetchLocations = (page: number = 1, field: string | null = null, direction: number | null = null, q: string | null = null) => {
  return { type: FETCH_LOCATIONS_SAGA, payload: { page, field, direction, q } };
};

export const fetchAllLocation = () => ({ type: FETCH_ALL_LOCATIONS_SAGA });

export const fetchCities = () => ({ type: FETCH_CITIES_SAGA });
export const fetchLocationById = (resti_id: string) => ({ type: GET_LOCATION_BY_ID_SAGA, payload: resti_id });
export const editLocationData = (payload: any) => ({ type: EDIT_LOCATION_ITEM_SAGA, payload });
export const cleanLocationForm = () => ({ type: CLEAN_LOCATION_FORM });

export const fetchOrganizations = (api_login: string) => ({ type: FETCH_ORGANIZATION_SAGA, payload: api_login });
export const fetchPaymentTypes = (resti_id: string) => ({ type: FETCH_PAYMENT_TYPES_SAGA, payload: resti_id });
export const setCurrentLocation = (location: string) => {
  localStorage.setItem("currLocation", location);
  return { type: SET_CURR_LOCATION, payload: location };
};

export const addLocation = (payload: any) => ({ type: ADD_LOCATION_REQUEST_SAGA, payload });
export const switchLocationIntegration = (payload: any) => ({ type: SWITCH_LOCATION_INTEGRATION_MODE, payload });
export const createIIKO = (payload: any) => ({ type: SEND_IIKO_ORGANIZATIONS_SAGA, payload });
export const createGlovo = (payload: any) => ({ type: CREATE_GLOVO_INTEGRATION, payload });
export const createWolt = (payload: any) => ({ type: CREATE_WOLT_INTEGRATION_SAGA, payload });
export const deleteLocation = (payload: { resti_id: string, page: number }) => ({ type: DELETE_LOCATION_SAGA, payload });

export const fetchCashSystem = (payload: string) => ({ type: FETCH_CASH_SYSTEM_SAGA, payload });
export const editCashSystem = (payload: any) => ({ type: EDIT_CASH_SYSTEM_SAGA, payload });
export const patchIntegration = (payload: any) => ({ type: PATCH_INTEGRATION_SAGA, payload });

export const fetchLanguages = () => ({ type: GET_LANGUAGES_SAGA });
export const fetchCurrencies = () => ({ type: GET_CURRENCIES_SAGA });

export const fetchWoltStatusses = (payload: any) => ({ type: GET_WOLT_STATUSSES_SAGA, payload });