import apiSt from "..";
export const postRequest = (data) => apiSt.post(`/v1/contacts`, data);
