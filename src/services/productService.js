import api from "../api/axiosConfig";

export const getAllProducts = async () => {
    return await api.get("/products");
};

export const getProductById = async (id) => {
    return await api.get(`/products/${id}`);
};

export const addProduct = async (product) => {

    return await api.post(
        "/products/admin/add",
        product,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

export const updateProduct = async (
    id,
    product
) => {

    return await api.put(
        `/products/admin/update/${id}`,
        product,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

export const deleteProduct = async (
    id
) => {

    return await api.delete(
        `/products/admin/delete/${id}`,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};