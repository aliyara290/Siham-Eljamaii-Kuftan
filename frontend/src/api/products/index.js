import apiSt from "..";
export const getProductsByCollection = (slug) => apiSt.get(`/v1/products/filters/category/${slug}`); 
// export const get
export const getProductBySlug = (slug) => apiSt.get(`/v1/products/${slug}`);
export const getRecentProducts = () => apiSt.get(`/v1/recent-products`);