import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    saveAddress,
    getAddresses,
    deleteAddress
} from "../services/addressService";

function AddressManagement() {

    const [addresses, setAddresses] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        address: "",
        city: "",
        pincode: "",
    });

    useEffect(() => {

        loadAddresses();

    }, []);

    const loadAddresses = async () => {

        try {

            const response =
                await getAddresses();

            setAddresses(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const addAddress = async () => {

        if (
            !formData.name.trim() ||
            !formData.mobile.trim() ||
            !formData.address.trim() ||
            !formData.city.trim() ||
            !formData.pincode.trim()
        ) {
            alert("All fields are mandatory");
            return;
        }

        const mobileRegex = /^[6-9]\d{9}$/;

        if (!mobileRegex.test(formData.mobile)) {
            alert(
                "Enter a valid 10-digit mobile number"
            );
            return;
        }

        const pincodeRegex = /^\d{6}$/;

        if (!pincodeRegex.test(formData.pincode)) {
            alert(
                "Pincode must be exactly 6 digits"
            );
            return;
        }

        try {

            await saveAddress(
                formData
            );

            await loadAddresses();

            setFormData({
                name: "",
                mobile: "",
                address: "",
                city: "",
                pincode: "",
            });

            alert(
                "Address Added Successfully"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to save address"
            );
        }
    };

    const removeAddress = async (
        id
    ) => {

        try {

            await deleteAddress(id);

            await loadAddresses();

        } catch (error) {

            console.log(error);
        }
    };
    return (
        <div className="container py-4">

            <h2 className="mb-4">
                📍 Address Management
            </h2>

            <div className="card shadow-sm mb-4">

                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">
                        Add New Address
                    </h4>
                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name *"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile Number *"
                                name="mobile"
                                maxLength="10"
                                value={formData.mobile}
                                onChange={(e) => {

                                    const value =
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );

                                    setFormData({
                                        ...formData,
                                        mobile: value,
                                    });
                                }}
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Full Address *"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="City *"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pincode *"
                                name="pincode"
                                maxLength="6"
                                value={formData.pincode}
                                onChange={(e) => {

                                    const value =
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );

                                    setFormData({
                                        ...formData,
                                        pincode: value,
                                    });
                                }}
                            />
                        </div>

                    </div>

                    <button
                        className="btn btn-success"
                        onClick={addAddress}
                    >
                        Save Address
                    </button>

                </div>

            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h4>
                    Saved Addresses
                </h4>

                <Link
                    to="/checkout"
                    className="btn btn-primary"
                >
                    Continue To Checkout
                </Link>

            </div>

            {
                addresses.length === 0 ? (

                    <div className="alert alert-warning">
                        No Addresses Found
                    </div>

                ) : (

                    addresses.map((address) => (

                        <div
                            key={address.id}
                            className="card shadow-sm mb-3"
                        >
                            <div className="card-body">

                                <h5>
                                    {address.name}
                                </h5>

                                <p className="mb-1">
                                    {address.address}
                                </p>

                                <p className="mb-1">
                                    {address.city}
                                </p>

                                <p className="mb-1">
                                    {address.pincode}
                                </p>

                                <p className="mb-3">
                                    📞 {address.mobile}
                                </p>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        removeAddress(address.id)
                                    }
                                >
                                    Delete Address
                                </button>

                            </div>
                        </div>

                    ))

                )
            }

        </div >
    );
}

export default AddressManagement;