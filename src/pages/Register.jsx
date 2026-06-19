import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {

    try {

      await api.post(
        "/auth/register",
        {
          email: formData.email,
          password: formData.password,
          role: "USER"
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      alert(
        "Registration Failed"
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight:
          "calc(100vh - 76px)",
        background:
          "linear-gradient(to right,#0f172a,#1e293b)"
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "450px",
          borderRadius: "20px"
        }}
      >

        <h1
          className="text-center text-primary fw-bold"
        >
          Register
        </h1>

        <input
          className="form-control mt-4"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="form-control mt-3"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mt-3"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="btn btn-success mt-4"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-3">

          Already have an account?

          <Link
            to="/login"
            className="ms-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default RegisterPage;