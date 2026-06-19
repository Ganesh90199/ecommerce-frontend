import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      console.log("FULL RESPONSE");
      console.log(response);

      console.log("RESPONSE DATA");
      console.log(response.data);

      console.log("TOKEN");
      console.log(response.data.token);

      console.log("ROLE");
      console.log(response.data.role);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      if (
        response.data.role === "ADMIN"
      ) {

        window.location.href =
          "/admin/dashboard";

      } else {

        window.location.href =
          "/products";
      }

    } catch (error) {

      console.log(error);

      console.log(
        error.response
      );

      alert(
        "Login Failed"
      );
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "calc(100vh - 76px)",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">
            E-Commerce
          </h1>

          <p className="text-muted">
            Welcome Back
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control form-control-lg"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>
          </div>

          <button
            className="btn btn-primary btn-lg w-100"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-4">
          <span className="text-muted">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ms-2 text-decoration-none fw-bold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;