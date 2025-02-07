import React, { useState } from "react";
import { generateEmail } from "../api";
import { FaEnvelope, FaComment, FaHistory, FaSignOutAlt, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

const EmailGenerator = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [emails, setEmails] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("official");
  const navigate = useNavigate();

  const handleGenerateEmail = async () => {
    try {
      const response = await generateEmail({
        content,
        format: selectedFormat,
      });

      if (response.email) {
        setEmail(response.email);
        setEmails([...emails, { content, email: response.email }]);
      } else {
        setEmail("Error generating email");
      }
    } catch (error) {
      setEmail("Error generating email");
    }
  };

  const handleSendEmail = () => {
    const subject = "Generated Email";
    const body = email;
    const mailtoUri = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUri;
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="email-generator-container">
      {/* Sidebar for Previous Emails */}
      <aside className="email-sidebar">
        <div className="sidebar-header">
          <FaHistory className="logo-icon" />
          <h2>Email History</h2>
        </div>
        <div className="email-history">
          {emails.length > 0 ? (
            emails.map((item, index) => (
              <div className="email-card" key={index}>
                <p><strong>Content:</strong> {item.content}</p>
                <p><strong>Email:</strong> {item.email}</p>
              </div>
            ))
          ) : (
            <p>No emails generated yet.</p>
          )}
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Section for Generating Email */}
      <main className="email-main">
        <div className="email-form">
          <h2>Generate Email</h2>
          <div className="select-format">
            <label htmlFor="format">Choose Email Type</label>
            <select
              id="format"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="official">Official</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <div className="input-group">
            <FaComment className="input-icon" />
            <textarea
              placeholder="Enter email content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </div>

          <button onClick={handleGenerateEmail} className="generate-btn">Generate Email</button>
        </div>

        {/* Generated Email Output Section */}
        <div className="email-output">
          <h2>Generated Email</h2>
          <div className="email-output-box">
            <pre>{email}</pre>
          </div>
          <button onClick={handleSendEmail} className="send-email-btn">
            <FaPaperPlane /> Send Email
          </button>
        </div>
      </main>
    </div>
  );
};

export default EmailGenerator;