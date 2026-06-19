import { useState, useEffect } from "react";
import Toast from "../components/Toast";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import { getAllProducts } from "../services/productService";

import {
    addToCart as addToCartApi,
    getCartDetails,
    updateCartQuantity,
    removeCartItem
} from "../services/cartService";


function Products() {
    const [showSuggestions, setShowSuggestions] =
        useState(false);

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(
        searchParams.get("category") || "All"
    );
    const [brand, setBrand] = useState("All");
    const [rating, setRating] = useState("All");
    const [sortBy, setSortBy] = useState("");

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    const [showToast, setShowToast] =
        useState(false);

    const [toastMessage, setToastMessage] =
        useState("");

    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );


    useEffect(() => {

        loadProducts();
        loadCart();

        const refreshWishlist = () => {

            setWishlist(
                JSON.parse(
                    localStorage.getItem("wishlist")
                ) || []
            );
        };

        window.addEventListener(
            "wishlistUpdated",
            refreshWishlist
        );

        return () => {

            window.removeEventListener(
                "wishlistUpdated",
                refreshWishlist
            );
        };

    }, []);
    const loadCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) return;

        try {

            const response =
                await getCartDetails();

            setCart(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const loadProducts = async () => {

        try {

            const response =
                await getAllProducts();

            setProducts(
                response.data.map(product => ({
                    ...product,
                    stock: product.quantity || 0
                }))
            );

        } catch (error) {

            console.log(error);
        }
    };

    const toggleWishlist = (product) => {

        const token = localStorage.getItem("token");

        if (!token) {

            setToastMessage(
                "Please login to use wishlist"
            );

            setShowToast(true);

            setTimeout(() => {

                setShowToast(false);

                navigate("/login");

            }, 600);

            return;
        }

        const exists = wishlist.find(
            item => item.id === product.id
        );

        let updatedWishlist;

        if (exists) {

            updatedWishlist =
                wishlist.filter(
                    item => item.id !== product.id
                );

            setToastMessage(
                `${product.name} removed from wishlist`
            );

        } else {

            updatedWishlist = [
                ...wishlist,
                product
            ];

            setToastMessage(
                `${product.name} added to wishlist ❤️`
            );
        }

        setWishlist(updatedWishlist);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        window.dispatchEvent(
            new Event("wishlistUpdated")
        );

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 1500);
    };


    const addToCart = async (product) => {

        const token = localStorage.getItem("token");

        if (!token) {

            setToastMessage(
                "Please login to add items to cart"
            );

            setShowToast(true);

            setTimeout(() => {

                setShowToast(false);

                navigate("/login");

            }, 600);

            return;
        }

        try {

            await addToCartApi(
                product.id,
                1
            );

            await loadCart();

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            setCart(
                await getCartDetails()
                    .then(res => res.data)
            );

            setToastMessage(
                `${product.name} added to cart`
            );

            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 1500);

        } catch (error) {

            console.log(error);

            setToastMessage(
                "Failed to add item"
            );

            setShowToast(true);
        }
    };
    const increaseQuantity = async (product) => {

        const existing =
            cart.find(
                item => item.productId === product.id
            );

        if (!existing) return;

        if (
            existing.cartQuantity >= existing.stock
        ) {

            setToastMessage(
                `Only ${existing.stock} items available`
            );

            setShowToast(true);

            return;
        }

        await updateCartQuantity(
            existing.cartId,
            existing.cartQuantity + 1
        );

        await loadCart();

        setToastMessage(
            `${product.name} quantity increased`
        );

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 1500);

    };


    const decreaseQuantity = async (product) => {

        const existing =
            cart.find(
                item => item.productId === product.id
            );

        if (!existing) return;

        if (existing.cartQuantity <= 1) {

            await removeCartItem(
                existing.cartId
            );

        } else {

            await updateCartQuantity(
                existing.cartId,
                existing.cartQuantity - 1
            );
        }

        await loadCart();

        setToastMessage(
            `${product.name} quantity decreased`
        );

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 1500);

    };


    const allProducts = [...products];

    const suggestions =
        allProducts.filter(product =>
            product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        )
            .slice(0, 5);

    let filteredProducts = [...allProducts];
    if (search) {
        filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category !== "All") {
        filteredProducts = filteredProducts.filter(
            (product) => product.category === category
        );
    }

    if (brand !== "All") {
        filteredProducts = filteredProducts.filter(
            (product) => product.brand === brand
        );
    }

    if (rating !== "All") {
        filteredProducts = filteredProducts.filter(
            (product) => product.rating >= Number(rating)
        );
    }

    if (sortBy === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const brands = [
        ...new Set(
            allProducts
                .filter(
                    product =>
                        (category === "All" ||
                            product.category === category) &&
                        product.brand
                )
                .map(
                    product => product.brand
                )
        )
    ];
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    return (
        <div
            className="container py-4"
        >
            <Toast
                message={toastMessage}
                show={showToast}
            />
            <div className="card shadow-sm p-3 mb-4">
                <div className="row g-3">

                    <div className="col-md-4">
                        <div className="position-relative">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search Products"
                                value={search}
                                onFocus={() =>
                                    setShowSuggestions(true)
                                }
                                onChange={(e) => {

                                    setSearch(
                                        e.target.value
                                    );

                                    setShowSuggestions(true);
                                }}
                            />

                            {
                                showSuggestions &&
                                search &&
                                (
                                    <div
                                        className="list-group position-absolute w-100 shadow"
                                        style={{
                                            zIndex: 1000
                                        }}
                                    >
                                        {
                                            suggestions.map(product => (

                                                <button
                                                    key={product.id}
                                                    className="list-group-item list-group-item-action"
                                                    onClick={() => {

                                                        setSearch(
                                                            product.name
                                                        );

                                                        setShowSuggestions(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    {product.name}
                                                </button>

                                            ))
                                        }
                                    </div>
                                )
                            }

                        </div>                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >
                            <option value="All">
                                Category
                            </option>
                            <option>Mobiles</option>
                            <option>Laptops</option>
                            <option>Electronics</option>
                            <option>Fashion</option>
                            <option>Books</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={brand}
                            onChange={(e) =>
                                setBrand(e.target.value)
                            }
                        >
                            <option value="All">
                                Brand
                            </option>

                            {brands.map((item, index) => (
                                <option
                                    key={`${item}-${index}`}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={rating}
                            onChange={(e) =>
                                setRating(e.target.value)
                            }
                        >
                            <option value="All">Rating</option>
                            <option value="4">4★ & Above</option>
                            <option value="4.5">4.5★ & Above</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value)
                            }
                        >
                            <option value="">Sort</option>
                            <option value="low">Low → High</option>
                            <option value="high">High → Low</option>
                        </select>
                    </div>

                </div>
            </div>

            <h5 className="mb-4">
                Showing {filteredProducts.length} Products
            </h5>

            <div className="row">

                {filteredProducts.map((product) => (
                    <div
                        className="col-xl-3 col-lg-4 col-md-6 mb-4"
                        key={product.id}
                    >
                        <div className="card h-100 shadow-sm border-0 position-relative">

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="card-img-top"
                                style={{
                                    height: "220px",
                                    objectFit: "cover",
                                }}
                            />

                            <div className="card-body">

                                <h5>{product.name}</h5>

                                <p className="text-muted mb-1">
                                    {product.brand || "No Brand"}
                                </p>

                                <p className="text-warning">
                                    ⭐ {product.rating || "N/A"}
                                </p>

                                <h4 className="text-success">
                                    ₹{product.price}
                                </h4>



                                <div className="d-grid gap-2 mt-3">

                                    <button
                                        className="btn position-absolute top-0 end-0 m-2 border-0 fs-4"
                                        style={{
                                            background: "white",
                                            borderRadius: "50%"
                                        }}
                                        onClick={() =>
                                            toggleWishlist(product)
                                        }
                                    >
                                        {
                                            wishlist.some(
                                                item => item.id === product.id
                                            )
                                                ? "❤️"
                                                : "🤍"
                                        }
                                    </button>

                                    {
                                        cart.find(
                                            item => item.productId === product.id
                                        ) &&
                                            Number(product.stock || product.quantity || 0) > 0 ? (

                                            <div className="d-flex justify-content-center align-items-center gap-2">

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        decreaseQuantity(product)
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span className="fw-bold fs-5">
                                                    {
                                                        cart.find(
                                                            item => item.productId === product.id
                                                        )?.cartQuantity || 1
                                                    }
                                                </span>

                                                <button
                                                    className="btn btn-success"
                                                    onClick={() =>
                                                        increaseQuantity(product)
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                        ) : (

                                            Number(product.stock || product.quantity || 0) === 0 ? (

                                                <button
                                                    className="btn text-white"
                                                    style={{
                                                        backgroundColor: "#8B0000"
                                                    }}
                                                    disabled
                                                >
                                                    Out Of Stock
                                                </button>

                                            ) : (


                                                role !== "ADMIN" && (

                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            addToCart(product)
                                                        }
                                                    >
                                                        Add To Cart
                                                    </button>

                                                )

                                            )
                                        )
                                    }

                                    {
                                        role !== "ADMIN" &&
                                        Number(product.stock || product.quantity || 0) > 0 && (

                                            <button
                                                className="btn btn-success"
                                                onClick={() => {

                                                    const cartItem =
                                                        cart.find(
                                                            item => item.productId === product.id
                                                        );

                                                    localStorage.setItem(
                                                        "buyNowProduct",
                                                        JSON.stringify({
                                                            ...product,
                                                            cartQuantity:
                                                                Number(
                                                                    cartItem?.cartQuantity
                                                                ) > 0
                                                                    ? cartItem.cartQuantity
                                                                    : 1
                                                        })
                                                    );

                                                    window.location.href =
                                                        "/checkout";
                                                }}
                                            >
                                                Buy Now
                                            </button>

                                        )
                                    }

                                </div>
                                <div className="d-grid mt-2">

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="btn btn-outline-dark"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}
            </div>

        </div>
    );
}
export default Products;