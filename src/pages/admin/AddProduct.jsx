import { useState } from "react";

function AddProduct() {

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        price: "",
        imageUrl: "",
        stock: "",
    });

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const addProduct = () => {

        const products =
            JSON.parse(
                localStorage.getItem("adminProducts")
            ) || [];

        products.push({
            id: Date.now(),
            ...product,
            stock: Number(product.stock),
        });

        localStorage.setItem(
            "adminProducts",
            JSON.stringify(products)
        );

        alert("Product Added Successfully");

        setProduct({
            name: "",
            brand: "",
            category: "",
            price: "",
            imageUrl: "",
            stock: 0,
        });
    };

    return (
        <div className="container py-4">

            <div className="card shadow-sm">

                <div className="card-header bg-primary text-white">
                    <h3>Add Product</h3>
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
                        className="btn btn-success"
                        onClick={addProduct}
                    >
                        Add Product
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AddProduct;