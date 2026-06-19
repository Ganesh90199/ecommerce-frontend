import api from "../api/axiosConfig";


export const getAllProducts = async () => {
    return await api.get("/products");
};
export const getProductById = async (id) => {
    return await api.get(`/products/${id}`);
};