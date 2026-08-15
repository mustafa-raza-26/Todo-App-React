import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import { client } from "../lib/supabase";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        setSuccess(
          "Account created successfully! Please check your email to verify your account."
        );

        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="neon-text h2">
            NEON_TASK
          </h1>

          <p className="text-secondary small">
            Precision productivity for elite performance.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger py-2 small">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="alert alert-success py-2 small">
            {success}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup}>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label text-uppercase small fw-bold">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <span>
              <i className="fa-regular fa-user"></i>
            </span>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-uppercase small fw-bold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="john@neon.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <span>
              <i className="fa-regular fa-envelope"></i>
            </span>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label text-uppercase small fw-bold">
              Password
            </label>

            <span className="lock">
              <i class="fa-solid fa-lock"></i>
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

          {/* Button */}
          <button
            type="submit"
            className="neon-btn w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center mt-4 pt-2 border-top border-secondary border-opacity-10">
          <p className="small text-muted text-white-50">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-success text-decoration-none fw-bold"
            >
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;