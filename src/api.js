const API_BASE_URL = "http://127.0.0.1:8000";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "An error occurred");
  }
  return data;
};

// ✅ Register a new user
export const registerUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/auth/registration/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse(response);
};

// ✅ Log in a user
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response);

  // ✅ Store tokens in localStorage
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  return data;
};

// ✅ Log out a user
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// ✅ Generate an email
export const generateEmail = async (emailData) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found. Please log in.");

  const response = await fetch(`${API_BASE_URL}/auth/generate_email/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(emailData),
  });

  return handleResponse(response);
};