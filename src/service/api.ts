import axios from 'axios';
import {data} from "browserslist";

// const baseURL = 'http://localhost:8080';
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
        if (!request.headers!["Content-Type"]) {
            request.headers!["Content-Type"] = "application/json";
        }
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
            // hi
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
    saveXml(body: { xml: string, signed_by: string }) {
        console.log(body);
        return instance.post(`/users/sign-xml-with-ds`, body);
    },
    getMetadataCid(body: { university_id: number }) {
        return customInstance.get(`${generatorURL}/nft/generate/${body.university_id}`);
    },
    generateSmartContract(body: { CID: string, symbol: string, name: string, university_id: number }) {
        return instance.post(`/smart-contract/generate`, body);
    },
    getProfile() {
        return instance.get(`/users/profile`);
    },
    updateProfile(body: any) {
        return instance.post(`/users/profile`, body);
    },
    uploadFile(body: { file: File }) {
        const formData = new FormData();
        formData.append('file', body.file, body.file.name);
        formData.append('university_id', "1");

        return instance.post(`/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getUniversitiesList(){
        return instance.get(`/users/universities/get`);
    },
    getEmployersList(){
        return instance.get(`/users/employers/get`);
    },
    putVisibility(body: { visibility: boolean }) {
        return instance.put(`/users/visibility`, body);
    },
    getEmployersSearch(body: { field: string, text: string }) {
        let query = `/users/employers/search?`;
        if (body.field != "") {
            query += `field=${body.field}&`;
        }
        return instance.get(query);
    },
    getEmployerDetails(id:any) {
        return instance.get(`/users/employers/${id.id}`);
    },
    getResumeGenerate() {
        return instance.get(`/users/resume-generate`);
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
        ratingL: number,
        ratingR: number,
        university_id: number,
    })
    {
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
        if (body.university_id != 0) {
            query += `university_id=${body.university_id}&`;
        }
        if (body.gpaL != 1 || body.gpaR != 4) {
            if (body.gpaL != 0) {
                query += `gpaL=${body.gpaL}&`;
            }
            if (body.gpaR != 0) {
                query += `gpaR=${body.gpaR}&`;
            }
        }
        if (body.ratingL != 0 || body.ratingR != 5) {
            if (body.ratingL != 0) {
                query += `ratingL=${body.ratingL}&`;
            }
            if (body.ratingR != 0) {
                query += `ratingR=${body.ratingR}&`;
            }
        }
        return instance.get(query);
    },
    getGraduateDetails(id: string) {
        return instance.get(`/diploma/${id}`);
    },
    toogleFavoriteDiplomas(body: { diploma_id: number }) {
        return instance.post(`/users/favorite-diplomas/toogle`, body);
    },
    getFavoriteDiplomas() {
        return instance.get(`/users/favorite-diplomas/get`);
    },
    getTranscriptDetails(student_id: string) {
        const body = {
            "StudentId": student_id
        };
        const headers = {
            // Add your headers here
            "Authorization": "Basic ZGlwbG9tYV9uZnQ6RGQxMjM0NTY=",
            // Add more headers if needed
        };

        return customInstance.post(`https://extapi.satbayev.university/diploma/1.0.1/getDetail`, body, { headers });
    }
};

export const generatorApi = {
    parseDataFromFile(body: { file: File | null, university_id: string, type: string }) {
        const formData = new FormData();
        if (body?.file) {
            formData.append('file', body.file, body.file.name);
        }
        formData.append('university_id', body.university_id);
        formData.append('type', body.type);

        // Send the file using axios
        return customInstance.post(`${generatorURL}/data/parse`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

};

export const analyticsApi = {
    getGraduatesAmount() {
        return instance.get(`/analytics/graduates-amount`);
    },
}

export const vacancyApi = {
    postApply(body: { vacancy_id: number }) {
        return instance.post(`/vacancy/apply`, body);
    },
    getApplications() {
        return instance.get(`/vacancy/applications`);
    },
    putStatus(body: { application_id: number, status: string }) {
        return instance.put(`/vacancy/status`, body);
    }
};