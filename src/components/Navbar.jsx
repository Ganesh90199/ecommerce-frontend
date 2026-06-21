import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartDetails } from "../services/cartService";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    window.location.href = "/login";
  };

  useEffect(() => {

    const loadCounts = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (token) {

          const response =
            await getCartDetails();
          console.log(
            "Cart Details Response:",
            response.data
          );

          const count =
            response.data.reduce(
              (total, item) =>
                total + item.cartQuantity,
              0
            );

          console.log(
            "Navbar Count =",
            count
          );

          setCartCount(count);
        }

        const userEmail =
          localStorage.getItem("userEmail");

        const wishlistKey =
          `wishlist_${userEmail}`;

        const wishlist =
          JSON.parse(
            localStorage.getItem(wishlistKey)
          ) || [];

        setWishlistCount(
          wishlist.length
        );

      } catch (error) {

        console.log(error);
      }
    };

    loadCounts();

    window.addEventListener(
      "cartUpdated",
      loadCounts
    );

    window.addEventListener(
      "wishlistUpdated",
      loadCounts
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        loadCounts
      );

      window.removeEventListener(
        "wishlistUpdated",
        loadCounts
      );
    };

  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary shadow"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/products"
        >
          🛒 E-Commerce
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <div className="navbar-nav ms-auto align-items-lg-center">

            <Link
              className="nav-link text-white"
              to="/products"
            >
              Products
            </Link>

            {/* USER MENU */}
            {
              token &&
              role === "USER" && (
                <>
                  <Link
                    className="nav-link text-white position-relative"
                    to="/cart"
                  >
                    Cart

                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    className="nav-link text-white"
                    to="/orders"
                  >
                    Orders
                  </Link>

                  <Link
                    className="nav-link text-white"
                    to="/addresses"
                  >
                    📍 Addresses
                  </Link>

                  <Link
                    className="nav-link text-white position-relative"
                    to="/wishlist"
                  >
                    ❤️ Wishlist

                    {wishlistCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </>
              )
            }

            {/* ADMIN MENU */}
            {
              token &&
              role === "ADMIN" && (
                <div className="nav-item dropdown">

                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    ⚙️ Admin
                  </a>

                  <ul className="dropdown-menu">

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/dashboard"
                      >
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/add-product"
                      >
                        Add Product
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/manage-products"
                      >
                        Manage Products
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/manage-orders"
                      >
                        Manage Orders
                      </Link>
                    </li>

                  </ul>

                </div>
              )
            }

            {/* PROFILE MENU */}
            {
              token && (
                <div className="nav-item dropdown">

                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    👤 Profile
                  </a>

                  <ul className="dropdown-menu">

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/profile"
                      >
                        My Profile
                      </Link>
                    </li>

                    {
                      role === "USER" && (
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/addresses"
                          >
                            My Addresses
                          </Link>
                        </li>
                      )
                    }

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>

                  </ul>

                </div>
              )
            }

            {/* GUEST MENU */}
            {
              !token && (
                <>
                  <Link
                    className="nav-link text-white"
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="nav-link text-white"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )
            }

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;