import axios from 'axios';

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
    validateEmail(body: { email: string, code: string }) {
        return instance.post(`/verify-otp`, body);
    },
    resetPassword(body: { email: string, password: string, repassword: string, code: string }) {
        return instance.post(`/password-reset`, body);
    },
    getOtp(body: { email: string }) {
        return instance.post(`/get-otp`, body);
    },
};


export const diplomasApi = {
    async getContracts() {
        let link = "ipfs://bafybeidbedhhugo2nck5b7x5edxgpflnigwsj4jqf2gx24ddm5jvske7cu/fullMetadata.json";
        link = link.replace("ipfs://", "https://ipfs.io/ipfs/");
        return instance.get(link);
    },
    checkIIN(body: { name: string, iin: string }) {
        return instance.get(`validate-iin?name=${body.name}&iin=${body.iin}`);
    },
    search(body: {
        text: string,
        specialities: string,
        region: string,
        degree: string,
        year: number,
        gpaL: number,
        gpaR: number,
    }) {
        let query = `search?`;
        if (body.text != "") {
            query += `name=${body.text}&`;
        }
        if (body.specialities != "") {
            query += `specialities=${body.specialities}&`;
        }
        if (body.region != "") {
            query += `region=${body.region}&`;
        }
        if (body.degree != "") {
            query += `degree=${body.degree}&`;
        }
        if (body.year != 0) {
            query += `year=${body.year}&`;
        }
        if (body.gpaL != 1 || body.gpaR != 4) {
            if (body.gpaL != 0) {
                query += `gpaL=${body.gpaL}&`;
            }
            if (body.gpaR != 0) {
                query += `gpaR=${body.gpaR}&`;
            }
        }
        return instance.get(query);
    },
    getGraduateDetails(name: string) {
        return instance.get(`graduate-details?name=${name}`);
    }
};