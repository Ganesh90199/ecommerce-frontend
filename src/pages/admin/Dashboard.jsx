import { useEffect, useState } from "react";
import {
    getDashboardData,
    getOrderStatusCounts
} from "../../services/orderService";

function AdminDashboard() {

    const [dashboard, setDashboard] =
        useState({
            totalProducts: 0,
            totalOrders: 0,
            totalUsers: 0,
            totalRevenue: 0
        });

    const [statusData, setStatusData] =
        useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const dashboardResponse =
                await getDashboardData();

            setDashboard(
                dashboardResponse.data
            );

            const statusResponse =
                await getOrderStatusCounts();

            setStatusData(
                statusResponse.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="container py-4">

            <h2 className="mb-4">
                📊 Admin Dashboard
            </h2>

            <div className="row g-4 mb-4">

                <div className="col-lg-2 col-md-4 col-sm-6">

                    <div
    className="card shadow border-0 h-100"
>

                        <div className="card-body text-center">

                            <h6 className="text-muted">
                                Total Products
                            </h6>

                            <h2 className="fw-bold text-primary">
                                {dashboard.totalProducts}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">

                    <div
    className="card shadow border-0 h-100"
>

                        <div className="card-body text-center">

                            <h6 className="text-muted">
                                Total Orders
                            </h6>

                            <h2 className="fw-bold text-success">
                                {dashboard.totalOrders}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">

                    <div
    className="card shadow border-0 h-100"
>

                        <div className="card-body text-center">

                            <h6 className="text-muted">
                                Total Users
                            </h6>

                            <h2 className="fw-bold text-warning">
                                {dashboard.totalUsers}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">

                    <div
    className="card shadow border-0 h-100"
>

                        <div className="card-body text-center">

                            <h6 className="text-muted">
                                Total Revenue
                            </h6>

                            <h3 className="fw-bold text-danger">
                                ₹{dashboard.totalRevenue.toLocaleString()}
                            </h3>
                        </div>

                    </div>

                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">

                    <div
    className="card shadow border-0 h-100"
>

                        <div className="card-body text-center">

                            <h6 className="text-muted">
                                Low Stock Products
                            </h6>

                            <h2 className="fw-bold text-warning">
                                {dashboard.lowStockProducts}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">

                    <div
    className="card shadow border-0 h-100"
>

                        <div className="card-body text-center">

                            <h6 className="text-muted">
                                Out Of Stock Products
                            </h6>

                            <h2 className="fw-bold text-danger">
                                {dashboard.outOfStockProducts}
                            </h2>

                        </div>

                    </div>

                </div>

                <div
    className="card shadow border-0 h-100"
>

                    <div className="card-header bg-dark text-white">

                        <h5 className="mb-0">
                            Orders By Status
                        </h5>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered">

                            <thead>

                                <tr>
                                    <th>Status</th>
                                    <th>Orders</th>
                                </tr>

                            </thead>

                            <tbody>

                                {statusData.map((item) => (

                                    <tr key={item.status}>

                                        <td>
                                            {item.status}
                                        </td>

                                        <td>
                                            {item.count}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>

    );
}

export default AdminDashboard;