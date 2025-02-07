import React, { useState } from "react";
import { registerUser } from "../api"; // Correct import path
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { username, email, password1, password2 } = formData;

    if (!username.match(/^[a-zA-Z0-9_]{3,15}$/)) {
      return "Username should be 3-15 characters (letters, numbers, underscores only).";
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      return "Invalid email format.";
    }

    if (password1.length < 8 || !/[A-Z]/.test(password1) || !/\d/.test(password1)) {
      return "Password must be at least 8 characters, include a number and an uppercase letter.";
    }

    if (password1 !== password2) {
      return "Passwords do not match.";
    }

    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log("Signup successful", response);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Try a different email/username.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password1"
          placeholder="Password"
          value={formData.password1}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;