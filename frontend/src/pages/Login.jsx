import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  // Default test login values
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");

  // Error message state
  const [error, setError] = useState("");

  // This function runs when user clicks Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send login details to backend
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token and user data in browser localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect user to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="page-center">
      <div className="login-card">
        <h1>CRM Login</h1>
        <p>Login to manage sales leads</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="test-login">
          <p>
            <strong>Test Login</strong>
          </p>
          <p>Email: admin@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;