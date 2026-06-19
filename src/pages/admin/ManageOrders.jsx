import { useEffect, useState } from "react";
import {
    getAllOrders,
    updateOrderStatus
} from "../../services/orderService";

function ManageOrders() {

    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {

        try {

            const response =
                await getAllOrders();

            setOrders(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        loadOrders();

    }, []);

    const updateStatus = async (
        id,
        status
    ) => {

        try {

            await updateOrderStatus(
                id,
                status
            );

            loadOrders();

        } catch (error) {

            console.log(error);
        }
    };
    return (
        <div className="container py-4">

            <div className="card shadow-sm">

                <div className="card-header bg-dark text-white">
                    <h3 className="mb-0">
                        Manage Orders
                    </h3>
                </div>

                <div className="card-body">

                    {orders.length === 0 ? (

                        <div className="alert alert-info">
                            No Orders Found
                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-bordered">

                                <thead className="table-dark">

                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {orders.map((order) => (

                                        <tr key={order.id}>

                                            <td>
                                                {order.id}
                                            </td>

                                            <td>
                                                {
                                                    order.orderDate
                                                        ? new Date(
                                                            order.orderDate
                                                        ).toLocaleString()
                                                        : "N/A"
                                                }
                                            </td>

                                            <td>
                                                ₹{order.totalAmount}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        order.status === "DELIVERED"
                                                            ? "badge rounded-pill bg-success px-3 py-2"
                                                            : order.status === "SHIPPED"
                                                                ? "badge rounded-pill bg-primary px-3 py-2"
                                                                : order.status === "CANCELLED"
                                                                    ? "badge rounded-pill bg-danger px-3 py-2"
                                                                    : "badge rounded-pill bg-warning text-dark px-3 py-2"
                                                    }
                                                    style={{
                                                        fontSize: "14px",
                                                        minWidth: "110px"
                                                    }}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>

                                            <td>

                                                <select
                                                    className="form-select"
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            order.id,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="PLACED">
                                                        PLACED
                                                    </option>

                                                    <option value="SHIPPED">
                                                        SHIPPED
                                                    </option>

                                                    <option value="DELIVERED">
                                                        DELIVERED
                                                    </option>

                                                    <option value="CANCELLED">
                                                        CANCELLED
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ManageOrders;