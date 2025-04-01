import apiSt from "..";

export const getColors = () => apiSt.get("/v1/colors"); 

export const getColor = (id) => apiSt.get(`/v1/colors/${id}`);  

export const createColor = (data) => apiSt.post('/v1/colors', data);

export const updateColor = (id, data) => apiSt.put(`/v1/colors/${id}`, data);

export const deleteColor = (id) => apiSt.delete(`/v1/colors/${id}`);