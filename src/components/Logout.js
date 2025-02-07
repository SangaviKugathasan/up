import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api"; // Correct import path

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return <button onClick={handleLogout} className="logout-btn">Logout</button>;
};

export default Logout;