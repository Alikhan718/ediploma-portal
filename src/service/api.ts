import axios from 'axios';
import {data} from "browserslist";

const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
const generatorURL = process.env.REACT_APP_GENERATOR_API_BASE_URL;

const instance = axios.create({
    baseURL: baseURL,
});

const customInstance = axios.create();

customInstance.interceptors.request.use((request) => {
    // for custom interceptors
    return request;
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
const instances = [instance, customInstance];

//for interceptors
for (let i = 0; i < instances.length; i++) {
    instances[i].interceptors.response.use(
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
}


export const authApi = {
    login(body: { email: string, password: string }) {
        return instance.post(`/auth/login`, body);
    },
    register(body: { email: string, password: string, name: string }) {
        return instance.post(`/auth/register`, body);
    },
    authDS(body: any) {
        return instance.post(`/auth/authorize-with-ds`, body);
    },
    validateEmail(body: { email: string, code: string }) {
        return instance.post(`/otp/validate`, body);
    },
    resetPassword(body: { email: string, password: string, repassword: string, code: string }) {
        return instance.post(`/auth/password-reset`, body);
    },
    getOtp(body: { email: string }) {
        return instance.post(`/otp/send`, body);
    },
    saveXml(body: { xml: string }) {
        return instance.post(`/users/sign-xml-with-ds`, body);
    },
    getMetadataCid(body: { university_id: number }) {
        return customInstance.get(`${generatorURL}/nft/generate/${body.university_id}`);
    },
    generateSmartContract(body: { CID: string, symbol: string, name: string }) {
        return instance.post(`/smart-contract/generate`, body);
    },
    getProfile() {
        return instance.get(`/users/profile`);
    },
    updateProfile(body: any) {
        return instance.post(`/users/profile`, body);
    }
};


export const diplomasApi = {
    getDiplomas(body: { page: number, per_page: number, university_id: number | null }) {
        let query = `diploma?page=${body.page}&per_page=${body.per_page}&`;
        if (body.university_id != null) {
            query += `university_id=${body.university_id}&`;
        }
        return instance.get(query);
    },
    async getContracts() {
        let link = "ipfs://bafybeief3kcfslilus4flria2b77w6w44pd5pn4apxuvmmdkhttgkywnb4/fullMetadata.json";
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
        let query = `graduates/search?`;
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
    getGraduateDetails(body: any) {
        if (!body.name) {
            return;
        }
        return instance.get(`graduate-details?name=${body.name}`);
    }
};

export const generatorApi = {
    parseDataFromFile(body: { file: File }) {
        const formData = new FormData();
        formData.append('file', body.file, body.file.name);
        formData.append('university_id', "1");

        // Send the file using axios
        return customInstance.post(`${generatorURL}/data/parse`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

};