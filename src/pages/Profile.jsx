import { useState, useEffect } from "react";

function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {

        const savedProfile =
            JSON.parse(localStorage.getItem("profile"));

        if (savedProfile) {
            setProfile(savedProfile);
        }

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const saveProfile = () => {

        localStorage.setItem(
            "profile",
            JSON.stringify(profile)
        );

        setIsEditing(false);

        setToastMessage(
            "Profile Saved Successfully!"
        );

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    return (
        <div className="container py-4">

            <div className="card shadow-sm">

                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">
                        👤 My Profile
                    </h3>
                </div>

                <div className="card-body">

                    <div className="mb-3">
                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={profile.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={profile.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={profile.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Address
                        </label>

                        <textarea
                            name="address"
                            className="form-control"
                            rows="3"
                            value={profile.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {!isEditing ? (

                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            Edit Profile
                        </button>

                    ) : (

                        <button
                            className="btn btn-success"
                            onClick={saveProfile}
                        >
                            Save Profile
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;