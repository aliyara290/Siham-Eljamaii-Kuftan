import apiSt from "..";

export const getProductsByCollection = (slug) => apiSt.get(`/v1/products/filters/category/${slug}`); 

export const getColor = (id) => apiSt.get(`/v1/colors/${id}`);  