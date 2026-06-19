import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart as addToCartApi } from "../services/cartService";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        loadProduct();

    }, [id]);

    const loadProduct = async () => {

        try {

            const response =
                await getProductById(id);

            setProduct(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!product) {

        return (
            <div className="container mt-5">
                Loading Product...
            </div>
        );
    }

    const addToCart = async () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Please login to add items to cart"
            );

            navigate("/login");

            return;
        }

        try {

            await addToCartApi(
                product.id,
                1
            );

            alert(
                "Added To Cart"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Add Item"
            );
        }
    };
    const buyNow = () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert("Please login to continue");

            navigate("/login");

            return;
        }

        localStorage.setItem(
            "buyNowProduct",
            JSON.stringify({
                ...product,
                cartQuantity: 1
            })
        );

        navigate("/checkout");
    };

    const addToWishlist = () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert("Please login to use wishlist");

            navigate("/login");

            return;
        }

        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        const exists =
            wishlist.find(
                item => item.id === product.id
            );

        if (!exists) {

            wishlist.push(product);

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );
        }

        alert("Added to Wishlist ❤️");
    };

    return (

        <div
            className="container"
            style={{
                marginBottom: "30px"
            }}
        >

            <div className="card shadow p-4">

                <div className="row">

                    <div className="col-md-5 text-center">

                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid"
                        />

                    </div>

                    <div className="col-md-7">

                        <h2>{product.name}</h2>

                        <h5 className="text-muted">
                            {product.brand}
                        </h5>

                        <h4 className="text-warning">
                            ⭐ {product.rating}
                        </h4>

                        <h2 className="text-success">
                            ₹{product.price}
                        </h2>

                        <p className="mt-3">
                            {product.description}
                        </p>

                        <div className="d-flex gap-3">

                            <button
                                className="btn btn-primary"
                                onClick={addToCart}
                            >
                                Add To Cart
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={buyNow}
                            >
                                Buy Now
                            </button>

                            <button
                                className="btn btn-outline-danger"
                                onClick={addToWishlist}
                            >
                                Wishlist ❤️
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;