export const getRequestError = (e: any): string => {
  if (e.response) {
    if (e.response.message) {
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




};