import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import { client } from "../lib/supabase";
import logo from "../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        setSuccess("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 700);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LOGO */}
        <div className="text-center mb-4">
          <span className="d-flex justify-content-center logo_word">
            <img
              src={logo}
              width="50"
              height="40"
              alt="Neon Task Logo"
            />

            <h1 className="neon-text h2">
              NEON_TASK
            </h1>
          </span>

          <p className="text-secondary small">
            Precision productivity in the dark.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger py-2 small">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="alert alert-success py-2 small">
            {success}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="mb-3 position-relative">

            <label className="form-label text-uppercase small fw-bold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <span>
              <i className="fa-regular fa-envelope"></i>
            </span>

          </div>

          {/* PASSWORD */}
          <div className="mb-4 position-relative">

            <label className="form-label text-uppercase small fw-bold">
              Security Key
            </label>

            <span className="material-symbols-outlined lock">
              lock
            </span>

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              role="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={
                  showPassword
                    ? "fa-regular fa-eye-slash"
                    : "fa-regular fa-eye"
                }
              ></i>
            </span>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="neon-btn w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

        </form>

        {/* SIGNUP */}
        <div className="row text-center mt-4 pt-2 border-top border-secondary border-opacity-10">

          <p className="small text-muted text-white-50">
            New operative?{" "}

            <Link
              to="/signup"
              className="text-success text-decoration-none fw-bold"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;