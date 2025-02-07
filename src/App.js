import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailGenerator from "./components/EmailGenerator";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomeScreen from "./components/WelcomeScreen";
import "./App.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/email-generator"
          element={<ProtectedRoute><EmailGenerator /></ProtectedRoute>}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
