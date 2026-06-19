import api from "../api/axiosConfig";

// Add Product To Cart
export const addToCart = async (
    productId,
    quantity = 1
) => {

    return await api.post(
        "/cart",
        {
            productId,
            quantity
        },
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

// Get My Cart
export const getMyCart = async () => {

    return await api.get(
        "/cart/my",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

// Get Cart Details
export const getCartDetails = async () => {

    return await api.get(
        "/cart/details",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

// Update Quantity
export const updateCartQuantity = async (
    cartId,
    quantity
) => {

    return await api.put(
        `/cart/${cartId}`,
        {
            quantity
        },
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};
export const clearCart = async () => {

    return await api.delete(
        "/cart/clear",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

// Remove Item
export const removeCartItem = async (
    cartId
) => {

    return await api.delete(
        `/cart/item/${cartId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};