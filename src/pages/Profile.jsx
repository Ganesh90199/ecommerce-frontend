import { useState, useEffect } from "react";

function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const userEmail =
        localStorage.getItem("userEmail");

    const profileKey =
        `profile_${userEmail}`;

    useEffect(() => {

        const savedProfile =
            JSON.parse(localStorage.getItem(profileKey));

        if (savedProfile) {

            setProfile(savedProfile);

        } else {

            setProfile({
                name: "",
                email: userEmail || "",
                phone: "",
                address: ""
            });
        }

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "phone") {

            const phoneOnly =
                value.replace(/\D/g, "");

            if (phoneOnly.length > 10) {
                return;
            }

            setProfile({
                ...profile,
                phone: phoneOnly
            });

            return;
        }

        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const saveProfile = () => {
        if (!/^[6-9]\d{9}$/.test(profile.phone)) {

            alert(
                "Please enter a valid 10-digit mobile number"
            );

            return;
        }
        localStorage.setItem(
            profileKey,
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
                            type="tel"
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
                            type="tel"
                            name="phone" maxLength={10}
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