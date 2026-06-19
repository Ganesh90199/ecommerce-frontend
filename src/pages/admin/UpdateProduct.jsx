import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        price: "",
        imageUrl: "",
        stock: 0,
    });

    useEffect(() => {

        const products =
            JSON.parse(
                localStorage.getItem("adminProducts")
            ) || [];

        const selectedProduct =
            products.find(
                (p) => p.id === Number(id)
            );

        if (selectedProduct) {
            setProduct(selectedProduct);
        }

    }, [id]);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const updateProduct = () => {

        const products =
            JSON.parse(
                localStorage.getItem("adminProducts")
            ) || [];

        const updatedProducts =
            products.map((p) =>
                p.id === Number(id)
                    ? {
                        ...product,
                        stock: Number(product.stock)
                    }
                    : p
            );

        localStorage.setItem(
            "adminProducts",
            JSON.stringify(updatedProducts)
        );

        alert("Product Updated Successfully");

        navigate("/admin/manage-products");
    };

    return (
        <div className="container py-4">

            <div className="card shadow-sm">

                <div className="card-header bg-warning">
                    <h3 className="mb-0">
                        Update Product
                    </h3>
                </div>

                <div className="card-body">

                    <input
                        className="form-control mb-3"
                        placeholder="Product Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Brand"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Image URL"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Stock Quantity"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-warning"
                        onClick={updateProduct}
                    >
                        Update Product
                    </button>

                </div>

            </div>

        </div>
    );
}

export default UpdateProduct;