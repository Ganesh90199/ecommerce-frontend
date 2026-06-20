import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllProducts,
    deleteProduct as deleteProductApi
} from "../../services/productService";

function ManageProducts() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response =
                await getAllProducts();

            setProducts(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const deleteProduct = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteProductApi(id);

            alert(
                "Product Deleted Successfully"
            );

            loadProducts();

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Delete Product"
            );
        }
    };
    const filteredProducts =
        products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (
        <div className="container py-4">

            <div className="card shadow-sm">

                <div className="card-header bg-dark text-white">

                    <div className="d-flex justify-content-between align-items-center">

                        <h3 className="mb-0">
                            Manage Products
                        </h3>

                        <span className="badge bg-primary">
                            {products.length} Products
                        </span>

                    </div>

                </div>

                <div className="card-body">

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="🔍 Search Product"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {filteredProducts.length === 0 ? (

                        <div className="alert alert-info">
                            No Products Found
                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredProducts.map(
                                        (product) => (
                                            <tr key={product.id}>

                                                <td>
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        width="60"
                                                        height="60"
                                                        style={{
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                </td>

                                                <td>
                                                    {product.name}
                                                </td>

                                                <td>
                                                    {product.brand}
                                                </td>

                                                <td>
                                                    {product.category}
                                                </td>

                                                <td>
                                                    ₹{product.price}
                                                </td>

                                                <td>
                                                    {product.quantity}
                                                </td>

                                                <td>
                                                    {product.quantity === 0 ? (
                                                        <span className="badge bg-danger">
                                                            Out Of Stock
                                                        </span>
                                                    ) : product.quantity <= 5 ? (
                                                        <span className="badge bg-warning text-dark">
                                                            Low Stock
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-success">
                                                            In Stock
                                                        </span>
                                                    )}
                                                </td>
                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            to={`/admin/update-product/${product.id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                deleteProduct(product.id)
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ManageProducts;