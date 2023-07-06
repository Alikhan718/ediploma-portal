export const getRequestError = (e: any): string => {
    try {
        if (e.response) {
            if (e.response.data.errors) {
                return e.response.data.errors[0].msg;
            } else if (e.response.message) {
                return e.response.message;
            } else if (e.response.error) {
                return e.response.error;
            } else if (e.response.detail) {
                return e.response.detail[0];
            } else if (e.response.data) {
                return e.response.data;
            } else if (e.reponse.data.detail) {
                return e.reponse.data.detail[0];
            } else {
                return "Error";
            }
        } else {
            return "Network Error";
        }
    } catch (err) {
        console.log("ERROR PARSING RESPONSE: ", err);
    }
    return "UNDEFINED ERROR";

};