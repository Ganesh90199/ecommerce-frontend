import api from "../api/axiosConfig";

// Place Order
export const placeOrder = async (orderData) => {

    return await api.post(
        "/orders",
        orderData,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

// Get My Orders
export const getMyOrders = async () => {

    return await api.get(
        "/orders/my",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

export const cancelOrder = async (
    orderId
) => {

    return await api.put(
        `/orders/cancel/${orderId}`,
        {},
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

export const getAllOrders = async () => {

    return await api.get(
        "/orders/admin/all",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

export const updateOrderStatus = async (
    orderId,
    status
) => {

    return await api.put(
        `/orders/admin/status/${orderId}`,
        {
            status
        },
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};
export const getDashboardData = async () => {

    return await api.get(
        "/orders/admin/dashboard",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};
export const getOrderStatusCounts = async () => {

    return await api.get(
        "/orders/admin/order-status",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};