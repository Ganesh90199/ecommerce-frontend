import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { placeOrder as placeOrderApi } from "../services/orderService";
import { clearCart } from "../services/cartService";
import { getCartDetails } from "../services/cartService";

import { getAddresses } from "../services/addressService";

function Checkout() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] =
        useState([]);

    const [addresses, setAddresses] =
        useState([]);

    const [selectedAddress, setSelectedAddress] =
        useState("");


    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const cartResponse =
                await getCartDetails();

            setCartItems(
                cartResponse.data
            );

            const addressResponse =
                await getAddresses();

            setAddresses(
                addressResponse.data
            );

            if (
                addressResponse.data.length === 0
            ) {

                alert(
                    "Please add an address first."
                );

                navigate("/addresses");
            }

        } catch (error) {

            console.log(error);
        }
    };

    const total =
        cartItems.reduce(
            (sum, item) =>
                sum +
                Number(item.price || 0) *
                Number(item.cartQuantity || 1),
            0
        );
    const placeOrder = async () => {

        if (cartItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }

        try {

            const selectedAddr =
                addresses.find(
                    address =>
                        address.id === Number(selectedAddress)
                );

            await placeOrderApi({

                totalAmount: total,

                customerName:
                    selectedAddr.name,

                mobile:
                    selectedAddr.mobile,

                address:
                    selectedAddr.address,

                city:
                    selectedAddr.city,

                pincode:
                    selectedAddr.pincode
            });

            await clearCart();

            alert(
                "Order Placed Successfully"
            );

            navigate("/orders");

        } catch (error) {

            console.log(error);

            alert(
                "Failed to place order"
            );
        }
    };
    return (
        <div className="container py-4">

            <h2 className="mb-4">
                💳 Checkout
            </h2>

            <div className="row">

                <div className="col-lg-8">

                    <div className="card shadow mb-4">

                        <div className="card-body">

                            <h4>
                                Select Address
                            </h4>

                            {
                                addresses.length === 0 && (

                                    <div className="alert alert-warning mt-3">

                                        No address found.

                                        <div className="mt-2">

                                            <Link
                                                to="/addresses"
                                                className="btn btn-primary"
                                            >
                                                Add Address
                                            </Link>

                                        </div>

                                    </div>

                                )
                            }

                            {
                                addresses.map(
                                    address => (

                                        <div
                                            key={address.id}
                                            className="form-check border rounded p-3 mb-3"
                                        >
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="address"
                                                value={address.id}
                                                onChange={(e) =>
                                                    setSelectedAddress(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <label className="form-check-label ms-2">

                                                <strong>
                                                    {address.name}
                                                </strong>

                                                <br />

                                                📞 {address.mobile}

                                                <br />

                                                {address.address}

                                                <br />

                                                {address.city}

                                                <br />

                                                PIN - {address.pincode}

                                            </label>
                                        </div>

                                    )
                                )
                            }

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h4>
                                Order Summary
                            </h4>

                            <hr />

                            <h5 className="mb-3">
                                Items ({cartItems.length})
                            </h5>

                            {
                                cartItems.length === 0 ? (
                                    <div className="alert alert-warning">
                                        Your cart is empty
                                    </div>
                                ) : (

                                    cartItems.map((item) => (

                                        <div
                                            key={item.id}
                                            className="d-flex justify-content-between mb-2"
                                        >
                                            <span>
                                                {item.name}
                                            </span>

                                            <span>
                                                {item.cartQuantity} × ₹{item.price}                                            </span>

                                        </div>

                                    ))
                                )
                            }

                            <hr />

                            <h4 className="text-success">
                                Total ₹{total}
                            </h4>

                            <button
                                className="btn btn-success w-100 mt-3"
                                onClick={placeOrder}
                                disabled={
                                    cartItems.length === 0 ||
                                    !selectedAddress
                                }
                            >
                                {
                                    cartItems.length === 0
                                        ? "Cart Empty"
                                        : !selectedAddress
                                            ? "Select Address"
                                            : "Place Order"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;