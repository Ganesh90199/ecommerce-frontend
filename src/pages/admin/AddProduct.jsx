import { useState } from "react";
import {
    addProduct as addProductApi
} from "../../services/productService";

function AddProduct() {

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        rating: "",
        imageUrl: "",
        stock: "",
    });

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const addProduct = async () => {

        try {

            await addProductApi({

                name: product.name,

                brand: product.brand,

                category: product.category,

                description: product.description,

                price: Number(product.price),

                rating: Number(product.rating),

                imageUrl: product.imageUrl,

                quantity: Number(product.stock)
            });

            alert(
                "Product Added Successfully"
            );

            setProduct({

                name: "",
                brand: "",
                category: "",
                description: "",
                price: "",
                rating: "",
                imageUrl: "",
                stock: ""
            });
        } catch (error) {

            console.log(error);

            alert(
                "Failed To Add Product"
            );
        }
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

                    <textarea
                        className="form-control mb-3"
                        placeholder="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        step="0.1"
                        className="form-control mb-3"
                        placeholder="Rating"
                        name="rating"
                        value={product.rating}
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