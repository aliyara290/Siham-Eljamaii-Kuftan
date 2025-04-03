import apiSt from "..";

export const getCollections = () => apiSt.get("/v1/categories");

export const getCollection = (id) => apiSt.get(`/v1/categories/${id}`);