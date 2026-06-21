import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart as addToCartApi } from "../services/cartService";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [product, setProduct] = useState(null);

    const userEmail =
        localStorage.getItem("userEmail");

    const wishlistKey =
        `wishlist_${userEmail}`;

    const [wishlist, setWishlist] = useState(
        JSON.parse(
            localStorage.getItem(wishlistKey)
        ) || []
    );
    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            setWishlist([]);
        }

    }, []);
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

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            window.dispatchEvent(
                new CustomEvent(
                    "showToast",
                    {
                        detail: {
                            message:
                                "Added To Cart",
                            type: "success"
                        }
                    }
                )
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

            alert(
                "Please login to use wishlist"
            );

            navigate("/login");

            return;
        }

        const exists =
            wishlist.find(
                item => item.id === product.id
            );

        let updatedWishlist;

        if (exists) {

            updatedWishlist =
                wishlist.filter(
                    item => item.id !== product.id
                );

        } else {

            updatedWishlist = [
                ...wishlist,
                product
            ];
        }

        setWishlist(
            updatedWishlist
        );

        localStorage.setItem(
            wishlistKey,
            JSON.stringify(updatedWishlist)
        );

        window.dispatchEvent(
            new Event("wishlistUpdated")
        );
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

                    <div className="col-md-4 text-center">

                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{
                                maxHeight: "350px",
                                objectFit: "contain"
                            }}
                        />

                    </div>

                    <div className="col-md-8">

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

                        {role !== "ADMIN" && (

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
                                    {
                                        localStorage.getItem("token") &&
                                            wishlist.some(
                                                item => item.id === product.id
                                            )
                                            ? "❤️ Wishlisted"
                                            : "🤍 Wishlist"
                                    }
                                </button>

                            </div>

                        )}
                    </div>

                </div>

            </div>

        </div >
    );
}

export default ProductDetails;