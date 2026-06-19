import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

import {
  getCartDetails,
  updateCartQuantity,
  removeCartItem,
  clearCart
} from "../services/cartService";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    loadCart();

  }, []);

  const loadCart = async () => {

    try {

      const response =
        await getCartDetails();

      setCartItems(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };
  const [showToast, setShowToast] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const increaseQty = async (cartId) => {

    try {

      const item =
        cartItems.find(
          item => item.cartId === cartId
        );

      if (!item) return;

      if (
        item.cartQuantity >= item.stock
      ) {

        setToastMessage(
          `Only ${item.stock} items available`
        );

        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 1500);

        return;
      }

      await updateCartQuantity(
        cartId,
        item.cartQuantity + 1
      );

      await loadCart();

      setToastMessage(
        `${item.name} quantity decreased`
      );

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 1500);

    } catch (error) {

      console.log(error);
    }
  };

  const decreaseQty = async (cartId) => {

    try {

      const item =
        cartItems.find(
          item => item.cartId === cartId
        );

      if (!item) return;

      if (item.cartQuantity <= 1) {

        await removeCartItem(
          cartId
        );

      } else {

        await updateCartQuantity(
          cartId,
          item.cartQuantity - 1
        );
      }

      await loadCart();

      setToastMessage(
        `${item.name} quantity decreased`
      );

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 1500);

    } catch (error) {

      console.log(error);
    }
  };
  const clearCartItems = async () => {

    try {

      await clearCart();

      setCartItems([]);

      setToastMessage(
        "Cart cleared"
      );

      setShowToast(true);

    } catch (error) {

      console.log(error);
    }
  };
  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.cartQuantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.cartQuantity,
    0
  );
  const removeItem = async (cartId) => {

    try {

      await removeCartItem(cartId);

      await loadCart();

      setToastMessage("Item removed");

      setShowToast(true);

    } catch (error) {

      console.log(error);
    }
  };
  return (
    <div
      className="container"
      style={{
        marginBottom: "30px",
      }}
    >

      <Toast
        message={toastMessage}
        show={showToast}
      />

      <h2 className="mb-4 fw-bold">
        🛒 Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="card shadow p-5 text-center">
          <h4>Your Cart is Empty</h4>

          <p className="text-muted">
            Add products to continue shopping.
          </p>
        </div>
      ) : (
        <div className="row">

          <div className="col-lg-8">

            {cartItems.map((item) => (
              <div
                className="card mb-3 shadow-sm"
                key={item.cartId}
              >
                <div className="row g-0">

                  <div className="col-md-3 text-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="img-fluid p-3"
                      style={{
                        height: "180px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="col-md-9">
                    <div className="card-body">

                      <h5>{item.name}</h5>

                      <h6 className="text-success">
                        ₹{item.price}
                      </h6>

                      <div className="d-flex align-items-center gap-2 my-3">

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            decreaseQty(item.cartId)
                          }
                        >
                          -
                        </button>

                        <span className="fw-bold">
                          {item.cartQuantity}
                        </span>

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            increaseQty(item.cartId)
                          }
                        >
                          +
                        </button>

                      </div>

                      <p>
                        Subtotal:
                        <strong>
                          {" "}
                          ₹
                          {item.price *
                            item.cartQuantity}
                        </strong>
                      </p>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          removeItem(item.cartId)
                        }
                      >
                        Remove
                      </button>

                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>

          <div className="col-lg-4">

            <div className="card shadow p-4">

              <h4 className="mb-3">
                Order Summary
              </h4>

              <hr />

              <h5>
                Items: {cartItems.length}
              </h5>

              <h4 className="text-success mt-3">
                Total: ₹{totalAmount}
              </h4>

              <button
                className="btn btn-success w-100 mt-3"
                onClick={() => navigate("/checkout")}
              >
                Proceed To Checkout
              </button>
              <button
                className="btn btn-outline-danger w-100 mt-2"
                onClick={clearCartItems}
              >
                Clear Cart
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;