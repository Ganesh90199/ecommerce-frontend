import api from "../api/axiosConfig";

// Save Address
export const saveAddress = async (
    address
) => {

    return await api.post(
        "/address",
        address,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

// Get Addresses
export const getAddresses = async () => {

    return await api.get(
        "/address",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

// Delete Address
export const deleteAddress = async (
    id
) => {

    return await api.delete(
        `/address/${id}`,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};