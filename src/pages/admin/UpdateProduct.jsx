import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getProductById,
    updateProduct as updateProductApi
} from "../../services/productService";
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

        loadProduct();

    }, [id]);

    const loadProduct = async () => {

        try {

            const response =
                await getProductById(id);

            setProduct({

                name: response.data.name || "",

                brand: response.data.brand || "",

                category: response.data.category || "",

                price: response.data.price || "",

                imageUrl: response.data.imageUrl || "",

                stock: response.data.quantity || 0,

                description:
                    response.data.description || ""
            });

        } catch (error) {

            console.log(error);
        }
    };
    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const updateProduct = async () => {

        try {

            await updateProductApi(
                id,
                {
                    name: product.name,
                    brand: product.brand,
                    category: product.category,
                    price: Number(product.price),
                    imageUrl: product.imageUrl,
                    quantity: Number(product.stock),
                    description: product.description,
                    rating: 4.5
                }
            );

            alert(
                "Product Updated Successfully"
            );

            navigate(
                "/admin/manage-products"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Update Product"
            );
        }
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