import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {

        alert("Access Denied. Please login.");

        return <Navigate to="/login" />;
    }

    if (role !== "ADMIN") {

        alert("Access Denied.");

        return <Navigate to="/products" />;
    }

    return children;
}

export default AdminProtectedRoute;