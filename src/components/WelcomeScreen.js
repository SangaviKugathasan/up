import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "../App.css"; 

const WelcomeScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/email-generator");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <FaEnvelope className="email-icon" />
        <h1 className="welcome-text">
          Welcome to <span>Email Creator</span>
        </h1>
        <p className="welcome-subtext">Your AI-powered email generation tool</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
