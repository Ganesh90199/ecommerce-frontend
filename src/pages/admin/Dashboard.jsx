import { Link } from "react-router-dom";

function Dashboard() {
    const products =
        JSON.parse(
            localStorage.getItem("adminProducts")
        ) || [];

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    const totalRevenue =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.total || 0),
            0
        );

    const deliveredOrders =
        orders.filter(
            (order) =>
                order.status === "Delivered"
        ).length;

    const cancelledOrders =
        orders.filter(
            (order) =>
                order.status === "Cancelled"
        ).length;

    const lowStock =
        products.filter(
            (p) =>
                p.stock > 0 &&
                p.stock <= 5
        ).length;

    const outOfStock =
        products.filter(
            (p) =>
                Number(p.stock) === 0
        ).length;

    return (
        <div className="container py-4">

            <h1 className="mb-4">
                📊 Admin Dashboard
            </h1>

            <div className="row">

                <div className="col-md-3 mb-3">
                    <div className="card bg-primary text-white shadow">
                        <div className="card-body">
                            <h6>Total Products</h6>
                            <h2>{products.length}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-success text-white shadow">
                        <div className="card-body">
                            <h6>Total Orders</h6>
                            <h2>{orders.length}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-warning shadow">
                        <div className="card-body">
                            <h6>Revenue</h6>
                            <h2>₹{totalRevenue}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body">
                            <h6>Cancelled</h6>
                            <h2>{cancelledOrders}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>
                                Delivered Orders
                            </h5>
                            <h2>{deliveredOrders}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>
                                Low Stock
                            </h5>
                            <h2>{lowStock}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>
                                Out Of Stock
                            </h5>
                            <h2>{outOfStock}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow mt-4">
                <div className="card-header">
                    <h4>Quick Actions</h4>
                </div>

                <div className="card-body d-flex gap-2 flex-wrap">

                    <Link
                        to="/admin/add-product"
                        className="btn btn-success"
                    >
                        Add Product
                    </Link>

                    <Link
                        to="/admin/manage-products"
                        className="btn btn-primary"
                    >
                        Manage Products
                    </Link>

                    <Link
                        to="/admin/manage-orders"
                        className="btn btn-warning"
                    >
                        Manage Orders
                    </Link>

                </div>
            </div>

        </div>
    );
}

export default Dashboard;