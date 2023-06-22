import { OrdersSuccessPayload } from '@src/store/orders/types';
import { Auth } from 'aws-amplify';
import axios from 'axios';

const per_page = process.env.REACT_APP_ORDERS_PER_PAGE;
const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers!["Authorization"] = `${token}`;
  }
  request.headers!["Authorization"] = `${token}`;
  request.headers!["Content-Type"] = "application/json";

  return request;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    const prevReq = error?.config;
    if (error?.response?.status === 401) {

      try {
        prevReq.sent = true;
        // REFRESH TOKEN
        const cognitoUserSession = await Auth.currentSession();

        const token = cognitoUserSession.getIdToken().getJwtToken();
        const refresh = cognitoUserSession.getRefreshToken().getToken();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refresh);
        prevReq.headers["Authorization"] = `${token}`;

        return instance(prevReq);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export const ordersApi = {
  getOrders(page: number = 1, query: string, rest_id: string): Promise<Omit<OrdersSuccessPayload, 'field' | 'direction'>> {
    return instance.get(`/v1/orders?page=${page}&per_page=${per_page}&restaurant_id=${rest_id}${query}`);
  }
};

export const menusApi = {
  getMenusList(restaurant_id: string, query: string) {
    return instance.get(`/v1/restaurant/${restaurant_id}/menus/status?${query}`);
  },
  getMenuPublicationCount(restaurant_id: string) {
    return instance.get(`/v1/restaurant/${restaurant_id}/available-menu-uploads`);
  },
  editMenu(body: any, menu_id: string) {
    return instance.put(`/v1/menus/${menu_id}`, body);
  },
  deleteMenu(menu_id: string, restaurant_id: string) {
    return instance.delete(`/v1/menus/${menu_id}?restaurant_id=${restaurant_id}`);
  },
  getMenuItem(menu_id: string) {
    return instance.get(`/v1/menus/${menu_id}`);
  },
  getMenuSection(menu_id: string) {
    return instance.get(`/v1/menus/${menu_id}/sections`);
  },
  getMenuCollections(menu_id: string) {
    return instance.get(`/v1/menus/${menu_id}/collections`);
  },
  getMenuProducts(menu_id: string, section_name: string, page: number = 1, field: string = "price") {
    return instance.get(`/v1/menus/${menu_id}/products?section_name=${section_name}&field=${field}&page=${page}&per_page=${10}`);
  },
  getMenuPublictionStatus(menus_list: any[]) {
    return instance.post(`v1/menus/verify-upload`, menus_list);
  },
  // 1 PAGE UPLOAD MENU
  parseMenu(body: any) {
    return instance.post(`/v1/menus/glovo/parse`, body);
  },
  createMenu(body: any) {
    return instance.post(`/v1/menus/matching-menu`, body);
  },
  uploadMenu(body: any) {
    return instance.post(`/v1/menus/upload`, body);
  },
  updateMenu(token: string) {
    return instance.post(`/v1/menus/update-menu?token=${token}`);
  },
  // 2 PAGE MATCH MENU
  getMenuSections(menu_id: string) {
    return instance.get(`/v1/menus/${menu_id}/sections`);
  },
  getMenuProductsForMatching(menu_id: string, restaurant_id: string, section_name?: string, page: number = 1, field: string | null = "price", search_name?: string, sort_order?: number) {
    let query = `/v1/menus/${menu_id}/matching-menu?restaurant_id=${restaurant_id}&page=${page}&limit=${10}&field=${field}&sort_order=${sort_order}`;
    if (section_name) {
      query += `&section_name=${section_name}`;
    }
    if (search_name) {
      query += `&name=${search_name}`;
    }
    return instance.get(query);
  },
  matchingPorduct(menu_id: string, body: { aggregator_product_id: string, pos_product_id: string }) {
    return instance.put(`/v1/menus/${menu_id}/matching-product`, body);
  },
  isMatchedAll(menu_id: string, body: { restaurant_id: string }) {
    return instance.post(`/v1/menus/${menu_id}/is-matching`, body);
  },
  getMenuProduct(product_id: string, menu_id: string, restaurant_id: string) {
    return instance.get(`/v1/menus/${menu_id}/product/${product_id}?restaurant_id=${restaurant_id}`);
  },
  editProduct(menu_id: string, product_id: string, restaurant_id: string, body: any) {
    return instance.put(`/v1/menus/${menu_id}/product/${product_id}?restaurant_id=${restaurant_id}`, body);
  },
  createProduct(menu_id: string, body: any) {
    return instance.post(`/v1/menus/${menu_id}/product`, body);
  },
  deleteProduct(menu_id: string, product_id: string, restaurant_id: string, isDeleted: boolean) {
    return instance.patch(`/v1/menus/${menu_id}/product/${product_id}?restaurant_id=${restaurant_id}&set_disable=${isDeleted}`);
  },
  uploadProductImg(menu_id: string, body: any) {
    // console.log(body[0]);
    return instance.put(`/v1/menus/${menu_id}/image`, body);
  },
  getAttributeProductList(restaurant_id: string, menu_id: string, product_id: string, attribute_group_name: string, min: number, max: number) {
    return instance.post(`/v1/restaurant/${restaurant_id}/menu/${menu_id}/new-attribute-group?product_id=${product_id}&attribute_group_name=${attribute_group_name}&min=${min}&max=${max}`);
  },
  editAttributeGroup(restaurant_id: string, menu_id: string, body: any) {
    return instance.put(`/v1/restaurant/${restaurant_id}/menu/${menu_id}/update-attribute-group`, body);
  },
  getDefaultAttributes(restaurant_id: string, product_id: string) {
    return instance.get(`/v1/restaurant/${restaurant_id}/product/${product_id}/attributes`);
  },
  addAttributetoAttributeGroup(restaurant_id: string, menu_id: string, body: any) {
    return instance.put(`/v1/restaurant/${restaurant_id}/menu/${menu_id}/new-attribute-group`, JSON.stringify(body));
  },
  getMenuPriceUpdates(menu_id: string, restaurant_id: string) {
    return instance.get(`/menus/${menu_id}/get-price-updates?restaurant_id=${restaurant_id}`);
  },
  editMenuSections(menu_id: string, body: any) {
    return instance.put(`/v1/menus/${menu_id}/collection`, body);
  },
  getUpdatedPriceList(restaurant_id: string) {
    return instance.get(`/v1/restaurant/${restaurant_id}/get-updates`);
  },
  updateMenuPriceList(restaurant_id: string, body: any) {
    return instance.put(`/v1/restaurant/${restaurant_id}/update-product-price`, JSON.stringify(body));
  },
  getAttributeGroup(restaurant_id: string, menu_id: string, search: string = "") {
    if (search.trim().length) {
      return instance.get(`/v1/menus/${menu_id}/attribute-groups-search?param=${search}`);
    }

    return instance.get(`/v1/restaurant/${restaurant_id}/menu/${menu_id}/get-attribute-groups?page=1`);

  },
  getAttributeGroupDetails(restaurant_id: string, menu_id: string, product_id: string, attribute_group_id: string) {
    return instance.get(`/v1/restaurant/${restaurant_id}/menu/${menu_id}/get-attribute-group?product_id=${product_id}&attribute_group_id=${attribute_group_id}`);
  },
  getAttributeGroupProducts(menu_id: string, attribute_group_id: string) {
    return instance.get(`/v1/menus/${menu_id}/attribute-group/${attribute_group_id}/products`);
  },
  updateAttributeGroup(menu_id: string, attribute_group_id: string, body: any) {
    return instance.patch(`/v1/menus/${menu_id}/attribute-group/${attribute_group_id}/products`, JSON.stringify(body));
  },
  uploadMenus(body: any) {
    return instance.post(`/v1/menus/upload`, body);
  },
  uploadMenuWolt(body: any) {
    return instance.post(`/v1/menus/upload-wolt`, body);
  },
  menuValidation(menu_id: string) {
    return instance.get(`/v1/menus/${menu_id}/health-menu_validation`);
  },
  addExistAttributeGroup(menu_id: string, product_id: string, attribute_group_id: string) {
    return instance.post(`/v1/menus/${menu_id}/product/${product_id}/add-attribute-group/${attribute_group_id}`);
  },
  addMenuCollection(menu_id: string, name: string) {
    return instance.post(`/v1/menus/${menu_id}/collection`, { name });
  },
  updateMenuCollection(menu_id: string, body: any) {
    return instance.put(`/v1/menus/${menu_id}/collection`, body);
  },
  deleteMenuCollection(menu_id: string, body: any) {
    return instance.patch(`/v1/menus/${menu_id}/collection`, body);
  },
  addMenuCategory(menu_id: string, body: any) {
    return instance.post(`/v1/menus/${menu_id}/section`, body);
  },
  deleteMenuCategory(menu_id: string, body: any) {
    return instance.patch(`/v1/menus/${menu_id}/section`, body);
  }
};
export const locationsApi = {
  getLocations(payload: any, query: string): any {
    return instance.get(`/v1/locations?page=${payload.page}&per_page=10${query}`);
  },
  getAllLocations() {
    return instance.get(`/v1/locations/all`);
  },
  getLocationById(restaurant_id: string) {
    return instance.get(`/v1/locations/${restaurant_id}`);
  },
  deleteLocations(restaurant_id: string) {
    return instance.delete(`/v1/locations/${restaurant_id}`);
  },
  editLocationData(restaurant_id: string, body: any) {
    return instance.patch(`/v1/locations/${restaurant_id}`, body);
  },
  addRestaurant(body: any) {
    return instance.post(`/v1/locations`, body);
  },
  getCities() {
    return instance.get(`/v1/locations/cities`);
  },
  getIIKO_orgnizations(api_login: string) {
    return instance.get(`/v1/iiko/organizations?api_login=${api_login}`);
  },
  createIIKO_organizations(body: any) {
    return instance.post(`/v1/iiko/organizations`, body);
  },
  getPaymentTypes(rest_id: string) {
    return instance.get(`/v1/iiko/payment_types?restaurant_id=${rest_id}`);
  },
  createGlovoIntegration(body: any) {
    return instance.post(`/v1/integrations/glovo`, body);
  },
  createWoltIntegration(body: any) {
    return instance.post(`/v1/integrations/wolt`, body);
  },
  disableLocationIntegration(location_id: string, is_integrated: boolean) {
    return instance.post(`/v1/locations/${location_id}/integration`, { 'available': is_integrated });
  },
  // EDIT LOCATIONS 
  getCashSystem(restaurant_id: string) {
    return instance.get(`/v1/iiko/organizations/${restaurant_id}`);
  },
  editCashSystem(body: any) {
    return instance.put(`/v1/iiko/organizations`, body);
  },
  patchIntegration(body: any) {
    return instance.patch(`/v1/integrations`, body);
  },
  getLanguages() {
    return instance.get(`/v1/locations/languages`);
  },
  getCurrencies() {
    return instance.get(`/v1/locations/currencies`);
  },
  getWoltStatusses(resti_id: string, aggregator: string) {
    return instance.get(`/v1/integrations/${resti_id}?aggregator=${aggregator}`);
  }
};
export const stopListsApi = {
  getSections(restaurant_id: string): Promise<any> {
    return instance.get(`/v1/restaurant/${restaurant_id}/sections`);
  },
  getProducts(rest_id: string, menu_id: string, per_page: number = 10, page: number = 1, available?: boolean): Promise<any> {
    return instance.get(`/v1/restaurant/${rest_id}/products?page=${page}&per_page=${per_page}&field=price${available !== undefined ? `&available=${available}` : ""}&menu_id=${menu_id}`);
  },
  switchModeStopListProd(restaurant_id: string, product_id: string, is_available: boolean) {
    const body = JSON.stringify({ available: !is_available });
    return instance.patch(`/v1/restaurant/${restaurant_id}/stoplist/${product_id}`, body);
  },
  updateStopLists(menu_id: string) {
    return instance.post(`/v1/menus/${menu_id}/update-status-available`);
  },
  updateStops(restaurant_id: string) {
    return instance.post(`/stoplist?token=${restaurant_id}`);
  },
  getProductStores(product_id: string, is_available: boolean) {
    return instance.get(`/v1/products/stores/${product_id}?is_available=${is_available}`);
  },
  enableProduct(product_id: string, data: any) {
    return instance.patch(`/v1/products/${product_id}/stoplist/enable`, data);
  },
  disableProduct(product_id: string, data: any) {
    return instance.patch(`/v1/products/${product_id}/stoplist/disable`, data);
  }
};
export const settingsApi = {
  getPickupTime(restaurant_id: string) {
    return instance.get(`/v1/restaurant/${restaurant_id}/adjusted-pickup-time`);
  },
  updatePickupTime(restaurant_id: string, time: number) {
    const body = JSON.stringify({ time: time });
    return instance.put(`/v1/restaurant/${restaurant_id}/adjusted-pickup-time`, body);
  }
};

export const callCenterApi = {
  getOrders() {
    return instance.get(`/v1/callcenter/orders`);
  },
  getLocations() {
    return instance.get(`/v1/callcenter/locations`);
  },
  postOrders(body: { restaurant_id: string, order_id: string }) {
    return instance.post(`/v1/callcenter/orders`, body);
  },
  putOrders(order_id: string, body: { status: string }) {
    return instance.put(`/v1/callcenter/orders/${order_id}`, body);
  }
};

export const selectAllApi = {
  getLocations(menu_id: string) {
    return instance.get(`/v1/locations/group/642ab068d5ad369ab4647d44`);
  }
};
