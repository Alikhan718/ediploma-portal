import axios from 'axios';
import {create} from "ipfs-http-client";
import {ethers} from "ethers";

const per_page = process.env.REACT_APP_ORDERS_PER_PAGE;
const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

const instance = axios.create({
    baseURL: baseURL
});

instance.interceptors.request.use((request) => {
    if (!request.url!.includes("ipfs")) {
        const token = localStorage.getItem("token");
        if (token) {
            request.headers!["x-auth-token"] = `${token}`;
        }
        request.headers!["x-auth-token"] = `${token}`;
        request.headers!["Content-Type"] = "application/json";
    }

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

                return instance(prevReq);
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
);



export const authApi = {
    login(body: { email: string, password: string }) {
        return instance.post(`/login`, body);
    },
    register(body: { email: string, password: string, companyName: string }) {
        return instance.post(`/register`, body);
    },
    validateEmail(body: {email: string, code: string}) {
        return instance.post(`/verify-otp`, body);
    }
};

export const selectAllApi = {
    getLocations(menu_id: string) {
        return instance.get(`/v1/locations/group/642ab068d5ad369ab4647d44`);
    }
};

export const diplomasApi = {
    async getContracts() {
        let link = "ipfs://bafybeidbedhhugo2nck5b7x5edxgpflnigwsj4jqf2gx24ddm5jvske7cu/fullMetadata.json";
        link = link.replace("ipfs://", "https://ipfs.io/ipfs/");

        return instance.get(link);
    },
    checkIIN(body: {name: string, iin: string}) {
        return instance.get(`validate-iin?name=${body.name}&iin=${body.iin}`);
    }
}